import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'

const ProductScreen = ({ Product }) => {

    return (
        <>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/product/${Product._id}`}>
                    <Card.Img src={Product.image} variant='top' />
                </Link>
                <Card.Body>
                    <Link to={`/product/${Product._id}`}>
                        <Card.Title as='div'>
                            <strong>{Product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div'>
                        <Rating value={Product.rating} text={`${Product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as='div'>
                        <div className="my-3">
                            ${Product.price}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductScreen
