'use strict';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const playerSchema = new Schema({
    name: String,
    groups : [
        {
            _id : false,
            idGroup : {
                type : Schema.Types.ObjectId,
                ref : 'Group'
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const Players = mongoose.model('Player', playerSchema);

export default Players;