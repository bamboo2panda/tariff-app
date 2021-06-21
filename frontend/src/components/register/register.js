import React, {useState} from 'react';
import RegisterService from '../../services/registerService';
import PayService from '../../services/payService';
import {useHistory} from 'react-router-dom';

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
            <h1>Registration</h1>
            <form onSubmit={handleRegister}>
                <div class="mb-3">
                    <input type="text" name="username" value={username} onChange={handleChangeUsername} placeholder="username"/>
                </div>
                <div class="mb-3">
                    <input type="password" name="password" value={password} onChange={handleChangePassword} />
                </div>
                <div class="mb-3">
                    <input type="text" name="name" value={name} onChange={handleChangeName} placeholder="John"/>
                </div>
                <div class="mb-3">
                    <select name="plan" value={plan} onChange={handleChangePlan} >
                        {listItems}
                    </select>
                </div>
                
                <button className="btn btn-success" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;