import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import backgroundImage from '../images/backgroundImage.png';
import Popup from '../Popup';


function EditUser(){
    const { id } = useParams();
    const [ user, setUser ] = useState([]);
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
    var [ popText, setPopText ] = useState('');


    const loadUser = () => {
        var url = `http://localhost:4000/api/findUser/${id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setUser(data);
            setUsername(data.username);
            setEmail(data.email)
            setPassword(data.password)
        }).catch(e => console.log(e));
    }

    let userStorage = window.localStorage.getItem('User');
    let userInfo = JSON.parse(userStorage);

    async function deleteUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
        //also delete all books accosiated with user
        const data = await response.json();
        console.log(data);
        
    }

    async function deleteBooks(event){
        event.preventDefault();
        const res = await fetch('http://localhost:4000/api/deleteMany', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                author: user.username
            })
        })
        const data = await res.json();
        console.log(data);
        console.log(user.username)
    }

    function logout(){
        window.localStorage.clear();
        window.location.replace("http://localhost:3000/register")
    }
    


    

    useEffect(() => {
        loadUser();
    }, [])
    

    

    async function updateUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log(data);
        if(data.user == true){
            alert("User Updated")
            window.location.replace(`http://localhost:3000/editUser/${id}`)
        }else{
            alert("Make Sure All Input Is Valid")
        }
    }

    function linkBack(){
        window.location.replace(`http://localhost:3000/userProfile`)
    }




    function setButton(e){
        setPopText="delete"
        setButtonPopup(true);
        
        
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
                        <button  style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1", color: "white", fontSize: "20px", fontWeight: "bold"}} onClick={(e) => {deleteUser(e); deleteBooks(e); logout();}}>Yes</button>
                    </div>
                    <div>
                        <button  style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "#ec84a1", color: "white", fontSize: "20px", fontWeight: "bold"}} onClick={(e) => setButtonPopup(false)}>No</button>
                    </div>
                </div>
            </Popup>
            </div>
            
            <button onClick={() => linkBack()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "pink"}}><i className="arrow left"></i></button>
            
            <form onSubmit={updateUser} style={{margin: "50px 400px", backgroundColor:"#fff1eb", border: "solid 10px #ec84a1"}}>
                <h1 style={{textAlign: "center",fontSize: "30px", color: "#a50b5e", fontWeight: "bold", fontFamily: "monospace", margin: "20px 0px 15px 0px"}}>Edit User</h1>
                <div style={{margin: "0px 0px 0px 200px"}}>
                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Username:</label>
                <input className="inputBox" style={{margin: '10px 0px 0px 21px'}}  value={username} onChange = {(e) => setUsername(e.target.value)} type="text" placeholder={user.username}/>
                <br/>
                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Email:</label>
                <input className="inputBox" style={{margin: "10px 0px 0px 54px"}} value={email} onChange = {(e) => setEmail(e.target.value)} type='text' placeholder={user.email}/>
                <br/>
                <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a"}}>Password: </label>
                <input className="inputBox" style={{margin: "10px 0px 0px 26px" }} value={password} onChange = {(e) => setPassword(e.target.value)} type='password' placeholder={user.password}/>
                <br/>
                </div>
                
                <input type="submit" value="Edit User" style={{border: "3px solid #650438", backgroundColor: "#a50b5e", color: "white", fontSize: "16px", fontFamily: "monospace", fontWeight: "bold", padding: "2px 7px", margin: "25px 0px 0px 415px"}}/>
                <br/>
                <br/>
                <br/>

            </form>
            <button onClick = {(e) => setButton(e)} style={{color: "white", border: "none", backgroundColor: "#e30b5d", padding: "5px", fontFamily: "'Raleway', sans-serif", margin: "0px 0px 8px 397px", fontWeight: "bold"}}>Delete Profile</button>


            <br/>
            <br/>
        </div>
    )
}

export default EditUser;