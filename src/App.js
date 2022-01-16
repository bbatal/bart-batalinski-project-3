import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';


function App() {
  const [books, setBooks] = useState([]);
  const [userSubject, setUserSubject] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isHidden, setIsHidden] = useState(true);


  // console.log("these are the books: ", books);
  // make an API call to the Open Library.org API
  useEffect(() => {
    if(searchTerm.length > 0) {
      axios({
        url: `http://openlibrary.org/subjects/${userSubject}.json`,
        method: 'GET',
        dataResponse: 'json',
        params: {
          published_in: searchTerm,
          limit: 30
        }
  
      })
      .then((response) => {
        const arr = [];
        response.data.works.forEach((itemInArr) => {
          const obj = {
            img: itemInArr["cover_id"],
            title: itemInArr.title
          }

          arr.push(obj);
        })
        setIsHidden(true)
        setBooks(arr);
      })
    }
  }, [searchTerm])


  const handleSubmit = (event) => {
    event.preventDefault();

    setBooks([])
    setIsHidden(false);
    setSearchTerm(publicationDate);
  }

  const handleSubject = (event) => {
    setUserSubject(event.target.value);
  }

  const handleYear = (event) => {
    setPublicationDate(event.target.value);
  }

  return (
    <div className="App">
      <header className="header">
        <form className='form' onSubmit={ handleSubmit }>
          <div className='input-container'>
            <label htmlFor='subject'>Pick From a subject below</label>
            <select id="subject" name="Subject" onChange={ handleSubject } value={userSubject}>
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

          <div className="input-container">
            <label htmlFor='publication-year'>Pick a Year Range</label>
            <select id='publication-year' name="year-of-publication" onChange={handleYear} value={publicationDate}>
              {/* TODO: re-add the selected and disabled attributes the react way */}
              <option value='#'>Publication Year</option>
              <option value='1200-1300'>1200 - 1300</option>
              <option value='1300-1400'>1300 - 1400</option>
              <option value='1400-1500'>1400 - 1500</option>
              <option value='1500-1600'>1500 - 1600</option>
              <option value='1600-1700'>1600 - 1700</option>
              <option value='1700-1800'>1700 - 1800</option>
              <option value='1800-1900'>1800 - 1900</option>
              <option value='1900-2000'>1900 - 2000</option>
              <option value='2000-2022'>2000 - 2022</option>
            </select>
          </div>

          <button className='search-button'>Search</button>
        </form>
      </header>

      {!isHidden && <TailSpin 
       height={100}
       width={100} 
       color='red' 
       ariaLabel='loading' 
       />}

       { books.map((item, index) => {
           return (
             <div className='input-container' key={index}>
               <h2>hello friends</h2>
             </div>
           )
         })
       }

    </div>
  );
}

export default App;
