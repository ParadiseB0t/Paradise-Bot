import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with pong!',

    slash: 'both',
    testOnly: false,

    callback: ({ message, interaction }) => {
        return ('Pong')
    },
} as ICommand