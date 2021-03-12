//shorten document.querySlector
function docQS(id) {
    return document.querySelector(id)
}


document.addEventListener('DOMContentLoaded', function() {
    //Add current users name to a variable to be used for adding follow button.
    
    if(docQS('#newpost') !== null) {
    docQS('#newpost').addEventListener('click', function() {
        new_post_view()
    });
    }

    //Loads all post when "all posts" link is clicked
    docQS('#allposts').addEventListener('click', function() {
        console.log("out")
        window.location.href = '/';
        
    });

    allposts('all_posts');
  });


//Shows the new post form view
function new_post_view() {
    docQS('#new-post').style.display = 'block';
    docQS('#all-posts').style.display = 'none';
    docQS('#profile').style.display = 'none'; 
}

// Loads the allposts view
function allposts() {
    fetch('all_posts')
    .then(response => response.json())
    .then(posts => {
       
        posts.forEach(post => {
            
            let div1 = document.createElement('div')
            div1.className = "posted";
            
            for (const [key, value] of Object.entries(post)) {
                // Stops the id being loaded from the model
                if (key !== "id") {
                    div = document.createElement('div');
                    
                    //Add a class of 'username' to the users username, and a data-set
                    // of their user name also.
                    if(key === "user") {
                        div.className = "username";
                        div.dataset.name = value;
                    } else {
                        div.className = key;
                    }
                    
                    div.innerHTML = key + " " + value;
                    div1.append(div)
                }
            }
            
            if (docQS('#all-posts') !== null) {
                docQS('#all-posts').append(div1);
            }
            
        })
        
        //Add onclick event to load users profile when ANY username is clicked
        document.querySelectorAll('.username').forEach(user => {
            user.onclick = function() {
                if(docQS('#profile') !== null) {
                docQS('#profile').innerHTML = '';
                }
                load_profile(this.dataset.name)
            }
        })
    });

        

        
    
    if (docQS('#new-post') !== null) {
    docQS('#new-post').style.display = 'none';
    docQS('#all-posts').style.display = 'block';
    docQS('#profile').style.display = 'none'; 
    }
}

//get the users followers and people followed and add them to the users profile

function get_foll(user) {
    fetch(`get_foll/${user}`)
    .then(response => response.json())
    .then(posts => {
        console.log("POSTS", posts);
        let div = document.createElement('div');
        let div2 = document.createElement('div');
        div.className = 'followers';
        div2.className = 'followed';
        
        if (docQS('#profile') !== null) {
            
                div.append(`${posts[0].followers} followers`);
                div2.append(`${posts[0].followed} followed`);
                
                docQS('#profile').append(div);
                docQS('#profile').append(div2);
        }
    })
}

//Loads a users profile
function load_profile(user) {
    fetch(`load_profile/${user}`)
    .then(response => response.json())
    .then(posts => {
        
        posts.forEach( post => {
        let div1 = document.createElement('div')
            div1.className = "posted";
            for (const [key, value] of Object.entries(post)) {
                //Hide post id and user_id from user profile
                if (key !== "id" && key !== "user_id") {
              
                    div = document.createElement('div');
                    if(key === "user") {
                        div.className = "username";
                        div.dataset.name = value;
                    } else {
                        div.className = key;
                    }
                    
                    div.innerHTML = key + " " + value;
                    div1.append(div)
                }
            }
            if (docQS('#profile') !== null) {
                docQS('#profile').append(div1);
                
                
            }
        })

        
        //Add the followers and followed amounts to the profile view.
        if(docQS('#profile') !== null) {
            get_foll(user)
        }
        //Create variable to hold the value of the logged in user.
        let cur_user = docQS('#cur_user').innerHTML;
                
        //Add button to a users profile if it is not the logged in user
        if (cur_user !== posts[0].user) {
            let button = document.createElement('button')
            button.innerHTML = "Follow"
            button.className = "follow"

            //give button, the dataset of the user whos profile it is, their id from usermodel
            button.dataset.user = posts[2].user_id
            docQS('#profile').append(button);
        }

        //THIS IS WHERE ILL PUT THE LOGIC TO FOLLOW UNFOLLOW
        if (docQS('.follow') !== null) {
        docQS('.follow').onclick = function() {
                console.log(this.dataset.user)
            }
        }
        })
    
    if (docQS('#profile') !== null) {
        docQS('#new-post').style.display = 'none';
        docQS('#all-posts').style.display = 'none';
        docQS('#profile').style.display = 'block'; 
            
        }
}

function follow(user) {
    // fetch(`load_profile/${user}`)
    // .then(response => response.json())
    // .then(posts => {
    //     console.log(user)
    // })
    console.log(user)
}