import { Order } from "../../src/domain/entity/Order";

test( "Deve fazer a criação de um pedido", function ()
{
    const input = {
        userId: crypto.randomUUID(),
        items: [
            {
                productId: "prod-1",
                name: "mesa",
                quantity: 2,
                price: 200,
            }
        ],
        total: 200
    };
    const orderRepository = Order.create( input.userId, input.items, input.total );

    expect( orderRepository.userId ).toBe( input.userId );
} );
