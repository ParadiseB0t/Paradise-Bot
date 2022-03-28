import { ICommand } from "wokcommands";
import { Client, Guild, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, ReactionUserManager, Role, TextChannel } from 'discord.js';
import { AllowedMentionsTypes } from "discord-api-types";

export default {
    category: 'Miscellaneous',
    description: 'Adds a role to the auto role message.',

    requireRoles: true,

    minArgs: 3,
    maxArgs: 3,

    expectedArgs: '<channel> <messageID> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu ()) {
                return
            }

            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })


                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    content: 'Roles updated!',
                    ephemeral: true,
                })
            }
        })
    },

    callback: async ({ message, interaction, args, client }) => {
        const channel = (message ? message.mentions.channels.first(): interaction.options.getChannel('channel')) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel'
        }

        const messageID = args[1]
        const role = (message ? message.mentions.roles.first() : interaction.options.getRole('role')) as Role
        if (!role) {
            return 'Cannot find role'
        }

        const targetMessage = await channel.messages.fetch(messageID, {
            cache: true,
            force: true
        })

        if (!targetMessage) {
            return 'Cannot find message (Check your link)'
        }

        if (targetMessage.author.id !== client.user?.id) {
            return `Please provide a message ID that was sent from <@${client.user?.id}>`
        }

        let row = targetMessage.components[0] as MessageActionRow
        if (!row) {
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value)
                return {
                    custom: true,
                    content: `<@&${o.value}> is already in this menu.`,
                    allowedMentions: {
                        roles: [],
                    },
                    ephemeral: true,
                }
            }

            menu.addOptions(option),
            menu.setMaxValues(menu.options.length)
        }   else {
            row.addComponents (
                new MessageSelectMenu()
                    .setCustomId('auto_roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('Select your roles...')
                    .addOptions(option)
            )
        }

        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Added <@&${role.id}> to the auto roles menu`,
            allowedMentions: {
                roles: []
            },

            ephemeral: true,
        }
    },
} as ICommand