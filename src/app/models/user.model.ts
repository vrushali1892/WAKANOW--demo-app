export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    isApproved?: boolean;
    isCurrentAdmin?: boolean;
    job?: string;
    contact?: string;
    address?: string;
}

export interface UserDetails {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    job?: string;
    contact?: string;
    address?: string;
}