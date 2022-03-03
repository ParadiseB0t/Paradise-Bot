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
            const data: any = await axios.get(`https://discord.com/api/users/${target.id}`, {
                headers: {
                    Authorization: `Bot ${interaction.client.token}`
                }
            }).then(data => data.data)

            if (data.banner) {
                let bannerUrl = data.banner.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096'
                bannerUrl = `https://cdn.discordapp.com/banners/${target.id}/${data.banner}${bannerUrl}`

                const embed = new MessageEmbed()
                    .setColor(0x5865F2)
                    .setTitle(`${target.tag}'s Banner`)
                    .setImage(bannerUrl)

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setURL(bannerUrl)
                            .setLabel('Banner URL')
                            .setStyle('LINK')
                    )

                return interaction.reply({
                    embeds: [embed],
                    components: [row],
                })
            }

            return interaction.reply({
                content: `${target.tag} doesn't have a banner.`
            })
        } catch (e) {
            console.error(e)
        }
    },
} as ICommand