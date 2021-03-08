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

    if (docQS('#username') !== null ) {
        
        docQS('#username').addEventListener('click', function() {
            // Stops the user data loading evrytime the username is clicked
            docQS('#profile').innerHTML = '';
            load_profile_or_allposts('load_profile');
            get_foll()
        })

    }
    
    load_profile_or_allposts('all_posts');
  });



function new_post_view() {
   
    docQS('#new-post').style.display = 'block';
    docQS('#all-posts').style.display = 'none';
    docQS('#profile').style.display = 'none'; 
}

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
                    div.className = key;
                    div.innerHTML = key + " " + value;
                    div1.append(div)
                    
                }
            }
            console.log("when")
            if (docQS('#profile') !== null && page === 'load_profile') {
                docQS('#profile').append(div1);
            } else if (docQS('#all-posts') !== null && page === 'all_posts') {
                docQS('#all-posts').append(div1);
                }
        })
        
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

function get_foll() {
    fetch('get_foll')
    .then(response => response.json())
    .then(posts => {
        console.log("POSTS", posts)
        let div = document.createElement('div')
        if (docQS('#profile') !== null) {
            posts.forEach(post => {
                div.append(`${post.followers} followers`)
                div.append(`${post.followed} followed`)
                docQS('#profile').append(div);
            })
        }
    })
}