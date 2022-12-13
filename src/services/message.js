const { MessageEmbed } = require("discord.js");                   // Ici, on viens initialiser toutes les variables utiles
const w_token  = process.env.WEATHER_TOKEN;                       // à nos fonctions (ex. le token, )
const weather = require('openweather-apis');                      //
const windDirection = require('../utils/windDirection.json');     //
const pays = require('../utils/countries.json');                  //
const cities = require('../utils/cities.json');                   //
 

// Fonction helpcmd qui permet d'afficher la liste complète de tout les commandes
function helpCmd(msg) {
    const embed = new MessageEmbed()
        .setTitle('Liste des commandes')
        .setDescription('Voici la listes des commandes disponibles et fonctionnel pour notre bot :')
        .addFields(
            { name: '\u200B', value: '\u200B' }, // Passages de lignes pour créer de l'espace
            { name: ':/weather `[ta ville]`', value: 'Donne toutes les informations possibles, mais plus généralement' },
            { name: ':/wind `[ta ville]`', value: 'Donne la vitesse et la direction du vent dans la ville donnée' },
            { name: ':/temp `[ta ville]`', value: 'Donne la température dans la ville donnée' },
            { name: ':/rain `[ta ville]`', value: 'Donne la pluie, le taux d\'humidité ainsi que la pression dans la ville donnée' }
        );
    msg.channel.send({ embeds: [embed] });
}

// Fonction weather qui permet d'afficher les informations général sur la météo
function weatherCmd(msg, args) {
    // Permet de transformer la saisi de l'utilisateur en saisi conforme pour l'API
    // Exemple : Si l'utilisateur saisi "brest", "BREST", ou encore "bREst" --> l'API prendre "Brest" comme argument
    const villeNormalise=args[0].toString().toLowerCase().replace(/^\w/, (c) => c.toUpperCase()); 

    weather.setLang('fr');
    weather.setUnits('metric');
    weather.setAPPID(w_token);
    weather.setCity(villeNormalise);
    weather.getAllWeather(function(error, resApi){
        
       if(error) console.error(error);

       console.log(resApi); // Réponse de l'API dans le terminal

       const vent = resApi['wind']['speed']; // En m/s
       const temp = resApi['main']['feels_like']; // En °C
       const clouds = resApi.weather[0].description; // String basique
       const pressure = resApi['main']['pressure']; // En hPa
       
       //var weatherIcon = resApi.weather[0].icon;// Trouve l'icone dynamique du temps 
       
       //const weatherSmiley =`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;//Lien --> image en question dans le lien
       
       
       // Mise en forme du message de réponse pour l'utilisateur
       const embed = new MessageEmbed()
           .setTitle(`Météo de ${villeNormalise}`)
           .setDescription(`Voici le temps qu'il fait à ${villeNormalise}, ${pays[resApi['sys']['country']]}`)
           .addFields(

               { name: '\u200B', value: '\u200B' }, // Passages de lignes pour créer de l'espace
               { name: ` - Temps général :`, value: `On part sur un temps ${clouds}` },
               { name: `🌡️ - Temperature :`, value: `Il fait un petit ${temp}°C` },
               { name: `💨 - Vent :`, value: `Un joli vent de ${vent} m/s (ou ${(Math.round(vent*3.6))}km/h pour les intimes ;))` },
               { name: `⏬ - Pression :`, value: `Avec une pression à ${pressure}hPa, on va la boire !` },
           )
           .setImage(cities[villeNormalise]);

           msg.channel.send({ embeds: [embed]});
    })
}

