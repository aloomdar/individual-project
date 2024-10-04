import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Create(){
    const[values, setValues] = useState({
        store_id: '',
        first_name: '',
        last_name: '',
        email: '',
        address_id: undefined,
    })

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        axios.post('/add_customer', values)
        .then((res)=>{
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    return(
        <div className='container'>
            <div className='row'>
                <h3>Add Customer</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/' class='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor="store_id">Store ID: </label>
                        <input type="text" name="store_id" onChange={(e)=>setValues({...values, store_id:e.target.value})} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor="first_name">First Name: </label>
                        <input type="text" name="first_name" onChange={(e)=>setValues({...values, first_name:e.target.value})} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor="last_name">Last Name:</label>
                        <input type="text" name="last_name" onChange={(e)=>setValues({...values, last_name:e.target.value})} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" name="email" onChange={(e)=>setValues({...values, email:e.target.value})} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor="address">Address ID:</label>
                        <input type="number" name="address" onChange={(e)=>setValues({...values, address_id:e.target.value})} />
                    </div>
                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-success'>Save</button>
                        <button type='submit' className='btn btn-success'>Edit</button>
                        <button type='submit' className='btn btn-success'>Delete</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create