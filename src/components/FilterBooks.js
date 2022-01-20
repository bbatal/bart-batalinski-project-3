// library imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function FilterBooks({ bookArr, filteredBooks, term, getMoreBooks }) {
  
    // filterBooksByRating will check if a rating exists and then return an array
    // which will setBooks to update the list in state
    const filterBooksByRating = () => {
        const mappedArray = bookArr.map((book) => {

            // error handling for if a book or mag does not have a rating
            if(book.volumeInfo.averageRating === undefined) {
                book.volumeInfo.averageRating = 1;
                return book
            }

            return book
        })

        mappedArray.sort((a, b) => {
            // sorts mapped array from biggest to largest
            return  b.volumeInfo.averageRating - a.volumeInfo.averageRating;
        })

        filteredBooks(mappedArray);
    }

    const goNextPage = (term) => {
        // term has [0] = 'fiction, [1] = 'mediumType' [2] = 'page'
        getMoreBooks('click', term[0], term[2]);
    }

    return (
        <div>
             <div className='filter-container'>
                    <h2>Filter By:</h2>
                    <button onClick={filterBooksByRating} className='filter-button'>Highest Rating</button>
                </div>
            <div className='next-section'>
                    <button className='next-button' onClick={() => {goNextPage(term)}}>Next Page <FontAwesomeIcon className='modal-icon'  icon={ faChevronRight } /></button>
            </div>       
        </div>
    )
}
