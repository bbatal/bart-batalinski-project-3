import firebaseProject from '../firebaseSetup.js';
import { getDatabase, ref, remove } from 'firebase/database';

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
        <article key={id}>
            <button onClick={() => {handleRemove(id)}}>X</button>
            <img src={imgSrc} alt={imgSrc} />
            <h2>{title}</h2>
        </article>
        )
}
