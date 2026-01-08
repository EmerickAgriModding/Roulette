const canvas = document.getElementById('roulette');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin');

const items = ["💰 10€","🛠️ Défi","🍔 Pause","🎁 Surprise","🚛 Mini-jeu","🎤 Chanter"];
const colors = ["#0ff","#00aabb","#009999","#00ccff","#00ffff","#00ddff"];
const numSegments = items.length;
let angle = 0;

// Fonction pour dessiner la roulette WizBot
function drawWheel() {
    const radius = canvas.width / 2;
    const centerX = radius;
    const centerY = radius;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i=0; i<numSegments; i++){
        const startAngle = (i * 2 * Math.PI / numSegments) + angle;
        const endAngle = ((i+1) * 2 * Math.PI / numSegments) + angle;

        // Segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Texte style WizBot
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + (endAngle-startAngle)/2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#0ff";
        ctx.font = "bold 16px Arial";
        ctx.shadowColor = "#0ff";
        ctx.shadowBlur = 10;
        ctx.fillText(items[i], radius - 10, 5);
        ctx.restore();
    }
}

// Fonction pour tourner la roulette
function spinWheel() {
    const spins = 6;
    const randomIndex = Math.floor(Math.random() * items.length);
    const finalAngle = 2 * Math.PI * spins + (2*Math.PI - randomIndex*2*Math.PI/numSegments - Math.PI/numSegments);

    let current = 0;
    const steps = 120;
    const increment = (finalAngle - current)/steps;
    let step = 0;

    const animate = () => {
        if(step < steps){
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
