
import { UpdateOrder } from "../../application/usecase/UpdateOrder";
import { inject } from "../di/Registry";
import IQueue from "../queue/Queue";



export class QueueController
{
    @inject( "queue" )
    queue!: IQueue;
    @inject( "updateOrder" )
    updateOrder!: UpdateOrder;



    constructor()
    {
        this.queue.consume( "inventory_events.inventory_result", async ( message: any ) =>
        {
            this.updateOrder.execute( message )
        } )
    }
}