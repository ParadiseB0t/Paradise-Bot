
import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";

export default {
    category: 'Information',
    description: 'Gets the latency and api latency of the bot',
    slash: 'both',
    testOnly: true,

    callback: async ({client, message, interaction}) => {
        const lat = message ? `${Date.now() - message.createdTimestamp}ms` : `${Date.now() - interaction.createdTimestamp}ms`
        const api = `${Math.round(client.ws.ping)}ms`
        const embed = new MessageEmbed()
            .setColor('GREYPLE')
            .addField('Latency:', lat, true)
            .addField('API:', api, true)
            return embed
    }
} as ICommand