// Sound effects utility for the app
// Uses Web Audio API for simple sound generation

import { useState, useEffect, useCallback } from 'react'

class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return this.audioContext
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', String(enabled))
    }
  }

  isEnabled(): boolean {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('soundEnabled')
      if (saved !== null) {
        return saved === 'true'
      }
    }
    return this.enabled
  }

  // Play a simple beep/tone
  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.isEnabled()) return
    
    try {
      const ctx = this.getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = type
      oscillator.frequency.value = frequency

      gainNode.gain.setValueAtTime(volume, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch {
      // Ignore audio errors
    }
  }

  // Correct answer - happy ascending sound
  playCorrect() {
    if (!this.isEnabled()) return
    
    try {
      const ctx = this.getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      
      // Ascending notes: C -> E -> G
      const notes = [523.25, 659.25, 783.99] // C5, E5, G5
      const noteLength = 0.1

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
      
      notes.forEach((freq, i) => {
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * noteLength)
      })
      
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + notes.length * noteLength)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + notes.length * noteLength)
    } catch {
      // Ignore
    }
  }

  // Wrong answer - descending sound
  playWrong() {
    if (!this.isEnabled()) return
    
    try {
      const ctx = this.getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sawtooth'
      
      // Descending notes
      const notes = [400, 300, 200]
      const noteLength = 0.1

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
      
      notes.forEach((freq, i) => {
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * noteLength)
      })
      
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + notes.length * noteLength)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + notes.length * noteLength)
    } catch {
      // Ignore
    }
  }

  // Achievement unlocked - fanfare
  playAchievement() {
    if (!this.isEnabled()) return
    
    try {
      const ctx = this.getAudioContext()
      
      // Play a simple fanfare
      const notes = [
        { freq: 523.25, time: 0, dur: 0.15 },     // C5
        { freq: 659.25, time: 0.15, dur: 0.15 }, // E5
        { freq: 783.99, time: 0.3, dur: 0.15 },  // G5
        { freq: 1046.50, time: 0.45, dur: 0.3 }, // C6
      ]

      notes.forEach(({ freq, time, dur }) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = 'sine'
        oscillator.frequency.value = freq

        gainNode.gain.setValueAtTime(0.25, ctx.currentTime + time)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + dur)

        oscillator.start(ctx.currentTime + time)
        oscillator.stop(ctx.currentTime + time + dur)
      })
    } catch {
      // Ignore
    }
  }

  // Button click
  playClick() {
    this.playTone(800, 0.05, 'sine', 0.1)
  }

  // Level up
  playLevelUp() {
    if (!this.isEnabled()) return
    
    try {
      const ctx = this.getAudioContext()
      
      // Ascending arpeggio
      const notes = [392, 493.88, 587.33, 783.99, 987.77] // G4, B4, D5, G5, B5
      const noteLength = 0.1

      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = 'sine'
        oscillator.frequency.value = freq

        const startTime = ctx.currentTime + i * noteLength
        gainNode.gain.setValueAtTime(0.2, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2)

        oscillator.start(startTime)
        oscillator.stop(startTime + 0.2)
      })
    } catch {
      // Ignore
    }
  }

  // Streak sound
  playStreak() {
    if (!this.isEnabled()) return
    
    try {
      const ctx = this.getAudioContext()
      
      // Quick ascending notes
      const notes = [659.25, 783.99, 987.77] // E5, G5, B5
      
      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = 'triangle'
        oscillator.frequency.value = freq

        const startTime = ctx.currentTime + i * 0.08
        gainNode.gain.setValueAtTime(0.15, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15)

        oscillator.start(startTime)
        oscillator.stop(startTime + 0.15)
      })
    } catch {
      // Ignore
    }
  }
}

// Singleton instance
export const soundManager = new SoundManager()

// Hook for components
export function useSound() {
  const [enabled, setEnabledState] = useState(() => {
    if (typeof window !== 'undefined') {
      return soundManager.isEnabled()
    }
    return true
  })

  const setEnabled = useCallback((newEnabled: boolean) => {
    soundManager.setEnabled(newEnabled)
    setEnabledState(newEnabled)
  }, [])

  return {
    playCorrect: useCallback(() => soundManager.playCorrect(), []),
    playWrong: useCallback(() => soundManager.playWrong(), []),
    playAchievement: useCallback(() => soundManager.playAchievement(), []),
    playClick: useCallback(() => soundManager.playClick(), []),
    playLevelUp: useCallback(() => soundManager.playLevelUp(), []),
    playStreak: useCallback(() => soundManager.playStreak(), []),
    isEnabled: useCallback(() => enabled, [enabled]),
    setEnabled,
  }
}
