/**
 * Nexora Labs - Firebase Configuration & Database Access
 * 
 * INSTRUCTIONS:
 * 1. Créez un projet sur la console Firebase (https://console.firebase.google.com).
 * 2. Activez la base de données Firestore en mode production ou test.
 * 3. Copiez vos clés de configuration Firebase et remplacez l'objet 'firebaseConfig' ci-dessous.
 * 4. Les formulaires de contact et les configurations du simulateur de projet seront 
 *    automatiquement sauvegardés dans vos collections Firestore 'contacts' et 'estimates'.
 */

// Configuration Firebase fictive - Remplacer par vos propres clés
const firebaseConfig = {
    apiKey: "AIzaSyDummyKeyHere-ReplaceWithYourOwnKey",
    authDomain: "nexora-labs.firebaseapp.com",
    projectId: "nexora-labs",
    storageBucket: "nexora-labs.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// Initialiser Firebase (Compat Mode pour Script HTML direct)
let db = null;
try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("Firebase Firestore initialisé avec succès ⚡");
    } else {
        console.warn("Le SDK Firebase n'est pas chargé. Les données seront stockées localement en fallback.");
    }
} catch (error) {
    console.error("Erreur d'initialisation de Firebase:", error);
}

/**
 * Sauvegarder un message de contact dans Firestore
 * @param {Object} contactData 
 * @returns {Promise}
 */
async function saveContactMessage(contactData) {
    const data = {
        ...contactData,
        createdAt: new Date().toISOString()
    };
    
    if (db) {
        try {
            await db.collection('contacts').add(data);
            console.log("Message de contact enregistré sur Firebase Firestore.");
            return true;
        } catch (error) {
            console.error("Erreur d'écriture sur Firestore (contacts):", error);
            saveToLocalStorage('local_contacts', data);
            return false;
        }
    } else {
        console.log("Firebase indisponible. Enregistrement en LocalStorage (fallback).");
        saveToLocalStorage('local_contacts', data);
        return true;
    }
}

/**
 * Sauvegarder une estimation de projet dans Firestore
 * @param {Object} estimateData 
 * @returns {Promise}
 */
async function saveProjectEstimate(estimateData) {
    const data = {
        ...estimateData,
        createdAt: new Date().toISOString()
    };
    
    if (db) {
        try {
            await db.collection('estimates').add(data);
            console.log("Estimation de projet enregistrée sur Firebase Firestore.");
            return true;
        } catch (error) {
            console.error("Erreur d'écriture sur Firestore (estimates):", error);
            saveToLocalStorage('local_estimates', data);
            return false;
        }
    } else {
        console.log("Firebase indisponible. Enregistrement en LocalStorage (fallback).");
        saveToLocalStorage('local_estimates', data);
        return true;
    }
}

/**
 * Fallback LocalStorage si Firebase n'est pas configuré
 */
function saveToLocalStorage(key, data) {
    try {
        let items = JSON.parse(localStorage.getItem(key)) || [];
        items.push(data);
        localStorage.setItem(key, JSON.stringify(items));
    } catch (e) {
        console.error("Erreur lors de l'enregistrement LocalStorage:", e);
    }
}
