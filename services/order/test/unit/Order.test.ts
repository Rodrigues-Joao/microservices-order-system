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
    expect( orderCreated.getStatus() ).toBe( "pending" );

} );

test( "Não deve fazer a criação de um pedido com userId inválido", async function ()
{
    const input = {
        userId: "4369134f-b048-4262-b81e-fc8e2d25072f",
        items: [
            {
                productId: "9707a917-88db-447594c5-fa469f869d3b",
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
    expect( () => Order.create( input.userId, input.items ) ).toThrow( new Error( "Invalid UUID" ) );

} );
test( "Não deve fazer a criação de um pedido com productId inválido", async function ()
{
    const input = {
        userId: "4369134f-b048-4262-b81e-fc8e2f",
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
    expect( () => Order.create( input.userId, input.items ) ).toThrow( new Error( "Invalid UUID" ) );

} );
test( "Não deve fazer a criação de um pedido com quantidade menor igual a zero", async function ()
{
    const input = {
        userId: "4369134f-b048-4262-b81e-fc8e2d25072f",
        items: [
            {
                productId: "9707a917-88db-4475-94c5-fa469f869d3b",
                name: "Camiseta Azul",
                price: 50,
                quantity: 0
            },
            {
                productId: "4369134f-b048-4262-b81e-fc8e2d25072f",
                name: "Calça Jeans",
                price: 120,
                quantity: 1
            }
        ]
    };
    expect( () => Order.create( input.userId, input.items ) ).toThrow( new Error( "Quantity must be greater than 0" ) );

} );
test( "Não deve fazer a criação de um pedido com preço menor igual a zero", async function ()
{
    const input = {
        userId: "4369134f-b048-4262-b81e-fc8e2d25072f",
        items: [
            {
                productId: "9707a917-88db-4475-94c5-fa469f869d3b",
                name: "Camiseta Azul",
                price: 0,
                quantity: 1
            },
            {
                productId: "4369134f-b048-4262-b81e-fc8e2d25072f",
                name: "Calça Jeans",
                price: 120,
                quantity: 1
            }
        ]
    };
    expect( () => Order.create( input.userId, input.items ) ).toThrow( new Error( "Price must be greater than 0" ) );

} );
