import "./bookView.css";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

// Components
import { StarRating } from "./Rating"



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
          <h2>{book.volumeInfo.authors.map((author) => {return (<span key={author}>{author}</span>)})}</h2>
          <div className="rating-container">
            <span>{book.volumeInfo.averageRating}</span>
            <span># of ratings: {book.volumeInfo.ratingsCount}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: `${book.volumeInfo.description}`}}></div>
          
          <h3>Get a Copy</h3>
          <button className="normal-btn">Google Store ${book.saleInfo?.retailPrice?.amount}{book.saleInfo?.retailPrice?.currencyCode}</button>

          <p>{book.volumeInfo.pageCount} pages</p>
          <p>Published {book.volumeInfo.publishedDate} by {book.volumeInfo.publisher}</p>
        </div>
      </section>}
    </main>

    <div>BookView {id}
        <button className="normal-btn" onClick={() => {navigate('/profile')}}>go back</button>
    </div>
      
    </>
    
  )
}
