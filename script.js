
// Generales
let boutonTout = document.getElementById("btnTout");
let boutonParis = document.getElementById("btnParis");
let boutonLyon = document.getElementById("btnLyon");
let bouton4Etoiles = document.getElementById("btn4Etoiles");
let logementsContainer = document.getElementById("logement");

let filtre = "tout"
let dataJson;


fetch("zenbnb.json")
  .then(function(response) {
    if (!response.ok) {
      throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");
    }
    return response.json();
  })



  .then(function(json) {
    dataJson = json;
    let categoryContainer = document.getElementById("logement");
    for (let i = 0; i < json.listings.length; i++) {
      let logement = json.listings[i];
      let p = document.createElement("p");
      p.textContent = logement.name; 
      categoryContainer.appendChild(p);
    }
  })



function appelFiltre (filtre){
    logementsContainer.innerHTML = "";
    for (let k = 0; k < dataJson.listings.length; k++) {
        let logement = dataJson.listings[k];
        if (filtre === "tout") {
            afficheLogements(logement);
        }
        else if (filtre === "paris") {
            if (logement.city === "Paris") {
                afficheLogements(logement);
            }
        }
        else if (filtre === "lyon") {
            if (logement.city === "Lyon") {
                afficheLogements(logement);
            }
        }
        else if (filtre === "4etoiles") {
            if (logement.rating >= 4) {
                afficheLogements(logement);
            }
        }
        else return
  }}



  function afficheLogements(logement){
    let div = document.createElement("div");
    let html = "<h2>" + logement.title + "</h2>";
    html += "<p><strong>Ville :</strong> " + logement.city + "</p>";
    html += "<p><strong>Prix par nuit :</strong>" + logement.price_per_night +"</p>";
    html += "<p><strong>Note :</strong> " + logement.rating + " </p>";
    html += "<img src=' " + logement.image + " '/>";
    div.innerHTML = html;
    logementsContainer.appendChild(div);
}



  boutonTout.addEventListener("click",function () {
    appelFiltre("tout");
  })

  boutonParis.addEventListener("click",function () {
    appelFiltre("paris");
  })

  boutonLyon.addEventListener("click",function () {
    appelFiltre("lyon");
  })

  bouton4Etoiles.addEventListener("click",function () {
    appelFiltre("4etoiles");
  })
  
  document.getElementById("reservation-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire
  
    const errors = []; // Tableau d'erreurs
    const result = document.getElementById("result");
    
    // Récupérer les valeurs
    const nomComplet = document.getElementById("nomComplet").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const housing = document.querySelector('input[name="housing"]:checked');
    const arrival = new Date(document.getElementById("arrival").value);
    const departure = new Date(document.getElementById("departure").value);
    const people = parseInt(document.getElementById("people").value, 10);
    const breakfast = document.getElementById("breakfast").checked;
    const chauffeur = document.getElementById("chauffeur").checked;
    const guide = document.getElementById("guide").checked;
  
    // Validation des champs obligatoires
    if (nomComplet.length < 5 || nomComplet.length > 50) errors.push("Le nom doit contenir entre 5 et 50 caractères.");
    if (address.length < 5 || address.length > 100) errors.push("L'adresse doit contenir entre 5 et 100 caractères.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("L'email n'est pas valide.");
    if (!/^(\+?\d{1,3}[-.\s]?)?\d{9,12}$/.test(phone)) errors.push("Le numéro de téléphone n'est pas valide.");
    if (!housing) errors.push("Veuillez choisir un type de logement.");
    if (isNaN(arrival) || isNaN(departure) || departure <= arrival) errors.push("Veuillez entrer des dates valides.");
    if (people < 1 || people > 10) errors.push("Le nombre de personnes doit être entre 1 et 10.");
  
    // Calculer la durée du séjour
    const oneDay = 24 * 60 * 60 * 1000; // Millisecondes dans une journée
    const nights = Math.round((departure - arrival) / oneDay);
  
    // Services supplémentaires
    let total = 0;
    if (chauffeur) total += 11 * nights;
    if (breakfast) total += 15 * people * nights;
    if (guide) total += 20; // Forfait
  
    // Afficher les erreurs ou le résumé
    if (errors.length > 0) {
      result.textContent = errors.join("\n"); // Affiche les erreurs ligne par ligne
      result.classList.add("error");
      result.classList.remove("success");
    } else {
      result.innerHTML = `
        <p>Formulaire valide ✅</p>
        <p>Durée du séjour : ${nights} nuits</p>
        <p>Montant total estimé : ${total} €</p>
      `;
      result.classList.add("success");
      result.classList.remove("error");
    }
  });
  
  // Gérer l'affichage dynamique des options logement
  document.querySelectorAll('input[name="housing"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const housingOptions = document.getElementById("housing-options");
      if (this.value === "maison") {
        housingOptions.innerHTML = `
          <div class="form-check">
            <input type="checkbox" id="pool" class="form-check-input">
            <label for="pool" class="form-check-label">Piscine</label>
          </div>
          <div class="form-check">
            <input type="checkbox" id="garden" class="form-check-input">
            <label for="garden" class="form-check-label">Jardin</label>
          </div>
        `;
      } else if (this.value === "appartement") {
        housingOptions.innerHTML = `
          <div class="form-check">
            <input type="checkbox" id="balcony" class="form-check-input">
            <label for="balcony" class="form-check-label">Balcon</label>
          </div>
          <div class="form-check">
            <input type="checkbox" id="elevator" class="form-check-input">
            <label for="elevator" class="form-check-label">Ascenseur</label>
          </div>
        `;
      } else {
        housingOptions.innerHTML = "";
      }
    });
  });
  
  // Afficher ou masquer le régime alimentaire
  document.getElementById("breakfast").addEventListener("change", function () {
    const dietSection = document.getElementById("diet-section");
    dietSection.style.display = this.checked ? "block" : "none";
  });