import express,{Request,Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user'

const app : express.Application = express();
const address :string = "0.0.0.0:3000";

const corsOptions = {
    origin:"http://sampleorigin.com",
    optionsSuccessStatus : 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/',(req:express.Request,res:express.Response)=>{
    res.send('Hello World !');
})

userRoutes(app);

app.get('test-cors',cors(corsOptions), (req: Request,res:Response,next:express.NextFunction)=>{
    res.json({msg:'This is CORS enabled with middleware'})
})