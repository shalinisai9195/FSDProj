const mongodb = require('mongodb')// like import in react
const dbName = 'leadgen'
const dburl = `mongodb+srv://thenmozhi:union456@cluster0.cxvr1eo.mongodb.net/${dbName}`
//const dburl = `mongodb+srv://thenmozhi:abcd1234@cluster0.cxvr1eo.mongodb.net/${dbName}?retryWrites=true&w=majority`
const MongoClient = mongodb.MongoClient // import MongoClient to connect mongoDb

module.exports={mongodb,dbName,dburl,MongoClient}