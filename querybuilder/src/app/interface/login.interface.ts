export interface QueryLogin {
    username: string | null;
    password: string | null;
}

interface Role {
    roleId: number;
    roleName: string;
}

interface Authority {
    authority: string;
}

export interface LoginData {
    username: string;
    authorities: Array<Authority>;
}

export interface AuthData {
    token: string;
    exp: string;
}
