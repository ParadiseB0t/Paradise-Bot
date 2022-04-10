import Economy from "../../../functions/economy";
import { ICommand } from "wokcommands";
import { MessageEmbed, User } from "discord.js";
import { config } from "../../../../config/config";

const eco = new Economy()
let choiceEmpty: boolean = false
let embed: MessageEmbed

export default {
    category: 'Economy',
    description: 'Checks your balance',

    aliases: ['bal'],

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'type',
            type: 'STRING',
            description: 'Global or Server economy', 
            required: true,
            choices: [{name: 'global', value: 'global'},{name: 'server', value: 'server'}]
        },
        {
            name: 'user',
            type: 'USER',
            description: `Who's balance you want to check (Leave blank for your own)`,
        }
    ],

    callback: async ({interaction, guild, user}) => {
        console.log(2)
        let type = interaction.options.getString('type')
        let target = interaction.options.getUser('user') as User

        if(!target) {
            target = user
        }

        if (target?.bot) {
            embed = new MessageEmbed().setColor('RED').setTitle('Cannot check a bots balance!').setDescription(`Checking bots balances is disabled (They may cause issues)`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
            return embed
        }

        const guildId = interaction.guildId
        const userId = target?.id

        eco.accCheck(userId, guildId) .then(async accCheck => {
            if (!accCheck === false) {
                eco.globalNewUser(userId, guildId)
            }
        })

        if (type === 'server') {
            eco.guildCheck(userId, guildId).then(async guildCheck => {
                if (guildCheck === false) {
                    eco.guildNewUser(userId, guildId)
                }
            })

            const balance = await eco.guildBalance(userId, guildId)

            const bankbal = await eco.guildBank(userId, guildId)
            
            if (target === user) {
                embed = new MessageEmbed().setDescription(`<a:tick:961700539475820614>  Your guild wallet is ${config.currency}${balance} and your guild bank balance is ${config.currency}${bankbal}`).setColor('#feed83').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
                return embed
            } else {
                embed = new MessageEmbed().setDescription(`<a:tick:961700539475820614>  ${target?.username}'s guild wallet is ${config.currency}${balance} and their guild bank balance is ${config.currency}${bankbal}`).setColor('#feed83').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
                return embed
            }

           }
        if (type === 'global') {
            const check = await eco.check(guildId);
            if (check === false) {
                const embed = new MessageEmbed().setColor('RED').setTitle('Global Is Disabled In This Server').setDescription('<a:tick:961700539475820614>  Sorry, but the owners of this server have disabled the global economy').setFooter(`Paradise Bot | ${config.version}`).setTimestamp(Date.now())
                return embed
            } 

            const balance = await eco.globalBalance(userId)

            const bankbal = await eco.globalBank(userId)
            
            if (target === user) {
                embed = new MessageEmbed().setDescription(`<a:tick:961700539475820614>  Your global wallet is ${config.currency}${balance} and your global bank balance is ${config.currency}${bankbal}`).setColor('#feed83').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
                return embed
            } else {
                embed = new MessageEmbed().setDescription(`<a:tick:961700539475820614>  ${target?.username}'s global wallet is ${config.currency}${balance} and their global bank balance is ${config.currency}${bankbal}`).setColor('#feed83').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
                return embed
            }
        }

    }
} as ICommand