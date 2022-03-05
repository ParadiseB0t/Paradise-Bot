import { ICommand } from 'wokcommands'

export default {
    name: "echo",
    description: "says back what you type in",
    category: "fun",
    
    testOnly: false, 
    slash: true,
  
    options: [{
      name: "input",
      description: "text you want to be sent back to the channel",
      required: true,
      type: 3
    }],
    
    callback: ({ interaction, args }) => {
      
      const string = interaction.options.getString('input');
      
      if (interaction) {
        interaction.reply({
          content: string
        });
      }
    } 
} as ICommand
