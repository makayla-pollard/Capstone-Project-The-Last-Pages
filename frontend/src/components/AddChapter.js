//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import backgroundImage from '../images/backgroundImage.png'
import Popup from '../components/Popup'


function AddChapter(){
    const { id } = useParams();
    const [ text, setText ] = useState('');
    const [ chapterTitle, setChapterTitle ] = useState('');
    const [ book, setBook ] = useState([]);
    const [ editorState, setEditorState] = useState(EditorState.createEmpty());
    const [ chapterNumber, setChapterNumber ] = useState('');
    const [ output, setOutput ] = useState('');
    
    const loadBook = () => {
        var url = `http://localhost:4000/api/findBook/${id}`;
        fetch(url)
        .then(r => r.json(0))
        .then(data => {
            setBook(data);
            
        }).catch(e => console.log(e));
        
        
    }

    useEffect(() => {
        loadBook();
    },[]);

    async function addChapter(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/addChapter', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id: id,
                chapterName: chapterTitle,
                chapterText: text
            })
        });

        const data = await response.json();
        if(data.status == "ok"){
            alert("Chapter Added")
            window.location.replace(`http://localhost:3000/addChapter/${id}`)
        }else{
            alert("Check Input");
        }
        console.log(data);
        setOutput(convertFromHTML(text));
    }

    function goBack(){
        window.location.replace(`http://localhost:3000/BookPage/${id}`)
    }

    return(<div style={{backgroundImage: `url(${backgroundImage})`, top: "65px", left: "0px",height: "100%", width: "100%", backgroundAttachment: "fixed"}}>
        
        <button onClick={() => goBack()} style={{margin: "13px 0px 0px 10px", padding: "3px 12px 6px 12px", border: "none", backgroundColor: "pink"}}><i className="arrow left"></i></button>
        <h1  style={{textAlign: "center", fontSize: "40px", color: "#ec84a1", fontWeight: "bold", fontFamily: "monospace"}}>Add Chapter</h1>
        
        <form onSubmit={addChapter}>
        <br/>
        <div style={{display: "grid", gridTemplateColumns:"900px 210px"}}>
            
            <input className="inputBox" style={{margin: "0px 0px 0px 359px",height: "40px", width: "300px", fontSize: "24px"}} type="text" placeholder='Chapter Title' value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)}/>
            <input  style={{border: "none", backgroundColor: "#a50b5e", color: "white"}} type='submit' value='Add Chapter'/>
        </div>
        
        <br/>
            <div className='editor' style={{backgroundColor:"#fff1eb", width: "749px", margin: "0px 0px 0px 360px", border: "solid 5px #ec84a1", height: "1000px", overflow: "scroll"}}>
                <Editor
                editorState={editorState}
                toolbarClassName="toolbar"
                wrapperClassName="wrapper"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                onChange={(e) => setText(draftToHtml(convertToRaw(editorState.getCurrentContent()))) }
                toolbar={{
                    options: ['inline', 'list', 'textAlign', 'history']
                }}
                />
            </div>
            <br/>
            <br/>
        </form>
        
    </div>)
}

export default AddChapter