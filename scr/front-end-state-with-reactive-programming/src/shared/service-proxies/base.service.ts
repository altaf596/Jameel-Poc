import { HttpClient } from "@angular/common/http";
import { Inject, InjectionToken, Optional } from "@angular/core";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


export class BaseService {
    protected http: HttpClient;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    
    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "";
    }

}
