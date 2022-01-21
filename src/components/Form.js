import { useState, useEffect } from 'react';

const Form = ({handleSubmitFunction, handleCounter}) => {
    const [userSubject, setUserSubject] = useState('fiction');
    const [mediumType, setMediumType] = useState('all');

    useEffect(() => {
        handleCounter();
    // TODO: fix the memory leak present here
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
                    <label htmlFor='subject' className='form-label'>Subject</label>
                    <select className='header-select' id="subject" name="Subject" onChange={ (handleSubject) } value={userSubject}>
                    <option value="beauty">Beauty</option>
                    <option value="animals">Animals</option>
                    <option value="fiction">Fiction</option>
                    <option value="science">Science</option>
                    <option value="business">Business</option>
                    <option value="novel">novel</option>
                    <option value="history">History</option>
                    <option value="health">Health</option>
                    <option value="biography">Biography</option>
                    <option value="mystery">Mystery</option>
                    <option value="science fiction">Science Fiction</option>
                    <option value="thriller">Thriller</option>
                    <option value="crime">Crime</option>
                    <option value="historical fiction">Historical Fiction</option>
                    <option value="short story">Short Story</option>
                    </select>
            </div>

            <div className='input-container'>
                <label htmlFor='subject' className='form-label'>Type</label>
                <select className='header-select' id="subject" name="Subject" onChange={ (e) => {setMediumType(e.target.value)} } value={mediumType}>
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
