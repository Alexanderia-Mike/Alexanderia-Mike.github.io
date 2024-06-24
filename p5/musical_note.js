const CANVAS_WIDTH = 178;
const CANVAS_HEIGHT = 178;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;
const ICON_DIAMETER = 50;
const ICON_RADIUS = ICON_DIAMETER / 2;
const MOON_COUNT = 100;

function setup() {
    const canvasElement = document.getElementById('p5_canvas_container');
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.id('canvas');
    canvas.position(0, 0, 'relative');
    canvas.style('z-index', 20);
    canvas.parent(canvasElement);
}

function drawMoons() {
    // calculate angle
    const dx = mouseX - CENTER_X;
    const dy = mouseY - CENTER_Y;
    const angle = atan2(dy, dx);

    // calculate distances
    const distanceLimit = min(CENTER_X, CENTER_Y);
    const distToCenter = sqrt( pow(dx, 2) + pow(dy, 2) );
    const logDist = max( distanceLimit - 2 - 2000 / distToCenter, 0 );
    const moonDistances = [];
    for (let i = 0; i < MOON_COUNT; ++i) {
        moonDistances.push(logDist / MOON_COUNT * i);
    }

    // set radius
    const moonRadiuses = [];
    const largest = 41;
    const smallest = 1;
    for (let i = 0; i < MOON_COUNT; ++i) {
        const largePerc = (MOON_COUNT - i) / MOON_COUNT;
        const largePercSquared = pow(largePerc, 1.2);
        moonRadiuses.push( smallest * (1 - largePercSquared) + largest * largePercSquared );
    }

    // set moon colors
    const moonColors = [];
    const brightest = 255;
    const darkest = 200 / (distanceLimit - ICON_RADIUS) * (logDist - ICON_RADIUS);
    for (let i = 0; i < MOON_COUNT; ++i) {
        moonColors.push( (darkest * i + brightest * (MOON_COUNT - i)) / MOON_COUNT );
    }

    // draw individual moons
    function drawMoon(angle, dist, radius, color) {
        fill(color);
        const moonX = CENTER_X + dist * cos(angle);
        const moonY = CENTER_Y + dist * sin(angle);
        circle(moonX, moonY, 2 * radius);
    }
    noStroke();
    for (let i = 0; i < MOON_COUNT; ++i) {
        drawMoon(angle, moonDistances[i], moonRadiuses[i], moonColors[i]);
    }
}

function draw() {
    clear();
    background(`rgba(0, 0, 0, 0)`);
    noFill();

    drawMoons();
}