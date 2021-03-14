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

    if(docQS('#followers') !== null) {
    docQS('#followers').addEventListener('click', function() {
        console.log("followers")
        getFollowers(this.dataset.user);
        
    });
    }

    allposts('all_posts');
  });


//Shows the new post form view
function new_post_view() {
    docQS('#new-post').style.display = 'block';
    docQS('#all-posts').style.display = 'none';
    docQS('#profile').style.display = 'none'; 
    docQS('#peopleFollowed').style.display = 'none';    
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
        // Make all names links to profile
        add_profile_link()
    });

        

        
    
    if (docQS('#new-post') !== null) {
        docQS('#peopleFollowed').style.display = 'none';     
        docQS('#new-post').style.display = 'none';
        docQS('#all-posts').style.display = 'block';
        docQS('#profile').style.display = 'none'; 
    }
}

//Add onclick event to load users profile when ANY username is clicked
function add_profile_link() {
     
     document.querySelectorAll('.username').forEach(user => {
        user.onclick = function() {
            if(docQS('#profile') !== null) {
            docQS('#profile').innerHTML = '';
            givePageTitle('Profile', 'profile')
            
            docQS('#profile').append(div)
            }
            load_profile(this.dataset.name)
        }
    })
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
        add_profile_link()
    })
}

//Loads a users profile
function load_profile(user) {
    
    fetch(`load_profile/${user}`)
    .then(response => response.json())
    .then(posts => {
        
        //populate profile page
        pop_prof(posts, 'profile')

        
        //Add the followers and followed amounts to the profile view.
        if(docQS('#profile') !== null) {
            get_foll(user)
        }
        //Create variable to hold the value of the logged in user.
        let cur_user = docQS('#cur_user').innerHTML;
        
        //Add button to a users profile if it is not the logged in user
        if (cur_user !== user) {
            let button = document.createElement('button')
            
            //changes the lable of the button, from follow to unfollow
            follow_or_un(posts[0].user);
            button.className = "follow"

            //give button, the dataset of the user whos profile it is, their id from usermodel
            button.dataset.user = posts[posts.length - 1].user_id
            docQS('#profile').append(button);
        }

        //Follow or unfollow
        if (docQS('.follow') !== null) {
        docQS('.follow').onclick = function() {
                follow(this.dataset.user);
                
            }
        }
        })
    
    if (docQS('#profile') !== null) {
        docQS('#peopleFollowed').style.display = 'none'; 
        docQS('#new-post').style.display = 'none';
        docQS('#all-posts').style.display = 'none';
        docQS('#profile').style.display = 'block'; 
            
        }
}

function follow(user) {
    console.log("tyoe", typeof user)
    fetch(`/following/${user}`, {
        method: 'PUT'
        
      })
      
    }    

function getFollowers(user) {
    fetch(`/following/${user}`)
    .then(response => response.json())
    .then(posts => {
    
        //populate followers page
        docQS('#peopleFollowed').innerHTML = '';
        givePageTitle('Following', 'peopleFollowed')
        pop_prof(posts, 'peopleFollowed')
    
        if (docQS('#profile') !== null) {
            docQS('#new-post').style.display = 'none';
            docQS('#all-posts').style.display = 'none';
            docQS('#profile').style.display = 'none';
            docQS('#peopleFollowed').style.display = 'block'; 
                
            }
        add_profile_link()
});

}

function pop_prof(posts, view) {
    if (posts.length <= 1) {
        if (docQS(`#${view}`) !== null) {
            docQS(`#${view}`).append("Empty");
        }
    }
    posts.forEach(post => {
        
        let div1 = document.createElement('div')
            div1.className = "posted";
            for (const [key, value] of Object.entries(post)) {
                //Hide post id and user_id from user profile
                if (key !== "id" && key !== "user_id") {
              
                    let div = document.createElement('div');
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
            if (docQS(`#${view}`) !== null) {
                docQS(`#${view}`).append(div1);
            }
        })
}


//here to follow or unfollow?????!!!!!
function follow_or_un(followee) {
    fetch('/follow_or_un')
    .then(response => response.json())
    .then(users => {
        if (users.includes(followee)) {
            docQS('.follow').innerHTML = "Unfollow"
                docQS('.follow').addEventListener('click', function() {
                    docQS('.follow').innerHTML = "Follow" 
                    docQS('#profile').innerHTML = '';
                    docQS('#peopleFollowed').innerHTML = '';
                    givePageTitle('Profile', 'profile')
                    load_profile(followee)
                    
                });
        } else {
            docQS('.follow').innerHTML = "Follow"
                docQS('.follow').addEventListener('click', function() {
                    docQS('.follow').innerHTML = "Unfollow"
                    docQS('#profile').innerHTML = '';
                    givePageTitle('Profile', 'profile')
                    load_profile(followee)
                });
        }
        
    })
    
}

//Put the title of the view on the page.
function givePageTitle(page, id) {
    div = document.createElement('div');
            h1 = document.createElement('h1')
            h1.className = 'title'
            div.className = 'title_div'
            h1.innerHTML = page
            div.append(h1)
            
            docQS(`#${id}`).append(div)
}
