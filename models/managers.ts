import { Schema, model } from 'mongoose';

let ManagerSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    ownedTeam: {
        type: String,
        required: true
    }
});

export default model('Mangager', ManagerSchema);