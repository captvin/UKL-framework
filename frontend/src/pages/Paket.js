import React from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { MdAdd, MdEdit, MdDeleteOutline } from 'react-icons/md';
import {Edit, Trash} from 'react-feather'

class Paket extends React.Component {
  constructor() {
    super();
    this.state = {
      paket: [],
      isModalOpen: false,
      token: "",
      id: 0,
      jenis: "",
      harga: "",
      search: "",
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.username = localStorage.getItem('username')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
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
      isModalPw: false,
    })
  }

  getPaket = () => {
    let url = 'http://localhost:8080/paket/'
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          paket: res.data.rows
        })
        console.log(this.state.paket)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleEdit = (item) => {
    let url = "http://localhost:8080/paket/" + item.id
    axios.get(url,this.headerConfig())
      .then(res => {
        this.setState({
          isModalOpen: true,
          jenis: item.jenis,
          harga: item.harga,
          id: item.id,
          action: "update"
        })
      })
      .catch(error => {
        console.log(error)
      })

  }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      jenis: "",
      harga: "",
      action: "insert"
    })
  }

  handleSave = e => {
    e.preventDefault()
    let form = {
      // id_admin: this.state.id_admin,
      jenis: this.state.jenis,
      harga: this.state.harga,
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/paket/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getPaket()
          this.handleColse()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/paket/" + this.state.id
      axios.patch(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getPaket()
          this.handleColse()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
    })
  }

  Drop = (id) => {
    let url = "http://localhost:8080/paket/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url,this.headerConfig())
        .then(res => {
          console.log(res.data.message)
          this.getPaket()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  componentDidMount() {
    this.getPaket()
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
          <table className="table-fixed text-sm text-left text-gray-500  w-3/4">
            <thead className='text-white  text-center bg-gray-700'>
              <tr className='text-lg'>
                <th>Paket ID</th>
                <th>Jenis</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className='text-lg text-center text-black'>
              {this.state.paket.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.jenis}</td>
                    <td>{item.harga}</td>
                    <td>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white p-2" onClick={() => this.handleEdit(item)}><Edit /></button>
                      <button className="ml-2 bg-red-500 hover:bg-red-700 text-white p-2" id="blue" onClick={() => this.Drop(item.id)}><Trash /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Paket</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="jenis">
                <Form.Label>Jenis</Form.Label>
                <Form.Control type="text" name="jenis" placeholder="Masukkan jenis"
                  value={this.state.jenis} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="harga">
                <Form.Label>Harga</Form.Label>
                <Form.Control type="text" name="harga" placeholder="Masukkan Harga"
                  value={this.state.harga} onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button  type="submit" className='bg-green-500'>
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