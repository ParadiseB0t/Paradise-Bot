import { TextChannel } from 'discord.js';
import { ICommand } from "wokcommands";

export default {
    category: 'Miscellaneous',
    description: 'Sends a message',

    requireRoles: true,

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    callback: ({ message, interaction, args }) => {
        const channel = (message ? message.mentions.channels.first(): interaction.options.getChannel('channel')) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel'
        }

        args.shift() // Removing the channel from the args array
        const text = args.join (' ')

        channel.send(text)

        if (interaction) {
            interaction.reply({
                content: `Sent ${text} in ${channel}`,
                ephemeral: true
            })
        }
    }
} as ICommand