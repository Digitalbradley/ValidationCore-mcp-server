import { AxiosResponse } from 'axios';
declare const apiClient: import("axios").AxiosInstance;
export declare function callValidationAPI(endpoint: string, data: any): Promise<AxiosResponse>;
export declare function callGTINAPI(gtin: string): Promise<AxiosResponse>;
export default apiClient;
//# sourceMappingURL=api-client.d.ts.map