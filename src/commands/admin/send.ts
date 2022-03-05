import { TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
  category: 'admin',
  description: 'Sends a message.',

  permissions: ['MANAGE_MESSAGES'],

  minArgs: 2,
  expectedArgs: '<channel> <text>',
  expectedArgsTypes: ['CHANNEL', 'STRING'],

  slash: 'both',
  testOnly: false,
  guildOnly: true,

  callback: ({ message, interaction, args }) => {
    const channel = (
      message
        ? message.mentions.channels.first()
        : interaction.options.getChannel('channel')
    ) as TextChannel
    if (!channel || channel.type !== 'GUILD_TEXT') {
      return 'Please tag a text channel.'
    }

    args.shift() // Remove the channel from the arguments array
    const text = args.join(' ')

    channel.send(text)

    if (interaction) {
      interaction.reply({
        content: 'Send message!',
        ephemeral: true,
      })
    }
  },
} as ICommand