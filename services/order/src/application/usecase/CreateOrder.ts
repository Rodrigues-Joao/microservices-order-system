
import { stat } from "fs";
import { Order } from "../../domain/entity/Order"
import { inject } from "../../infra/di/Registry";
import IQueue from "../../infra/queue/Queue";
import { IOrderRepository } from "../../infra/repository/OrderRepository";


type InputType = {
    userId: string
    items: any[]
}
export class CreateOrder
{
    @inject( "orderRepository" )
    orderRepository!: IOrderRepository;
    @inject( "queue" )
    queue!: IQueue;

    async execute( input: InputType ): Promise<{ orderId: string }>
    {
        const order = Order.create( input.userId, input.items );
        await this.orderRepository.create( order );
        const event = {
            orderId: order.getOrderId(),
            status: order.getStatus(),
            userId: order.getUserId(),
            items: order.getItems()
        };
        console.log( "sending orderId = ", event.orderId );
        this.queue.publish( "order_created", "", JSON.stringify( event ) );
        return {
            orderId: order.getOrderId()
        };
    }
}