// Fonction wind qui permet d'afficher les informations de la force et de la direction du vent
function wind(msg, args) {   
    // Permet de transformer la saisi de l'utilisateur en saisi conforme pour l'API
    // Exemple : Si l'utilisateur saisi "brest", "BREST", ou encore "bREst" --> l'API prendre "Brest" comme argument
    const villeNormalise=args[0].toString().toLowerCase().replace(/^\w/, (c) => c.toUpperCase()); 

    weather.setLang('fr');
    weather.setUnits('metric');
    weather.setAPPID(w_token);
    weather.setCity(villeNormalise);
    weather.getAllWeather(function(error, resApi){
         
        if(error) console.error(error);

        console.log(resApi); // Réponse de l'API dans le terminal

        const vent = resApi['wind']['speed'];
        var directionVent = resApi['wind']['deg'];
        
        const directionVentNormalise = Math.round(directionVent/10)*10;
        
        // Mise en forme du message de réponse pour l'utilisateur
        const embed = new MessageEmbed()
            .setTitle(`Météo de ${villeNormalise}`)
            .setDescription(`Voici le vent qu'il y a actuellement à ${villeNormalise}, ${pays[resApi['sys']['country']]}`)
            .addFields(

                { name: '\u200B', value: '\u200B' }, // Passages de lignes pour créer de l'espace
                { name: '💨 - Force du vent :', value: `${vent} m/s ou ${(Math.round(vent*3.6))} km/h ou ${(Math.round((vent*3.6)/1.852))} noeuds` },
                { name: '🧭 - Orientation  :', value: `${windDirection[directionVentNormalise]}` }
            )
            .setImage(cities[villeNormalise]);

        msg.channel.send({ embeds: [embed]});

     })
}

// Fonction temp qui permet d'afficher les différentes informations sur la température
function temp(msg, args) {
    // Permet de transformer la saisi de l'utilisateur en saisi conforme pour l'API
    // Exemple : Si l'utilisateur saisi "brest", "BREST", ou encore "bREst" --> l'API prendre "Brest" comme argument
    const villeNormalise=args[0].toString().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    
    weather.setLang('fr');
    weather.setUnits('metric');
    weather.setAPPID(w_token);
    weather.setCity(villeNormalise);
    weather.getAllWeather(function(error, resApi){
         
        if(error) console.error(error);

        console.log(resApi); // Réponse de l'API dans le terminal

        const tempMin = resApi['main']['temp_min'];
        const tempMax = resApi['main']['temp_max'];
        const tempFeels = resApi['main']['feels_like'];
        const officialTemp = resApi['main']['temp'];
        
        // Mise en forme du message de réponse pour l'utilisateur
        const embed = new MessageEmbed()
        .setTitle(`Météo de ${villeNormalise}`)
            .setDescription(`Voici le vent qu'il y a actuellement à ${villeNormalise}, ${pays[resApi['sys']['country']]}`)
            .addFields(
                { name: '\u200B', value: '\u200B' }, // Passages de lignes pour créer de l'espace
                { name: ':fire: - Température :', value:`${officialTemp}°C`},
                { name: '🥶 - Ressenti :', value: `${tempFeels}°C`},
                { name: '🌡️ - Température Maximum :', value: `${tempMax}°C` },//Même emote que celui sur discord
                { name: '🧊 - Température Minimum :', value: `${tempMin}°C` }
            )
            .setImage(cities[villeNormalise]);

        msg.channel.send({ embeds: [embed]});
    })
}

// Fonction rain qui permet d'afficher les différentes informations sur la pluie, l'humidité, et la pression
function rain(msg, args) {
    // Permet de transformer la saisi de l'utilisateur en saisi conforme pour l'API
    // Exemple : Si l'utilisateur saisi "brest", "BREST", ou encore "bREst" --> l'API prendre "Brest" comme argument
    const villeNormalise=args[0].toString().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    
    weather.setLang('fr');
    weather.setUnits('metric');
    weather.setAPPID(w_token);
    weather.setCity(villeNormalise);
    weather.getAllWeather(function(error, resApi){
         
        if(error) console.error(error);

        console.log(resApi); // Réponse de l'API dans le terminal

        const hum = resApi['main']['humidity'];
        const pression = resApi['main']['pressure'];
        
        // Mise en forme du message de réponse pour l'utilisateur
        const embed = new MessageEmbed()
        .setTitle(`Météo de ${villeNormalise}`)
            .setDescription(`Voici le vent qu'il y a actuellement à ${villeNormalise}, ${pays[resApi['sys']['country']]}`)
            .addFields(
                { name: '\u200B', value: '\u200B' }, // Passages de lignes pour créer de l'espace
                { name: ':sweat_drops: - Humidité :', value:`${hum}%`},
                { name: `⏬ - Pression :`, value: `Avec une pression à ${pression}hPa, on va la boire !` },
            )
            .setImage(cities[villeNormalise]);

        msg.channel.send({ embeds: [embed]});
    })
}

module.exports = {helpCmd, weatherCmd, wind, temp, rain}; // Exporte les différentes fonctions du fichier