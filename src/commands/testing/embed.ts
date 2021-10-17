import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"

export default {
    category: 'Testing',
    description: 'Sends an embed',

    permissions: ['ADMINISTRATOR'],

    callback: async ({ message, text }) => {
        const json = JSON.parse(text)

        const embed = new MessageEmbed(json)

        return embed
        
 // const embed = new MessageEmbed()
        // .setDescription('Hello World')
        // .setTitle('Title')
        // .setColor('RANDOM')
        // .setAuthor('Canvas')
        // .setFooter('Footer')
        // .addFields([
        //     {
        //     name: 'name',f
        //     value: 'value',
        //     inline: true,
        // },
        // {
        //     name: 'name 2',
        //     value: 'value 2',
        //     inline: true,
        // }])
        // .addField('name 3', 'value 3')

        // const newMessage = await message.reply({
        //     embeds: [embed]
        // })

        // await new Promise(resolve => setTimeout(resolve, 5000))

        // const newEmbed = newMessage.embeds[0]
        // newEmbed.setTitle('Edited Title')

        // newMessage.edit({
        //     embeds: [newEmbed]
        // })


    },
} as ICommand