'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  lessonTitle: string
  subject?: string
  size?: 'small' | 'medium' | 'large'
}

// Определяем ключевые слова для разных типов уроков
const lessonPatterns = {
  // Математика
  numbers: ['числ', 'нумерац', 'счёт', 'цифр', 'разряд', 'класс', 'тысяч', 'миллион'],
  addition: ['сложен', 'сумм', 'плюс', 'прибав', 'увелич', '+'],
  subtraction: ['вычитан', 'разност', 'минус', 'уменьш', '-'],
  multiplication: ['умножен', 'произведен', '×', 'умножа'],
  division: ['делен', 'делим', 'частн', '÷', 'остаток'],
  fractions: ['дроб', 'дол', 'числит', 'знаменател', 'четверт', 'половин', 'трет'],
  geometry: ['фигур', 'треугольн', 'квадрат', 'прямоугольн', 'круг', 'угол', 'периметр', 'площад'],
  equations: ['уравнен', 'равенств', 'неизвестн', 'икс', 'x='],
  time: ['врем', 'час', 'минут', 'секунд', 'сутк'],
  measurement: ['измерен', 'величин', 'длин', 'масс', 'объём', 'литр', 'килогр', 'метр', 'сантиметр'],
  
  // Русский язык
  letters: ['букв', 'алфавит', 'звук', 'гласн', 'согласн'],
  words: ['слов', 'корн', 'приставк', 'суффикс', 'окончан', 'основа'],
  sentence: ['предложен', 'подлежащ', 'сказуем', 'члены предложен'],
  partsOfSpeech: ['существительн', 'прилагательн', 'глагол', 'местоимен', 'нареч'],
  cases: ['падеж', 'склонен', 'родител', 'дател', 'винител', 'творител', 'предложн'],
  punctuation: ['знак', 'запят', 'точк', 'тире', 'двоеточ', 'кавычк'],
  spelling: ['правописан', 'орфограф', 'проверочн', 'безударн'],
  
  // Литература
  reading: ['чтен', 'произведен', 'автор', 'писател', 'поэт'],
  folklore: ['сказк', 'пословиц', 'поговорк', 'загадк', 'фольклор'],
  poetry: ['стих', 'стихотворен', 'рифм', 'поэзи'],
  prose: ['рассказ', 'повест', 'роман', 'проза'],
  
  // Окружающий мир
  nature: ['природ', 'растен', 'животн', 'гриб'],
  seasons: ['времена год', 'зим', 'весн', 'лет', 'осен'],
  space: ['космос', 'планет', 'звезд', 'солнц', 'лун', 'земл'],
  ecology: ['эколог', 'окружающ', 'сред', 'загрязнен'],
  
  // История
  history: ['истор', 'древн', 'век', 'эпох', 'войн', 'цар'],
  
  // География
  geography: ['географ', 'карт', 'материк', 'океан', 'стран', 'город'],
  map: ['карт', 'масштаб', 'план'],
  
  // Биология
  biology: ['биолог', 'клетк', 'организм', 'животн', 'растен'],
  
  // Физика
  physics: ['физик', 'сил', 'движ', 'скорост', 'энерг'],
  
  // Химия
  chemistry: ['хим', 'элемент', 'молекул', 'атом', 'реакц'],
  
  // Английский
  english: ['english', 'английск', 'translate', 'перевод', 'слов', 'word'],
  
  // Музыка
  music: ['музык', 'нот', 'ритм', 'мелод', 'песн'],
  
  // ИЗО
  art: ['изо', 'рисован', 'краск', 'цвет', 'палитр', 'худож'],
  
  // Физкультура
  pe: ['физкул', 'спорт', 'упражнен', 'игр', 'бег', 'прыжк']
}

export default function LessonAnimatedSVG({ lessonTitle, subject = '', size = 'medium' }: Props) {
  const [svgType, setSvgType] = useState<string>('default')
  
  useEffect(() => {
    const title = lessonTitle.toLowerCase()
    const subjectLower = subject.toLowerCase()
    
    // Определяем тип SVG по заголовку урока
    for (const [type, patterns] of Object.entries(lessonPatterns)) {
      if (patterns.some(pattern => title.includes(pattern) || subjectLower.includes(pattern))) {
        setSvgType(type)
        return
      }
    }
    
    setSvgType('default')
  }, [lessonTitle, subject])
  
  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-40 h-40',
    large: 'w-56 h-56'
  }
  
  // Анимированные SVG для разных типов уроков
  const renderSVG = () => {
    switch (svgType) {
      case 'numbers':
        return <NumbersSVG />
      case 'addition':
        return <AdditionSVG />
      case 'subtraction':
        return <SubtractionSVG />
      case 'multiplication':
        return <MultiplicationSVG />
      case 'division':
        return <DivisionSVG />
      case 'fractions':
        return <FractionsSVG />
      case 'geometry':
        return <GeometrySVG />
      case 'equations':
        return <EquationsSVG />
      case 'time':
        return <TimeSVG />
      case 'measurement':
        return <MeasurementSVG />
      case 'letters':
        return <LettersSVG />
      case 'words':
        return <WordsSVG />
      case 'sentence':
        return <SentenceSVG />
      case 'partsOfSpeech':
        return <PartsOfSpeechSVG />
      case 'cases':
        return <CasesSVG />
      case 'punctuation':
        return <PunctuationSVG />
      case 'reading':
        return <ReadingSVG />
      case 'folklore':
        return <FolkloreSVG />
      case 'poetry':
        return <PoetrySVG />
      case 'nature':
        return <NatureSVG />
      case 'seasons':
        return <SeasonsSVG />
      case 'space':
        return <SpaceSVG />
      case 'ecology':
        return <EcologySVG />
      case 'history':
        return <HistorySVG />
      case 'geography':
      case 'map':
        return <GeographySVG />
      case 'biology':
        return <BiologySVG />
      case 'physics':
        return <PhysicsSVG />
      case 'chemistry':
        return <ChemistrySVG />
      case 'english':
        return <EnglishSVG />
      case 'music':
        return <MusicSVG />
      case 'art':
        return <ArtSVG />
      case 'pe':
        return <PESVG />
      default:
        return <DefaultSVG />
    }
  }
  
  return (
    <motion.div 
      className={`${sizeClasses[size]} flex items-center justify-center`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderSVG()}
    </motion.div>
  )
}

