import { TPPApiClient } from "../api";
import { TransactionStatusResponse } from "../types";


export class TransactionService{
    private client:TPPApiClient;

    constructor(client:TPPApiClient){
        this.client=client;
    }


    async getStatus(trxn:string):Promise<TransactionStatusResponse>{
        return this.client.get<TransactionStatusResponse>('/TopUpApi/transactionStatus',{
            params:{
                trxn,
            }
        })
    }

    async isCompleted(trxn:string):Promise<boolean>{
        const status=await this.getStatus(trxn);
        return status[`transaction-state`]===`COMPLETED`;
    }

    async isPending(trxn:string):Promise<boolean>{
        const status=await this.getStatus(trxn);
        return status[`transaction-state`]===`PENDING`;
    }


    async isFailed(trxn:string):Promise<boolean>{
        const status=await this.getStatus(trxn);
        return status[`transaction-state`]===`FAILED`;
    }

    async getTransactionState(trxn:string):Promise<string>{
        const status=await this.getStatus(trxn);
        return status[`transaction-state`];
    }
}