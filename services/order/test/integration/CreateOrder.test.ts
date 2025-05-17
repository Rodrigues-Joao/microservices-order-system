
test( "Deve fazer a criação de um pedido", async function ()
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
