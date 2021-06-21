import React, {useState} from 'react';
import RegisterService from '../../services/registerService';
import PayService from '../../services/payService';
import {useHistory} from 'react-router-dom';

import '../../pages/signIn.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [plan, setPlan] = useState("");
    const [plans, setPlans] = useState([]);
    const [pay_day, setPayday] = useState("");
    const history = useHistory();

    const payService = new PayService();
    const now = new Date();

    payService.getPlansList()
        .then((result) => {
            if (JSON.stringify(result) !== JSON.stringify(plans)){
                setPlans(result);
                setPayday(now.toISOString())
            }
        });
    let listItems = plans.map((plan) =>  <option value={plan.name}>{plan.name}</option>);
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangePlan = (event) => {
        setPlan(event.target.value);
    }

    const handleRegister = (event) => {
        event.preventDefault();
        const registerService = new RegisterService();
        registerService.registerUser({username, password, name, plan, pay_day})
        .then(() => {
                history.push("/");
            })
        .catch(() => {
                throw new Error("Registration fail.");
            });
    }

    return (
        <div>
            <h1>Регистрация</h1>
            <form onSubmit={handleRegister}>
                <div  className="form-floating">
                    <input className="form-control" type="text" name="username" id="username" value={username} onChange={handleChangeUsername} placeholder="username"/>
                    <label for="username">Имя пользователя</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" type="password" name="password" id="password" value={password} onChange={handleChangePassword} />
                    <label for="password">Пароль</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" type="text" name="name" id="name" value={name} onChange={handleChangeName} placeholder="John"/>
                    <label for="name">Имя</label>
                </div>
                <div className="form-floating">
                    <select class="form-select" name="plan" id="plan" value={plan} onChange={handleChangePlan} >
                        {listItems}
                    </select>
                    <label for="plan">Выберите тариф</label>
                </div>
                <br />
                <button className="btn btn-success" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;