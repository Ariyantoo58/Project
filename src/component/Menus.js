import React from 'react';
import { Button, Col, Card } from 'react-bootstrap';


const Menus = ({ menu, masukKeranjang }) => {

    return (
        <Col md="4" xs='6' className='mb-4'>
            <Card className="shadow" onClick={() => masukKeranjang(menu)}>
                <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
                <Card.Body>
                    <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
                    <Card.Text>
                        Rp. {menu.harga}
                    </Card.Text>
                    <Button variant="primary">Pesan </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}


export default Menus;