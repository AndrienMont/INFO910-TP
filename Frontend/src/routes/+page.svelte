<script>
    import { onMount } from 'svelte';

    let username = '';
    let estates = /** @type {Array<{name: string, price: number, location: string, superficy: number, image: string}>} */ ([]);

    onMount(() => {
        username = localStorage.getItem('username') || '';
        fetchEstates();
    });

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.reload();
    };

    const fetchEstates = async () => {
        fetch('http://localhost:3000/sellableEstates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            estates = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

</script>

{#if username == ''}
    <h1>Welcome to TrouvImmo</h1>
    <a href="/login">Login</a>
{:else}
    <h1>Welcome to TrouvImmo, {username}</h1>
    <button on:click={handleLogout}>Logout</button>
    <a href="/publish">Publish an estate</a>
{/if}

{#each estates as estate}
    <div>
        <h2>{estate.name}</h2>
        <p>{estate.price} €</p>
        <p>{estate.location}</p>
        <p>{estate.superficy} m²</p>
        <img src="data:image/png;base64,{estate.image}" alt="" />
        <button>Buy</button>
    </div>
{/each}