import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Create(){
    const[values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        axios.post('/add_user', values)
        .then((res)=>{
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    return(
        <div className='container vh-100 vw-100 bg-secondary'>
            <div className='row'>
                <h3>Add Customer</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/' class='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="address">Address:</label>
                        <input type="text" name="address" onChange={(e)=>setValues({...values, address:e.target.value})} />
                    </div>
                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-success'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create