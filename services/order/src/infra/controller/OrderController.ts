import { CreateOrder } from "../../application/usecase/CreateOrder";
import { inject } from "../di/Registry";
import IHttpServer from "../http/HttpServer";



export class OrderController
{
    @inject( "httpServer" )
    httServer!: IHttpServer;
    @inject( "createOrder" )
    createOrder!: CreateOrder;
    constructor()
    {
        this.httServer.register( "post", "/order", async ( params: any, body: any ) =>
        {
            return await this.createOrder.execute( body )
        } );
    }
}