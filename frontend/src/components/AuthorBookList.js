import { useEffect, useState } from 'react';
import Book from './Book/Book';


function AuthorBookList({author}){
    const [ books, setBooks ] = useState([]);

    const getData = () => {
        var url = `http://localhost:4000/api/findBooksDrafted/Published/${author}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setBooks(data.results);
        }).catch(e => console.log(e));

        console.log(books)
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div>
                
                <Book book={books}/>
            
        </div>
    )
}

export default AuthorBookList