import React, { Component } from 'react'
import axios from 'axios'
import Image from "../assets/image-login.svg"

export default class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      isModalOpen: false,
      user: [],
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    let url = "http://localhost:8080/user/auth"
    axios.post(url, data)
      .then(res => {
        if (res.data.logged === true) {
          let name = res.data.data.nama
          let user = res.data.data
          let token = res.data.token
          let id_user = res.data.data.id_user
          let id_outlet = res.data.data.id_outlet
          let role = res.data.data.role
          let url1 = "http://localhost:8000/transaksi/myclass/" + id_user
          localStorage.setItem("name", name)
          localStorage.setItem("id_user", id_user)
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", token)
          localStorage.setItem("role", role)
          localStorage.setItem("id_outlet", id_outlet)
          axios.get(url1)
            .then(res => {
              this.setState({
                class: res.data.data
              })
              localStorage.setItem("class", JSON.stringify(this.state.class))
            })
            .catch(error => {
              console.log(error)
            })
          // if(role == "admin"){
            window.location = "/"
          // }
        }
        else {
          window.alert(res.data.message)
        }
      })
  }
  
  render() {
    return (
      <>
        <div className="h-screen flex">
          <div className="flex w-1/2 justify-center items-center">
              <div>
                  <h1 className="font-semibold text-3xl">Login</h1>
                  <h3 className="text-2xl mt-2">Login to start laundry</h3>
                  <form
                      action="#"
                      method="POST"
                      className="mt-8"
                      onSubmit={(e) => this.handleLogin(e)}>
                      <input
                          type="text"
                          name="username"
                          id="username"
                          className="text-sm flex-1 block w-96 border-2 rounded-full px-6 py-4"
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