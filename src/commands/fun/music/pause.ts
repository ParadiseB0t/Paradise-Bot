import { ICommand } from "wokcommands";
import { MessageEmbed, Client, Guild, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, ReactionUserManager, Role, TextChannel } from 'discord.js';
const music = require('@koenie06/discord.js-music');
let embed

export default {
    category: 'Music',
    description: 'Pauses the music playing in your VC',

    slash: true,
    testOnly: true,

    callback: async ({ interaction, guild}) => {
        let user = interaction.member
        let channel = (user as GuildMember).voice.channel
        if (!guild) {
            return 'This can only be used in a guild.'
        }
        if (!(user as GuildMember).voice.channel) {
            return 'This can only be used when you are in a Voice Channel.'
        }

        music.pause({ interaction: interaction })

        embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Music Paused')
        .setDescription(`The music in ${channel?.name} has been paused`)

        return (embed)
    }
} as ICommand