const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Middleware has the access to both request and reponse.
//It can manipulate the data.


app.use(express.urlencoded());
app.use(express.static('assets'));


//middleware1
// app.use(function(req,res,next){
//     // console.log('Middleware 1 called');
//     req.myName="Arpan";
//     next();
// })


//middleware2
// app.use(function(req,res,next){
//     console.log('MY Name from MW2',req.myName);
//     // console.log('middleware 2 called');
//     next();
// })

var contactList=[
    {
        name:"Dikshant",
        phone:"7508542510"
    },
    {
        name:"Tony Stark",
        phone:"7508542511"
    },
    {
        name:"Coding Ninjas",
        phone:"7508542512"
    }
]


//Controller
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'Let us play with ejs'
    });

})

app.get('/',function(req,res){
    // console.log(__dirname);

    // res.send('<h1>Cool,it is running! or is it?</h1>');
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"Contact list",
            contact_list:contacts
    
        });
        
    })
    // return res.render('home',{
    //     title:"Contact list",
    //     contact_list:contactList

    // });
})


app.post('/create-contact',function(req,res){
    // console.log(req);
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // contactList.push(req.body);

    //pushing in the database
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creating a contact!');
        return;}
        console.log('**********',newContact);
        return res.redirect('back');
    })

    // return res.redirect('/');
})

//For deleting a contact

app.get('/delete-contact/',function(req,res){
    // console.log(req.params);
    //get the query from the url
    // let phone =req.params.phone;

    // let contactIndex=contactList.findIndex(contact =>contact.phone ==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');

    //get the id from query in the url
    let id=req.query.id;
    //fint the contact in the databse using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        
        return res.redirect('/');
    })

})


app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
    }
    console.log("Yup! My Express Server is running 🚀🚀🚀 on Port:",port);
})