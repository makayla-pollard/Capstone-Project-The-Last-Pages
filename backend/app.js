const express = require('express');

const app = express();
const PORT = 4000;
const cors = require('cors');
const userController = require('./userController');
const bookController = require('./bookController');

app.use(cors());
app.use(express.json());

app.get("/", function(req,res){
    
    res.send('Capstone')
});

// async function checkEmail(email){
//     const user = await userController.dataAccess.findUserByEmail(email);
//     if(user != null){
//         return true;
//     }else{
//         return false;
//     }
// }



app.post('/api/register', async (req, res) => {
    console.log(req.body);
    var errMsg = "Invalid information. Check Fields";
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false){
        errMsg = "Email Invalid. Check Input";
    }
    if(req.body.username == null || 
        req.body.username == "" || 
        req.body.email == null || 
        req.body.email == "" || 
        req.body.password == null || 
        req.body.password == "" || 
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false){

        res.json({status: "error", user: false , errorMsg: errMsg});
    }else{
        
        await userController.dataAccess.createUser(req.body.username, req.body.email, req.body.password, req.body.library);
        res.json({status: 'ok', user: true});
    }
    
    
});

app.post('/api/addToLibrary', async (req, res) => {
    await userController.dataAccess.addToLibrary(req.body.id, req.body.bookId);
    res.json({status: "ok"});
})

app.post('/api/deleteFromLibrary', async (req, res) => {
    await userController.dataAccess.deleteFromLibrary(req.body.id, req.body.bookId);
    res.json({status: "ok"})
})

async function findUser(username, password){
    const user = await userController.dataAccess.findUser(username, password)
    console.log(user)
    return user
};


app.post('/api/login', async (req, res) => {
    const user = await findUser(req.body.username, req.body.password);
    
    if(user){
        return res.json({status: 'ok', user: true, username: user.username, userId: user._id})
    }else{
        return res.json({status: 'error', user: false})
    }
});

app.post('/api/createBook', async (req, res) => {
    //title author description genre
    var errMsg = "Check Input and try again";
    if(req.body.title == null || req.body.title == "" ||
    req.body.genre == null || req.body.genre == ""){
        res.json({status:"error", book: false, errorMsg: errMsg})
    }else{
        await bookController.dataAccess.createBook(req.body.title, req.body.author, req.body.description, req.body.genre, req.body.chapters, "Drafted");
        res.json({status: 'ok', book: true});
    }
    
    
});

app.post('/api/updateBook', async (req, res) => {
    console.log(req.body);
    if(req.body.title==null || req.body.title == "" ||
    req.body.genre == null || req.body.genre == ''){
        res.json({status: "error", errMsg: "Please Check Input and Try Again"})
    }else{
        await bookController.dataAccess.updateBook(req.body.id, req.body.title, req.body.author, req.body.description, req.body.genre, req.body.isPublished);
        res.json({status: "updated"});
    }
    
});

app.post('/api/deleteMany', async (req, res) => {
    await bookController.dataAccess.deleteBooks(req.body.author);
    res.json({status: "Books Deleted"});
})

app.post('/api/updateUser', async (req, res) => {
    if(req.body.username == null || req.body.username == "" || req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == ""|| /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false){
        res.json({status: "error", updated: false})
    }else{
        await userController.dataAccess.updateUser(req.body.id, req.body.username, req.body.email, req.body.password);
        res.json({status: "updated", user: true})
    }
})

app.post('/api/deleteBook', async (req, res) => {
    await bookController.dataAccess.deleteBook(req.body.id);
    res.json({status:"ok"})
});

app.post('/api/deleteUser', async (req, res) => {
    await userController.dataAccess.deleteUser(req.body.id);
    res.json({status: "User Deleted"});
})

app.post('/api/addChapter', async (req, res) => {
    console.log(req.body);
    if(req.body.chapterName == null || req.body.chapterName == ""){
        res.json({status: "error"})
    }else{
        const book = await findBook(req.body.id);
        await bookController.dataAccess.addBookChapters(req.body.id, book.chapters.length + 1, req.body.chapterName, req.body.chapterText)
        res.json({status: "ok"})
    }
    
})

app.post('/api/updateChapter', async (req, res) => {
    console.log(req.body);
    const book = await findBook(req.body.id);
    await bookController.dataAccess.updateBookChapters(req.body.id, req.body.chapterNumber, req.body.chapterName, req.body.chapterText);
    //console.log(book.chapters)
    res.json({status: "chapter updated", chaperNumber: req.body.chapterNumber});
})

app.post('/api/deleteChapter', async (req, res) => {
    await bookController.dataAccess.deleteBookChapters(req.body.id, req.body.chapterNumber)
    res.json({status: "ok"})
})

async function findBook(id){
    const book = await bookController.dataAccess.findBookById(id);
    console.log(book);
    return book
}



app.get('/api/findBook/:id', async (req, res) => {
    var id = req.params.id;
    const book = await findBook(id);
    console.log(id);
    console.log(book);
    res.json(book);
});

app.get('/api/findUser/:id', async (req, res) => {
    var id = req.params.id;
    const user = await userController.dataAccess.findUserById(id);
    console.log(user);
    res.json(user);
})

app.get('/api/findUserbyUsername/:username', async (req, res) => {
    var username = req.params.username;
    const user = await userController.dataAccess.findUserbyUsername(username);
    console.log(user);
    res.json(user);
})

app.get('/api/findBooks/:author', async (req, res) => {
    var author = req.params.author;
    console.log(author)
    const books = await bookController.dataAccess.findBooksByAuthor(author);
    var results = getResults(books)
    console.log(author);
    console.log(books);
    res.json(results);
})

app.get('/api/findBooksbyGenre/:genre', async (req, res) => {
    var genre = req.params.genre;
    const books = await bookController.dataAccess.findBooksByGenre(genre, "Published");
    var results = getResults(books);
    res.json(results);
    console.log(books)
})

app.get('/api/findBooksPublished/:published', async (req, res) => {
    var published = req.params.published;
    const books = await bookController.dataAccess.findBooksByPublished(published);
    var results = getResults(books)
    res.json(results);
})

app.get('/api/findBooksDrafted/:published/:author', async (req, res) => {
    var published = req.params.published;
    var author = req.params.author;
    const books = await bookController.dataAccess.findBooksByPublishedAuthor(published, author);
    var results = getResults(books);
    res.json(results);
})

app.get('/api/Books', async (req, res) => {
    var books = await bookController.dataAccess.getAllBooks();
    var results = getResults(books);
    res.json(results);
});

app.get('/api/Users', async (req, res) => {
    var users = await userController.dataAccess.getAllUsers();
    var results = getResults(users);
    res.json(results);
})



function getResults(items){
    if(items && items.length > 0){
        return{
            results: items
        };
    }else{
        return{
            results: [],
            error: "Something went wrong"
        }
    }
}

app.listen(PORT, () => console.log(`Express listening on port: ${PORT}`));