// ============ SVG COMPONENTS ============

// Математика - Числа
function NumbersSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="numGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      
      {/* Фоновый круг */}
      <motion.circle
        cx="100" cy="100" r="90"
        fill="none"
        stroke="url(#numGrad)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Числа с анимацией */}
      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num, i) => {
        const angle = (i * 40 - 90) * (Math.PI / 180)
        const x = 100 + 60 * Math.cos(angle)
        const y = 100 + 60 * Math.sin(angle) + 5
        
        return (
          <motion.text
            key={num}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#A78BFA"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
          >
            {num}
          </motion.text>
        )
      })}
      
      {/* Центральное число */}
      <motion.text
        x="100" y="110"
        textAnchor="middle"
        fontSize="48"
        fontWeight="bold"
        fill="url(#numGrad)"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        0
      </motion.text>
      
      {/* Вращающиеся точки */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.circle
          key={angle}
          cx={100 + 75 * Math.cos(angle * Math.PI / 180)}
          cy={100 + 75 * Math.sin(angle * Math.PI / 180)}
          r="4"
          fill="#EC4899"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ 
            delay: 2 + i * 0.1, 
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      ))}
    </svg>
  )
}

// Математика - Сложение
function AdditionSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="addGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      
      {/* Фон */}
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#10B98120"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Числа для сложения */}
      <motion.text
        x="60" y="70"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="#10B981"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        5
      </motion.text>
      
      <motion.text
        x="140" y="70"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="#10B981"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        3
      </motion.text>
      
      {/* Плюс */}
      <motion.text
        x="100" y="75"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="url(#addGrad)"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        +
      </motion.text>
      
      {/* Линия */}
      <motion.line
        x1="40" y1="95" x2="160" y2="95"
        stroke="#34D399"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      
      {/* Результат */}
      <motion.text
        x="100" y="145"
        textAnchor="middle"
        fontSize="48"
        fontWeight="bold"
        fill="url(#addGrad)"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
      >
        8
      </motion.text>
      
      {/* Анимированные частицы */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.circle
          key={i}
          cx={50 + i * 25}
          cy="170"
          r="5"
          fill="#34D399"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -20, opacity: 0 }}
          transition={{ 
            delay: 1.5 + i * 0.2, 
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      ))}
    </svg>
  )
}

// Математика - Вычитание
function SubtractionSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="subGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#F59E0B20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Числа */}
      <motion.text
        x="70" y="70"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="#F59E0B"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        9
      </motion.text>
      
      <motion.text
        x="130" y="70"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="#F59E0B"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        4
      </motion.text>
      
      {/* Минус */}
      <motion.text
        x="100" y="72"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="url(#subGrad)"
        initial={{ rotate: 180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        −
      </motion.text>
      
      {/* Линия */}
      <motion.line
        x1="50" y1="95" x2="150" y2="95"
        stroke="#FBBF24"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8 }}
      />
      
      {/* Результат */}
      <motion.text
        x="100" y="145"
        textAnchor="middle"
        fontSize="48"
        fontWeight="bold"
        fill="url(#subGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        5
      </motion.text>
      
      {/* Убегающие точки */}
      {[0, 1, 2, 3].map(i => (
        <motion.circle
          key={i}
          cx="100"
          cy="100"
          r="4"
          fill="#FBBF24"
          animate={{
            x: [0, (i - 1.5) * 30],
            y: [0, -20],
            opacity: [1, 0]
          }}
          transition={{
            delay: 1.2,
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      ))}
    </svg>
  )
}

// Математика - Умножение
function MultiplicationSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="mulGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#8B5CF620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Сетка точек для визуализации умножения */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <motion.circle
            key={`${row}-${col}`}
            cx={70 + col * 20}
            cy={60 + row * 20}
            r="6"
            fill="#8B5CF6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: (row * 3 + col) * 0.1 }}
          />
        ))
      )}
      
      {/* Формула */}
      <motion.text
        x="100" y="160"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="url(#mulGrad)"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        4 × 3 = 12
      </motion.text>
      
      {/* Вращающиеся линии */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      >
        <line x1="100" y1="15" x2="100" y2="30" stroke="#A78BFA" strokeWidth="2" />
        <line x1="100" y1="170" x2="100" y2="185" stroke="#A78BFA" strokeWidth="2" />
        <line x1="15" y1="100" x2="30" y2="100" stroke="#A78BFA" strokeWidth="2" />
        <line x1="170" y1="100" x2="185" y2="100" stroke="#A78BFA" strokeWidth="2" />
      </motion.g>
    </svg>
  )
}

// Математика - Деление
function DivisionSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#EC489920"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Пирог, разделённый на части */}
      <motion.circle
        cx="100" cy="90"
        r="50"
        fill="#EC489940"
        stroke="url(#divGrad)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Линии деления */}
      {[0, 60, 120, 180].map((angle, i) => (
        <motion.line
          key={angle}
          x1="100"
          y1="90"
          x2={100 + 50 * Math.cos((angle - 90) * Math.PI / 180)}
          y2={90 + 50 * Math.sin((angle - 90) * Math.PI / 180)}
          stroke="#F472B6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 + i * 0.2 }}
        />
      ))}
      
      {/* Закрашенный сектор */}
      <motion.path
        d="M100,90 L100,40 A50,50 0 0,1 143.3,65 Z"
        fill="#EC4899"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5 }}
      />
      
      {/* Текст */}
      <motion.text
        x="100" y="170"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="url(#divGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        1/6 часть
      </motion.text>
    </svg>
  )
}

