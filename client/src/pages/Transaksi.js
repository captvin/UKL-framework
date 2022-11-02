import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import NavbarKasir from '../components/NavbarKasir';
import NavbarOwner from '../components/NavbarOwner';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { Badge} from 'react-bootstrap';
import {Edit, Trash} from 'react-feather'


class Transaksi extends Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
      outlet: [],
      member: [],
      user: [],
      isModalOpen: false,
      token: "",
      id_transaksi: 0,
      id_outlet: "",
      kode_invoice: "",
      id_member: "",
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      biaya_tambahan: "",
      diskon: "",
      pajak: "",
      status: "",
      dibayar: "",
      id_user: "",
      search: "",
      userName: "",
      action: "",
      outletname: "",
      membername: "",
      username: "",
      outletid: 0

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
        this.state.outletname = localStorage.getItem('outlet')
        this.state.outletid = localStorage.getItem('id_outlet')
        this.state.id_transaksi = localStorage.getItem('id_transaksi')
        this.state.sumTotal = localStorage.getItem('sumTotal')
      } else {
        window.alert("You are not an admin/kasir")
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
    })
  }

  getKeuntungan = () => {
    let url = "http://localhost:8080/transaksi/" + this.state.outletid
    axios.get(url)
      .then(res => {
        this.setState({
          transaksi: res.data.transaksi,
          sumTotal: res.data.sumTotal
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getTransaksi = () => {
    let url = "http://localhost:8080/transaksi/getByOut/" + this.state.outletid
    axios.get(url)
      .then(res => {
        this.setState({
          transaksi: res.data.transaksi
        })
      })
      .catch(error => {
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
        console.log(this.state.outlet)
      })
      .catch(error => {
        console.log(error)
      })
  }

  getMember = async () => {
    let url = "http://localhost:8080/member/"
    axios.get(url)
      .then(res => {
        this.setState({
          member: res.data.member
        })
        console.log(this.state.member)
      })
      .catch(error => {
        console.log(error)
      })
  }

  getUser = async () => {
    let url = "http://localhost:8080/user/"
    axios.get(url)
      .then(res => {
        this.setState({
          user: res.data.user
        })
        console.log(this.state.user)
      })
      .catch(error => {
        console.log(error)
      })
  }
  

  handleEdit = (item) => {
    this.setState({
      isModalOpen: true,
      id_transaksi: item.id_transaksi,
      status: item.status,
      action: "update",
    })
  }

  handleSave = (e) => {
    e.preventDefault()
    let form = {
      id_transaksi: this.state.id_transaksi,
      status: this.state.status
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
      axios.post(url, form)
        .then(res => {
          this.getTransaksi()
          this.handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
      axios.put(url, form)
        .then(res => {
          this.getTransaksi()
          this.handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  Drop = (id) => {
    let url = "http://localhost:8080/transaksi/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getTransaksi()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  Detail = (id_transaksi) => {
    window.location = '/detail_transaksi/byTransaksi/' + id_transaksi + '/' + this.state.outletid
    localStorage.setItem("id_transaksi", id_transaksi)
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
    this.getTransaksi()
    this.getKeuntungan()
    this.getOutlet()
    this.getMember()
    this.getUser()
  }

  render() {
    return (
      <div className='flex'>
        {this.state.role == "owner" &&
            <NavbarOwner />
        }
        {this.state.role == "admin" &&
            <Navbar />
        }
        {this.state.role == "kasir" &&
            <NavbarKasir />
        }
         <div className="mt-10 ml-10 w-full">
          <h4 className="text-3xl font-bold">
              Data Transaksi
          </h4>
          {this.state.role == "admin" &&
              <NavLink to="/choosemember"> <button className="bg-green-400 text-white text-lg font-medium px-3 py-2 rounded-xl my-3" id="btn-blue">+ Tambah Transaksi</button></NavLink>
          }
          {this.state.role == "kasir" &&
              <NavLink to="/choosemember"> <button className="bg-green-400 text-white text-lg font-medium px-3 py-2 rounded-xl my-3" id="btn-blue">+ Tambah Transaksi</button></NavLink>
          }
          <table className="table text-sm text-left text-gray-500  w-full">
            <thead className='text-white  text-center bg-gray-700'>
              <tr className='text-lg'>
                <th>Kode Invoice</th>
                <th>Nama Outlet</th>
                <th>Member Name</th>
                <th>Tgl Pesan</th>
                <th>Tgl Bayar</th>
                <th>Batas Waktu</th>
                <th>Status</th>
                <th>Dibayar</th>
                <th>Total</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className='text-lg text-center text-black'>
              {this.state.transaksi.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.kode_invoice}</td>
                    <td>{item.outlet.nama}</td>
                    <td>{item.member.nama}</td>
                    <td>{item.tgl}</td>
                    <td>{item.tgl_bayar}</td>
                    <td>{item.batas_waktu}</td>
                    <td>{item.status == "baru" &&
                                    <Badge bg="danger">{item.status}</Badge>
                                }
                                {item.status == "proses" &&
                                    <Badge bg="warning">{item.status}</Badge>
                                }
                                {item.status == "selesai" &&
                                    <Badge bg="info">{item.status}</Badge>
                                }
                                {item.status == "diambil" &&
                                    <Badge bg="success">{item.status}</Badge>
                                }</td>
                    <td>{item.dibayar == "belum_bayar" &&
                                    <Badge bg="danger">{item.dibayar}</Badge>
                                }
                                {item.dibayar == "dibayar" &&
                                    <Badge bg="success">{item.dibayar}</Badge>
                                }</td>
                                <td>Rp. {item.total}</td>
                    <td>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white p-2" onClick={() => this.handleEdit(item)}><Edit /></button>
                    <button className="ml-2 bg-red-500 hover:bg-red-700 text-white p-2" id="blue" onClick={() => this.Drop(item.id_transaksi)}><Trash /></button>
                    <button className="ml-2 bg-green-500 hover:bg-green-700 text-white px-4 py-1 mt-2" onClick={() => this.Detail(item.id_transaksi)}>Detail</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Transaction Data</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select type="text" name="status" onChange={this.handleChange} >
                  <option value={this.state.status}>{this.state.status}</option>
                  <option value="baru">baru</option>
                  <option value="proses">proses</option>
                  <option value="selesai">selesai</option>
                  <option value="diambil">diambil</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" className='bg-green-500' id="blue">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Transaksi;