import { Canvacord } from 'canvacord'
import { Message, MessageAttachment, User } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Fun',
    description: 'Image system',
    slash: true,
    testOnly: true,
    options: [{
        name: 'target',
        description: 'Select the target',
        type: 'USER',
        required: true
    },
    {
        name: 'image',
        description: 'Choose a image filter',
        type: 'STRING',
        required: true,
        choices: [
            {
                name: 'rip',
                value: 'rip'
            },
            {
                name: "trash",
                value: "trash"
            },
            {
                name: "rainbow",
                value: "rainbow"
            },
            {
                name: "sepia",
                value: "sepia"
            },
            {
                name: "shit",
                value: "shit"
            },
            {
                name: "slap",
                value: "slap"
            },
            {
                name: "spank",
                value: "spank"
            },
            {
                name: "triggered",
                value: "triggered"
            },
            {
                name: "wanted",
                value: "wanted"
            },
            {
                name: "wasted",
                value: "wasted"
            },
            {
                name: 'overheadjoke',
                value: 'overhead'
            },
            {
                name: 'delete',
                value: 'delete'
            },
            {
                name: 'jail',
                value: 'jail'
            },
            {
                name: 'affect',
                value: 'affect'
            }
        ]
    }],
    callback: async ({ interaction }) => {
        const { options } = interaction
        const target = options.getUser('target') as User
        const choices = interaction.options.getString('image') as String

        switch(choices) {
            case 'rip' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.rip(avatar)

                const attachment = new MessageAttachment(image, 'rip.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'trash' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.trash(avatar)

                const attachment = new MessageAttachment(image, 'trash.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'rainbow' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.rainbow(avatar)

                const attachment = new MessageAttachment(image, 'rainbow.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'sepia' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.sepia(avatar)

                const attachment = new MessageAttachment(image, 'sepia.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'shit' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.shit(avatar)

                const attachment = new MessageAttachment(image, 'shit.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'slap' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.slap(interaction.user.displayAvatarURL({ format: 'png'}), avatar)

                const attachment = new MessageAttachment(image, 'slap.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'spank' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.spank(interaction.user.displayAvatarURL({ format: 'png'}), avatar)

                const attachment = new MessageAttachment(image, 'spank.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'triggered' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.trigger(avatar)

                const attachment = new MessageAttachment(image, 'triggered.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'wanted' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.wanted(avatar)

                const attachment = new MessageAttachment(image, 'wanted.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'wasted' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.wasted(avatar)

                const attachment = new MessageAttachment(image, 'wasted.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'overhead' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.jokeOverHead(avatar)

                const attachment = new MessageAttachment(image, 'overhead.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'jail' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.jail(avatar, true)

                const attachment = new MessageAttachment(image, 'jail.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'delete' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.delete(avatar, true)

                const attachment = new MessageAttachment(image, 'delete.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
            case 'affect' : {
                const avatar = target.displayAvatarURL({ format: 'png'})

                const image = await Canvacord.affect(avatar)

                const attachment = new MessageAttachment(image, 'affect.gif')

                interaction.reply({ files: [attachment]})
            }
            break;
        }
    }
} as ICommand