import jwt_decode from "jwt-decode";

const decodeToken = () => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
        const user = jwt_decode(userToken);
        return user;
    } else {
        return null;
    }
}

const setHeader = () => {
    const userToken = localStorage.getItem("token");
    const AuthStr = "bearer " + userToken;
    return AuthStr;
}

export { decodeToken, setHeader };