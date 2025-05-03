
import UUID from "../vo/UUID";
import { Item } from "./Item";

export class Order
{
    private orderId: UUID
    private userId: UUID
    private items: Item[]
    private total: number
    constructor(
        orderId: string,
        userId: string,
        items: any[],
        private status: string,
        private createdAt: Date,
        private updatedAt: Date
    )
    {
        this.orderId = new UUID( orderId );
        this.userId = new UUID( userId );
        this.items = items.map( item => new Item( item.productId, item.name, item.price, item.quantity ) )
        this.total = items.reduce( ( acc, item ) => acc + item.price * item.quantity, 0 )
        if ( this.total <= 0 )
            throw new Error( "Total must be greater than 0" )


    }
    static create( userId: string, items: any[] )
    {
        const orderId = UUID.create().getValue()
        const status = "created"
        return new Order( orderId, userId, items, status, new Date(), new Date() );

    }
    getOrderId()
    {
        return this.orderId.getValue()
    }
    getTotalOrder()
    {
        return this.total
    }



}