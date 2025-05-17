import { inject } from "../../infra/di/Registry";
import { IOrderRepository } from "../../infra/repository/OrderRepository";

export class GetOrder
{
    @inject( "orderRepository" )
    orderRepository!: IOrderRepository;

    async execute( input: string )
    {
        const order = await this.orderRepository.findById( input )
        if ( !order )
            throw new Error( "Order not found" )
        return {
            orderId: order.getOrderId(),
            userId: order.getUserId(),
            items: order.getItems(),
            status: order.getStatus(),
            amount: order.getTotalOrder(),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }
    }
}