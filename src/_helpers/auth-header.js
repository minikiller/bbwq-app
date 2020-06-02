export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(sessionStorage.getItem("user"));

    if (user && user.token) {
        return { "x-access-token": user.token };
    // return { 'x-access-token': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
import { userService } from "../_services";
export function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                if (location.pathname !== "/login") {
                    location.reload(true);
                }
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
