import { ICommand } from "wokcommands";
import { MessageEmbed, Client, Guild, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, ReactionUserManager, Role, TextChannel } from 'discord.js';
const music = require('@koenie06/discord.js-music');
let embed

export default {
    category: 'Music',
    description: 'Stop the music playing in your VC',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'number',
            type: 'INTEGER',
            description: 'The number of the song in the queue you want to jump to',
            required: true,
        }
    ],

    callback: async ({ interaction, guild }) => {
        const number = interaction.options.getInteger('number')
        let user = interaction.member
        let channel = (user as GuildMember).voice.channel
        if (!guild) {
            return 'This can only be used in a guild.'
        }
        if (!(user as GuildMember).voice.channel) {
            return 'This can only be used when you are in a Voice Channel.'
        }

        music.jump({ interaction: interaction, number: number })

        embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Music Jumped')
        .setDescription(`The queue has now been skipped to ${number}, in ${channel?.name}`)

        return (embed)
    }
} as ICommand