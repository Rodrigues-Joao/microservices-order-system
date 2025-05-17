import { Registry } from "../../src/infra/di/Registry";
import { AxiosAdapter } from "../../src/infra/http/HttpClient";
import { OrderGateway } from "../../src/infra/gateway/OrderGateway";
import { CheckInventory } from "../../src/application/usecase/CheckInventory";
import { RabbitMQAdapter } from "../../src/infra/queue/Queue";

let orderGateway: OrderGateway;
let checkInventory: CheckInventory;
let queue: RabbitMQAdapter;
beforeEach( async () =>
{
    queue = new RabbitMQAdapter();

    await queue.connect( `amqp://${ 'localhost' }` );

    Registry.getInstance().provide( "queue", queue );
    Registry.getInstance().provide( "httpClient", new AxiosAdapter() );
    orderGateway = new OrderGateway();
    checkInventory = new CheckInventory();
    Registry.getInstance().provide( "checkInventory", checkInventory );
    Registry.getInstance().provide( "orderGateway", orderGateway );
} )

test( "Deve verificar se um pedido tem estoque disponível", async function ()
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
    const orderCreated = await orderGateway.createOrder( input );
    const orderGet = await orderGateway.getOrderById( orderCreated.orderId );

    const order = {
        orderId: orderGet.orderId,
        status: orderGet.status,
        userId: orderGet.userId,
        amount: orderGet.amount,
        items: orderGet.items
    }
    const res = await checkInventory.execute( order );
    expect( res.reservedStatus ).toBe( true );
} )

afterEach( () =>
{
    queue.disconnect();
} )