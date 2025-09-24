import { TPPApiClient } from "../api";
import { BalanceResponse, BulkSMSParams, SMSParams, TransactionResponse } from "../types";


export class AccountService{
    private client:TPPApiClient;

    constructor(client:TPPApiClient){
        this.client=client
    }

    async send(params:SMSParams):Promise<TransactionResponse>{
        const{recipient,message,sender_id,trxn}=params;
        return this.client.get<TransactionResponse>('/TopUpApi/sms',{
            params:{
                recipient,
                message,
                sender_id,
                trxn,
            }
        })
    }

    async sendBulk(params:BulkSMSParams):Promise<TransactionResponse>{
        const {recipient,message,sender_id,trxn}=params;
        return this.client.post<TransactionResponse>('/TopUpApi/sms',{
            recipient,
            message,
            sender_id,trxn,
        })
    }
}