import {Client, Message,} from'discord.js';
import { ICommand } from "wokcommands";


    export default{
        name: 'ping',
        description: 'Fetches the client latency',
        category: 'Utilities',
    
        slash: 'both',
        testOnly: false,
    
    
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
    
         callback: async({ client, message, interaction, args }) => {
            if (message) {
                const msg = await message.channel.send ({content: `> 🏓 Pinging..`})
                msg.edit({content: `> 🏓 Pong! Latency: **${client.ws.ping}ms**`})
            }
            else if (interaction) {
                await interaction.reply({content: `> 🏓 Pinging..`});
                interaction.editReply({content: `> 🏓 Pong! Latency: **${client.ws.ping}ms**`});
            }
        }

} as ICommand