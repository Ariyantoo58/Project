
import './App.css';
import NavbarComponent from './component/NavbarComponent';
import ListCatagories from './component/listCatagories';
import Hasil from './component/Hasil';
import { Row, Col, Container } from 'react-bootstrap';
import React, { Component } from 'react';
import { API_URL } from './utils/constant';
import axios from 'axios';
import Menus from './component/Menus';
import swal from 'sweetalert';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: [],
      chooseCategory: 'Makanan',
      keranjang: []
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

        console.log(keranjangs, 'Ini keranjang gede')

      })
      .catch(error => {
        console.log(error)
      })

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

  inputKeranjang = (value) => {

    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then(res => {
        if (res.data.length === 0) {

          const keranjang = {
            jumlah: 1,
            total_harga: value.total,
            product: value
          }


          axios
            .post(API_URL + 'keranjangs')
            .then(res => {
              swal({
                title: "Berhasil!",
                text: keranjang.product.nama + " Masuk Keranjang!",
                icon: "success",
                timer: 2000
              });
            })
            .catch(error => {
              console.log(error)
            });



        }

        else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, 'keranjang')
            .then(res => {
              swal({
                title: "Berhasil!",
                text: keranjang.product.nama + " Masuk Keranjang!",
                icon: "success",
                timer: 2000
              });
            })
            .catch(error => {
              console.log(error)
            });



        }
      })
      .catch(error => {
        console.log(error)
      })


  }


  render() {
    const { menus, chooseCategory, keranjangs } = this.state;
    return (
      < div className="App" >
        <NavbarComponent />
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
                      inputKeranjang={this.inputKeranjang}


                    />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
            </Row>
          </Container>
        </div>
      </div >
    );
  }
}

export default App;


