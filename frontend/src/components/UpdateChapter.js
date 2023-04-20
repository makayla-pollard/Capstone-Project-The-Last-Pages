import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import backgroundImage from '../images/backgroundImage.png'
import Popup from '../components/Popup'

function UpdateChapter(){
    const { id } = useParams();
    const { num } = useParams();
    const [ chapterName, setChapterName ] = useState('');
    const [ chapterText, setChapterText ] = useState('');
    const [ chapterNumber, setChapterNumber ] = useState('');
    const [ editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [ book, setBook ] = useState([]);
    
    async function loadBook() {
        var url = `http://localhost:4000/api/findBook/${id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setBook(data);
            setChapterName(data.chapters[num - 1].chapterName)
            setChapterText(data.chapters[num - 1].chapterText)
            setChapterNumber(data.chapters[num - 1].chapterNumber)
            //document.getElementById('editor').innerHTML = data.chapters[num - 1].chapterText;
            setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data.chapters[num - 1].chapterText))));
        }).catch(e => console.log(e));
        
        
    }
    

    useEffect(() => {
        loadBook();
    },[]);
    
    
    
    
    async function updateChapter(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/updateChapter', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id: id,
                chapterNumber: num,
                chapterName: chapterName,
                chapterText: chapterText
            })

            
        })
        
        const data = await response.json();

        if(data.status == "chapter updated"){
            window.location.replace(`http://localhost:3000/updateChapter/${id}/${num}`)
        }
    }

    async function deleteChapter(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/deleteChapter', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id: id,
                chapterNumber: chapterNumber
            })
        })

        const data  = await response.json();
        console.log(data);
        if(data.status == "ok"){
            alert("Chapter Deleted!")
            window.location.replace(`http://localhost:3000/BookPage/${id}`)
        }
    }


    function goBack(){
        window.location.replace(`http://localhost:3000/BookPage/${id}`)
    }

    return(
        <div style={{backgroundImage: `url(${backgroundImage})`, top: "65px", left: "0px",height: "100%", width: "100%", backgroundAttachment: "fixed"}}>
            <button onClick={() => goBack()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "pink"}}><i className="arrow left"></i></button>
            <h1 style={{textAlign: "center", fontSize: "40px", color: "#ec84a1", fontWeight: "bold", fontFamily: "monospace"}}>Chapter {num}</h1>


            <form onSubmit={updateChapter}>
                <br/>
                <div  style={{display: "grid", gridTemplateColumns:"900px 210px"}}>
                    <input className="inputBox" style={{margin: "0px 0px 0px 359px",height: "40px", width: "300px", fontSize: "24px"}} value={chapterName} onChange={(e) => setChapterName(e.target.value)} type='text' />
                    <input style={{border: "none", backgroundColor: "#a50b5e", color: "white"}} type='submit' value="Update Chapter"/>
                </div>
                
                <br/>
                <div className='editor' style={{backgroundColor:"#fff1eb", width: "749px", margin: "0px 0px 0px 360px", border: "solid 5px #ec84a1", height: "1000px", overflow: "scroll"}}>
                    <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={setEditorState}
                    onChange={(e) => setChapterText(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                    toolbar={{
                        options: ['inline', 'list', 'textAlign', 'history']
                    }}
                    />
                </div>
            </form>
            
        
            <button style={{color: "white", border: "none", backgroundColor: "#e30b5d", padding: "5px", fontFamily: "'Raleway', sans-serif", margin: "20px 0px 8px 350px", fontWeight: "bold", fontSize: "24px", }} onClick={(e) => deleteChapter(e)}>Delete</button>
        <br/>
        <br/>
        
        </div>
    )
}

export default UpdateChapter;