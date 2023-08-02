export interface IResponse<T = void> {
    statusCode: number;
    status: boolean;
    message: string;
    payload?: T;
}
