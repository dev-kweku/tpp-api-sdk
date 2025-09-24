import { TPPApiClient } from "../api";
import { MobileMoneyTransferParams,TransactionResponse } from "../types";

export class MobileMoneyService{
    private client:TPPApiClient;

    constructor(client:TPPApiClient){
        this.client=client;
    }

    async sendToRecipient(params:MobileMoneyTransferParams):Promise<TransactionResponse>{
        const {recipient,amount,trxn}=params;
        return this.client.get<TransactionResponse>('/TopUpApi/b2c',{
            params:{
                recipient,
                amount,
                trxn,
            }
        })
    }

    async requestFromCustomer(params:MobileMoneyTransferParams):Promise<TransactionResponse>{
        const {recipient,amount,trxn}=params;
        return this.client.get<TransactionResponse>('/TopUpApi/c2b',{
            params:{
                recipient,
                amount,
                trxn,
            }
        })
    }
}