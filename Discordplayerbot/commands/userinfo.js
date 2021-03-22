const Discord = require("discord.js");
const moment = require("moment");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;

    let user = message.mentions.users.first() || message.author;

    let botIcon = bot.user.displayAvatarURL;
    let userInfoEmbed = new Discord.RichEmbed()
    .setDescription(`**User Info**`, `yes`)
    .setImage(botIcon)
    .setFooter(`${bot.user.username}`)
    .addField(`**Nickname:**`, `${user.username}`)
    .addField(`**Discriminator:**`,`${user.discriminator}`)
    .addField(`**ID:**`, `${user.id}`)
    .addField(`**Spil:**`, `${user.presence.game}`)
    .addField(`**Status:**`, `${user.presence.status}`)
    .addField(`**Joined at:**`, moment(message.guild.members.get(user.id).user.joinedAt).format("MMMM Do YYYY, h:mm a"))
    .addField(`**Registered at:**`, moment(message.guild.members.get(user.id).user.createdAt).format("MMMM Do YYYY, h:mm a"))

    
    message.channel.send(userInfoEmbed);

}

module.exports.help = {
    name: "userinfo"
}