const dotenv = require("dotenv");
dotenv.config({path: './config.env'});

/*
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
 
const connectDb = async () => {
    console.log("hello database");
    try {
        console.log("hello database");
        const pool = new Pool({
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "password",
            port: 4321
        });
 
        await pool.connect()
        const res = await pool.query('SELECT * FROM electrical.accounts')
        console.log('The result is'+res);
        await pool.end()
    } catch (error) {
        console.log(error)
    }
}
 
exports.connectDb

//**This connection port 4321 is used docker */

const { Client } = require("pg");
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

client.connect();

const getUsers = (req,res) =>{
    client.query('SELECT * FROM electrical.accounts',(err,results) =>{
        if(!err){
            console.log(results.rows);
            res.status(200).json(results.rows);
        }else{
            console.log('Error' +process.env.DB_PORT)
        }
    })
}

const getUserByID = (req,res) =>{
    const id = parseInt(req.params.id)
    client.query('SELECT * FROM electrical.accounts WHERE user_id = $1',[id],(err,results) =>{
        if(!err){
            console.log(results.rows);
            res.status(200).json(results.rows);
        }else{
            console.log('Error' +process.env.DB_PORT)
        }
    })
}

const insertUser = (req,res) =>{
    const {username,password,email,created_on} = req.body
    client.query('INSERT INTO electrical.accounts(username,password,email,created_on) VALUES($1,$2,$3,$4)',[username,password,email,created_on],(err,results) =>{
        if(!err){
            res.status(201).send('User added')
        }else{
            console.log('Error' +process.env.DB_PORT)
        }
    })
}


/*
client.query('SELECT * FROM electrical.accounts',(err,res) =>{
    if(!err){
        console.log(res.rows)
    }else{
        console.log('Error' +process.env.DB_PORT)
    }
})
*/

module.exports = {
    getUsers,
    getUserByID,
    insertUser
}
