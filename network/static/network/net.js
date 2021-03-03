document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#post-form').addEventListener('submit', add_new_post);
});

function add_new_post(event) {
    event.preventDefault();
    console.log(1)
    fetch('/add_new_post', {
        method: 'POST',
        body: JSON.stringify({
            newPost: document.querySelector('#post').value
        })
      })

}