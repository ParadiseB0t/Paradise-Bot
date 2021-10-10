import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans a User',

    permissions: ['BAN_MEMBERS'],

    slash: 'both',
    testOnly: true,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],


    callback: ({ message, interaction, args }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target){
            return {
                custom: true,
                content: 'Please tag someone to ban.',
                ephemeral: true
        }
    }

        if (!target.bannable) {
            return 'Cannot ban that user.'
        }

        args.shift()
        const reason = args.join(' ')

        target.ban({
            reason,
            days: 7
        })

        return {
            custom: true,
            content: `You banned <@${target.id}>`,
            ephemeral: true
        }
    }
} as ICommand