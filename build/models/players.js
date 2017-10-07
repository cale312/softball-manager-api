"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let PlayersSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    team: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('Playe', PlayersSchema);
