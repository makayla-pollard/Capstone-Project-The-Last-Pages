import Logo from "./images/Logo.png";

function Home(){

    function register(){
        window.location.replace("http://localhost:3000/register")
    }
    function login(){
        window.location.replace("http://localhost:3000/login")
    }


    return(
    <div> 
        <br/>
        <br/>
        <div>
            <div style={{display: "grid", gridTemplateColumns: "200px 200px"}}>
                <div style={{margin: "60px 130px", padding: "70px", backgroundColor: "#feeeec", position: "absolute", borderRadius: '50%', height: "400px", width: "400px", textAlign: "center"}}>
                    <h3 style={{margin: "0px 20px", fontFamily: "'Raleway', sans-serif", color: "#800080", fontWeight: "bold"}}>Welcome to</h3>
                    <h1 style={{fontFamily: "'Dancing Script', cursive", fontWeight: 'bold', fontSize: "47px", backgroundImage: "linear-gradient(360deg, #ff4500, #800080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", MozBackgroundClip:"text", MozTextFillColor: "transparent"}}>The Last Pages</h1>
                    <img id="logo" src={Logo} style={{width: "150px", height: "auto", margin: "10px"}}/>
                </div>
                <div>
                <h1 style={{color: "white", margin: " 50px 0px 0px 950px", fontSize: "50px", fontFamily: "'Raleway', sans-serif"}}>Ignite</h1>
                <h1 style={{color: "white", margin: " 10px 1050px", fontSize: "50px", fontFamily: "'Raleway', sans-serif"}}>Your</h1>
                <h1 style={{color: "#FF90A8", margin: " 30px 0px 50px 850px", fontSize: "200px", fontWeight: "bold",fontFamily: "'Dancing Script', cursive"}}>Passion</h1>
                </div>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "100px 100px", margin: " 0px 1030px"}}>
                <div>
                    <button style={{padding: "5px 10px", border: "none", color: "#953553", fontSize: "20px", margin: "0px 0px",  fontFamily: "'Raleway', sans-serif", fontWeight: "bold", backgroundColor: "#feeeec"}} onClick={() => login()}>Login</button>
                </div>
                <div>
                    <button style={{padding: "5px 10px", border: "none", color: "#953553", fontSize: "20px", margin: "0px 20px",  fontFamily: "'Raleway', sans-serif", fontWeight: "bold", backgroundColor: "#feeeec"}} onClick={() => register()}>Register</button>
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default Home