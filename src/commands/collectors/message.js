"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'collectors',
    description: 'Message Collector',
    callback: function (_a) {
        var message = _a.message, channel = _a.channel;
        message.reply('Please enter your username:');
        var filter = function (m) {
            return m.author.id === message.author.id;
        };
        var collector = channel.createMessageCollector({
            filter: filter,
            max: 1,
            time: 1000 * 20
        });
        collector.on('collect', function (message) {
            console.log(message.content);
        });
        collector.on('end', function (collected) {
            if (collected.size === 0) {
                message.reply('You did not provide your username.');
                return;
            }
            var text = 'Collected: \n\n';
            collected.forEach(function (message) {
                text += message.content + "\n";
            });
            message.reply(text);
        });
    }
};
