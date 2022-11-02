import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { MdAdd, MdEdit, MdDeleteOutline } from 'react-icons/md';


class Paket extends Component {
  constructor() {
    super();
    this.state = {
      paket: [],
      isModalOpen: false,
      token: "",
      id_member: 0,
      nama: "",
      alamat: "",
      tlp: "",
      jenis_kelamin: "",
      search: "",
      userName: "",
      action: "",
      outletname: "",
      outletid: 0

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
        this.state.outletname = localStorage.getItem('outlet')
        this.state.outletid = localStorage.getItem('id_outlet')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
  }

  handleChoose = (selectedItem) => {
    if (localStorage.getItem("id_member") !== null) {
      let tempCart = []

      if (localStorage.getItem("cart") !== null) {
        tempCart = JSON.parse(localStorage.getItem("cart"))
        // JSON.parse() digunakan untuk mengonversi dari string -> array object
      }

      // cek data yang dipilih user ke keranjang belanja
      let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
      if (existItem) {
        // jika item yang dipilih ada pada keranjang belanja
        window.alert(`You have choose ${selectedItem.nama_paket} package`)
      }
      else {
        // user diminta memasukkan jumlah item yang dibeli
        let promptJumlah = window.prompt(`Input qty ${selectedItem.nama_paket} `, "")
        if (promptJumlah !== null && promptJumlah !== "") {
          // jika user memasukkan jumlah item yang dibeli
          // menambahkan properti "jumlahBeli" pada item yang dipilih
          selectedItem.qty = promptJumlah
          selectedItem.subtotal = promptJumlah * selectedItem.harga
          // masukkan item yang dipilih ke dalam cart
          tempCart.push(selectedItem)
          // simpan array tempCart ke localStorage
          localStorage.setItem("cart", JSON.stringify(tempCart))
        }
      }



    } else {
      window.alert("Choose Member First!!")
      window.location = '/choosemember'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFile = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    })
  }

  getPacket = () => {
    let url = "http://localhost:8080/paket/getByOut/" + this.state.outletid
    axios.get(url)
      .then(res => {
        this.setState({
          paket: res.data.paket
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      id_outlet: this.state.outletid,
      jenis: "",
      harga: 0,
      nama_paket: "",
      action: "insert"
    })
  }

  handleEdit = (item) => {
    this.setState({
      isModalOpen: true,
      id_outlet: item.id_outlet,
      jenis: item.jenis,
      image: item.image,
      harga: item.harga,
      nama_paket: item.nama_paket,
      action: "update",
      id_paket: item.id_paket
    })
  }

  handleSave = (e) => {
    e.preventDefault()
    let form = new FormData()

    form.append("nama_paket", this.state.nama_paket)
    // form.append("id_outlet", this.state.id_outlet)
    form.append("harga", this.state.harga)
    form.append("jenis", this.state.jenis)

    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/paket/"
      axios.post(url, form)
      // console.log(this.state.id_outlet)
        .then(res => {
          this.getPacket()
          this.handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      url = "http://localhost:8080/paket/" + this.state.id_paket
      axios.put(url, form)
        .then(res => {
          this.getPacket()
          this.handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  Drop = (id) => {
    let url = "http://localhost:8080/paket/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getPacket()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  handleChoose = (selectedItem) =>{
    if(localStorage.getItem("id_member") !== null){
      let tempCart = []

      if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
        // JSON.parse() digunakan untuk mengonversi dari string -> array object
      }

       // cek data yang dipilih user ke keranjang belanja
       let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
       if (existItem) {
           // jika item yang dipilih ada pada keranjang belanja
           window.alert(`You have choose ${selectedItem.nama_paket} package`)
       }
       else {
           // user diminta memasukkan jumlah item yang dibeli
           let promptJumlah = window.prompt(`Input qty ${selectedItem.nama_paket} `, "")
           if (promptJumlah !== null && promptJumlah !== "") {
               // jika user memasukkan jumlah item yang dibeli
               // menambahkan properti "jumlahBeli" pada item yang dipilih
               selectedItem.qty = promptJumlah
               // masukkan item yang dipilih ke dalam cart
               tempCart.push(selectedItem)
               // simpan array tempCart ke localStorage
               localStorage.setItem("cart", JSON.stringify(tempCart))
           }
       }



    }else{
      window.alert("Choose Member First!!")
      window.location = '/choosemember'
    }
  }

  componentDidMount() {
    this.getPacket()
  }

  render() {
    return (
      <div className='flex'>
        <Navbar />
        <div className="mt-10 ml-10 w-full"> 
          <h4 className="text-3xl font-bold">
              Data Paket
          </h4>
          <button className="bg-green-400 text-white text-lg font-medium px-3 py-2 rounded-xl my-3" id="btn-blue" onClick={() => this.handleAdd()}>+ Tambah Paket</button>
          <div className="row">
            {this.state.paket.map((item, index) => (
              <Card
                key={index}
                judul={item.nama_paket}
                jenis={item.jenis}
                harga={item.harga}
                outlet={item.outlet.nama}
                onEdit={() => this.handleEdit(item)}
                onDrop={() => this.Drop(item.id_paket)}
                onChoose={() => this.handleChoose(item)}
              />
            ))}
          </div>
        </div>
        <Modal show={this.state.isModalOpen} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Package</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Package Name</Form.Label>
                <Form.Control type="text" name="nama_paket" placeholder="Input package name"
                  value={this.state.nama_paket} onChange={this.handleChange} required/>
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name="harga" placeholder="Input price"
                  value={this.state.harga} onChange={this.handleChange} required/>
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Type</Form.Label>
                <Form.Select type="text" name="jenis" onChange={this.handleChange} >
                  <option value={this.state.jenis}>{this.state.jenis}</option>
                  <option value="kiloan">Kiloan</option>
                  <option value="selimut">Selimut</option>
                  <option value="kaos">Kaos</option>
                  <option value="bed_cover">Bed Cover</option>
                  <option value="lain">Lain</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button className='bg-green-500' type="submit" id="blue">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Paket;