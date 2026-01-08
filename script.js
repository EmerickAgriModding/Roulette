const canvas = document.getElementById('roulette');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin');

const items = ["💰 10€","🛠️ Défi mécanique","🍔 Pause repas","🎁 Surprise","🚛 Mini-jeu","🎤 Chanter 5 sec"];
const colors = ["#555","#666","#777","#555","#666","#777"];
const numSegments = items.length;
let angle = 0; // angle actuel

// Fonction pour dessiner la roulette
function drawWheel() {
    const radius = canvas.width / 2;
    const centerX = radius;
    const centerY = radius;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i=0; i<numSegments; i++) {
        const startAngle = (i * 2 * Math.PI / numSegments) + angle;
        const endAngle = ((i+1) * 2 * Math.PI / numSegments) + angle;

        // Segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Texte
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + (endAngle-startAngle)/2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#ffeb3b";
        ctx.font = "16px Arial Black";
        ctx.fillText(items[i], radius - 10, 5);
        ctx.restore();
    }
}

// Fonction pour tourner la roulette
function spinWheel() {
    const spins = 5; // tours complets
    const randomIndex = Math.floor(Math.random() * items.length);
    const finalAngle = 2 * Math.PI * spins + (2*Math.PI - randomIndex*2*Math.PI/numSegments - Math.PI/numSegments);

    let current = 0;
    const steps = 100;
    const increment = (finalAngle - current)/steps;
    let step = 0;

    const animate = () => {
        if(step < steps) {
            angle += increment;
            drawWheel();
            step++;
            requestAnimationFrame(animate);
        }
    }
    animate();
}

drawWheel();

spinBtn.addEventListener('click', spinWheel);
