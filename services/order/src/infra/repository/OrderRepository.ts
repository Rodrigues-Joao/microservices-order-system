

import { PrismaClient } from '@prisma/client';
import { Order } from '../../domain/entity/Order';
import IDatabaseConnection from '../database/DatabaseConnection';
import { inject } from '../di/Registry';


export interface IOrderRepository 
{
    findById( id: string | number ): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    create( data: Order ): Promise<void>;
    update( id: string | number, data: Partial<Order> ): Promise<Order>;
    delete( id: string | number ): Promise<void>;
}

export class OrderRepositoryPrismaImpl implements IOrderRepository
{
    @inject( 'databaseConnection' )
    databaseConnection!: IDatabaseConnection<PrismaClient>
    findById( id: string | number ): Promise<Order | null>
    {
        throw new Error( 'Method not implemented.' );
    }
    findAll(): Promise<Order[]>
    {
        throw new Error( 'Method not implemented.' );
    }
    async create( data: Order ): Promise<void>
    {
        await this.databaseConnection.getValue().order.create( {
            data: {
                orderId: data.getOrderId(),
                userId: data.getUserId(),
                items: JSON.parse( JSON.stringify( data.getItems() ) ),
                total: data.getTotalOrder(),
                status: data.getStatus(),
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            }
        } );

    }
    update( id: string | number, data: Partial<Order> ): Promise<Order>
    {
        throw new Error( 'Method not implemented.' );
    }
    delete( id: string | number ): Promise<void>
    {
        throw new Error( 'Method not implemented.' );
    }


}
