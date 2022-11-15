import React from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import {Edit, Trash} from "react-feather"

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      outlet: [],
      isModalOpen: false,
      token: "",
      id: 0,
      name: "",
      username: "",
      password: "",
      id_outlet: "",
      role: "",
      search: "",
      userName: "",
      outletName: "",
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
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

  getUser = () => {
    let url = 'http://localhost:8080/user/'
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          user: res.data.rows,
        })        
      })
  }

  handleEdit = (item) => {
    let url = "http://localhost:8080/user/" + item.id
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          outletName: item.outlet.name,
          isModalOpen: true,
          name: item.name,
          username: item.username,
          password: item.password,
          id_outlet: item.id_outlet,
          role: item.role,
          id: item.id,
          action: "update"
        })        
      })      
  }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      name: "",
      username: "",
      id_outlet: "",
      role: "",
      password: "",
      action: "insert"
    })
  }

  handleSave = e => {
    e.preventDefault()
    let form = {
      id_admin: this.state.id_admin,
      name: this.state.name,
      username: this.state.username,
      
      id_outlet: this.state.id_outlet,
      role: this.state.role
    }
    let pass ={
      password: this.state.password,
      id_admin: this.state.id_admin,
      name: this.state.name,
      username: this.state.username,
      id_outlet: this.state.id_outlet,
      role: this.state.role
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/user/"
      axios.post(url, pass, this.headerConfig())
        .then(response => {        
          this.getUser()
          this.handleColse()
        })        
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/user/" + this.state.id
      axios.patch(url, form, this.headerConfig())
        .then(response => {        
          this.getUser()
          this.handleColse()
        })        
    }
    this.setState({
      isModalOpen: false
    })
  }

  getOutlet = async () => {
    let url = "http://localhost:8080/outlet/"
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          outlet: res.data.rows
        })        
      })
  }

  Drop = (id) => {
    let url = "http://localhost:8080/user/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url, this.headerConfig())
        .then(res => {
          this.getUser()
        })        
    }
  }

  componentDidMount() {
    this.getUser()
    this.getOutlet()
  }



  render() {
    return (
      <div className='flex'>
        <Navbar />
        <div className="mt-10 ml-10 w-full"> 
          <h4 className="text-3xl font-bold">
              Data User
          </h4>
          <button className="bg-green-400 text-white text-lg font-medium px-3 py-2 rounded-xl my-3" id="btn-blue" onClick={() => this.handleAdd()}>+ Tambah User</button>
          <table className="table-fixed text-sm text-left text-gray-500  w-3/4">
            <thead className='text-white  text-center bg-gray-700'>
              <tr className='text-lg'>
                <th>User ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Outlet</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className='text-lg text-center text-black'>
              {this.state.user.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.outlet.name}</td>
                    <td>{item.role}</td>
                    <td>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white p-2" onClick={() => this.handleEdit(item)}><Edit /></button>
                      <button className="ml-2 bg-red-500 hover:bg-red-700 text-white p-2" id="blue" onClick={() => this.Drop(item.id)}><Trash /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br></br>


        </div>

        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="name" placeholder="Input name"
                  value={this.state.name} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Input username"
                  value={this.state.username} onChange={this.handleChange} />
              </Form.Group>

              {this.state.action === "insert" &&
                <Form.Group className="mb-2" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Input password"
                    value={this.state.password} onChange={this.handleChange} />
                </Form.Group>
              }
              <Form.Group className="mb-2" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select type="text" name="role" onChange={this.handleChange} >
                  <option value={this.state.role}>{this.state.role}</option>
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                  <option value="owner">Owner</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="outlet">
                <Form.Label>Outlet</Form.Label>
                <Form.Select type="text" name="id_outlet" onChange={this.handleChange}>
                  {this.state.action === "update" &&
                    <option value={this.state.id_outlet}>{this.state.outlet.name}</option>
                  }
                  {this.state.action === "insert" &&
                    <option value={this.state.id_outlet}></option>
                  }
                  {this.state.outlet.map((item, index) => {
                    return (
                      <option value={item.id}>{item.name}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button className='bg-green-500' type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>


        <Modal show={this.state.isModalPw} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Password</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSavePw(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password_user" value={this.state.password_user} placeholder="Masukkan password"
                  onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button className='bg-green-500' type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default User;