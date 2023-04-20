import { useEffect, useState } from 'react';
import { useParams } from 'react-router'; 
import backgroundImage from '../images/backgroundImage.png'
import Popup from '../Popup';

function EditBook(){
    const { id } = useParams();
    const [ book, setBook ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ isPublished, setIsPublished ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);

    let user = window.localStorage.getItem("User");
    let userInfo = JSON.parse(user);

    //book =  book where id == book.id
    async function deleteBook(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/deleteBook', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
        const data = await response.json();
        if(data.status == "ok"){
            window.location.replace(`http://localhost:3000/userProfile`)
        }
        console.log(data);
    }

    async function loadBook() {
        var url = `http://localhost:4000/api/findBook/${id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setBook(data);
            setTitle(data.title);
            setDescription(data.description);
            setGenre(data.genre)
            setIsPublished(data.isPublished);
            setAuthor(data.author);
        }).catch(e => console.log(e));
        
        
    }
    

    useEffect(() => {
        loadBook();
    },[]);
    

    async function updateBook(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/updateBook', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: title,
                author: author,
                description: description,
                genre: genre,
                isPublished: isPublished
            })
        });

        const data = await response.json();
        console.log(data);
        if(data.status == "updated"){
            alert("Book Updated")
            window.location.replace(`http://localhost:3000/editBook/${id}`)
        }else{
            alert(data.errMsg)
        }

    }

    function goBack(){
        window.location.replace(`http://localhost:3000/BookPage/${id}`)
    }

    return(
        <div style={{backgroundImage: `url(${backgroundImage})`, top: "65px", left: "0px",height: "100%", width: "100%", position: "fixed"}}>
            <div style={{position: "absolute", top: "0", left: "0", width: "100%"}}>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h1>Are you sure?</h1>
                <br/>
                <br/>
                <div style={{display: "grid", gridTemplateColumns: "auto auto"}}>
                    <div>
                        <button style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1", color: "white", fontSize: "20px", fontWeight: "bold"}}  onClick={(e) => {deleteBook(e)}}>Yes</button>
                    </div>
                    <div>
                        <button style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1", color: "white", fontSize: "20px", fontWeight: "bold"}}  onClick={(e) => setButtonPopup(false)}>No</button>
                    </div>
                </div>
            </Popup>
            </div>
            <button onClick={() => goBack()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "pink"}}><i className="arrow left"></i></button>
            <form onSubmit={updateBook} style={{margin: "50px 0px 0px 500px",width: "500px",padding: "20px 0px 0px 0px",backgroundColor:"#fff1eb", border: "solid 10px #ec84a1"}}>
            <h1 style={{textAlign: "center", fontSize: "30px", color: "#a50b5e", fontWeight: "bold", fontFamily: "monospace"}}>Edit Book</h1>
            <div style={{margin: "0px 0px 0px 75px"}}>
            <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Title:</label>
                <input className="inputBox" style={{margin: "0px 0px 0px 57px"}} value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder={book.title}/>
                <br/>
                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Description:</label>
                <br/>
                <textarea className="inputBox" style={{margin: "0px 0px 0px 90px", height: "100px" }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                <br/>
                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Genre:</label>
                <select style={{margin: "20px 0px 20px 44px", width: "189px", border: "2px solid #ec84a1", color: "#ec84a1", height: "25px", width: "220px", padding: "0px 0px 0px 3px"}} value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option>Please Select One</option>
                        <option value="NonFiction">Non-Fiction</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Young Adult Fiction">Young Adult Fiction</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Fan Fiction">Fan Fiction</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Drama">Drama</option>
                        <option value="Supernatural">Supernatural</option>
                        <option value="Horror">Horror</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Adventure">Adventure</option>
                </select>
                <br/>
                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Publish: </label>
                    <select style={{margin: "20px 0px 20px 37px", width: "189px", border: "2px solid #ec84a1", color: "#ec84a1", height: "25px", width: "220px", padding: "0px 0px 0px 3px"}} value={isPublished} onChange={(e) => setIsPublished(e.target.value)}>
                        <option value="Drafted">Drafted</option>
                        <option value="Published">Published</option>
                    </select>
                <br/>
                <br/>
                <input style={{margin: "0px 0px 0px 220px", border: "3px solid #650438", backgroundColor: "#a50b5e", color: "white", fontSize: "16px", fontFamily: "monospace", fontWeight: "bold", padding: "2px 7px"}} type='submit' value='Update Book Info'/>
                <br/>
                <br/>
            </div>
                
            </form>

            <br/>
            <button onClick = {(e) => setButtonPopup(true)} style={{color: "white", border: "none", backgroundColor: "#e30b5d", padding: "5px", fontFamily: "'Raleway', sans-serif", margin: "0px 0px 8px 500px", fontWeight: "bold"}}>Delete Book</button>
        </div>
    )
}

export default EditBook