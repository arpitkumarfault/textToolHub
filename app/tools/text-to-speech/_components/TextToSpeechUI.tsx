"use client";

import { useState, useEffect } from "react";

export default function TextToSpeechUI() {
    const [text, setText] = useState("");
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<number>(0);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    // 1. Browser Native Playback (High Quality, Zero Latency)
    const handleSpeak = () => {
        if (!text) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices[selectedVoice] || null;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        window.speechSynthesis.speak(utterance);
    };

    // 2. Server-Side Download (Direct Download, No Permissions)
    const handleDownload = async () => {
        if (!text) return;
        setIsDownloading(true);

        try {
            // Determine language code from selected voice, or default to English
            const currentVoice = voices[selectedVoice];
            const langCode = currentVoice ? currentVoice.lang.split('-')[0] : 'en';

            // Call our Next.js API route
            const response = await fetch(`/api/tts?text=${encodeURIComponent(text)}&lang=${langCode}`);

            if (!response.ok) throw new Error("Generation failed");

            // Create a blob from the response and trigger download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "text-to-speech.mp3";
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            console.error("Download failed:", error);
            alert("Sorry, audio generation failed. Please try shorter text.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
    };

    const handlePause = () => window.speechSynthesis.pause();
    const handleResume = () => window.speechSynthesis.resume();

    return (
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            {/* Text Input */}
            <div className="mb-6">
                <label htmlFor="tts-text" className="mb-2 block font-semibold text-text-primary">
                    Enter Text to Convert to Speech
                </label>
                <textarea
                    id="tts-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="min-h-[200px] w-full rounded-lg border border-border p-3 bg-background text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            {/* Settings */}
            <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                    <label htmlFor="voice-select" className="mb-2 block text-sm font-medium text-text-secondary">
                        Voice
                    </label>
                    <select
                        id="voice-select"
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(Number(e.target.value))}
                        className="w-full rounded-lg border border-border p-2 bg-background text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        {voices.map((voice, index) => (
                            <option key={index} value={index}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
                </div>
                {/* Rate Slider */}
                <div>
                    <label htmlFor="rate" className="mb-2 block text-sm font-medium text-text-secondary">
                        Speed: {rate.toFixed(1)}x
                    </label>
                    <input
                        type="range"
                        id="rate"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
                {/* Pitch Slider */}
                <div>
                    <label htmlFor="pitch" className="mb-2 block text-sm font-medium text-text-secondary">
                        Pitch: {pitch.toFixed(1)}
                    </label>
                    <input
                        type="range"
                        id="pitch"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={pitch}
                        onChange={(e) => setPitch(Number(e.target.value))}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
                {/* Volume Slider */}
                <div>
                    <label htmlFor="volume" className="mb-2 block text-sm font-medium text-text-secondary">
                        Volume: {Math.round(volume * 100)}%
                    </label>
                    <input
                        type="range"
                        id="volume"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={handleSpeak}
                    disabled={!text || isPlaying}
                    className="rounded-lg bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primary/90 disabled:bg-primary/30 disabled:cursor-not-allowed"
                >
                    {isPlaying ? "Speaking..." : "🔊 Speak"}
                </button>

                <button
                    onClick={handleDownload}
                    disabled={!text || isDownloading}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-700"
                >
                    {isDownloading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>⬇️ Download MP3</>
                    )}
                </button>

                <button
                    onClick={handleStop}
                    disabled={!isPlaying}
                    className="rounded-lg border border-border bg-surface px-6 py-2 font-semibold text-text-primary transition hover:bg-background disabled:bg-surface/50 disabled:text-text-secondary disabled:cursor-not-allowed"
                >
                    ⏹️ Stop
                </button>
                <button
                    onClick={handlePause}
                    disabled={!isPlaying}
                    className="rounded-lg border border-border bg-surface px-6 py-2 font-semibold text-text-primary transition hover:bg-background disabled:bg-surface/50 disabled:text-text-secondary disabled:cursor-not-allowed"
                >
                    ⏸️ Pause
                </button>
                <button
                    onClick={handleResume}
                    className="rounded-lg border border-border bg-surface px-6 py-2 font-semibold text-text-primary transition hover:bg-background"
                >
                    ▶️ Resume
                </button>
            </div>

            <div className="mt-4 text-xs text-text-secondary">
                * Note: The &quot;Speak&quot; button uses your browser's voices. The &quot;Download&quot; button uses a standard MP3 generator, so the voice may sound slightly different.
            </div>
        </div>
    );
}