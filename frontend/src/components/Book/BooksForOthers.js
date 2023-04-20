import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backgroundImage from '../images/backgroundImage.png'
import bookCover from '../images/bookCover.png'

function BooksForOthers(){

    const { id } = useParams();
    const [ book, setBook ] = useState([]);
    const [user, setUser] = useState([]);
    

    const loadBook = () => {
        var url = `http://localhost:4000/api/findBook/${id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setBook(data);
            
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        loadBook();
    },[]);

    const loadUser = () => {
        var url = `http://localhost:4000/api/findUserbyUsername/${book.author}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setUser(data);
            console.log(data._id)
            window.location.replace(`http://localhost:3000/User/${data._id}/${book.author}`)
        }).catch(e => console.log(e))
        

        console.log(user)
    }


    const linkChapter = (id, num) => {
        window.location.replace(`http://localhost:3000/ChapterPage/${id}/${num}`)
    }

    const backButton = () => {
        window.location.replace('http://localhost:3000/books')
    }

    const readChapter = (id) => {
        window.location.replace(`http://localhost:3000/ChapterPage/${id}/1`)
    }

    const linkProfile = () => {
        loadUser();
    }

    return(
        <div  style={{backgroundImage: `url(${backgroundImage})`, display: "grid", gridTemplateColumns: "auto 250px"}}>
            

            <div  style={{ backgroundColor:"#ffd1c1", border: "solid 10px #ec84a1", height: "100vh"}}>
            <button onClick={() => backButton()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1"}}><i className="arrow left"></i></button>
            <div style={{display: "grid", gridTemplateColumns: "550px auto"}}>
                    <div>
                        <img src={bookCover} style={{width: "250px", height: "auto", margin: "0px 0px 0px 150px", boxShadow:"2px 2px 4px #000"}}></img>

                    </div>
                    <div>
                        <div style={{fontFamily: "monospace, sans-serif", fontSize: "50px", width: "250px", margin: "0px 0px", color: "#800080", fontWeight: "bold", textTransform: "capitalize", whiteSpace: "nowrap"}}>
                            {book.title}
                        </div>
                        <div style={{ fontFamily: "monospace", color: "#a1045a", fontWeight: "600", margin: "0px 0px 0px 15px", fontSize: "20px"}}>
                            {book.genre}
                        </div>
                        <p style={{fontFamily: "'Raleway', sans-serif", fontSize: "17px", width: "450px", height: "250px", wordWrap: "break-word",fontWeight: "bold", color: "#c2b5a8", backgroundColor: "white", padding: "10px 15px", margin: "15px 30px" }} >{book.description}</p>
                        
                        <div style={{display: "grid", gridTemplateColumns: "auto auto"}}>
                            <p onClick={() => linkProfile()} className='usernameLink' style={{fontFamily: "'Aref Ruqaa', serif", padding: "5px",  color: "#ff7f50", margin: "0px 0px 0px 15px", fontSize: "20px", fontWeight: "bold"}}>by {book.author}</p>
                            
                        </div>
                        
                        
                    </div>
                <button  style={{margin: "50px 0px 0px 160px", border: "none", backgroundColor: "#a50b5e", color: "white", fontSize: "16px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 10px", width: "150px", height: "35px"}} onClick={() => readChapter(book._id)}>Read</button>
            </div>
            
            
        </div>
        <div style={{backgroundColor: "#fff1eb"}}>
            <p style={{fontSize: "20px", fontFamily: "'Raleway', sans-serif", color: "#ff8066", margin: "10px 0px 0px 80px"}}>Chapters</p>
                <ul style={{listStyleType: "none", margin: "15px", color: "#faaca5", whiteSpace: "nowrap"}}>
                {
                    book.chapters?.map((chapter) => {
                        return <li className="genreItem" style={{ textOverflow: "ellipsis", overflow: "hidden"}}  onClick={() => linkChapter(book._id, chapter.chapterNumber)}>{chapter.chapterName}</li>
                    })
                }
                </ul>
                
            </div>
        </div>
    )
}

export default BooksForOthers