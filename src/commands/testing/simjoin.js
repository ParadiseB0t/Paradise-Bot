"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: 'Simulates a member joining',
    slash: 'both',
    testOnly: false,
    callback: function (_a) {
        var member = _a.member, client = _a.client;
        client.emit('guildMemberAdd', member);
        return 'Join Simulated!';
    }
};
