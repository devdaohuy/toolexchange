import express from 'express';
import bodyParser from 'body-parser';
import GamePlay from '../Schema/gameplay';
import Groups from '../Schema/group';

const gameplayRouter = express.Router();
gameplayRouter.use(bodyParser.json());

gameplayRouter.route('/')
    .get((req,res,next) => {
        GamePlay.find({}, (err,games) => {
            if(err) return next(err);
            return res.json(games);
        });
    } )
    .post((req,res,next) => {
        const newGamePlay = new GamePlay(req.body);
        newGamePlay.save((err,game) => {
            if (err) return next(err);
            // update Group games
            Groups.findById(game.group.idGroup, (err,group) => {
                if (err) return next(err);
                let updateGameGroup = group.games;
                updateGameGroup.push({ idGameplay : game._id });
                Groups.findByIdAndUpdate(game.group.idGroup, 
                    {
                        games : updateGameGroup
                    }, 
                    {new : true},
                    (err) => {
                        if (err) return next(err);
                    })
            });
            console.log(`GamePlay : Create new GamePlay ${game.id}`);
            return res.json(game);
        });
    });

gameplayRouter.route('/:gameID')
    .get((req,res,next) => {
        GamePlay.findById(req.params.gameID, (err,game) => {
            if (err) return next(err);
            console.log(`GamePlay : Get GamePlay ${game.id}`);
            return res.json(game);
        })
    })
    .put((req,res,next) => {
        GamePlay.findByIdAndUpdate(req.params.gameID, 
            {$set : req.body}, 
            {new : true},
            (err,game) => {
                if (err) return next(err);
                console.log(`GamePlay : Update GamePlay ${game.id}`);
                return res.json(game); // game after play or config    
            })
    })
    .delete((req,res,next) => {
        GamePlay.findByIdAndRemove(req.params.gameID, (err,game) => {
            if(err) return next(err);
            console.log(`GamePlay : Remove game ID :${req.params.gameID}`);
            return res.json(game);
        })
    });

export default gameplayRouter;
