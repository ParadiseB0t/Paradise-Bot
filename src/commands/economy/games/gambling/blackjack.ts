import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js"
import { config } from "../../../../../config/config";
import Economy from "../../../../functions/economy";
import { toEditorSettings } from "typescript";
const blackjack = require('discord-blackjack')

const eco = new Economy()
let embed: any

export default {
    category: "economy",
    description: "Play blackjack with the bot",
    aliases: ["bj", "blackjack"],

    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: "bet",
            type: "NUMBER",
            description: "The amount to bet",
            required: true
        },
    ],

    callback: async ({interaction, message, guild, user}) => {
        const bet: any = interaction.options.getNumber('bet')

        let game = await blackjack(interaction, {resultEmbed: false})
        
        switch (game.result) {
            case "WIN":
                const winnings = bet * 2
                embed = new MessageEmbed().setColor('GREEN').setTitle(`You Won!`).setDescription(`You won the game of blackjack! You succesfuly won ${config.currency}${winnings}`).setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                eco.globalPay(user.id, winnings)
            case "LOSE":
                embed = new MessageEmbed().setColor('RED').setTitle(`You Lost!`).setDescription(`You lost the game of blackjack! You lost ${config.currency}${bet}`).setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                eco.takeGlobal(user.id, bet)
            case "TIE":
                embed = new MessageEmbed().setColor('YELLOW').setTitle(`You Tied!`).setDescription(`You tied the game of blackjack! You didn't win or lose any money, have another go!`).setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
            case "CANCEL":
                embed = new MessageEmbed().setColor('RED').setTitle(`You Cancelled!`).setDescription(`You cancelled the game of blackjack!`).setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
            case "TIMEOUT":
                embed = new MessageEmbed().setColor('RED').setTitle(`You ran out of time!`).setDescription(`You ran out of time in the blackjack game!`).setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
        }
        return embed
    }
} as ICommand