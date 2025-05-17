import { CreateOrder } from "./application/usecase/CreateOrder";
import { GetOrder } from "./application/usecase/GetOrder";
import { UpdateOrder } from "./application/usecase/UpdateOrder";
import { OrderController } from "./infra/controller/OrderController";
import { QueueController } from "./infra/controller/QueueController";
import { PrismaAdapter } from "./infra/database/DatabaseConnection";
import { Registry } from "./infra/di/Registry";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import { OrderRepositoryPrismaImpl } from "./infra/repository/OrderRepository";
const rabbitHost = process.env.RABBIT_HOST || "localhost";
const port = parseInt( process.env.PORT ?? '3000' )

async function main()
{
    const queue = new RabbitMQAdapter();
    await queue.connect( `amqp://${ rabbitHost }` );
    await queue.declareExchange( "order_created", "direct" );
    await queue.declareQueue( "order_created.process_inventory" );
    await queue.bindQueue( "order_created.process_inventory", "order_created" );
    const httServer = new ExpressAdapter();
    Registry.getInstance().provide( "queue", queue );
    Registry.getInstance().provide( "httpServer", httServer );
    Registry.getInstance().provide( "databaseConnection", new PrismaAdapter() );
    Registry.getInstance().provide( "orderRepository", new OrderRepositoryPrismaImpl() );
    Registry.getInstance().provide( "createOrder", new CreateOrder() );
    Registry.getInstance().provide( "updateOrder", new UpdateOrder() );
    Registry.getInstance().provide( "getOrder", new GetOrder() );
    new OrderController();
    new QueueController();

    httServer.listen( port );
}

main()