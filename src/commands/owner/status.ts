import { Status } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'configuration',
    description: 'Sets the bots status {BOT DEV ONLY}',

    minArgs: 1,
    expectedArgs: '<Status>',

    slash: 'both',
    testOnly: false,
    ownerOnly: true,
    

 

 callback: ({client, text}) => {
    client.user?.setPresence({
        status: 'online',
        activities: [
            {
                name: text
            }
        ]
    })


    return 'Status updated!'

 }
} as ICommand