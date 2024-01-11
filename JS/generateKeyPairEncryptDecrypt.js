// Generate new key pair
// générer une paire de clés
// phrase de passe -> mot de passe utilisateur sert a chiffrer la clé
// on chifre avec la privée on déchiffre avec la publique
// Utiliser format armored pour les clés -> format lisible text

// Appeler la bibliotheque openpgp
import { generateKey } from 'openpgp'; // use as CommonJS, AMD, ES6 module or via window.openpgp

(async function GenerateKeyPair() {
    const { privateKey, publicKey } = await generateKey({
        type: 'rsa', // Type of the key
        rsaBits: 2047, // RSA key size (defaults to 4096 bits)
        userIDs: [{ name: 'Jon Doe', email: 'jon@example.com' }], // you can pass multiple user IDs
        passphrase: 'super long and hard to guess secret' // protects the private key
    });

    console.log(privateKey);
    console.log(publicKey);
})();

// fonction encrypt et decrypt le message et fonction decrypt le message


//     (async function encryptDecryptMessage() {
//         // put keys in backtick (``) to avoid errors caused by spaces or tabs
//         const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
// ...
// -----END PGP PUBLIC KEY BLOCK-----`;
//         const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----
// ...
// -----END PGP PRIVATE KEY BLOCK-----`; // encrypted private key
//         const passphrase = `yourPassphrase`; // what the private key is encrypted with

//         const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

//         const privateKey = await openpgp.decryptKey({
//             privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
//             passphrase
//         });

//         const encrypted = await openpgp.encrypt({
//             message: await openpgp.createMessage({ text: 'Hello, World!' }), // input as Message object
//             encryptionKeys: publicKey,
//             signingKeys: privateKey // optional
//         });
//         console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

//         const message = await openpgp.readMessage({
//             armoredMessage: encrypted // parse armored message
//         });
//         const { data: decrypted, signatures } = await openpgp.decrypt({
//             message,
//             verificationKeys: publicKey, // optional
//             decryptionKeys: privateKey
//         });
//         console.log(decrypted); // 'Hello, World!'
//         // check signature validity (signed messages only)
//         try {
//             await signatures[0].verified; // throws on invalid signature
//             console.log('Signature is valid');
//         } catch (e) {
//             throw new Error('Signature could not be verified: ' + e.message);
//         }
//     })();


// en 3 fonctions , générer les clés, ensuite je chiffre un message, ensuite je déchiffre le message

