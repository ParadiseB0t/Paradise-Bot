import { ICommand } from 'wokcommands'


export default {
  category: 'Owner',
  description: 'Dms a specified user!', // Required for slash commands
  
  slash: 'both', // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds

  permissions: ['MANAGE_MESSAGES'],

  
  
  callback: ({ message, client, args }) => {	

	let user =
	message.mentions.users.first() ||
	client.users.cache.get(args[0]);
	if (!user)
	return message.channel.send(
	  `You did not mention a user, or you gave an invalid id`
	);
   
	if (!args.slice(1).join(" "))
	return message.channel.send("You did not specify your message");
	user.tag
	user.send(`${args.slice(1).join(" ")}`)
	.catch(() => message.channel.send("That user could not be DMed!"))
	.then(() => message.channel.send(`Sent a message to ${user!.tag}`));
	    
	

  },
} as ICommand