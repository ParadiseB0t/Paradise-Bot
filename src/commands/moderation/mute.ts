import { User } from 'discord.js'
import { ICommand } from 'wokcommands'
import punishmentSchema from '../../models/punishment-schema'

export default {
    category: 'Moderation',
    description: 'Mutes a user.',

    permissions: ['ADMINISTRATOR'],
    requiredRoles: true,

    minArgs: 3,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],

    slash: 'both',
    testOnly: true,

    callback: async ({
        args,
        member: staff,
        guild,
        client,
        message,
        interaction,
    }) => {
        if (!guild) {
            return 'You can only use this in a server.'
        }

        let userId = args.shift()!
        const duration = args.shift()!
        const reason = args.join(' ')
        let user: User | undefined

        if (message) {
            user = message.mentions.users?.first()
        } else {
            user = interaction.options.getUser('user') as User
        }

        if (!user) {
            userId = userId.replace(/[<@!>]/g, '')
            user = await client.users.fetch(userId)

            if (!user) {
                return `Could not find a user with the ID "${userId}"`
            }
        }

        userId = user.id

        let time
        let type
        try {
            const split = duration.match(/\d+|\D+/g)
            time = parseInt(split![0])
            type = split![1].toLowerCase()
        } catch (e) {
            return "Invalid time format! Example format:\"10d\" where 'd' = days, 'h' = hours and 'm' = minutes. "
        }

        if (type === 'h') {
            time *=60
        } else if (type === 'd') {
            time *= 60 * 24
        } else if (type !== 'm') {
            return 'Please use "m", "h", or "d" for munutes, hours, and days respectively.'
        }

        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + time)

        const result = await punishmentSchema.findOne({
            guildId: guild.id,
            userId,
            type: 'mute',
        })
        if (result) {
            return `<"${userId}> is already muted in this server.`
        }

        try {
            const member = await guild.members.fetch(userId)
            if (member) {
            const muteRole = guild.roles.cache.find((role) =>  role.name === 'Muted')
                if (!muteRole) {
                    return 'This server does not have a "Muted" role.'
                }

                member.roles.add(muteRole)
            }

            await new punishmentSchema({
                userId,
                guildId: guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'mute',
            }).save()
        } catch (ignored) {
            return 'Cannot mute that user'
        }

        return `<@${userId}> has been muted for "${duration}"`
    },
} as ICommand