import UUID from "../vo/UUID";

export class Item 
{
    private productId: UUID;
    constructor(
        productId: string,
        readonly name: string,
        readonly quantity: number,
        readonly price: number
    )
    {
        this.productId = new UUID( productId );
        if ( quantity <= 0 )
            throw new Error( "Quantity must be greater than 0" );
        if ( price <= 0 )
            throw new Error( "Price must be greater than 0" );

    }

    getProductId()
    {
        return this.productId.getValue();
    }
}