import { Order } from "../../src/domain/entity/Order";

test( "Deve fazer a criação de um pedido", function ()
{
    const input = {
        userId: "4369134f-b048-4262-b81e-fc8e2d25072f",
        items: [
            {
                productId: "9707a917-88db-4475-94c5-fa469f869d3b",
                name: "Camiseta Azul",
                price: 50,
                quantity: 2
            },
            {
                productId: "4369134f-b048-4262-b81e-fc8e2d25072f",
                name: "Calça Jeans",
                price: 120,
                quantity: 1
            }
        ]
    };
    const orderCreated = Order.create( input.userId, input.items );
    expect( orderCreated.getOrderId() ).toBeDefined();
    expect( orderCreated.getTotalOrder() ).toBe( 220 );

} );
