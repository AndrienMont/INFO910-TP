<script>
    import { onMount } from 'svelte';

    let username = '';

    onMount(() => {
        username = localStorage.getItem('username') || '';
    });

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.reload();
    };

</script>

{#if username == ''}
    <h1>Welcome to TrouvImmo</h1>
    <a href="/login">Login</a>
{:else}
    <h1>Welcome to TrouvImmo, {username}</h1>
    <button on:click={handleLogout}>Logout</button>
    <a href="/publish">Publish an estate</a>
{/if}

