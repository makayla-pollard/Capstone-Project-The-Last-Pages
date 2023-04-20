import { useParams } from 'react-router';
import { EditorState, convertFromHtml } from 'draft-js';
import { useState, useEffect } from 'react';
import backgroundImage from '../images/backgroundImage.png'

function ChapterPage(){
    const { id } = useParams();
    const { num } = useParams();
    const [book, setBook] = useState([]);
    const [ chapter, setChapter ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ chapterNumber, setChapterNumber ] = useState('');
    const [ chapterText, setChapterText ] = useState('');
    const [ length, setLength ] = useState(0);

    const loadBook = () => {
        var url = `http://localhost:4000/api/findBook/${id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setBook(data);
            setChapter(data.chapters[num - 1].chapterText);
            console.log(data.chapters[num - 1].chapterText)
            setTitle(data.chapters[num - 1].chapterName);
            document.getElementById("text").innerHTML = data.chapters[num - 1].chapterText;
            setChapterNumber(data.chapters[num - 1].chapterNumber);
            setLength(data.chapters.length)
        }).catch(e => console.log(e));
        
    }


    useEffect(() => {
        loadBook();

        
    },[]);

    function nextPage(id,index){
        if(index < length){
            index = parseInt(num) + 1;
            window.location.replace(`http://localhost:3000/ChapterPage/${id}/${index}`)
        }else{
            if(book.isPublished == 'Published'){
                window.location.replace(`http://localhost:3000/Book/${id}`)
            }else{
                window.location.replace(`http://localhost:3000/Book/${id}`)
            }
        }
        
        //if index + 1 exceeds the max number of chapters, have page that links back to book page
        // or just make a drop down list of chapters within the book
    }

    function previousPage(id, index){
        if(index < 2){
            if(book.isPublished == 'Published'){
                window.location.replace(`http://localhost:3000/Book/${id}`)
            }else{
                window.location.replace(`http://localhost:3000/Book/${id}`)
            }
            
        }else{
            index = parseInt(num) - 1;
            window.location.replace(`http://localhost:3000/ChapterPage/${id}/${index}`)
        }
        
    }

    function goBack(){
        if(book.isPublished == 'Published'){
            window.location.replace(`http://localhost:3000/Book/${id}`)
        }else{
            window.location.replace(`http://localhost:3000/BookPage/${id}`)
        }
        
    }
    //next and previous buttons
    //just window.location.replace num + 1
    //check how many chapter are in the book and if exceed disable back button and disable front button
    //if no chapters make unreadable
    return(
        <div style={{backgroundImage: `url(${backgroundImage})`, top: "65px", left: "0px", width: "100%", height:"100%", backgroundAttachment: "fixed"}}>
                    <button onClick={() => goBack()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "pink"}}><i className="arrow left"></i></button>

            <div style={{display: "grid", gridTemplateColumns: "auto auto", margin: "0px 0px 20px 130px"}}>
                <button style={{width: "100px", border: "none", fontSize: "20px", fontFamily: "'Raleway', sans-serif", fontWeight: "bold", backgroundColor: "#feeeec", color: "#953553"}} onClick={() => previousPage(id, chapterNumber)}>Previous</button>
                <button style={{width: "100px", margin: "0px 0px 0px 950px", border: "none", fontSize: "20px", fontFamily: "'Raleway', sans-serif", fontWeight: "bold", backgroundColor: "#feeeec", color: "#953553"}} onClick={() => nextPage(id, chapterNumber)}>Next</button>
            </div>
            <div className="text" style={{whiteSpace: "normal", overflow: 'scroll', height: "1000px", wordWrap:"break-word", width:"1200px", margin: "0px 0px 0px 165px", backgroundColor:"#ffd1c1", border: "solid 10px #ec84a1", overflowX: "hidden"}}>
                
                <div style={{backgroundColor: "#fff2ee"}}>
                    <div style={{display: "grid", gridTemplateColumns: "auto auto auto", margin: "0px 15px", padding: "0px 10px"}}>
                    
                    <p style={{ fontSize: "25px", fontWeight: "bold", margin: "10px 0px", color: "#e30b5d"}}>Chapter {num}</p>
                    <div style={{textAlign: "center", padding: "5px 20px", fontSize: "20px", color: "#78194f", fontWeight:"bold", fontFamily: "'Times New Roman', monospace"}}>{book.title}</div>
                    <div style={{textAlign: "right", fontFamily: "'Aref Ruqaa', serif",  color: "#ff7f50", fontWeight: "bold", fontSize: "18px", margin: "10px 0px 0px 0px"}}>by {book.author}</div>
                </div>
                <h1 style={{margin: "0px 0px 0px 100px", color: "#800080", padding: "20px 0px 40px 0px", fontFamily:"monospace",fontWeight: "bold"}}>{title}</h1></div>
                <div style={{padding:"0px 45px"}}>
                    
                    <br/>
                    <br/>
                    <div  id="text" style={{margin: "0px 0px 50px 100px", fontSize:"24px", width: "900px"}} >
                    </div>
                </div>
                
            </div>
                <div>
                    
                </div>
            <br/>
            <br/>
        </div>
    )
}

export default ChapterPage