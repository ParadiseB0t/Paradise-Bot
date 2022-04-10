import { ICommand } from "wokcommands";
import { config } from "../../../../../config/config";
import { MessageEmbed } from "discord.js";
import Economy from "../../../../functions/economy";

let embed

const eco = new Economy()

export default {
    category: 'Economy',
    description: 'Have a go on the slot machine!',

    testOnly: true,
    slash: true,

    options: [
        {
            name: 'type',
            type: 'STRING',
            description: 'Global or Server economy', 
            required: true,
            choices: [{name: 'global', value: 'global'},{name: 'server', value: 'server'}]
        },
        {
            name: 'bet',
            type: 'NUMBER',
            description: 'The amount to bet',
            required: true
        },
    ],

    callback: async ({interaction, guild, user}) => {
        const choice = interaction.options.getString('type')
        const bet = interaction.options.getNumber('bet')
        const userId = interaction.user.id
        const guildId = interaction.guildId

        const accCheck = await eco.accCheck(userId, guildId)
        if(accCheck === false) {
            const embed = new MessageEmbed().setColor('RED').setTitle('Error with your account').setDescription('It appears that you do not have an account (Or there is an error fetching it (Check paradisebot.xyz/status or our Twitter!)).').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
            return embed
        }
        const balance = await eco.globalBalance(userId)
        if(balance < !bet) {
            const embed = new MessageEmbed().setColor('RED').setTitle('Not enough money').setDescription(`It appears that you do not have enough money to bet ${bet}, you only have ${balance}.`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
            return embed
        }

        await interaction.reply('<a:slots:960196284747239444>')

        await(5000)

        const result = await eco.slots(interaction.user.id, bet)

        //checks if they won
        if(result === true) {
            embed = new MessageEmbed().setColor('GREEN').setTitle('You won!').setDescription(`You won! ${config.currency}${bet} has been added to your account`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
        } else {
            embed = new MessageEmbed().setColor('RED').setTitle('You lost!').setDescription(`You lost... ${config.currency}${bet} has been deducted from your account!`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
        }

        await interaction.editReply({ embeds: [embed], content: null})
        console.log()
    }
} as ICommand