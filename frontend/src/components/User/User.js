import profileImage from '../images/defaultProfileImage.png'

function User({user}){

    function userSelected(id, username){
        window.location.replace(`http://localhost:3000/User/${id}/${username}`)
    }


    return(
        <div>
            {
                user.map((user) => (
                    <div className="userBox" key={user._id} onClick={() => userSelected(user._id, user.username)} style={{margin: "0px 0px 20px 0px",width: "280px",height: "100px", display: "grid", gridTemplateColumns: "auto auto", backgroundColor: "#fff1eb", border: "solid 4px #ec84a1"}}>
                        <div>
                            <img src={profileImage} style={{width: "70px", margin: "10px 0px 0px 10px"}}></img>
                        </div>
                        <div style={{margin: "30px 0px 0px 0px", color: "#800080"}}>

                            <strong >{user.username}</strong>
                            
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default User