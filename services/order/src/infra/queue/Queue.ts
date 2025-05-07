import * as amqp from 'amqplib'
import { Channel, ChannelModel } from 'amqplib';

export default interface IQueue
{
    connect( host: string ): Promise<void>;
    disconnect(): Promise<void>;
    createChannel(): Promise<void>;
    declareExchange( exchange: string, type: string, options?: amqp.Options.AssertExchange ): Promise<void>;
    declareQueue( queue: string, options?: amqp.Options.AssertQueue ): Promise<void>;
    bindQueue( queue: string, exchange: string, routingKey: string ): Promise<void>;
    publish( exchange: string, routingKey: string, message: any, options?: amqp.Options.Publish ): Promise<void>;
    consume( queue: string, callback: ( message: any ) => Promise<void>, options?: amqp.Options.Consume ): Promise<void>;
}

export class RabbitMQAdapter implements IQueue
{
    connection: ChannelModel | null = null;
    channel: Channel | null = null;


    async createChannel(): Promise<void>
    {
        if ( !this.connection )
            throw new Error( "Queue not connect!" )
        this.channel = await this.connection.createChannel();

    }
    async declareExchange( exchange: string, type: string = 'direct', options: amqp.Options.AssertExchange = { durable: true } ): Promise<void>
    {
        if ( !this.channel )
            throw new Error( "Channel not created" );
        await this.channel.assertExchange( exchange, type, options );
    }

    async declareQueue( queue: string, options: amqp.Options.AssertQueue = { durable: true } ): Promise<void>
    {
        if ( !this.channel )
            throw new Error( "Channel not created" );
        await this.channel.assertQueue( queue, options );
    }

    async bindQueue( queue: string, exchange: string, routingKey: string = '' ): Promise<void>
    {
        if ( !this.channel )
            throw new Error( "Channel not created" );
        await this.channel.bindQueue( queue, exchange, routingKey );
    }
    async disconnect(): Promise<void>
    {
        if ( this.connection )
            await this.connection.close()
    }

    async connect( host: string ): Promise<void>
    {
        this.connection = await amqp.connect( host );
        this.channel = await this.connection.createChannel();
    }


    async publish( exchange: string, routingKey: string, message: any, options?: amqp.Options.Publish ): Promise<void>
    {
        if ( !this.channel ) throw new Error( "Channel not created" );
        this.channel.publish(
            exchange,
            routingKey,
            Buffer.from( JSON.stringify( message ) ),
            options
        );
    }

    async consume( queue: string, callback: ( message: any ) => Promise<void>, options?: amqp.Options.Consume ): Promise<void>
    {
        if ( !this.channel ) throw new Error( "Channel not created" );

        await this.channel.consume( queue, async ( msg ) =>
        {
            if ( msg )
            {
                try
                {
                    const content = JSON.parse( msg.content.toString() );
                    await callback( content );
                    this.channel?.ack( msg );
                } catch ( error )
                {
                    this.channel?.nack( msg );
                    console.error( 'Error processing message:', error );
                }
            }
        }, options );
    }

}