export enum Network{
    UNKNOWN=0,
    AIRTEL_TIGO=1,
    EXPRESSO=2,
    GLO=3,
    MTN=4,
    TIGO=5,
    TELECEL=6,
    BUSY=8,
    SURFLINE=9,
}

export interface BaseResponse{
    status:string;
    message:string;
    'setatus-code':string;
}

export interface TransactionResponse extends BaseResponse{
    trxn:string;
    'local-trxn-code':string;
    'balance_before'?:number;
    'balance_after'?:number;
    panding?:boolean;
}

export interface BalanceResponse extends BaseResponse{
    balance:number;
}

export interface Bundle{
    category:string;
    network_id:number;
    plan_id:string;
    plan_name:string;
    price:string;
    type:string;
    validity:string;
    volume:string;
}


export interface BundleListResponse extends BaseResponse{
    bundles:Bundle[];
}

export interface TransactionStatusResponse extends BaseResponse{
    'transaction-state':string;
}


export interface AirtimeTopUpParams{
    retailer:string;
    recipient:string;
    amount:number;
    network:Network;
    trxn:string;
}


export interface MobileMoneyTransferParams{
    recipient:string;
    amount:number;
    trxn:string;
}

export interface SMSParams{
    recipient:string|number;
    message:string;
    sender_id?:string;
    trxn:string;
}

export interface BulkSMSParams{
    recipient:string;
    message:string;
    sender_id?:string;
    trxn:string;
}