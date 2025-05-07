import { inject } from "../di/Registry";
import IQueue from "../queue/Queue";



export class QueueController
{
    @inject( "queue" )
    queue!: IQueue;


    constructor()
    {
        this.queue.consume( "order_created.process_inventory", async ( message: any ) =>
        {
            console.log( "OrderId received:", message );
            // Process the message here
            // For example, update inventory or send a notification
        } )
    }
}