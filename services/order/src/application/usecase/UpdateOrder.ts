
import { Order } from "../../domain/entity/Order"
import { inject } from "../../infra/di/Registry";
import IQueue from "../../infra/queue/Queue";
import { IOrderRepository } from "../../infra/repository/OrderRepository";


type InputType = {
    userId: string
    items: any[]
}
export class UpdateOrder
{
    @inject( "orderRepository" )
    orderRepository!: IOrderRepository;
    @inject( "queue" )
    queue!: IQueue;

    async execute( input: any )
    {
        const order = await this.orderRepository.findById( input.orderId )
        if ( !order )
            throw new Error( "Order not found" )
        if ( input.reservedStatus )
            order.processingPayment()
        else
            order.inventoryFailed()
        await this.orderRepository.update( order )

    }
}