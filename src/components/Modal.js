import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faStar } from '@fortawesome/free-solid-svg-icons';

import CutString from '../utils.js';
import Truncate from './Truncate.js';

export default function Modal(props) {
// render all the information on the page
// have a remove button that will change the view state and bring back books
const {title, imgSrc, imgAlt, description, authors, linkToBook, pageCount, rating, closeModal, printType} = props;

    return (
        <article className='card'>
            <button onClick={closeModal}  className='modal-close-button'><FontAwesomeIcon className='modal-icon'  icon={ faTimesCircle } /></button>
            <div className='modal-left-section'>
                <div className='modal-img-container'>
                    <img src={imgSrc} alt={imgAlt} className='modal-img' />
                </div>

                <a href={linkToBook} target="_blank" rel="noreferrer" className='modal-link-button'>Buy {printType === 'MAGAZINE' ? 'Magazine' : 'Book'}</a>
            </div>

            <div className='modal-right-section'>
                <h2 className='modal-title'>{CutString(title, 42)}</h2>
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

                    <Truncate
                    toBeTruncated={description}
                    amount={250}
                    />
                    
                    {/* {CutString(description, 250)}</p> */}

            </div>
            
        </article>
    )
}
