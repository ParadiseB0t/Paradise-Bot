import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a User',

    permissions: ['KICK_MEMBERS'],

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
                content: 'Please tag someone to kick.',
                ephemeral: true
        }
    }

        if (!target.kickable) {
            return 'Cannot kick that user.'
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)

        return {
            custom: true,
            content: 'You kicked <@{target.id}>',
            ephemeral: true
        }
    }
} as ICommand