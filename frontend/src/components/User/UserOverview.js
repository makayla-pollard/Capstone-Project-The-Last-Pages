import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthorBookList from '../AuthorBookList';
import PublishedBookList from '../PublishedBookList';
import BookTwo from '../Book/BookTwo'
import ProfilePhoto from '../images/defaultProfileImage.png'
import backgroundImage from '../images/backgroundImage.png'

function UserOverview(){
    const { id } = useParams();
    const { username } = useParams()
;    const [ user, setUser ] = useState([]);
    const [ books, setBooks ] = useState([]);


    const loadUser = () => {
        var url = `http://localhost:4000/api/findUser/${id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setUser(data)
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        loadUser();
    },[]);

    const loadBooks = () => {
        var url=`http://localhost:4000/api/findBooksDrafted/Published/${username}`
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setBooks(data.results);
        }).catch((e) => console.log(e));
    }

    

    

    useEffect(() => {
        loadBooks();
    }, []);

    const backButton = () => {
        window.location.replace('http://localhost:3000/users')
    }

    
    return(
        <div style={{backgroundImage: `url(${backgroundImage})`, top: "65px", left: "0px",height: "100%", width: "100%", backgroundAttachment: "fixed"}}>
            <button onClick={() => backButton()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "pink"}}><i className="arrow left"></i></button>
            <br/>
            <div style={{backgroundColor:"#fff1eb",width: "810px", margin: "50px 0px 0px 350px", border: "solid 5px #ec84a1", padding: "50px"}}>
                <div style={{display: "grid", gridTemplateColumns: "auto auto"}}>
                    <img src={ProfilePhoto} style={{width: "250px", height: "auto", border: "8px solid #ec84a1", margin: "0px 0px 8px 0px"}}></img>
                    <div style={{fontFamily: "monospace, sans-serif", fontSize: "50px", width: "250px", margin: "0px 0px", color: "#800080", fontWeight: "bold", whiteSpace: "nowrap"}}>{user.username}</div>
                </div>
                
                <br/>
                <br/>
                <p style={{fontFamily: "'Aref Ruqaa', serif", fontSize: "23px", color: "#b30e67", fontWeight: "bold"}}>Published Works:</p>
                <div className='Box' style={{backgroundColor: "white", padding: "20px", border: "solid 4px #ec84a1", overflowX: "scroll", width: "700px", height: "230px", overflowY: "hidden"}}>
                {
                    username ? <BookTwo book={books}/> : <div></div>
                }
                </div>
            </div>
            
            <br/>
            <br/>
                
        </div>
    )
}

export default UserOverview