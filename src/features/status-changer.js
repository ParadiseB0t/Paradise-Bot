"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = (function (client) {
    var statusOptions = [
        '/help for assistance',
        '!help for assistance',
        'Testing'
    ];
    var counter = 0;
    var updateStatus = function () {
        var _a;
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
            status: 'online',
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        });
        if (++counter >= statusOptions.length) {
            counter = 0;
        }
        setTimeout(updateStatus, 1000 * 30);
    };
    updateStatus();
});
exports.config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Chnager'
};
