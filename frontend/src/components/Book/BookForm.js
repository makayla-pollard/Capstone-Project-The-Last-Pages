import{ useState, useEffect } from 'react';
import Popup from '../Popup';

function BookForm(){
    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
    
    let user = window.localStorage.getItem("User");
    let userInfo = JSON.parse(user);

    const [ accountUser, setAccountUser ] = useState([]);

    const loadUser = () => {
        var url = `http://localhost:4000/api/findUser/${userInfo.id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setAccountUser(data);
            console.log(url);
        }).catch(e => console.log(e));
    }


    useEffect(() => {
        loadUser();
    },[])



    async function createBook(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/createBook', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title,
                author: accountUser.username,
                description: description,
                genre: genre,
                chapters: []

            })
        });

        const data = await response.json();
        if(data.book == true){
            setButtonPopup(false)
            window.location.replace(`http://localhost:3000/createBook`)
        }else{
            alert(data.errorMsg);
        }
        console.log(data);
    }

    function backButton(){
        window.location.replace(`http://localhost:3000/userProfile`)
    }

    function setButton(e){
        setButtonPopup(true);
        e.preventDefault();
        
    }
    if(user == null){
        return(window.location.replace(`http://localhost:3000/login`))
    }else{
        return(
            <div>
                <div style={{position: "absolute", top: "0", left: "0", width: "100%"}}>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <div>
                        Create Book?
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "auto auto"}}>
                    <button style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1", color: "white", fontSize: "20px", fontWeight: "bold"}}  onClick={(e) => createBook(e)}>Yes</button>
                    <button style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1", color: "white", fontSize: "20px", fontWeight: "bold"}}  onClick={(e) => setButtonPopup(false)}>No</button>
                    </div>
                    
                </Popup>
            </div>
            <button onClick={() => backButton()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1"}}><i className="arrow left"></i></button>  
                <form onSubmit={(e) => setButton(e)}  style={{margin: "80px 0px 0px 500px",width: "500px",height: "300px",padding: "20px 0px 0px 0px",backgroundColor:"#fff1eb", border: "solid 10px #ec84a1"}}>
                    <h1 style={{textAlign: "center", fontSize: "30px", color: "#a50b5e", fontWeight: "bold", fontFamily: "monospace"}}>Create Book</h1>
                    <div style={{margin: "0px 0px 0px 75px"}}>
                        <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Title:</label>
                    <input className="inputBox" style={{margin: "0px 0px 0px 57px"}} value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title"/>
                    <br/>
                    <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Description:</label>
                    <br/>
                    <textarea className="inputBox" style={{margin: "0px 0px 0px 90px", height: "100px" }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                    <br/>
                    {/* <input value={genre} onChange={(e) => setGenre(e.target.value)} type='text' placeholder='Genre'/> */}
                    <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Genre:</label>
                    <select style={{margin: "20px 0px 20px 44px", width: "189px", border: "2px solid #ec84a1", color: "#ec84a1", height: "25px", width: "220px", padding: "0px 0px 0px 3px"}} value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option style={{color: "#ec84a1"}}>Please Select One</option>
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
                    <input style={{margin: "20px 0px 0px 255px", border: "3px solid #650438", backgroundColor: "#a50b5e", color: "white", fontSize: "16px", fontFamily: "monospace", fontWeight: "bold", padding: "2px 7px"}} type='submit' value='Create Book'/>
                    </div>
                    
                </form>
            </div>
        )
    }
    
}

export default BookForm
