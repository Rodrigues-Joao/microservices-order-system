
test( "Deve fazer a criação de um pedido", async function ()
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
    const result = await fetch( "http://localhost:3000/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( input ),
    } );
    const response = await result.json();
    expect( response.orderId ).toBeDefined();
} );