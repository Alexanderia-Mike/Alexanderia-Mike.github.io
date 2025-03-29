import os
import librosa
import soundfile as sf
import numpy as np
from pydub import AudioSegment

def trim_silence(audio, sr, threshold_db=-60):
    """
    Trim silent parts from the beginning and end of audio
    """
    # Convert threshold from dB to amplitude
    threshold = 10 ** (threshold_db / 20)
    
    # Find non-silent regions
    energy = librosa.feature.rms(y=audio)[0]
    frames = range(len(energy))
    indices = librosa.frames_to_samples(frames, hop_length=512)
    
    # Find start and end points where audio exceeds threshold
    mask = energy > threshold
    if not np.any(mask):
        return audio  # Return original if all silent
    
    start_idx = indices[np.where(mask)[0][0]]
    end_idx = indices[np.where(mask)[0][-1]]
    
    return audio[start_idx:end_idx]

def process_audio_files(input_dir, output_dir, max_duration=20, bitrate_factor=0.1):
    """
    Batch process AIFF files with trimming, duration limiting, compression, and MP3 conversion
    """
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Process each AIFF file in input directory
    for filename in os.listdir(input_dir):
        if filename.lower().endswith('.aiff') or filename.lower().endswith('.aif'):
            input_path = os.path.join(input_dir, filename)
            
            try:
                # Load audio file
                audio, sr = librosa.load(input_path, sr=None, mono=True)
                
                # 1. Trim silence
                trimmed_audio = trim_silence(audio, sr)
                
                # 2. Limit to 20 seconds
                max_samples = int(max_duration * sr)
                if len(trimmed_audio) > max_samples:
                    trimmed_audio = trimmed_audio[:max_samples]
                
                # 3. Calculate reduced bitrate through resampling
                target_sr = int(sr * bitrate_factor)
                if target_sr < 1000:  # Minimum reasonable sample rate
                    target_sr = 1000
                
                # Resample to reduce bitrate
                compressed_audio = librosa.resample(trimmed_audio, orig_sr=sr, target_sr=target_sr)
                
                # 4. Save as temporary WAV file (pydub needs an intermediate file)
                temp_filename = os.path.splitext(filename)[0] + '_temp.wav'
                temp_path = os.path.join(output_dir, temp_filename)
                sf.write(temp_path, compressed_audio, target_sr, subtype='PCM_16')
                
                # 5. Convert to MP3
                output_filename = os.path.splitext(filename)[0] + '.mp3'
                output_path = os.path.join(output_dir, output_filename)
                
                # Load temporary WAV and export as MP3
                audio_segment = AudioSegment.from_wav(temp_path)
                audio_segment.export(output_path, format="mp3", bitrate="32k")  # 32k bitrate for compression
                
                # Clean up temporary file
                os.remove(temp_path)
                
                print(f"Processed: {filename} -> {output_filename}")
                
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

def main():
    # Example usage
    input_directory = "/Users/louchenfei/Alexanderia-Mike.github.io/wuxianpu/assets/audio_raw"  # Replace with your input directory path
    output_directory = "/Users/louchenfei/Alexanderia-Mike.github.io/wuxianpu/assets/audio_compressed"  # Replace with your output directory path
    
    process_audio_files(input_directory, output_directory)

if __name__ == "__main__":
    main()