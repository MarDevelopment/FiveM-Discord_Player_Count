const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {

    if(message.channel.type === "dm") return;
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Du har ikke tilladelse til at skrive til folk igennem botten..")
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let sendTo = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
        
        if(!sendTo) return message.reply("du skal angive en person du gerne vil skrive til.");
        message.delete(1);

        

        sendToMessage = message.content.slice(9);

        let dmChannel = bot.channels.find(`name`, "legacy-pm");
        if(!dmChannel) return message.channel.send("Could not find DM channel.");

        let sendToEmbed = new Discord.RichEmbed()
        .setDescription(`Besked fra: ${message.guild.name}`)
        .setColor("#d42c20")
        .addField("Skrevet af: ", message.author.username)
        .addField("Personen siger:", `**${sendToMessage}**`);

        let sendToChannel = new Discord.RichEmbed()
        .setDescription(`${message.author.username} skrev til ${sendTo}`)
        .addField("Personen skriver:", sendToMessage);

        console.log(message.author.username + " skrev til " + sendTo.username + " med beskeden " + sendToMessage);
        //dmChannel.send(message.author + " wrote to " + sendTo + " with the message " + sendToMessage);
        dmChannel.send(sendToChannel);
        
        sendTo.send(sendToEmbed);
        
        message.channel.send("✅");


}

module.exports.help = {
    name: "botsend"
}