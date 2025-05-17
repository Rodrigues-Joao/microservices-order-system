
import { InventoryFailedStatus, IOrderStatus, OrderStatusFactory, PendingStatus } from "../vo/OrderStatus";
import UUID from "../vo/UUID";
import { Item } from "./Item";

export class Order
{
    private orderId: UUID
    private userId: UUID
    private items: Item[]
    private total: number
    private status: IOrderStatus
    constructor(
        orderId: string,
        userId: string,
        items: any[],
        status: string,
        readonly createdAt: Date,
        readonly updatedAt: Date
    )
    {
        this.orderId = new UUID( orderId );
        this.userId = new UUID( userId );
        this.items = items.map( item => new Item( item.productId, item.name, item.quantity, item.price, ) )
        this.total = items.reduce( ( acc, item ) => acc + item.price * item.quantity, 0 )
        if ( this.total <= 0 )
            throw new Error( "Total must be greater than 0" )
        this.status = OrderStatusFactory.create( status, this )
    }
    static create( userId: string, items: any[] )
    {
        const orderId = UUID.create().getValue()
        const status = "pending"
        return new Order( orderId, userId, items, status, new Date(), new Date() );

    }
    getOrderId()
    {
        return this.orderId.getValue()
    }
    getUserId()
    {
        return this.userId.getValue()
    }
    getItems()
    {
        return this.items.map( item => ( {
            ...item,
            productId: item.getProductId(),
        } ) )
    }

    getTotalOrder()
    {
        return this.total
    }

    setStatus( status: IOrderStatus )
    {
        this.status = status;
    }
    processingPayment()
    {
        this.status.ProcessingPayment()
    }
    inventoryFailed()
    {
        this.status.InventoryFailed()
    }
    getStatus()
    {
        return this.status.value;
    }

}