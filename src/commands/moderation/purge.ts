import { ICommand } from "wokcommands";

export default {
  category: "Moderation",
  description: "Purges a set amount of messages the user defines",
  slash: "both",
  permissions: ["MANAGE_MESSAGES"],
  testOnly: true,
  minArgs: 1,
  expectedArgs: "<number>",
  expectedArgsTypes: ["NUMBER"],

  callback: ({ args, channel }) => {
    let fuck = args[0];
    const input = parseInt(fuck);
    if (input > 100) {
      return "❌ **Number must be less then 100**";
    }
    if (input < 0) {
      return "❌ **Number must be more then 0**";
    }
    channel.bulkDelete(input);
    return `**${input} messages deleted** ♻`;
  },
} as ICommand;