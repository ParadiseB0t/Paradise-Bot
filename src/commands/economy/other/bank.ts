import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { config } from "../../../../config/config";
import Economy from "../../../functions/economy";

const eco = new Economy();
let embed: MessageEmbed;

export default {
    category: "Economy",
    description: "Manage your bank balances",
    aliases: ["bank", "bal", "balance"],
    slash: true,
    testOnly: true,
    guildOnly: true,
    options: [
        {
            type: "SUB_COMMAND",
            name: "deposit",
            description: "Deposit money into your bank",
            options: [
                {
                    name: 'type',
                    type: 'STRING',
                    description: 'Deposit into your global or server bank',
                    required: true,
                    choices: [{name: 'global', value: 'global'},{name: 'server', value: 'server'}]          
                }, 
                {
                    name: "amount",
                    type: "NUMBER",
                    description: "Amount to deposit or withdraw",
                    required: true,
                }
            ]
        },
        {
            type: "SUB_COMMAND",
            name: "withdraw",
            description: "Deposit money into your bank",
            options: [
                {
                    name: 'type',
                    type: 'STRING',
                    description: 'Withdraw from your global or server bank',
                    required: true,
                    choices: [{name: 'global', value: 'global'},{name: 'server', value: 'server'}]          
                },
                {
                    name: "amount",
                    type: "NUMBER",
                    description: "Amount to deposit or withdraw",
                    required: true,
                }
            ]
        },
    ],

    callback: async ({interaction, guild, user}) => {
        let userId = user?.id
        let guildId = interaction.guildId
        let type = interaction.options.getString('type')
        let subCommand: any = interaction.options.getSubcommand
        let amount = interaction.options.getNumber('amount')

        if (!subCommand) {
            embed = new MessageEmbed().setColor('RED').setTitle('Invalid subcommand').setDescription(`Please use one of the following subcommands: \`deposit\` or \`withdraw\``).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
            return embed
        }

        const accCheck = await eco.accCheck(userId, guildId)
        if(accCheck === false) {
            eco.globalNewUser(userId, guildId)
        }

        if (subCommand === 'Deposit') {
            if (type === 'global') {
                eco.globalDeposit(userId, amount)
                embed = new MessageEmbed().setColor('#feed83').setTitle('Deposit Successful').setDescription(`You have deposited ${config.currency}${amount} into your global bank.`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now()) 
                return embed
            }
            if (type === 'server') {
                eco.guildCheck(userId, guildId).then(async guildCheck => {
                    if (guildCheck === false) {
                        eco.guildNewUser(userId, guildId)
                    }
                  })
                  eco.guildDeposit(userId, guildId, amount)
                  embed = new MessageEmbed().setColor('#feed83').setTitle('Deposit Successful').setDescription(`You have deposited ${config.currency}${amount} into your bank in \`${guild?.name}\`.`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
                  return embed
                }
        }
        if (subCommand === 'Withdraw') {
            if (type === 'global') {
                eco.globalWithdraw(userId, amount)
                embed = new MessageEmbed().setColor('#feed83').setTitle('Withdrawal Successful').setDescription(`You have withdrawn ${config.currency}${amount} from your global bank.`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
                return embed
            }
            if (type === 'server') {
                eco.guildCheck(userId, guildId).then(async guildCheck => {
                    if (guildCheck === false) {
                        eco.guildNewUser(userId, guildId)
                    }
                  })
                  eco.guildWithdraw(userId, guildId, amount)
                  embed = new MessageEmbed().setColor('#feed83').setTitle('Withdrawal Successful').setDescription(`You have withdrawn ${config.currency}${amount} from your bank in \`${guild?.name}\`.`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now())
                  return embed
            }
        }
    }
} as ICommand