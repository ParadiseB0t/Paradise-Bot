"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'collectors',
    description: 'Reaction Collector',
    callback: function (_a) {
        var message = _a.message, channel = _a.channel;
        message.reply('Please confirm this action!:');
        message.react('👍');
        var filter = function (reaction, user) {
            return user.id === message.author.id;
        };
        var collector = message.createReactionCollector({
            filter: filter,
            max: 1,
            time: 1000 * 20
        });
        collector.on('collect', function (reaction) {
            console.log(reaction.emoji);
        });
        collector.on('end', function (collected) {
            if (collected.size === 0) {
                message.reply('You did not react in time.');
                return;
            }
            var text = 'Collected: \n\n';
            collected.forEach(function (message) {
                text += message.emoji.name + "\n";
            });
            message.reply(text);
        });
    }
};
