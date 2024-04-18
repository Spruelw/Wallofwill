function likeButtonFunction(){
// click event to toggle animation class
var likeButtons = document.querySelectorAll(".likeButton");
likeButtons.forEach((button)=> {
    button.addEventListener("click", ()=>{
        button.classList.toggle( "likeAnimationClass");
        
        var id = button.getAttribute("id");  //gets id of button

        var NumberOfLikes = document.getElementById(`${id}-likeCount`); // like count
        
       
        var likeButtonValue = button.getAttribute("value"); // keeps track of if user has already liked
        
        
        
        if(likeButtonValue != "+1"){

            button.setAttribute("value", "+1")  //set value to +1 then sends to server

            likeButtonValue = button.getAttribute("value"); // keeps track

             NumberOfLikes.innerText++; //changes like count on clientside
        }
        else{
            button.setAttribute("value", "-1") //set value to +1 then sends to server

            likeButtonValue = button.getAttribute("value");
            
            NumberOfLikes.innerText--; //changes like count on clientside
        }

        

        
    })
})
}

//function for post settinga
function dropDown(){ //toggle dropdown display
    var toggle = document.querySelector(".dropdown-content");
     if (toggle.style.display === "none"){
         toggle.style.display = "block";
     } else{
         toggle.style.display = "none";
     }
    }


function postClickFunction(){
 // event listener to open post when clicked
    var wallPosts = document.querySelectorAll(".post .content");
    wallPosts.forEach((post) => {
        post.addEventListener("click", () => {
            var id = post.getAttribute("id");
            window.location = "/postView/"+ id;
        })
    })
}

function commentSubmitButtonListener(){
    //show postsubmitted display
    document.querySelector(".commentSubmitButton").addEventListener("click", (event)=> {
        document.querySelector(".postSubmittedContainer").style.display = "flex";

        setTimeout(()=>{
            document.querySelector(".postSubmittedContainer").style.display = "none";
        }, "3000")
    })
}

function editSubmitListener(){
    var submitButton = document.querySelector(".submit-button")


    document.querySelector(".submit-button").addEventListener("click", (event)=> {
        document.querySelector(".postSubmittedContainer").style.display = "flex";

        setTimeout(()=>{
            document.querySelector(".postSubmittedContainer").style.display = "none";
        }, "3000")

    })
}



function createPostForm(){
    var submitButton = document.querySelector(".submit-button")


    document.querySelector(".submit-button").addEventListener("click", (event)=> {
        document.querySelector(".postSubmittedContainer").style.display = "flex";

        setTimeout(()=>{
            document.querySelector(".postSubmittedContainer").style.display = "none";
        }, "3000")

    });
    //dynamic characerlimit for body text
    var bodyInput =  document.querySelector(".body-input"); 
    bodyInput.addEventListener("keyup", (event) =>{
        
        var count = bodyInput.value.length ;
        

        var charecterLimit = document.querySelector(".body-character-limit");

        charecterLimit.innerHTML = count + "/40,000";
            
        if (count > 40000 || count <= 1){      //change color if limit exceeded
            charecterLimit.style.color = "red";


        }
        else{
            charecterLimit.style.color = "black";
        }
    })

    //dynamic characerlimit for title

    var titleInput =  document.querySelector(".title-input"); 
    titleInput.addEventListener("keyup", (event)=>{
        var count = titleInput.value.length ;


        var charecterLimit = document.querySelector(".title-character-limit");

        charecterLimit.innerHTML = count + "/150";
            
        if (count > 150 || count <= 1){      //change color if limit exceeded
            charecterLimit.style.color = "red";
        }
        else{
            charecterLimit.style.color = "black";
            
        }
    })

    //character limit for pin when creating post
        var pinInput = document.querySelector(".pin-input")
        //disable submit button
        submitButton.disabled = true;
        submitButton.style.opacity = ".5";
        try {
        document.querySelector("body").addEventListener("keyup", (event)=> {
                if (pinInput.value.length != 4 || titleInput.value.length < 1 || bodyInput.value.length < 1 ){
                    submitButton.disabled = true;
                    submitButton.style.opacity = ".5";
                } else {
                    submitButton.disabled = false;
                    submitButton.style.opacity = "1";

                        
                    }
                })
        }catch(err){
            throw(err)
        }
    }



if(window.location.href.indexOf("/create") > -1) {
    createPostForm();
}

if(window.location.href.indexOf("/home") > -1) {
    postClickFunction();
   likeButtonFunction();
}

if(window.location.href.indexOf("/postView") > -1) {
likeButtonFunction();
    commentSubmitButtonListener();
}

if(window.location.href.indexOf("/edit" ) > -1) {

    editSubmitListener();
}

if(window.location.href.indexOf("/help" ) > -1) {
        editSubmitListener();
    }

if(window.location.href.indexOf("/delete" ) > -1) {
        editSubmitListener();
}
