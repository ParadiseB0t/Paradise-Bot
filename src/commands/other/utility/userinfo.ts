import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
	description: "shows the info of a user",
	category: "Utility",
	slash: "both",
	aliases: ["user", "inspect", "userinfo", "useri"],
	options: [
		{
			type: "USER",
			name: "user",
			description: "The user u wanna inspect",
			required: false,
		},
	],
	expectedArgs: "[user]",
	guildOnly: true,

	callback: ({ interaction, message, args }) => {
		let member: GuildMember;
		let status = "";
		if (interaction) {
			member = interaction.options.getMember("user") as GuildMember;
			if (member == null) {
				member = interaction.member as GuildMember;
			}
		} else {
			if (args[0]) {
				member = message.mentions.members?.first() as GuildMember;
				if (!member) {
					member = message.member as GuildMember;
				}
			} else {
				member = message.member as GuildMember;
			}
		}
		if (member.presence?.activities) {
			if (member.presence!.activities.length > 0) {
				for (let i = 0; i < member.presence!.activities.length; i++) {
					if (member.presence?.activities[i].type != "CUSTOM") {
						status += `${
							member
								.presence!.activities[i].type.toLowerCase()
								.charAt(0)
								.toUpperCase() +
							member.presence!.activities[i].type.toLowerCase().slice(1)
						} ${member.presence!.activities[i].name}\n`;
					} else {
						status += `${member.presence.activities[i].state}\n`;
					}
				}
			}
		} else {
			status = "No status";
		}
		let uinfo = new MessageEmbed()
			.setAuthor({
				name: member.user.tag,
				iconURL: `${member.user.avatarURL({ size: 1024, dynamic: true })}`,
			})
			.setColor("RANDOM")
			.addFields([
				{
					name: "ID:",
					value: member.user.id,
					inline: true,
				},
				{
					name: "Avatar:",
					value: `[Link](${member.user.avatarURL({
						size: 1024,
						dynamic: true,
					})})`,
					inline: true,
				},
				{
					name: "Account Created:",
					value: `<t:${Math.floor(
						member.user.createdAt.getTime() / 1000
					)}>\n<t:${Math.floor(member.user.createdAt.getTime() / 1000)}:R>`,
					inline: true,
				},
				{
					name: "Status:",
					value: status,
					inline: true,
				},
				{
					name: "Joined server at:",
					value: `<t:${Math.floor(
						member.joinedTimestamp! / 1000
					)}>\n<t:${Math.floor(member.joinedTimestamp! / 1000)}:R>`,
					inline: true,
				},
				{
					name: `Roles:`,
					value: member.roles.cache.map((r) => `${r}`).join(" | "),
					inline: true,
				},
			]);
		return uinfo;
	},
} as ICommand;