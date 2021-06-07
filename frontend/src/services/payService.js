import {Component} from 'react';
require('dotenv').config()
const host = process.env.REACT_APP_WEB_HOST;
const protocol = 'http://';

export default class PayService extends Component {
    
    _apiBase = `${protocol}${host}:8000/api/user/`;

    checkPayment = async (data) => {
        const res = await fetch(
            `${this._apiBase}is_plan_paid/`,{
                method: 'GET',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
                  },
            }
        );
        if(!res.ok){
            throw new Error(`Bad answer. Doesn't mean that not paid.`);
        }
        return await res.json();
    }
}