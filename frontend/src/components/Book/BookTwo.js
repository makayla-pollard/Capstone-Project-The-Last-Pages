import BookCover from "../images/bookCover.png"

function BookTwo({book}){
    //need help with edit book and add chapter
    
    let user = window.localStorage.getItem("User");
    //let userInfo = JSON.parse(user);
    function bookSelected(id){
        window.location.replace(`http://localhost:3000/Book/${id}`)
    }

    return(
        <div  style={{display: "flex", flexDirection: "row"}} className="bookBox">
            {
                book.map((book) => (
                    <div  key={book._id} onClick={() => bookSelected(book._id)} style={{padding: "15px"}} >
                        
                        <div  style={{margin: "0px 10px" }}>
                            <img src={BookCover} style={{width: "100px"}}></img>
                            <div style={{fontFamily: "'Raleway', sans-serif", fontSize: "15px", textOverflow: "ellipsis", width: "90px", whiteSpace: "nowrap", overflow: "hidden", fontWeight: "bold", color: "#800080" }}> {book.title}</div>
                        </div>
                    </div>
                ))
            }
        </div>)

    
}

export default BookTwo;