const roulette = document.getElementById("roulette");
const spinBtn = document.getElementById("spin");

// Options de la roulette
const items = [
  "💰 10€", 
  "🛠️ Défi mécanique", 
  "🍔 Pause repas", 
  "🎁 Surprise", 
  "🚛 Mini-jeu", 
  "🎤 Chanter 5 sec"
];

// Couleurs style ETS2 (métallique / sombre)
const colors = ["#555","#666","#777","#555","#666","#777"];
const sliceAngle = 360 / items.length;

// Création des slices
items.forEach((item, i) => {
  const slice = document.createElement("div");
  slice.className = "slice";
  slice.style.background = colors[i % colors.length];
  slice.style.transform = `rotate(${i * sliceAngle}deg) skewY(-${90 - sliceAngle}deg)`;
  slice.textContent = item;
  roulette.appendChild(slice);
});

// Fonction pour tourner
spinBtn.addEventListener("click", () => {
  const spins = 6; // nombre de tours complets
  const randomIndex = Math.floor(Math.random() * items.length);
  const rotateDegree = 360 * spins + (360 - randomIndex * sliceAngle - sliceAngle/2);
  
  roulette.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
  roulette.style.transform = `rotate(${rotateDegree}deg)`;
});
