import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstant';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/shared/Message';
import Loader from '../components/shared/Loader';


const OrderScreen = () => {
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successpay } = orderPay
    const params = useParams();
    const orderId = params.id;
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails;


    if (!loading) {
        //calculate price
        const addDecimal = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimal(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    const successPaymentHandler = (paymentResult) => {
        // console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult))
    }

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successpay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, order, successpay]);

    return loading ? (<Loader />)
        : error ? (<Message variant='danger'>{error}</Message>)
            : order ? (<>
                <h2 >Order Id:- {order._id}</h2>
                <Row >
                    <Col md={8} variant='flush'>
                        <hr />
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong>{order.user.name}</p>
                        <p><strong>Email:</strong>{order.user.email}</p>
                        <p>
                            <strong>Address:</strong><br />
                            {order.shippingAddress[0].address} &nbsp;
                            {order.shippingAddress[0].city}&nbsp;
                            {order.shippingAddress[0].postal}&nbsp;
                            {order.shippingAddress[0].country}&nbsp;
                        </p>
                        {
                            order.isDelivered ?
                                <Message variant='success'>Delivered On{order.DeliveredAt}</Message>
                                : <Message variant='danger'>Not Delivered</Message>
                        }
                        <hr />
                        <ListGroup.Item>
                            <h2>Payment Method:</h2>
                            <p>
                                <strong>Method:</strong>
                                <strong>{order.paymentMethod}</strong>
                            </p>

                            {
                                order.isPaid ?
                                    (<Message variant='success'>Paid On{order.paidAt}</Message>)
                                    : (<Message variant='danger'>Not Paid</Message>)
                            }
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item>
                            <h2>orders Items</h2>
                            {order.orderItems.length === 0 ? (<Message>your Cart is Empty</Message>)
                                : (<ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid></Image>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} * ${item.price} = ${(Number(item.price) * Number(item.qty)).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>)}
                        </ListGroup.Item>
                    </Col>
                    <Col md={4}>

                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Message variant='danger'>{error}</Message>}
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                        {!order.isPaid && (<ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady ? (<Loader />) : <PayPalButton amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                            />}
                        </ListGroup.Item>)}
                    </Col>
                </Row >
            </>
            ) : null
}

export default OrderScreen
