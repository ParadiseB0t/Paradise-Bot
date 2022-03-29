import { ICommand } from "wokcommands";
import { MessageEmbed, Guild, GuildMember } from 'discord.js';
const music = require('@koenie06/discord.js-music');
let embed

export default {
    category: 'Music',
    description: 'Stop the music playing in your VC',

    slash: true,
    testOnly: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'connected',
            description: 'Am I connected to a VC in this discord server?'
        },
        {
            type: 'SUB_COMMAND',
            name: 'paused',
            description: 'Am I paused in a VC in this discord server?'
        },
        {
            type: 'SUB_COMMAND',
            name: 'resumed',
            description: 'Am I playing in a VC in this discord server?'
        },
        {
            type: 'SUB_COMMAND',
            name: 'repeated',
            description: 'Am I repeating the same queue in this discord server?'
        }
    ],

    callback: async ({ interaction, guild }) => {
        const subCommand = interaction.options.getSubcommand()

        if (subCommand === 'connected') {
            const isConnected = await music.isConnected({ interaction: interaction })
            const description = isConnected === true ? 'I am connected!' : 'I am not connected to any channel!'

            embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Am I Connected?')
            .setDescription(description)

            return (embed)
        }
        if (subCommand === 'paused') {
            const isPaused = await music.isPaused({ interaction: interaction })
            const description = isPaused === true ? 'I am waiting for someone to resume me!' : 'I am still playing music!'

            embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Am I Paused?')
            .setDescription(description)

            return (embed)
        }
        if (subCommand === 'resumed') {
            const isResumed = await music.isResumed({ interaction: interaction })
            const description = isResumed === true ? 'I am playing music right now!' : 'Currently I am paused!'

            embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Am I Resumed?')
            .setDescription(description)

            return (embed)
        }
        if (subCommand === 'repeated') {
            const isRepeated = await music.isRepeated({ interaction: interaction })
            const description = isRepeated === true ? 'Currently I am playing on an infinite loop!' : 'Currently I am just playing through the queue normally' 

            embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Am I Repeating?')
            .setDescription(description)

            return (embed)
        }
    }
} as ICommand