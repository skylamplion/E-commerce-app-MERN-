import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//useDispatch for request and useSelector for data retrive
import { Row, Col, Form, Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartAction'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Message from '../components/shared/Message'

const CartScreen = () => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const productId = params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    useEffect(() => {
        //checking product is available or not
        if (productId) {
            dispatch(addToCart(productId, qty))//both value will remain in redux
        }
    }, [dispatch, productId, qty])//these passed as dependencies as array

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOut = (e) => {
        // navigate('/login', { state: { redirect: '/shipping' } });

        navigate('/shipping')

        // navigate('/login?redirect=shipping')

    }


    return (
        <>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your Cart is Empty !<Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroupItem key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i
                                                    className="fa fa-trash text-danger"
                                                    aria-hidden="true"
                                                ></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>
                                    subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    ) items
                                </h2>
                                $
                                {cartItems
                                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                                    .toFixed(2)}
                            </ListGroupItem>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkOut}
                            >
                                Proceed to checkOut
                            </Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen
