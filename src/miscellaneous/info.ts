import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const humanizeDuration = require("humanize-duration");

let embed
let ping

export default {
    category: 'Miscellaneous',
    description: 'Displays any relevant information on the bot',

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    options: [{
        type: 'SUB_COMMAND',
        name: 'all',
        description: 'Displays all relevant information on the bot',
    },{
        type: 'SUB_COMMAND',
        name: 'ping',
        description: 'Displays the ping of the bot',
    },{
        type: 'SUB_COMMAND',
        name: 'uptime',
        description: 'Displays the uptime of the bot',
    },
    {
        type: 'SUB_COMMAND',
        name: 'hosting',
        description: 'Displays the host of the bot',
    },
    {
        type: 'SUB_COMMAND',
        name: 'guilds',
        description: 'Displays the information of the bots guilds',
    },
    {
        type: 'SUB_COMMAND',
        name: 'nerd_stuff',
        description: 'Displays nerd stats of the bot',
    },
    {
        type: 'SUB_COMMAND',
        name: 'support',
        description: 'Displays how to get support for the bot',
    }],

    callback: async ({ guild, message, interaction, client }) => {
        const subCommand = interaction.options.getSubcommand()
        const totalMembers = client.guilds.cache.map(guild => guild.memberCount).reduce((a,b) => a + b, 0);
        const totalGuilds = client.guilds.cache.size

        if (subCommand === "all") {
            if (interaction) {
                ping = interaction.createdTimestamp
            } else {
                ping = message.createdTimestamp
            }
            
            embed = new MessageEmbed()
            .setColor('#00f9fc')
            .setTitle('All Relevant Information')
            .setURL('https://discord.gg/Wxgrh7aVHR')
            .addFields(
                {name: 'Bot Tag', value: `The Bots current tag is ${client.user?.tag}`, inline: true},
                {name: 'Basic Info', value: 'This is Rumbler bot. A Multi-Bot made for Discord by Chopkeys#0211', inline: true},
                {name: 'Guild Info', value: `The bot is currently in ${totalGuilds} guilds and in those guilds there is ${totalMembers} members`, inline: true},
                {name: 'Ping', value: `Latency is ${Date.now() - ping}ms. API Latency is ${Math.round(client.ws.ping)}ms | 🏓`, inline: true},
                {name: 'Uptime', value: `The bots current uptime is ${humanizeDuration(client.uptime)}`, inline: true},
                {name: 'Hosting', value: `The bot is currently hosted on the cheapest VPS tier at https://contabo.com`, inline: true}
            )

            return embed
        }
        
        if (subCommand === "ping") {
            if (interaction) {
                embed = new MessageEmbed()
                .setColor('#00f9fc')
                .setTitle('Bot Latency And Ping')
                .setURL('https://discord.gg/Wxgrh7aVHR')
                .setDescription(`🏓 | Latency is **${Date.now() - interaction.createdTimestamp}ms**. API Latency is **${Math.round(client.ws.ping)}ms**.`)
            } else {
                embed = new MessageEmbed()
                .setColor('#00f9fc')
                .setTitle('Bot Latency And Ping')
                .setURL('https://discord.gg/Wxgrh7aVHR')
                .setDescription(`🏓 | Latency is **${Date.now() - message.createdTimestamp}ms**. API Latency is **${Math.round(client.ws.ping)}ms**.`)
            }
        
            return embed
        }

        if (subCommand === "uptime") {
            embed = new MessageEmbed()
            .setColor('#00f9fc')
            .setTitle('Bot Uptime')
            .setURL('https://discord.gg/Wxgrh7aVHR')
            .setDescription(`The bots current uptime is **${humanizeDuration(client.uptime)}**`)

            return embed
        }

        if (subCommand === "hosting") {
            embed = new MessageEmbed()
            .setColor('#00f9fc')
            .setTitle('Information On The Bots Hosting')
            .setURL('https://discord.gg/Wxgrh7aVHR')
            .setDescription(`The bot is currently hosted on the cheapest VPS tier at https://contabo.com`)

            return embed
        }

        if (subCommand === "guilds") {
            embed = new MessageEmbed()
            .setColor('#00f9fc')
            .setTitle('Information on the Bots Guilds')
            .setURL('https://discord.gg/Wxgrh7aVHR')
            .addFields(
                {name: "Guilds", value: `The bot is currently in **${totalGuilds}** guilds`},
                {name: "Members", value: `In those guilds there is **${totalMembers}** members`},
            )

            return embed
        }

        if (subCommand === "support") {
            embed = new MessageEmbed()
            .setColor('#00f9fc')
            .setTitle('Information on the Bots Guilds')
            .setURL('https://discord.gg/Wxgrh7aVHR')
            .setDescription('To get help for the bot you can click on the name of any embeds or click on the invite link in the description of the bot')

            return embed
        }

        if (subCommand === 'nerd_stuff') {
            embed = new MessageEmbed()
            .setColor('#00f9fc')
            .setTitle('Nerd Stuff')
            .setURL('https://discord.gg/Wxgrh7aVHR')
            .addFields(
                {name: 'Library', value: 'discord.js', inline: true},
                {name: 'Database', value: 'Mongo DB', inline: true},
                {name: 'Server Stats', value: '4 vCPU Cores, 8 GB RAM, 200 GB SSD, 1 Snapshot, 32 TB Traffic (Unlimited Incoming)', inline: true},
                {name: 'Docs', value: 'COMING SOON', inline: true}
            )

            return embed
        }
    }
} as ICommand