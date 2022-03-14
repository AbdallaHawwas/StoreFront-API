import express,{Request,Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './handler/user';
import productRoutes from './handler/product';
import orderRoutes from './handler/order';
import dashboardRoutes from './handler/dashboard';

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
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.get('/test-cors',cors(corsOptions), (req: Request,res:Response,next:express.NextFunction)=>{
    res.json({msg:'This is CORS enabled with middleware'})
})

app.listen(3000,function(){
    console.log(`Start App on ${address}`)
})