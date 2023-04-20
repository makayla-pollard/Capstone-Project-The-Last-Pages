const {MongoClient, ObjectId} = require('mongodb');
const { dataAccess } = require('./userController');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pblcd.mongodb.net/?retryWrites=true&w=majority`;

const dbName = `${process.env.MONGO_DB}`;
const bookCollection = 'books';

exports.dataAccess = {
    createBook: async function(title, author, description, genre, chapters, isPublished){
        //possible cover, tags and chapters
        //author needs to be automatic with logged in user
        console.log('CreateBook!');

        const client = await MongoClient.connect(uri);
        try{
            const db = client.db(dbName);
            const collection = db.collection(bookCollection);

            var newBook = {
                title: title,
                author: author,
                description: description,
                genre: genre,
                chapters: chapters,
                isPublished: isPublished,
                
            }

            var results = await collection.insertOne(newBook);
            console.log('createBook: results!');
            console.log(results);
        }catch(e){
            console.log('dataAccess.createBook: Somethings wrong');
        }finally{
            client.close();
        }
    },
    getAllBooks: async function(){
        const client = await MongoClient.connect(uri);
        try{
            const db = client.db(dbName);
            const collection = db.collection(bookCollection);
            var query = {};

            var results = await collection.find(query).toArray();
            console.log("getAllBooks: results!");
            console.log(results);
            return results
        }catch(e){
            console.log('dataAccess.getAllBooks: Something went wrong');
            console.log(e);
        }finally{
            client.close();
        }
    },
    updateBook: async function(id, title, author, description, genre, isPublished){
        console.log("updateBook!");

        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(bookCollection);

            var query = { _id: new ObjectId(id)}
            var update = {
                $set: {
                    title: title,
                    author: author,
                    description: description,
                    genre: genre,
                    isPublished: isPublished
                }
            }

            var results = await collection.updateOne(query, update);
            console.log("updateBook: results!");
            console.log(results);

            return results;
        }catch(e){
            console.log("dataAccess.updateBook: Something went wrong");
            console.log(e);
        }finally{
            client.close();
        }
    },
    addBookChapters: async function(id, chapterNumber, chapterName, chapterText){
        console.log("addBookChapters!");

        const client = await MongoClient.connect(uri);
        try{
            const db = client.db(dbName);
            const collection = db.collection(bookCollection);

            var query = { _id: new ObjectId(id)};
            var add = {
                $push: {
                    chapters : 
                        {
                        chapterNumber: chapterNumber,
                        chapterName: chapterName,
                        chapterText: chapterText
                        }
                
                }
            }

            var results = await collection.updateOne(query, add);
            console.log(results);
            console.log("addBookChapter: results!")
            return results
        }catch(e){
            console.log("dataAccess.addBookChapters: Something Went Wrong")
            console.log(e);
        }finally{
            client.close();
        }
    },
    updateBookChapters: async function(id, chapterNumber, chapterName, chapterText){
        console.log("updateBookChapters!");
        const client = await MongoClient.connect(uri);
        try{
            const db = client.db(dbName);
            const collection = db.collection(bookCollection);
            var query = {_id: new ObjectId(id), "chapters.chapterNumber": parseInt(chapterNumber)}
            var update = {
                $set: {
                    "chapters.$.chapterName": chapterName,
                    "chapters.$.chapterText": chapterText
                }
                
            }

            var results = await collection.updateOne(query, update);
            console.log("updateBookChapters: results!")
            console.log(results);

            return results
            
        }catch(e){
            console.log('dataAccess.updateBookChapters: Something Went Wrong')
            console.log(e)
        }finally{
            client.close()
        }
    },
    deleteBookChapters: async function(id, chapterNumber){
        console.log("deleteChapter!");
        const client = await MongoClient.connect(uri);
        try{
            const db = client.db(dbName);
            const collection = db.collection(bookCollection);
            var query = {_id: new ObjectId(id)}
            var update = {
                $pull: {
                    chapters: {
                        chapterNumber: parseInt(chapterNumber)
                        //chapterNumber: chapterNumber
                    }
                }
            }

            var results = await collection.updateOne(query, update);
            console.log(results);
            return results;
        }catch(e){
            console.log('dataAccess.deleteBookChapters: Something Went Wrong');
            console.log(e)
        }finally{
            client.close()
        }
    },
    deleteBook: async function(id){
        console.log("deleteBook!");

        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(bookCollection);

            var query = { _id: new ObjectId(id) }

            var results = await collection.deleteOne(query);

            console.log("deleteBook: results!");
            console.log(results);

            return results;
        }catch(e){
            console.log("dataAccess.deleteBook: Something went wrong");
            console.log(e);
        }finally{
            client.close();
        }
    },
    deleteBooks: async function(author){
        console.log("deleteBooks!");
        const client = await MongoClient.connect(uri);
        
        try{
            const db = client.db(dbName);
            const collection = db.collection(bookCollection);
            var results = await collection.deleteMany({"author": author});
            return results
        } catch(e){
            console.log(e)
        }finally{
            client.close();
        }
    },
    findBookById: async function(id){
        const client = await MongoClient.connect(uri);
        try{
            const db = await client.db(dbName);
            const collection = await db.collection(bookCollection);
            var results = await collection.findOne({"_id" : new ObjectId(id)});
            console.log("findBookById: results!");
            console.log(results);
            return results
        }catch(e){
            console.log("dataAccess.findBookbyId: Something went wrong");
            console.log(e);
        }finally{
            client.close();
        }
    },
    findBooksByAuthor: async function(author){
        const client = await MongoClient.connect(uri);
        try{
            const db = await client.db(dbName);
            const collection = await db.collection(bookCollection);
            var results = await collection.find({"author" : author}).toArray();
            console.log("findBookByAuthor: results!");
            console.log(results)
            return results
        }catch(e){
            console.log("dataAccess.findBooksByAuthor: Somethine went Wrong")
            console.log(e)
        }finally{
            client.close();
        }
    },
    findBooksByPublished: async function(isPublished){
        const client = await MongoClient.connect(uri);
        try{
            const db = await client.db(dbName);
            const collection = await db.collection(bookCollection);
            var results = await collection.find({"isPublished": isPublished}).toArray();
            return results;
        }catch(e){
            console.log(e)
        }finally{
            client.close()
        }
    },
    findBooksByPublishedAuthor: async function(isPublished, author){
        const client = await MongoClient.connect(uri);
        try{
            const db = await client.db(dbName);
            const collection = await db.collection(bookCollection);
            var results = await collection.find({"author": author, "isPublished": isPublished}).toArray();
            return  results;
        }catch(e){
            console.log(e)
        }finally{
            client.close();
        }
    },
    findBooksByGenre: async function(genre, isPublished){
        const client = await MongoClient.connect(uri);
        try{
            const db = await client.db(dbName);
            const collection = await db.collection(bookCollection);
            var results = await collection.find({"genre": genre, "isPublished": isPublished}).toArray();
            console.log(genre);
            console.log(results)
            return results;
        }catch(e){
            console.log(e)
        }finally{
            client.close();
        }
    }

}