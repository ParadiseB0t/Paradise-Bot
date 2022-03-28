import { GuildMember, MessageEmbed, Snowflake } from "discord.js";
import { ICommand } from "wokcommands";
import { discordTogether } from "../../..";
export default {
	category: "Activities",
	aliases: ["fish", "fishing"],
	description: "Launches fishington activity",
	slash: true,
	testOnly: true,
	callback: async ({ message, interaction, client }) => {
		let member: GuildMember = interaction
			? interaction.member
			: (message.member as any);
		member.fetch().then((Member) => {
			member = Member;
		});
		if (!member.voice.channel) {
			return "You are not in a voice channel";
		}
		let channelID = member.voice.channelId as Snowflake;
		let invite = await discordTogether.createTogetherCode(channelID, "ocho");
		let embed = new MessageEmbed()
			.setColor("#f09d27")
			.setAuthor({
				name: client.user!.username,
				iconURL: client.user!.displayAvatarURL({
					size: 1024,
					dynamic: true,
				}),
			})
			.addField(
				"Fishington",
				`Acitivity launched in <#${channelID}>. Press [here](${invite.code})`
			);
		return embed;
	},
} as ICommand;