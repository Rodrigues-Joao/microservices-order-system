import { Order, OrderItem } from "../../domain/entity/Order"
import { inject } from "../../infra/di/Registry";
import { IOrderRepository } from "../../infra/repository/OrderRepository";


type InputType = {
    userId: string
    items: any[]
    total: number;
}
export class CreateOrder
{
    @inject( "orderRepository" )
    orderRepository!: IOrderRepository;

    async execute( input: InputType ): Promise<{ orderId: string }>
    {
        const order = Order.create( input.userId, input.items as OrderItem[], input.total );
        const result = await this.orderRepository.create( order );
        return {
            orderId: result.orderId,
        };
    }
}