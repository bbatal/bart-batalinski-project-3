import { useState, useEffect } from 'react';
import './Form.css'

const Form = ({handleSubmitFunction, handleCounter}) => {
    const [userSubject, setUserSubject] = useState('fiction');
    const [mediumType, setMediumType] = useState('book');

    useEffect(() => {
        handleCounter();
                
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSubject])

    // handles our form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        handleSubmitFunction(event, userSubject, mediumType);
    }

    // Subject dropdown handler
    const handleSubject = (event) => {
        setUserSubject(event.target.value);
    }


    return (
        <div>
            <form className='form' onSubmit={ handleSubmit }>
                <div className='input-container'>
                    <label htmlFor='subject'>Pick From a subject below</label>
                    <select id="subject" name="Subject" onChange={ (handleSubject) } value={userSubject}>
                    <option value="#">subjects</option>
                    <option value="beauty">Beauty</option>
                    <option value="animals">Animals</option>
                    <option value="fiction">Fiction</option>
                    <option value="science">Science</option>
                    <option value="business">Business</option>
                    <option value="children">Children's</option>
                    <option value="history">History</option>
                    <option value="health">Health</option>
                    <option value="biography">Biography</option>
                    <option value="textbooks">Textbooks</option>
                    </select>
            </div>

            <div className='input-container'>
                <label htmlFor='subject'>Pick Medium Type</label>
                <select id="subject" name="Subject" onChange={ (e) => {setMediumType(e.target.value)} } value={mediumType}>
                <option value="#">medium</option>
                <option value="all">Any</option>
                <option value="books">Book</option>
                <option value="magazines">Magazine</option>
                
                </select>
            </div>

            <button className='search-button'>Search</button>
            </form>
        </div>
    )
}

export default Form;
