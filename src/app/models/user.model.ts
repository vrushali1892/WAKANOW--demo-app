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