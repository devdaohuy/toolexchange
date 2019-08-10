'use strict';
import mongoose, {Schema} from 'mongoose';

const groupSchema = new Schema({
    name: String,
    background : String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    players: [
        {   
            _id : false,
            idPlayer: {
                type: Schema.Types.ObjectId,
                ref: 'Player'
            },
            name: String
        }
    ],
    games : [{
        _id : false,
        idGameplay : {
            type : Schema.Types.ObjectId,
            ref : 'Gameplay'
        },
    }] // update games after save results
});

// update point

const Groups = mongoose.model('Group', groupSchema);

export default Groups;