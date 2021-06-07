import React from 'react';

const Features = ({plan, paid, userData}) => {
    console.log(`Plan ${plan}`);
    console.log(`Paid: ${paid}`);
    console.log(userData);
    const planPaidText = () => {
        if (paid){
            return `You paid till ${userData['pay_day']}`;
        }
        return 'Please pay the plan';
    };
    return(
        <>
            <h3>{plan} ({paid})</h3>
            <h4>{planPaidText}</h4>

        </>
    );

}

export default Features;