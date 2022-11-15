import React from 'react';
import Navbar from '../components/NavbarOwner'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { MdAdd, MdEdit, MdDeleteOutline } from 'react-icons/md';
import {Edit, Trash} from 'react-feather'

class OutletOwner extends React.Component {
  constructor() {
    super();
    this.state = {
      outlet: [],
      isModalOpen: false,
      token: "",
      id_outlet: 0,
      nama: "",
      alamat: "",
      tlp: "",
      search: "",
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "owner") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
      } else {
        window.alert("You are not an owner")
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

  getOutlet = () => {
    let url = 'http://localhost:8080/outlet/'
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          outlet: res.data.outlet
        })
        console.log(this.state.outlet)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleEdit = (item) => {
    let url = "http://localhost:8080/outlet/" + item.id_outlet
    axios.get(url)
      .then(res => {
        this.setState({
          isModalOpen: true,
          nama: item.nama,
          alamat: item.alamat,
          tlp: item.tlp,
          id_outlet: item.id_outlet,
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
      nama: "",
      alamat: "",
      tlp: "",
      action: "insert"
    })
  }

  handleSave = e => {
    e.preventDefault()
    let form = {
      id_admin: this.state.id_admin,
      nama: this.state.nama,
      alamat: this.state.alamat,
      tlp: this.state.tlp
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/outlet/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getOutlet()
          this.handleColse()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/outlet/" + this.state.id_outlet
      axios.put(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getOutlet()
          this.handleColse()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
    })
  }

  Drop = (id) => {
    let url = "http://localhost:8080/outlet/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getOutlet()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  componentDidMount() {
    this.getOutlet()
  }



  render() {
    return (
      <div className='flex'>
        <Navbar />
        <div className="mt-10 ml-10 w-full">
          <h4 className="text-3xl font-bold">
              Data Outlet
          </h4>
          <button className="bg-green-400 text-white text-lg font-medium px-3 py-2 rounded-xl my-3" id="btn-blue" onClick={() => this.handleAdd()}>+ Tambah Outlet</button>
          <table className="table-fixed text-sm text-left text-gray-500  w-3/4">
            <thead className='text-white  text-center bg-gray-700'>
              <tr className='text-lg'>
                <th>Outlet ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>No Telp</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className='text-lg text-center text-black'>
              {this.state.outlet.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_outlet}</td>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.tlp}</td>
                    <td>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white p-2" onClick={() => this.handleEdit(item)}><Edit /></button>
                      <button className="ml-2 bg-red-500 hover:bg-red-700 text-white p-2" id="blue" onClick={() => this.Drop(item.id_outlet)}><Trash /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Outlet</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="nama" placeholder="Masukkan nama"
                  value={this.state.nama} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Alamat</Form.Label>
                <Form.Control type="text" name="alamat" placeholder="Masukkan alamat"
                  value={this.state.alamat} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="tlp">
                <Form.Label>No Telp</Form.Label>
                <Form.Control type="text" name="tlp" placeholder="Masukkan telephone"
                  value={this.state.tlp} onChange={this.handleChange} />
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

export default OutletOwner;