// Математика - Дроби
function FractionsSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="fracGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#F9731620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Круг-диаграмма */}
      <motion.circle
        cx="100" cy="90"
        r="45"
        fill="#F9731640"
        stroke="url(#fracGrad)"
        strokeWidth="2"
      />
      
      {/* Закрашенные сектора (3/4) */}
      <motion.path
        d="M100,90 L100,45 A45,45 0 1,1 55,90 Z"
        fill="#F97316"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ delay: 0.5, type: "spring" }}
      />
      
      {/* Дробь */}
      <motion.g initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}>
        <text x="100" y="155" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#F97316">3</text>
        <line x1="80" y1="162" x2="120" y2="162" stroke="#FB923C" strokeWidth="3" />
        <text x="100" y="185" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#F97316">4</text>
      </motion.g>
      
      {/* Анимированные точки */}
      {[0, 120, 240].map((angle, i) => (
        <motion.circle
          key={angle}
          cx={100 + 55 * Math.cos((angle - 90) * Math.PI / 180)}
          cy={90 + 55 * Math.sin((angle - 90) * Math.PI / 180)}
          r="5"
          fill="#FB923C"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ delay: 1.5 + i * 0.3, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        />
      ))}
    </svg>
  )
}

// Математика - Геометрия
function GeometrySVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="geoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#06B6D420"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Треугольник */}
      <motion.polygon
        points="60,140 100,60 140,140"
        fill="#06B6D440"
        stroke="url(#geoGrad)"
        strokeWidth="3"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring" }}
      />
      
      {/* Квадрат */}
      <motion.rect
        x="115" y="45"
        width="40" height="40"
        fill="#22D3EE40"
        stroke="#22D3EE"
        strokeWidth="2"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, type: "spring" }}
      />
      
      {/* Круг */}
      <motion.circle
        cx="55" cy="70"
        r="20"
        fill="#06B6D440"
        stroke="#06B6D4"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
      />
      
      {/* Вращающиеся точки */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      >
        {[0, 90, 180, 270].map(angle => (
          <circle
            key={angle}
            cx={100 + 80 * Math.cos(angle * Math.PI / 180)}
            cy={100 + 80 * Math.sin(angle * Math.PI / 180)}
            r="4"
            fill="#22D3EE"
          />
        ))}
      </motion.g>
    </svg>
  )
}

// Математика - Уравнения
function EquationsSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="eqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#8B5CF620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Весы - левая чаша */}
      <motion.g initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <line x1="100" y1="50" x2="100" y2="100" stroke="#8B5CF6" strokeWidth="3" />
        <line x1="60" y1="100" x2="140" y2="100" stroke="#8B5CF6" strokeWidth="3" />
        
        {/* Левая чаша */}
        <motion.path
          d="M40,105 Q60,130 80,105"
          fill="#C4B5FD40"
          stroke="#C4B5FD"
          strokeWidth="2"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '60px 100px' }}
        />
        
        {/* Правая чаша */}
        <motion.path
          d="M120,105 Q140,130 160,105"
          fill="#C4B5FD40"
          stroke="#C4B5FD"
          strokeWidth="2"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '140px 100px' }}
        />
      </motion.g>
      
      {/* X и числа */}
      <motion.text
        x="60" y="95"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="#8B5CF6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        x
      </motion.text>
      
      <motion.text
        x="140" y="95"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#C4B5FD"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        5
      </motion.text>
      
      {/* Уравнение */}
      <motion.text
        x="100" y="165"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="url(#eqGrad)"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        x + 3 = 8
      </motion.text>
    </svg>
  )
}

// Математика - Время
function TimeSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="timeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      
      {/* Циферблат */}
      <motion.circle
        cx="100" cy="100" r="80"
        fill="#3B82F620"
        stroke="url(#timeGrad)"
        strokeWidth="4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Деления */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180)
        const x1 = 100 + 70 * Math.cos(angle)
        const y1 = 100 + 70 * Math.sin(angle)
        const x2 = 100 + 75 * Math.cos(angle)
        const y2 = 100 + 75 * Math.sin(angle)
        
        return (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#60A5FA"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        )
      })}
      
      {/* Часовая стрелка */}
      <motion.line
        x1="100" y1="100" x2="100" y2="60"
        stroke="#3B82F6"
        strokeWidth="6"
        strokeLinecap="round"
        animate={{ rotate: 360 }}
        transition={{ duration: 43200, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      />
      
      {/* Минутная стрелка */}
      <motion.line
        x1="100" y1="100" x2="100" y2="40"
        stroke="#60A5FA"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{ rotate: 360 }}
        transition={{ duration: 3600, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      />
      
      {/* Секундная стрелка */}
      <motion.line
        x1="100" y1="100" x2="100" y2="30"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      />
      
      {/* Центральная точка */}
      <motion.circle
        cx="100" cy="100"
        r="6"
        fill="#3B82F6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      />
    </svg>
  )
}

// Математика - Измерения
function MeasurementSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="measGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#14B8A620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Линейка */}
      <motion.rect
        x="30" y="80"
        width="140" height="30"
        fill="#14B8A640"
        stroke="url(#measGrad)"
        strokeWidth="2"
        rx="5"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Деления на линейке */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.line
          key={i}
          x1={40 + i * 10} y1={80} x2={40 + i * 10} y2={i % 2 === 0 ? 95 : 88}
          stroke="#2DD4BF"
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5 + i * 0.05 }}
        />
      ))}
      
      {/* Мерки */}
      <motion.g initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}>
        <text x="50" y="145" fontSize="16" fill="#14B8A6">мм</text>
        <text x="90" y="145" fontSize="16" fill="#2DD4BF">см</text>
        <text x="130" y="145" fontSize="16" fill="#14B8A6">м</text>
      </motion.g>
      
      {/* Стрелка-измеритель */}
      <motion.path
        d="M100,40 L100,70 M95,65 L100,70 L105,65"
        stroke="#2DD4BF"
        strokeWidth="2"
        fill="none"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  )
}

