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

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const handleSpeak = () => {
        if (!text) return;

        // Cancel any ongoing speech
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

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
    };

    const handlePause = () => {
        window.speechSynthesis.pause();
    };

    const handleResume = () => {
        window.speechSynthesis.resume();
    };

    return (
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
                {/* Voice Selection */}
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

                {/* Rate */}
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

                {/* Pitch */}
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

                {/* Volume */}
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

            {/* Info */}
            {voices.length === 0 && (
                <div className="mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 p-4 text-sm text-yellow-800 dark:text-yellow-500">
                    Loading voices... If no voices appear, your browser may not support Text-to-Speech.
                </div>
            )}
        </div>
    );
}