const prefixCmd = ':/';
const {helpCmd, weatherCmd, wind, temp, rain} = require('./message.js'); // Importe toutes les fonctions nécessaires au fonctionnement des commandes

const message = (msg) => {
   if(!msg.content.startsWith(prefixCmd) || msg.author.bot) return

   const args = msg.content.slice(prefixCmd.length).trim().split(/ +/);
   const command = args.shift().toLowerCase();
    
   // !help, liste l'intégralité des commandes disponibles et fonctionnels du Weather Bot
   if(command === "help") {
      helpCmd(msg)
   }

   // !weather
   if(command === "weather") {
      try {
         weatherCmd(msg, args);  // Appelle la fonction weather défini dans message.js
      } catch (error) {
         msg.reply("Désolé, je n'ai pas compris ta commande ! Si tu veux plus d'informations, fait `:/help`");    
      }     
   }

   // !wind
   if(command === "wind") {
      try {
         wind(msg, args); // Appelle la fonction wind défini dans message.js
      } catch (error) {
         msg.reply("Désolé, je n'ai pas compris ta commande ! Si tu veux plus d'informations, fait `:/help`");
      }
   }

   // !temp
   if(command === "temp") {
      try{
         temp(msg, args); // Appelle la fonction temp (température) défini dans message.js
      } catch (error) {
         msg.reply("Désolé, je n'ai pas compris ta commande ! Si tu veux plus d'informations, fait `:/help`");
      }
   }

   // !rain
   if(command === "rain") {
      try{
         rain(msg, args); // Appelle la fonction rain défini dans message.js
      } catch (error) {
         msg.reply("Désolé, je n'ai pas compris ta commande ! Si tu veux plus d'informations, fait `:/help`");
      }
   }
}

module.exports = message;
