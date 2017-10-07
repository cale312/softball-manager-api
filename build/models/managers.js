"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let ManagerSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true
    },
    ownedTeam: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('Mangager', ManagerSchema);
