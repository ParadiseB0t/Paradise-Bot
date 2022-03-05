import {
    ButtonInteraction,
    Constants,
    GuildMember,
    MessageActionRow,
    MessageButton,
} from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Kicks a user.',
    permissions: ['KICK_MEMBERS'],

    slash: true,
    testOnly: false,
    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    options: [
        {
            name: 'user',
            description: 'The target user.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.USER,
        },
        {
            name: 'reason',
            description: 'The kick reason.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING,
        },
    ],

    callback: async ({ interaction, channel }) => {
        const target = interaction.options.getMember('user') as GuildMember

        if (!target)
            return '⛔ Please tag someone to kick.'

        if (!target.kickable)
            return '⛔  Cannot kick that user.'

        const reason = interaction.options.getString('reason')!

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('confirm')
                    .setEmoji('🔨')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setStyle('SECONDARY')
            )

        await interaction.reply({
            content: `Are you sure you want to kick <@${target.id}>?\nReason: ${reason}`,
            components: [row],
            ephemeral: false,
        })

        const filter = (btnInteraction: ButtonInteraction) => {
            return interaction.user.id === btnInteraction.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            componentType: 'BUTTON',
            max: 1,
            time: 15_000,
        })

        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                await interaction.editReply({
                    content: '⛔ You did not respond in time.',
                    components: [],
                })
                return
            }

            if (collected.first()?.customId === 'confirm') {
                await target.kick(reason)
                await interaction.editReply({
                    content: `🔨 You kicked <@${target.id}>\nReason: ${reason}`,
                    components: [],
                })
            } else if (collected.first()?.customId === 'cancel') {
                await interaction.editReply({
                    content: "Interaction has been cancelled.",
                    components: [],
                })
            }
        })

        return
    },
} as ICommand