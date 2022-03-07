import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import warnSchema from '../../models/warn-schema'

export default {
    category: 'Moderation',
    description: 'warns a user.',

    permissions: ['ADMINISTRATOR'],
    requiredRoles: true,

    slash: true,
    testOnly: false,
    guildOnly: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Adds a warning to the user',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to add a warning to',
                    required: true,
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'The reason for the warning',
                    required: true,
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'Removes a warning from the user',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to remove a warning from',
                    required: true,
                },
                {
                    name: 'id',
                    type: 'STRING',
                    description: 'The ID of the warning to remove',
                    required: true,
                },
    ],
},
{
    type: 'SUB_COMMAND',
    name: 'list',
    description: 'Lists all warning for the user',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user to list warnings for',
            required: true,
     },
    ],
   },
  ], 

  callback: async ({ guild, member: staff, interaction }) => {
    const subCommand = interaction.options.getSubcommand()
    const user = interaction.options.getUser('user')
    const reason = interaction.options.getString('reason')
    const id = interaction.options.getString('id')

    if (subCommand === 'add') {
const warning = await warnSchema.create({
    userId: user?.id,
    staffId: staff.id,
    guildId: guild?.id,
    reason,
})

return {
    custom: true,
    content: `Added warning ${warning.id} to <@${user?.id}>`,
    allowedMentions: {
        users: [],
    },
}
    } else if (subCommand === 'remove') {
        const warning = await warnSchema.findByIdAndDelete(id)

        return {
            custom: true,
            content: `Removed warning ${warning.id} to <@${user?.id}>`,
            allowedMentions: {
                users: [],
        }
      }
    } else if (subCommand === 'list') {
        const warnings = await warnSchema.find({
            userId: user?.id,
            guildId: guild?.id,
        })

        let description = `Warnings for <@${user?.id}>:\n\n`

        for (const warn of warnings) {
            description += `**ID:** ${warn._id}\n`
            description += `***Date:* ${warn.createdAt.toLocaleString()}\n`
            description += `**Staff:** <"${warn.staffId}>\n`
            description += `**Reason:** <"${warn.reason}>\n\n`
        }

        const embed = new MessageEmbed().setDescription(description)

        return embed
    }
  },
} as ICommand