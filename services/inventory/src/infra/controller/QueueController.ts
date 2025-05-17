import { CheckInventory } from "../../application/usecase/CheckInventory";
import { inject } from "../di/Registry";
import IQueue from "../queue/Queue";



export class QueueController
{
    @inject( "queue" )
    queue!: IQueue;
    @inject( "checkInventory" )
    checkInventory!: CheckInventory;


    constructor()
    {
        this.queue.consume( "order_created.process_inventory", async ( message: any ) =>
        {
            this.checkInventory.execute( message )
        } )
    }
}