
start();


// On crée une fonction de RÉCUPÉRATION DU FICHIER JSON contenant le quiz
// également en “async” car elle utilise fetch() et “await”
async function getJson()
{
   // On récupère les données avec la fonction fetch()
   // Ici le fichier s'appelle data.json et il est situé à la racine "/" du dossier projet
   const data = await fetch("http://localhost:5500/data.json");
   return data.json(); // Retourne les données au format Json
}




// FONCTION PRINCIPALE DE L'APPLICATION
// Il faut la définir en “async” (asynchrone)
// car elle utilise fetch() (et “await” pour attendre une réponse)
async function start()
{
   // On récupère le tableau complet json
   allQuestions = await getJson();

   // On mélange le tableau
   shuffleArray(allQuestions);

   // On sélectionne les 4 premières questions du tableau
   allQuestions = allQuestions.slice(0, 4);
   
   

   // *** AFFICHAGE DES QUESTIONS ET PROPOSITIONS ***
   // Boucle parcourant les 4 questions (avec la fonction ForEach)
   allQuestions.forEach((question, indexQuestion) =>
   {
      // * QUESTION *
      indexQuestion++; // +1 car foreach commence à 0 alors que nos id des <h2> commencent à 1
      var questionTitle = question.question;
      // Affichage de la question
      document.getElementById('question' + indexQuestion).innerText = questionTitle;


      // * PROPOSITIONS *
      var propositions = question.propositions;

      // Une autre boucle parcourant les 4 propositions
      propositions.forEach((proposition, indexProposition) =>
      {
         indexProposition++; // encore +1 pour les id des <label> (proposition1-1, proposition3-2...)

         // Ecriture de l'id de l'élément où afficher la proposition (proposition1-1, proposition3-2...)
         var id = 'proposition' + indexQuestion + '-' + indexProposition;
         // Affichage de la proposition
         document.getElementById(id).innerText = proposition;
      })

   })

}

// Fonction de MÉLANGE ALÉATOIRE d’un tableau
function shuffleArray(array) {
   return array.sort(() => 0.5 - Math.random());
}





 
