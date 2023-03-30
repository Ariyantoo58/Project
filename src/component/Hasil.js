import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem, Row, Badge } from 'react-bootstrap';
import TotalBayar from './TotalBayar';

export default class Hasil extends Component {
    render() {

        const { keranjangs } = this.props


        return (
            <Col md={3} mt={2}>
                <h4><strong>Pesanan</strong></h4>
                <hr />
                {keranjangs.length !== 0 && (
                    <ListGroup variant='flush'>
                        {keranjangs.map((menuKeranjang) => (
                            <ListGroupItem key={menuKeranjang.id}>
                                <Row>
                                    <Col xs={2}>
                                        <h4>
                                            <Badge pill variant="success">
                                                {menuKeranjang.jumlah}
                                            </Badge>
                                        </h4>
                                    </Col>
                                    <Col>
                                        <h5>{menuKeranjang.product.nama}</h5>
                                        <p> Rp. {menuKeranjang.product.harga}</p>
                                    </Col>
                                    <Col>

                                        <h5> <br /> Total </h5>
                                        <strong className='float-right'> Rp. {menuKeranjang.total_harga}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>))}

                    </ListGroup>
                )}

                <TotalBayar keranjangs={keranjangs} />

            </ Col>
        )
    }
}