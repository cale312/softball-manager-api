import { Schema, model } from 'mongoose';

let PlayersSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    team: {
        type: String
    }
});

export default model('Player', PlayersSchema);