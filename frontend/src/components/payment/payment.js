import React from 'react';
import PayService from '../../services/payService';
import {Button, Alert, Row, Col} from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment/locale/ru';



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
    if (paid){
        return (
            <>
                <Row>
                    <Col>
                        <Alert variant="success">Услуги оплачены на <Moment locale="ru" fromNow ago>{pay_day}</Moment></Alert>
                        <Button onClick={handleDropPayday}>Сбросить оплату</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>{props.children}</Col>
                </Row>
            </>
        );
    };
    return(
        <Row>
            <Col>
                <Alert variant="warning">
                    Услуги не оплачены
                </Alert>
                <Button variant="primary" onClick={handlePay}>Оплатить</Button>
            </Col>
        </Row>
            
       );
}

export default Payment;