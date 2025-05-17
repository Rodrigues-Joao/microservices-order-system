

import { PrismaClient } from '@prisma/client';
import { Order } from '../../domain/entity/Order';
import IDatabaseConnection from '../database/DatabaseConnection';
import { inject } from '../di/Registry';


export interface IOrderRepository 
{
    findById( id: string ): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    create( data: Order ): Promise<void>;
    update( data: Order ): Promise<void>;
    delete( id: string | number ): Promise<void>;
}

export class OrderRepositoryPrismaImpl implements IOrderRepository
{
    @inject( 'databaseConnection' )
    databaseConnection!: IDatabaseConnection<PrismaClient>
    async findById( id: string ): Promise<Order | null>
    {
        const order = await this.databaseConnection.getValue().order.findUnique( {
            where: {
                orderId: id
            }
        } )
        if ( order === null )
            return null
        return new Order( order.orderId, order.userId, order.items as any[], order.status, order.createdAt, order.updatedAt )
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
    async update( data: Order ): Promise<void>
    {
        await this.databaseConnection.getValue().order.update( {
            where: {
                orderId: data.getOrderId()

            },
            data: {
                status: data.getStatus(),
                updatedAt: new Date(),
            }
        } )
    }
    delete( id: string | number ): Promise<void>
    {
        throw new Error( 'Method not implemented.' );
    }


}
