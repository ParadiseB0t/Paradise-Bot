import axios from 'axios'
import { ICommand } from 'wokcommands'

export default {
    category: 'Api Examples',
    description: 'Example of a POST request',

    permissions: ['ADMINISTRATOR'], 

    slash: 'both',
    testOnly: true,

    callback: async ({}) => {
        const { data } = await axios.post(
            'https://jsonplaceholder.typicode.com/posts',
            {
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        console.log(data)
    },
} as ICommand
