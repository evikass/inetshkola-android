'use client'

import { SchoolProvider, useSchool } from '@/context/SchoolContext'
import { GradeSelector, SubjectGrid, LessonViewer, KidSubjectGrid, KidLessonViewer, GameSection, Gameplay, KidGameSection, AchievementsDisplay, AnimatedBackground, KidGradeSelector, LevelProgress, DailyBonus, StreakCalendar, SoundToggle, ThemeSelector, ExtendedQuickQuiz, LearningPath, ChallengeMode, MemoryGame, DailyChallenge, FlashCards, SpeedTest, StatsDashboard, TypingPractice, SpellingGame, NumberPuzzle, WordScramble, MathRacing, TriviaBattle, CrosswordGame, SentenceBuilder, ColorMatch, WordSearch, SequenceGame, EmojiQuiz, GeographyQuiz, HangmanGame, TrueOrFalse, AnagramGame, OddOneOut, SoundQuiz, MathPuzzle, WordChain, QuickMath, AlphabetSort, SynonymAntonym, FlagsQuiz, TimeQuiz, Riddles, Proverbs, PunctuationQuiz, CapitalCities, RomanNumerals, FractionCompare, PercentQuiz, GeometryQuiz, NatureQuiz, HistoryQuiz, ScienceQuiz, MeasurementQuiz, EquationSolver, PartsOfSpeech, PeriodicTable } from '@/components/school'
import { useState, useEffect } from 'react'
import { Calendar, Gamepad2, Map, Trophy, Settings, X, Heart, ExternalLink, Smartphone, Globe, CreditCard } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

function getTodayString(): string { return new Date().toISOString().split('T')[0] }
type MiniGameType = 'challenge' | 'memory' | 'daily' | 'flashcards' | 'speedtest' | 'stats' | 'typing' | 'spelling' | 'puzzle' | 'scramble' | 'racing' | 'trivia' | 'crossword' | 'sentence' | 'colormatch' | 'wordsearch' | 'sequence' | 'emoji' | 'geography' | 'hangman' | 'truefalse' | 'anagram' | 'oddoneout' | 'soundquiz' | 'mathpuzzle' | 'wordchain' | 'quickmath' | 'alphabetsort' | 'synonym' | 'flags' | 'timequiz' | 'riddles' | 'proverbs' | 'punctuation' | 'capitals' | 'roman' | 'fraction' | 'percent' | 'geometry' | 'nature' | 'history' | 'science' | 'measurement' | 'equation' | 'parts' | 'periodic' | null

