import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Simulates a member joining',

    slash: 'both',
    testOnly: true,

    callback:({ member, client }) => {
        client.emit('guildMemberAdd', member)
        return 'Join Simulated!'
    }
} as ICommand