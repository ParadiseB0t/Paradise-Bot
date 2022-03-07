import {MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Info',
    description: 'info',


    slash: 'both',
    testOnly: false,
    

    callback: ({ message, text }) => {
        const embed = new MessageEmbed()
        .setTitle('Pogy INFO')
        .setFooter({
            text: "Developed by: LoopyChimp#9679"
            })
        .setDescription("Pogy is a multifunction discord bot.\n\ngithub-https://github.com/LoopyChimp/Pogy-discord-bot-TS \n\nPlease credit me when you use this bot in your discord servers")

        return embed
    }
} as ICommand  