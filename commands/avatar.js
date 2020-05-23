module.exports = {
	name: "avatar",
	description: "shows avatar of the of the mentioned users",
	execute(msg, args) {
		if(!msg.mentions.users.size){
 			msg.channel.send(`Your Avatar: ${msg.author.displayAvatarURL({format: "png", dynamic: "false"})}`)
 		}
 		else{
 			const avatarList = msg.mentions.users.map(user => {
 				msg.channel.send(`${user.username}'s Avatar: ${user.displayAvatarURL({format: "png", dynamic: "false"})}`);
 			});
 		}
	}
}




