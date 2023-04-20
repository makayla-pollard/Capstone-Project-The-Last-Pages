import bookcover from '../images/bookCover.png'

function Book({book}){
    function bookSelected(id){
        window.location.replace(`http://localhost:3000/Book/${id}`)
    }
    return (
        <div>
            {
                book.map((book) => (
                    <div key={book._id} onClick={() => bookSelected(book._id)}>
                        
                        <div className="bookHover" style={{margin: "30px 5px", padding: "10px", width: "500px",height: "240px", display: "grid", gridTemplateColumns: "auto auto", backgroundColor: "#fff1eb", border: "solid 4px #ec84a1"}}>
                            <div>
                                <img src={bookcover} style={{width: "150px", height: "auto", margin: "7px 0px 0px 5px", boxShadow:"2px 2px 4px #000"}}></img>
                            </div>
                            <div>
                                <div style={{fontFamily: "monospace, sans-serif", fontSize: "30px", width: "250px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", margin: "0px 0px", color: "#800080", fontWeight: "bold", textTransform: "capitalize", }}>{book.title}</div>
                                <div style={{fontFamily: "'Aref Ruqaa', serif", padding: "5px", textAlign: "right", margin: "0px 35px 0px 0px", color: "#ff7f50", fontWeight: "580"}}>by {book.author}</div>
                                <div className="description" style={{fontFamily: "'Raleway', sans-serif", fontSize: "15px", width: "250px", height: "95px", wordWrap: "break-word",fontWeight: "bold", color: "#c2b5a8", backgroundColor: "white", padding: "3px 7px 16px 7px" }}>{book.description}</div>
                                <div style={{textAlign: "center", margin: "15px 35px 0px 0px", fontFamily: "monospace", color: "#a1045a", fontWeight: "600"}}>{book.genre}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Book