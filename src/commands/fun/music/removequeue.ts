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
            description: 'The number of the song you want to remove from the queue',
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

        music.removeQueue({ interaction: interaction, number: number})

        embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Music Removed From Queue')
        .setDescription(`The song with the value ${number} has been removed from ${channel?.name}'s queue`)

        return (embed)
    }
} as ICommand