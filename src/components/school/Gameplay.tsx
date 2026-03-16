'use client'

import { useSchool } from '@/context/SchoolContext'
import { useState, useEffect } from 'react'
import { ArrowLeft, Gamepad2, Star, Trophy, CheckCircle, XCircle, Circle, Clock, Zap, Link2, Lightbulb, HelpCircle } from 'lucide-react'
import Confetti from './Confetti'
import { useSound } from '@/lib/sounds'
import { calculateLevel, XP_REWARDS, getRank } from '@/data/constants'

type AnswerState = 'idle' | 'correct' | 'incorrect' | 'revealed'

export default function Gameplay() {
  const { selectedGame, selectGame, addPoints, recordGameResult, unlockAchievement, progress, gameFromLesson } = useSchool()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [timer, setTimer] = useState(0)
  const [timedMode, setTimedMode] = useState(false)
  // Matching game state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  // Hint system
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const { playCorrect, playWrong, playAchievement, playStreak } = useSound()

  const level = calculateLevel(progress.totalPoints)
  const rank = getRank(level)

  useEffect(() => {
    if (timedMode && !showResults && answerState === 'idle') {
      const interval = setInterval(() => setTimer(t => t + 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timedMode, showResults, answerState])

  if (!selectedGame) return null

  const tasks = selectedGame.tasks || []
  const totalTasks = tasks.length
  const task = tasks[currentIndex]

  const checkAnswer = (userAnswer: string | string[], correctAnswer: string | string[]): boolean => {
    if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
      return JSON.stringify([...userAnswer].sort()) === JSON.stringify([...correctAnswer].sort())
    }
    return userAnswer === correctAnswer
  }

  const handleAnswerSelect = (answer: string) => {
    if (answerState !== 'idle') return
    setAnswers({ ...answers, [currentIndex]: answer })
    
    const isCorrect = checkAnswer(answer, task.correctAnswer)
    if (isCorrect) {
      setAnswerState('correct')
      playCorrect()
      setCombo(c => c + 1)
      const bonus = Math.min(combo, 5) * XP_REWARDS.CORRECT_ANSWER
      addPoints(XP_REWARDS.CORRECT_ANSWER + bonus)
    } else {
      setAnswerState('incorrect')
      playWrong()
      setCombo(0)
    }
  }

  const handleMultiAnswerSelect = (answer: string) => {
    if (answerState !== 'idle') return
    const currentAnswers = (answers[currentIndex] as string[]) || []
    const newAnswers = currentAnswers.includes(answer)
      ? currentAnswers.filter(a => a !== answer)
      : [...currentAnswers, answer]
    setAnswers({ ...answers, [currentIndex]: newAnswers })
  }

  const submitMultiAnswer = () => {
    const userAnswer = answers[currentIndex] as string[]
    const isCorrect = checkAnswer(userAnswer, task.correctAnswer)
    
    if (isCorrect) {
      setAnswerState('correct')
      playCorrect()
      setCombo(c => c + 1)
      addPoints(XP_REWARDS.CORRECT_ANSWER * 2)
    } else {
      setAnswerState('incorrect')
      playWrong()
      setCombo(0)
    }
  }

  const submitFillAnswer = () => {
    const userAnswer = (answers[currentIndex] as string)?.trim()
    const isCorrect = checkAnswer(userAnswer, task.correctAnswer)
    
    if (isCorrect) {
      setAnswerState('correct')
      playCorrect()
      setCombo(c => c + 1)
      addPoints(XP_REWARDS.CORRECT_ANSWER * 2)
    } else {
      setAnswerState('incorrect')
      playWrong()
      setCombo(0)
    }
  }

  const nextTask = () => {
    if (answerState === 'correct') {
      setScore(s => s + 1)
    }
    setAnswerState('idle')
    if (currentIndex < totalTasks - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      finishGame()
    }
  }

  const finishGame = () => {
    const finalScore = answerState === 'correct' ? score + 1 : score
    setShowResults(true)
    
    if (finalScore === totalTasks) {
      playAchievement()
      unlockAchievement('perfect_game')
      addPoints(XP_REWARDS.PERFECT_GAME)
    }
    
    recordGameResult(finalScore, totalTasks, selectedGame.subject)
    
    // Check for streak achievements
    if (progress.streak >= 7) unlockAchievement('streak_7')
    if (progress.streak >= 30) unlockAchievement('streak_30')
  }

  const restartGame = () => {
    setCurrentIndex(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
    setCombo(0)
    setAnswerState('idle')
    setTimer(0)
    setMatchedPairs([])
    setSelectedLeft(null)
  }

  // Results screen
  if (showResults) {
    const percentage = totalTasks > 0 ? Math.round((score / totalTasks) * 100) : 0

    return (
      <>
        {score >= totalTasks * 0.5 && <Confetti />}
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-600/60 to-pink-600/60 border-4 border-white/20 animate-bounceIn">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl font-black text-white mb-4">
              {percentage === 100 ? '🏆 Идеально!' : percentage >= 80 ? '🎉 Отлично!' : percentage >= 50 ? '👍 Хорошо!' : '💪 Попробуй ещё!'}
            </h2>
          
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-5xl font-black text-green-400">{score}</div>
                <div className="text-white/70">Правильно</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-purple-300">{percentage}%</div>
                <div className="text-white/70">Результат</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-yellow-400">{Math.round(score * XP_REWARDS.CORRECT_ANSWER)}</div>
                <div className="text-white/70">XP</div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: selectedGame.reward?.stars || 0 }).map((_, i) => (
                <Star key={i} className={`w-10 h-10 text-yellow-400 fill-yellow-400 ${i < score ? 'animate-bounce' : 'opacity-30'}`} 
                  style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>

            <p className="text-xl text-white/90 mb-8">{selectedGame.reward?.message || 'Отлично!'}</p>

            {timedMode && (
              <p className="text-lg text-cyan-300 mb-4">⏱ Время: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
            )}

            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={restartGame}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:scale-105 transition-transform">
                🔄 Играть снова
              </button>
              {gameFromLesson ? (
                <button onClick={() => { selectGame(null); setShowResults(false); }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:scale-105 transition-transform">
                  📚 К уроку
                </button>
              ) : (
                <button onClick={() => { selectGame(null); setShowResults(false); }}
                  className="px-6 py-3 bg-white/20 text-white rounded-2xl font-bold hover:bg-white/30 transition-colors">
                    🎮 К играм
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  // Game screen
  return (
    <div className="w-full max-w-2xl mx-auto">
      <button onClick={() => selectGame(null)}
        className="mb-6 flex items-center gap-2 text-white/80 hover:text-white text-xl font-medium bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl transition-all">
        <ArrowLeft className="w-6 h-6" /> Выйти из игры
      </button>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {Array.from({ length: totalTasks }).map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full transition-all ${
            i < currentIndex ? 'bg-green-400 scale-110' :
            i === currentIndex ? 'bg-purple-400 scale-125 animate-pulse' : 'bg-white/30'
          }`} />
        ))}
      </div>

      {/* Combo indicator */}
      {combo >= 2 && (
        <div className="text-center mb-4 animate-bounce">
          <span className="text-2xl font-black text-yellow-400">
            🔥 Комбо x{combo}! +{combo * XP_REWARDS.CORRECT_ANSWER} XP
          </span>
        </div>
      )}

      {/* Timer mode toggle */}
      {!answerState && currentIndex === 0 && (
        <div className="text-center mb-4">
          <button onClick={() => setTimedMode(!timedMode)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${timedMode 
              ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
            <Clock className="w-4 h-4 inline mr-2" />
            {timedMode ? '⏱ С таймером' : 'Без таймера'}
          </button>
          {timedMode && <span className="text-cyan-400 ml-3">{timer}с</span>}
        </div>
      )}

      <div className={`p-8 rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-4 transition-all duration-300 ${
        answerState === 'correct' ? 'border-green-400' :
        answerState === 'incorrect' ? 'border-red-400' : 'border-white/10'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">{selectedGame.title}</h2>
          </div>
          <div className={`px-3 py-1 rounded-xl text-sm ${rank.color} text-white`}>
            {rank.emoji} {rank.name}
          </div>
        </div>
        
        <p className="text-purple-200 mb-6">Задание {currentIndex + 1} из {totalTasks}</p>
        
        <h3 className="text-2xl font-bold text-white mb-8">{task?.question}</h3>

        {/* Quiz type */}
        {task?.type === 'quiz' && task.options && (
          <div className="space-y-4">
            {task.options.map((option, index) => {
              const isSelected = answers[currentIndex] === option
              const isCorrect = option === task.correctAnswer
              const showCorrect = answerState !== 'idle' && isCorrect
              const showIncorrect = answerState === 'incorrect' && isSelected && !isCorrect
              
              return (
                <button key={index} 
                  onClick={() => answerState === 'idle' && handleAnswerSelect(option)}
                  disabled={answerState !== 'idle'}
                  className={`w-full p-5 rounded-2xl text-left text-lg font-medium transition-all flex items-center gap-4
                    ${showCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-4 border-green-300' :
                      showIncorrect ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white border-4 border-red-300' :
                      isSelected ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-4 border-white/40' :
                      'bg-white/10 text-white border-4 border-white/20 hover:border-purple-400'}
                    ${answerState === 'idle' ? 'cursor-pointer' : 'cursor-default'}`}>
                  {showCorrect && <CheckCircle className="w-6 h-6 text-green-300" />}
                  {showIncorrect && <XCircle className="w-6 h-6 text-red-300" />}
                  {!showCorrect && !showIncorrect && (
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                  )}
                  {option}
                </button>
              )
            })}
          </div>
        )}

        {/* Fill type */}
        {task?.type === 'fill' && (
          <div className="space-y-4">
            <input type="text" value={(answers[currentIndex] as string) || ''}
              onChange={(e) => answerState === 'idle' && setAnswers({ ...answers, [currentIndex]: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && answerState === 'idle' && submitFillAnswer()}
              disabled={answerState !== 'idle'}
              className={`w-full p-5 border-4 rounded-2xl text-white text-xl focus:outline-none transition-all
                ${answerState === 'correct' ? 'bg-green-500/20 border-green-400' :
                  answerState === 'incorrect' ? 'bg-red-500/20 border-red-400' :
                  'bg-white/10 border-white/20 focus:border-purple-400'}`}
              placeholder="Введи ответ..." />
            
            {answerState === 'idle' && (
              <button onClick={submitFillAnswer}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform">
                <Zap className="w-5 h-5 inline mr-2" />Проверить
              </button>
            )}
            
            {answerState !== 'idle' && (
              <div className={`p-4 rounded-xl ${answerState === 'correct' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {answerState === 'correct' ? '✓ Правильно!' : `✗ Правильный ответ: ${task.correctAnswer}`}
              </div>
            )}
          </div>
        )}

        {/* Find type */}
        {task?.type === 'find' && task.options && (
          <div className="space-y-4">
            <p className="text-purple-300 mb-4">Выбери все правильные варианты:</p>
            {task.options.map((option, index) => {
              const selectedAnswers = (answers[currentIndex] as string[]) || []
              const isSelected = selectedAnswers.includes(option)
              const correctAnswers = task.correctAnswer as string[]
              const isCorrect = correctAnswers.includes(option)
              const showCorrect = answerState !== 'idle' && isCorrect
              const showIncorrect = answerState !== 'idle' && isSelected && !isCorrect
              
              return (
                <button key={index} 
                  onClick={() => answerState === 'idle' && handleMultiAnswerSelect(option)}
                  className={`w-full p-5 rounded-2xl text-left text-lg font-medium transition-all flex items-center gap-4
                    ${showCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-4 border-green-300' :
                      showIncorrect ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white border-4 border-red-300' :
                      isSelected ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-4 border-white/40' :
                      'bg-white/10 text-white border-4 border-white/20 hover:border-purple-400'}`}>
                  {showCorrect ? <CheckCircle className="w-6 h-6 text-green-300" /> : 
                   showIncorrect ? <XCircle className="w-6 h-6 text-red-300" /> :
                   isSelected ? <CheckCircle className="w-6 h-6 text-green-300" /> : <Circle className="w-6 h-6 text-white/50" />}
                  {option}
                </button>
              )
            })}
            
            {answerState === 'idle' && (
              <button onClick={submitMultiAnswer}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform">
                <Zap className="w-5 h-5 inline mr-2" />Проверить
              </button>
            )}
          </div>
        )}

        {/* Order type */}
        {task?.type === 'order' && task.options && (
          <div className="space-y-4">
            <p className="text-purple-300 mb-4">Расположи в правильном порядке (через запятую):</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {task.options.map((option, index) => (
                <span key={index} className="px-4 py-2 bg-white/10 rounded-xl text-white">{option}</span>
              ))}
            </div>
            <input type="text" value={(answers[currentIndex] as string) || ''}
              onChange={(e) => answerState === 'idle' && setAnswers({ ...answers, [currentIndex]: e.target.value })}
              className="w-full p-5 bg-white/10 border-4 border-white/20 rounded-2xl text-white text-xl focus:border-purple-400 focus:outline-none"
              placeholder="Например: 7, 45, 156, 234, 1000" />
          </div>
        )}

        {/* Match type - connect pairs */}
        {task?.type === 'match' && task.options && task.correctAnswer && (
          <div className="space-y-4">
            <p className="text-purple-300 mb-4 flex items-center gap-2">
              <Link2 className="w-5 h-5" /> Соедини пары:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-3">
                {task.options.slice(0, Math.ceil(task.options.length / 2)).map((option, index) => {
                  const isMatched = matchedPairs.includes(option)
                  const isSelected = selectedLeft === option
                  const correctPair = (task.correctAnswer as string[]).find(p => p.startsWith(option + '→'))?.split('→')[1]
                  return (
                    <button key={`left-${index}`}
                      onClick={() => {
                        if (isMatched || answerState !== 'idle') return
                        setSelectedLeft(option)
                      }}
                      disabled={isMatched || answerState !== 'idle'}
                      className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                        isMatched ? 'bg-green-500/30 text-green-300 border-2 border-green-400' :
                        isSelected ? 'bg-purple-500/50 text-white border-2 border-purple-400' :
                        'bg-white/10 text-white border-2 border-white/20 hover:border-purple-400'
                      }`}>
                      {isMatched && <CheckCircle className="w-4 h-4 inline mr-2" />}
                      {option}
                    </button>
                  )
                })}
              </div>
              {/* Right column */}
              <div className="space-y-3">
                {task.options.slice(Math.ceil(task.options.length / 2)).map((option, index) => {
                  const isMatched = matchedPairs.includes(option)
                  return (
                    <button key={`right-${index}`}
                      onClick={() => {
                        if (isMatched || !selectedLeft || answerState !== 'idle') return
                        // Check if this is a correct match
                        const correctPair = (task.correctAnswer as string[]).find(p => 
                          p.startsWith(selectedLeft + '→') && p.endsWith('→' + option)
                        )
                        if (correctPair) {
                          setMatchedPairs([...matchedPairs, selectedLeft, option])
                          playCorrect()
                          addPoints(XP_REWARDS.CORRECT_ANSWER)
                          setSelectedLeft(null)
                          // Check if all matched
                          if (matchedPairs.length + 2 >= task.options!.length) {
                            setAnswerState('correct')
                            setCombo(c => c + 1)
                          }
                        } else {
                          playWrong()
                          setCombo(0)
                        }
                        setSelectedLeft(null)
                      }}
                      disabled={isMatched || answerState !== 'idle'}
                      className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                        isMatched ? 'bg-green-500/30 text-green-300 border-2 border-green-400' :
                        'bg-white/10 text-white border-2 border-white/20 hover:border-cyan-400'
                      }`}>
                      {isMatched && <CheckCircle className="w-4 h-4 inline mr-2" />}
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {task?.hint && answerState === 'idle' && (
          <p className="text-purple-300 mt-6 italic">💡 Подсказка: {task.hint}</p>
        )}

        {/* Next button */}
        {answerState !== 'idle' && (
          <div className="flex justify-center mt-8">
            <button onClick={nextTask}
              className={`px-10 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-transform ${
                answerState === 'correct' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              }`}>
              {currentIndex === totalTasks - 1 ? 'Результаты 🎉' : 'Далее →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
