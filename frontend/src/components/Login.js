import { useState } from 'react';
import Popup from './Popup';
function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
    var [ popText, setPopText ] = useState('');

    async function loginUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/login',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        
        const data = await response.json();
        if(data.status == "ok"){
            setPopText("Logged In")
            const userObject = {
                id: data.userId,
                username: data.username
            }
            window.localStorage.setItem("User", JSON.stringify(userObject));
            

            // If the user is not logged in, redirect them to the login page


            // console.log(test)
            //window.localStorage.clear();
            relocate()
            
        }else{
            setPopText("Check Information")
            setButtonPopup(true);
        }
        console.log(data);
        
    }
    let user = window.localStorage.getItem("User");
    let userInfo = JSON.parse(user);

    const logout = () => {
        let user = window.localStorage.getItem("User");
        window.localStorage.clear();
        window.location.replace("http://localhost:3000/login")
        console.log(user);
    
    }

    function relocate(){
        window.location.replace("http://localhost:3000/UserProfile")
    }

    function setButton(e){
        loginUser(e)
        e.preventDefault();
    }

    if(user == null){
        return(<div>
            <div style={{position: "absolute", top: "0", left: "0", width: "100%"}}>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                {popText}
                <br/>
                <br/>
            </Popup>
            </div>
            <form onSubmit={(e) => setButton(e)} style={{margin: "50px 400px", backgroundColor:"#fff1eb", padding: "50px",textAlign: "center", border: "solid 10px #ec84a1"  }}>
            <p style={{fontSize: "30px", color: "#a50b5e", fontWeight: "bold", fontFamily: "monospace"}}>Sign In</p>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" style={{margin: "10px", border: "none", padding: "10px", fontSize:"20px"}}/>
            <br/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder="Password" style={{margin: "10px", border: "none", padding: "10px", fontSize:"20px"}}/>
            <br/>
            <br/>
            <input type='submit' value='Login' style={{border: "4px solid #650438", backgroundColor: "#a50b5e", color: "white", fontSize:"20px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 7px"}}/>
            <p style={{color: "#a50b5e", margin: "10px"}}>Not a user? <a href="http://localhost:3000/register">Register Here</a></p>
            </form>
            
        </div>)
    }else{
        return(<div>
            <div style={{margin: "200px 600px", backgroundColor:"#fff1eb", padding: "50px",textAlign: "center", border: "solid 10px #ec84a1"  }}>
                <button onClick={() => logout()}  style={{border: "4px solid #650438", backgroundColor: "#a50b5e", color: "white", fontSize:"20px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 7px", border: "none"}}> Logout</button>
            </div>
        </div>)
    }
    
}

export default Login