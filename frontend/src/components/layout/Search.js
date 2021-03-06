import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <form class="form-inline my-2 my-lg-0" onSubmit={searchHandler} >
                <input 
                    class="form-control mr-sm-2"
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Nicola Tesla"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <span class="search-icon"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path></svg></span>                 
        </form>
    )
}

export default Search