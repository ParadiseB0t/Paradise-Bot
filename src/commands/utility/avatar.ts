import {
    Constants,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Utility',
    description: 'Display user avatar.',

    slash: true,
    testOnly: true,
    guildOnly: true,

    expectedArgs: '<user>',
    options: [
        {
            name: 'user',
            description: 'The target user.',
            required: false,
            type: Constants.ApplicationCommandOptionTypes.USER,
        },
    ],

    callback: async ({ interaction }) => {
        const target = interaction.options.getUser('user') || interaction.user
        const avatarUrl = target.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 4096,
        })

        const embed = new MessageEmbed()
            .setColor(0x5865F2)
            .setTitle(`${target.tag}'s Avatar`)
            .setImage(avatarUrl)

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL(avatarUrl)
                    .setLabel('Avatar URL')
                    .setStyle('LINK')
            )

        return interaction.reply({
            embeds: [embed],
            components: [row],
        })
    },
} as ICommand