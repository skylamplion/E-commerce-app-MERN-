import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Form, ListGroup, ListGroupItem, Button, Image } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productAction'
import { useNavigate } from 'react-router-dom';


const ProductDetails = ({ navigate }) => {
    navigate = useNavigate();
    const [qty, setQty] = useState(1)

    const params = useParams()

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [dispatch, params])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }
    return (

        <>
            <Link to='/' className=' btn btn-light'> <i className='fas fa-arrow-left'></i>&nbsp; Go Back</Link>
            <Row>

                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>

                        <ListGroupItem>
                            <h4>{product.name}</h4>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.description}
                        </ListGroupItem>

                    </ListGroup>
                </Col>

                <Col md={3}>
                    <ListGroupItem>
                        <Row className='border p-2'>
                            <Col>Status :</Col>
                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                        </Row>
                    </ListGroupItem>
                    {
                        product.countInStock > 0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty: </Col>
                                    <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>

                                        {
                                            //here we show stock in array like [1,2,3,4,5..]
                                            [...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))
                                        }
                                    </Form.Control>

                                </Row>
                            </ListGroupItem>
                        )
                    }
                    <ListGroupItem>
                        <Button className='btn-block w-100 mt-1' type='button' onClick={addToCartHandler}>Add to cart</Button>
                    </ListGroupItem>
                </Col>

            </Row>
        </>
    )
}

export default ProductDetails
