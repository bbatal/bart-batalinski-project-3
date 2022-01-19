export default function FilterBooks({ bookArr }) {
  
    console.log(bookArr)
    return (
        <div>
            <h2>Filter Options:</h2>
            <ul>
                <li><button>rating</button></li>
                <li><button>year</button></li>
            </ul>
        </div>
    )
}
