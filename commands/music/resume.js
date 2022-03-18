const { VoiceConnection, User } = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");
const ytdl = require('ytdl-core-discord');
const { StreamDispatcher } = require('discord.js');
const { UserVoiceInNotChannel, BotNotInVoiceChannel } = require('../../strings.json');

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client,{
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'reprend la musique qui est en pause',

        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message){
        /**
         * @type StreamDispatcher
         */
        const dispatcher = message.client.server.dispatcher;
        
        if (!message.member.voice.channel) {
            return message.say(UserVoiceInNotChannel)
        }

        if (!message.client.voice.connections.first()){
            return message.say(BotNotInVoiceChannel)
        }

        if (dispatcher){
            dispatcher.resume();
        }

        return message.say("En train de jouer :notes:");
    }
}