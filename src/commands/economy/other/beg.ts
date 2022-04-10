import { ICommand } from "wokcommands";
import Economy from "../../../functions/economy";
import { MessageEmbed } from "discord.js";
import { config } from "../../../../config/config";

function randomMoney(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }

let embed

const Titles = [ //Add more or remove if you want
    '"Can you spare any change sir?"',
    '"Please anyone, anything helps"',
    '"I need some money"',
    '"I need some money, please"',
    '"I need some money, please anyone"',
    '"I need some money, please anyone, anything helps"',
    '*Taps someone shoulder* "Sir please give me a dollar or two',
    `*Taps someones elbow* "Ma'am spare a cent?`,
    '"Sir, I need some money"',
    '"Ma\'am, I need some money"',
    '"Sir, I need some money, please"',
    '"Ma\'am, I need some money, please"',
    '"Sir, I need some money, please anyone"',
    '"Ma\'am, I need some money, please anyone"',
    '"A little bit helps please people"',
    '"Anything as much as a cent will do"',
    '"Please, I need it more than you"',
    '"If anyone is listening help me please',
]

const eco = new Economy()

export default{
    category: 'Economy',
    description: 'Beg for money',

    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: 'type',
            type: 'STRING',
            description: 'Global or Server economy', 
            required: true,
            choices: [{name: 'global', value: 'global'},{name: 'server', value: 'server'}]
        }
    ],

    callback: async ({ guild, interaction, user }) => {
        const embedTitle = Titles[Math.floor(Math.random() * Titles.length)]

        const type = interaction.options.getString('type')
        const guildId = interaction.guildId
        const userId = interaction.user.id

        eco.accCheck(userId, guildId) .then(async accCheck => {
            if (accCheck === false) {
                eco.globalNewUser(userId, guildId)
            }
        })

        if (type === 'global') { 
            const check = await eco.check(guildId);
            if (check === false) {
                const embed = new MessageEmbed().setColor('RED').setTitle('Global Is Disabled In This Server').setDescription('Sorry, but the owners of this server have disabled the global economy').setFooter(`Paradise Bot | ${config.version}`).setTimestamp(Date.now())
                return embed
            }   
                    
            const a = Math.floor(Math.random() * 11);
                if (a >= 9) { const b = Math.floor(Math.random() * 11)
                    if( b >= 9) {
                        const c = Math.floor(Math.random() * 11)
                        if( c >= 9) {
                            let source = randomMoney(4091,5931)
                            let payment = Math.ceil(source)
                            eco.globalPay(interaction.user.id, payment)
                            embed = new MessageEmbed().setTitle(embedTitle).setDescription(`🍀 Jeff Bezos' card falls out his pocket as he is walking bye, you deposit as much as possible and get ${config.currency}${payment}.`).setColor('#feed83').setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                            return embed
                        } else {
                            let source = randomMoney(125,185)
                            let payment = Math.ceil(source)
                            eco.globalPay(interaction.user.id, payment)
                            embed = new MessageEmbed().setTitle(embedTitle).setDescription(`A random business man accidentaly drops ${config.currency}${payment} out of his pocket, you snatch it up`).setColor('#feed83').setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                            return embed
                        }
                    } else {
                        let source = randomMoney(50,100)
                        let payment = Math.ceil(source)
                        eco.globalPay(interaction.user.id, payment)
                        embed = new MessageEmbed().setTitle(embedTitle).setDescription(`A bag of money with ${config.currency}${payment} flys out of the back seat of a car, you grab it before anyone notices.`).setColor('#feed83').setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                        return embed
                    }
                } else { 
                    let source = randomMoney(1,25)
                    let payment = Math.ceil(source)
                    eco.globalPay(interaction.user.id, payment)
                    embed = new MessageEmbed().setTitle(embedTitle).setDescription(`A random person throws ${config.currency}${payment} at you`).setColor('#feed83').setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                    return embed
            }
        }
        if (type === 'server') {
            eco.guildCheck(userId, guildId).then(async guildCheck => {
                if (guildCheck === false) {
                    eco.guildNewUser(userId, guildId)
                }
            })

            const a = Math.floor(Math.random() * 11);
                if (a >= 9) { const b = Math.floor(Math.random() * 11)
                    if( b >= 9) {
                        const c = Math.floor(Math.random() * 11)
                        if( c >= 9) {
                            let source = randomMoney(4091,5931)
                            let payment = Math.ceil(source)
                            eco.guildPay(userId, guildId, payment)
                            embed = new MessageEmbed().setTitle(embedTitle).setDescription(`🍀 Jeff Bezos' card falls out his pocket as he is walking bye, you deposit as much as possible and get ${config.currency}${payment}.`).setColor('#feed83').setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                            return embed
                        } else {
                            let source = randomMoney(125,185)
                            let payment = Math.ceil(source)
                            eco.guildPay(userId, guildId, payment)
                            embed = new MessageEmbed().setTitle(embedTitle).setDescription(`A random business man accidentaly drops ${config.currency}${payment} out of his pocket, you snatch it up`).setColor('#feed83').setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                            return embed
                        }
                    } else {
                        let source = randomMoney(50,100)
                        let payment = Math.ceil(source)
                        eco.guildPay(userId, guildId, payment)
                        embed = new MessageEmbed().setTitle(embedTitle).setDescription(`A bag of money with ${config.currency}${payment} flys out of the back seat of a car, you grab it before anyone notices.`).setColor('#feed83').setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                        return embed
                    }
                } else { 
                    let source = randomMoney(1,25)
                    let payment = Math.ceil(source)
                    eco.guildPay(userId, guildId, payment)
                    embed = new MessageEmbed().setTitle(embedTitle).setDescription(`A random person throws ${config.currency}${payment} at you`).setColor('#feed83').setFooter(`Paradise Beta | ${config.version}`).setTimestamp(Date.now())
                    return embed
                }
            }
        }
} as ICommand