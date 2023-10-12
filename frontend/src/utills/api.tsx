import { API_URL } from "./constants";

interface ApiConfig {
    baseUrl: string;
    noAuthHeaders: HeadersInit;
    authHeaders: () => HeadersInit;
}

class Api {
    private baseUrl: string;
    private noAuthHeaders: HeadersInit;
    private authHeaders: () => HeadersInit;

    constructor({ baseUrl, noAuthHeaders, authHeaders }: ApiConfig) {
        this.baseUrl = baseUrl;
        this.noAuthHeaders = noAuthHeaders;
        this.authHeaders = authHeaders;
    }

    private checkResponse = (res: Response) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    };

    register(name: string, email: string, password: string) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: this.noAuthHeaders,
            body: JSON.stringify({ name, email, password }),
        }).then((res) => this.checkResponse(res));
    }

    login(email: string, password: string) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: this.noAuthHeaders,
            body: JSON.stringify({ email, password }),
        })
            .then((res) => this.checkResponse(res))
            .then((data) => {
                return data;
            });
    }

    getCurrentUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.authHeaders(),
        }).then((res) => this.checkResponse(res));
    }

    getUsersInfo() {
        return fetch(`${this.baseUrl}/users/all`, {
            headers: this.authHeaders(),
        }).then((res) => this.checkResponse(res));
    }

    deleteUsers(userIds: string[]) {
        return fetch(`${this.baseUrl}/users`, {
            method: 'DELETE',
            body: JSON.stringify({ userIds }),
            headers: this.authHeaders(),
        }).then((res) => this.checkResponse(res));
    }

    blockUsers(userIds: string[]) {
        return fetch(`${this.baseUrl}/users/block`, {
            method: 'PATCH',
            headers: this.authHeaders(),
            body: JSON.stringify({ userIds }),
        }).then((res) => this.checkResponse(res));
    }

    unblockUsers(userIds: string[]) {
        return fetch(`${this.baseUrl}/users/unblock`, {
            method: 'PATCH',
            headers: this.authHeaders(),
            body: JSON.stringify({ userIds }),
        }).then((res) => this.checkResponse(res));
    }

}

export const api = new Api({
    baseUrl: API_URL,
    authHeaders: () => ({
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
    }),
    noAuthHeaders: {
        'Content-Type': 'application/json',
    },
});