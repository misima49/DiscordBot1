require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const prefix = process.env.PREFIX;

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

console.log(client);

//ready the bot once and send a message in test channel on start up
client.once('ready', () => {
	console.log(`${client.user} ready to roll`);
    client.channels.fetch('711471993320636448')
    .then(channel => {
        channel.send("Watashiga Kita");
    })
});

client.on('message', msg => {
	if (msg.content.startsWith("Hello Aoi")) {
		client.commands.get('Hello Aoi').execute(msg);
	}
 	else if(msg.content == "who is my friend"){
 		client.commands.get('who is my friend').execute(msg);
 	}

	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if(!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.find(commandName));

	if(command.args && !args.length){
		let reply = "!!!You didn't provide any arguments!!!, ";
		if(command.usage){
			reply += `provide ${command.usage} in this format`;
		}
		return msg.reply(reply);
	}
 	try{
 		command.execute(msg, args);
 	}
 	catch(error){
 		console.error(error);
 		msg.reply("!!!There was an error executing this command!!!");
 	}
 });


client.login();