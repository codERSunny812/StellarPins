document.addEventListener('DOMContentLoaded', function () {
    // Select all bookmark buttons
    const bookmarkBtns = document.querySelectorAll('.savedPost');

    // Add event listener to each bookmark button
    bookmarkBtns.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();

            // Extract the attribute values
            const postId = btn.getAttribute('data-postid');
            const userId = btn.getAttribute('data-userid');

            // Log the attribute values
            console.log("The value of the postId and userId is:");
            console.log(postId, userId);

            addToSavedPost({ userId, postId });
            
        });
    });

    // Function to call the API
    const addToSavedPost = ({ userId, postId }) => {
        console.log("add to saved post function is called")
        console.log(userId, postId);

        // Send an AJAX request to your server to add the post to the user's saved posts
        // Example using fetch API:
        fetch('/api/v1/addtobookmark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: postId, userId: userId })
        })
            .then(response => {
                if (response.ok) {
                    // Post was successfully added to saved posts
                    alert('Post added to saved!');
                } else {
                    // Handle error response
                    alert('Failed to add post to saved.');
                }
            })
            .catch(error => {
                console.error('Error adding post to saved:', error);
            });
    };
});
