import mongoose, {Schema} from 'mongoose';

const resultSchema = new Schema({
    _id : false,
    game: String, // what game play
    playAt: Date, // Date from gameplay add
    group: {
        _idGroup: {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        },
        name: String
    }, // add idGroup
    gameplay : {
        type : Schema.Types.ObjectId,
        ref : 'Gameplay'
    }, // what game play add id play
    summary: [
        {   
            id : false,
            _idPlayer : {
                type : Schema.Types.ObjectId,
                ref : 'Player'
            },
            name: String,
            point: Number,
            isWin : Boolean
        }
    ] // use function to create total game play
});

const ResultSchema = mongoose.model('Results', resultSchema);

export default ResultSchema;