const prefix = process.env.PREFIX;
module.exports = {
	name: "help",
	aliases: "command",
	description: "Lists all commands or usage info of given command",
	usage: "[command name]",
	execute(msg, args) {
		const data = [];
		const {commands} = msg.client;

		if(!args.length){
			data.push(`Here's the list of all my commands:`)
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`You can send '${prefix}help [command name]' to get info on specific command`);

			return msg.author.send(data, {split: true})
			.then(() => {
				if(msg.channel.type === 'dm') return;
				msg.reply("I have sent you a DM with list of all my commands!!")
			})
			.catch(error => {
				console.error(`Could not send help DM to ${msg.author.tag, error}`);
				msg.reply('Seems like I couldn\'t DM you!\nDo you have DMs disabled?');
			});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return msg.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		if(command.cooldown) data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		msg.channel.send(data, { split: true });
	}
}