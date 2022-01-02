
start();

// ÉVENEMENT lorsque le formulaire est validé, la fonction validation() est déclenchée
document.querySelector('form').addEventListener('submit', validation);


// FONCTION de RÉCUPÉRATION DU FICHIER JSON contenant le quiz
// également en “async” car elle utilise fetch() et “await”
async function getJson()
{
   // On RECUPERE les données avec la fonction fetch()
   // Ici le fichier s'appelle data.json et il est situé à la racine "/" du dossier projet
   const data = await fetch("http://localhost:5500/data.json");
   return data.json(); // RETOURNE les données au format Json
}




// FONCTION PRINCIPALE DE L'APPLICATION
// Il faut la définir en “async” (asynchrone)
// car elle utilise fetch() (et “await” pour attendre une réponse)
async function start()
{
   // On RECUPERE le tableau complet json
   allQuestions = await getJson();

   // On MELANGE le tableau
   shuffleArray(allQuestions);

   // On SELECTIONNE les 4 premières QUESTIONS du tableau
   allQuestions = allQuestions.slice(0, 4);
   
   

   // *** AFFICHAGE DES QUESTIONS ET PROPOSITIONS ***
   // Un boucle parcourant les 4 questions (avec la fonction ForEach)
   for(let qIndex = 0; qIndex < allQuestions.length; qIndex++)
   {
      var question = allQuestions[qIndex]; // Contient les infos de la question en cours de boucle

      // * QUESTION *
      // On RECUPERE l'élément <h2> contenu dans la <div id="question0"> par exemple ('#question0 h2')
      var h2 = document.querySelector('#question' + qIndex + ' h2')
      // On AFFICHE la question
      h2.innerText = question.question;


      // * PROPOSITIONS *
      var propositions = question.propositions; // Contient les 4 propositions de la question
      // On RECUPERE les 4 éléments <label> contenu dans la <div id="question0"> par exemple
      var input = document.querySelectorAll('#question' + qIndex + ' input'); // SelectorAll des <input> ('#question0 input')
      var label = document.querySelectorAll('#question' + qIndex + ' label'); // SelectorAll des <label> ('#question0 label')

      // Une boucle pour PARCOURIR les 4 propositions
      for(let pIndex = 0; pIndex < propositions.length; pIndex++)
      {
         // On AFFICHE la proposition dans son <label>
         label[pIndex].innerText = propositions[pIndex];
         input[pIndex].setAttribute("value", propositions[pIndex]); // Définit la value de l'<input> s'il est choisi
         input[pIndex].setAttribute("id", propositions[pIndex]); // L'id de l'<input> pour le relier au texte de son <label>
         label[pIndex].setAttribute("for", propositions[pIndex]); // Le for du <label> pour le relier à sa case <input>
      }

   }
}


// VALIDATION DU QUIZ
function validation(event) {
   event.preventDefault(); // On BLOQUE le RAFRAICHISSEMENT de la page

   var score = 0; // On créé la VARIABLE du SCORE


   // On COMPTE le SCORE en parcourant les 4 questions
   for(let qIndex = 0; qIndex < allQuestions.length; qIndex++)
   {
      // On RECUPERE la valeur de la réponse choisie parmi les 4 <input> de la question
      inputChecked = document.querySelector('input[name=question' + qIndex + ']:checked');

      // Si la REPONSE n'est pas VIDE
      if (inputChecked) {
         var anwser = inputChecked.value; // Réponse choisie
         var goodAnswer = allQuestions[qIndex].reponse; // Bonne réponse
         
         // Si la REPONSE est BONNE
         if (anwser == goodAnswer) {
            score++; // +1 point
            
         }

      }

   }
   

   // On AFFICHE le SCORE
   document.getElementById('score').innerText = 'VOTRE SCORE : ' + score + ' /4';
}




// FONCTION de MÉLANGE ALÉATOIRE d’un tableau
function shuffleArray(array) {
   return array.sort(() => 0.5 - Math.random());
}
