import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from 'axios'
import { error } from 'console';
import { config } from 'process';


export class TPPApiClient{
    private client:AxiosInstance;
    private apiKey:string;
    private apiSecret:string;

    constructor(baseURL:string,apiKey:string,apiSecret:string){
        this.apiKey=apiKey;
        this.apiSecret=apiSecret;

        this.client=axios.create({
            baseURL,
            headers:{
                'Content-Type':'application/json',
            }
        });

        this.client.interceptors.request.use((config)=>{
            config.headers.ApiKey=this.apiKey;
            config.headers.ApiSecret=this.apiSecret;
            return config;
        },
    (error)=>Promise.reject(error));
    this.client.interceptors.response.use((response)=>response,(error)=>this.handleError(error))
    }

    private handleError(error:any){
        if(error.response){
            const {status,data}=error.response;

            if(data && data['status-code']){
                switch (data['status-code']){
                    case '02':
                        throw new Error('   Insufficient balance');
                        case '06':
                                throw new Error(data.message|| 'Transaction error');
                                case '09':
                                    throw new Error('Transaction pending');
                                    default:
                                        throw new Error(data.message || 'Unknown API error');
                }
            }
            throw new Error(`HTTP Error : ${status}`);
        }else if(error.request){
            throw new Error(`Network error: No response received`);
        }else{
            throw new Error(`Error: ${error.message}`)
        }
    }

    async get<T>(url:string,config?:AxiosRequestConfig):Promise<T>{
        const response:AxiosResponse<T>=await this.client.get(url,config);
        return response.data;
    }

    async post<T>(url:string,data?:any,config?:AxiosRequestConfig):Promise<T>{
        const response:AxiosResponse<T>=await this.client.post(url,data,config);
        return response.data;
    }
}