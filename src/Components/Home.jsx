import React, { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Home = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [data, setData] = useState([])
    const click = () => {
        const obj = {
            name,
            email,
            password
        }
        setData([...data, obj]);
        toast.success('Data Saved Succesfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setEmail('')
        setName('')
        setPassword('')
    }
    // console.log(data);
    function trash(id) {
        const res = data.filter((item, index) => {
            return index != id
        })
        setData(res)
        toast.warn('Row Deleted !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    const edit = (id) => {
        setShow(true);
        setEditId(id);
        setName(data[id].name);
        setEmail(data[id].email);
        setPassword(data[id].password);
    }
    const [editId, setEditId]=useState('')
    const update = ()=>{
        const upObj = {
            name,
            email,
            password
        }
        data[editId] = upObj
        toast.success('Data Updated Succesfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setShow(false)
        setEmail('')
        setName('')
        setPassword('')
    }
    // Used for modal to open and close
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 mx-auto mt-5 border border-3 p-5 rounded-4">
                        <h1 className='text-center mb-5'>Regis<span className='text-info'>ter</span></h1>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' className='form-control mb-3' />
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' className='form-control mb-3' />
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' className='form-control mb-3' />
                        <button className='btn btn-info mx-auto d-block' onClick={click}>Submit </button>

                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-10 mx-auto">
                        <table className="table table-info">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.password}</td>
                                                    <td>
                                                        <button className='text-info btn me-3' onClick={()=>{edit(index)}}>
                                                            <FaPencilAlt />
                                                        </button>
                                                        {/* Modal Starts */}
                                                        <Modal show={show} onHide={handleClose}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Edit <span className='text-info'>Data</span></Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' className='form-control mb-3' />
                                                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' className='form-control mb-3' />
                                                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' className='form-control mb-3' />
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={handleClose}>
                                                                    Close
                                                                </Button>
                                                                <Button variant="primary" onClick={update}>
                                                                    Update
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                        {/* Modal Ends */}
                                                        <button className='text-warning btn' onClick={() => { trash(index) }}>
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <ToastContainer stacked position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce />
        </>
    )
}

export default Home