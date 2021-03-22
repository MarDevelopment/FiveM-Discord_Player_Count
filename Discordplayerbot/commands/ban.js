const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    //!ban @user reason
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.reply("kunne ikke finde personen!");
    let bReason = args.join(" ").slice(22);
    if (!bReason) return message.reply("du skal angive en grund til bannet.");
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("du har ikke tilladelse til at bruge denne kommando.");
    if(bUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Denne person kan ikke blive bannet.");

    


    let banMessageEmbed = new Discord.RichEmbed()
    .setDescription("Banned fra " + "**" + message.guild.name + "**")
    .setColor("#e56b00")
    .addField("Grund: ", bReason);

    bUser.send(banMessageEmbed).then(()=>
  //  kUser.send(`Du er blevet blevet kicket fra ` + message.guild.name + ` med grunden ` + kReason).then(() =>
    bUser.ban(bReason)).catch(err => console.log(err))

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#e56b00")
    .addField("Banned:", `${bUser} with ID ${bUser.id}`)
    .addField("Banned by:", `<@${message.author.id}> with ID ${message.author.id}` )
    .addField("Banned in:", message.channel)
    .addField("At:", message.createdAt)
    .addField("Reason", bReason);

    let banChannel = message.guild.channels.find(`name`, "legacy-logs");
    if(!banChannel) return message.channel.send("Could not find the logs channel..");

    banChannel.send(banEmbed);

    return;
}

module.exports.help = {
    name: "ban"
}