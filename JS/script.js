// Afficher le  JSON et le SHA dans la console.log
// voir crypto.subtle

// attraper directement le formulair et addEventListener -> submit + prevent defaut pour éviter le rechargement
document.getElementById('formulaire').addEventListener('submit', function (event) {
    event.preventDefault();
    let titre = document.getElementById("titre");
    let categorie = document.getElementById("categorie");
    let categorieSelectionnee = categorie.value;
    let details = document.getElementById("details");
    let utilisateur = document.getElementById("utilisateur");

    console.log(titre.value);
    console.log(details.value);
    console.log(utilisateur.value);
    console.log(categorieSelectionnee);

    // Convertir les données récupérées en JSON
    let donneesFormulaire = {
        titre: titre,
        categorie: categorie,
        details: details,
        utilisateur: utilisateur
    }

    // Convertir l'objet donneesFormulaire en JSON
    let donneesJson = JSON.stringify(donneesFormulaire)
    console.log(donneesJson)

});

