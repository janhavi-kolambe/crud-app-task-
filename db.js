const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
//database name
const dbname = "crud_mongodb";
// location of  mongoDB database
const url = "mongodb://localhost:27017";
//  mongoDB Options
const mongoOptions = {useNewUrlParser : true};

const state = {
    db : null
};

const connect = (cb) =>{
    
    // state is not NULL provided we have a connection already
    if(state.db)
        cb();
    else{
        // attempt to get database connection
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            // unable to get database connection pass error to CB
            if(err)
                cb(err);
                else{
                    state.db = client.db(dbname);
                    cb();
                }
            });
        }
    }
    // Successfully got our database connection
    // Set database connection and call CB
    
    // returns OBJECTID
    const getPrimaryKey = (_id)=>{
        return ObjectID(_id);
    }
    
// returns database connection 
const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect,getPrimaryKey};