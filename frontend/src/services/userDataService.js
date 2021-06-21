require('dotenv').config()
const host = process.env.REACT_APP_WEB_HOST;
const protocol = 'http://';
const port = process.env.REACT_APP_WEB_PORT;

export default class UserDataService {
    constructor(){
        this.token = localStorage.getItem("token");
        this._apiBase = `${protocol}${host}:8000/api/user/me/`;
        console.log(`UserDataService constructed. Token: ${this.token}`)
    }
    getUserData = async (data) => {
        const res = await fetch(
            `${this._apiBase}`,{
                method: 'GET',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.token}`,
                    },
                body: JSON.stringify(data)
            }
        );
        if (!res.ok){
            throw new Error(`Could not fetch ${this._apiBase}, status ${res.status}`);
        }
        return await res.json();
    }
}