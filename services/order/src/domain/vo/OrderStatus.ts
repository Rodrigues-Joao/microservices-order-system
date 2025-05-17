import { Order } from "../entity/Order";

export interface IOrderStatus
{
    value: string;
    Pending(): void;
    ProcessingPayment(): void;
    Confirmed(): void;
    InventoryFailed(): void;
    PaymentFailed(): void;
    Cancelled(): void;
}

export class PendingStatus implements IOrderStatus
{
    value: string;
    constructor( readonly order: Order )
    {
        this.value = "pending";
    }
    Pending(): void
    {
        throw new Error( "Invalid status" );
    }

    ProcessingPayment(): void
    {
        this.order.setStatus( new ProcessingPaymentStatus( this.order ) );
    }
    Confirmed(): void
    {
        throw new Error( "Invalid status" );
    }
    InventoryFailed(): void
    {
        this.order.setStatus( new InventoryFailedStatus( this.order ) );

    }
    PaymentFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    Cancelled(): void
    {
        throw new Error( "Invalid status" );
    }

}

export class ProcessingPaymentStatus implements IOrderStatus
{
    value: string;
    constructor( readonly order: Order )
    {
        this.value = "processing_payment";
    }
    Pending(): void
    {
        throw new Error( "Invalid status" );
    }

    ProcessingPayment(): void
    {
        throw new Error( "Invalid status" );
    }
    Confirmed(): void
    {
        this.order.setStatus( new ConfirmedStatus( this.order ) );
    }
    InventoryFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    PaymentFailed(): void
    {
        this.order.setStatus( new PaymentFailedStatus( this.order ) );
    }
    Cancelled(): void
    {
        throw new Error( "Invalid status" );
    }
}
export class ConfirmedStatus implements IOrderStatus
{
    value: string;
    constructor( readonly order: Order )
    {
        this.value = "confirmed";
    }
    Pending(): void
    {
        throw new Error( "Invalid status" );
    }

    ProcessingPayment(): void
    {
        throw new Error( "Invalid status" );
    }
    Confirmed(): void
    {
        throw new Error( "Invalid status" );
    }
    InventoryFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    PaymentFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    Cancelled(): void
    {
        throw new Error( "Invalid status" );
    }
}
export class InventoryFailedStatus implements IOrderStatus
{
    value: string;
    constructor( readonly order: Order )
    {
        this.value = "inventory_failed";
    }
    Pending(): void
    {
        throw new Error( "Invalid status" );
    }

    ProcessingPayment(): void
    {
        throw new Error( "Invalid status" );
    }
    Confirmed(): void
    {
        throw new Error( "Invalid status" );
    }
    InventoryFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    PaymentFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    Cancelled(): void
    {
        throw new Error( "Invalid status" );
    }
}
export class PaymentFailedStatus implements IOrderStatus
{
    value: string;
    constructor( readonly order: Order )
    {
        this.value = "payment_failed";
    }
    Pending(): void
    {
        throw new Error( "Invalid status" );
    }

    ProcessingPayment(): void
    {
        throw new Error( "Invalid status" );
    }
    Confirmed(): void
    {
        throw new Error( "Invalid status" );
    }
    InventoryFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    PaymentFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    Cancelled(): void
    {
        throw new Error( "Invalid status" );
    }
}
export class CancelledStatus implements IOrderStatus
{
    value: string;
    constructor( readonly order: Order )
    {
        this.value = "cancelled";
    }
    Pending(): void
    {
        throw new Error( "Invalid status" );
    }

    ProcessingPayment(): void
    {
        throw new Error( "Invalid status" );
    }
    Confirmed(): void
    {
        throw new Error( "Invalid status" );
    }
    InventoryFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    PaymentFailed(): void
    {
        throw new Error( "Invalid status" );
    }
    Cancelled(): void
    {
        throw new Error( "Invalid status" );
    }
}
export class OrderStatusFactory
{
    static create( status: string, order: Order )
    {
        if ( status === "pending" )
            return new PendingStatus( order );
        if ( status === "processing_payment" )
            return new ProcessingPaymentStatus( order );
        if ( status === "confirmed" )
            return new ConfirmedStatus( order );
        if ( status === "inventory_failed" )
            return new InventoryFailedStatus( order );
        if ( status === "payment_failed" )
            return new PaymentFailedStatus( order );
        if ( status === "cancelled" )
            return new CancelledStatus( order );

        throw new Error( "Invalid status" );
    }
}