import { CreateOrder } from "../../application/usecase/CreateOrder";
import { GetOrder } from "../../application/usecase/GetOrder";
import { inject } from "../di/Registry";
import IHttpServer from "../http/HttpServer";
import IQueue from "../queue/Queue";



export class OrderController
{
    @inject( "httpServer" )
    httServer!: IHttpServer;
    @inject( "createOrder" )
    createOrder!: CreateOrder;
    @inject( "getOrder" )
    getOrder!: GetOrder;

    constructor()
    {
        this.httServer.register( "post", "/order", async ( params: any, body: any ) =>
        {
            return await this.createOrder.execute( body )
        } );
        this.httServer.register( "get", "/order/:id", async ( params: any, body: any ) =>
        {
            return await this.getOrder.execute( params.id )
        } );
        this.httServer.register( "get", "/", async ( params: any, body: any ) =>
        {
            return { message: "ok" }
        } );
    }
}