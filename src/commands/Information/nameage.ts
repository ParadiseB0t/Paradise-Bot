import { ICommand } from 'wokcommands'

export default {
  category: 'Information',
  description: 'Displays your name and age', 
  slash: true,
  testOnly: true,

  minArgs: 2,
  expectedArgs: '<name> <age>',
  
  callback: ({ interaction, args }) => {
    const [name, age] = args

    if (interaction) {
      interaction.reply({
        content: `Hello my name is ${name} and I am ${age} years old.`
      })
    }
  }
} as ICommand