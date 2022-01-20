export default function FilterBooks({ bookArr, filteredBooks }) {
  
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

    return (
        <div>
            <h2>Filter Options:</h2>
            <ul>
                <li><button onClick={filterBooksByRating}>rating</button></li>
            </ul>
        </div>
    )
}
