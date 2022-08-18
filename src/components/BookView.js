import "./bookView.css";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

// Components
import { StarRating } from "./Rating";
import CustomRating from "./CustomRating";



export default function BookView() {

    const [book, setBook] = useState({});

    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
          // make an API call to the Google Books API
      axios({
        url: `https://www.googleapis.com/books/v1/volumes/${id}`,
        method: 'GET',
        dataResponse: 'json',
        params: {
          key: 'AIzaSyB3ql9-1V1P5fP6TqBRukTZGo7Y5WQgjtk'
        }
  
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
    },[id])
    console.log(book.id)

    // converts date from 'xxxx-xx-xx' format to 'weekday-month-day-year'
    const makeDate = (date) => {
      if (date.length === 10) {
        const parts = date.split('-');
        const myDate = new Date(parts[0], parts[1] - 1, parts[2]);
        return myDate.toDateString();
      } else {
        return date;
      } 
    }

  return (
    <>
    <main>
      {book?.id && <section className="book-info">
        <div className="left-side">
          <img className="thumbnail" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
          <button className="fav-btn">Add to Favs</button>
          <StarRating />
          <button className="normal-btn">Open Preview</button>
        </div>
        <div className="right-side">
          <h1>{book.volumeInfo.title}</h1>
          <h2>by {book.volumeInfo.authors.map((author) => {return (<span key={author}>{author}</span>)})}</h2>

          {book.volumeInfo.averageRating ?
          <div className="rating-container">
            <span>{book.volumeInfo.averageRating}</span>
            <span># of ratings: {book.volumeInfo.ratingsCount}</span>
            <CustomRating />
          </div>
          : <div><span>Unrated</span></div>
        }
          


          <div dangerouslySetInnerHTML={{ __html: `${book.volumeInfo.description}`}}></div>
          
          <div className="purchase-info">
            <h3>Get a Copy</h3>
            <a href={book.saleInfo?.buyLink} target="_blank" className="normal-btn">Google Store ${book.saleInfo?.retailPrice?.amount}{book.saleInfo?.retailPrice?.currencyCode}</a>
          </div>
          
          <div className="meta-info">
            <p>{book.volumeInfo.pageCount} pages</p>
            <p>Published {makeDate(book.volumeInfo.publishedDate)} by {book.volumeInfo.publisher}</p>
          </div>
          
        </div>
      </section>}
    </main>

    <div>BookView {id}
        <button className="normal-btn" onClick={() => {navigate('/profile')}}>go back</button>
    </div>
      
    </>
    
  )
}