// Русский язык - Буквы
function LettersSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="letGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#F87171" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#EF444420"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Алфавит */}
      {'АБВГДЕЖ'.split('').map((letter, i) => (
        <motion.text
          key={letter}
          x={50 + (i % 4) * 35}
          y={80 + Math.floor(i / 4) * 40}
          textAnchor="middle"
          fontSize="28"
          fontWeight="bold"
          fill={i === 0 ? "url(#letGrad)" : "#F87171"}
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: "spring" }}
        >
          {letter}
        </motion.text>
      ))}
      
      {/* Прыгающая буква */}
      <motion.text
        x="155" y="120"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="#EF4444"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        Я
      </motion.text>
      
      {/* Звуковые волны */}
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="100" cy="150" r="15" fill="none" stroke="#F87171" strokeWidth="1" />
        <circle cx="100" cy="150" r="25" fill="none" stroke="#F87171" strokeWidth="1" />
        <circle cx="100" cy="150" r="35" fill="none" stroke="#F87171" strokeWidth="1" />
      </motion.g>
    </svg>
  )
}

// Русский язык - Слова
function WordsSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="wordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#F59E0B20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Слово */}
      <motion.g>
        {['П', 'О', 'Е', 'З', 'Д'].map((letter, i) => (
          <motion.text
            key={i}
            x={45 + i * 28}
            y="100"
            textAnchor="middle"
            fontSize="32"
            fontWeight="bold"
            fill="url(#wordGrad)"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15, type: "spring" }}
          >
            {letter}
          </motion.text>
        ))}
      </motion.g>
      
      {/* Выделение корня */}
      <motion.rect
        x="68" y="108"
        width="56" height="8"
        fill="#F59E0B60"
        rx="4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1 }}
      />
      
      {/* Подписи */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        <text x="82" y="135" fontSize="12" fill="#FBBF24" textAnchor="middle">корень</text>
        <text x="45" y="135" fontSize="12" fill="#F59E0B" textAnchor="middle">прист.</text>
        <text x="155" y="135" fontSize="12" fill="#F59E0B" textAnchor="middle">суф.</text>
      </motion.g>
      
      {/* Стрелки-указатели */}
      <motion.path
        d="M45,115 L45,125 M40,120 L45,125 L50,120"
        stroke="#F59E0B"
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />
    </svg>
  )
}

// Русский язык - Предложение
function SentenceSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="sentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#8B5CF620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Слова предложения */}
      <motion.g>
        {['Мама', 'мыла', 'раму'].map((word, i) => (
          <motion.g key={i}>
            <motion.rect
              x={25 + i * 55}
              y="60"
              width="50"
              height="30"
              fill={i === 0 ? "#8B5CF640" : i === 1 ? "#A78BFA40" : "#C4B5FD40"}
              stroke={i === 0 ? "#8B5CF6" : i === 1 ? "#A78BFA" : "#C4B5FD"}
              strokeWidth="2"
              rx="8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, type: "spring" }}
            />
            <motion.text
              x={50 + i * 55}
              y="82"
              textAnchor="middle"
              fontSize="14"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.3 }}
            >
              {word}
            </motion.text>
          </motion.g>
        ))}
      </motion.g>
      
      {/* Подлежащее */}
      <motion.text
        x="50" y="115"
        textAnchor="middle"
        fontSize="12"
        fill="#8B5CF6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        подлежащее
      </motion.text>
      
      {/* Сказуемое */}
      <motion.text
        x="105" y="115"
        textAnchor="middle"
        fontSize="12"
        fill="#A78BFA"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        сказуемое
      </motion.text>
      
      {/* Дополнение */}
      <motion.text
        x="160" y="115"
        textAnchor="middle"
        fontSize="12"
        fill="#C4B5FD"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        дополнение
      </motion.text>
      
      {/* Линии связи */}
      <motion.path
        d="M50,92 Q80,130 105,92"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        strokeDasharray="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.6 }}
      />
    </svg>
  )
}

// Русский язык - Части речи
function PartsOfSpeechSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="posGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#10B98120"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Круговая диаграмма частей речи */}
      {[
        { start: 0, end: 90, color: "#10B981", label: "Сущ." },
        { start: 90, end: 180, color: "#34D399", label: "Гл." },
        { start: 180, end: 270, color: "#6EE7B7", label: "Прил." },
        { start: 270, end: 360, color: "#A7F3D0", label: " др." }
      ].map((sector, i) => {
        const startAngle = (sector.start - 90) * Math.PI / 180
        const endAngle = (sector.end - 90) * Math.PI / 180
        const x1 = 100 + 50 * Math.cos(startAngle)
        const y1 = 100 + 50 * Math.sin(startAngle)
        const x2 = 100 + 50 * Math.cos(endAngle)
        const y2 = 100 + 50 * Math.sin(endAngle)
        const largeArc = sector.end - sector.start > 180 ? 1 : 0
        
        return (
          <motion.path
            key={i}
            d={`M100,100 L${x1},${y1} A50,50 0 ${largeArc},1 ${x2},${y2} Z`}
            fill={sector.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
          />
        )
      })}
      
      {/* Подписи */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <text x="130" y="65" fontSize="12" fill="white">Сущ.</text>
        <text x="150" y="110" fontSize="12" fill="white">Гл.</text>
        <text x="50" y="125" fontSize="12" fill="white">Прил.</text>
        <text x="65" y="70" fontSize="12" fill="#065F46">др.</text>
      </motion.g>
    </svg>
  )
}

