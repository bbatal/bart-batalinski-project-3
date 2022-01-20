import firebaseProject from '../firebaseSetup.js';
import { getDatabase, ref, remove } from 'firebase/database';
import CutString from '../utils.js';

export default function BookCart({ title, imgSrc, id }) {

    const handleRemove = (id) => {
    // create a reference to our database
    const database = getDatabase(firebaseProject);

    // get the address of the particular book that we want to remove
    console.log(id);
    const dbBookAddress = ref(database, `/${id}`);

    // remove the data from the database
    remove(dbBookAddress);


  }

    
    return (
        <article key={id} className='cart-article'>
            <button onClick={() => {handleRemove(id)}} className='remove-cart-article'>remove</button>
            <img src={imgSrc} alt={imgSrc} />
            <h2>{CutString(title, 40)}</h2>
        </article>
        )
}
