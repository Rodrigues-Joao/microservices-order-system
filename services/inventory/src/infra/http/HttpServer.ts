import express, { Application, Request, Response } from "express";
export default interface IHttpServer
{
    register( method: string, url: string, callback: Function ): void;
    listen( port: number ): void;
}

export class ExpressAdapter implements IHttpServer
{
    app: Application;

    constructor()
    {
        this.app = express();
        this.app.use( express.json() );
    }

    register( method: string, url: string, callback: Function ): void
    {
        this.app[method as keyof Application]( url.replace( /\{|\}/g, "" ), async ( req: Request, res: Response ) =>
        {
            try
            {
                const output = await callback( req.params, req.body );
                res.json( output );
            } catch ( e: any )
            {
                res.status( 422 ).json( { message: e.message } );
            }
        } );
    }

    listen( port: number ): void
    {
        this.app.listen( port, () => console.log( `Server is running on port ${ port }` ) );
    }

}
