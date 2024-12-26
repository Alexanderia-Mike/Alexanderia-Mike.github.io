const canvas = document.getElementById("staffCanvas");
const ctx = canvas.getContext("2d");
const noteInput = document.getElementById("noteInput");
const clefSwitch = document.getElementById("clefSwitch");
const feedback = document.getElementById("feedback");
const trebleImage = document.getElementById("gaoyin-image");
const bassImage = document.getElementById("diyin-image");
const score = document.getElementById("score-counting");
const correctCount = document.getElementById("correct");
const totalCount = document.getElementById("total");
const BASS_HEIGHT = 200

score.style.display = "none";
bassImage.style.transform = `translateY(${BASS_HEIGHT}px)`;

let currentNote = null;
let clef = "treble"; // Default clef is "treble"
const NOTE_X = 450;
let correct = total = 0;

// Notes data (mapping positions to note names)
const notes = {
    "treble": [
        { name: "e3", y: 30 },
        { name: "d3", y: 40 },
        { name: "c3", y: 50 },
        { name: "b2", y: 60 },
        { name: "a2", y: 70 },
        // below need additional staff
        { name: "g2", y: 80 },
        { name: "f2", y: 90 },
        { name: "e2", y: 100 },
        { name: "d2", y: 110 },
        { name: "c2", y: 120 },
        { name: "b1", y: 130 },
        { name: "a1", y: 140 },
        { name: "g1", y: 150 },
        { name: "f1", y: 160 },
        { name: "e1", y: 170 },
        { name: "d1", y: 180 },
        // above need additional staff
        { name: "c1", y: 190 },
        { name: "b", y: 200 },
        { name: "a", y: 210 },
        { name: "g", y: 220 },
        { name: "f", y: 230 },
    ],
    "bass": [
        { name: "g1", y: 30 },
        { name: "f1", y: 40 },
        { name: "e1", y: 50 },
        { name: "d1", y: 60 },
        { name: "c1", y: 70 },
        // below need additional staff
        { name: "b", y: 80 },
        { name: "a", y: 90 },
        { name: "g", y: 100 },
        { name: "f", y: 110 },
        { name: "e", y: 120 },
        { name: "d", y: 130 },
        { name: "c", y: 140 },
        { name: "B", y: 150 },
        { name: "A", y: 160 },
        { name: "G", y: 170 },
        { name: "F", y: 180 },
        // above need additional staff
        { name: "E", y: 190 },
        { name: "D", y: 200 },
        { name: "C", y: 210 },
        { name: "B1", y: 220 },
        { name: "A1", y: 230 },
    ]
};

// Draw the staff lines
function drawStaffSingle(baseHeight, coniderNote) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    const drawStaffHelper = (height, begin, end) => {
        ctx.beginPath();
        ctx.moveTo(begin, height + baseHeight);
        ctx.lineTo(end, height + baseHeight);
        ctx.stroke();
    }

    // common staff
    for (let i = 90; i <= 170; i += 20) {
        drawStaffHelper(i, 50, 750);
    }

    if (coniderNote && currentNote != null) {
        // additional staff below
        for (let i = 190; i <= currentNote.y; i += 20) {
            drawStaffHelper(i, NOTE_X - 25, NOTE_X + 25);
        }

        // additional staff above
        const base = Math.ceil((currentNote.y + 10) / 20) * 20 - 10;
        for (let i = base; i < 80; i += 20) {
            drawStaffHelper(i, NOTE_X - 25, NOTE_X + 25);
        }
    }
}

function drawStaff() {
    drawStaffSingle(0, clef == "treble");
    drawStaffSingle(BASS_HEIGHT, clef == "bass");
}

// Draw a note on the staff
function drawNote(baseHeight) {
    currentNote = notes[clef][Math.floor(Math.random() * notes[clef].length)];
    if (currentNote.y > 180 || currentNote.y < 80) {

    }
    ctx.beginPath();
    ctx.arc(NOTE_X, currentNote.y + baseHeight, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();
}

// Handle the "Generate Exercise" button
document.getElementById("generateButton").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNote(clef == "treble" ? 0 : BASS_HEIGHT);
    drawStaff();
    feedback.textContent = "";
    noteInput.value = "";
});

// Handle the "Submit Answer" button
document.getElementById("submitButton").addEventListener("click", () => {
    const userAnswer = noteInput.value.trim();
    total += 1;
    if (userAnswer === currentNote.name) {
        feedback.textContent = "✅ 正确！";
        feedback.style.color = "green";
        correct += 1;
    } else {
        feedback.textContent = `❌ 错误！正确答案是 ${currentNote.name}`;
        feedback.style.color = "red";
    }
    score.style.display = "";
    correctCount.innerHTML = ` ${correct} `;
    totalCount.innerHTML = ` ${total} `;
});

clefSwitch.addEventListener("change", () => {
    currentNote = null;
    clef = clefSwitch.checked ? "bass" : "treble";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStaff();
});

document.getElementById("clearCount").onclick = () => {
    score.style.display = "none";
    correct = total = 0;
}

// Initialize with a staff and note
drawStaff();
