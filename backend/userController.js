const {MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pblcd.mongodb.net/?retryWrites=true&w=majority`;

const dbName = `${process.env.MONGO_DB}`;
const userCollection = 'users';

exports.dataAccess = {
    getAllUsers: async function(){
        const client = await MongoClient.connect(uri);
        try{
            const db = client.db(dbName);
            const collection = db.collection(userCollection);
            var query = {};
            
            var results = await collection.find(query).toArray();
            console.log("getAllUsers: results!");
            console.log(results);
            return results;
        }catch(e){
            console.log("dataAccess.getAllUsers: Something Went Wrong");
            console.log(e);
        }finally{
            client.close();
        }
    },
    createUser: async function(username, email, password, library){
        console.log('createUser');
        const client = await MongoClient.connect(uri);
        try{
            const db = client.db(dbName);
            const collection = db.collection(userCollection);
            
            var newUser = {
                username: username,
                email: email,
                password: password,
                library: library
            }

            console.log(newUser);

            var results = await collection.insertOne(newUser);
            console.log("createUser: results");
            console.log(results);
        }catch(e){
            console.log("dataAccess.createUser: Something went wrong");
            console.log(e);
        }finally{
            client.close();
        }
    },
    findUser: async function(username, password){
        const client = await MongoClient.connect(uri);
        try{
            //get Database
            const db = await client.db(dbName);
            const collection = await db.collection(userCollection);
            //search throuh collection
            var result = await collection.findOne({"username" : username, "password" : password});
            
            //output results
            console.log("findUser: result!");
            console.log(result)
            return result
        }catch(e){
            console.log('dataAccess.findUser: Something Went Wrong');
            console.log(e)
        }finally{
            client.close();
        }
    },
    findUserById: async function(id){
        const client = await MongoClient.connect(uri);
        try{
            const db = await client.db(dbName);
            const collection = await db.collection(userCollection);
            var results = await collection.findOne({"_id": new ObjectId(id)});
            console.log("findUserById: result!");
            console.log(results)
            return results
        }catch(e){
            console.log("dataAccess.findUserById: Something Went Wront");
            console.log(e);
        }finally{
            client.close();
        }
    },
    findUserbyUsername: async function(username){
        const client = await MongoClient.connect(uri);
        try{
            const db = await client.db(dbName);
            const collection = await db.collection(userCollection);
            var results = await collection.findOne({"username": username});
            console.log(results);
            return results
        }catch(e){
            console.log("dataAccess.findUserbyUsername: Something Went Wrong")
            console.log(e)
        }finally{
            client.close();
        }
    },
    deleteUser: async function(id){
        console.log("deleteUser!");
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(userCollection);
            var query = { _id: new ObjectId(id) }
            var results = await collection.deleteOne(query);

            console.log("deleteUser: results");
            console.log(results);

            return results;
        }catch(e){
            console.log("dataAccess.deleteUser: Something went wrong");
            console.log(e);
        }finally{
            client.close();
        }

    },
    updateUser: async function(id,username, email, password ){
        console.log("updateUser!");

        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(userCollection);

            var query = {_id: new ObjectId(id)}
            var update = {
                $set: {
                    username: username,
                    email: email,
                    password: password
                }
            }

            var results = await collection.updateOne(query, update);
            
            console.log("updateUser: results");
            console.log(results);

            return results;
        }catch(e){
            console.log("dataAccess.updateUser: Something went wrong");
            console.log(e)
        }finally{
            client.close();
        }

    },
    addToLibrary: async function(id, bookId){
        console.log("addToLibrary");
        const client = await MongoClient.connect(uri);
        try{
            const db = client.db(dbName)
            const collection = db.collection(userCollection);

            var query = { _id: new ObjectId(id)};
            var add = {
                $push: {
                    library:
                    {
                        bookId: bookId
                    }
                }
            }

            var results = await collection.updateOne(query, add);
            console.log(results);
            console.log("addToLibrary: results!")
            return results
        }catch(e){
            console.log("dataAccess.addToLibrary: Something Went Wrong");
            console.log(e)
        }finally{
            client.close();
        }
    },
    deleteFromLibrary: async function(id, bookId){
        console.log("deleteFromLibrary");
        const client = await MongoClient.connect(uri);
        try{
            const db = client.dbName(dbName);
            const collection = db.collection(userCollection);
            var query = {_id: new ObjectId(id)}
            var update = {
                $pull: {
                    library: {
                        bookId: bookId
                    }
                }
            }

            var results = await collection.updateOne(query, update);
            console.log(results);
            return results;
        }catch(e){
            console.log('dataAceess.deleteFromLibrary: Something Went Wrong');
            console.log(e)
        }finally{
            client.close();
        }
    }
}
