const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const {getDocs, doc, db, setDoc, user, updateDoc, deleteDoc} = require('./config');


app.use(express.json());
app.use(cors())
// Get the list of members
app.get('/', async(req, res) => {
    try{
        const snapshot = await getDocs(user);
        const list = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        console.log(list)
        res.send({data: list,status: true, msg: "Got data"});
    }catch(error){
        console.log("Error occured!!")
        res.send({
            "msg": error.message,
            status: false
        })
    }
})

app.post('/delete', async(req, res) => {
    try{
        if(req.query.hasOwnProperty("clubid")){
            const userRef = doc(db, "users", req.query.clubid);
            await deleteDoc(userRef).then(() => {
                res.send({
                    msg: "User deleted successfully",
                    status: true
                })
            })
        }else{
            res.send({
                msg: "Club id not provided!!",
                status: false
            })
        }
        
    }catch(error){
        console.log("Error occured!!")
        res.send({
            "msg": error.message,
            status: false
        })
    }
})

// Update data in the list
app.post('/update', async(req, res) => {
    try{
        if(req.query.hasOwnProperty("club id")){
            const userRef = doc(db, "users", req.query.clubid);
            console.log(req.query);
            delete req.query.clubid;
            await updateDoc(userRef, req.query).then(() => {
                res.send({
                    msg: "User updated successfully!!",
                    status: true
                })
            })
        }else{
            res.send({
                msg: "Club id required to update data!!",
                status: false
            })
        }        
    }catch{
        console.log("Error occured!!")
        res.send({
            "msg": error.message,
            status: false
        })
    }
});

// Add a user to the list
app.post('/add', async(req, res) => {
    console.log(Object.keys(req.query).length);
    try{
        if(Object.keys(req.query).length === 0){
            console.log("No data found!!");
            res.send({msg: "No data found!!", "status": false})

        }else{
            console.log("Got data successfully!!")
            console.log(req.query);
            const ref = await setDoc(doc(db, "users", req.query.clubid), req.query);
            res.send({msg: "Data added successfully!!", status: true});
        }
        
    } catch(err){
        res.send({msg: "Error occured while adding data", "status": false});
        console.error("Error while adding document: " + err);
    }

})

// Starting server at port 4000
app.listen(4000, () => {
    console.log("Server started at port : 4000");
})