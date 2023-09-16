export class User{
    id!: number;
    firstName!: string;
    lastName!: string;
    dob!: string;
    phoneNumber!: string;
    address!: string;
}

export interface IUser{
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    phoneNumber: string;
    address: string;
}