import { TPPApiClient } from "../api"
import { AirtimeTopUpParams,TransactionResponse,Network } from "../types"


export class AirtimeService{
    private client:TPPApiClient;

    constructor(client:TPPApiClient){
        this.client=client;
    }

    async topUp(params:AirtimeTopUpParams):Promise<TransactionResponse>{
        const {retailer,recipient,amount,network,trxn}=params;

        return this.client.get<TransactionResponse>('/TopUpApi/airtime',{
            params:{
                retailer,
                recipient,
                amount,
                network,
                trxn,
            }
        })
    }
}