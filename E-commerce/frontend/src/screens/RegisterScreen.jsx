import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import { register } from '../actions/userAction'
import FormContainer from '../components/shared/FormContainer'

const RegisterScreen = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const redirect = state?.from || '/'

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = e => {
        e.preventDefault();
        //dispatch
        if (password !== confirmPassword) {
            setMessage('password do not match')
        } else {
            dispatch(register(name, email, password))
        }

    };

    return (
        <>
            <FormContainer>
                <h1>Register</h1>
                {error && <Message varient='danger'>{error}</Message>}
                {loading && <Loader />}
                {message && <Message variant='danger'>{message}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='enter name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            autoComplete='email'
                            placeholder='enter email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            autoComplete='current-password'
                            placeholder='enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Re-enter password'
                            value={confirmPassword}
                            onChange={e => setconfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type='submit' varient='primary'>
                        Register
                    </Button>
                </Form>
                <Row>
                    <Col>
                        Have an account !

                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default RegisterScreen