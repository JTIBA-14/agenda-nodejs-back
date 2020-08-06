import express, { Application } from 'express';
import sequelize from './databases/config';
import cors from 'cors';
import router from './routes/index.route';

export class App {

    private app: Application;

    constructor(private  port?: number | string ) {
        this.app = express();
        this.settings();
        this.routing();
    }

    settings(): void {
        this.app.set('port', this.port || process.env.PORT || 3000 );
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routing() {
        this.app.use('/', router );
    }

    async lisen() {
        await this.app.listen( this.app.get('port'), () => {
            sequelize.sync({ force: false }).then( () => {
                console.log(`Conection on database true`);
            });
        } );
        console.log(`Server on port ${ this.app.get('port') }`);
    }

}

