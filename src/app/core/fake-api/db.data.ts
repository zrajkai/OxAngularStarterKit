export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    role: string;
}

export interface Tasks {
    items: Task[];
    total_count: number;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

export const USERS: User[] = [
    {
        id: 1,
        firstName: 'Admin',
        lastName: 'Demo',
        username: 'admin',
        password: 'demo',
        accessToken: 'valid-jwt-access-token-1',
        refreshToken: 'valid-jwt-refresh-token-1',
        role: 'Admin',
    },
    {
        id: 2,
        firstName: 'Nikos',
        lastName: 'Anifantis',
        username: 'nikos',
        password: '1234',
        accessToken: 'valid-jwt-access-token-2',
        refreshToken: 'valid-jwt-refresh-token-2',
        role: 'User',
    },
    {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        username: 'john',
        password: '4321',
        accessToken: 'valid-jwt-access-token-3',
        refreshToken: 'valid-jwt-refresh-token-3',
        role: 'Guest',
    },
];


export const Tasks: Tasks = {
    total_count: 4,
    items: [
        {
            id: 1,
            title: 'Task 1',
            description: 'Description for Task 1',
            completed: false,
        },
        {
            id: 2,
            title: 'Task 2',
            description: 'Description for Task 2',
            completed: true,
        },
        {
            id: 3,
            title: 'Task 3',
            description: 'Description for Task 3',
            completed: false,
        },
        {
            id: 4,
            title: 'Task 4',
            description: 'Description for Task 4',
            completed: true,
        },
    ]
};