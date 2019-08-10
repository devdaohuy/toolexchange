import express from 'express';
import bodyParser from 'body-parser';
import Results from '../Schema/results';
import Groups from '../Schema/group';

const ResultsRouter = express.Router();
ResultsRouter.use(bodyParser.json());

ResultsRouter.route('/')
    .get((req,res,next) => {
        Results.find({}, (err,results) => {
            if(err) return next(err);
            return res.json(results);
        });
    } )
    .post((req,res,next) => {
        const newResults = new Results(req.body);
        newResults.save((err,result) => {
            if (err) return next(err);
            console.log(`Results : Create new Results ${result.id}`);
            return res.json(result);
        });
    });

ResultsRouter.route('/:resultID')
    .get((req,res,next) => {
        Results.findById(req.params.resultID, (err,result) => {
            if (err) return next(err);
            console.log(`Results : Get Results ${result.id}`);
            return res.json(result);
        })
    })
    .put((req,res,next) => {
        Results.findByIdAndUpdate(req.params.resultID, 
            {$set : req.body}, 
            {new : true},
            (err,result) => {
                if (err) return next(err);
                console.log(`Results : Update Results ${result.id}`);
                return res.json(result); // result after play or config    
            })
    })
    .delete((req,res,next) => {
        Results.findByIdAndRemove(req.params.resultID, (err,result) => {
            if(err) return next(err);
            console.log(`Results : Remove result ID :${req.params.resultID}`);
            return res.json(result);
        })
    });

export default ResultsRouter;