function AppContent() {
  const { view, isKidMode, goToClass, selectedClass, activeMiniGame, setActiveMiniGame } = useSchool()
  const [showAchievements, setShowAchievements] = useState(false)
  const [showDailyBonus, setShowDailyBonus] = useState(false)
  const [showQuickQuiz, setShowQuickQuiz] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showLearningPath, setShowLearningPath] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const [donateTab, setDonateTab] = useState<'ru' | 'intl'>('ru')

  const transferServices = [
    { 
      id: 'koronapay', 
      name: 'KoronaPay (Золотая Корона)', 
      url: 'https://koronapay.com',
      countries: '50+ стран мира',
      logo: '👑',
      color: 'yellow',
      desc: 'Найдите точку отправки → переведите по номеру телефона'
    },
    { 
      id: 'contact', 
      name: 'CONTACT', 
      url: 'https://www.contact-sys.com',
      countries: 'Европа, СНГ, Азия',
      logo: '📞',
      color: 'blue',
      desc: 'Перевод в рублях наличными или на карту'
    },
    { 
      id: 'unistream', 
      name: 'Юнистрим', 
      url: 'https://unistream.ru',
      countries: '100+ стран',
      logo: '🌏',
      color: 'green',
      desc: 'Быстрые переводы в РФ'
    },
  ]

  const p2pExchanges = [
    { id: 'bybit', name: 'Bybit P2P', url: 'https://www.bybit.com/fiat/trade', logo: '🟡', color: 'yellow' },
    { id: 'htx', name: 'HTX (Huobi)', url: 'https://www.htx.com/ru-ru/fiat/', logo: '🔵', color: 'cyan' },
    { id: 'bestchange', name: 'BestChange', url: 'https://www.bestchange.ru', logo: '🔄', color: 'purple' },
  ]

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisitDate'), today = getTodayString()
    if (lastVisit !== today) { const timer = setTimeout(() => setShowDailyBonus(true), 500); localStorage.setItem('lastVisitDate', today); return () => clearTimeout(timer) }
  }, [])

  const gameComponents: Record<string, React.ReactNode> = {
    flashcards: <FlashCards />, speedtest: <SpeedTest />, typing: <TypingPractice />, spelling: <SpellingGame />, puzzle: <NumberPuzzle />, scramble: <WordScramble />, racing: <MathRacing />, trivia: <TriviaBattle />, crossword: <CrosswordGame />, sentence: <SentenceBuilder />, colormatch: <ColorMatch />, wordsearch: <WordSearch />, sequence: <SequenceGame />, emoji: <EmojiQuiz />, geography: <GeographyQuiz />, hangman: <HangmanGame />, truefalse: <TrueOrFalse />, anagram: <AnagramGame />, oddoneout: <OddOneOut />, soundquiz: <SoundQuiz />, mathpuzzle: <MathPuzzle />, wordchain: <WordChain />, quickmath: <QuickMath />, alphabetsort: <AlphabetSort />, synonym: <SynonymAntonym />, flags: <FlagsQuiz />, timequiz: <TimeQuiz />, riddles: <Riddles />, proverbs: <Proverbs />, punctuation: <PunctuationQuiz />, capitals: <CapitalCities />, roman: <RomanNumerals />, fraction: <FractionCompare />, percent: <PercentQuiz />, geometry: <GeometryQuiz />, nature: <NatureQuiz />, history: <HistoryQuiz />, science: <ScienceQuiz />, measurement: <MeasurementQuiz />, equation: <EquationSolver />, parts: <PartsOfSpeech />, periodic: <PeriodicTable />, challenge: <ChallengeMode />, memory: <MemoryGame />, daily: <DailyChallenge />, stats: <StatsDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8 relative overflow-hidden" suppressHydrationWarning>
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Compact header */}
        <header className="text-center mb-6">
          <button onClick={() => goToClass(0)} className="hover:scale-105 transition-transform">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-1">ИНЕТШКОЛА</h1>
          </button>
          <p className="text-lg text-purple-200">Интерактивная школьная программа</p>
          
          {/* Compact button row */}
          <div className="flex justify-center items-center gap-2 mt-3 flex-wrap">
            <span className="text-green-400 text-xs bg-green-400/20 px-2 py-1 rounded-full">v3.143</span>
            <span className="text-yellow-400 text-xs bg-yellow-400/20 px-2 py-1 rounded-full">{new Date().toLocaleDateString('ru-RU')}</span>
            
            <button onClick={() => setShowCalendar(!showCalendar)} 
                    className={`text-xs px-2 py-1 rounded-full transition-colors flex items-center gap-1
                               ${showCalendar ? 'bg-orange-400/30 text-orange-300' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
              <Calendar className="w-3 h-3" />
            </button>
            
            <button onClick={() => setShowAchievements(!showAchievements)} 
                    className={`text-xs px-2 py-1 rounded-full transition-colors flex items-center gap-1
                               ${showAchievements ? 'bg-yellow-400/30 text-yellow-300' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
              <Trophy className="w-3 h-3" />
            </button>
            
            {selectedClass !== null && (
              <button onClick={() => setShowLearningPath(!showLearningPath)} 
                      className={`text-xs px-2 py-1 rounded-full transition-colors flex items-center gap-1
                                 ${showLearningPath ? 'bg-violet-400/30 text-violet-300' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
                <Map className="w-3 h-3" />
              </button>
            )}
            
            <button onClick={() => setShowSettings(!showSettings)} 
                    className={`text-xs px-2 py-1 rounded-full transition-colors flex items-center gap-1
                               ${showSettings ? 'bg-purple-400/30 text-purple-300' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
              <Settings className="w-3 h-3" />
            </button>
            
            <button onClick={() => setShowDonate(true)} 
                    className="text-xs px-2 py-1 rounded-full transition-colors flex items-center gap-1 bg-gradient-to-r from-pink-500/30 to-red-500/30 text-pink-300 hover:from-pink-500/40 hover:to-red-500/40">
              <Heart className="w-3 h-3" />
            </button>
          </div>

          {/* Settings dropdown */}
          {showSettings && (
            <div className="mt-3 flex justify-center gap-2 p-2 bg-white/5 rounded-xl">
              <ThemeSelector />
              <SoundToggle />
              <button onClick={() => setShowQuickQuiz(!showQuickQuiz)} 
                      className="text-xs px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30">
                <Gamepad2 className="w-3 h-3 inline mr-1" />Тест
              </button>
            </div>
          )}
        </header>

        {/* Modal overlays */}
        {showCalendar && view === 'classes' && !activeMiniGame && (
          <div className="mb-6 animate-slideIn relative">
            <button onClick={() => setShowCalendar(false)} className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm">✕</button>
            <StreakCalendar />
          </div>
        )}
        
        {activeMiniGame && (
          <div className="mb-6 animate-slideIn relative">
            <button onClick={() => setActiveMiniGame(null)} className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">✕</button>
            {gameComponents[activeMiniGame]}
          </div>
        )}
        
        {showLearningPath && view === 'subjects' && (
          <div className="mb-6 animate-slideIn relative">
            <button onClick={() => setShowLearningPath(false)} className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm">✕</button>
            <LearningPath />
          </div>
        )}
        
        {selectedClass && <LevelProgress />}
        
        {showAchievements && (
          <div className="mb-6 animate-slideIn relative">
            <button onClick={() => setShowAchievements(false)} className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm">✕</button>
            <AchievementsDisplay />
          </div>
        )}

        <main>
          {view === 'classes' && (isKidMode ? <KidGradeSelector /> : <GradeSelector />)}
          {view === 'subjects' && (isKidMode ? <KidSubjectGrid /> : <SubjectGrid />)}
          {view === 'lessons' && (isKidMode ? <KidLessonViewer /> : <LessonViewer />)}
          {view === 'games' && (isKidMode ? <KidGameSection /> : <GameSection />)}
          {view === 'gameplay' && <Gameplay />}
        </main>
      </div>
      {showDailyBonus && <DailyBonus onClose={() => setShowDailyBonus(false)} />}
      
      {/* Donate Modal */}
      {showDonate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDonate(false)}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
                Поддержать проект
              </h2>
              <button onClick={() => setShowDonate(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-purple-200 text-sm mb-4">
              ИНЕТШКОЛА — бесплатный образовательный проект. Любая поддержка поможет развивать платформу!
            </p>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button 
                onClick={() => setDonateTab('ru')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2
                  ${donateTab === 'ru' 
                    ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white border border-pink-500/50' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'}`}
              >
                <Smartphone className="w-4 h-4" />
                Россия
              </button>
              <button 
                onClick={() => setDonateTab('intl')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2
                  ${donateTab === 'intl' 
                    ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white border border-blue-500/50' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'}`}
              >
                <Globe className="w-4 h-4" />
                За рубежом
              </button>
            </div>
            
            {/* Russia Tab */}
            {donateTab === 'ru' && (
              <>
                {/* QR Code Section */}
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-white rounded-xl p-3 shadow-lg">
                    <QRCodeSVG 
                      value="https://www.ozon.ru/my/ozonbank/p2p"
                      size={160}
                      level="M"
                      bgColor="#ffffff"
                      fgColor="#1e1b4b"
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-2 flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    Отсканируйте в приложении банка
                  </p>
                </div>
                
                {/* Account Info */}
                <div className="bg-blue-500/10 rounded-xl p-3 mb-4 border border-blue-500/20">
                  <p className="text-xs text-blue-300 font-medium mb-2">💳 Реквизиты для перевода:</p>
                  <div className="space-y-2">
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <p className="text-xs text-white/50 mb-1">Номер карты:</p>
                      <p className="font-mono text-sm text-white text-center select-all">2202 2080 6819 7913</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <p className="text-xs text-white/50 mb-1">Номер счёта:</p>
                      <p className="font-mono text-sm text-white text-center select-all">40817 81012 70086 41225</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <p className="text-xs text-white/50 mb-1">Номер телефона:</p>
                      <p className="font-mono text-sm text-white text-center select-all">+7 909 132-72-32</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 mt-2 text-center">Получатель: Кассин Е.Ю.</p>
                </div>
                
                {/* Quick Payment Buttons */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-white/50 text-center mb-2">Быстрый перевод через:</p>
                  <div className="grid grid-cols-4 gap-2">
                    <a 
                      href="https://www.sberbank.ru/ru/transfer/phone"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 p-2 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">С</div>
                      <span className="text-xs text-green-300">Сбер</span>
                    </a>
                    <a 
                      href="https://www.tinkoff.ru/transfer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 p-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">Т</div>
                      <span className="text-xs text-yellow-300">Тинькофф</span>
                    </a>
                    <a 
                      href="https://www.raiffeisen.ru/retail/p2r/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 p-2 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-bold text-xs">Р</div>
                      <span className="text-xs text-yellow-200">Райф</span>
                    </a>
                    <a 
                      href="https://www.ozon.ru/my/ozonbank/p2p"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">О</div>
                      <span className="text-xs text-blue-300">Озон</span>
                    </a>
                  </div>
                </div>
              </>
            )}
            
            {/* International Tab */}
            {donateTab === 'intl' && (
              <>
                <p className="text-xs text-white/50 text-center mb-3 flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" />
                  Для переводов из-за рубежа
                </p>
                
                {/* Money Transfer Services */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-white/60 text-center mb-2 font-medium">💱 Сервисы денежных переводов</p>
                  {transferServices.map((service) => (
                    <a 
                      key={service.id}
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white/5 hover:bg-white/10 rounded-xl p-3 border border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.logo}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{service.name}</div>
                          <div className="text-xs text-white/50">{service.countries}</div>
                          <div className="text-xs text-cyan-400 mt-1">{service.desc}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/30" />
                      </div>
                    </a>
                  ))}
                </div>
                
                {/* How to send */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-3 mb-4 border border-cyan-500/20">
                  <p className="text-xs text-cyan-300 font-medium mb-2">📋 Как отправить перевод:</p>
                  <ol className="text-xs text-white/70 space-y-1 list-decimal list-inside">
                    <li>Выберите сервис и перейдите на сайт</li>
                    <li>Найдите точку отправки в вашем городе</li>
                    <li>Укажите номер получателя: <span className="text-yellow-300 font-mono">+7 909 132-72-32</span></li>
                    <li>Получите код перевода и сообщите нам</li>
                  </ol>
                </div>
                
                {/* P2P Crypto Exchanges */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-white/60 text-center mb-2 font-medium">🔄 P2P обмен (крипта → рубли)</p>
                  <div className="grid grid-cols-3 gap-2">
                    {p2pExchanges.map((exchange) => (
                      <a
                        key={exchange.id}
                        href={exchange.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-1 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10`}
                      >
                        <span className="text-lg">{exchange.logo}</span>
                        <span className="text-xs text-white/70 text-center">{exchange.name}</span>
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 text-center">
                    Купите USDT → обменяйте на рубли → переведите на карту
                  </p>
                </div>
                
                {/* SWIFT */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-white">SWIFT перевод</span>
                  </div>
                  <p className="text-xs text-white/60">
                    Через банки, которые работают с РФ. Реквизиты предоставим по запросу.
                  </p>
                  <a 
                    href="mailto:inetshkola@gmail.com?subject=SWIFT реквизиты для пожертвования"
                    className="inline-block mt-2 text-xs text-purple-400 hover:text-purple-300"
                  >
                    ✉️ Запросить реквизиты
                  </a>
                </div>
              </>
            )}
            
            {/* Info */}
            <div className="bg-white/5 rounded-lg p-3 text-xs text-white/50 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                <span>Разработка новых уроков и игр</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Улучшение интерфейса</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Оплата хостинга</span>
              </div>
            </div>
            
            <div className="mt-4 text-center text-xs text-pink-300/70">
              Спасибо за вашу поддержку! 💜
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default function Home() { return <SchoolProvider><AppContent /></SchoolProvider> }
