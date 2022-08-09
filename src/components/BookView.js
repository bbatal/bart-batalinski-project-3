import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'


export default function BookView() {

    let { id } = useParams();

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
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    },[])

  return (
    <div>BookView {id}</div>
  )
}
