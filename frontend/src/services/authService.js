require('dotenv').config()
const host = process.env.REACT_APP_WEB_HOST;
const protocol = 'http://';
const port = process.env.REACT_APP_WEB_PORT;

export default class AuthService {
    constructor(){
        this._apiBase = `${protocol}${host}:8000/api/user/token/`;
        console.log(`AuthService constructed.`)
    }
    

    authenticateUser = async (data) => {
        const res = await fetch(
            `${this._apiBase}`,{
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(data)
            }
        );
        if(!res.ok){
            throw new Error(`Bad authentication`);
        }
        return await res.json();
    }
}