require('dotenv').config()
const host = process.env.REACT_APP_WEB_HOST;
const protocol = 'http://';

export default class PayService {
    constructor(){
        this.token = localStorage.getItem("token");
        this._apiBase = `${protocol}${host}:8000/api/user/`;
        console.log(`UserDataService constructed. Token: ${this.token}`)
    }

    checkPayment = async (data) => {
        const res = await fetch(
            `${this._apiBase}is_plan_paid/`,{
                method: 'GET',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.token}`,
                    },
                body: JSON.stringify(data)
            }
        );
        if(!res.ok){
            throw new Error(`Bad answer. Doesn't mean that not paid.`);
        }
        return await res.json();
    }

    payThePlan = async () => {
        const res = await fetch(
            `${this._apiBase}update_payday/`,{
                method: 'PATCH',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.token}`,
                  },
            }
        );
        if(!res.ok){
            throw new Error(`Bad answer. Doesn't mean that not paid.`);
        }
        return await res.json();
    }
    dropPayDay = async () => {
        const res = await fetch(
            `${this._apiBase}drop_payday/`,{
                method: 'PATCH',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `token ${this.token}`,
                  },
            }
        );
        if(!res.ok){
            throw new Error(`Bad answer. Doesn't mean that not paid.`);
        }
        return await res.json();
    }

    getPlansList = async () => {
        const res = await fetch(
            `${this._apiBase}get_plans_list/`, {
                method:'GET',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
            }
        );
        if(!res.ok){
            throw new Error(`Bad answer.`);
        }
        return await res.json();
    }
    
}