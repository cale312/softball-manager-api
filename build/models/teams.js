"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let TeamsSchema = new mongoose_1.Schema({
    rank: {
        type: Number
    },
    coach: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    teamPlayers: {
        type: Array,
        length: 9
    }
});
exports.default = mongoose_1.model('Teams', TeamsSchema);
