import Economy from '../../../functions/economy';
import { ICommand } from 'wokcommands';
import { MessageEmbed } from 'discord.js';
import { config } from '../../../../config/config';

const eco = new Economy()

export default {
    category: 'Economy',
    description: 'Pay someone money',

    slash: true,
    testOnly: true,
    guildOnly: true,

    ownerOnly: true,

    permissions: ['ADMINISTRATOR'],

    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user to pay',
            required: true,
        },
        {
            name: 'type',
            type: 'STRING',
            description: 'Global or server',
            required: true,
            choices: [{name: 'global', value: 'global'},{name: 'server', value: 'server'}]          
        }, 
        {
            name: 'amount',
            type: 'NUMBER',
            description: 'The amount to pay',
            required: true,
        },
    ],

    callback: async ({ interaction, guild, }) => {
        const user = interaction.options.getUser('user')
        const which = interaction.options.getString('type')
        const guildId = interaction.guildId
        const userId: any = user?.id
        const amount = interaction.options.getNumber('amount')

        const accCheck = await eco.accCheck(userId, guildId)
        if(accCheck === false) {
            eco.globalNewUser(userId, guildId)
        }

        if(which === 'global') {
            if (userId != ["391510228333625348", "513728046662942722", "248470317540966443"]) {
                const embed = new MessageEmbed().setColor('RED').setTitle('You are not allowed to do that').setDescription('<a:cross:961700755457310720>    Only the bot owners can set global balances').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
                return embed
        }
            await eco.globalSet(userId, amount)
            const embed = new MessageEmbed().setTitle('Global Admin Pay Succesful').setDescription(`<a:tick:961700539475820614>    You have payed ${config.currency}${amount} to ${user?.username}'s global account`).setColor('#feed83').setFooter('Paradise Beta').setTimestamp(Date.now())
            return embed
        }
        if(which === 'server') {
            eco.guildCheck(userId, guildId).then(async guildCheck => {
                if (guildCheck === false) {
                    eco.guildNewUser(userId, guildId)
                }
              })
              await eco.guildPay(userId, guildId, amount)
              const embed = new MessageEmbed().setTitle('Guild Admin Pay Succesful').setDescription(`<a:tick:961700539475820614>    You have payed ${config.currency}${amount} to ${user?.username}'s guild account`).setColor('#feed83').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
              return embed
        }
    }
} as ICommand
