
export type OrderItem = {
    productId: string;
    name: string;
    quantity: number;
    price: number;
};
export class Order
{

    constructor( readonly orderId: string,
        readonly userId: string,
        readonly items: OrderItem[],
        readonly total: number,
        readonly status: string,
        readonly createdAt: Date,
        readonly updatedAt: Date
    )
    {

    }
    static create( userId: string, items: OrderItem[], total: number )
    {
        const orderId = crypto.randomUUID()
        const status = "created"
        return new Order( orderId, userId, items, total, status, new Date(), new Date() );

    }
}