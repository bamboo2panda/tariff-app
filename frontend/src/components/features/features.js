import React from 'react';
import Payment from '../payment'

const Features = ({paid, userData, updateScreen}) => {
    let {plan, pay_day} = userData;
    console.log(`Plan ${plan}`);
    console.log(`Paid: ${paid}`);
    console.log(userData);
    

    return(
        <>
            <h3>{plan}</h3>
            <Payment pay_day={pay_day} paid={paid} updateScreen={updateScreen}>
                Some cool features of plan {plan}
            </Payment>
        </>
    );

}

export default Features;