const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
        //!kick @user reason
        
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];

	if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Du har ikke tilladelse til at bruge denne kommando.");
        let kUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.reply("Kunne ikke finde personen!");
        let kReason = args.join(" ").slice(22);
        if (!kReason) return message.reply("du skal angive en grund for kicket.");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Denne person kan ikke blive kicked!");
        

        let kickMessageEmbed = new Discord.RichEmbed()
        .setDescription(`Kicked fra: **${message.guild.name}** af ${message.author}`)
        .setColor("#e56b00")
        .addField("Grund: ", kReason);

        kUser.send(kickMessageEmbed).then(()=>
        kUser.kick(kReason)).catch(err => console.log(err))
        
        

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#e56b00")
        .addField("Kicked user:", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked by:", `<@${message.author.id}> with ID ${message.author.id}` )
        .addField("Kicked in:", message.channel)
        .addField("At:", message.createdAt)
        .addField("Reason", kReason);

        let kickChannel = message.guild.channels.find(`name`, "legacy-logs");
        if(!kickChannel) return message.channel.send("Kunne ikke finde log kanalen...");

        
        //message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

        

        return;
    
}

module.exports.help = {
    name: "kick"
}