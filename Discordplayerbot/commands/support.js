const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    //HER SKAL DIN KOMMANDO VÆRE

    let supportChannelId = message.guild.channels.find(`name`, "support");
    let toSupportChannel = message.guild.channels.find(`name`, "test");
    let supportRole = message.guild.roles.find(`name`, "neger");

    let caller = message.author;

    let reason = args[0]

    if(message.channel.id !== supportChannelId.id) {
        message.reply(` du kan kun oprette en support-case i ${supportChannelId}.`);
        return
    }
    else{
        if(!reason){
            message.reply(`du skal skrive en årsag til din support-case.`);
            return
        }
        else{
            message.delete();
            message.reply(`support-case oprettet.`);
            toSupportChannel.send(`${supportRole}.`);

            let supportEmbed = new Discord.RichEmbed()
            .setDescription(`Support: ${caller}`)
            .setColor("#e56b00")
            .addField("Grund:", `**${reason}**`)
            .addField("Klokken:", message.createdAt)
            toSupportChannel.send(supportEmbed);
        }
    }
}

module.exports.help = {
    name: "support" //NAVNET ER LIG MED KOMMANDOEN
}