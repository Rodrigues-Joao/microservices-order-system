import { inject } from "../../infra/di/Registry";
import IQueue from "../../infra/queue/Queue";
const products = [
    {
        productId: "9707a917-88db-4475-94c5-fa469f869d3b",
        inventoryQuantity: 100
    },
    {
        productId: "4369134f-b048-4262-b81e-fc8e2d25072f",
        inventoryQuantity: 100
    }
]
export class CheckInventory
{
    @inject( "queue" )
    queue!: IQueue;
    async execute( msg: Input )
    {
        const itemsAvailable = msg.items.every( ( item ) =>
        {
            const product = products.find( ( p ) => p.productId === item.productId );
            if ( !product )
                return false;
            return product.inventoryQuantity >= item.quantity;
        } );
        const event = { orderId: msg.orderId, reservedStatus: itemsAvailable, userId: msg.userId, amount: msg.amount };
        await this.queue.publish( "inventory_events", "inventory_events.inventory_result", event );
    }

}

type Input = {
    orderId: string;
    status: string;
    userId: string;
    amount: number;
    items: {
        name: string;
        quantity: number;
        price: number;
        productId: string;
    }[];
}
