import React, { Component } from 'react'
import axios from 'axios'
import Image from "../assets/image-login.svg"

export default class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      nama: "",
      role: "",
      id_outlet: "",
      user: [],
      outlet: [],
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleRegister = (e) => {
    e.preventDefault()
    let form = {
      id_admin: this.state.id_admin,
      nama: this.state.nama,
      username: this.state.username,
      password: this.state.password,
      id_outlet: this.state.id_outlet,
      role: this.state.role
    }
    let url = "http://localhost:8080/user/"
      axios.post(url, form)
      .then(response => {
        console.log(response.data)
        alert("Register Success")
        this.props.history.push("/login")
      })
      .catch(error => {
        alert(error.response.data.message)
        console.log(error)
      })
  }

  getOutlet = async () => {
    let url = "http://localhost:8080/outlet/"
    axios.get(url)
      .then(res => {
        this.setState({
          outlet: res.data.outlet
        })
        console.log(res.data.outlet)        
      })
  }

  componentDidMount() {
    this.getOutlet()
  }
  
  render() {
    return (
      <>
        <div className="h-screen flex">
          <div className="flex w-1/2 justify-center items-center">
              <div>
                  <h1 className="font-semibold text-3xl">Register</h1>
                  <h3 className="text-2xl mt-2">Register to start laundry</h3>                  
                  <form
                      action="#"
                      method="POST"
                      className="mt-8"
                      onSubmit={(e) => this.handleRegister(e)}>
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          className="text-sm flex-1 block w-96 border-2 rounded-full px-6 py-4"
                          placeholder="Enter your name"
                          value={this.state.nama}
                          onChange={this.handleChange}/>
                      <input
                          type="text"
                          name="username"
                          id="username"
                          className="text-sm flex-1 block w-96 border-2 rounded-full px-6 py-4 mt-4"
                          placeholder="Enter your Username"
                          value={this.state.username}
                          onChange={this.handleChange}/>
                      <input
                          type={this.state.showPassword ? 'text' : 'password'}
                          name="password"
                          id="password"
                          className="text-sm flex-1 block w-96 border-2 rounded-full px-6 py-4 mt-4"
                          placeholder="Enter your Password"
                          value={this.state.password}
                          onChange={this.handleChange}/>
                      <select className="text-gray-400 text-sm flex-1 block w-96 border-2 rounded-full px-6 py-4 mt-4 bg-white" type="text" name="role" onChange={this.handleChange}>
                          <option value={this.state.role}>Select your role</option>
                          <option value="admin">Admin</option>
                          <option value="kasir">Kasir</option>
                          <option value="owner">Owner</option>
                      </select>
                      <select className="text-gray-400 text-sm flex-1 block w-96 border-2 rounded-full px-6 py-4 mt-4 bg-white" type="text" name="id_outlet" onChange={this.handleChange}>
                        <option disabled>Select your role</option>
                      {this.state.outlet.map((item) => {
                        return (
                          <option value={item.id_outlet}>{item.nama}</option>
                        )
                      })}
                      </select>
                      <button
                          type="submit"
                          className="justify-center mt-8 w-96 py-4 px-6 border border-transparent rounded-full text-lg font-medium text-white bg-red-500 hover:bg-red-700">
                          Login
                      </button>
                  </form>
              </div>
          </div>
          <div className="flex w-1/2 justify-center items-center">
              <img src={Image} alt="image-login"/>
          </div>
        </div>
      </>
    )
  }
}