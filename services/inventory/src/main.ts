import { CheckInventory } from "./application/usecase/CheckInventory";
import { QueueController } from "./infra/controller/QueueController";
import { Registry } from "./infra/di/Registry";
import { RabbitMQAdapter } from "./infra/queue/Queue";
const rabbitHost = process.env.RABBIT_HOST || "localhost";


async function main()
{
    const queue = new RabbitMQAdapter();
    await queue.connect( `amqp://${ rabbitHost }` );
    await queue.declareExchange( "inventory_events", "direct" );
    await queue.declareQueue( "inventory_events.inventory_result" );
    await queue.bindQueue( "inventory_events.inventory_result", "inventory_events" );
    Registry.getInstance().provide( "queue", queue );
    Registry.getInstance().provide( "checkInventory", new CheckInventory() );

    new QueueController();
}
main()