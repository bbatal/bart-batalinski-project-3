import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import Book from './components/Book';
import Form from './components/Form';


function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  // controls book pagination on clicking search button again
  const [offset, setOffset] = useState(0);
  const [counter, setCounter] = useState(10);

  
  // make an API call to the Open Library.org API
  useEffect(() => {
    if(searchTerm.length > 0) {
      axios({
        url: `https://www.googleapis.com/books/v1/volumes`,
        method: 'GET',
        dataResponse: 'json',
        params: {
          key: 'AIzaSyB3ql9-1V1P5fP6TqBRukTZGo7Y5WQgjtk',
          q: searchTerm[0],
          printType: searchTerm[2],
          maxResults: 15,
          startIndex: searchTerm[1],

        }
  
      })
      .then((response) => {
        console.log(response.data.items)
        setIsHidden(true)
        setBooks(response.data.items)
      })
    }
  }, [searchTerm])

  // reset the counter when subject is changed
  // useEffect(() => {
  //   setCounter(10);
  // }, [userSubject])

  // initializing random page to some data
  const random = Math.floor(Math.random() * 200);
  useEffect(() => {
    setSearchTerm(["fiction", random]);
  }, [])


  const handleSubmit = (event, userSubject, mediumType) => {
    event.preventDefault();

    setBooks([]);
    setIsHidden(false);

    // if user clicks again on search, fresh books will be gotten with the offset param in order to repopulate the page
      setOffset(counter);
      setSearchTerm([userSubject, offset, mediumType]);
      setCounter(counter + 10);

  }

  // const handleSubject = (event) => {
  //   setUserSubject(event.target.value);
  // }

  const handleRemoveBook = (e) => {
      const copyArr = books.filter((singleBook) => {
        return singleBook.id !== e.target.value;
      })

      setBooks(copyArr);
  }

  return (
    <div className="App">
      <header className="header">
        <Form
        handleSubmitFunction={handleSubmit}
        />
      </header>
      <main>
        <div className='wrapper'>
          <section className='book-collection'>
              {!isHidden && <TailSpin 
              height={100}
              width={100} 
              color='red' 
              ariaLabel='loading'
              className="loading-icon" 
              />}

              <ul className='book-list'>              
                {books.map((bookObj) => {
                    return (
                      <li className='flex-list-item'>
                        <button className='remove-button' onClick={handleRemoveBook} value={bookObj.id}>X</button>
                        <Book
                        img={bookObj.volumeInfo.imageLinks.thumbnail}
                        title={bookObj.volumeInfo.title} 
                          />
                      </li>
                    )
                  })}
                </ul>
          </section>

        </div>
      </main>


    </div>
  );
}

export default App;
