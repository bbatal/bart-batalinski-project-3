import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

// components
import Book from './components/Book';
import Form from './components/Form';
import Modal from './components/Modal';
import BookCart from './components/BookCart';
import firebaseProject from './firebaseSetup';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import FilterBooks from './components/FilterBooks';


function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  // controls book pagination on clicking search button again
  const [offset, setOffset] = useState(0);
  const [counter, setCounter] = useState(10);
  const [view, setView] = useState(false);
  const [cartView, setCartView] = useState(false);

  // information sharing between components
  const [sharedState, setSharedState] = useState({});

  // firebase favourites array/state
  const [fireStorage, setFireStorage] = useState([]);



  // make an API call to the Google Books API
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
          fields: "items(id, volumeInfo(authors, averageRating, title, subtitle, description, imageLinks, infoLink, ))"
        }
  
      })
      .then((response) => {
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
  useEffect(() => {
    setSearchTerm(["fiction", Math.floor(Math.random() * 200)]);
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
      const clickedBookId = e.target.value;
      const bookObj = {};

      books.forEach((book) => {
        if(book.id === clickedBookId) {
          const imgSrc = book.volumeInfo.imageLinks.smallThumbnail;
          const title = book.volumeInfo.title;
          
          bookObj.src = imgSrc;
          bookObj.title = title;

          return;
        }
      })

      // console.log(bookObj)


      // loop through our local reference of firebase 
      // here is a boolean that needs to remain false in order for the book to be added
      let check = false;

      fireStorage.forEach((bookInStorage) => {
          if(bookInStorage.bookInfo.title === bookObj.title) {      
            check = true;          
            return;
          }
      })

      if (!check) {
        // create a reference to our database
        const database = getDatabase(firebaseProject);

        const dbRootAddress = ref(database);

        push(dbRootAddress, bookObj);
      }
      
  }

  // use Effect to get our books from the database and display them on the page
  useEffect(() => {
    // setting up connection to database
    const database = getDatabase(firebaseProject);

    // this is dbRef in our notes, BUT, what it IS is the location of the root of our database! database root address! where our data goes to live a nice quiet life hopefully
    const dbRootAddress = ref(database);

    onValue(dbRootAddress, (response) => {
      // console.log(response.val());
      // format the data we get back first
      // our object from firebase looks like this
      // Object { key: "87df8s7dfw7", bookInfo: {
      // src: "image source url",
      // title: "book title"
      // }

      const newBooks = [];

      // look through our data and put the data in the temp array
      // newBooks is called newState in our notes
      const data = response.val();

      for (let key in data) {
        // fill the array with { key: book1, name: "Title of the book"} type objects
        newBooks.push({key: key, bookInfo: data[key]});
      }

      // console.log(newBooks);
      // put new books into local fireStorage state variable
      setFireStorage(newBooks);

    })
  }, []);

  const changeView = (bookObject) => {
    setSharedState(bookObject);

    // closes cart component if it is open
    setCartView(false);
    setView(true);
  }

  // closes modal/ reopens list of books
  const turnOffModal = () => {
    setView(false);
  }

  // toggles if side-menu is open or not
  const toggleCart = () => {
    setCartView(!cartView);
  }

  // updates books state by parameter
  const filteredBooks = (newBookArray) => {
    setBooks(newBookArray);
  }

  return (
    <div className="App">
      <header className="header">
        <Form
        handleSubmitFunction={handleSubmit}
        handleCounter={changeCounter}
        />

        <button onClick={toggleCart}>cart</button>
        {cartView &&
          <section className='cartMenu'>
                  {
                    fireStorage.map((individualStoredBook) => {
          
                      return (
                        <BookCart 
                        title={individualStoredBook.bookInfo.title}
                        imgSrc={individualStoredBook.bookInfo.src}
                        id={individualStoredBook.key}
                        />
                      )
                    })
                  }
          </section>
        }
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
                <>
                <FilterBooks
                bookArr={books}
                filteredBooks={filteredBooks}
                />
              <ul className='book-list'>              
                {books.map((bookObj) => {
                    return (
                      <li className="flex-list-item" key={bookObj.id}>
                        <button className='fav-button' onClick={handleAddBook} value={bookObj.id}>♥</button>

                        <button className='article-modal' onClick={() => {changeView(bookObj)}}>
                          <Book
                          // error handling for if bookObj.volumeInfo.imageLinks is not valid
                          img={bookObj.volumeInfo.imageLinks ? bookObj.volumeInfo.imageLinks.thumbnail : null}
                          title={bookObj.volumeInfo.title}
                          rating={bookObj.volumeInfo.averageRating
                          ? bookObj.volumeInfo.averageRating
                          : 1 }
                          key={bookObj.id} 
                            />

                        </button>
                      </li>
                    )
                  })}
                </ul>
                </>
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
                : sharedState.volumeInfo.textSnippet
                ? sharedState.volumeInfo.textSnippet
                : null }
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
