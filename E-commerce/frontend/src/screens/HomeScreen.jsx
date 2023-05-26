import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction'
import { Row, Col } from 'react-bootstrap'
import ProductScreen from './ProductScreen'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'
const HomeScreen = () => {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    useEffect(() => {
        //fetch product using redux
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <>
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> :
                <Row>
                    {
                        products.map(product => (
                            <Col key={product._id} md={3}>
                                <ProductScreen Product={product} />
                            </Col>
                        ))
                    }
                </Row>
            }


        </>
    )
}

export default HomeScreen
