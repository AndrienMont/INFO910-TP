<script>
    import { onMount } from 'svelte';

    let username = '';
    let password = '';
    let confirmPassword = '';
    let isRegistering = false;

    const handleLogin = () => {
        // Handle login logic here
        console.log('Logging in with', username, password);
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                localStorage.setItem('username', username);
                window.location.href = '/';
            } else {
                alert('Login failed');
            }
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred during login');
        });
    };

    const handleRegister = () => {
        // Handle registration logic here
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        } else {
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                localStorage.setItem('username', username);
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        console.log('Registering with', username, password, confirmPassword);
    };
</script>

<style>
    .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    h1 {
        margin-bottom: 1.5rem;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    form button {
        padding: 0.5rem 1rem;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .registerBtn {
        padding-top: 1rem;
        background: none; 
        border: none; 
        color: blue; 
        text-decoration: underline; 
        cursor: pointer;
    }

</style>
    
<div class="container">
    <h1>{isRegistering ? 'Register' : 'Login'}</h1>
    <form on:submit|preventDefault={isRegistering ? handleRegister : handleLogin}>
        <input type="text" bind:value={username} placeholder="Username" />
        <input type="password" bind:value={password} placeholder="Password" />
        {#if isRegistering}
            <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" />
        {/if}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
    </form>
    <button type="button" on:click={() => isRegistering = !isRegistering} class="registerBtn">
        {isRegistering ? 'Already have an account ? Login' : 'Don\'t have an account? Register'}
    </button>
</div>