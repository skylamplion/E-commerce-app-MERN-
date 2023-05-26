import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartAction';
import CheckoutStep from '../components/shared/CheckoutStep';
import { useDispatch, useSelector } from 'react-redux';

const PaymentScreen = ({ navigate }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    navigate = useNavigate();
    if (!shippingAddress) {
        navigate('/shipping');
    }
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }
    return (
        <>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Payment Method
                    </Form.Label>
                    <Col>
                        <Form.Check type='radio' label='paypal or Credit card' id='paypal' name='paymentMethod'
                            value='paypal' checked
                            onChange={e => setPaymentMethod(e.target.value)}>

                        </Form.Check>
                        <Form.Check type='radio' label='stripe' id='stripe' name='paymentMethod'
                            value='stripe' checked
                            onChange={e => setPaymentMethod(e.target.value)} disabled>

                        </Form.Check>
                        {/* <Form.Check type='radio' label='pay on delivery' id='payondelivery' name='paymentMethod'
                            value='payondelivery' checked
                            onChange={e => setPaymentMethod(e.target.value)} >

                        </Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>CONTINUE</Button>
            </Form>
        </>

    )
}

export default PaymentScreen