// Русский язык - Падежи
function CasesSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="caseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#EC489920"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Падежи по кругу */}
      {['И', 'Р', 'Д', 'В', 'Т', 'П'].map((padeg, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180)
        const x = 100 + 55 * Math.cos(angle)
        const y = 100 + 55 * Math.sin(angle)
        
        return (
          <motion.g key={i}>
            <motion.circle
              cx={x} cy={y} r="20"
              fill={i === 0 ? "#EC4899" : "#F472B640"}
              stroke="#F472B6"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            />
            <motion.text
              x={x} y={y + 6}
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              {padeg}
            </motion.text>
          </motion.g>
        )
      })}
      
      {/* Вопрос в центре */}
      <motion.text
        x="100" y="105"
        textAnchor="middle"
        fontSize="14"
        fill="url(#caseGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        кто? что?
      </motion.text>
      
      {/* Стрелки между падежами */}
      <motion.path
        d="M100,100 m-40,0 a40,40 0 0,1 80,0"
        fill="none"
        stroke="#F472B6"
        strokeWidth="1"
        strokeDasharray="3"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      />
    </svg>
  )
}

// Русский язык - Пунктуация
function PunctuationSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="punctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#6366F120"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Знаки препинания */}
      {[
        { sign: '.', x: 50, y: 80 },
        { sign: ',', x: 100, y: 80 },
        { sign: '!', x: 150, y: 80 },
        { sign: '?', x: 75, y: 130 },
        { sign: ':', x: 125, y: 130 }
      ].map((item, i) => (
        <motion.text
          key={i}
          x={item.x} y={item.y}
          textAnchor="middle"
          fontSize="36"
          fontWeight="bold"
          fill="url(#punctGrad)"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.2, type: "spring" }}
        >
          {item.sign}
        </motion.text>
      ))}
      
      {/* Моргающие точки */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.circle
          key={angle}
          cx={100 + 75 * Math.cos(angle * Math.PI / 180)}
          cy={100 + 75 * Math.sin(angle * Math.PI / 180)}
          r="4"
          fill="#818CF8"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
        />
      ))}
    </svg>
  )
}

// Литература - Чтение
function ReadingSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="readGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#8B5CF620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Открытая книга */}
      <motion.g
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Левая страница */}
        <motion.path
          d="M100,40 Q60,50 40,60 L40,150 Q60,140 100,150 Z"
          fill="#F5F5F5"
          stroke="url(#readGrad)"
          strokeWidth="2"
        />
        
        {/* Правая страница */}
        <motion.path
          d="M100,40 Q140,50 160,60 L160,150 Q140,140 100,150 Z"
          fill="#F5F5F5"
          stroke="url(#readGrad)"
          strokeWidth="2"
        />
      </motion.g>
      
      {/* Текст на страницах */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <rect x="50" y={60 + i * 20} width="40" height="3" fill="#8B5CF640" rx="1" />
            <rect x="110" y={60 + i * 20} width="40" height="3" fill="#8B5CF640" rx="1" />
          </g>
        ))}
      </motion.g>
      
      {/* Летающие буквы */}
      {['а', 'б', 'в'].map((letter, i) => (
        <motion.text
          key={i}
          x={60 + i * 40}
          y="175"
          textAnchor="middle"
          fontSize="20"
          fill="#A78BFA"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ delay: i * 0.3, duration: 2, repeat: Infinity }}
        >
          {letter}
        </motion.text>
      ))}
    </svg>
  )
}

// Литература - Фольклор
function FolkloreSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="folkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#F59E0B20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Сказочная книга */}
      <motion.rect
        x="50" y="60"
        width="100" height="80"
        fill="#F59E0B40"
        stroke="url(#folkGrad)"
        strokeWidth="3"
        rx="5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Корона */}
      <motion.path
        d="M80,70 L90,50 L100,65 L110,50 L120,70 Z"
        fill="#FBBF24"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      />
      
      {/* Звёзды */}
      {[0, 1, 2].map(i => (
        <motion.path
          key={i}
          d={`M${60 + i * 40},100 l3,6 7,1 -5,5 1,7 -6,-3 -6,3 1,-7 -5,-5 7,-1 z`}
          fill="#FBBF24"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 20, 0] }}
          transition={{ delay: i * 0.3, duration: 2, repeat: Infinity }}
        />
      ))}
      
      {/* Волшебные частицы */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45) * Math.PI / 180
        return (
          <motion.circle
            key={i}
            cx={100 + 70 * Math.cos(angle)}
            cy={100 + 70 * Math.sin(angle)}
            r="3"
            fill="#FBBF24"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
          />
        )
      })}
    </svg>
  )
}

// Литература - Поэзия
function PoetrySVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="poetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#EC489920"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Стихотворные строки */}
      {['Роза -', 'роза -', 'роза...'].map((line, i) => (
        <motion.text
          key={i}
          x="100" y={70 + i * 35}
          textAnchor="middle"
          fontSize="22"
          fill={i === 0 ? "url(#poetGrad)" : "#F472B6"}
          fontStyle="italic"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.3, type: "spring" }}
        >
          {line}
        </motion.text>
      ))}
      
      {/* Музыкальные ноты */}
      {['♪', '♫', '♬'].map((note, i) => (
        <motion.text
          key={i}
          x={40 + i * 60}
          y={160 + (i % 2) * 20}
          textAnchor="middle"
          fontSize="24"
          fill="#EC4899"
          animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
        >
          {note}
        </motion.text>
      ))}
    </svg>
  )
}

// Окружающий мир - Природа
function NatureSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="natGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      
      {/* Небо */}
      <motion.rect
        x="15" y="15"
        width="170" height="85"
        fill="#87CEEB40"
        rx="10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
      />
      
      {/* Земля */}
      <motion.rect
        x="15" y="100"
        width="170" height="85"
        fill="#10B98140"
        rx="10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Солнце */}
      <motion.circle
        cx="160" cy="50"
        r="25"
        fill="#FBBF24"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Лучи солнца */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line
          key={angle}
          x1={160 + 30 * Math.cos(angle * Math.PI / 180)}
          y1={50 + 30 * Math.sin(angle * Math.PI / 180)}
          x2={160 + 40 * Math.cos(angle * Math.PI / 180)}
          y2={50 + 40 * Math.sin(angle * Math.PI / 180)}
          stroke="#FBBF24"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ delay: i * 0.1, duration: 1, repeat: Infinity }}
        />
      ))}
      
      {/* Дерево */}
      <motion.g>
        {/* Ствол */}
        <motion.rect
          x="70" y="100"
          width="15" height="50"
          fill="#8B5CF6"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5 }}
        />
        {/* Крона */}
        <motion.circle
          cx="77" cy="85"
          r="30"
          fill="#10B981"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        />
      </motion.g>
      
      {/* Цветок */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <circle cx="140" cy="140" r="8" fill="#EC4899" />
        <circle cx="148" cy="148" r="8" fill="#F472B6" />
        <circle cx="140" cy="156" r="8" fill="#EC4899" />
        <circle cx="132" cy="148" r="8" fill="#F472B6" />
        <circle cx="140" cy="148" r="5" fill="#FBBF24" />
        <line x1="140" y1="156" x2="140" y2="180" stroke="#10B981" strokeWidth="3" />
      </motion.g>
    </svg>
  )
}

