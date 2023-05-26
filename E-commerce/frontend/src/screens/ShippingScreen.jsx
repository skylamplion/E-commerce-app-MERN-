import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../actions/cartAction';
import FormContainer from '../components/shared/FormContainer';
import CheckoutStep from '../components/shared/CheckoutStep';

const ShippingScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress?.address)
    const [city, setCity] = useState(shippingAddress?.city)
    const [postal, setPostal] = useState(shippingAddress?.postal)
    const [country, setCountry] = useState(shippingAddress?.country)


    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch
        dispatch(saveShippingAddress({ address, city, postal, country }))
        navigate('/payment')
    }

    return (
        <>
            <FormContainer>
                <CheckoutStep step1 step2 />
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text'
                            placeholder='Enter Address'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text'
                            placeholder='City'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='postal'>
                        <Form.Label>Postal</Form.Label>
                        <Form.Control type='text'
                            placeholder='Postal Code'
                            value={postal}
                            onChange={e => setPostal(e.target.value)}
                            required>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='text'
                            placeholder='Country'
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            required>
                        </Form.Control><br></br>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Continue</Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ShippingScreen

