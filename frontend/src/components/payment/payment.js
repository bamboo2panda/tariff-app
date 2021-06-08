import React from 'react';
import PayService from '../../services/payService'


const Payment = (props) => {

    const payService = new PayService();
    const handlePay = (event) =>{
        event.preventDefault();
        payService.payThePlan()
        .then(() => {
            props.updateScreen()
        });
    }

    const handleDropPayday = (event) =>{
        event.preventDefault();
        payService.dropPayDay()
        .then(() => {
            props.updateScreen()
        });
    }

    const {pay_day, paid} = props;
    console.log(paid);
    if (paid){
        return (
            <>
                <h3>Paid till {pay_day} <button onClick={handleDropPayday}>Drop payday</button></h3>
                {props.children}
            </>
        );
    };
    return(
        <>
            <h4>Please pay the plan</h4>
            <button onClick={handlePay}>PAY THE PLAN</button>
        </>
    );
}

export default Payment;