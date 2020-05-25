module.exports = {
	args: true,
	usage: '<user>',
	name: "kick",
	description: "kicks the mentioned user from the server",
	execute(msg, args) {
		msg.channel.send(`You wanted to kick ${args[0]} from server`);
	}
}