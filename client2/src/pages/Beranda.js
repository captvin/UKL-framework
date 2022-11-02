import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { ArrowRight } from 'react-feather';
import Navbar from '../components/Navbar';
import NavbarOwner from '../components/NavbarOwner';
import NavbarKasir from '../components/NavbarKasir';
import Image from '../assets/image-login.jpg'

class Beranda extends React.Component {
    constructor() {
        super()
        this.state = {
          token: "",
          username: "",
          userId: 0,
          role: ""
        }
    
        if (localStorage.getItem('token')) {
          // if (localStorage.getItem('role') === "admin") {
            this.state.role = localStorage.getItem('role')
            this.state.token = localStorage.getItem('token')
            this.state.username = localStorage.getItem('name')
            this.state.id_outlet = localStorage.getItem('id_outlet')
          // }else{
          //   window.alert("You are not an admin")
          //   window.location = '/login'
          // }
        } 
        else {
          window.location = "/login"
        }
    
      }

    render(){
        return(
            <div className='flex'>
            {this.state.role == "kasir" &&
                <NavbarKasir></NavbarKasir>
            }
            {this.state.role == "owner" &&
                <NavbarOwner></NavbarOwner>
            }
            {this.state.role == "admin" &&
                <Navbar className="col-span-1"></Navbar>
            }

            <div className='flex flex-col justify-center mx-auto'>
                <div>
                    <img src={Image} className="w-1/2 mx-auto"/>
                </div>
                <div className='text-center text-3xl font-bold'>
                    <h1>Selamat Datang Kembali <span className='underline'>{this.state.username}</span></h1>
                    <h2>Di <span className='text-red-500'>Laundry</span>Ku.</h2>
                    <h2>Kamu Login sebagai <span className='underline'>{this.state.role}</span></h2>
                </div>
                <div className='mx-auto mt-10'>
                    {this.state.role == "owner" &&
                        <NavLink to='/laporan' className="px-5 py-3 rounded-full bg-red-500 text-xl text-white" type="submit">Buat Laporan 
                        </NavLink>
                    }
                    {this.state.role == "admin" &&
                        <NavLink to='/transaksi' className="px-5 py-3 rounded-full bg-red-500 text-xl text-white" type="submit">Lakukan Transaksi Sekarang 
                        </NavLink>
                    }
                    {this.state.role == "kasir" &&
                        <NavLink to='/transaksi' className="px-5 py-3 rounded-full bg-red-500 text-xl text-white" type="submit">Lakukan Transaksi Sekarang 
                        </NavLink>
                    }
                </div>
            </div>
                                
            {/* <div className="h-screen">
                <div className="grid grid-cols-10">
                    <div className="col-span-4 flex flex-col m-auto">
                        <h4 className="d-flex justify-content-between align-items-center mb-2">
                            <span className="display-6">Selamat Datang Kembali <span className='underline'>{this.state.username}</span> Di <span className='text-red-500'>Laundry</span>Ku. Kamu Login sebagai <span className='underline'>{this.state.role}</span></span>
                        </h4><br></br>
                        <h6 className='desc'>We will use all our strength, to shorten <br></br> the time. It takes for the laundry to take place.</h6>
                       
                        <br></br><br></br>
                        {this.state.role == "owner" &&
                                    <NavLink to='/laporan' className="btn btn-primary btn-lg w-10" type="submit">Generate Laporan Transaksi<MdArrowForwardIos />
                                    </NavLink>
                                }
                                {this.state.role == "admin" &&
                                    <NavLink to='/transaksi' className="btn btn-primary btn-lg w-10" type="submit">Management All Laundry Data <MdArrowForwardIos />
                                    </NavLink>
                                }
                                {this.state.role == "kasir" &&
                                    <NavLink to='/transaksi' className="btn btn-primary btn-lg w-10" type="submit">Management All Laundry Data <MdArrowForwardIos />
                                    </NavLink>
                                }
                    </div>
                    <div className="col-span-6">
                        <img src='https://cdn.dribbble.com/users/1104799/screenshots/3034886/microfiber_towels_d_2x.png?compress=1&resize=800x600&vertical=top' height="80%"></img>
                    </div>
                </div>
            </div> */}
            </div>
        )
    }
}

export default Beranda;