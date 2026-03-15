export interface IUser{
    id?: number;
    username: string;
    email: string;
    password: string; 
    full_name?: string;
    role?: 'admin' | 'user';
}