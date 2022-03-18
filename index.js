const dotenv = require('dotenv').config();
const { CommandoClient, Client } = require('discord.js-commando');
const path = require('path');
const config = require('./config');

const client = new CommandoClient({
    commandPrefix: '-',
    owner: '352491753544351747',
    invite: 'https://discord.gg/fhYj9ahn', 
    invite: 'https://discord.gg/YE2T2qNG',
    invite: 'https://discord.gg/5xBkCBYu',
    invite: 'https://discord.gg/AhgFZffp'
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'Music')
    .registerGroup('command', 'Command')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.server = {
    queue: [],
    currentVideo: {title:"Rien pour le moment", url: ""},
    dispatcher: null,
    connection: null
};


client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} -  (${client.user.id})`);
})

client.on('error', (error) => console.error(error));

client.login(process.env.TOKEN);