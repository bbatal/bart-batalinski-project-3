import { useState, useEffect } from 'react';

const formOptions = ['beauty', 'animals', 'fiction', 'science', 'business', 'novel', 'history', 'health', 'biography', 'mystery', 'science fiction', 'thriller', 'crime', 'historical fiction', 'short story'];

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
                    {formOptions.map((option) => {
                        return (
                            <option value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                        )
                    })}
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
