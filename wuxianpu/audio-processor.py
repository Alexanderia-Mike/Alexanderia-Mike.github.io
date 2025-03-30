import os
import librosa
import soundfile as sf
import numpy as np
from pydub import AudioSegment

def trim_silence(audio, sr, threshold_db=-40, min_end_duration=5):
    """
    Trim silence from the beginning, but keep at least 5s at the end if possible
    """
    # Convert threshold from dB to amplitude
    threshold = 10 ** (threshold_db / 20)
    
    # Find non-silent regions
    energy = librosa.feature.rms(y=audio)[0]
    frames = range(len(energy))
    indices = librosa.frames_to_samples(frames, hop_length=512)
    
    # Find start point where audio exceeds threshold
    mask = energy > threshold
    if not np.any(mask):
        return audio  # Return original if all silent
    
    start_idx = indices[np.where(mask)[0][0]]
    
    # Calculate total duration in seconds
    total_duration = len(audio) / sr
    
    # Calculate minimum samples to keep at the end (5 seconds or less if audio is shorter)
    min_end_samples = min(int(min_end_duration * sr), len(audio))
    
    # Find natural end point (last non-silent sample)
    end_idx = indices[np.where(mask)[0][-1]]
    
    # If there's enough audio after trimming the start, ensure at least 5s from the end
    if total_duration > min_end_duration:
        # Move end_idx back to include at least 5s, but not beyond the original length
        desired_end_idx = len(audio) - min_end_samples
        end_idx = max(end_idx, desired_end_idx)
    
    # Ensure end_idx doesn't exceed audio length
    end_idx = min(end_idx, len(audio))
    
    return audio[start_idx:end_idx]

def is_note_above_c7(filename):
    """
    Check if the note in the filename is above C7 (assuming filename contains note like 'C4', 'D7')
    """
    # Common note names
    notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    for note in notes:
        if note in filename:
            # Extract octave number (assuming format like 'C4', 'G#7')
            idx = filename.index(note) + len(note)
            if idx < len(filename) and filename[idx].isdigit():
                octave = int(filename[idx])
                if (note == 'C' and octave > 7) or (octave >= 8):
                    return True
                # Check if note is above C7 in the same octave
                if octave == 7 and notes.index(note) > notes.index('C'):
                    return True
    return False

def process_audio_files(input_dir, output_dir, max_duration=20, bitrate_factor=0.1):
    """
    Batch process AIFF files with conditional downsampling based on note
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith('.aiff') or filename.lower().endswith('.aif'):
            input_path = os.path.join(input_dir, filename)
            
            try:
                audio, sr = librosa.load(input_path, sr=None, mono=True)
                trimmed_audio = trim_silence(audio, sr)
                max_samples = int(max_duration * sr)
                if len(trimmed_audio) > max_samples:
                    trimmed_audio = trimmed_audio[:max_samples]
                
                # Decide whether to downsample based on note
                if is_note_above_c7(filename):
                    # No downsampling for notes above C7
                    processed_audio = trimmed_audio
                    target_sr = sr  # Keep original sample rate
                else:
                    # Downsample for notes C7 and below
                    target_sr = max(int(sr * bitrate_factor), 1000)
                    processed_audio = librosa.resample(trimmed_audio, orig_sr=sr, target_sr=target_sr)
                
                # Save as temporary WAV
                temp_filename = os.path.splitext(filename)[0] + '_temp.wav'
                temp_path = os.path.join(output_dir, temp_filename)
                sf.write(temp_path, processed_audio, target_sr, subtype='PCM_16')
                
                # Convert to MP3
                output_filename = os.path.splitext(filename)[0] + '.mp3'
                output_path = os.path.join(output_dir, output_filename)
                audio_segment = AudioSegment.from_wav(temp_path)
                audio_segment.export(output_path, format="mp3", bitrate="32k")
                os.remove(temp_path)
                
                print(f"Processed: {filename} -> {output_filename}")
                
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

def main():
    input_directory = "/Users/louchenfei/Alexanderia-Mike.github.io/wuxianpu/assets/audio_raw"  # Replace with your input directory path
    output_directory = "/Users/louchenfei/Alexanderia-Mike.github.io/wuxianpu/assets/audio_compressed"  # Replace with your output directory path
    process_audio_files(input_directory, output_directory)

if __name__ == "__main__":
    main()