// Окружающий мир - Времена года
function SeasonsSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="seasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      
      {/* 4 сектора - времена года */}
      {[
        { start: 0, color: "#FBBF24", label: "Л" },      // Лето
        { start: 90, color: "#F97316", label: "О" },     // Осень
        { start: 180, color: "#60A5FA", label: "З" },    // Зима
        { start: 270, color: "#34D399", label: "В" }     // Весна
      ].map((season, i) => {
        const startAngle = (season.start - 90) * Math.PI / 180
        const endAngle = (season.start + 90 - 90) * Math.PI / 180
        const x1 = 100 + 70 * Math.cos(startAngle)
        const y1 = 100 + 70 * Math.sin(startAngle)
        const x2 = 100 + 70 * Math.cos(endAngle)
        const y2 = 100 + 70 * Math.sin(endAngle)
        
        return (
          <motion.path
            key={i}
            d={`M100,100 L${x1},${y1} A70,70 0 0,1 ${x2},${y2} Z`}
            fill={season.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
          />
        )
      })}
      
      {/* Буквы времён года */}
      {[
        { label: "Л", angle: 45 },
        { label: "О", angle: 135 },
        { label: "З", angle: 225 },
        { label: "В", angle: 315 }
      ].map((item, i) => {
        const rad = (item.angle - 90) * Math.PI / 180
        const x = 100 + 40 * Math.cos(rad)
        const y = 100 + 40 * Math.sin(rad) + 6
        
        return (
          <motion.text
            key={i}
            x={x} y={y}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {item.label}
          </motion.text>
        )
      })}
      
      {/* Вращающаяся стрелка */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      >
        <line x1="100" y1="100" x2="100" y2="30" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        <polygon points="95,35 100,25 105,35" fill="#EF4444" />
      </motion.g>
    </svg>
  )
}

// Окружающий мир - Космос
function SpaceSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="spaceGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#312E81" />
        </radialGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="90"
        fill="url(#spaceGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Звёзды */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 20 + Math.random() * 160
        const y = 20 + Math.random() * 160
        return (
          <motion.circle
            key={i}
            cx={x} cy={y} r="1.5"
            fill="#FBBF24"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ delay: i * 0.1, duration: 1 + Math.random(), repeat: Infinity }}
          />
        )
      })}
      
      {/* Солнце */}
      <motion.circle
        cx="100" cy="100"
        r="20"
        fill="#FBBF24"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Орбиты и планеты */}
      {[
        { r: 35, speed: 3, size: 5, color: "#EF4444" },    // Меркурий
        { r: 50, speed: 5, size: 7, color: "#F59E0B" },    // Венера
        { r: 65, speed: 7, size: 8, color: "#3B82F6" },    // Земля
        { r: 80, speed: 10, size: 6, color: "#EF4444" }    // Марс
      ].map((planet, i) => (
        <motion.g key={i}>
          {/* Орбита */}
          <circle
            cx="100" cy="100" r={planet.r}
            fill="none"
            stroke="#4338CA"
            strokeWidth="1"
            strokeDasharray="3"
          />
          {/* Планета */}
          <motion.circle
            cx={100 + planet.r} cy="100"
            r={planet.size}
            fill={planet.color}
            animate={{ rotate: 360 }}
            transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '100px 100px' }}
          />
        </motion.g>
      ))}
    </svg>
  )
}

// Окружающий мир - Экология
function EcologySVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="ecoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#10B98120"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Земной шар */}
      <motion.circle
        cx="100" cy="100"
        r="60"
        fill="#3B82F6"
        stroke="url(#ecoGrad)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Континенты */}
      <motion.ellipse
        cx="80" cy="80"
        rx="25" ry="15"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.ellipse
        cx="120" cy="110"
        rx="20" ry="25"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      />
      
      {/* Листочки-руки (забота о природе) */}
      {[
        { x: 50, y: 60, rotation: -30 },
        { x: 150, y: 60, rotation: 30 },
        { x: 50, y: 140, rotation: -150 },
        { x: 150, y: 140, rotation: 150 }
      ].map((leaf, i) => (
        <motion.path
          key={i}
          d="M100,100 Q120,80 100,60 Q80,80 100,100"
          fill="#10B981"
          initial={{ x: leaf.x - 100, y: leaf.y - 100, opacity: 0 }}
          animate={{ x: leaf.x - 100, y: leaf.y - 100, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
          style={{ transform: `rotate(${leaf.rotation}deg)`, transformOrigin: '100px 100px' }}
        />
      ))}
      
      {/* Вращающиеся стрелки рециклинга */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      >
        {[0, 120, 240].map((angle, i) => (
          <path
            key={i}
            d={`M${100 + 75 * Math.cos(angle * Math.PI / 180)},${100 + 75 * Math.sin(angle * Math.PI / 180)} 
                l5,-10 l5,10 z`}
            fill="#34D399"
          />
        ))}
      </motion.g>
    </svg>
  )
}

// История
function HistorySVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="histGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#B4530920"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Свиток */}
      <motion.rect
        x="40" y="50"
        width="120" height="100"
        fill="#FEF3C7"
        stroke="url(#histGrad)"
        strokeWidth="3"
        rx="5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Свернутые края */}
      <motion.ellipse
        cx="40" cy="100"
        rx="10" ry="50"
        fill="#D97706"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.ellipse
        cx="160" cy="100"
        rx="10" ry="50"
        fill="#D97706"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Текст на свитке */}
      {[0, 1, 2, 3].map(i => (
        <motion.rect
          key={i}
          x="60" y={65 + i * 22}
          width="80" height="4"
          fill="#B4530940"
          rx="2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        />
      ))}
      
      {/* Песочные часы */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <polygon points="30,150 50,150 40,170" fill="#D97706" />
        <polygon points="30,180 50,180 40,160" fill="#D97706" />
        <motion.rect
          x="38" y="155"
          width="4" height="10"
          fill="#B45309"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  )
}

