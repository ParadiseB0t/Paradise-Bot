import { ICommand } from 'wokcommands'

export default {
  category: 'Fun',
  description: 'Adds two numbers', 

  slash: true, 
  testOnly: true, 

  options: [
    {
      name: 'num1', 
      description: 'The first number.',
      required: true,
      type: 'STRING',
    },
    {
      name: 'num2',
      description: 'The second number.',
      required: true,
      type: 'STRING',
    },
  ],
  callback: ({ interaction, args }) => {
    const num1 = parseInt(args[0])
    const num2 = parseInt(args[1])

    if (interaction) {
      interaction.reply({
        content: String(num1 + num2),
      })
    }
  },
} as ICommand
