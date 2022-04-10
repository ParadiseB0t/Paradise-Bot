import { Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import economySchema from '../../../models/economy-schema';
import Economy from '../../../../src/functions/economy';
import { config } from '../../../../config/config';

const eco = new Economy()
let globalAmount = config.globalDailyMoney
let guildAmount = config.guildDailyMoney

export default {
    category: 'Economy',
    description: 'Claim your daily!',

    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: 'type',
            type: 'STRING',
            description: 'Claim your daily for an economy of this choice',
            required: true,
            choices: [{name: 'global', value: 'global'},{name: 'server', value: 'server'}]          
         } 
    ], 

  callback: async ({ guild, interaction }) => {
      const which = interaction.options.getString('type')
      const guildId = interaction.guildId
      const userId = interaction.user.id

      eco.accCheck(userId, guildId) .then(async accCheck => {
        if (accCheck === false) {
            eco.globalNewUser(userId, guildId)
        }
    })

      if (which === 'global') {
        const check = await eco.check(guildId);
        if (check === false) {
            const embed = new MessageEmbed().setColor('RED').setTitle('Global Is Disabled In This Server').setDescription('<a:cross:961700755457310720>  Sorry, but the owners of this server have disabled the global economy').setFooter(`Paradise Bot | ${config.version}`).setTimestamp(Date.now())
            return embed
        }
        const dailyCheck = await eco.checkGlobalDaily(userId);
        if(dailyCheck === true) {
          const embed = new MessageEmbed().setTitle('Global Daily Already Claimed').setDescription('<a:cross:961700755457310720>  You have already claimed your global daily!').setColor('#feed83').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
          return embed
        }
        const bal = await eco.globalBalance(userId)
        await eco.globalPay(userId, globalAmount)
        await eco.setGlobalDaily(userId, true)
        const embed = new MessageEmbed().setTitle('Global Daily Claimed').setDescription(`<a:tick:961700539475820614>  You have claimed your global daily of ${config.currency}${config.globalDailyMoney}`).setColor('#feed83').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
        return embed
      }
      if (which === 'server') {
        eco.guildCheck(userId, guildId).then(async guildCheck => {
          if (guildCheck === false) {
              eco.guildNewUser(userId, guildId)
          }
        })
        const bal = await eco.guildBalance(userId, guildId)
        await eco.guildPay(userId, guildId, guildAmount)
        await eco.setGuildDaily(userId, guildId, true)
        const embed = new MessageEmbed().setTitle('Guild Daily Claimed').setDescription(`<a:tick:961700539475820614>  You have claimed your daily for the guild \`${guild?.name}\` and recieved ${config.currency}${config.guildDailyMoney}`).setColor('#feed83').setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
        return embed
      }
  },
} as ICommand