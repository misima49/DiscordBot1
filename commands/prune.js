module.exports = {
	name: "prune",
	description: "Deletes the requested no. of messages (2-100)",
	execute(msg, args){
		const amount = parseInt(args[0]);
 		if(isNaN(amount)){
 			msg.channel.send("That's not a number");
 		}
 		else if(amount < 2 || amount > 100){
 			msg.channel.send("Number should be between 2 and 100");
 		}
 		else{
 			msg.channel.bulkDelete(amount, true);
 		}
	}
}