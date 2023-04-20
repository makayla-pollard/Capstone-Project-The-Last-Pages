import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Book from "./Book";
import backgroundImage from '../images/backgroundImage.png'
function BooksListGenre(){
    const { genre } = useParams()
    const [ data, setData ] = useState([]);
    const [ filteredBooks, setFilteredBooks ] = useState([]);
    const [ titleFilter, setTitleFilter ] = useState('');
    const [ authorFilter, setAuthorFilter ] = useState('');
    const [ genreFilter, setGenreFilter ] = useState('');

    useEffect(() => {
        var tempBooks = data.filter((books) => {
            return books.title.toLowerCase().includes(titleFilter)
        });
        
        tempBooks = tempBooks.filter((books) => {
            return books.author.toLowerCase().includes(authorFilter)
        });

        tempBooks = tempBooks.filter((books) => {
            return books.genre.toLowerCase().includes(genreFilter)
        });

        console.log(tempBooks);
        console.log(genreFilter);
        setFilteredBooks(tempBooks);
    }, [titleFilter, authorFilter, genreFilter])

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        var url = `http://localhost:4000/api/findBooksByGenre/${genre}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setData(data.results);
            setFilteredBooks(data.results);
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getData();
    }, []);

    function genreLink(genre){
        window.location.replace(`http://localhost:3000/bookslist/${genre}`)
    }


    return(
        <div style={{backgroundImage: `url(${backgroundImage})`, top: "65px", left: "0px",height: "100%", width: "100%", backgroundAttachment: "fixed"}}>
            
            <div style={{display: "grid", gridTemplateColumns: "auto auto"}}>
            <div className='overlay'>
                    <p style={{fontSize: "20px", fontFamily: "'Raleway', sans-serif", textAlign: "center", color: "#ff8066"}}>Genres</p>
                    <div style={{margin: "15px", color: "#faaca5"}}>
                    <div className="genreItem" onClick={() => genreLink("NonFiction")}>Non Fiction</div>
                    <div className="genreItem" onClick={() => genreLink("Fiction")}>Fiction</div>
                    <div className="genreItem" onClick={() => genreLink("Young Adult Fiction")}>Young Adult</div>
                    <div className="genreItem" onClick={() => genreLink("Historical Fiction")}>Historical Fiction</div>
                    <div className="genreItem" onClick={() => genreLink("Romance")}>Romance</div>
                    <div className="genreItem" onClick={() => genreLink("Fan Fiction")}>Fan Fiction</div>
                    <div className="genreItem" onClick={() => genreLink("Science Fiction")}>Science Fiction</div>
                    <div className="genreItem" onClick={() => genreLink("Poetry")}>Poetry</div>
                    <div className="genreItem" onClick={() => genreLink("Drama")}>Drama</div>
                    <div className="genreItem" onClick={() => genreLink("Supernatural")}>Supernatural</div>
                    <div className="genreItem" onClick={() => genreLink("Horror")}>Horror</div>
                    <div className="genreItem" onClick={() => genreLink("Comedy")}>Comedy</div>
                    <div className="genreItem" onClick={() => genreLink("Fantasy")}>Fantasy</div>
                    <div className="genreItem" onClick={() => genreLink("Adventure")}>Adventure</div>
                    </div>
                    
                </div>
                <div>
                {/* <h1 style={{margin: "15px 65px", color: "#FF90A8", fontFamily: "monospace", fontSize: "40px"}}>Books</h1> */}

                <div style={{backgroundColor: "#ffd1c1", width:"630px", margin: "20px 0px 30px 50px", padding:"0px 0px 50px 55px", border: "4px solid #ec84a1"}}>
                    
                    <div>
                        <p style={{textAlign: "center", fontSize: "50px", fontFamily: "'Kurale', monospace, sans-serif", color: "#800080", fontWeight: "bold"}}>All Books</p>
                        <form style={{ width:"500px", padding: "30px 30px 0px 100px"}}>
                            <p style={{margin: "0px 0px 10px 150px", fontFamily: "'Raleway', sans-serif", fontWeight: "500", fontSize: "20px", color: "#a1045a"}}>Search</p>
                            <div>
                                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Title:</label>
                                <input style={{margin: "0px 0px 10px 30px", border: "2px solid #ec84a1", width: "250px", height: "25px"}} type="text" placeholder="Title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)}/>
                                <br/>
                                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Author:</label>
                                <input style={{margin: "0px 0px 10px 14px", border: "2px solid #ec84a1", width: "250px", height: "25px"}} type="text" placeholder='Author' value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}/>
                                <br/>
                                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Genre:</label>
                                <input style={{margin: "0px 0px 10px 16px", border: "2px solid #ec84a1", width: "250px", height: "25px"}} type="text" placeholder='Genre' value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}/>
                            </div>
                        </form>
                    </div>
                    <div >
                            <Book book={filteredBooks}/>
                    </div>
                    </div>
                </div>
    
                
            </div>
            
            
        </div>
    )
}

export default BooksListGenre