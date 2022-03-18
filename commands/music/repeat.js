const { VoiceConnection, User } = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");
const ytdl = require('ytdl-core-discord');
const { StreamDispatcher } = require('discord.js');
const { UserVoiceInNotChannel, BotNotInVoiceChannel } = require('../../strings.json');

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client,{
            name: 'repeat',
            group: 'music',
            memberName: 'repeat',
            description: 'répète la musique'
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
            dispatcher.repeat();
        }

        return message.say("En train de jouer :notes:");
    }
}