export interface AuthR {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

export interface User extends UserClaims {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
}

export interface UserClaims {
    exp: number;
}

export const userKeys: (keyof User)[] = [
    'id', 'name', 'username', 'email', 'role'
];
