/*
const { MongoClient, ObjectId } = require("mongodb"); // Connect to MongoDB
const express = require('express') // Import express
//const cors = require('cors') // Import cors
const app = express() // Create express app
const port = 3000 // Define port
const uri = "mongodb://127.0.0.1:27017/";

//app.use(cors()) // Use cors
app.use(express.json()); // Use json

// app.get('/', (req, res) =>  {
//     res.send('Hello World! Let\'s get started with Node.js')}) // Define route / ถ้าไม่มีอะไรมากกว่า 3000 จะไป print ที่ route นี้

app.get('/', async(req, res) =>  { // => คือ function ที่จะส่งอะไรกลับไป ต้องเป็น async
    const client = new MongoClient(uri)
    await client.connect(); // await คือ รอให้เสร็จก่อน ถ้าไม่ใส่ await จะทำงานแบบ non-blocking
    const obj = await client.db("mydb").collection('s_collection').find({}).project({_id:0, Savings:0, GPA:0, Salary:0}).toArray(); // project คือ ให้แสดงเฉพาะอะไร
    await client.close(); // ปิดการเชื่อมต่อ db เพื่อไม่ใหเ api hack เข้าไปใน http นั้น
    res.status(200).send(obj); // ส่งค่า obj กลับไป
})

app.get('/slist', async(req, res) =>  { // => คือ function ที่จะส่งอะไรกลับไป ต้องเป็น async / req, res คือ request และ response ที่ส่งมา
    const client = new MongoClient(uri)
    await client.connect(); // await คือ รอให้เสร็จก่อน ถ้าไม่ใส่ await จะทำงานแบบ non-blocking
    const obj = await client.db("mydb").collection('s_collection').find({}).toArray(); // สร้างตัวแปร obj แล้วเอาค่าจาก db มาใส่; await คือ รอให้เสร็จก่อน ถ้าไม่ใส่ await จะทำงานแบบ non-blocking
    await client.close(); // ปิดการเชื่อมต่อ db เพื่อไม่ใหเ api hack เข้าไปใน http นั้น
    res.status(200).send(obj); // ส่งค่า obj กลับไป
})

app.post('/slist/create', async(req, res) => { // => return ค่าอะไรกลับไป
    const Object = req.body; // รับค่าจาก body มาใส่ในตัวแปร obj
    const client = new MongoClient(uri)
    await client.connect(); // await คือ รอให้เสร็จก่อน ถ้าไม่ใส่ await จะทำงานแบบ non-blocking
    await client.db('mydb').collection('s_collection').insertOne({
        "StudentID": Object['StudentID'],
        "Title": Object['Title'],
        "Name": Object['Name'],
        "Surname": Object['Surname'],
        "Field": Object['Field'],
        "Project": Object['Project'],
        "Savings": Object['Savings'],
        "GPA":Object['GPA'],
        "Salary": Object['Salary']
    }); // สร้าง collection ใน db ชื่อ mydb และ collection ชื่อ s_collection
    await client.close(); // ปิดการเชื่อมต่อ db เพื่อไม่ใหเ api hack เข้าไปใน http นั้น
    res.status(200).send({
        "status": "success",
        "message": "object is created.",
        "StudentID": Object['StudentID']
    })
})

app.put('/slist/update', async(req, res) => { // => return ค่าอะไรกลับไป
    const Object = req.body; // รับค่าจาก body มาใส่ในตัวแปร obj
    const id = Object._id; // รับค่า id มาจาก obj
    const client = new MongoClient(uri)
    await client.db('mydb').collection('s_collection').updateOne({'_id':ObjectId(id)},
     { 
        $set:{
            "StudentID": Object['StudentID'],
            "Title": Object['Title'],
            "Name": Object['Name'],
            "Surname": Object['Surname'],
            "Field": Object['Field'],
            "Project": Object['Project'],
            "Savings": Object['Savings'],
            "GPA":Object['GPA'],
            "Salary": Object['Salary']
        }
    });
    await client.close(); 
    res.status(200).send({
        "status": "success",
        "message": "object with "+id+" is updated.",
        "StudentID": Object['StudentID']
    })
})

app.delete('/slist/delete', async(req, res) => { // => return ค่าอะไรกลับไป
    const Object = req.body; // รับค่าจาก body มาใส่ในตัวแปร obj
    const id = Object._id; // รับค่า id มาจาก obj
    const client = new MongoClient(uri)
    await client.db('mydb').collection('s_collection').deleteOne({'_id':ObjectId(id)});
    await client.close(); 
    res.status(200).send({
        "status": "success",
        "message": "delete.",
        "StudentID": Object['StudentID']
    })
})

app.get('/slist/field/:searchText', async(req, res) => { //ใดๆที่อยู่หลัง : ตัวโปรแกรมจะมองว่าคือพารามิเตอร์ที่ส่งเข้ามา
    const {params} = req; 
    const searchText = params.searchText; // รับค่า searchText มาจาก params
    const client = new MongoClient(uri)
    await client.connect();
    const Object = await client.db('mydb').collection('s_collection').find({'$text':{"$search":searchText}}).toArray(); // toArray() คือ แปลงเป็น array 
    await client.close();
    res.status(200).send({
        "status": "success",
        "message": searchText,
        "StudentID": Object
    })
})

app.get('/slist/:id', async(req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('mydb').collection('s_collection').findOne({"_id": ObjectId(id)});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "searched by ID",
        "ID": objects
    })
})

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)}) // Listen to port เรียกใช้ express และ cors ที่ติดตั้งไว้

*/



