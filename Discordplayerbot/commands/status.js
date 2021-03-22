const Discord = require("discord.js");
const bot = new Discord.Client();
const fivereborn = require('fivereborn-query')

module.exports.run = async (bot, message, args) => {

    let serverIp = "gardonrp.dk" // definere ipen på serveren
    let serverPort = "30120" // definere porten på serveren.

    fivereborn.query(serverIp, serverPort, (err, data) => { // starter firereborn event
        if (err) { //hvis der er fejl
            console.log(err) // log fejlen
        } else { // ellers skal den lave et embed med information om serveren
            let statusEmbed = new Discord.RichEmbed() 
            .setColor("#d42c20") // sætter farven for embed
            .addField("**Ip:**", `${serverIp}:${serverPort}`) // tilføjer et felt med ip og port
            .addField("**Online:**", `${data.clients}/${data.maxclients}`) // laver felt med hvor mange personer der er i byen
            .addField("**Server navn:**", `${data.hostname}`) // serverens navn i server listen.
            message.channel.send(statusEmbed); // sender embed
        }
    })
}

module.exports.help = {
    name: "status"
}