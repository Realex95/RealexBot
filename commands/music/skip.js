const { Command, CommandoMessage } = require("discord.js-commando");
const { UserVoiceInNotChannel, BotNotInVoiceChannel } = require('../../strings.json');
const ytdl = require('ytdl-core-discord');

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client,{
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Saute le titre en cours de lecture'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message){
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;

        if (!voiceChannel) {
            return message.say(UserVoiceInNotChannel);
        }

        if(!message.client.voice.connections.first()){
            return message.say(BotNotInVoiceChannel)
        }

        if (!server.queue[0]) {
            server.currentVideo = {url: "", title:"Rien pour le moment"};
            return message.say("Il n'y a rien dans la file d'attente");
        }

        server.currentVideo = server.queue[0];
        server.connection.play(await ytdl(server.currentVideo.url, {filter: 'audioonly'}), {type: 'opus' } )
        server.queue.shift();

        return message.say(" Ignoré ");
    }
}