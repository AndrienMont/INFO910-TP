# INFO910-TP

## Auteurs
- **Andrien MONTMAYEUR**
- **Theo CONNETABLE**

---
## Description
Il s'agit d'un site web de vente de biens immobiliers.
Ce projet et constitué d'un front réalisé en Svelte communicant avec un backend Node.js connecter à une base de données MongoDB.
L'application est déployée sur un cluster local Minikube en utilisant Docker pour créer des conteneurs.

## Prérequis
- Docker
- Minikube
- Kubectl

## Instructions pour lancer l'application

1. **Démarer Minikube :**

    ```bash
    minikube start
    ```

2. **Générer les images Docker :**
   Depuis la racine du projet construisez les images en utilisant les commandes Docker suivantes:

    ```bash
    docker build -t frontend:latest -f Frontend/Dockerfile .
    docker build -t backend:latest -f Backend/Dockerfile .
    ```

3. **Appliquer les fichiers YAML :**

    ```bash
    kubectl -f apply mongo-secret.yaml
    kubectl -f apply mongo-deployement.yaml
    kubectl -f apply backend-deployement.yaml
    kubectl -f apply frontend-deployement.yaml
    ```

4. **Lancer le service frontend :**

    ```bash
    minikube service frontend
    ```
