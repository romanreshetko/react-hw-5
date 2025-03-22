export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {

    return fetch(url, {
        ...options,
        credentials: "include",
    }).then(res => res.json());
}