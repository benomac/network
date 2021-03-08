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

    docQS('#allposts').addEventListener('click', function() {
        console.log("out")
        window.location.href = '/';
        // all_posts_view()
        // load_all_posts();
    });

    if (docQS('.username') !== null ) {
        
        // DO DQSALL AND LOOP THROUGH THEM TO ADD ONCLICK TO ALL USERNAME CLASSES
        //SO THAT WHEN YOU CLICK ON A PERSONS USERNAME IT'LL TAKE YOU TO THEIR PROFILE
        // YOU'LL NEED TO CREATE A DIFFERENT ROUTE AS BY DEFAULT YOU'LL BE TAKEN TO THE LOGGED IN
        //USERS PROFILE.
        docQS('.username').addEventListener('click', function() {
            // Stops the user data loading evrytime the username is clicked
            docQS('#profile').innerHTML = '';
            load_profile_or_allposts('load_profile');
            
        })

    }
    
    load_profile_or_allposts('all_posts');
  });


//Shows the new post form view
function new_post_view() {
    docQS('#new-post').style.display = 'block';
    docQS('#all-posts').style.display = 'none';
    docQS('#profile').style.display = 'none'; 
}

// Loads the Current users profile, or the allposts view
function load_profile_or_allposts(page) {
    fetch(`/${page}`)
    .then(response => response.json())
    .then(posts => {
       console.log(posts)
        posts.forEach(post => {
            
            let div1 = document.createElement('div')
            div1.className = "posted";
            
            for (const [key, value] of Object.entries(post)) {
                if (key !== "id") {
              
                    div = document.createElement('div');
                    if(key === "user") {
                        div.className = "username";
                    } else {
                        div.className = key;
                    }
                    
                    div.innerHTML = key + " " + value;
                    div1.append(div)
                }
            }
            console.log("when")
            if (docQS('#profile') !== null && page === 'load_profile') {
                docQS('#profile').append(div1);
                console.log(1)
                
            } else if (docQS('#all-posts') !== null && page === 'all_posts') {
                docQS('#all-posts').append(div1);
                }
        })
        if(docQS('#profile') !== null) {
            get_foll()
        }
    });
    if (page === 'load_profile') {
        docQS('#new-post').style.display = 'none';
        docQS('#all-posts').style.display = 'none';
        docQS('#profile').style.display = 'block'; 
    } else if (page === 'all_posts') {
        if (docQS('#new-post') !== null) {
        docQS('#new-post').style.display = 'none';
        docQS('#all-posts').style.display = 'block';
        docQS('#profile').style.display = 'none'; 
        }
    }
}

//get the users followers and people followed and add them to the users profile

function get_foll() {
    fetch('get_foll')
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