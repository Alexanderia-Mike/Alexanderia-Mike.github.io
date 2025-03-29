import React, { useEffect, useState } from 'react'
import * as Tone from 'tone'

export function Test() {
    const [sampler, setSampler] = useState<Tone.Sampler | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [contextStarted, setContextStarted] = useState(false)

    // Initialize sampler on component mount
    useEffect(() => {
        const newSampler = new Tone.Sampler({
            urls: {
                C4: 'assets/audio_compressed/Piano.ff.C4.aiff',
            },
            release: 1,
            volume: -10,
            onload: () => setIsLoaded(true),
        }).toDestination()

        setSampler(newSampler)

        // Cleanup
        return () => {
            newSampler.dispose()
        }
    }, [])

    const playNote = async () => {
        if (!sampler || !isLoaded) return

        try {
            // Only start context if it hasn't been started yet
            if (!contextStarted) {
                await Tone.start()
                setContextStarted(true)
            }

            // Ensure context is running before playing
            if (Tone.context.state !== 'running') {
                await Tone.context.resume()
            }

            sampler.triggerAttackRelease('C4', '8n')
        } catch (error) {
            console.error('Error playing note:', error)
        }
    }

    return (
        <div className="App">
            <button onClick={playNote} disabled={!isLoaded}>
                {isLoaded ? 'Play Note' : 'Loading...'}
            </button>
        </div>
    )
}
