import { ICommand } from "wokcommands";
import { MessageEmbed, CommandInteraction, Permissions, TextChannel, Role } from "discord.js";
import send from "../../miscellaneous/send";
const ms = require("ms");

export default {
    category: 'Moderation',
    description: 'Locks a channel to @everyone',

    requireRoles: true,

    slash: true,
    testOnly: true,

    options: [{
        type: 'SUB_COMMAND',
        name: 'lock',
        description: 'Locks the channel the command is run in',
    },{
        type: 'SUB_COMMAND',
        name: 'unlock',
        description: 'Unlocks the channel the command is run in',
    }],

    callback: async ({ interaction, message, guild, options, member: staff }) => {
        if (!guild) {
            return 'This command is to be run in a guild'
        }
        const subCommand = interaction.options.getSubcommand()
        const role = guild.roles.everyone

        {
        let embed

        if (subCommand === 'lock') {
            if (message) {
                await (message.channel as TextChannel).permissionOverwrites.create((role as Role),{ SEND_MESSAGES: false}) 
            }

            embed = new MessageEmbed()
            .setThumbnail('https://i.pinimg.com/originals/81/31/96/813196ce0102625d9f72b85195d6e912.gif')
            .setColor('#00f9fc')
            .setTitle('Locked')
            .setURL('https://discord.gg/Wxgrh7aVHR')
            .setDescription(`This channel has been locked by ${staff}`)
        } 

        return embed
    }
    
    // {
       
    //     let embed

    //     if (subCommand === 'unlock') {
    //         if (message) {
    //             await (message.channel as TextChannel).permissionOverwrites.create((role as Role),{ SEND_MESSAGES: true}) 
    //         }

    //         embed = new MessageEmbed()
    //         .setThumbnail('https://th.bing.com/th?q=Unlock+Icon+GIF&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-GB&cc=GB&setlang=en&adlt=moderate&t=1&mw=247')
    //         .setColor('#00f9fc')
    //         .setTitle('Unlocked')
    //         .setURL('https://discord.gg/Wxgrh7aVHR')
    //         .setDescription(`This channel has been unlocked by ${staff}`)
    //     } 
    //     return embed
    // }

    }
} as ICommand