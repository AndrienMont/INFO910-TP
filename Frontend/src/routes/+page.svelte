<script>
    import { onMount } from 'svelte';

    let username = '';

    let estates = /** @type {Array<{_id: string, name: string, price: number, location: string, superficy: number, image: string, username: string, buyer: string}>} */ ([]);
   
    onMount(() => {
        username = localStorage.getItem('username') || '';
        fetchEstates();
    });

    function navTo(page) {
    window.location.href = page;
    };

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



    async function deleteEstate(id) {
    try {
      const response = await fetch(`http://localhost:3000/deleteEstate/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      
      if (response.ok) {
        console.log('Success:');
        window.location.reload();
      } else {
        console.log('Erreur' , result.message);
      }
    } catch (error) {
        console.error('Error:', error);
    }
  }


</script>

<style>
/* Container des annonces */
.estate-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    align-items: left; /* Centre les cartes */
}

/* Carte individuelle de chaque annonce */
.estate-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    gap: 0.75rem;
    max-width: 600px; /* Limite la largeur maximale de chaque carte */
    width: 100%; /* Permet à la carte de remplir l'espace jusqu'à max-width */
}

.estate-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Style de l'image */
.estate-card img {
    width: 100px;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
}

/* Conteneur pour le texte */
.estate-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

/* Titre */
.estate-info h2 {
    font-size: 1rem;
    color: #333;
    margin: 0 0 0.25rem;
}

/* Détails */
.estate-info p {
    color: #666;
    font-size: 0.9rem;
    margin: 0.15rem 0;
}

/* Prix */
.estate-info p.price {
    font-weight: bold;
    font-size: 1rem;
    color: #2d87f0;
}

/* Bouton d'achat */
.estate-card button {
    background-color: #2d87f0;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    font-size: 0.9rem;
    align-self: flex-start;
    transition: background-color 0.2s;
}

.estate-card button:hover {
    background-color: #1b5ea8;
}


/* Style de la navbar */
.navbar {
    background-color: #333;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }

  .navbar button {
    background-color: #70766d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .navbar button:hover {
    background-color: #5e645c;
  }

  .navbar .logout {
    background-color: #f44336;
  }

  .navbar .logout:hover {
    background-color: #d32f2f;
  }

  .navbar .login {
    background-color: #09ae35;
  }

  .navbar .login:hover {
    background-color: #0dc53e;
  }
</style>

<div class="navbar">
    {#if username == ''}
        <div>
            <button on:click={() => navTo('/')}>Home</button>
        </div>
        <div>
            <button class="login"  on:click={() => navTo('/login')}>Login</button>
        </div>
    {:else}  
        <div>
            <button on:click={() => navTo('/')}>Home</button>
            <button on:click={() => navTo('/publish')}>Publish an estate</button>
        </div>
        <div>
            <button class="logout" on:click={handleLogout}>Logout</button>
        </div>
    {/if}
  </div>




<div class="estate-list">
    {#each estates as estate}
        <div class="estate-card">
            <img src="data:image/png;base64,{estate.image}" alt="{estate.name}" />
            <div class="estate-info">
                <h2>{estate.name}</h2>
                <p class="price">{estate.price} €</p>
                <p>{estate.location}</p>
                <p>{estate.superficy} m²</p>
            </div>
            {#if username != ''}
                <button on:click={() => deleteEstate(estate._id)}>Buy</button>
            {/if}
        </div>
    {/each}
</div>


