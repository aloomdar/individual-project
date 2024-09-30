import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './popup.jsx'
import popup from './popup'
import './t5a.css'

function Top5a(){
    const [data, setData] = useState([])
    useEffect(() =>{
        axios.get('/top5actors')
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [])

    
    return(
        <div className='container-fluid'>
            <h3 className='header'>Top 5 Actors</h3>
            <table class='table1'>
                <thead>
                    <tr>
                        <th>Actor ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Number of Films</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((top5actors)=>{
                            return(<tr>
                                <td onClick={popup}>{top5actors.actor_id}</td>
                                <td onClick={popup}>{top5actors.first_name}</td>
                                <td onClick={popup}>{top5actors.last_name}</td>
                                <td onClick={popup}>{top5actors.film_count}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
            
            
        </div>
    )
    
}

export default Top5a;