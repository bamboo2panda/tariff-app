import React from 'react';
import Payment from '../payment';
import {Card, Alert} from 'react-bootstrap';

const Features = ({paid, userData, updateScreen}) => {
    let {plan, pay_day} = userData;
    console.log(`Plan ${plan}`);
    console.log(`Paid: ${paid}`);
    console.log(userData);
    

    return(
        <>
            <Card>
                <Card.Body>Ваш тариф: {plan}</Card.Body>
            </Card>
            
            <Payment pay_day={pay_day} paid={paid} updateScreen={updateScreen}>
                Теперь вам доступны все преимущества тарифа {plan}. 🎉
            </Payment>
        </>
    );

}

export default Features;