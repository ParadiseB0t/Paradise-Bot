import { ICommand } from "wokcommands";
import { GuildMember, MessageEmbed } from "discord.js";

export default {
  category: "Information",
  description: "Find info on a user",
  slash: "both",
  testOnly: true,
  minArgs: 1,
  expectedArgs: "<user>",
  expectedArgsTypes: ["USER"],

  callback: async ({ client, message, interaction }) => {
    const target = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember("user") as GuildMember);
    let avatar = target?.user.displayAvatarURL({ size: 4096, dynamic: true });

    const embed = new MessageEmbed()
      .setColor("GREYPLE")
      .setAuthor(`${target?.displayName} (${target?.user.tag})`, avatar)
      .setFooter(`ID: ${target?.user.id}`)
      .addField(`Guild Join Date:`, `${target?.joinedAt}`, false)
      .addField(`Account Created Date:`, `${target?.user.createdAt}`, false)
      .addField(`Higest Role:`, `<@&${target?.roles.highest.id}>`, true)
      .addField(`Bot:`, `${target?.user.bot}`, true)
      .addField(`Discord Staff:`, `${target?.user.system}`, true)
      .setTimestamp(Date.now());
    return embed;
  },
} as ICommand;