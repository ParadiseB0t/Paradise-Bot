import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Info',
    description: 'Sends the command list',


    slash: 'both',
    testOnly: false,
    

    callback: ({ message, text }) => {
        const embed = new MessageEmbed()
        .setTitle('Paradise Commands')
        .setURL ('http://paradisebot.xyz/')
        .setDescription("Coming Soon!")
        .setFooter({
            text: "Developed by: LoopyChimp#9679"
            })

        return embed
    }
} as ICommand   