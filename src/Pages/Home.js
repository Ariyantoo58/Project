
import '../App.css';
import ListCatagories from '../component/listCatagories';
import Hasil from '../component/Hasil';
import { Row, Col, Container } from 'react-bootstrap';
import React, { Component } from 'react';
import { API_URL } from '../utils/constant';
import axios from 'axios';
import Menus from '../component/Menus';
import swal from 'sweetalert';





export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: [],
            chooseCategory: 'Makanan',
            keranjangs: []
        }
    }




    componentDidMount() {
        axios
            .get(API_URL + "products?category.nama=" + this.state.chooseCategory)
            .then(res => {
                const menus = res.data;
                this.setState({ menus })
            })
            .catch(error => {
                console.log(error)
            });

        axios
            .get(API_URL + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                this.setState({ keranjangs })

            })
            .catch(error => {
                console.log(error)
            })

    }

    componentDidUpdate(prevState) {
        if (this.state.keranjangs !== prevState.keranjangs) {
            axios
                .get(API_URL + "keranjangs")
                .then(res => {
                    const keranjangs = res.data;
                    this.setState({ keranjangs })

                })
                .catch(error => {
                    console.log(error)
                })

        }
    }

    changeCategory = (value) => {
        this.setState({
            chooseCategory: value,
            menus: []
        })

        axios
            .get(API_URL + "products?category.nama=" + value)
            .then(res => {
                const menus = res.data;
                this.setState({ menus })
            })
            .catch(error => {
                console.log(error)
            })

    }


    masukKeranjang = (value) => {

        axios
            .get(API_URL + "keranjangs?product.id=" + value.id)
            .then(res => {
                if (res.data.length === 0) {

                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    }

                    axios
                        .post(API_URL + 'keranjangs', keranjang)
                        .then(res => {
                            swal({
                                title: "Berhasil!",
                                text: keranjang.product.nama + " Masuk Keranjang!",
                                icon: "success",
                                button: false,
                                timer: 2000
                            });
                        })
                        .catch(error => {
                            console.log(error)
                        });



                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value

                    };

                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
                        .then(res => {
                            swal({
                                title: "Berhasil!",
                                text: keranjang.product.nama + " Masuk Keranjang!",
                                icon: "success",
                                button: false,
                                timer: 2000
                            });
                        })
                        .catch(error => {
                            console.log(error)
                        });



                }

            })
            .catch(function (error) {
                console.log(error);
            });


    }


    render() {
        const { menus, chooseCategory, keranjangs } = this.state;
        return (


            <div className='mt-2'>
                <Container fluid>
                    <Row>
                        <ListCatagories changeCategory={this.changeCategory} chooseCategory={chooseCategory} />
                        <Col>
                            <h4><strong>Daftar Produk</strong></h4>
                            <hr />
                            <Row>
                                {menus && menus.map((menu) => (
                                    <Menus
                                        menu={menu}
                                        key={menu.id}
                                        masukKeranjang={this.masukKeranjang}


                                    />
                                ))}
                            </Row>
                        </Col>
                        <Hasil keranjangs={keranjangs} />
                        {console.log(keranjangs, 'namaaa')}
                    </Row>
                </Container>
            </div>
        );
    }
}