// География
function GeographySVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="geoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#0EA5E920"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Глобус */}
      <motion.circle
        cx="100" cy="100"
        r="60"
        fill="#0EA5E940"
        stroke="url(#geoGrad2)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Континенты */}
      <motion.ellipse
        cx="80" cy="85"
        rx="25" ry="18"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.ellipse
        cx="115" cy="115"
        rx="18" ry="25"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      />
      
      {/* Меридианы */}
      <motion.ellipse
        cx="100" cy="100"
        rx="30" ry="60"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="1"
        strokeDasharray="3"
      />
      <motion.ellipse
        cx="100" cy="100"
        rx="60" ry="30"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="1"
        strokeDasharray="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8 }}
      />
      
      {/* Вращение глобуса */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '100px 100px' }}
      >
        <line x1="100" y1="35" x2="100" y2="45" stroke="#0EA5E9" strokeWidth="2" />
        <line x1="100" y1="155" x2="100" y2="165" stroke="#0EA5E9" strokeWidth="2" />
      </motion.g>
    </svg>
  )
}

// Биология
function BiologySVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="bioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#22C55E20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Клетка */}
      <motion.ellipse
        cx="100" cy="100"
        rx="60" ry="50"
        fill="#22C55E40"
        stroke="url(#bioGrad)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Ядро */}
      <motion.ellipse
        cx="100" cy="100"
        rx="25" ry="20"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Органеллы */}
      {[
        { x: 60, y: 80 },
        { x: 140, y: 80 },
        { x: 70, y: 120 },
        { x: 130, y: 120 }
      ].map((pos, i) => (
        <motion.ellipse
          key={i}
          cx={pos.x} cy={pos.y}
          rx="12" ry="8"
          fill="#86EFAC"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        />
      ))}
      
      {/* ДНК-спираль */}
      <motion.path
        d="M160,60 Q175,80 160,100 Q145,120 160,140"
        fill="none"
        stroke="#22C55E"
        strokeWidth="3"
        strokeDasharray="5,3"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  )
}

// Физика
function PhysicsSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="physGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#6366F120"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Атом */}
      {[
        { rx: 50, ry: 20, rotation: 0 },
        { rx: 50, ry: 20, rotation: 60 },
        { rx: 50, ry: 20, rotation: 120 }
      ].map((orbit, i) => (
        <motion.ellipse
          key={i}
          cx="100" cy="100"
          rx={orbit.rx} ry={orbit.ry}
          fill="none"
          stroke="#818CF8"
          strokeWidth="2"
          style={{ transform: `rotate(${orbit.rotation}deg)`, transformOrigin: '100px 100px' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2 }}
        />
      ))}
      
      {/* Ядро атома */}
      <motion.circle
        cx="100" cy="100"
        r="15"
        fill="url(#physGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6 }}
      />
      
      {/* Электроны */}
      {[
        { angle: 0, speed: 2 },
        { angle: 60, speed: 3 },
        { angle: 120, speed: 2.5 }
      ].map((electron, i) => (
        <motion.circle
          key={i}
          cx="100"
          cy="100"
          r="6"
          fill="#FBBF24"
          animate={{ rotate: 360 }}
          transition={{ duration: electron.speed, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px' }}
        />
      ))}
      
      {/* Формула */}
      <motion.text
        x="100" y="180"
        textAnchor="middle"
        fontSize="14"
        fill="#818CF8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        E = mc²
      </motion.text>
    </svg>
  )
}

// Химия
function ChemistrySVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="chemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#14B8A620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Колба */}
      <motion.path
        d="M70,40 L70,80 L50,130 Q50,150 70,150 L130,150 Q150,150 150,130 L130,80 L130,40 Z"
        fill="#14B8A640"
        stroke="url(#chemGrad)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Жидкость */}
      <motion.path
        d="M60,120 L55,130 Q55,145 70,145 L130,145 Q145,145 145,130 L140,120 Z"
        fill="#8B5CF6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ delay: 0.5 }}
      />
      
      {/* Пузырьки */}
      {[
        { x: 80, y: 135 },
        { x: 100, y: 130 },
        { x: 120, y: 138 },
        { x: 90, y: 125 },
        { x: 110, y: 132 }
      ].map((bubble, i) => (
        <motion.circle
          key={i}
          cx={bubble.x} cy={bubble.y}
          r="3"
          fill="#C4B5FD"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
        />
      ))}
      
      {/* Периодическая таблица (мини) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <rect x="30" y="165" width="20" height="15" fill="#EF4444" rx="2" />
        <rect x="55" y="165" width="20" height="15" fill="#F59E0B" rx="2" />
        <rect x="125" y="165" width="20" height="15" fill="#10B981" rx="2" />
        <rect x="150" y="165" width="20" height="15" fill="#3B82F6" rx="2" />
        <text x="40" y="177" textAnchor="middle" fontSize="8" fill="white">H</text>
        <text x="65" y="177" textAnchor="middle" fontSize="8" fill="white">He</text>
        <text x="135" y="177" textAnchor="middle" fontSize="8" fill="white">O</text>
        <text x="160" y="177" textAnchor="middle" fontSize="8" fill="white">C</text>
      </motion.g>
    </svg>
  )
}

// Английский
function EnglishSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="engGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#DC262620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Флаг Великобритании (упрощённый) */}
      <motion.rect
        x="40" y="60"
        width="120" height="80"
        fill="#3B82F6"
        stroke="white"
        strokeWidth="3"
        rx="5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Диагональные линии */}
      <motion.path
        d="M40,60 L160,140 M160,60 L40,140"
        fill="none"
        stroke="white"
        strokeWidth="12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Вертикальная и горизонтальная */}
      <motion.path
        d="M100,60 L100,140 M40,100 L160,100"
        fill="none"
        stroke="white"
        strokeWidth="10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5 }}
      />
      
      {/* Красные полосы */}
      <motion.path
        d="M100,60 L100,140 M40,100 L160,100"
        fill="none"
        stroke="#DC2626"
        strokeWidth="6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.7 }}
      />
      
      {/* ABC */}
      <motion.text
        x="100" y="175"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="url(#engGrad)"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        A B C D E F
      </motion.text>
    </svg>
  )
}

