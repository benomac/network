document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('#newpost') !== null) {
    document.querySelector('#newpost').addEventListener('click', function() {
        new_post_view()
    });
    }
    document.querySelector('#allposts').addEventListener('click', function() {
        console.log("out")
        window.location.href = '/';
        all_posts_view()
        load_all_posts();
    });
    
    
    load_all_posts();
  });



function load_all_posts() {
    console.log("what")
    
    
    fetch('/all_posts')
    .then(response => response.json())
    .then(posts => {
       
        posts.forEach(post => {
            let div1 = document.createElement('div')
            div1.className = "posted";
            for (const [key, value] of Object.entries(post)) {
                if (key !== "id") {
              
                    div = document.createElement('div');
                    div.className = key;
                    div.innerHTML = value;
                    div1.append(div)
                    
                }
            }
            console.log("when")
            document.querySelector('#all-posts').append(div1);
        })
        
    });
    if(document.querySelector('#newpost') !== null) {
        document.querySelector('#new-post').style.display = 'none';
    }
    document.querySelector('#all-posts').style.display = 'block';
}

function new_post_view() {
    console.log("dfgbdfnew")
    document.querySelector('#new-post').style.display = 'block';
    document.querySelector('#all-posts').style.display = 'none';
}

function all_posts_view() {
    console.log("new")
    if(document.querySelector('#newpost') !== null) {
        document.querySelector('#new-post').style.display = 'none';
    }
    document.querySelector('#all-posts').style.display = 'block';
}