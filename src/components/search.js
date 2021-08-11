import React, { useEffect, useState } from 'react';
import SearchCard from './search_card'



const SearchInput=()=>{

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(query)

        fetch('business/search?search='+query,{
            method: 'GET',
            headers:{
                'Content-type':'application/json',
                crossDomain:true
            }
        }).then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setResult(data.search_result))

    }
    return(
        <div className='main-cont'>
            <div className='form-cont'>
                <h2 className='search-heading'>FIND A BUSINESS TODAY</h2>

                <form onSubmit={handleSubmit} className='search-form'>
                    <input
                    type='text'
                    required 
                    value={query}
                    onChange = {(e)=>setQuery(e.target.value)} 
                    className='search-input'
                    />
                    <button><img className='search-button' src='images/search.png'/></button>
                </form>

                
            </div>
            
            

    
            {result.length > 0 && <p className='search-counter'>{result.length} search result for {query}</p>}
            <SearchCard businesses = {result} query= {query}/>
            
        </div>
    )
}


const SearchPage=()=>{
    return(
        <div className='search-container'>
            
            <SearchInput />
        </div>
    )
}

export default SearchPage