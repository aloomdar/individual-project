import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Top5m(){
    const [data, setData] = useState([])
    useEffect(() =>{
        axios.get('/top5movies')
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [])

    
    return(
        <div className='container-fluid'>
            <h3 className='header'>Top 5 Rented Movies</h3>
            <table class='table1'>
                <thead>
                    <tr>
                        <th>Film ID</th>
                        <th>Title</th>
                        <th>Number Rented</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((top5movies)=>{
                            return(<tr>
                                <td>{top5movies.film_id}</td>
                                <td>{top5movies.title}</td>
                                <td>{top5movies.rented}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table> 
        </div>
    )
    
}

export default Top5m;