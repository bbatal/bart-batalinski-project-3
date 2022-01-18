import './Modal.css';

export default function Modal(props) {
// render all the information on the page
// have a remove button that will change the view state and bring back books
const {title, imgSrc, imgAlt, description, authors, linkToBook, pageCount, rating, closeModal, printType} = props;


// TODO: add function to close modal and bring back book list view

// TODO: use full description but clip it at a certain length and add a button to expand the description

    return (
        <article>
            <button onClick={closeModal}>X</button>
            <img src={imgSrc} alt={imgAlt} />
            <h2>{title}</h2>
            <ul>    
                {/* in case theres no authors give me nada */}
                {authors && authors.map((individualAuthor) => {
                return (
                    <li><p>{individualAuthor}</p></li>
                )
            })}
                <li><p>Page Count: {pageCount}</p></li>
                <li><p>Rating: {rating}</p></li>
                <li><a href={linkToBook} target="_blank">Buy this {printType === 'MAGAZINE' ? 'Magazine' : 'Book'}</a></li>
            </ul>

            <p>{description}</p>
            
        </article>
    )
}
