import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import 'dotenv/config'

const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
})

client.on('ready', () => {
  const dbOptions = {
    // These are the default values
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }

  const wok = new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    typeScript: true,
    testServers: ['890664906825801829'],
    botOwners: ['513728046662942722'],
    dbOptions,
    mongoUri: process.env.MONGO_URI
  })
  wok.on('databaseConnected', async (connection, state) => {
    const model = connection.models['wokcommands-languages']
  
    const results = await model.countDocuments()
    console.log(results)
  })
})

client.login(process.env.TOKEN)
