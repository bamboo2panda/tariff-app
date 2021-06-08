require('dotenv').config()
const { REACT_APP_WEB_HOST } = process.env;

export default class RegisterService {
    constructor(){
        this.token = localStorage.getItem("token");
        this._apiBase = `http://${REACT_APP_WEB_HOST}:8000/api/user/create/`;
        console.log(`RegisterService constructed. Token: ${this.token}`)
    }
    
    registerUser = async(data) => {
        if (!data.username || !data.password || !data.name || !data.plan){
            throw new Error('No data');
        }
        const res = await fetch(`${this._apiBase}`,{
            method: 'POST',
            crossDomain: true,
            headers: {
                'Authorization': `Token ${this.token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
            }
        );
        if (!res.ok){
            throw new Error('Bad registration');
        }
        return await res.json();
    }
}