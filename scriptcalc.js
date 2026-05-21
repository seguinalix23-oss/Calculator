// 1. Définition des variables globales
const ecran = document.getElementById("screen");
const btnNum = document.querySelectorAll(".btnNum");
const btnOp = document.querySelectorAll(".btnOp");
const btnCan = document.querySelectorAll(".btnCan");
const btnEgal = document.getElementById("egal");

// 2. Fonctions d'opérations mathématiques
function addition(a, b) {
    return a + b;
}
function soustraction(a, b) {
    return a - b;
}
function multiplication(a, b) {
    return a * b;
}
function division(a, b) {
    if (b === 0) {
        return "Erreur";
    }
    return a / b;
}
function pourcentage(a, b) {
    return (a * b) / 100;
}

// Fonction centrale de aiguillage du calcul
function egal(a, b, op) {
    switch (op) {
        case "+": return addition(a, b);
        case "-": return soustraction(a, b);
        case "x": return multiplication(a, b);
        case "/": return division(a, b);
        case "%": return pourcentage(a, b);
        default: return "Erreur";
    }
}

// 3. Écouteurs d'événements pour les chiffres
btnNum.forEach(function(button) {
    button.addEventListener("click", function() {
        if (ecran.textContent === "0" || ecran.textContent === "Erreur") {
            ecran.textContent = button.textContent;
        } else {
            ecran.textContent = ecran.textContent + button.textContent;
        }
    });
});

// 4. Écouteurs d'événements pour les opérateurs
btnOp.forEach(function(button) {
    button.addEventListener("click", function() {
        // On évite d'ajouter un opérateur si l'écran affiche une erreur
        if (ecran.textContent === "Erreur") return;
        
        // Optionnel : On peut ajouter ici une sécurité pour ne pas mettre deux opérateurs à la suite
        ecran.textContent = ecran.textContent + button.textContent;
    });
});

// 5. Écouteur d'événement pour le bouton Annuler (C)
btnCan.forEach(function(button) {
    button.addEventListener("click", function() {
        ecran.textContent = "0";
    });
});


// 6. Gestionnaire du bouton Égal (=) : Analyse et exécution du calcul
btnEgal.addEventListener("click", function() {
    const expression = ecran.textContent;

    // CORRECTION : On remplace \* par x dans la liste des opérateurs autorisés
    const match = expression.match(/(\d+\.?\d*)([\+\-\x\/])(\d+\.?\d*)/);

    if (match) {
        // Traduction des textes extraits en nombres réels
        const premierNombre = parseFloat(match[1]);
        const operateur = match[2];
        const deuxiemeNombre = parseFloat(match[3]);

        // Exécution du calcul via votre structure existante
        const resultat = egal(premierNombre, deuxiemeNombre, operateur);

        // Affichage du résultat sur l'écran
        ecran.textContent = resultat;
    } else {
        // Si l'expression n'est pas complète ou valide
        ecran.textContent = "Erreur";
    }
});