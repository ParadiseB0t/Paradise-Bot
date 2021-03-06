import { ICommand } from "wokcommands";

export default {
    category: 'admin',
    description: 'Simulates a member joining',

    slash: true,
    testOnly: false,

    callback:({ member, client }) => {
        client.emit('guildMemberAdd', member)
        return 'Join Simulated!'
    }
} as ICommand