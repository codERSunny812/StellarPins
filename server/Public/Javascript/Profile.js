// Define handleClick function first
const handleClick = () => {
    console.log("btn clicked")
    // Make a request to the logout route
    fetch('/api/v1/createuser/logout', {
        method: 'POST',
        credentials: 'same-origin' // Include credentials for session
    })
        .then(response => {
            if (response.redirected) {
                // Redirect to the login page
                window.location.href = response.url;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Attach event listener to logout button
const btn = document.getElementById('logout-btn');
btn.addEventListener('click', handleClick);


function showPosts() {
    document.getElementById('saved-posts').style.display = 'none';
    document.getElementById('user-posts').style.display = 'flex';
}

function showSaved() {
    document.getElementById('user-posts').style.display = 'none';
    document.getElementById('saved-posts').style.display = 'flex';
}


