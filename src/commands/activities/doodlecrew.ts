import { GuildMember, MessageEmbed, Snowflake } from "discord.js";
import { ICommand } from "wokcommands";
import { discordTogether } from "../..";
export default {
	description: "Launches doodlecrew activity",
	slash: "both",
	category: "Activities",
	aliases: ["doodle"],
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
			invite = await discordTogether.createTogetherCode(
				channelID,
				"doodlecrew"
			);
			let embed = new MessageEmbed()
				.setColor("#fde52a")
				.setAuthor({
					name: client.user!.username,
					iconURL: client.user!.displayAvatarURL({
						size: 1024,
						dynamic: true,
					}),
				})
				.addField(
					"Sketch Heads",
					`Acitivity launched in <#${channelID}>. Press [here](${invite.code})`
				);
			return embed;
		} else {
			return "You are not in a voice channel";
		}
	},
} as ICommand;