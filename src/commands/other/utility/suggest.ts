import { MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import { config } from "../../../../config/config";

let embed

export default {    
    category: 'Miscellaneous',
    description: 'Sends a message',
    minArgs: 1,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    slash: true,
    testOnly: true,
    guildOnly: true,
    callback: async ({ message, interaction, args, user }) => {
        const channel = (message ? message.mentions.channels.first(): interaction.options.getChannel('channel')) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel'
        }

        args.shift() // Removing the channel from the args array
        const text = args.join (' ')

        embed = new MessageEmbed().setTitle(`New suggestion from ${user.tag}`).setColor('#0099ff').setDescription(text).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())

        channel.send({embeds: [embed]})

        if (interaction) {
            interaction.reply({
                content: `Sent ${text} in ${channel}`,
                ephemeral: true
            })
        }
    }
} as ICommand