
var prenom = prompt ('Bienvenue sur le QUIZ!, veuillez entrer votre prénom')

start();

// ÉVENEMENT lorsque le FORMULAIRE est validé, la FONCTION VALIDATION() est déclenchée
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
      // On RECUPERE l'input de la réponse choisie parmi les 4 <input> de la question
      inputChecked = document.querySelector('input[name=question' + qIndex + ']:checked');

      // Si la REPONSE n'est pas VIDE
      if (inputChecked) {
         // REPONSE choisie
         var anwser = inputChecked.value; 
         // BONNE réponse
         var goodAnswer = allQuestions[qIndex].reponse; 
         var anecdote = allQuestions[qIndex].anecdote;
         var h3 = document.querySelector('#question' + qIndex + ' h3');
         
         // Si la REPONSE est BONNE
         if (anwser == goodAnswer) {
            score++; // +1 point


            // parentNode = Selectionne le parent de l'input
            // On AFFICHE la bonne réponse en VERT
            inputChecked.parentNode.classList.add("valid");
            // et l'ANECDOTE dans les balises h3
            h3.innerText = anecdote;
            
         }
            // et la mauvaise en ROUGE 
            else {
            inputChecked.parentNode.classList.add("invalid");
            }
         }

      }

   
   // On AFFICHE le SCORE
   document.getElementById('score').innerText = 'MEILLEURS SCORES : ' + score + ' /4';


var point = {        // je crée un objet
   prenom : prenom, score : score
 }

var scores = JSON.parse(localStorage.getItem("prenom")); // recuperer sous forme de tableau
console.log(scores);
if (scores === null){
scores = [];            //  je crée une tableau vide
}
scores.push(point);
localStorage.setItem("prenom",JSON.stringify(scores)); // j ajoute ou je mets a jour mon mlocalstorage et stringify le transforme en chaine JSON
scores.sort((a,b) => b.score - a.score);   // fonction sort premet de trier ( ici du plus grand au plus petit)
for( let i = 0; i < 5 ; i++){
const prenomScore = document.createTextNode((scores[i]. prenom) + " : "); //crée une constante qui va placer mes elements ou je veux
const scorestorage = document.createTextNode(scores[i].score);
var p = document.createElement("p");   //je crée un paragraphe avec la balise p
var topscore = document.getElementById("score");   //recupre ma div dans mon HTML
p.appendChild(prenomScore);      //dans le p on insere la premiere partie de mon  createtxtnode 
p.appendChild(scorestorage);   //dans le p on insere la deuxieme partie de mon  createtxtnode 
topscore.appendChild(p);       // j insere mon element p dans ma div que j ai recuperer (var topscore)

}
}















// FONCTION de MÉLANGE ALÉATOIRE d’un tableau
function shuffleArray(array) {
   return array.sort(() => 0.5 - Math.random());
}

