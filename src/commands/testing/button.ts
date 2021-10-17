import { ButtonInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Testing',
    description: 'Send an embed.',
    slash: true,
    testOnly: true,
    ownerOnly: true,

    callback: async ({ interaction: msgInt, channel }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_yes')
                    .setEmoji('🔨')
                    .setLabel('Confirm')
                    .setStyle('DANGER')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_no')
                    .setLabel('Cancel')
                    .setStyle('SECONDARY')
            )

        const linkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://otakunity.net')
                    .setLabel('Visit Otakunity')
                    .setStyle('LINK')
            )

        await msgInt.reply({
            content: 'Are you sure?',
            components: [row, linkRow],
            ephemeral: false,
        })

        const filter = (btnInt: ButtonInteraction) => {
            return msgInt.user.id === btnInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            componentType: 'BUTTON',
            max: 1,
            time: 1000 * 15,
        })

        // collector.on('collect', (i: ButtonInteraction) => {
        //     i.reply({
        //         content: 'You clicked a button',
        //         ephemeral: true,
        //     })
        // })

        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                msgInt.editReply({
                    content: '⛔ You did not respond in time.',
                    components: [],
                })
                return
            }

            collected.forEach((click) => console.log(click.user.id, click.customId))

            if (collected.first()?.customId === 'ban_yes') {
                // Ban the target user
                await msgInt.editReply({
                    content: 'An action has already been taken.',
                    components: [],
                })
            } else if (collected.first()?.customId === 'ban_no') {
                await msgInt.editReply({
                    content: "Interaction has been cancelled.",
                    components: [],
                })
            }
        })
    },
} as ICommand