import React from 'react';
import {NavLink} from 'react-router-dom';
import {Home, CreditCard, LogOut, Briefcase} from 'react-feather'
import "./LayoutSidebar.css"

class NavbarOwner extends React.Component {
    out = () => {
        if (window.confirm("Are you sure to logout?")) {
         window.location = '/login'
         localStorage.removeItem("name");
         localStorage.removeItem("user");
         localStorage.removeItem("token");
         localStorage.removeItem("id_user");
         localStorage.removeItem("id_transaksi");
         localStorage.removeItem("id_outlet");
         localStorage.removeItem("role");
        }
       }
    render(){
    return (
        <div className="parent md:h-screen shadow-lg w-1/6">
              <section className="sidebar md:col-span-1 ">
                <div className="box-icon border-white text-sm font-semibold justify-center items-center flex flex-col mt-4">
                <h1 className="text-2xl font-bold mt-2"><span className='text-red-500'>Laundry</span>Ku</h1>
                </div>
                <div>
                <ul>
                    <li className="mt-10 ml-3 pl-6 hover:bg-red-500 hover:text-white hover:rounded-full w-9/12">
                    <NavLink to="/" activeClassName="active" className="flex items-center p-4 text-base font-normal md:dark:hover:text-white dark:hover:bg-green-700 dark:hover:text-white dark:border-gray-700">
                        <Home className="mr-3" />
                        Home
                    </NavLink>
                    </li>
                    <li className="mt-1 ml-3 pl-6 hover:bg-red-500 hover:text-white hover:rounded-full w-9/12">
                    <NavLink to="/outletOwner" activeClassName="active" className="flex items-center p-4 text-base font-normal md:dark:hover:text-white dark:hover:bg-green-700 dark:hover:text-white dark:border-gray-700">
                        <Briefcase className="mr-3" /> 
                        Outlet
                    </NavLink>
                    </li>
                    <li className="mt-1 ml-3 pl-6 hover:bg-red-500 hover:text-white hover:rounded-full w-9/12">
                    <NavLink to="/laporan" activeClassName="active" className="flex items-center p-4 text-base font-normal md:dark:hover:text-white dark:hover:bg-green-700 dark:hover:text-white dark:border-gray-700">
                        <CreditCard className="mr-3" />
                        Laporan
                    </NavLink>
                    </li>
                </ul>
                <button className='mt-36 ml-14' onClick={() => this.out()}><LogOut/></button>
                </div>
            </section>
      </div>
    );
    }
  }
  
  export default NavbarOwner;