function getUserInfo() {
    const userInfoDiv = document.getElementById('userInfo');
    const errorMessageDiv = document.getElementById('errorMessage');
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();
    const avatar = document.getElementById('avatar');
    const name = document.getElementById('name');
    const bio = document.getElementById('bio');
    const repos = document.getElementById('repos');
    const followers = document.getElementById('followers');
    
    // Reset content
    userInfoDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    if (!username) {
        errorMessageDiv.textContent = 'Please enter a valid username.';
        return;
    }

    // Fetch user data from GitHub API
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(user => {
            // Display user information
            avatar.src = user.avatar_url || '';
            name.textContent = user.name || 'No Name Available';
            bio.textContent = user.bio || 'No bio available';
            repos.textContent = user.public_repos || '0';
            followers.textContent = user.followers || '0';

            // Show the user info div
            userInfoDiv.style.display = 'block';
        })
        .catch(error => {
            errorMessageDiv.textContent = `Error: ${error.message}`;
        });
}
