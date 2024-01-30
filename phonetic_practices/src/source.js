import * as Tone from 'tone'

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

function getNoteStr(note) {
    let base = Math.floor(note / 12)
    let remainder = note % 12
    let note_level = ""
    if (remainder == 0) note_level += "C"
    else if (remainder == 1) note_level += "Db"
    else if (remainder == 2) note_level += "D"
    else if (remainder == 3) note_level += "Eb"
    else if (remainder == 4) note_level += "E"
    else if (remainder == 5) note_level += "F"
    else if (remainder == 6) note_level += "Gb"
    else if (remainder == 7) note_level += "G"
    else if (remainder == 8) note_level += "Ab"
    else if (remainder == 9) note_level += "A"
    else if (remainder == 10) note_level += "Bb"
    else note_level += "B"
    return note_level + base
}

document.getElementById("audio_button").addEventListener('click', 
    async () => {
        await Tone.start()

        const synth = new Tone.Synth().toDestination()
        const now = Tone.now()
        const note_count = Number(document.getElementById("note_count").value)
        
        let start_time = now
        console.log("---------")
        for (let i = 0; i < note_count; ++i) {
            let note = getRandomInt(36, 61)
            let note_str = getNoteStr(note)
            console.log(`note is ${note_str}`)
            synth.triggerAttackRelease(note_str, "2n", start_time)
            start_time += 1
        }
    })