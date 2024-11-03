<script>
    import { onMount } from 'svelte';

    let username = '';
    let name = '';
    let price = '';
    let location = '';
    let superficy = '';

    onMount(() => {
        username = localStorage.getItem('username') || '';
    });

    const publishEstate = () => {
        // send estate data to api for publishing
    };

</script>

<style>
    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    form {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #f9f9f9;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input[type="text"],
    input[type="number"],
    input[type="file"] {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>


<h1>Publiez votre annonce de vente immobilière</h1>
<form on:submit|preventDefault={publishEstate}>
    <div class="form-group">
        <label for="name">Nom:</label>
        <input type="text" id="name" bind:value={name} required>
    </div>
    <div class="form-group">
        <label for="picture">Image:</label>
        <input type="file" id="picture" required>
    </div>
    <div class="form-group">
        <label for="price">Prix:</label>
        <input type="number" id="price" bind:value={price} required>
    </div>
    <div class="form-group">
        <label for="location">Localisation:</label>
        <input type="text" id="location" bind:value={location} required>
    </div>
    <div class="form-group">
        <label for="superficy">Superficie:</label>
        <input type="number" id="superficy" bind:value={superficy} required>
    </div>
    <button type="submit">Publier</button>
</form>

