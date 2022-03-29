import { ICommand } from "wokcommands";
import { MessageEmbed, Client, Guild, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, ReactionUserManager, Role, TextChannel } from 'discord.js';
const music = require('@koenie06/discord.js-music');
let embed

export default {
    category: 'Music',
    description: 'Play a song',

    slash: true,
    testOnly: true,

    options: [{
        type: 'STRING',
        name: 'song',
        description: 'The song that you wish to play',
        required: true,
    }],

    callback: async ({ interaction, guild }) => {
        if (!guild) {
            return 'This can only be used in a guild.'
        }
        let user = interaction.member
        if (!(user as GuildMember).voice.channel) {
            return 'This can only be used when you are in a Voice Channel.'
        }
        let song = interaction.options.getString('song')
        let channel = (user as GuildMember).voice.channel

        music.play({
            interaction: interaction,
            channel: channel,
            song: song,
        })

        embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Your Song Is Now Playing')
        .setDescription(`${song} is now playing in ${channel?.name}`)

        return (embed)
    }
} as ICommand