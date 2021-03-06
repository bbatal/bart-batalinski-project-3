import CutString from '../utils';

function Book(props) {

    return  (
        <article className="book-container">
            <div className='front-side'>
                <div className="img-container">
                    { props.img && <img src={props.img} alt={props.title}/>}
                    { !props.img && <p>No image sorry 😭</p>}
                </div>

                <div className='text-container'>
                    <h2>{ props.title &&
                    CutString(props.title, 45)
                    }</h2>
                </div>
            </div>
        </article>
    )
}

export default Book;