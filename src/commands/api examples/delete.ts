import axios from 'axios'
import { ICommand } from 'wokcommands'

export default {
    category: 'Api Examples',
    description: 'Example of a DELETE request',

    permissions: ['ADMINISTRATOR'], 

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<id>',
    expectedArgsTypes: ['NUMBER'],

    slash: true,
    testOnly: true,

    callback: async ({ args }) => {
        let uri = `https://jsonplaceholder.typicode.com/posts/${args[0]}`

        const { data } = await axios.delete(uri)

        console.log(data)
    },
} as ICommand
