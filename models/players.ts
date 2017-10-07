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
    team: {
        type: String,
        required: true
    }
});

export default model('Playe', PlayersSchema);