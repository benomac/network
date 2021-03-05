document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#allposts').addEventListener('click', load_all_posts());
});

function load_all_posts() {
    fetch('/all_posts')
    .then(response => response.json())
    .then(posts => {
       
        posts.forEach(post => {
            console.log(post);
            
            for (const [key, value] of Object.entries(post)) {
                if (key !== "id") {
              
                    div = document.createElement('div');
                    div.className = key;
                    div.innerHTML = value;
                    document.querySelector('#all-posts').append(div)
                    
                    }
              }
        });
    });
}