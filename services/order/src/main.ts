import { CreateOrder } from "./application/usecase/CreateOrder";
import { OrderController } from "./infra/controller/OrderController";
import { PrismaAdapter } from "./infra/database/DatabaseConnection";
import { Registry } from "./infra/di/Registry";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { OrderRepositoryPrismaImpl } from "./infra/repository/OrderRepository";
const httServer = new ExpressAdapter();
Registry.getInstance().provide( "httpServer", httServer );
Registry.getInstance().provide( "databaseConnection", new PrismaAdapter() );
Registry.getInstance().provide( "orderRepository", new OrderRepositoryPrismaImpl() );


Registry.getInstance().provide( "createOrder", new CreateOrder() );
new OrderController();
httServer.listen( 3000 );