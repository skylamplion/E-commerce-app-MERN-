import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './CheckoutStep.css'

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
    return (
        <>
            <Nav className='mb-4'>
                <div className='d-flex flex-nowrap'>
                    <Nav.Item>
                        {step1 ? (<LinkContainer to='/login'>
                            <Nav.Link className='colour'>SignIn</Nav.Link>
                        </LinkContainer>)
                            : (<Nav.Link disabled>
                                SignIn
                            </Nav.Link>)}
                    </Nav.Item>

                    <Nav.Item>
                        {step2 ? (<LinkContainer to='/shipping'>
                            <Nav.Link className='colour'>Shipping</Nav.Link>
                        </LinkContainer>)
                            : (<Nav.Link disabled>
                                Shipping
                            </Nav.Link>)}
                    </Nav.Item>

                    <Nav.Item>
                        {step3 ? (<LinkContainer to='/payment'>
                            <Nav.Link className='colour'>Payment</Nav.Link>
                        </LinkContainer>)
                            : (<Nav.Link disabled>
                                Payment
                            </Nav.Link>)}
                    </Nav.Item>

                    <Nav.Item>
                        {step4 ? (<LinkContainer to='/placeorder'>
                            <Nav.Link className='colour'>Place Order</Nav.Link>
                        </LinkContainer>)
                            : (<Nav.Link disabled>
                                Place Order
                            </Nav.Link>)}
                    </Nav.Item>
                </div>
            </Nav >
        </>
    )
}

export default CheckoutStep
