import React from "react";
import {Edit, Trash} from 'react-feather'

class Card extends React.Component {
    render() {
        return (
            <div className="w-1/4 shadow-md ml-10" key={this.props.key}>
                <div id="card">
                    <div className="list-book card-body row" id="crd">
                        {/* menampilkan deskripsi */}
                        <div className=" mt-3" id="text">
                            <h4 className="uppercase text-lg font-semibold mb-2">
                                {this.props.judul}
                            </h4>
                            <h6 className="text-md font-medium">
                                 Tipe : {this.props.jenis}
                            </h6>
                            <h6 className="text-md font-medium">
                                Paket di Outlet {this.props.outlet}
                            </h6>
                            <h6 className="text-md font-medium">
                               Harga : Rp {this.props.harga},00
                            </h6>
                            <br></br>
                            {/* button untuk mengedit */}
                            <button className="btn btn-sm btn-primary m-1" 
                                onClick={this.props.onEdit} data-toggle="modal" data-target="#modal" id="brown">
                               <Edit />
                            </button>

                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1" id="blue"
                                onClick={this.props.onDrop}><Trash />
                            </button>

                             {/* button untuk choose package */}
                             <button className="ml-2 border-2 border-red-500 text-black px-4 py-1 mt-2 rounded-lg" 
                                onClick={this.props.onChoose}>Pilih
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default Card;