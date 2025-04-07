


// === Chargement d'un fichier JSON et affichage des catégories + produits ===

// fetch() est une fonction JavaScript intégrée
// Elle permet de demander un fichier à un serveur (comme aller chercher un fichier dans un dossier)
// Ici, on demande le fichier "products.json"
fetch("zenbnb.json")
  .then(function(response) {
    // La fonction 'then' s'exécute quand le fichier est trouvé
    // response contient toutes les informations de la réponse

    // .ok est une propriété qui dit si la réponse est bonne (fichier trouvé, pas d'erreur)
    if (!response.ok) {
      // Si la réponse n'est pas bonne, on arrête tout et on affiche une erreur
      throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");
    }

    // Si tout va bien, on transforme le fichier JSON (qui est du texte brut)
    // en objet JavaScript (facile à utiliser dans le code)
    return response.json(); // Cette ligne est obligatoire pour lire le contenu
  })

  // Une fois que les données JSON sont prêtes
  .then(function(data) {
    // 'data' contient maintenant toutes les informations du fichier JSON
    // On peut accéder à data.categories et data.products


    // === AFFICHAGE DES PRODUITS ===

    // On récupère l'endroit dans le HTML où on veut afficher les produits
    let logementsContainer = document.getElementById("logement");

    // On parcourt chaque produit dans la liste
    for (let j = 0; j < data.listings.length; j++) {
      let logement = data.listings[j]; // un seul produit

      let div = document.createElement("div"); // <div></div>
/*
      // Chaque produit a un numéro de catégorie (ex : categoryId = 1)
      // On veut retrouver le nom de la catégorie correspondante
      let categoryName = "";

      // On parcourt les catégories pour trouver celle avec le bon ID
      for (let k = 0; k < data.categories.length; k++) {
        if (data.categories[k].id === product.categoryId) {
          categoryName = data.categories[k].name;
        }
      }

      // On crée un bloc HTML pour ce produit
  
*/
      // On prépare le contenu du produit avec son nom, sa description, etc.
      let html = "<h2>" + logement.title + "</h2>";
      html += "<p><strong>Ville :</strong> " + logement.city + "</p>";
      html += "<p><strong>Prix par nuit :</strong>" + logement.price_per_night +"</p>";
      html += "<p><strong>Note :</strong> " + logement.rating + " </p>";
      html += "<img src=' " + logement.image + " '/>";

      // On met ce contenu dans le <div>
      div.innerHTML = html;

      // Et on l'ajoute dans la page
      logementsContainer.appendChild(div);
    }
  })

  /*
  // Si quelque chose ne fonctionne pas (erreur de chargement, etc.)
  .catch(function(error) {
    // On affiche l'erreur dans la console du navigateur (F12 > Console)
    console.log.error("Erreur : " + error.message);
  });
  */