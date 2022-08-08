
var Name = prompt ('Bienvenue sur le QUIZ!, veuillez entrer votre prénom')

start();

// Lorsque le formulaire est validé, la fonction validation() est alors déclenchée
document.querySelector('form').addEventListener('submit', validation);


// On récupère le fichier JSON contenant le quiz
// également en “async” car elle utilise fetch() et “await”
async function getJson()
{
   // On récupère ici les données grâce à la fonction fetch()
   // Le fichier s'appelle data.json et il est situé à la racine "/" du dossier projet
   const data = await fetch("data.json");
   // On retourne les données au format Json ici
   return data.json(); 
}


//::::::::::::::::::::::::::::::::::::::FONCTION PRINCIPALE DE L'APPLICATION::::::::::::::::::::::::::::::::://

// Il faut la définir en “async” (asynchrone)
// car elle utilise fetch() (et “await” pour attendre une réponse)
async function start()
{
   // On récupère le tableau complet json
   Questions = await getJson();

   // Le tableau est mélangé
   shuffleArray(Questions);

   // Ici on selectionne les 4 première questions du tableau 
   Questions = Questions.slice(0, 4);
   
   

   //:::::::::::::::::::::::::::::::::::AFFICHAGE DES QUESTIONS ET PROPOSITIONS::::::::::::::::::::::::::::::://

   // Une boucle va alors parcourir les 4 questions grâce à la fonction ForEach
   for(let qIndex = 0; qIndex < Questions.length; qIndex++)
   {
      // Les informations concernant la questions en cours de boucle se trouve alors ici
      var question = Questions[qIndex]; 

      // * QUESTION *
      // On récupère l'élément <h2> qui se trouve dans la <div id="question0"> par exemple ('#question0 h2')
      var h2 = document.querySelector('#question' + qIndex + ' h2')
      // et on affiche la question
      h2.innerText = question.question;


      // * PROPOSITIONS *
      // Les 4 propositions de la question
      var propositions = question.propositions; 
      // On récupère les 4 éléments <label> se trouvant dans la <div id="question0"> par exemple
      var input = document.querySelectorAll('#question' + qIndex + ' input'); // SelectorAll des <input> ('#question0 input')
      var label = document.querySelectorAll('#question' + qIndex + ' label'); // SelectorAll des <label> ('#question0 label')

      // Une boucle va alors parcourir les 4 propositions
      for(let pIndex = 0; pIndex < propositions.length; pIndex++)
      {
         // On affiche alors la proposition dans son <label>
         label[pIndex].innerText = propositions[pIndex];
         // Définit la value de l'<input> s'il est choisi
         input[pIndex].setAttribute("value", propositions[pIndex]); 
         // L'id de l'<input> pour le relier au texte de son <label>
         input[pIndex].setAttribute("id", propositions[pIndex]); 
         // Le for du <label> pour le relier à sa case <input>
         label[pIndex].setAttribute("for", propositions[pIndex]); 
      }

   }
}


//::::::::::::::::::::::::::::::::::::::::::VALIDATION DU QUIZ:::::::::::::::::::::::::::::::::::::::::::::::://

function validation(event) {
   // On bloque le raffraichissement de la page
   event.preventDefault(); 
   // et on va créer la variable du score
   var score = 0; 


   // Les questions sont alors parcourus et le score se compte
   for(let qIndex = 0; qIndex < Questions.length; qIndex++)
   {
      // On récupère l'input de la réponse choisie parmi les 4 <input> de la question
      inputChecked = document.querySelector('input[name=question' + qIndex + ']:checked');

      // Si la réponse n'est pas VIDE
      if (inputChecked) {
         // Réponse choisie
         var reponse = inputChecked.value; 
         // Bonne réponse
         var bonneReponse = Questions[qIndex].reponse; 
         var anecdote = Questions[qIndex].anecdote;
         var h3 = document.querySelector('#question' + qIndex + ' h3');
         
         // Si la réponse est correct
         if (reponse == bonneReponse) {
            // Le score affiche alors +1 point
            score++; 


            // parentNode = Selectionne le parent de l'input
            // La bonne réponse est alors affichée en vert
            inputChecked.parentNode.classList.add("valid");
            
         }
            // si la réponse est incorrect elle sera affichée en rouge
            else {
            inputChecked.parentNode.classList.add("invalid");
            // Les balises h3 contiennent l'annecdote 
            h3.innerText = anecdote;
            }
         }

      }

   
   // Le score est affiché 
   document.getElementById('score').innerText = 'Meilleurs scores : ' + score + ' /4';


 // ::::::::::::::::::::::::::::::::::::::::PARTIE LOCALESTORAGE !:::::::::::::::::::::::::::::::::::::::::::://

var point = {       
    // Je crée un objet
   Name : Name, score : score
 }

var scores = JSON.parse(localStorage.getItem("Name")); 
// Je récupère sous forme de tableau
console.log(scores);
if (scores === null){
//  Je crée un tableau vide
scores = [];            

}
scores.push(point);
// J'ajoute et/ou mets à jour mon LOCALSTORAGE et STRINGIFY le TRANSFORME en chaine JSON
localStorage.setItem("Name",JSON.stringify(scores)); 
// Fonction  qui permet de trier les scores du plus petit au plus grand
scores.sort((a,b) => b.score - a.score);   
for( let i = 0; i < 5 ; i++){ 

// On crée une constante afin de placer mes éléments
const NameScore = document.createTextNode((scores[i]. Name) + " : ");
const scorestorage = document.createTextNode(scores[i].score);
// Ainsi qu'un paragraphe avec la balise P
var p = document.createElement("p");   
// On récupère la DIV dans mon fichier HTML
var classement = document.getElementById("score");   
// On commence à INSERER dans le P la partie du CREATETXTNODE
p.appendChild(NameScore);  
// Puis la dernière partie 
p.appendChild(scorestorage);   
// On insère P dans ma DIV que j ai récupéré (var classement)
classement.appendChild(p);       

   }
}



//::::::::::::::::::::::::::::::::::FONCTION de MÉLANGE ALÉATOIRE d’un tableau::::::::::::::::::::::::::::::::://

function shuffleArray(array) {
   return array.sort(() => 0.5 - Math.random());
}

