import React, { useState } from 'react';
import Error from '../error/Error';
const Form = ({ setSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState(false);
    const handleOnSubmit = ev => {
        ev.preventDefault();
        if(keyword.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        setSearch(keyword)
    }
    return ( 
        <form
            onSubmit={handleOnSubmit}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-contorl-lg"
                        placeholder="Busca una imagen"
                        onChange={ev => setKeyword(ev.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            { error ? <Error message="Añade un mensaje de búsqueda" /> : null}
        </form>
     );
}
 
export default Form;