import { ICommand } from "wokcommands";
import { MessageEmbed, Guild, GuildMember } from 'discord.js';
const music = require('@koenie06/discord.js-music');
let embed

export default {
    category: 'Music',
    description: 'Skip the music playing in your VC',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'on_or_off',
            type: 'BOOLEAN',
            description: 'Either say true to make the music repeat, or false to not make it repeat',
            required: true,
        }
    ],

    callback: async ({ interaction, guild }) => {
        const Switch = interaction.options.getBoolean('on_or_off')
        let user = interaction.member
        let channel = (user as GuildMember).voice.channel
        if (!guild) {
            return 'This can only be used in a guild.'
        }
        if (!(user as GuildMember).voice.channel) {
            return 'This can only be used when you are in a Voice Channel.'
        }

        music.repeat({ interaction: interaction, value: Switch})

        embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Music Repeated')
        .setDescription(`The music in ${channel?.name} has been repeated`)

        return (embed)
    }
} as ICommand