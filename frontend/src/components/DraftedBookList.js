import { useEffect, useState } from "react";
import BookDetail from "./Book/BookDetail";

function DraftedBookList({author}){
    const [ books, setBooks ] = useState([]);

    const getData = () => {
        var url = `http://localhost:4000/api/findBooksDrafted/Drafted/${author}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setBooks(data.results)
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div>
            <BookDetail book={books}/>
        </div>
    )
}

export default DraftedBookList