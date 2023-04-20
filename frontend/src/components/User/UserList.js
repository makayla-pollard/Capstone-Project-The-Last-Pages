import { useEffect, useState } from 'react';
import User from './User';


function UserList(){
    const [ data, setData ] = useState([]);
    const [ filteredUsers, setFilteredUsers ] = useState([]);
    const [ usernameFilter, setUsernameFilter ] = useState('');


    useEffect(() => {
        var tempUsers = data.filter((users) => {
            return users.username.toLowerCase().includes(usernameFilter)
        });

        setFilteredUsers(tempUsers);
    }, [usernameFilter])

    

    const getData = () => {
        var url = 'http://localhost:4000/api/users';
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setData(data.results);
            setFilteredUsers(data.results);
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getData();
    },[]);

    return(
        <div style={{backgroundColor: "#ffd1c1", width:"630px", margin: "20px 0px 30px 450px", padding:"30px 0px 30px 0px", border: "4px solid #ec84a1"}}>
            <h1 style={{fontSize: "50px", fontFamily: "'Kurale', monospace, sans-serif", color: "#800080", fontWeight: "bold", margin: "0px 0px 0px 40px", textAlign:"center"}}>Users</h1>
            <div>
                <form>
                    <div>
                        <p style={{ textAlign: "center",margin: "0px 0px 10px 40px",fontFamily: "'Raleway', sans-serif", fontWeight: "500", fontSize: "20px", color: "#a1045a"}}>Search</p>
                        <label style={{fontFamily: "sans-serif", fontSize: "15px", color: "#a1045a", margin: "0px 0px 0px 180px"}}>Username:</label>
                        <input type='text' placeholder="Username" value={usernameFilter} onChange={(e) => setUsernameFilter(e.target.value)} style={{margin: "0px 0px 10px 20px", border: "2px solid #ec84a1", width: "200px", height: "25px"}}/>
                    </div>
                </form>
            </div>
            <div style={{margin: "5px 0px 0px 190px"}}>
                
                    <User user={filteredUsers}/>
                
            </div>
        </div>
    )
}

export default UserList;