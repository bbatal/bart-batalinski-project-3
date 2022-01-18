import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import Book from './components/Book';
import Form from './components/Form';
import Modal from './components/Modal';
import firebaseProject from './firebaseSetup';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';


function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  // controls book pagination on clicking search button again
  const [offset, setOffset] = useState(0);
  const [counter, setCounter] = useState(10);
  const [view, setView] = useState(false);

  // information sharing between components
  const [sharedState, setSharedState] = useState({});

  // firebase favourites array/state
  const [fireStorage, setFireStorage] = useState([]);


  
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
  const changeCounter = () => {
    setCounter(10);
  }

  // initializing random page to some data
  const random = Math.floor(Math.random() * 200);
  useEffect(() => {
    setSearchTerm(["fiction", random]);
  }, [])


  const handleSubmit = (event, userSubject, mediumType) => {
    event.preventDefault();

      setBooks([]);
      setIsHidden(false);
      setView(false);

    // if user clicks again on search, fresh books will be gotten with the offset param in order to repopulate the page
      setOffset(counter);
      setSearchTerm([userSubject, offset, mediumType]);
      setCounter(counter + 15);
      console.log(counter);

  }

  // const handleSubject = (event) => {
  //   setUserSubject(event.target.value);
  // }

  const handleAddBook = (e) => {
      // const copyArr = books.filter((singleBook) => {
      //   return singleBook.id !== e.target.value;
      // })

      // setBooks(copyArr);

      // TODO: onclick add this book to firebase
      // check if firebase already has this book in which case dont add it
  }

  const changeView = (bookObject) => {
    setSharedState(bookObject);
    setView(true);
  }

  const turnOffModal = () => {
    setView(false);
  }

  return (
    <div className="App">
      <header className="header">
        <Form
        handleSubmitFunction={handleSubmit}
        handleCounter={changeCounter}
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

                { !view &&
              <ul className='book-list'>              
                {books.map((bookObj) => {
                    return (
                      <li className="flex-list-item">
                        <button className='fav-button' onClick={handleAddBook} value={bookObj.id}>X</button>

                        <button className='article-modal' onClick={() => {changeView(bookObj)}}>
                          <Book
                          // error handling for if bookObj.volumeInfo.imageLinks is not valid
                          img={bookObj.volumeInfo.imageLinks ? bookObj.volumeInfo.imageLinks.thumbnail : null}
                          title={bookObj.volumeInfo.title}
                          key={bookObj.id} 
                            />

                        </button>
                      </li>
                    )
                  })}
                </ul>
                }

                {view &&
                // TODO: add component here that will take in some object from click event
                <Modal
                title={sharedState.volumeInfo.title}
                imgSrc={sharedState.volumeInfo.imageLinks 
                  ? sharedState.volumeInfo.imageLinks.thumbnail 
                  : null}
                imgAlt={sharedState.volumeInfo.subTitle 
                  ? sharedState.volumeInfo.subTitle 
                  : sharedState.volumeInfo.title}
                description={sharedState.volumeInfo.description
                ? sharedState.volumeInfo.description
                : sharedState.searchInfo.textSnippet}
                authors={sharedState.volumeInfo.authors
                ? sharedState.volumeInfo.authors
                : null}
                linkToBook={sharedState.volumeInfo.infoLink}
                pageCount={sharedState.volumeInfo.pageCount}
                rating={sharedState.volumeInfo.averageRating}
                printType={sharedState.volumeInfo.printType}
                closeModal={turnOffModal}
                 />

                }

          </section>

        </div>
      </main>


    </div>
  );
}

export default App;
