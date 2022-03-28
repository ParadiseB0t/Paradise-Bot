import  "discord.js";
import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";


export default{

    name: 'nickname',
    category: 'Moderation',
    aliases: ['nick'],
    description: 'Sets a Users NickName',
   
    permissions: ['MANAGE_NICKNAMES'], 
    
    minArgs: 2, 
     expectedArgs: '<User> <Nickname>',
     expectedArgsTypes: ['USER', 'STRING'],
     guildOnly: true,



    slash: true,
    testOnly: false,
    


    callback: async({ client, interaction ,message, args}) => {

        const mentionedMember = message ? message.mentions.members?.first()
        : interaction.options.getMember('user') as GuildMember

        args.shift()
        const nickName = args.join('')
        //gets the nickname

        
        if(!mentionedMember){
            return 'Please mention a user for me to change there nickname \`>nickname @user nickname\`'
        }
        if (!nickName) {
            return 'Please mention a nickname for me to change this users nickname'
        }

        if (!mentionedMember.kickable){
        return 'This User Has a senior rank then me i cant change his nickname'
        }
        
         await mentionedMember.setNickname(nickName) 

         return `Successfuly Changed ${mentionedMember} Nickname to ${nickName}`
         
        
        //changes the nickname to the specified nickname and sends a message Successfuly
    
    },

}as ICommand