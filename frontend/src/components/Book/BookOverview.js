import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backgroundImage from '../images/backgroundImage.png'
import bookCover from '../images/bookCover.png'

function BookOverview(){
    const { id } = useParams();
    const [ book, setBook ] = useState([]);


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

    const editBook = (id) => {
        window.location.replace(`http://localhost:3000/editBook/${id}`)
    }

    const addChapter = (id) => {
        window.location.replace(`http://localhost:3000/addChapter/${id}`)
    }

    const readChapter = (id) => {
        window.location.replace(`http://localhost:3000/ChapterPage/${id}/1`)
    }

    const linkBack = (id, num) => {
        window.location.replace(`http://localhost:3000/updateChapter/${id}/${num}`)
    }

    const backButton = () => {
        window.location.replace('http://localhost:3000/userProfile')
    }

    return(
        <div style={{backgroundImage: `url(${backgroundImage})`, display: "grid", gridTemplateColumns: "auto 250px"}}>
            <div  style={{ backgroundColor:"#ffd1c1", border: "solid 10px #ec84a1", height: "100vh"}}>
            <button onClick={() => backButton()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1"}}><i className="arrow left"></i></button>                <br/>
                <br/>
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
                            <div style={{fontFamily: "'Aref Ruqaa', serif", padding: "5px",  color: "#ff7f50", margin: "0px 0px 0px 15px", fontSize: "20px", fontWeight: "bold"}}>by {book.author}</div>
                            <div style={{fontFamily: "'Aref Ruqaa', serif", padding: "5px",  color: "#ff5349", margin: "0px 0px 0px 70px", fontSize: "20px", fontWeight: "bold"}} >{book.isPublished}</div>
                        </div>
                        
                    </div>
                    
                </div>
                
            <br/>
            <br/>
            <div style={{margin: "50px 0px 0px 350px"}}>
                <button style={{margin: "0px 12px", border: "none", backgroundColor: "#a50b5e", color: "white", fontSize: "16px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 10px", width: "150px", height: "35px"}} onClick={() =>  editBook(book._id)}>Edit</button>
                <button style={{margin: "0px 12px", border: "none", backgroundColor: "#a50b5e", color: "white", fontSize: "16px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 10px", width: "150px", whiteSpace: "nowrap", height: "35px"}} onClick={() => addChapter(book._id)}>Add Chapters</button>
                <button style={{margin: "0px 12px", border: "none", backgroundColor: "#a50b5e", color: "white", fontSize: "16px", fontFamily: "monospace", fontWeight: "bold", padding: "5px 10px", width: "150px", height: "35px"}} onClick={() => readChapter(book._id)}>Preview</button>
            </div>
            
        </div>
        <div style={{backgroundColor: "#fff1eb"}}>
        <p style={{fontSize: "20px", fontFamily: "'Raleway', sans-serif", color: "#ff8066", margin: "10px 0px 0px 60px"}}>Edit Chapters</p>
            <ul style={{listStyleType: "none", margin: "15px", color: "#faaca5", whiteSpace: "nowrap"}}>
                {
                    book.chapters?.map((chapter, index) => {
                        return <li className="genreItem" style={{ textOverflow: "ellipsis", overflow: "hidden"}} onClick={(e) => linkBack(book._id, index + 1)}>{chapter.chapterName}</li>
                    })
                }
            </ul>
        </div>
        </div>
    )
}

export default BookOverview