import express from 'express';
import bodyParser from 'body-parser';
import Groups from '../Schema/group';

const groupRouter = express.Router();
groupRouter.use(bodyParser.json());

groupRouter.route('/')
    .get((req,res,next) => {
        Groups.find({}, (err,groups) => {
            if(err) return next(err);
            return res.json(groups);
        });
    } )
    .post((req,res,next) => {
        const newGroup = new Groups(req.body);
        newGroup.save((err,group) => {
            if (err) return next(err);
            console.log(`Groups : Create new groups ${group.id}`);
            return res.json(group);
        });
    });

groupRouter.route('/:groupID')
    .get((req,res,next) => {
        Groups.findById(req.params.groupID)
        .populate({ path : 'games.idGameplay' })
        .exec((err,group) => {
            if (err) return next(err);
            console.log(`Group : Get groups ${group.id}`);
            return res.json(group);
        })
    })
    .put((req,res,next) => {
        console.log(req.body)
        Groups.findByIdAndUpdate(req.params.groupID, 
            {$set : req.body}, 
            {new : true},
            (err,group) => {
                if (err) return next(err);
                console.log(`Groups : Update groups ${group.id}`);
                return res.json(group); // Group after play or config    
            })
    })
    .delete((req,res,next) => {
        Groups.findByIdAndRemove(req.params.groupID, (err) => {
            if(err) return next(err);
            console.log(`Groups : Remove group ID :${req.params.groupID}`);
            Groups.find({}, (err,groups) => {
                if (err) return next(err);
                return res.json(groups);
            })
        })
    });

export default groupRouter;
