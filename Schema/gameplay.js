'use strict';
import mongoose, {Schema} from 'mongoose';

const gameplaySchema = new Schema({
    game: String, // what game play
    playAt: {
        type: Date,
        default: Date.now()
    },
    group: {
        idGroup: {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        },
        name: String
    },
    stages: [
        {
            stage : Number,
            gameplay : [{
                _id : false,
                idPlayer : {
                    type : Schema.Types.ObjectId,
                    ref : 'Player'
                },
                name : String,
                point : Number,
                isWin : Boolean
            }]
        }
    ],
    summary : [{
        _id : false,
        idPlayer : {
            type : Schema.Types.ObjectId,
            ref : 'Player'
        },
        name : String,
        point : Number,
        isWin : Boolean
    }]
});

const Gameplay = mongoose.model('Gameplay', gameplaySchema);

export default Gameplay;