// Музыка
function MusicSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="musGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#EC489920"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Нотный стан */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.line
          key={i}
          x1="30" y1={60 + i * 15} x2="170" y2={60 + i * 15}
          stroke="#F472B6"
          strokeWidth="1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
      
      {/* Скрипичный ключ */}
      <motion.text
        x="35" y="95"
        fontSize="50"
        fill="url(#musGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        𝄞
      </motion.text>
      
      {/* Ноты */}
      {['♩', '♪', '♫', '♬'].map((note, i) => (
        <motion.text
          key={i}
          x={70 + i * 30} y={80 + (i % 2) * 15}
          fontSize="28"
          fill="#EC4899"
          animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
        >
          {note}
        </motion.text>
      ))}
      
      {/* Звуковые волны */}
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path d="M165,90 Q175,100 165,110" fill="none" stroke="#F472B6" strokeWidth="2" />
        <path d="M170,85 Q185,100 170,115" fill="none" stroke="#F472B6" strokeWidth="2" />
      </motion.g>
    </svg>
  )
}

// ИЗО
function ArtSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="artGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#F59E0B20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Палитра */}
      <motion.ellipse
        cx="100" cy="110"
        rx="60" ry="40"
        fill="#F5F5F5"
        stroke="url(#artGrad)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Отверстие для пальца */}
      <motion.circle
        cx="70" cy="95"
        r="12"
        fill="#F59E0B20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Краски на палитре */}
      {[
        { x: 100, y: 90, color: "#EF4444" },
        { x: 125, y: 100, color: "#3B82F6" },
        { x: 115, y: 125, color: "#FBBF24" },
        { x: 85, y: 130, color: "#10B981" },
        { x: 60, y: 115, color: "#8B5CF6" }
      ].map((paint, i) => (
        <motion.circle
          key={i}
          cx={paint.x} cy={paint.y}
          r="10"
          fill={paint.color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
        />
      ))}
      
      {/* Кисть */}
      <motion.g
        initial={{ rotate: -30, x: -20 }}
        animate={{ rotate: 0, x: 0 }}
        transition={{ delay: 1, type: "spring" }}
        style={{ transformOrigin: '160px 60px' }}
      >
        <rect x="155" y="30" width="8" height="50" fill="#B45309" rx="2" />
        <path d="M155,80 L159,95 L163,80 Z" fill="#EF4444" />
      </motion.g>
    </svg>
  )
}

// Физкультура
function PESVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="peGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#F9731620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Бегущий человечек */}
      <motion.g
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {/* Голова */}
        <motion.circle
          cx="90" cy="60"
          r="15"
          fill="url(#peGrad)"
        />
        {/* Тело */}
        <motion.line
          x1="90" y1="75" x2="90" y2="110"
          stroke="url(#peGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Руки */}
        <motion.line
          x1="90" y1="85" x2="70" y2="100"
          stroke="#FB923C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <motion.line
          x1="90" y1="85" x2="110" y2="95"
          stroke="#FB923C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Ноги */}
        <motion.line
          x1="90" y1="110" x2="75" y2="140"
          stroke="#FB923C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <motion.line
          x1="90" y1="110" x2="105" y2="135"
          stroke="#FB923C"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </motion.g>
      
      {/* Мяч */}
      <motion.circle
        cx="140" cy="130"
        r="20"
        fill="#F97316"
        stroke="#FB923C"
        strokeWidth="2"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      {/* Линии на мяче */}
      <motion.path
        d="M130,120 Q140,130 130,140 M150,120 Q140,130 150,140"
        fill="none"
        stroke="white"
        strokeWidth="2"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      {/* Звёзды */}
      {['⭐', '⭐', '⭐'].map((star, i) => (
        <motion.text
          key={i}
          x={50 + i * 20}
          y={170 + (i % 2) * 15}
          fontSize="16"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
        >
          {star}
        </motion.text>
      ))}
    </svg>
  )
}

// Дефолтный SVG
function DefaultSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="defGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="100" cy="100" r="85"
        fill="#8B5CF620"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      
      {/* Книга */}
      <motion.path
        d="M50,50 L100,60 L100,150 L50,140 Z"
        fill="#8B5CF640"
        stroke="url(#defGrad)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      <motion.path
        d="M150,50 L100,60 L100,150 L150,140 Z"
        fill="#EC489940"
        stroke="url(#defGrad)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      />
      
      {/* Звёздочки */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * 72 - 90) * Math.PI / 180
        const x = 100 + 65 * Math.cos(angle)
        const y = 100 + 65 * Math.sin(angle)
        
        return (
          <motion.text
            key={i}
            x={x} y={y}
            textAnchor="middle"
            fontSize="20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.text>
        )
      })}
      
      {/* Центральный текст */}
      <motion.text
        x="100" y="180"
        textAnchor="middle"
        fontSize="14"
        fill="url(#defGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Урок
      </motion.text>
    </svg>
  )
}
