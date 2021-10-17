"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: 'Replies with pong!',
    slash: 'both',
    testOnly: false,
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction;
        return ('Pong');
    },
};
