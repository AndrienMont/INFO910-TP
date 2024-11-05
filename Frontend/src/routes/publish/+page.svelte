<script lang="ts">
    import { onMount } from 'svelte';
    import { Base64 } from 'js-base64';

    let username = '';
    let name = '';
    let price = '';
    let location = '';
    let superficy = '';
    let base64Image = '';

    onMount(() => {
        username = localStorage.getItem('username') || '';
    });

    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target && target.files) {
            const file = target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    if (typeof reader.result === 'string') {
                        base64Image = reader.result.split(',')[1];
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const publishEstate = () => {
        fetch('http://localhost:3000/publish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, name, price, location, superficy, image: base64Image, buyer: "" })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Annonce publiée avec succès');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Une erreur est survenue lors de la publication de l\'annonce');
        });
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

    .input-group {
        display: flex;
        align-items: center;
    }

    .input-group input {
        flex: 1;
    }

    .input-group span {
        margin-left: 8px;
        font-weight: bold;
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
        <input type="file" id="picture" on:change={handleFileChange} required>
    </div>
    <div class="form-group">
        <label for="price">Prix:</label>
        <div class="input-group">
            <input type="number" id="price" bind:value={price} required>
            <span>€</span>
        </div>
    </div>
    <div class="form-group">
        <label for="location">Localisation:</label>
        <input type="text" id="location" bind:value={location} required>
    </div>
    <div class="form-group">
        <label for="superficy">Superficie:</label>
        <div class="input-group">
            <input type="number" id="superficy" bind:value={superficy} required>
            <span>m²</span>
        </div>
    </div>
    <button type="submit">Publier</button>
</form>

