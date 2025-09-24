import { TPPApiClient } from "../api";
import {DataBundleTopupParams,TransactionResponse,Network,BundleListResponse} from '../types'

export class DataBundleService{
    private client:TPPApiClient;

    constructor(client:TPPApiClient){
        this.client=client;
    }

    async topUp(params:DataBundleTopupParams):Promise<TransactionResponse>{
        const {retailer,recipient,data_code,network,trxn}=params;
        return this.client.get<TransactionResponse>('/TopUpApi/dataBundle',{
            params:{
                retailer,
                recipient,
                data_code,
                network,
                trxn,
            }
        })
    }

    async getBundleList(network?:Network):Promise<BundleListResponse>{
        return this.client.get<BundleListResponse>('/TopUpApi/dataBundleList',{
            params:{
                network:network ?? Network.UNKNOWN,
            }
        })
    }
}