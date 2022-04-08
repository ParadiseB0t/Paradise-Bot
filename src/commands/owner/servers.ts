import { ICommand } from "wokcommands";

export default {
	description: "shows all the servers the bot is in",
	category: "Owner",
	slash: true,
	testOnly: true,
	ownerOnly: true,
	hidden: true,
	callback: ({ message, client }) => {
		const servers = client.guilds.cache.map((guild) => guild.name).join(", ");
		return servers;
	},
} as ICommand;