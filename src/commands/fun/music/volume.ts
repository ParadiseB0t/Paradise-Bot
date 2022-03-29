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
            name: 'volume',
            type: 'INTEGER',
            description: 'The volume you want to set the audio to (Keep it between 1-100)',
            required: true,
        }
    ],

    callback: async ({ interaction, guild }) => {
        const volume = interaction.options.getInteger('volume')
        let user = interaction.member
        let channel = (user as GuildMember).voice.channel
        if (!guild) {
            return 'This can only be used in a guild.'
        }
        if (!(user as GuildMember).voice.channel) {
            return 'This can only be used when you are in a Voice Channel.'
        }

        music.volume({ interaction: interaction, volume: volume })

        embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Music Volume Changed')
        .setDescription(`The volume in ${channel?.name} has been changed to ${volume}%`)

        return (embed)
    }
} as ICommand