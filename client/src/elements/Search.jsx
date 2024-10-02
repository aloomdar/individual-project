import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Search(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get('/search')
    })
}

export default Search;