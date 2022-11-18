import Book from "./Book";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";

export default function BookList({bookListArray, handleAddBook, changeView}) {
    // routing
  const navigate = useNavigate();

  return (
     <ul className='book-list'>              
                    {bookListArray.map((bookObj) => {
                        return (
                          <li className="flex-list-item" key={bookObj.id}>
                            <button className='fav-button' onClick={handleAddBook} value={bookObj.id}>{bookObj.clicked ?<FontAwesomeIcon  icon={ heart } /> 
                              :  <FontAwesomeIcon icon={ farHeart } />
                          
                          }</button>

                            <button className='article-modal' onClick={() => {navigate(`/${bookObj.id}`)}}>
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
  )
}
