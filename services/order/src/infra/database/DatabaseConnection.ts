import { PrismaClient } from "@prisma/client";
export default interface IDatabaseConnection<T>
{
    getValue(): T;
    close(): Promise<any>;
}

export class PrismaAdapter implements IDatabaseConnection<PrismaClient>
{
    connection: PrismaClient;

    constructor()
    {
        this.connection = new PrismaClient();
    }
    getValue(): PrismaClient
    {
        return this.connection;
    }
    close(): Promise<any>
    {
        return this.connection.$disconnect();
    }

}
