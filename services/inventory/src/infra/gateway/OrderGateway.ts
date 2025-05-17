import { inject } from "../di/Registry";
import HttpClient from "../http/HttpClient";

export interface IOrderGateway
{
    createOrder( order: any ): Promise<any>;
    getOrderById( orderId: string ): Promise<any>;
}

export class OrderGateway implements IOrderGateway
{
    @inject( "httpClient" )
    httpClient!: HttpClient;

    async createOrder( order: any ): Promise<any>
    {
        const response = await this.httpClient.post( "http://localhost:3000/order", order );
        return response;
    }
    async getOrderById( orderId: string ): Promise<any>
    {
        const response = await this.httpClient.get( `http://localhost:3000/order/${ orderId }` );
        return response;
    }
}