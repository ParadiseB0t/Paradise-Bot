import econonmySwitchSchema from "../../../models/economy-switch-schema";
import { ICommand } from "wokcommands";
import economySwitchSchema from "../../../models/economy-switch-schema";
import { config } from "../../../../config/config";
import Economy from "../../../functions/economy";
import { MessageEmbed } from "discord.js";

let embed

export default {
    category: 'Economy',
    description: 'Checks your balance',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'onoroff',
            type: 'BOOLEAN',
            description: 'Do you want your server to run a global economy (Across all servers) or a server only economy',
            required: true,
        }
    ],

    callback: async ({interaction, guild, user}) => {
        const tof = interaction.options.getBoolean('onoroff')

        const onOrOff = await economySwitchSchema.findOneAndUpdate({
            guildId: interaction.guildId,
            trueOrFalse: tof
        })

        embed = new MessageEmbed().setColor('#feed83').setTitle('Economy Switch').setDescription(`Your economy switch has been set to ${tof}`).setFooter(`Paradise Beta | Version ${config.version}`).setTimestamp(Date.now()) 
        return embed
    }
} as ICommand