// const uri = 'mongodb://localhost:27017';

// const connectDB = async() => { 
//     try {
//         const client = new MongoClient(uri);
//         await client.connect();
//         console.log(`MongoDB connected successfully.`);
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//         }
//     }
// connectDB();

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello ITD Dev')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

const {MongoClient, ObjectId} = require('mongodb');
// const uri = 'mongodb://localhost:27017';
const uri = "mongodb://127.0.0.1:27017/";

// const connectDB = async() => {
//     try {
//         const client = new MongoClient(uri);
//         await client.connect();
//         console.log('MongoDB is now conneted.')

//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// connectDB();

app.get('/slist', async(req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).project({_id:0, GPA:0, Savings:0, Salary:0}).toArray();
    const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).toArray();
    await client.close();
    res.status(200).send(objects);

})

app.post('/slist/create', async(req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('s_collection').insertOne({
        "StudentID": object['StudentID'],
        "Title": object['Title'],
        "Name": object['Name'],
        "Surname": object['Surname'],
        "Field": object['Field'],
        "Project": object['Project'],
        "Savings": object['Savings'],
        "GPA": object['GPA'],
        "Salary": object['Salary'],
        "Created_Date": object['Created_Date']
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object['StudentID']
    })
})

app.put('/slist/update', async(req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('s_collection').updateOne({'_id': ObjectId(id)}, 
    {"$set": {
        "StudentID": object['StudentID'],
        "Title": object['Title'],
        "Name": object['Name'],
        "Surname": object['Surname'],
        "Field": object['Field'],
        "Project": object['Project'],
        "Savings": object['Savings'],
        "GPA": object['GPA'],
        "Salary": object['Salary'],
        "Created_Date": object['Created_Date']
    }});
    await client.close();
    res.status(200).send({
        'status': "ok",
        'message': "Object with ID "+id+" is updated.",
        'object': object
    });
})

app.delete('/slist/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('s_collection').deleteOne({"_id": ObjectId(id)});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID"+ id + " is deleted."
    });
})


app.get('/slist/field/:searchText', async(req, res) => {
        const { params } = req;
        const searchText = params.searchText
        const client = new MongoClient(uri);
        await client.connect();
        const objects = await client.db('mydb').collection('s_collection').find({ $text: {$search: searchText } }).sort({ "Date received": -1 }).limit(5).toArray();
        await client.close();
        res.status(200).send({
          "status": "ok",
          "searchText": searchText,
          "Complaint": objects
        });
      })

app.get('/slist/:id', async(req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        await client.connect();
        const object = await client.db('mydb').collection('s_collection').findOne({ "_id": ObjectId(id) });
        await client.close();
        res.status(200).send({
            "status": "ok",
            "ID": id,
            "Complaint": object
        });
    })