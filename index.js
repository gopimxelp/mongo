
const express=require('express');
const mongoose=require('mongoose')

const bodyParser = require('body-parser');
const app=express();



var router = express.Router(); 
const UserModel =require("./Model/schema")                           


// app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json());

router.get('/', function(req, res, next) {
    res.render('index', { title: 'add user' });
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// const products=[
//     {
//         id:1,
//         name:"iphone", 
//     },
//     {
//         id:2,
//         name:"vivo", 
//     },
//     {
//         id:3,
//         name:"samsung", 
//     }
// ]




// app.get('/products',(req,res)=>{
//     res.send(products)
// })

// app.get('/products/:name',(req,res)=>{

//     console.log(">>>>>>>>>>>>>>>>>>>>", req.params)
//     const newData=products.filter(item=>item.name.toString() === req.params);
//     res.send(newData)
//     console.log(newData)
// })


app.get('/users',async (req,res)=>{
    res.send(await UserModel.find({}).all())
})


app.post('/add-user', function(req, res, next) {
     
    
     
    var userDetails = new UserModel({
      id: req.body.id,
      title: req.body.title,
      subtitle:req.body.subtitle,
      link:req.body.link
    });
     
    userDetails.save((err, doc) => {
          if (!err)
              {
             
              res.send({
                "message" : "User added successfully",
                "success" : true,
                userDetails
              });
              }
          else
              console.log('Error during record insertion : ' + err);
    });
 

});




const DB='mongodb+srv://admin:admin1234@cluster0.d0gi6xn.mongodb.net/?retryWrites=true&w=majority';

let mongoDB = process.env.MONGODB_URI || DB;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected to db ')
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//  mongoose.connect(DB).then(()=>{
//     console.log(`connection succesfull`);
   
// }).catch((err)=>console.log(`no connection`));


// mongoose.connection.on('connected',()=>{
//     console.log('Mongoose connected to db ')
// })
// mongoose.connection .on('error',(err)=>{
//     console.log(err.message)
// })
// mongoose.connection.on('disconnected',()=>{
//     console.log("Mongoose connection is disconnected...")
// })
// process.on('SIGINT',async()=>{
//     await mongoose.connection.close();
//     process.exit(0);
// })






 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
     
    // // define Schema
    // var BookSchema = mongoose.Schema({
    //   name: String,
    //   title: String,
    //   id: Number
    // });
 
    // // compile schema to model
    // var Book = mongoose.model('Book', BookSchema, 'bookstore');
 
    // // a document instance
    // var book1 = new Book({ name: 'Introduction to Mongoose database', title: 10, id: 25 });
 
    // // save model to database
    // book1.save(function (err, book) {
    //   if (err) return console.error(err);
    //   console.log(book.name + " saved to bookstore collection.");
    // });
     
});


app.listen(7000,()=>console.log("running at 7000"));