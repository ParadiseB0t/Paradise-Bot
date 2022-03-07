import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import { DiscordTogether } from "discord-together"
import 'dotenv/config'

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

  const wok = new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    typeScript: true,
    testServers: process.env.TEST_SERVER,
    mongoUri: process.env.MONGO_URI,
    botOwners: process.env.BOT_OWNER,
  })
    

  wok.on('databaseConnected', async (connection, state) => {
    const model = connection.models['wokcommands-languages']
  
    const results = await model.countDocuments()
    console.log(results)
  })

client.login(process.env.TOKEN)
