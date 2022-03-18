const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");
const { UserVoiceInNotChannel } = require('../../strings.json');
const ytdl = require('ytdl-core-discord');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client,{
            name: 'play',
            aliases: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'Lit une musique depuis votre plateform',
            args : [
                {
                    key: 'query',
                    prompt: 'Quel musique voulez-vous lire?',
                    type: 'string'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message, { query }){
        const server = message.client.server;

        if (!message.member.voice.channel) {
            return message.say(UserVoiceInNotChannel)
        }

        await message.member.voice.channel.join().then((connection) => {
            if(server.currentVideo.url != ""){
                server.queue.push({ title: "", url: query });
                return message.say("Ajouté à la file d'attente");
            }
            server.currentVideo = { title: "", url: query };
            this.runVideo(message, connection, query);
        });
    }


    /**
     * 
     * @param {CommandoMessage} message 
     * @param {VoiceConnection} connection 
     * @param {*} video 
     */

    async runVideo(message, connection, videoUrl) {
        const server = message.client.server;
        const dispatcher = connection.play( await ytdl(videoUrl, {filter: 'audioonly'}), {type: 'opus' } )
    
        server.queue.shift();
        server.dispatcher = dispatcher;
        server.connection = connection;

        dispatcher.on('finish', () => {
            if (server.queue[0]){
                server.currentVideo = server.queue[0];
                return this.runVideo(message, connection, server.currentVideo.url);
            }
        });

        return message.say("En train de jouer :notes: ");
    }
}