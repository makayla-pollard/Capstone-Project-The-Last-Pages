
import PublishedBookList from './PublishedBookList';
import { useState, useEffect } from 'react';
import DraftedBookList from './DraftedBookList';
import ProfilePhoto from './images/defaultProfileImage.png'


function UserProfile(){
    let user = window.localStorage.getItem("User");
    let userInfo = JSON.parse(user);
    const [ username, setUsername ] = useState('')

    const loadUser = () => {
        var url = `http://localhost:4000/api/findUser/${userInfo.id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setUsername(data.username);
        }).catch(e => console.log(e));
    }

    console.log(username)


    useEffect(() => {
        loadUser();
    },[])

    const editUser = (id) => {
        window.location.replace(`http://localhost:3000/editUser/${id}`)
    }

    const createBook = () => {
        window.location.replace(`http://localhost:3000/createBook`)
    }

    if(user == null){
        return(window.location.replace(`http://localhost:3000/login`))
    }else{

        

        return(
            <div>
                <h1 style={{margin: "15px 65px", color: "#FF90A8", fontFamily: "monospace", fontSize: "40px"}}>User Profile</h1>

                <div style={{display: "grid", gridTemplateColumns: "500px auto", margin: "0px 50px 0px 50px", backgroundColor:"#fff1eb", border: "5px solid #ec84a1", padding: "0px 50px"}}>

                <div style={{padding: "50px"}}>
                <img src={ProfilePhoto} style={{width: "250px", height: "auto", border: "8px solid #ec84a1", margin: "0px 0px 8px 0px"}}></img>
                <br/>
                <strong style={{fontSize: "25px", fontFamily: "'Raleway', sans-serif", textTransform: "uppercase", margin: "0px 0px 0px 50px", color: "#b30e67"}}>{username}</strong>
                <br/>
                <br/>
                <br/>
                <br/>
                <button style={{border: "none",backgroundColor: "#a50b5e", color: "white", fontSize:"20px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 7px", margin: "0px 0px 0px 60px"}} onClick={() => editUser(userInfo.id)}>Edit User</button>
                </div>
                
                <div style={{padding: "50px"}}>
                    <p style={{fontFamily: "'Aref Ruqaa', serif", fontSize: "23px", color: "#b30e67", fontWeight: "bold"}}>Published Works:</p>
                        <div className='Box' style={{backgroundColor: "white", padding: "20px", border: "solid 4px #ec84a1", overflowX: "scroll", width: "700px", height: "230px", overflowY: "hidden"}}>
                            <PublishedBookList author={userInfo.username}/>
                        </div>
                    <br/>
                    <br/>
                    <p style={{fontFamily: "'Aref Ruqaa', serif", fontSize: "23px", color: "#b30e67", fontWeight: "bold", display: "flex", flexDirection: "row"}}>Drafted Works:</p>
                        <div className="Box" style={{backgroundColor: "white", padding: "20px", border: "solid 4px #ec84a1",overflowX: "scroll", width: "700px", height: "230px", overflowY:"hidden"}}>
                            <DraftedBookList author={userInfo.username}/>
                        </div>
                    <br/>
                    <br/>
                    <div>
                    <button style={{border: "none",backgroundColor: "#a50b5e", color: "white", fontSize:"20px", fontFamily: "monospace", fontWeight: "bold", padding: "3px 7px", margin: "0px 0px 0px 300px"}} onClick={() => createBook()}>Create Book</button>

                    </div>
                </div>
                </div>
                
                
                <br/>
                <br/>
                
            </div>
        )
    }
    
}


export default UserProfile