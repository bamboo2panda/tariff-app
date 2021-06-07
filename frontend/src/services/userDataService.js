import {Component} from 'react';
require('dotenv').config()
const host = process.env.REACT_APP_WEB_HOST;
const protocol = 'http://';

export default class UserDataService extends Component {
    
    _apiBase = `${protocol}${host}:8000/api/user/me/`;

    getUserData = async (data) => {
        const res = await fetch(
            `${this._apiBase}`,{
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
}