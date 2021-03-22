const Discord = require('discord.js'); //Java har brug for at vide det er discord
const bot = new Discord.Client(); // botten er lig med dens client
const fs = require("fs"); // bruges til at læse commands fra anden mappe
const botconfig = require('./botconfig.json'); // tager bot config 
const fivereborn = require('fivereborn-query'); // tager reborn query (bruges til at sætte bot activity)
bot.commands = new Discord.Collection(); // tillader brug af kommando fra ekstern mappe

// lavet af legacy#0415

const token = 'token her'; //Dette er discord bottens token som den skal bruge til at logge ind med

fs.readdir("./commands/", (err, files) => { // læser directory omkring commands
    if(err) console.log(err); //logger hvis der er fejl

    let jsfile = files.filter(f => f.split(".").pop() === "js") //søger js filer
    if(jsfile.length <= 0){ // hvis der er mindre eller lig med nul js filer kan den ikke finde kommandoerne da der ingen kommandoer er
        console.log("Couldn't find commands."); // logger fejl
        
        return;
    }

    jsfile.forEach((f, i) => { // tager hver java fil
        let props = require(`./commands/${f}`);  //finder directory
        console.log(`Loaded command ${f}.`); // printer hvilke kommandoer der er loaded
        console.log(`--------------------------`); // printer fin opstilling mellem kommandoer
        bot.commands.set(props.help.name, props); //tillader brug af kommandoer fra ekstern mappe
    });
});

fs.readdir('./events', async (err, files ) => { //læser events mappe
    if (err) return console.error; //logger fejl
    files.forEach(file => { //tager hvert event
        if(!file.endsWith('.js')) return; //hvis event filen slutter på js
        const evt = require(`./events/${file}`); //event filen skal hedde det samme som selve eventet
        let evtName = file.split('.')[0]; //tager event navn
        console.log(`Loaded event ${evtName}.`); // logger hvilke events der er loaded
        console.log(`--------------------------`); // laver fin opstilling
        bot.on(evtName, evt.bind(null, bot));
    })

})

bot.on('ready',() =>{ // Når botten er klar skal den
    console.log(`${bot.user.username} er klar.`) //Skriver i console den er klar

    
})

function activity(){ // laver funktionen activity
    setTimeout(() => { // laver et loop
        fivereborn.query("IP","PORT", (err, data) => { // starter fivereborn event, IP:PORT
            if (err) { // logger hvis der er fejl
                console.log(err); // logger fejlen
            } else { //  ellers skal den sætte activity
                bot.user.setActivity(`${data.clients}/${data.maxclients} i byen`, { type: "WATCHING" }); // sætter activity til spillere inde / max spillere i byen
            }
        });
        activity(); 
    }, 1000);
}
activity();

bot.on('message', async message =>{
    let messageArray = message.content.split(" "); 
    let args = messageArray.slice(1); // Tager args
    let cmd = messageArray[0]; // tager det første ord som er lig med kommandoen
    let prefix = botconfig.prefix; // Tager prefixet fra bot config
    let commandfile = bot.commands.get(cmd.slice(prefix.length)); // Bruger kommando fra ekstern mappe
    if(commandfile) commandfile.run(bot, message, args); // Hvis det er en kommando fra ekstern mappe skal den bruges alligevel
})

bot.login(token) //Logger botten ind