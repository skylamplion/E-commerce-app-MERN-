import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Collapse from 'react-bootstrap/Collapse';
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderAction'
import { ORDER_CREATE_REQUEST } from "../constants/orderConstant";
const ProfileScreen = () => {

    // const { state } = useLocation()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message] = useState('')
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, user } = userDetails

    const { userInfo } = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)//get data  using state present in redux with help of useselector 
    const { success } = userUpdateProfile //success is distructure and extracted from userUpdateProfle
    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, orders, error: errorOrders } = orderListMy
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, user, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Message variant='danger'>User not found</Message>
    }


    return (
        <>
            <Row>
                <Button

                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    style={{ width: '20%', height: '10%' }}
                >
                    Change Profile details
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Col md={3}>
                            <h1>Update Profile</h1>
                            {error && <Message variant='danger'>{error}</Message>}
                            {success && <Message variant='success'>Profile Updated</Message>}
                            {message && <Message variant='danger'>{message}</Message>}

                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter name'
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
                                        placeholder='Enter email'
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
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='confirmPassword'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        autoComplete="on"
                                        type='password'
                                        placeholder='Re-enter password'
                                        value={confirmPassword}
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type='submit' variant='primary'>
                                    UPDATE
                                </Button>
                            </Form>
                        </Col>
                    </div>
                </Collapse>

                <Col md={9}>
                    <h1>My Orders</h1>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>DATE</td>
                                    <td>TOTAL</td>
                                    <td>PAID</td>
                                    <td>DELIVERD</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                ORDER_CREATE_REQUEST.paidAt.substring(0, 10)
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: "red" }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDeleverd ? (
                                                ORDER_CREATE_REQUEST.DeliveredAt.substring(0, 10)
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: "red" }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant="light">Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen

