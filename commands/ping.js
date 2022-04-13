const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bots Ping!'),
    global: false,
    async execute(interaction) {
        await interaction.reply({ content: '🏓 Ping : ...', ephemeral: true });
        await interaction.editReply({ content: `🏓 Pong : \`${Math.floor(interaction.client.ws.ping)}ms\` `, ephemeral: true })
    }
}