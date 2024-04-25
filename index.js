import express from "express";
import * as fs from "fs";


const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended: true}));

var helpTicketList = [];

var postLogs = [];


var postList = [] 


 function newTicket (ticket) {
    if (helpTicketList.length === 15){ //deletes old ticket and adds new one
        helpTicketList = helpTicketList.filter((ticket) => ticket != helpTicketList[14]);
        helpTicketList.unshift(ticket)
    }else{
    helpTicketList.unshift(ticket)
        }
    }

function newPost(title, body, pin){
    this.title = title;
    this.body = body;
    this.date = getDate();
    this.pin = pin;
    this.id = getId();
    this.likes = 0;
    this.comments = []; 
    postList.unshift(this);
    console.log(this)
}

new newPost("Welcome🥳🥳.","Welcome to my first live project site. Feel free to share a post!", "4241")


function deletePost(id){ //delete post entered
 var newPostList = postList.filter((post) => post.id != id);
    postList = newPostList;
}

function getDate(){ //returns month and day
    var date = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec" ]
    var month = months[date.getMonth()];
    var day = date.getDate();
    return ( month + " "+ day )
}

function getId (){ //gets random 6 digit id for post
    var idList = []
    var id = ""
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

    for (var i = 0; i < 3; i++){
        idList.push(Math.floor(Math.random() * 9));
        idList.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    
    idList.forEach((character) => {
        id = id + character;
   } )

    return id;
}



function newComment(comment, postId){ //adds new comment to post by the post's id
   var postIndexNumber = postList.findIndex((post) => post.id == postId);
   this.comment = comment;
   this.postId = postId;
   this.likes = 0;
   this.id = getId();
    postList[postIndexNumber].comments.unshift(this);
    console.log("newcomment ", postList[postIndexNumber].comments );
    
    
}


app.use(express.static("./public"))

app.get("/", (req, res) => {
    res.redirect("/home")
})

app.get("/home", (req, res) =>{
    res.render("./index.ejs", {postList})
})

app.get("/create", (req, res) =>{
res.render("./postSubmit.ejs")
})

//submits create a post data
app.post("/create", (req, res) =>{
    if(postList.length === 15){
       var newPostList = postList.filter((post)=> post != postList[14]);
        postList = newPostList;
    }

   
   new newPost(req.body["title"], req.body["postContent"],req.body["pin"] );
   
    var postListString = JSON.stringify(postList);
    fs.writeFile("./files/post-logs.txt", postListString, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("post logs updated")
        }
    } )
   setTimeout(()=>{
        res.redirect("/");
    }, "3000")

})

//view post by id
app.get("/postView/:id" , (req, res)=>{
    var id = req.params["id"]
    var post = postList[postList.findIndex((post)=> post.id == id )]
    res.render("./postView.ejs", {post})
})

app.post("/:id/likes", (req, res)=>{
    
   var id = req.params["id"]
    var post = postList[postList.findIndex((post)=> post.id == id )];

    if(req.body.like === "+1"){
        post.likes = post.likes + 1;
    }
    else if( req.body.like === "-1"){
        post.likes = post.likes - 1 ;
    }
    res.status(204).send();
})

//create a new comment
 app.post("/comment/:id", (req, res)=>{
    var id = req.params["id"]
    var post = postList[postList.findIndex((post)=> post.id == id )];
var content = req.body["newComment"];
new newComment(content, id)

setTimeout( ()=>{
    res.redirect("/postView/" + id);
}, "3500")


 })
//update comment likes when like button is clicked
app.post("/commentLike/:postId/:id", (req, res) =>{
    var postId = req.params["postId"]; //id for post
    var commentId = req.params["id"] //id for comment
    var postIndexNumber = postList.findIndex((post) => post.id == postId); //gets post index number
    var post = postList[postIndexNumber] //

    var commentIndexNumber = post.comments.findIndex((comment => comment.id == commentId)); //gets index of comment inside the post
    var comment = post.comments[commentIndexNumber];

    if(req.body.like === "+1"){
        comment.likes = comment.likes + 1 ;
    }
    else if( req.body.like === "-1"){
        comment.likes = comment.likes - 1 ;
    }
    
    console.log("post" + commentId + "liked")
    res.status(204).send();
})

//get page to edit a post
app.get("/edit/:id", (req, res)=>{
    var id = req.params["id"]
    var post = postList[postList.findIndex((post)=> post.id == id )];
    res.render("./edit.ejs", {post})
})

//edit post
app.post("/edit/:id", (req, res)=>{
    var id = req.params["id"]
    var post = postList[postList.findIndex((post)=> post.id == id )]

        if (req.body.pin == post.pin){
            post.title = req.body["title"];
            post.body = req.body["postContent"]
            console.log("post updated")
            setTimeout(()=>{
                res.redirect("/postview/" + id);
            }, "3000")
        }else{
            console.log("post not updated")
            res.send("pin not correct. Please try again")
        } 
})


app.get("/delete/:id", (req, res)=>{
    var id = req.params["id"]
    var post = postList[postList.findIndex((post)=> post.id == id )];
    res.render("./delete.ejs", {post})
})

app.post("/delete/:id", (req, res)=>{
    var id = req.params["id"];
    var post = postList[postList.findIndex((post)=> post.id == id )];
    if (req.body["pin"] == post.pin){
        deletePost(id);

    setTimeout(()=>{
        res.redirect("/")
    }, "3000")
    }else{
        res.send("pin doesn't match. Check pin and try again")
    }
    
})

app.get("/help", (req, res)=>{
    res.render("./help.ejs")
})

app.post("/help", (req, res)=>{
    var helpTicket =  getDate() +" " + req.body["body"];
    newTicket(helpTicket);
    var ticketList = helpTicketList.toString();
        fs.writeFile("./files/help-request.txt", ticketList, (err) =>{
            if(err){
                console.log(err)
            }else{
                console.log("ticket submitted successfully")
            }
        })
    setTimeout(()=>{
        res.redirect("/")
    }, "3000")
    
})
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})



