const canvas = document.getElementById('roulette');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin');

// Actions Minecraft
const items = [
    "⛏ Miner",
    "🪓 Couper",
    "⚔️ Combattre",
    "🏹 Chasser",
    "🏗 Construire",
    "🎁 Coffre"
];

// Couleurs blocs Minecraft
const colors = ["#d9d9d9","#8b4513","#228B22","#ffcc00","#8a2be2","#00bfff"];
const numSegments = items.length;
let angle = 0;

// Dessiner la roulette
function drawWheel() {
    const radius = canvas.width / 2;
    const centerX = radius;
    const centerY = radius;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i=0; i<numSegments; i++){
        const startAngle = (i * 2 * Math.PI / numSegments) + angle;
        const endAngle = ((i+1) * 2 * Math.PI / numSegments) + angle;

        // Segment coloré
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Texte centré radialement
        const textAngle = startAngle + (endAngle - startAngle)/2;
        const textRadius = radius * 0.65; // distance du centre
        ctx.save();
        ctx.translate(centerX + Math.cos(textAngle) * textRadius,
                      centerY + Math.sin(textAngle) * textRadius);
        ctx.rotate(textAngle + Math.PI/2); // rotation pour suivre le segment
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px monospace";
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 5;
        ctx.fillText(items[i], 0, 0);
        ctx.restore();
    }
}

// Tourner la roulette
function spinWheel() {
    const spins = 6;
    const randomIndex = Math.floor(Math.random() * items.length);
    const finalAngle = 2 * Math.PI * spins + (2*Math.PI - randomIndex*2*Math.PI/numSegments - Math.PI/numSegments);

    let steps = 120;
    let increment = (finalAngle - angle)/steps;
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
