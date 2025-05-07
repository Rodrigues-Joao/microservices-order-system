import { QueueController } from "./infra/controller/QueueController";
import { Registry } from "./infra/di/Registry";
import { RabbitMQAdapter } from "./infra/queue/Queue";


async function main()
{
    const queue = new RabbitMQAdapter();
    await queue.connect( "amqp://localhost" );
    Registry.getInstance().provide( "queue", queue );
    new QueueController();
}
main()