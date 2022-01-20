import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faStar } from '@fortawesome/free-solid-svg-icons';

export default function Modal(props) {
// render all the information on the page
// have a remove button that will change the view state and bring back books
const {title, imgSrc, imgAlt, description, authors, linkToBook, pageCount, rating, closeModal, printType} = props;


// function to cut down the description length a bit
const cutString = (string, desiredLength) => {
    let length = desiredLength;
    if (string !== null) {
        let trimmedStr = string.substring(0, length);
        if(trimmedStr.length === desiredLength) {
            trimmedStr += '...';
        }
    
        return trimmedStr;
    }
}
// TODO: add function to close modal and bring back book list view

// TODO: use full description but clip it at a certain length and add a button to expand the description

    return (
        <article className='card'>
            <button onClick={closeModal}  className='modal-close-button'><FontAwesomeIcon className='modal-icon'  icon={ faTimesCircle} /></button>
            <div className='modal-left-section'>
                <div className='modal-img-container'>
                    <img src={imgSrc} alt={imgAlt} className='modal-img' />
                </div>

                <a href={linkToBook} target="_blank" rel="noreferrer" className='modal-link-button'>Buy this {printType === 'MAGAZINE' ? 'Magazine' : 'Book'}</a>
            </div>

            <div className='modal-right-section'>
                <h2 className='modal-title'>{cutString(title, 42)}</h2>
                <ul className='modal-author-rating'>    
                    {/* in case theres no authors give me nada */}
                    {authors && authors.map((individualAuthor) => {
                    return (
                        <li><p>{individualAuthor}</p></li>
                    )
                })}
                    {pageCount && <li><p>Page Count: {pageCount}</p></li>}
                    {rating && <li><p><FontAwesomeIcon className='modal-icon'  icon={ faStar } /> {rating}</p></li>}
                </ul>

                <p>{cutString(description, 250)}</p>

            </div>
            
        </article>
    )
}
