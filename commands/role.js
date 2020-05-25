module.exports = {
	args: true,
	usage: '<user> <role>',
	name: "role",
	description: "assigns the given role to given user",
	execute(msg, args) {
		msg.channel.send(`You wanted to add ${args[0]} to ${args[1]} role`);
	}
}