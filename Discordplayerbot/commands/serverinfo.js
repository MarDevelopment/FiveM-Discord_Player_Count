const Discord = require("discord.js");
const moment = require("moment");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;

    let botIcon = bot.user.displayAvatarURL;
    let serverInfoEmbed = new Discord.RichEmbed()
    .setDescription(`**Server Info**`, `yes`)
    .setImage(botIcon)
    .setFooter(`${bot.user.username}`)
    .addField(`**Server navn:**`, `${message.guild.name}`)
    .addField(`**Medlemmer:**`, `${message.guild.members.size}`)
    .addField(`**Bots:**`, message.guild.members.filter(members => members.user.bot === true).size)
    .addField(`**Online:**`, message.guild.members.filter(members => members.presence.status != "offline").size)
    .addField(`**Offline:**`, message.guild.members.filter(members => members.presence.status = "offline").size)
    .addField(`**Opretterede server d.:**`, moment(message.guild.createdAt).format("MMMM Do YYYY, h:mm a"))

    
    message.channel.send(serverInfoEmbed);
}

module.exports.help = {
    name: "serverinfo"
}