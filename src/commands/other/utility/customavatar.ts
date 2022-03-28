import {
    Constants,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from 'discord.js'
import { ICommand } from 'wokcommands'
import axios from 'axios'

export default {
    category: 'Utility',
    description: 'Display user banner.',

    slash: true,
    testOnly: false,
    guildOnly: true,

    expectedArgs: '<user>',
    options: [
        {
            name: 'user',
            description: 'The target user.',
            required: false,
            type: Constants.ApplicationCommandOptionTypes.USER,
        },
    ],

    callback: async ({ interaction }) => {
        const target = interaction.options.getUser('user') || interaction.user

        try {
            const data: any = await axios.get(`https://discord.com/api/guilds/${interaction.guild?.id}/members/${target.id}`, {
                headers: {
                    Authorization: `Bot ${interaction.client.token}`
                }
            }).then(data => data.data)

            if (data.avatar && data.avatar != target.avatar) {
                console.log(data.avatar)
                let avatarUrl = data.avatar.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096'
                avatarUrl = `https://cdn.discordapp.com/guilds/${interaction.guild?.id}/users/${target.id}/avatars/${data.avatar}${avatarUrl}`

                const embed = new MessageEmbed()
                    .setColor(0x5865F2)
                    .setTitle(`${target.tag}'s Custom Avatar`)
                    .setImage(avatarUrl)

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setURL(avatarUrl)
                            .setLabel('Custom Avatar URL')
                            .setStyle('LINK')
                    )

                return interaction.reply({
                    embeds: [embed],
                    components: [row],
                })
            }

            return interaction.reply({
                content: `${target.tag} doesn't have a custom avatar.`
            })
        } catch (e) {
            console.error(e)
        }
    },
} as ICommand