import { Item } from "../../domain/entity/Item";
import { Order } from "../../domain/entity/Order"
import { inject } from "../../infra/di/Registry";
import { IOrderRepository } from "../../infra/repository/OrderRepository";


type InputType = {
    userId: string
    items: any[]
}
export class CreateOrder
{
    @inject( "orderRepository" )
    orderRepository!: IOrderRepository;

    async execute( input: InputType ): Promise<{ orderId: string }>
    {
        const order = Order.create( input.userId, input.items );
        await this.orderRepository.create( order );
        return {
            orderId: order.getOrderId()
        };
    }
}