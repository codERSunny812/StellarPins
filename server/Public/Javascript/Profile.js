
// Check if the URL contains the query parameter 'upload=success'
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('upload') === 'success') {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    // Hide the success message after 5 seconds (5000 milliseconds)
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}


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


