//shorten document.querySlector
function docQS(id) {
    return document.querySelector(id)
}


document.addEventListener('DOMContentLoaded', function() {
    
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
                if (key !== "id") {
              
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
        if(docQS('#profile') !== null) {
            get_foll(user)
        }
    })
    
    if (docQS('#profile') !== null) {
        docQS('#new-post').style.display = 'none';
        docQS('#all-posts').style.display = 'none';
        docQS('#profile').style.display = 'block'; 
            
        }
}