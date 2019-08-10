import express from 'express';
import bodyParser from 'body-parser'; // convert JSON
import logger from 'morgan'; // logger all information
import mongoose from 'mongoose'; // server
import path from 'path';
//import path from 'path';
import cors from 'cors'; // all client can get api
import PlayersRoute from './Route/player';
import GroupRouter from './Route/group';
import GameRouter from './Route/gameplay';
import ResultRouter from './Route/results';

const app = express();
const port = process.env.port || 9000;

//const urlDB = "mongodb://localhost:27017/toolexchange";
const urlDB = "mongodb://daohuyadmin:huy123@ds151876.mlab.com:51876/toolexchange";

// CONNECT DATABASE
const optionsDB = {
    autoReconnect : true,
    reconnectTries : Number.MAX_VALUE,
    reconnectInterval : 500
};
mongoose.connect(urlDB,optionsDB).then(
    () => console.log('Connect Database Success !'),
    err => console.log('Error', err) 
);

// CONFIG SERVER 
app.use(express.static('public'));
app.use(logger('dev'));  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cors());
// MAIN HOME PAGE
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});
// API 
app.use('/api/players', PlayersRoute);
app.use('/api/groups', GroupRouter);
app.use('/api/gameplay', GameRouter);
app.use('/api/results', ResultRouter);

app.listen(port, () => console.log(`Server listen on PORT ${port}`) );

