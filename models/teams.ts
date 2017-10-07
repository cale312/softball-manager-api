import { Schema, model } from 'mongoose';

let TeamsSchema: Schema = new Schema({
    rank: {
        type: Number
    },
    coach: {
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

export default model('Teams', TeamsSchema);