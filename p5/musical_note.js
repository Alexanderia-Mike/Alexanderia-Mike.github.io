const CANVAS_WIDTH = 146;
const CANVAS_HEIGHT = 146;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;
const ORBIT_DIAMETER = 110;
const ORBIT_RADIUS = ORBIT_DIAMETER / 2;
const MOON_DIAMETER = 16;
const MOON_RADIUS = MOON_DIAMETER / 2;

function setup() {
    const canvasElement = document.getElementById('p5_canvas_container');
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.id('canvas');
    canvas.position(0, 0, 'relative');
    canvas.style('z-index', 2);
    canvas.parent(canvasElement);
}

function drawOrbit() {
    stroke('#aaa');
    circle(CENTER_X, CENTER_Y, ORBIT_DIAMETER);
}

function drawMoon() {
    const dx = mouseX - CENTER_X;
    const dy = mouseY - CENTER_Y;
    const angle = atan2(dy, dx);

    const moonX = CENTER_X + ORBIT_RADIUS * cos(angle);
    const moonY = CENTER_Y + ORBIT_RADIUS * sin(angle);

    const moonColor = '#000';
    fill(moonColor);
    noStroke();
    circle(moonX, moonY, MOON_DIAMETER);
}

function draw() {
    clear();
    background(`rgba(0, 0, 0, 0)`);
    noFill();
    drawOrbit();

    drawMoon();
}