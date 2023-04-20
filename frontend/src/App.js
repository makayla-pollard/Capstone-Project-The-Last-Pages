import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import BookForm from './components/Book/BookForm'
import BooksList from './components/Book/BooksList';
import UserList from './components/User/UserList';
import UserProfile from './components/UserProfile';
import AddChapter from './components/AddChapter';
import EditBook from './components/Book/EditBook';
import './App.css';
import Logo from './images/Logo.png';
import UpdateChapter from './components/UpdateChapter';
import EditUser from './components/User/EditUser';
import ChapterPage from './components/ChapterPage';
import BookOverview from './components/Book/BookOverview'
import BooksForOthers from './components/Book/BooksForOthers';
import UserOverview from './components/User/UserOverview';
import backgroundImage from './images/backgroundImage.png'
import BooksListGenre from './components/Book/BooksListGenre'

function App() {
  var logoutText;
  let user = window.localStorage.getItem("User");
  const logout = () => {
    
    window.localStorage.clear();
    window.location.replace("http://localhost:3000/login")
    //<img src={Logo} style = {{width: "40px", height: "auto"}}></img>
  }
  if(user == null){
    logoutText = " "
  }else{
    logoutText = "Logout"
  }
  return ( 
    <div>
      <div >
        <Navbar collapseOnSelect expand='lg' bg="light" variant="light" >
          <Navbar.Brand href="http://localhost:3000/" style={{ color: "#800080",  fontFamily: "'Dancing Script', sans-serif", fontWeight: "bold", fontSize: "24px" }}>
            <img src={Logo} style = {{width: "40px", height: "auto"}}></img> The Last Pages
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="lastPages">
              <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/register">Register</Nav.Link>
              <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
              <Nav.Link href="http://localhost:3000/userProfile">Profile</Nav.Link>
              <Nav.Link href="http://localhost:3000/books">Books</Nav.Link>
              <Nav.Link href="http://localhost:3000/users">Users</Nav.Link>
              <Nav.Link onClick={() => logout()} style={{color: "red", alignContent: "left"}}>{logoutText}</Nav.Link>
            </Nav>
          </Navbar.Collapse>

        </Navbar>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createBook' element={<BookForm/>}/>
          <Route path='/books' element={<BooksList/>}/>
          <Route path='/userProfile' element={<UserProfile/>}/>
          <Route path='/users' element={<UserList/>}/>
          <Route path='/addChapter/:id' element={<AddChapter/>}/>
          <Route path='/editBook/:id' element={<EditBook/>}/>
          <Route path='/editUser/:id' element={<EditUser/>}/>
          <Route path='/updateChapter/:id/:num' element={<UpdateChapter/>}/>
          <Route path="/chapterPage/:id/:num" element={<ChapterPage/>}/>
          <Route path="/BookPage/:id" element={<BookOverview/>}/>
          <Route path="/Book/:id" element = {<BooksForOthers/>}/>
          <Route path="/User/:id/:username" element={<UserOverview/>}/>
          <Route path="/BooksList/:genre" element={<BooksListGenre/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;