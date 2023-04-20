import { useState } from 'react';
import Popup from './Popup';


function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ pfp, setPFP ] = useState();
    const [buttonPopup, setButtonPopup] = useState(false);
    const [error, setError ] = useState("");
    //const [ selectedImgage, setSelectedImage ] = useState(null);
    async function createUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                library: []
            })
        });

        const data = await response.json();
        if(data.user == true){
            
            
            window.location.replace("http://localhost:3000/login")
        }else{
            setError(data.errorMsg);
            setButtonPopup(true);
        }
        console.log(data);
        
    }

    let user = window.localStorage.getItem("User");
    let userInfo = JSON.parse(user);

    const logout = () => {
        let user = window.localStorage.getItem("User");
        window.localStorage.clear();
        window.location.replace("http://localhost:3000/register")
        console.log(user);
    
    }

    function setButton(e){
        createUser(e);
        e.preventDefault();
    }

    if(user == null){
        return (
            <div>
                <div style={{position: "absolute", top: "0", left: "0", width: "100%"}}>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                {error}
                <br/>
                <br/>
            </Popup>
            </div>
                <div className="register">
                <form onSubmit={(e) => setButton(e)} style={{margin: "50px 400px", backgroundColor:"#fff1eb", padding: "50px",textAlign: "center", border: "solid 10px #ec84a1"  }}>
                    <p style={{fontSize: "30px", color: "#a50b5e", fontWeight: "bold", fontFamily: "monospace"}}>Sign Up</p>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" style={{margin: "10px", border: "none", padding: "10px", fontSize:"20px"}}/>
                    <br/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder="Email" style={{margin: "10px", border: "none", padding: "10px", fontSize:"20px"}}/>
                    <br/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder="Password" style={{margin: "10px", border: "none", padding: "10px", fontSize:"20px"}}/>
                    <br/>
                    <br/>
                    <input type='submit' value='Register' style={{border: "4px solid #650438", backgroundColor: "#a50b5e", color: "white", fontSize:"20px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 7px"}}/>
                    <p style={{color: "#a50b5e", margin: "10px"}}>Already a registered user? <a href="http://localhost:3000/login">Login</a></p>
                    
                </form>
                </div>
                
                
            </div>
        )
    }else{
        return(<div >
            <div style={{margin: "200px 600px", backgroundColor:"#fff1eb", padding: "50px",textAlign: "center", border: "solid 10px #ec84a1"  }}>
                <button onClick={() => logout()}  style={{border: "4px solid #650438", backgroundColor: "#a50b5e", color: "white", fontSize:"20px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 7px"}}> Logout</button>
            </div>
            
        </div>)
    }
    
}

export default Register