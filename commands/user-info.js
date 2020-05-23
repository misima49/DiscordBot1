module.exports = {
	name: "user-info",
	description: "Displays the user info of the author of the message",
	execute(msg, args) {
		msg.channel.send(`Username: ${msg.author.username}\nUserid: ${msg.author.id}`);
	}
}