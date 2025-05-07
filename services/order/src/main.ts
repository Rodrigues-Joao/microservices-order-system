import { CreateOrder } from "./application/usecase/CreateOrder";
import { OrderController } from "./infra/controller/OrderController";
import { PrismaAdapter } from "./infra/database/DatabaseConnection";
import { Registry } from "./infra/di/Registry";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import { OrderRepositoryPrismaImpl } from "./infra/repository/OrderRepository";


async function main()
{
    const queue = new RabbitMQAdapter();
    await queue.connect( "amqp://localhost" );
    await queue.declareExchange( "order_created", "direct" );
    await queue.declareQueue( "order_created.process_inventory" );
    await queue.bindQueue( "order_created.process_inventory", "order_created" );
    const httServer = new ExpressAdapter();
    Registry.getInstance().provide( "queue", queue );
    Registry.getInstance().provide( "httpServer", httServer );
    Registry.getInstance().provide( "databaseConnection", new PrismaAdapter() );
    Registry.getInstance().provide( "orderRepository", new OrderRepositoryPrismaImpl() );
    Registry.getInstance().provide( "createOrder", new CreateOrder() );
    new OrderController();

    httServer.listen( 3000 );
}

main()