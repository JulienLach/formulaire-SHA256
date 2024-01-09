// attraper directement le formulair et addEventListener -> submit + prevent defaut pour éviter le rechargement
document.getElementById('formulaire').addEventListener('submit', async function (event) {
    event.preventDefault();

    let titre = document.getElementById("titre").value;
    let categorie = document.getElementById("categorie").value;
    let details = document.getElementById("details").value;
    let utilisateur = document.getElementById("utilisateur").value;

    console.log(titre);
    console.log(categorie);
    console.log(details);
    console.log(utilisateur);

    let donneesFormulaire = { // convertir les données en format JSON
        titre: titre,
        categorie: categorie,
        details: details,
        utilisateur: utilisateur
    }

    let donneesJson = JSON.stringify(donneesFormulaire); // convertir les données du JSON en chaines
    console.log(donneesJson);

    // fonction de la doc https://developer.mozilla.org/fr/docs/Web/API/SubtleCrypto/digest
    async function digestMessage(message) {
        const msgUint8 = new TextEncoder().encode(message); // encode comme (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // fait le condensé
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convertit le buffer en tableau d'octet
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""); // convertit le tableau en chaîne hexadélimale
        return hashHex;
    }
    const digestHex = await digestMessage(donneesJson); // mettre en paramètre mes donnéesJson
    console.log(digestHex);
});


