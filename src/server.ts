import express, { Application } from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors'; 
import { SERVER_PORT } from './globals/enviroment'
import indexRoutes from './routes/router'

class Server { 

    public app: Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
     };

    settings() { 
        this.app.set('port', SERVER_PORT);
    };

    middlewares() { 
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(morgan('dev'));
        this.app.use(cors({origin:true, credentials:true}));
    };

    routes() { 
        this.app.use(indexRoutes);
    };

    async start() { 
        this.app.listen(this.app.get('port'));
        console.log(`${colors.magenta('Server on port:')} ${colors.green(this.app.get('port'))}`)
     };
};

export default Server;