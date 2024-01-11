// En 3 fonctions , générer les clés, ensuite je chiffre un message, ensuite je déchiffre le message
// Generate new key pair = générer une paire de clés
// phrase de passe -> mot de passe utilisateur sert a chiffrer la clé
// on chifre avec la privée on déchiffre avec la publique
// Utiliser format armored pour les clés -> format lisible text

// Openpgp appelé avec un CDN dans le html

// fonction de la doc : https://github.com/openpgpjs/openpgpjs/blob/main/README.md#generate-new-key-pair
async function generateKeyPair() {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'ecc', // Type of the key, defaults to ECC
        curve: 'curve25519', // ECC curve name, defaults to curve25519
        userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
        passphrase: 'super long and hard to guess secret', // protects the private key
        format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });
    console.log(privateKey);     // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
    console.log(publicKey);      // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

    return (publicKey) //  return {} les crochets permettent de retourner un tableau valeurs avec return{}
};

// fonction chiffrer 
async function chiffrerMessage() {
    let publicKey = await generateKeyPair();

}



// fonction chiffrer (privée, message)
// fonction déchiffrer (publique, chiffre)
// fonction encrypt et decrypt le message et fonction decrypt le message
// Fonction pour chiffrer et déchiffrer un message
// Trouver comment mettre en paramètre la publicKey et la privateKey dans la fonction encryptAndDecryptMessage

