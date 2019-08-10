'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import Players from '../Schema/player';

const playerRoute = express.Router();
playerRoute.use(bodyParser.json());

// MAIN ROUTE
playerRoute.route('/')
    .get((req,res,next) => {
        // get all players in db
        Players.find({}, (err,players) => {
            if (err) return next(err);
            return res.json(players);
        });
    })
    .post((req,res,next) => {
        const newPlayer = new Players(req.body);
        newPlayer.save((err, player) => {
            if (err) return next(err);
            console.log(`Players : create player with ID : ${player.id}`);
            return res.json(player);
        });
    });

    playerRoute.route('/:playerID')
        .get((req,res,next) => {
            Players.findById((req.params.playerID), (err,player) => {
                if (err) return next(err);
                return res.json(player);
            })
        })
        .put((req,res,next) => {
            Players.findByIdAndUpdate(
                req.params.playerID, 
                {$set : req.body}, 
                {new :true},
                (err,player) => {
                    if (err) return next(err);
                    console.log(`Players : Update player ID : ${player.id}`)
                    return res.json(player);
                }
            )
        })
        .delete((req,res,next) => {
            Players.findByIdAndRemove(req.params.playerID, (err,players) => {
                if (err) return next(err);
                console.log(`Players : Delete player ID : ${req.params.playerID}`);
                Players.find({},(err,players) => {
                    if (err) return next(err);
                    return res.json(players);
                })
            })
        });

export default playerRoute;

