// en 3 fonctions , générer les clés, ensuite je chiffre un message, ensuite je déchiffre le message
// Generate new key pair
// générer une paire de clés
// phrase de passe -> mot de passe utilisateur sert a chiffrer la clé
// on chifre avec la privée on déchiffre avec la publique
// Utiliser format armored pour les clés -> format lisible text

// Appeler la bibliotheque openpgp installée avec npm dans dossier node_modules
const openpgp = require('openpgp'); // Assuming openpgp is a CommonJS package

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

    return { publicKey, privateKey }
};

// fonction encrypt et decrypt le message et fonction decrypt le message
// Fonction pour chiffrer et déchiffrer un message
// Trouver comment mettre en paramètre la publicKey et la privateKey dans la fonction encryptAndDecryptMessage

async function encryptEtDecryptMessage(privateKeyArmored, publicKeyArmored) {

    const passphrase = 'super long and hard to guess secret'; // passphrase to decrypt private key

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase
    });

    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: 'Hello, World!' }), // input as Message object
        encryptionKeys: publicKey,
        signingKeys: privateKey // optional
    });
    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

    const message = await openpgp.readMessage({
        armoredMessage: encrypted // parse armored message
    });
    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        verificationKeys: publicKey, // optional
        decryptionKeys: privateKey
    });

    console.log(decrypted); // 'Hello, World!'
    // check signature validity (signed messages only)
    try {
        await signatures[0].verified; // throws on invalid signature
        console.log('Signature is valid');
    } catch (e) {
        throw new Error('Signature could not be verified: ' + e.message);
    }
}

async function main() {
    const { privateKey, publicKey } = await generateKeyPair();
    await encryptEtDecryptMessage(privateKey, publicKey);
}
main();