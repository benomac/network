document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('#newpost') !== null) {
    document.querySelector('#newpost').addEventListener('click', function() {
        new_post_view()
    });
    }
    document.querySelector('#allposts').addEventListener('click', function() {
        console.log("out")
        window.location.href = '/';
        // all_posts_view()
        // load_all_posts();
    });
    if (document.querySelector('#username') !== null ) {
        console.log("user")
        document.querySelector('#username').addEventListener('click', function() {
            load_profile_or_allposts('load_profile');
        })
    }
    
    load_profile_or_allposts('all_posts');
  });





function new_post_view() {
   
    document.querySelector('#new-post').style.display = 'block';
    document.querySelector('#all-posts').style.display = 'none';
    document.querySelector('#profile').style.display = 'none'; 
}

// function all_posts_view() {
//     console.log("new")
//     if(document.querySelector('#newpost') !== null) {
//         document.querySelector('#new-post').style.display = 'none';
//         document.querySelector('#profile').style.display = 'none'; 
//     }
//     document.querySelector('#all-posts').style.display = 'block';
// }


function load_profile_or_allposts(page) {
    fetch(`/${page}`)
    .then(response => response.json())
    .then(posts => {
       
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
            if (document.querySelector('#profile') !== null && page === 'load_profile') {
            document.querySelector('#profile').append(div1);
            } else if (document.querySelector('#all-posts') !== null && page === 'all_posts') {
                document.querySelector('#all-posts').append(div1);
                }
        })
        
    });

    if (page === 'load_profile') {
        document.querySelector('#new-post').style.display = 'none';
        document.querySelector('#all-posts').style.display = 'none';
        document.querySelector('#profile').style.display = 'block'; 
    } else if (page === 'all_posts') {
        document.querySelector('#new-post').style.display = 'none';
        document.querySelector('#all-posts').style.display = 'block';
        document.querySelector('#profile').style.display = 'none'; 
    }
}