import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faUser } from '@fortawesome/free-solid-svg-icons';

// firebase
import { firebaseProject } from './firebaseSetup';
import { getDatabase, ref, onValue, push, set, child } from 'firebase/database';

// components
import Form from './components/Form';
import BookCart from './components/BookCart';
import FilterBooks from './components/FilterBooks';
import Footer from './components/Footer';
import BookList from './components/BookList';

// Auth Components
import Profile from './authComponents/Profile';
import { useAuthValue } from './AuthContext';


function MainView() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  // controls book pagination on clicking search button again
  const [offset, setOffset] = useState(0);
  const [counter, setCounter] = useState(10);
  const [view, setView] = useState(false);
  const [cartView, setCartView] = useState(false);
  const [accountView, setAccountView] = useState(false);

  // information sharing between components
  const [sharedState, setSharedState] = useState({});

  // firebase favourites array/state
  const [fireStorage, setFireStorage] = useState([]);

  // error state
  const [error, setError] = useState(false);

  // Auth State
  const {currentUser} = useAuthValue();


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
          orderBy: 'newest',
          fields: "items(id, volumeInfo(authors, averageRating, title, subtitle, description, imageLinks, infoLink, printType ))"
        }
  
      })
      .then((response) => {
        setIsHidden(true)
        setBooks(response.data.items)
        // console.log(response);
      })
      .catch((error) => {
        setIsHidden(true);
        setError(true);
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
    if(event !== 'click') {
      event.preventDefault();

    }

      setBooks([]);
      setIsHidden(false);
      setView(false);

    // if user clicks again on search, fresh books will be gotten with the offset param in order to repopulate the page
      setOffset(counter);
      setSearchTerm([userSubject, offset, mediumType]);
      setCounter(counter + 15);

  }

  // const handleSubject = (event) => {
  //   setUserSubject(event.target.value);
  // }

  // TODO: Refactor into many functions instead of just 1
  const handleAddBook = (e) => {
      // const copyArr = books.filter((singleBook) => {
      //   return singleBook.id !== e.target.value;
      // })
      // setBooks(copyArr);
      const newArr = books.map((individualBook) => {
        if (individualBook.id === e.target.value) {
          individualBook.clicked = true;
          return individualBook;
        }

        return individualBook;
      })

      setBooks(newArr);
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

        // Get a key for a new Post.
        // Generates a new key for every new book added
        const newPostKey = push(child(ref(database), `users/${currentUser?.uid}/books`)).key;


        set(ref(database, `users/${currentUser?.uid}/${newPostKey}`), bookObj);
      }
      
  }

  // use Effect to get our books from the database and display them on the page
  useEffect(() => {
    // setting up connection to database
    const database = getDatabase(firebaseProject);

    // this is dbRef in our notes, BUT, what it IS is the location of the root of our database! database root address! where our data goes to live a nice quiet life hopefully
    const dbRootAddress = ref(database, `users/${currentUser?.uid}`);
    // console.log(dbRootAddress)
    
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
  }, [currentUser.uid]);

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

  // toggles if account-menu is open or not
  const toggleAccount = () => {
    setAccountView(!accountView);
  }

  // updates books state by parameter
  const filteredBooks = (newBookArray) => {
    setBooks(newBookArray);
  }

  return (
    <div>
      <header className="header">
        <div className="account" role="button">
          <button className='account-btn' onClick={toggleAccount}>
              <FontAwesomeIcon className='icon' icon={ faUser } />
          </button>


            {accountView && <Profile />}
        </div>
        
        <section>
          <h1 className='header-title'>The Book Spot</h1>
        <Form
        handleSubmitFunction={handleSubmit}
        handleCounter={changeCounter}
        />
        </section>
        <button onClick={toggleCart} className='book-store'><FontAwesomeIcon icon={ faBookReader } />
        {
          fireStorage.length > 0 && !cartView ? 
          <p className='notification'>{fireStorage.length}</p>
          : null
        }
        </button>
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
              color='black' 
              ariaLabel='loading'
              className="loading-icon" 
              />}

                {
                  error && <h2 className='loading-icon'>Sorry the network seems to be down, please try again soon</h2>
                }

                  { !view &&
                  <>
                  <FilterBooks
                  term={searchTerm}
                  getMoreBooks={handleSubmit}
                  bookArr={books}
                  filteredBooks={filteredBooks}
                  />

                  <BookList 
                    bookListArray={books}
                    handleAddBook={handleAddBook}
                    changeView={changeView}
                  />
                  </>
                  }

                {/* {view &&
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

                } */}

          </section>

        </div>
      </main>
      <Footer />          

    </div>
  );
}

export default MainView;