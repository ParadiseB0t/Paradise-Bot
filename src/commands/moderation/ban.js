"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    category: 'Moderation',
    description: 'Bans a user.',
    permissions: ['BAN_MEMBERS'],
    slash: true,
    testOnly: false,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    options: [
        {
            name: 'user',
            description: 'The target user.',
            required: true,
            type: discord_js_1.Constants.ApplicationCommandOptionTypes.USER,
        },
        {
            name: 'reason',
            description: 'The ban reason.',
            required: true,
            type: discord_js_1.Constants.ApplicationCommandOptionTypes.STRING,
        },
    ],
    callback: function (_a) {
        var interaction = _a.interaction, channel = _a.channel;
        return __awaiter(void 0, void 0, void 0, function () {
            var target, reason, row, filter, collector;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = interaction.options.getMember('user');
                        if (!target)
                            return [2 /*return*/, '⛔ Please tag someone to ban.'];
                        if (!target.bannable)
                            return [2 /*return*/, '⛔  Cannot ban that user.'];
                        reason = interaction.options.getString('reason');
                        row = new discord_js_1.MessageActionRow()
                            .addComponents(new discord_js_1.MessageButton()
                            .setCustomId('confirm')
                            .setEmoji('🔨')
                            .setLabel('Confirm')
                            .setStyle('SUCCESS'))
                            .addComponents(new discord_js_1.MessageButton()
                            .setCustomId('cancel')
                            .setLabel('Cancel')
                            .setStyle('SECONDARY'));
                        return [4 /*yield*/, interaction.reply({
                                content: "Are you sure you want to ban <@" + target.id + ">?\nReason: " + reason,
                                components: [row],
                                ephemeral: false,
                            })];
                    case 1:
                        _b.sent();
                        filter = function (btnInteraction) {
                            return interaction.user.id === btnInteraction.user.id;
                        };
                        collector = channel.createMessageComponentCollector({
                            filter: filter,
                            componentType: 'BUTTON',
                            max: 1,
                            time: 15000,
                        });
                        collector.on('end', function (collected) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!(collected.size === 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, interaction.editReply({
                                                content: '⛔ You did not respond in time.',
                                                components: [],
                                            })];
                                    case 1:
                                        _c.sent();
                                        return [2 /*return*/];
                                    case 2:
                                        if (!(((_a = collected.first()) === null || _a === void 0 ? void 0 : _a.customId) === 'confirm')) return [3 /*break*/, 5];
                                        return [4 /*yield*/, target.ban({
                                                reason: reason,
                                                days: 7,
                                            })];
                                    case 3:
                                        _c.sent();
                                        return [4 /*yield*/, interaction.editReply({
                                                content: "\uD83D\uDD28 You banned <@" + target.id + ">\nReason: " + reason,
                                                components: [],
                                            })];
                                    case 4:
                                        _c.sent();
                                        return [3 /*break*/, 7];
                                    case 5:
                                        if (!(((_b = collected.first()) === null || _b === void 0 ? void 0 : _b.customId) === 'cancel')) return [3 /*break*/, 7];
                                        return [4 /*yield*/, interaction.editReply({
                                                content: "Interaction has been cancelled.",
                                                components: [],
                                            })];
                                    case 6:
                                        _c.sent();
                                        _c.label = 7;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    },
};
