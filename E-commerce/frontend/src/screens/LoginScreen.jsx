import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import { login } from '../actions/userAction'
import FormContainer from '../components/shared/FormContainer'

const LoginScreen = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = state?.from || '/'

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            <FormContainer>
                <h1>SIGN IN</h1>
                {error && <Message varient='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
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
                    <Button type='submit' varient='primary'>
                        SIGN IN
                    </Button>
                </Form>
                <Row>
                    <Col>
                        New Customer?
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default LoginScreen