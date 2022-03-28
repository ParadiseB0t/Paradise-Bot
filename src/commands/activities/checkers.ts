import { GuildMember, MessageEmbed, Snowflake } from "discord.js";
import { ICommand } from "wokcommands";
import { discordTogether } from "../..";
export default {
	description: "Launches checkers activity",
	slash: true,
	category: "Activities",
	callback: async ({ interaction, message, client }) => {
		let member: GuildMember;
		let channelID: Snowflake = "";
		let invite: any;
		if (interaction) {
			member = interaction.member as GuildMember;
		} else {
			member = message.member as GuildMember;
		}
		member.fetch().then((Member) => {
			member = Member;
		});
		if (member.voice.channel) {
			channelID = member.voice.channelId as Snowflake;
			invite = await discordTogether.createTogetherCode(channelID, "checkers");
			let embed = new MessageEmbed()
				.setColor("NOT_QUITE_BLACK")
				.setAuthor({
					name: client.user!.username,
					iconURL: client.user!.displayAvatarURL({
						size: 1024,
						dynamic: true,
					}),
				})
				.addField(
					"Checkers In The Park",
					`Acitivity launched in <#${channelID}>. Press [here](${invite.code})`
				);
			return embed;
		} else {
			return "You are not in a voice channel";
		}
	},
} as ICommand;