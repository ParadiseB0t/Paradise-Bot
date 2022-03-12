import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import { config } from '../config/config'
import { DiscordTogether } from "discord-together"


const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

export const discordTogether = new DiscordTogether(client);

client.once('ready', () => {
  new WOKCommands(client, {
      commandsDir: path.join(__dirname, "commands"),
      typeScript: true,
      mongoUri: config.MONGO_URI,
      dbOptions: {
          keepAlive: true
      },
      botOwners: config.BOT_OWNER,
      testServers: config.TEST_SERVER
  })
  .setDefaultPrefix(config.defaultPrefix)
  .setColor(0x00FF00)
})

client.login(config.TOKEN)
