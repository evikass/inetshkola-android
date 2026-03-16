'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FlaskConical, Atom, Lightbulb, Factory, History, Sparkles } from 'lucide-react';

// ====================== РАСШИРЕННЫЙ ИНТЕРФЕЙС ЭЛЕМЕНТА ======================
interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  mass: string;
  period: number;
  group: number;
  block: 's' | 'p' | 'd' | 'f';
  // Новые поля
  discoveredBy: string;
  yearDiscovered: string;
  discoveryPlace: string;
  applications: string[];
  interestingFacts: string[];
  category: string;
}

// ====================== АНИМИРОВАННАЯ МОДЕЛЬ АТОМА ======================
interface AtomModelProps {
  atomicNumber: number;
  symbol: string;
  color?: string;
}

const AtomModel: React.FC<AtomModelProps> = ({ atomicNumber, symbol, color = '#8b5cf6' }) => {
  const electrons = Math.min(Math.max(atomicNumber, 1), 20);
  const shells = Math.ceil(Math.sqrt(electrons));

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg width="192" height="192" viewBox="0 0 120 120" className="drop-shadow-2xl">
        {/* ядро */}
        <circle cx="60" cy="60" r="14" fill="#1e2937" />
        <text x="60" y="65" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
          {symbol}
        </text>

        {/* оболочки с анимацией */}
        {Array.from({ length: shells }, (_, i) => {
          const radius = 24 + i * 14;
          const electronsOnShell = Math.min(Math.max(electrons - i * 4, 0), 8);
          
          return (
            <g key={i}>
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="6 3"
                className="opacity-50"
              >
                <animate
                  attributeName="r"
                  values={`${radius-1};${radius+1};${radius-1}`}
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* электроны */}
              {Array.from({ length: electronsOnShell }, (_, j) => {
                const duration = 3 + i * 0.5;
                const angle = (j * 360) / electronsOnShell + i * 30;
                
                return (
                  <circle
                    key={j}
                    r="4"
                    fill={color}
                  >
                    <animate
                      attributeName="cx"
                      values={`${60 + radius * Math.cos((angle * Math.PI) / 180)};${60 + radius * Math.cos(((angle + 360) * Math.PI) / 180)};${60 + radius * Math.cos((angle * Math.PI) / 180)}`}
                      dur={`${duration}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values={`${60 + radius * Math.sin((angle * Math.PI) / 180)};${60 + radius * Math.sin(((angle + 360) * Math.PI) / 180)};${60 + radius * Math.sin((angle * Math.PI) / 180)}`}
                      dur={`${duration}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="4;5;4"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>
          );
        })}
      </svg>
      
      {/* Свечение вокруг атома */}
      <div 
        className="absolute inset-0 rounded-full animate-pulse opacity-20"
        style={{ 
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

// ====================== ПОЛНЫЕ ДАННЫЕ ЭЛЕМЕНТОВ ======================
const elementsData: Element[] = [
  // ПЕРИОД 1
  { 
    atomicNumber: 1, symbol: 'H', name: 'Водород', mass: '1.008', period: 1, group: 1, block: 's',
    discoveredBy: 'Генри Кавендиш', yearDiscovered: '1766', discoveryPlace: 'Англия',
    category: 'Неметалл',
    applications: [
      'Ракетное топливо',
      'Производство аммиака',
      'Водородные топливные элементы',
      'Сварка и резка металлов'
    ],
    interestingFacts: [
      'Самый распространённый элемент во Вселенной (75% массы)',
      'Самый лёгкий элемент',
      'Имеет 3 изотопа: протий, дейтерий, тритий',
      'В соединении с кислородом образует воду'
    ]
  },
  { 
    atomicNumber: 2, symbol: 'He', name: 'Гелий', mass: '4.0026', period: 1, group: 18, block: 'p',
    discoveredBy: 'Пьер Жансен, Норман Локьер', yearDiscovered: '1868', discoveryPlace: 'Солнце (спектральный анализ)',
    category: 'Благородный газ',
    applications: [
      'Охлаждение сверхпроводников',
      'Наполнение воздушных шаров и дирижаблей',
      'Глубоководные погружения (гелиокс)',
      'Лазеры'
    ],
    interestingFacts: [
      'Второй самый лёгкий элемент',
      'Был открыт на Солнце раньше, чем на Земле',
      'Не замерзает даже при абсолютном нуле (при нормальном давлении)',
      'Назван в честь греческого бога Солнца Гелиоса'
    ]
  },
  // ПЕРИОД 2
  { 
    atomicNumber: 3, symbol: 'Li', name: 'Литий', mass: '6.94', period: 2, group: 1, block: 's',
    discoveredBy: 'Йохан Арфведсон', yearDiscovered: '1817', discoveryPlace: 'Швеция',
    category: 'Щелочной металл',
    applications: [
      'Литиевые батарейки и аккумуляторы',
      'Психиатрия (лечение биполярного расстройства)',
      'Алюминиевые сплавы',
      'Стеклокерамика'
    ],
    interestingFacts: [
      'Самый лёгкий из металлов — плавает в воде',
      'Входит в состав многих минералов',
      'Используется в термоядерном синтезе',
      'Название от греч. "литос" — камень'
    ]
  },
  { 
    atomicNumber: 4, symbol: 'Be', name: 'Бериллий', mass: '9.0122', period: 2, group: 2, block: 's',
    discoveredBy: 'Луи Никола Воклен', yearDiscovered: '1798', discoveryPlace: 'Франция',
    category: 'Щёлочноземельный металл',
    applications: [
      'Аэрокосмическая промышленность',
      'Рентгеновские окна',
      'Ядерные реакторы (замедлитель нейтронов)',
      'Сплавы для пружин'
    ],
    interestingFacts: [
      'Очень токсичен, особенно в виде пыли',
      'Прозрачен для рентгеновских лучей',
      'Название от минерала берилла',
      'В 6 раз легче стали, но прочнее'
    ]
  },
  { 
    atomicNumber: 5, symbol: 'B', name: 'Бор', mass: '10.81', period: 2, group: 13, block: 'p',
    discoveredBy: 'Жозеф Луи Гей-Люссак, Луи Тенар', yearDiscovered: '1808', discoveryPlace: 'Франция',
    category: 'Металлоид',
    applications: [
      'Стекловолокно и боросиликатное стекло',
      'Упрочнение сплавов',
      'Дезинфицирующие средства',
      'Полупроводники'
    ],
    interestingFacts: [
      'Название от араб. "барак" — блестеть',
      'По твёрдости уступает только алмазу',
      'Образует структуру, похожую на бакибол',
      'Необходим растениям для роста'
    ]
  },
  { 
    atomicNumber: 6, symbol: 'C', name: 'Углерод', mass: '12.011', period: 2, group: 14, block: 'p',
    discoveredBy: 'Известен с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Неметалл',
    applications: [
      'Основа всей органической химии',
      'Графит (карандаши, смазка)',
      'Алмазы (ювелирные и промышленные)',
      'Активированный уголь'
    ],
    interestingFacts: [
      'Основа жизни на Земле',
      'Образует более 10 миллионов соединений',
      'Имеет несколько аллотропов: алмаз, графит, фуллерен, графен',
      'Графен — самый прочный материал'
    ]
  },
  { 
    atomicNumber: 7, symbol: 'N', name: 'Азот', mass: '14.007', period: 2, group: 15, block: 'p',
    discoveredBy: 'Дэниел Резерфорд', yearDiscovered: '1772', discoveryPlace: 'Шотландия',
    category: 'Неметалл',
    applications: [
      'Производство аммиака и удобрений',
      'Защитная атмосфера (в лампах, при сварке)',
      'Криогенное охлаждение (жидкий азот)',
      'Упаковка продуктов'
    ],
    interestingFacts: [
      'Составляет 78% атмосферы Земли',
      'Название от греч. "азоос" — безжизненный',
      'Необходим для жизни (белки, ДНК)',
      'Жидкий азот имеет температуру -196°C'
    ]
  },
  { 
    atomicNumber: 8, symbol: 'O', name: 'Кислород', mass: '15.999', period: 2, group: 16, block: 'p',
    discoveredBy: 'Карл Шееле, Джозеф Пристли', yearDiscovered: '1774', discoveryPlace: 'Швеция, Англия',
    category: 'Неметалл',
    applications: [
      'Дыхание живых организмов',
      'Медицина (кислородные маски)',
      'Металлургия (выплавка стали)',
      'Ракетное топливо (окислитель)'
    ],
    interestingFacts: [
      'Составляет 21% атмосферы',
      'Самый распространённый элемент в земной коре (47%)',
      'Открыт независимо двумя учёными',
      'Озон — аллотропная форма кислорода'
    ]
  },
  { 
    atomicNumber: 9, symbol: 'F', name: 'Фтор', mass: '18.998', period: 2, group: 17, block: 'p',
    discoveredBy: 'Анри Муассан', yearDiscovered: '1886', discoveryPlace: 'Франция',
    category: 'Галоген',
    applications: [
      'Зубная паста (фториды для защиты зубов)',
      'Тефлон (антипригарные покрытия)',
      'Холодильные агенты',
      'Электроника (травление плат)'
    ],
    interestingFacts: [
      'Самый химически активный элемент',
      'Реагирует почти со всеми элементами',
      'Выделяется при электролизе',
      'Название от греч. "фторос" — разрушающий'
    ]
  },
  { 
    atomicNumber: 10, symbol: 'Ne', name: 'Неон', mass: '20.180', period: 2, group: 18, block: 'p',
    discoveredBy: 'Уильям Рамзай, Моррис Траверс', yearDiscovered: '1898', discoveryPlace: 'Англия',
    category: 'Благородный газ',
    applications: [
      'Неоновые вывески и реклама',
      'Лазеры',
      'Индикаторы высокого напряжения',
      'Криогеника'
    ],
    interestingFacts: [
      'Даёт характерное оранжево-красное свечение',
      'Название от греч. "неос" — новый',
      'Содержится в воздухе в ничтожных количествах (0,0018%)',
      'В 3 раза легче воздуха'
    ]
  },
  // ПЕРИОД 3
  { 
    atomicNumber: 11, symbol: 'Na', name: 'Натрий', mass: '22.990', period: 3, group: 1, block: 's',
    discoveredBy: 'Гемфри Дэви', yearDiscovered: '1807', discoveryPlace: 'Англия',
    category: 'Щелочной металл',
    applications: [
      'Производство бумаги и мыла',
      'Уличные фонари (натриевые лампы)',
      'Ядерные реакторы (теплоноситель)',
      'Приправа (поваренная соль NaCl)'
    ],
    interestingFacts: [
      'Вступает в бурную реакцию с водой',
      'Шестой по распространённости элемент на Земле',
      'Необходим для нервной системы',
      'Мягкий — режется ножом'
    ]
  },
  { 
    atomicNumber: 12, symbol: 'Mg', name: 'Магний', mass: '24.305', period: 3, group: 2, block: 's',
    discoveredBy: 'Джозеф Блэк', yearDiscovered: '1755', discoveryPlace: 'Шотландия',
    category: 'Щёлочноземельный металл',
    applications: [
      'Лёгкие сплавы (авиация, автомобили)',
      'Пиротехника (яркая белая вспышка)',
      'Медицина (антациды, слабительные)',
      'Десульфурация стали'
    ],
    interestingFacts: [
      'Горит ослепительно ярким пламенем',
      'Входит в состав хлорофилла',
      'Третий по распространённости в морской воде',
      'Выделяется из морской воды'
    ]
  },
  { 
    atomicNumber: 13, symbol: 'Al', name: 'Алюминий', mass: '26.982', period: 3, group: 13, block: 'p',
    discoveredBy: 'Ганс Кристиан Эрстед', yearDiscovered: '1825', discoveryPlace: 'Дания',
    category: 'Металл',
    applications: [
      'Банки для напитков',
      'Авиация и космонавтика',
      'Электропроводка',
      'Фольга и упаковка'
    ],
    interestingFacts: [
      'Самый распространённый металл в земной коре',
      'В XIX веке был дороже золота',
      'Лёгкий и не ржавеет',
      'Перерабатывается на 100%'
    ]
  },
  { 
    atomicNumber: 14, symbol: 'Si', name: 'Кремний', mass: '28.085', period: 3, group: 14, block: 'p',
    discoveredBy: 'Йёнс Якоб Берцелиус', yearDiscovered: '1824', discoveryPlace: 'Швеция',
    category: 'Металлоид',
    applications: [
      'Микроэлектроника (процессоры, чипы)',
      'Солнечные батареи',
      'Стекло и керамика',
      'Силиконовые герметики'
    ],
    interestingFacts: [
      'Второй по распространённости элемент в земной коре',
      'Основа компьютерной индустрии ("Кремниевая долина")',
      'Полупроводник',
      'Входит в состав песка и кварца'
    ]
  },
  { 
    atomicNumber: 15, symbol: 'P', name: 'Фосфор', mass: '30.974', period: 3, group: 15, block: 'p',
    discoveredBy: 'Хенниг Бранд', yearDiscovered: '1669', discoveryPlace: 'Германия',
    category: 'Неметалл',
    applications: [
      'Спички',
      'Удобрения',
      'Моющие средства',
      'Пищевая добавка (E338)'
    ],
    interestingFacts: [
      'Первый элемент, открытый алхимиком',
      'Светится в темноте (хемилюминесценция)',
      'Название от греч. "фосфорос" — несущий свет',
      'Содержится в костях и зубах'
    ]
  },
  { 
    atomicNumber: 16, symbol: 'S', name: 'Сера', mass: '32.06', period: 3, group: 16, block: 'p',
    discoveredBy: 'Известна с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Неметалл',
    applications: [
      'Производство серной кислоты',
      'Вулканизация резины',
      'Серные удобрения',
      'Медицина (серные мази)'
    ],
    interestingFacts: [
      'Имеет характерный запах (запах тухлых яиц)',
      'Встречается в самородном виде',
      'Используется в медицине с древности',
      'Составляет 0,05% массы человеческого тела'
    ]
  },
  { 
    atomicNumber: 17, symbol: 'Cl', name: 'Хлор', mass: '35.45', period: 3, group: 17, block: 'p',
    discoveredBy: 'Карл Шееле', yearDiscovered: '1774', discoveryPlace: 'Швеция',
    category: 'Галоген',
    applications: [
      'Дезинфекция воды в бассейнах',
      'Производство ПВХ',
      'Отбеливание бумаги и тканей',
      'Дезинфицирующие средства'
    ],
    interestingFacts: [
      'Жёлто-зелёный газ с резким запахом',
      'Использовался как химическое оружие в WWI',
      'Название от греч. "хлорос" — зелёный',
      'Токсичен в высоких концентрациях'
    ]
  },
  { 
    atomicNumber: 18, symbol: 'Ar', name: 'Аргон', mass: '39.948', period: 3, group: 18, block: 'p',
    discoveredBy: 'Лорд Рэлей, Уильям Рамзай', yearDiscovered: '1894', discoveryPlace: 'Англия',
    category: 'Благородный газ',
    applications: [
      'Заполнение ламп накаливания',
      'Сварка в защитной атмосфере',
      'Изоляция окон (между стёклами)',
      'Лазеры'
    ],
    interestingFacts: [
      'Третий по содержанию газ в атмосфере (0,93%)',
      'Название от греч. "аргос" — ленивый (неактивный)',
      'Открыт благодаря разнице плотности воздуха',
      'Используется в виноделии для защиты вина'
    ]
  },
  // ПЕРИОД 4
  { 
    atomicNumber: 19, symbol: 'K', name: 'Калий', mass: '39.098', period: 4, group: 1, block: 's',
    discoveredBy: 'Гемфри Дэви', yearDiscovered: '1807', discoveryPlace: 'Англия',
    category: 'Щелочной металл',
    applications: [
      'Калийные удобрения',
      'Мыло и стекло',
      'Пищевая промышленность (замена соли)',
      'Медицина'
    ],
    interestingFacts: [
      'Реагирует с водой со взрывом',
      'Открыт в золе растений ("поташ")',
      'Название от араб. "кали" — зола',
      'Необходим для работы сердца'
    ]
  },
  { 
    atomicNumber: 20, symbol: 'Ca', name: 'Кальций', mass: '40.078', period: 4, group: 2, block: 's',
    discoveredBy: 'Гемфри Дэви', yearDiscovered: '1808', discoveryPlace: 'Англия',
    category: 'Щёлочноземельный металл',
    applications: [
      'Строительство (цемент, известь, гипс)',
      'Металлургия (раскислитель)',
      'Пищевые добавки',
      'Мел и мрамор'
    ],
    interestingFacts: [
      'Пятый по распространённости элемент в земной коре',
      'Основа костей и зубов',
      'Название от лат. "калькс" — известь',
      'Содержится в молоке и молочных продуктах'
    ]
  },
  { 
    atomicNumber: 21, symbol: 'Sc', name: 'Скандий', mass: '44.956', period: 4, group: 3, block: 'd',
    discoveredBy: 'Ларс Фредерик Нильсон', yearDiscovered: '1879', discoveryPlace: 'Швеция',
    category: 'Переходный металл',
    applications: [
      'Алюминиевые сплавы для авиации',
      'Спортивное оборудование',
      'Высокоинтенсивные лампы',
      'Лазеры'
    ],
    interestingFacts: [
      'Предсказан Менделеевым как "эка-бор"',
      'Назван в честь Скандинавии',
      'Очень редкий и дорогой',
      'В 50 раз дороже серебра'
    ]
  },
  { 
    atomicNumber: 22, symbol: 'Ti', name: 'Титан', mass: '47.867', period: 4, group: 4, block: 'd',
    discoveredBy: 'Уильям Грегор', yearDiscovered: '1791', discoveryPlace: 'Англия',
    category: 'Переходный металл',
    applications: [
      'Авиация и космонавтика',
      'Медицинские импланты',
      'Ювелирные изделия',
      'Спортивные товары'
    ],
    interestingFacts: [
      'Назван в честь титанов греческой мифологии',
      'Прочный как сталь, но на 45% легче',
      'Устойчив к коррозии',
      'Девятый по распространённости элемент'
    ]
  },
  { 
    atomicNumber: 23, symbol: 'V', name: 'Ванадий', mass: '50.942', period: 4, group: 5, block: 'd',
    discoveredBy: 'Андрес Мануэль дель Рио', yearDiscovered: '1801', discoveryPlace: 'Мексика',
    category: 'Переходный металл',
    applications: [
      'Легирование стали',
      'Химические катализаторы',
      'Ванадиево-красные батареи',
      'Инструментальные стали'
    ],
    interestingFacts: [
      'Назван в честь скандинавской богини Ванадис',
      'Даёт красивые цветные соединения',
      'Открыт дважды (сначала принят за свинец)',
      'Содержится в нефти'
    ]
  },
  { 
    atomicNumber: 24, symbol: 'Cr', name: 'Хром', mass: '51.996', period: 4, group: 6, block: 'd',
    discoveredBy: 'Луи Никола Воклен', yearDiscovered: '1797', discoveryPlace: 'Франция',
    category: 'Переходный металл',
    applications: [
      'Хромирование (защитное покрытие)',
      'Нержавеющая сталь',
      'Кожевенная промышленность',
      'Пигменты (жёлтый, оранжевый, зелёный)'
    ],
    interestingFacts: [
      'Название от греч. "хрома" — цвет',
      'Соединения имеют яркие цвета',
      'Придаёт рубину красный цвет',
      'Твёрдость по Моосу — 8,5'
    ]
  },
  { 
    atomicNumber: 25, symbol: 'Mn', name: 'Марганец', mass: '54.938', period: 4, group: 7, block: 'd',
    discoveredBy: 'Юхан Готлиб Ган', yearDiscovered: '1774', discoveryPlace: 'Швеция',
    category: 'Переходный металл',
    applications: [
      'Производство стали',
      'Батарейки (диоксид марганца)',
      'Стекло (обесцвечивание)',
      'Удобрения'
    ],
    interestingFacts: [
      'Открыт в пиролюзите (минерал)',
      'Необходим для костей',
      'Двенадцатый по распространённости',
      'Используется с древности (стекло)'
    ]
  },
  { 
    atomicNumber: 26, symbol: 'Fe', name: 'Железо', mass: '55.845', period: 4, group: 8, block: 'd',
    discoveredBy: 'Известно с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Переходный металл',
    applications: [
      'Строительство и машиностроение',
      'Транспорт (авто, поезда, корабли)',
      'Бытовые приборы',
      'Медицина (железо в крови)'
    ],
    interestingFacts: [
      'Самый распространённый металл на Земле',
      'Составляет 35% массы Земли',
      'Основа гемоглобина',
      'Ядро Земли состоит из железа и никеля'
    ]
  },
  { 
    atomicNumber: 27, symbol: 'Co', name: 'Кобальт', mass: '58.933', period: 4, group: 9, block: 'd',
    discoveredBy: 'Георг Брандт', yearDiscovered: '1735', discoveryPlace: 'Швеция',
    category: 'Переходный металл',
    applications: [
      'Литий-ионные батареи',
      'Суперсплавы для турбин',
      'Синие пигменты (кобальтовая синь)',
      'Магниты'
    ],
    interestingFacts: [
      'Название от нем. "кобольд" — гном',
      'Даёт красивый синий цвет стеклу',
      'Входит в состав витамина B12',
      'Важнейший элемент для аккумуляторов'
    ]
  },
  { 
    atomicNumber: 28, symbol: 'Ni', name: 'Никель', mass: '58.693', period: 4, group: 10, block: 'd',
    discoveredBy: 'Аксель Фредерик Кронштедт', yearDiscovered: '1751', discoveryPlace: 'Швеция',
    category: 'Переходный металл',
    applications: [
      'Монеты',
      'Нержавеющая сталь',
      'Аккумуляторы',
      'Покрытия (никелирование)'
    ],
    interestingFacts: [
      'Название от нем. "купферникель" — чертова медь',
      'Магнитный при комнатной температуре',
      'Пятый по распространённости элемент на Земле',
      'Метеориты содержат до 20% никеля'
    ]
  },
  { 
    atomicNumber: 29, symbol: 'Cu', name: 'Медь', mass: '63.546', period: 4, group: 11, block: 'd',
    discoveredBy: 'Известна с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Переходный металл',
    applications: [
      'Электропроводка',
      'Трубы и сантехника',
      'Крыши и архитектура',
      'Монеты и украшения'
    ],
    interestingFacts: [
      'Используется более 10000 лет',
      'Отличный проводник тепла и электричества',
      'Бактерицидные свойства',
      'Придаёт крови голубой цвет у ракообразных'
    ]
  },
  { 
    atomicNumber: 30, symbol: 'Zn', name: 'Цинк', mass: '65.38', period: 4, group: 12, block: 'd',
    discoveredBy: 'Андреас Сигизмунд Маркграф', yearDiscovered: '1746', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Гальванизация стали',
      'Батарейки',
      'Латунирование (сплав с медью)',
      'Кремы от загара (оксид цинка)'
    ],
    interestingFacts: [
      'Использовался в древнем Риме (латунь)',
      'Необходим для иммунитета',
      'Покрывается защитной плёнкой',
      'Входит в состав инсулина'
    ]
  },
  { 
    atomicNumber: 31, symbol: 'Ga', name: 'Галлий', mass: '69.723', period: 4, group: 13, block: 'p',
    discoveredBy: 'Поль Эмиль Лекок де Буабодран', yearDiscovered: '1875', discoveryPlace: 'Франция',
    category: 'Металл',
    applications: [
      'Полупроводники (арсенид галлия)',
      'Светодиоды',
      'Термометры (плавится в руке)',
      'Солнечные батареи'
    ],
    interestingFacts: [
      'Плавится при 30°C (в руке)',
      'Предсказан Менделеевым как "эка-алюминий"',
      'Назван в честь Франции (Галлия)',
      'Не токсичен, в отличие от ртути'
    ]
  },
  { 
    atomicNumber: 32, symbol: 'Ge', name: 'Германий', mass: '72.630', period: 4, group: 14, block: 'p',
    discoveredBy: 'Клеменс Винклер', yearDiscovered: '1886', discoveryPlace: 'Германия',
    category: 'Металлоид',
    applications: [
      'Полупроводники',
      'Инфракрасная оптика',
      'Волоконная оптика',
      'Солнечные батареи'
    ],
    interestingFacts: [
      'Предсказан Менделеевым как "эка-кремний"',
      'Назван в честь Германии',
      'Первый транзистор был из германия',
      'Сейчас в основном вытеснен кремнием'
    ]
  },
  { 
    atomicNumber: 33, symbol: 'As', name: 'Мышьяк', mass: '74.922', period: 4, group: 15, block: 'p',
    discoveredBy: 'Альберт Великий', yearDiscovered: '~1250', discoveryPlace: 'Германия',
    category: 'Металлоид',
    applications: [
      'Полупроводники',
      'Консервант древесины',
      'Пестициды (ограниченно)',
      'Медицина (лечение лейкемии)'
    ],
    interestingFacts: [
      'Известен как яд с древности',
      'В малых дозах необходим организму',
      'Был популярным средством от морщин',
      'Соединения использовались как боевой газ'
    ]
  },
  { 
    atomicNumber: 34, symbol: 'Se', name: 'Селен', mass: '78.971', period: 4, group: 16, block: 'p',
    discoveredBy: 'Йёнс Якоб Берцелиус', yearDiscovered: '1817', discoveryPlace: 'Швеция',
    category: 'Неметалл',
    applications: [
      'Копировальные аппараты (ксерографии)',
      'Стекло (обесцвечивание)',
      'Полупроводники',
      'Пищевые добавки'
    ],
    interestingFacts: [
      'Название от греч. "селена" — Луна',
      'Необходим для работы антиоксидантов',
      'В больших дозах токсичен',
      'Содержится в бразильском орехе'
    ]
  },
  { 
    atomicNumber: 35, symbol: 'Br', name: 'Бром', mass: '79.904', period: 4, group: 17, block: 'p',
    discoveredBy: 'Антуан Жером Балар', yearDiscovered: '1826', discoveryPlace: 'Франция',
    category: 'Галоген',
    applications: [
      'Пламегасители',
      'Фотография (бромид серебра)',
      'Медицина (седативные средства)',
      'Нефтяная промышленность'
    ],
    interestingFacts: [
      'Название от греч. "бромос" — зловоние',
      'Единственный жидкий неметалл при комнатной температуре',
      'Тёмно-красная жидкость',
      'Выводится из организма месяцами'
    ]
  },
  { 
    atomicNumber: 36, symbol: 'Kr', name: 'Криптон', mass: '83.798', period: 4, group: 18, block: 'p',
    discoveredBy: 'Уильям Рамзай, Моррис Траверс', yearDiscovered: '1898', discoveryPlace: 'Англия',
    category: 'Благородный газ',
    applications: [
      'Высокопроизводительные лампы',
      'Лазеры',
      'Изоляция окон',
      'Эталон метра (до 1983)'
    ],
    interestingFacts: [
      'Название от греч. "криптос" — скрытый',
      'Белый свет в лампах',
      'В атмосфере — 1 часть на миллион',
      'Криптон-86 использовался для определения метра'
    ]
  },
  // ПЕРИОД 5
  { 
    atomicNumber: 37, symbol: 'Rb', name: 'Рубидий', mass: '85.468', period: 5, group: 1, block: 's',
    discoveredBy: 'Роберт Бунзен, Густав Кирхгоф', yearDiscovered: '1861', discoveryPlace: 'Германия',
    category: 'Щелочной металл',
    applications: [
      'Атомные часы',
      'Фейерверки (фиолетовый цвет)',
      'Фотоячейки',
      'Медицина (визуализация)'
    ],
    interestingFacts: [
      'Название от лат. "рубидус" — тёмно-красный',
      'Открыт по красной спектральной линии',
      'Очень мягкий',
      'Самовоспламеняется на воздухе'
    ]
  },
  { 
    atomicNumber: 38, symbol: 'Sr', name: 'Стронций', mass: '87.62', period: 5, group: 2, block: 's',
    discoveredBy: 'Уильям Крукшенк', yearDiscovered: '1790', discoveryPlace: 'Шотландия',
    category: 'Щёлочноземельный металл',
    applications: [
      'Фейерверки (красный цвет)',
      'Электронно-лучевые трубки',
      'Магниты',
      'Зубная паста (для чувствительных зубов)'
    ],
    interestingFacts: [
      'Назван в честь шотландской деревни Строншиан',
      'Красное пламя солей стронция',
      'Радиоактивный стронций-90 опасен',
      'Используется в лечении костного рака'
    ]
  },
  { 
    atomicNumber: 39, symbol: 'Y', name: 'Иттрий', mass: '88.906', period: 5, group: 3, block: 'd',
    discoveredBy: 'Юхан Гадолин', yearDiscovered: '1794', discoveryPlace: 'Финляндия',
    category: 'Переходный металл',
    applications: [
      'Светодиоды (белые LED)',
      'Лазеры',
      'Сверхпроводники',
      'Радары'
    ],
    interestingFacts: [
      'Назван в честь шведской деревни Иттербю',
      'Даёт красный цвет в цветных телевизорах',
      'Не токсичен',
      'Открыт в минерале гадолините'
    ]
  },
  { 
    atomicNumber: 40, symbol: 'Zr', name: 'Цирконий', mass: '91.224', period: 5, group: 4, block: 'd',
    discoveredBy: 'Мартин Клапрот', yearDiscovered: '1789', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Ядерные реакторы (оболочки твэлов)',
      'Керамика и эмали',
      'Зубные импланты',
      'Ювелирные изделия (фианиты)'
    ],
    interestingFacts: [
      'Название от персидского "заргун" — золотистый',
      'Не поглощает нейтроны',
      'Фианит — искусственный аналог бриллианта',
      'Прозрачен для нейтронов'
    ]
  },
  { 
    atomicNumber: 41, symbol: 'Nb', name: 'Ниобий', mass: '92.906', period: 5, group: 5, block: 'd',
    discoveredBy: 'Чарльз Хатчетт', yearDiscovered: '1801', discoveryPlace: 'Англия',
    category: 'Переходный металл',
    applications: [
      'Суперсплавы для реактивных двигателей',
      'Сверхпроводники (МРТ)',
      'Ювелирные изделия',
      'Нержавеющая сталь'
    ],
    interestingFacts: [
      'Назван в честь Ниобы из греческой мифологии',
      'Был известен как колумбий',
      'Сверхпроводник при низких температурах',
      'Похож на тантал'
    ]
  },
  { 
    atomicNumber: 42, symbol: 'Mo', name: 'Молибден', mass: '95.95', period: 5, group: 6, block: 'd',
    discoveredBy: 'Карл Шееле', yearDiscovered: '1781', discoveryPlace: 'Швеция',
    category: 'Переходный металл',
    applications: [
      'Легирование стали',
      'Катализаторы',
      'Электроды',
      'Филигранные детали'
    ],
    interestingFacts: [
      'Название от греч. "молибдос" — свинец',
      'Очень высокая температура плавления',
      'Необходим растениям (ферменты)',
      'Спутник меди в рудах'
    ]
  },
  { 
    atomicNumber: 43, symbol: 'Tc', name: 'Технеций', mass: '(98)', period: 5, group: 7, block: 'd',
    discoveredBy: 'Карло Перрье, Эмилио Сегре', yearDiscovered: '1937', discoveryPlace: 'Италия',
    category: 'Переходный металл',
    applications: [
      'Медицина (ядерная диагностика)',
      'Калибровка инструментов',
      'Радиоактивные трассеры'
    ],
    interestingFacts: [
      'Первый искусственно созданный элемент',
      'Название от греч. "технетос" — искусственный',
      'Радиоактивен',
      'Не имеет стабильных изотопов'
    ]
  },
  { 
    atomicNumber: 44, symbol: 'Ru', name: 'Рутений', mass: '101.07', period: 5, group: 8, block: 'd',
    discoveredBy: 'Карл Клаус', yearDiscovered: '1844', discoveryPlace: 'Россия',
    category: 'Благородный металл',
    applications: [
      'Электроника (резисторы)',
      'Катализаторы',
      'Покрытия',
      'Ювелирные сплавы'
    ],
    interestingFacts: [
      'Назван в честь России (Ruthenia)',
      'Платиновая группа металлов',
      'Очень твёрдый и хрупкий',
      'Открыт в платиновых рудах Урала'
    ]
  },
  { 
    atomicNumber: 45, symbol: 'Rh', name: 'Родий', mass: '102.91', period: 5, group: 9, block: 'd',
    discoveredBy: 'Уильям Волластон', yearDiscovered: '1803', discoveryPlace: 'Англия',
    category: 'Благородный металл',
    applications: [
      'Каталитические конвертеры в автомобилях',
      'Ювелирные покрытия (родирование)',
      'Зеркала для лазеров',
      'Катализаторы в химии'
    ],
    interestingFacts: [
      'Название от греч. "родон" — роза',
      'Самый дорогой драгоценный металл',
      'Отражает больше света, чем серебро',
      'Соли имеют розовый цвет'
    ]
  },
  { 
    atomicNumber: 46, symbol: 'Pd', name: 'Палладий', mass: '106.42', period: 5, group: 10, block: 'd',
    discoveredBy: 'Уильям Волластон', yearDiscovered: '1803', discoveryPlace: 'Англия',
    category: 'Благородный металл',
    applications: [
      'Каталитические конвертеры',
      'Ювелирные изделия (белое золото)',
      'Электроника',
      'Зубные коронки'
    ],
    interestingFacts: [
      'Назван в честь астероида Паллада',
      'Поглощает водород в огромных количествах',
      'Легче плавится, чем платина',
      'Используется в топливных элементах'
    ]
  },
  { 
    atomicNumber: 47, symbol: 'Ag', name: 'Серебро', mass: '107.87', period: 5, group: 11, block: 'd',
    discoveredBy: 'Известно с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Благородный металл',
    applications: [
      'Ювелирные изделия',
      'Столовые приборы',
      'Фотография (бромид серебра)',
      'Электроника'
    ],
    interestingFacts: [
      'Лучший проводник электричества',
      'Бактерицидные свойства',
      'Отражает 95% света',
      'Стерлинг — сплав 92,5% серебра'
    ]
  },
  { 
    atomicNumber: 48, symbol: 'Cd', name: 'Кадмий', mass: '112.41', period: 5, group: 12, block: 'd',
    discoveredBy: 'Карл Штромейер', yearDiscovered: '1817', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Никель-кадмиевые аккумуляторы',
      'Пигменты (кадмиевый жёлтый)',
      'Покрытия',
      'Ядерные реакторы'
    ],
    interestingFacts: [
      'Токсичен, накапливается в организме',
      'Назван в честь минерала каламина',
      'Мягкий синевато-белый металл',
      'Использование ограничено из-за токсичности'
    ]
  },
  { 
    atomicNumber: 49, symbol: 'In', name: 'Индий', mass: '114.82', period: 5, group: 13, block: 'p',
    discoveredBy: 'Фердинанд Райх, Иероним Рихтер', yearDiscovered: '1863', discoveryPlace: 'Германия',
    category: 'Металл',
    applications: [
      'Жидкокристаллические дисплеи (ITO)',
      'Полупроводники',
      'Низкоплавкие сплавы',
      'Пайка'
    ],
    interestingFacts: [
      'Назван по индиго-синей спектральной линии',
      'Очень мягкий — царапается ногтем',
      'Редкий элемент',
      'Добывается из цинковых руд'
    ]
  },
  { 
    atomicNumber: 50, symbol: 'Sn', name: 'Олово', mass: '118.71', period: 5, group: 14, block: 'p',
    discoveredBy: 'Известно с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Металл',
    applications: [
      'Пайка',
      'Консервные банки',
      'Бронза (сплав с медью)',
      'Покрытия'
    ],
    interestingFacts: [
      'Бронзовый век назван в честь сплава',
      'Не токсично',
      'Издаёт "крик" при сгибании',
      'Аллотропы: белое и серое олово'
    ]
  },
  { 
    atomicNumber: 51, symbol: 'Sb', name: 'Сурьма', mass: '121.76', period: 5, group: 15, block: 'p',
    discoveredBy: 'Известна с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Металлоид',
    applications: [
      'Пламегасители',
      'Свинцовые аккумуляторы',
      'Полупроводники',
      'Косметика (древность)'
    ],
    interestingFacts: [
      'Использовалась в Древнем Египте (тушь)',
      'Символ Sb от лат. stibium',
      'Хрупкий серебристый металл',
      'Входит в состав сплава для типографского шрифта'
    ]
  },
  { 
    atomicNumber: 52, symbol: 'Te', name: 'Теллур', mass: '127.60', period: 5, group: 16, block: 'p',
    discoveredBy: 'Франц-Йозеф Мюллер', yearDiscovered: '1782', discoveryPlace: 'Австрия',
    category: 'Металлоид',
    applications: [
      'Сплавы (легирование)',
      'Солнечные батареи (CdTe)',
      'Термопары',
      'Резина'
    ],
    interestingFacts: [
      'Название от лат. "теллус" — Земля',
      'Редкий элемент',
      'Токсичен',
      'Обладает полупроводниковыми свойствами'
    ]
  },
  { 
    atomicNumber: 53, symbol: 'I', name: 'Йод', mass: '126.90', period: 5, group: 17, block: 'p',
    discoveredBy: 'Бернар Куртуа', yearDiscovered: '1811', discoveryPlace: 'Франция',
    category: 'Галоген',
    applications: [
      'Дезинфекция (йодная настойка)',
      'Рентгеноконтрастные вещества',
      'Фотография',
      'Йодированная соль'
    ],
    interestingFacts: [
      'Необходим для щитовидной железы',
      'Фиолетовые пары при нагревании',
      'Название от греч. "иодес" — фиолетовый',
      'Открыт из морских водорослей'
    ]
  },
  { 
    atomicNumber: 54, symbol: 'Xe', name: 'Ксенон', mass: '131.29', period: 5, group: 18, block: 'p',
    discoveredBy: 'Уильям Рамзай, Моррис Траверс', yearDiscovered: '1898', discoveryPlace: 'Англия',
    category: 'Благородный газ',
    applications: [
      'Лампы (ксеноновые фары)',
      'Анестезия',
      'Ионные двигатели',
      'МРТ'
    ],
    interestingFacts: [
      'Название от греч. "ксенос" — чужой',
      'Голубоватое свечение при разряде',
      'Первый благородный газ, получивший соединения',
      'Используется в космических двигателях'
    ]
  },
  // ПЕРИОД 6
  { 
    atomicNumber: 55, symbol: 'Cs', name: 'Цезий', mass: '132.91', period: 6, group: 1, block: 's',
    discoveredBy: 'Роберт Бунзен, Густав Кирхгоф', yearDiscovered: '1860', discoveryPlace: 'Германия',
    category: 'Щелочной металл',
    applications: [
      'Атомные часы',
      'Бурение нефтяных скважин',
      'Фотоэлементы',
      'Медицина'
    ],
    interestingFacts: [
      'Название от лат. "цезиус" — небесно-голубой',
      'Открыт по голубой спектральной линии',
      'Жидкий при температуре выше 28°C',
      'Самый электроположительный элемент'
    ]
  },
  { 
    atomicNumber: 56, symbol: 'Ba', name: 'Барий', mass: '137.33', period: 6, group: 2, block: 's',
    discoveredBy: 'Карл Шееле', yearDiscovered: '1772', discoveryPlace: 'Швеция',
    category: 'Щёлочноземельный металл',
    applications: [
      'Рентгеноконтрастные вещества',
      'Бариевые стекла',
      'Фейерверки (зелёный цвет)',
      'Вакуумные трубки'
    ],
    interestingFacts: [
      'Название от греч. "барис" — тяжёлый',
      'Сульфат бария не растворим и не токсичен',
      'Открыт в минерале барите',
      'Соли бария горят зелёным пламенем'
    ]
  },
  { 
    atomicNumber: 57, symbol: 'La', name: 'Лантан', mass: '138.91', period: 6, group: 3, block: 'f',
    discoveredBy: 'Карл Мосандер', yearDiscovered: '1839', discoveryPlace: 'Швеция',
    category: 'Лантаноид',
    applications: [
      'Зажигалковые кремни',
      'Катализаторы',
      'Стекло (повышение折射率)',
      'Литий-ионные батареи'
    ],
    interestingFacts: [
      'Название от греч. "лантейн" — скрытый',
      'Самый распространённый редкоземельный элемент',
      'Мягкий серебристый металл',
      'Открыт из церита'
    ]
  },
  { 
    atomicNumber: 72, symbol: 'Hf', name: 'Гафний', mass: '178.49', period: 6, group: 4, block: 'd',
    discoveredBy: 'Дирк Костер, Дьёрдь де Хевеши', yearDiscovered: '1923', discoveryPlace: 'Дания',
    category: 'Переходный металл',
    applications: [
      'Ядерные реакторы',
      'Процессоры',
      'Сплавы для турбин',
      'Керамика'
    ],
    interestingFacts: [
      'Назван в честь Копенгагена (Hafnia)',
      'Очень похож на цирконий',
      'Поглощает нейтроны',
      'Высокая температура плавления'
    ]
  },
  { 
    atomicNumber: 73, symbol: 'Ta', name: 'Тантал', mass: '180.95', period: 6, group: 5, block: 'd',
    discoveredBy: 'Андерс Экеберг', yearDiscovered: '1802', discoveryPlace: 'Швеция',
    category: 'Переходный металл',
    applications: [
      'Конденсаторы (в смартфонах)',
      'Хирургические инструменты',
      'Химическое оборудование',
      'Ювелирные изделия'
    ],
    interestingFacts: [
      'Назван в честь мифического Тантала',
      'Устойчив к коррозии',
      'Биосовместим',
      'Используется в электронике'
    ]
  },
  { 
    atomicNumber: 74, symbol: 'W', name: 'Вольфрам', mass: '183.84', period: 6, group: 6, block: 'd',
    discoveredBy: 'Карл Шееле', yearDiscovered: '1781', discoveryPlace: 'Швеция',
    category: 'Переходный металл',
    applications: [
      'Нити накаливания',
      'Сверла и резцы',
      'Броня',
      'Сварка'
    ],
    interestingFacts: [
      'Название от нем. "вольфрам" — пена волка',
      'Самая высокая температура плавления (3422°C)',
      'Очень твёрдый',
      'Используется в кинетических снарядах'
    ]
  },
  { 
    atomicNumber: 75, symbol: 'Re', name: 'Рений', mass: '186.21', period: 6, group: 7, block: 'd',
    discoveredBy: 'Масатака Огава', yearDiscovered: '1925', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Турбины',
      'Катализаторы',
      'Термопары',
      'Сплавы'
    ],
    interestingFacts: [
      'Назван в честь реки Рейн',
      'Один из самых редких элементов',
      'Высокая температура плавления',
      'Открыт одним из последних'
    ]
  },
  { 
    atomicNumber: 76, symbol: 'Os', name: 'Осмий', mass: '190.23', period: 6, group: 8, block: 'd',
    discoveredBy: 'Смитсон Теннант', yearDiscovered: '1803', discoveryPlace: 'Англия',
    category: 'Благородный металл',
    applications: [
      'Перья для ручек',
      'Отпечатки пальцев',
      'Импланты',
      'Сплавы'
    ],
    interestingFacts: [
      'Название от греч. "осме" — запах',
      'Самый плотный элемент (22,59 г/см³)',
      'Токсичный оксид OsO₄',
      'Очень твёрдый и хрупкий'
    ]
  },
  { 
    atomicNumber: 77, symbol: 'Ir', name: 'Иридий', mass: '192.22', period: 6, group: 9, block: 'd',
    discoveredBy: 'Смитсон Теннант', yearDiscovered: '1803', discoveryPlace: 'Англия',
    category: 'Благородный металл',
    applications: [
      'Свечи зажигания',
      'Тигли',
      'Стандарт килограмма',
      'Медицина'
    ],
    interestingFacts: [
      'Название от радужных солей (Ирида)',
      'Самый коррозионно-стойкий металл',
      'Второй по плотности',
      'Найден в метеоритах (граница K-Pg)'
    ]
  },
  { 
    atomicNumber: 78, symbol: 'Pt', name: 'Платина', mass: '195.08', period: 6, group: 10, block: 'd',
    discoveredBy: 'Антонио де Ульоа', yearDiscovered: '1735', discoveryPlace: 'Южная Америка',
    category: 'Благородный металл',
    applications: [
      'Ювелирные изделия',
      'Катализаторы',
      'Стоматология',
      'Лабораторное оборудование'
    ],
    interestingFacts: [
      'Название от исп. "платина" — серебришко',
      'Не окисляется при любой температуре',
      'Испанская корона не ценила платину',
      'Используется в эталонах'
    ]
  },
  { 
    atomicNumber: 79, symbol: 'Au', name: 'Золото', mass: '196.97', period: 6, group: 11, block: 'd',
    discoveredBy: 'Известно с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Благородный металл',
    applications: [
      'Ювелирные изделия',
      'Электроника (контакты)',
      'Стоматология',
      'Инвестиции'
    ],
    interestingFacts: [
      'Не ржавеет и не тускнеет',
      'Самый ковкий металл (1 г = 1 м²)',
      'В морской воде — миллионы тонн золота',
      'Формируется при столкновении нейтронных звёзд'
    ]
  },
  { 
    atomicNumber: 80, symbol: 'Hg', name: 'Ртуть', mass: '200.59', period: 6, group: 12, block: 'd',
    discoveredBy: 'Известна с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Переходный металл',
    applications: [
      'Термометры',
      'Люминесцентные лампы',
      'Стоматология (амальгама)',
      'Золотодобыча'
    ],
    interestingFacts: [
      'Единственный жидкий металл при комнатной температуре',
      'Токсична, накапливается в организме',
      'Символ Hg от гидраргирум',
      'Использовалась для лечения сифилиса'
    ]
  },
  { 
    atomicNumber: 81, symbol: 'Tl', name: 'Таллий', mass: '204.38', period: 6, group: 13, block: 'p',
    discoveredBy: 'Уильям Крукс', yearDiscovered: '1861', discoveryPlace: 'Англия',
    category: 'Металл',
    applications: [
      'Электроника',
      'Стекло (высокий показатель преломления)',
      'Медицина (ранее)',
      'Инфракрасная оптика'
    ],
    interestingFacts: [
      'Название от греч. "таллос" — зелёная ветка',
      'Очень токсичен',
      'Зелёная спектральная линия',
      'Использовался как крысиный яд'
    ]
  },
  { 
    atomicNumber: 82, symbol: 'Pb', name: 'Свинец', mass: '207.2', period: 6, group: 14, block: 'p',
    discoveredBy: 'Известен с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Металл',
    applications: [
      'Аккумуляторы',
      'Радиационная защита',
      'Боеприпасы',
      'Кабели'
    ],
    interestingFacts: [
      'Токсичен, влияет на нервную систему',
      'Очень мягкий и тяжёлый',
      'Римляне использовали для труб',
      'Символ Pb от лат. plumbum'
    ]
  },
  { 
    atomicNumber: 83, symbol: 'Bi', name: 'Висмут', mass: '208.98', period: 6, group: 15, block: 'p',
    discoveredBy: 'Известен с древности', yearDiscovered: 'До нашей эры', discoveryPlace: '—',
    category: 'Металл',
    applications: [
      'Лекарства (от изжоги)',
      'Сплавы (низкоплавкие)',
      'Косметика',
      'Пиroteхника'
    ],
    interestingFacts: [
      'Радужные кристаллы из-за оксидной плёнки',
      'Самый диамагнитный элемент',
      'Почти не токсичен',
      'Был перепутан с оловом и свинцом'
    ]
  },
  { 
    atomicNumber: 84, symbol: 'Po', name: 'Полоний', mass: '(209)', period: 6, group: 16, block: 'p',
    discoveredBy: 'Пьер и Мария Кюри', yearDiscovered: '1898', discoveryPlace: 'Франция',
    category: 'Металлоид',
    applications: [
      'Источники тепла (космос)',
      'Антистатические устройства',
      'Нейтронные источники'
    ],
    interestingFacts: [
      'Назван в честь Польши (родина Марии Кюри)',
      'Радиоактивен',
      'Использован в убийстве Литвиненко',
      'Редкий элемент'
    ]
  },
  { 
    atomicNumber: 85, symbol: 'At', name: 'Астат', mass: '(210)', period: 6, group: 17, block: 'p',
    discoveredBy: 'Дейл Корсон, Эмилио Сегре', yearDiscovered: '1940', discoveryPlace: 'США',
    category: 'Галоген',
    applications: [
      'Медицина (потенциально)'
    ],
    interestingFacts: [
      'Название от греч. "астатос" — неустойчивый',
      'Самый редкий элемент на Земле',
      'Очень радиоактивен',
      'Всего около 30 г в земной коре'
    ]
  },
  { 
    atomicNumber: 86, symbol: 'Rn', name: 'Радон', mass: '(222)', period: 6, group: 18, block: 'p',
    discoveredBy: 'Фридрих Дорн', yearDiscovered: '1900', discoveryPlace: 'Германия',
    category: 'Благородный газ',
    applications: [
      'Лечение (радоновые ванны)',
      'Научные исследования'
    ],
    interestingFacts: [
      'Радиоактивный газ',
      'Накапливается в подвалах',
      'Вторая причина рака лёгких после курения',
      'Назван от радия'
    ]
  },
  // ПЕРИОД 7
  { 
    atomicNumber: 87, symbol: 'Fr', name: 'Франций', mass: '(223)', period: 7, group: 1, block: 's',
    discoveredBy: 'Маргарита Перей', yearDiscovered: '1939', discoveryPlace: 'Франция',
    category: 'Щелочной металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Франции',
      'Самый нестабильный из первых 101 элемента',
      'Радиоактивен',
      'Всего около 30 г в земной коре'
    ]
  },
  { 
    atomicNumber: 88, symbol: 'Ra', name: 'Радий', mass: '(226)', period: 7, group: 2, block: 's',
    discoveredBy: 'Пьер и Мария Кюри', yearDiscovered: '1898', discoveryPlace: 'Франция',
    category: 'Щёлочноземельный металл',
    applications: [
      'Светящиеся краски (ранее)',
      'Медицина (ранее)',
      'Нейтронные источники'
    ],
    interestingFacts: [
      'Назван от лат. "радиус" — луч',
      'Светится в темноте',
      'Радиоактивен',
      'Открыт в урановой руде'
    ]
  },
  { 
    atomicNumber: 89, symbol: 'Ac', name: 'Актиний', mass: '(227)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Фридрих Гизель', yearDiscovered: '1899', discoveryPlace: 'Германия',
    category: 'Актиноид',
    applications: [
      'Нейтронные источники'
    ],
    interestingFacts: [
      'Название от греч. "актис" — луч',
      'Светится в темноте',
      'Радиоактивен',
      'Дал название группе актиноидов'
    ]
  },
  { 
    atomicNumber: 104, symbol: 'Rf', name: 'Резерфордий', mass: '(267)', period: 7, group: 4, block: 'd',
    discoveredBy: 'ОИЯИ (Дубна)', yearDiscovered: '1969', discoveryPlace: 'Россия',
    category: 'Переходный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Эрнеста Резерфорда',
      'Синтезирован искусственно',
      'Период полураспада — секунды',
      'Спор об открытии между СССР и США'
    ]
  },
  { 
    atomicNumber: 105, symbol: 'Db', name: 'Дубний', mass: '(270)', period: 7, group: 5, block: 'd',
    discoveredBy: 'ОИЯИ (Дубна)', yearDiscovered: '1970', discoveryPlace: 'Россия',
    category: 'Переходный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь города Дубна',
      'Синтезирован в СССР',
      'Радиоактивен',
      'Существует доли секунды'
    ]
  },
  { 
    atomicNumber: 106, symbol: 'Sg', name: 'Сиборгий', mass: '(269)', period: 7, group: 6, block: 'd',
    discoveredBy: 'LBL (Беркли)', yearDiscovered: '1974', discoveryPlace: 'США',
    category: 'Переходный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Гленна Сиборга',
      'Первый элемент, названный в честь живущего человека',
      'Синтезирован в США',
      'Радиоактивен'
    ]
  },
  { 
    atomicNumber: 107, symbol: 'Bh', name: 'Борий', mass: '(270)', period: 7, group: 7, block: 'd',
    discoveredBy: 'GSI (Дармштадт)', yearDiscovered: '1981', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Нильса Бора',
      'Синтезирован в Германии',
      'Существует миллисекунды',
      'Радиоактивен'
    ]
  },
  { 
    atomicNumber: 108, symbol: 'Hs', name: 'Хассий', mass: '(270)', period: 7, group: 8, block: 'd',
    discoveredBy: 'GSI (Дармштадт)', yearDiscovered: '1984', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь земли Гессен (Германия)',
      'Синтезирован в Германии',
      'Радиоактивен',
      'Похож на осмий'
    ]
  },
  { 
    atomicNumber: 109, symbol: 'Mt', name: 'Мейтнерий', mass: '(278)', period: 7, group: 9, block: 'd',
    discoveredBy: 'GSI (Дармштадт)', yearDiscovered: '1982', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Лизы Мейтнер',
      'Синтезирован в Германии',
      'Радиоактивен',
      'Существует секунды'
    ]
  },
  { 
    atomicNumber: 110, symbol: 'Ds', name: 'Дармштадтий', mass: '(281)', period: 7, group: 10, block: 'd',
    discoveredBy: 'GSI (Дармштадт)', yearDiscovered: '1994', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь города Дармштадт',
      'Синтезирован в Германии',
      'Радиоактивен',
      'Похож на платину'
    ]
  },
  { 
    atomicNumber: 111, symbol: 'Rg', name: 'Рентгений', mass: '(282)', period: 7, group: 11, block: 'd',
    discoveredBy: 'GSI (Дармштадт)', yearDiscovered: '1994', discoveryPlace: 'Германия',
    category: 'Благородный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Вильгельма Рентгена',
      'Синтезирован в Германии',
      'Радиоактивен',
      'Похож на золото'
    ]
  },
  { 
    atomicNumber: 112, symbol: 'Cn', name: 'Коперниций', mass: '(285)', period: 7, group: 12, block: 'd',
    discoveredBy: 'GSI (Дармштадт)', yearDiscovered: '1996', discoveryPlace: 'Германия',
    category: 'Переходный металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Николая Коперника',
      'Синтезирован в Германии',
      'Радиоактивен',
      'Похож на ртуть'
    ]
  },
  { 
    atomicNumber: 113, symbol: 'Nh', name: 'Нихоний', mass: '(286)', period: 7, group: 13, block: 'p',
    discoveredBy: 'RIKEN (Япония)', yearDiscovered: '2003', discoveryPlace: 'Япония',
    category: 'Металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Японии (Нихон)',
      'Первый элемент, открытый в Азии',
      'Синтезирован в Японии',
      'Радиоактивен'
    ]
  },
  { 
    atomicNumber: 114, symbol: 'Fl', name: 'Флеровий', mass: '(289)', period: 7, group: 14, block: 'p',
    discoveredBy: 'ОИЯИ (Дубна)', yearDiscovered: '1998', discoveryPlace: 'Россия',
    category: 'Металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Флёрова',
      'Синтезирован в России',
      'Возможно, благородный газ',
      'Радиоактивен'
    ]
  },
  { 
    atomicNumber: 115, symbol: 'Mc', name: 'Московий', mass: '(290)', period: 7, group: 15, block: 'p',
    discoveredBy: 'ОИЯИ (Дубна)', yearDiscovered: '2003', discoveryPlace: 'Россия',
    category: 'Металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Москвы',
      'Синтезирован в России',
      'Радиоактивен',
      'Похож на висмут'
    ]
  },
  { 
    atomicNumber: 116, symbol: 'Lv', name: 'Ливерморий', mass: '(293)', period: 7, group: 16, block: 'p',
    discoveredBy: 'ОИЯИ (Дубна)', yearDiscovered: '2000', discoveryPlace: 'Россия',
    category: 'Металл',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Ливерморской лаборатории',
      'Синтезирован в России',
      'Радиоактивен',
      'Похож на полоний'
    ]
  },
  { 
    atomicNumber: 117, symbol: 'Ts', name: 'Теннессин', mass: '(294)', period: 7, group: 17, block: 'p',
    discoveredBy: 'ОИЯИ (Дубна)', yearDiscovered: '2010', discoveryPlace: 'Россия',
    category: 'Галоген',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь штата Теннесси',
      'Синтезирован в России',
      'Радиоактивен',
      'Похож на астат'
    ]
  },
  { 
    atomicNumber: 118, symbol: 'Og', name: 'Оганесон', mass: '(294)', period: 7, group: 18, block: 'p',
    discoveredBy: 'ОИЯИ (Дубна)', yearDiscovered: '2002', discoveryPlace: 'Россия',
    category: 'Благородный газ',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Юрия Оганесяна',
      'Самый тяжёлый элемент таблицы',
      'Синтезирован в России',
      'Возможно, не благородный газ'
    ]
  },
  // ЛАНТАНОИДЫ (Ce–Lu)
  { 
    atomicNumber: 58, symbol: 'Ce', name: 'Церий', mass: '140.12', period: 6, group: 3, block: 'f',
    discoveredBy: 'Мартин Клапрот, Юнс Берцелиус', yearDiscovered: '1803', discoveryPlace: 'Швеция',
    category: 'Лантаноид',
    applications: [
      'Зажигалковые кремни',
      'Стекло (полировка)',
      'Катализаторы',
      'Светящиеся материалы'
    ],
    interestingFacts: [
      'Назван в честь астероида Церера',
      'Самый распространённый редкоземельный элемент',
      'Воспламеняется при царапании',
      'Открыт одновременно в Швеции и Германии'
    ]
  },
  { 
    atomicNumber: 59, symbol: 'Pr', name: 'Празеодим', mass: '140.91', period: 6, group: 3, block: 'f',
    discoveredBy: 'Карл Ауэр фон Вельсбах', yearDiscovered: '1885', discoveryPlace: 'Австрия',
    category: 'Лантаноид',
    applications: [
      'Магниты',
      'Стекло (зелёный цвет)',
      'Сварочные маски',
      'Катализаторы'
    ],
    interestingFacts: [
      'Название от греч. "празинос" — зелёный',
      'Даёт красивый зелёный цвет стеклу',
      'Был выделен из дидима',
      'Магнитные свойства'
    ]
  },
  { 
    atomicNumber: 60, symbol: 'Nd', name: 'Неодим', mass: '144.24', period: 6, group: 3, block: 'f',
    discoveredBy: 'Карл Ауэр фон Вельсбах', yearDiscovered: '1885', discoveryPlace: 'Австрия',
    category: 'Лантаноид',
    applications: [
      'Мощные магниты (NdFeB)',
      'Лазеры',
      'Наушники',
      'Электромобили'
    ],
    interestingFacts: [
      'Название от греч. "неос дидимос" — новый близнец',
      'Самые сильные постоянные магниты',
      'В каждом электромобиле около 2 кг неодима',
      'Сиреневый цвет стекла'
    ]
  },
  { 
    atomicNumber: 61, symbol: 'Pm', name: 'Прометий', mass: '(145)', period: 6, group: 3, block: 'f',
    discoveredBy: 'Ч. Прометий', yearDiscovered: '1945', discoveryPlace: 'США',
    category: 'Лантаноид',
    applications: [
      'Светящиеся краски',
      'Атомные батареи',
      'Толщиномеры'
    ],
    interestingFacts: [
      'Назван в честь Прометея',
      'Единственный радиоактивный лантаноид',
      'Нет стабильных изотопов',
      'Светится в темноте'
    ]
  },
  { 
    atomicNumber: 62, symbol: 'Sm', name: 'Самарий', mass: '150.36', period: 6, group: 3, block: 'f',
    discoveredBy: 'Поль Лекок де Буабодран', yearDiscovered: '1879', discoveryPlace: 'Франция',
    category: 'Лантаноид',
    applications: [
      'Магниты (SmCo)',
      'Ракеты (топливо)',
      'Ядерные реакторы',
      'Лазеры'
    ],
    interestingFacts: [
      'Назван в честь минерала самарскита',
      'Магниты работают при высоких температурах',
      'Используется в датчиках',
      'Открыт из минерала'
    ]
  },
  { 
    atomicNumber: 63, symbol: 'Eu', name: 'Европий', mass: '151.96', period: 6, group: 3, block: 'f',
    discoveredBy: 'Эжен Демарсе', yearDiscovered: '1901', discoveryPlace: 'Франция',
    category: 'Лантаноид',
    applications: [
      'Красный цвет в телевизорах',
      'Евро-банкноты (защита)',
      'Светодиоды',
      'Лазеры'
    ],
    interestingFacts: [
      'Назван в честь Европы',
      'Самый реакционноспособный лантаноид',
      'Даёт яркий красный цвет',
      'Используется для защиты валют'
    ]
  },
  { 
    atomicNumber: 64, symbol: 'Gd', name: 'Гадолиний', mass: '157.25', period: 6, group: 3, block: 'f',
    discoveredBy: 'Жан де Мариньяк', yearDiscovered: '1880', discoveryPlace: 'Швейцария',
    category: 'Лантаноид',
    applications: [
      'МРТ (контраст)',
      'Магниты',
      'Ядерные реакторы',
      'Люминофоры'
    ],
    interestingFacts: [
      'Назван в честь Юхана Гадолина',
      'Парамагнитен',
      'Используется для охлаждения',
      'Содержится в минерале гадолините'
    ]
  },
  { 
    atomicNumber: 65, symbol: 'Tb', name: 'Тербий', mass: '158.93', period: 6, group: 3, block: 'f',
    discoveredBy: 'Карл Мосандер', yearDiscovered: '1843', discoveryPlace: 'Швеция',
    category: 'Лантаноид',
    applications: [
      'Зелёные люминофоры',
      'Твёрдые диски',
      'Магниты',
      'Лазеры'
    ],
    interestingFacts: [
      'Назван в честь деревни Иттербю',
      'Даёт яркий зелёный цвет',
      'Используется в электронике',
      'Редкий элемент'
    ]
  },
  { 
    atomicNumber: 66, symbol: 'Dy', name: 'Диспрозий', mass: '162.50', period: 6, group: 3, block: 'f',
    discoveredBy: 'Поль Лекок де Буабодран', yearDiscovered: '1886', discoveryPlace: 'Франция',
    category: 'Лантаноид',
    applications: [
      'Магниты NdFeB',
      'Реакторы',
      'Лазеры',
      'Жесткие диски'
    ],
    interestingFacts: [
      'Название от греч. "диспрозитос" — труднодоступный',
      'Улучшает магниты при высоких температурах',
      'Редкий элемент',
      'Открыт последним из лантаноидов'
    ]
  },
  { 
    atomicNumber: 67, symbol: 'Ho', name: 'Гольмий', mass: '164.93', period: 6, group: 3, block: 'f',
    discoveredBy: 'Марк Делафонтен, Жак-Луи Соре', yearDiscovered: '1878', discoveryPlace: 'Швейцария',
    category: 'Лантаноид',
    applications: [
      'Лазеры',
      'МРТ',
      'Магниты',
      'Ядерные реакторы'
    ],
    interestingFacts: [
      'Назван в честь Стокгольма (Хольмия)',
      'Самый магнитный элемент',
      'Используется в медицине',
      'Редкий элемент'
    ]
  },
  { 
    atomicNumber: 68, symbol: 'Er', name: 'Эрбий', mass: '167.26', period: 6, group: 3, block: 'f',
    discoveredBy: 'Карл Мосандер', yearDiscovered: '1843', discoveryPlace: 'Швеция',
    category: 'Лантаноид',
    applications: [
      'Волоконные лазеры',
      'Стекло (розовый цвет)',
      'Металлургия',
      'Телекоммуникации'
    ],
    interestingFacts: [
      'Назван в честь деревни Иттербю',
      'Даёт розовый цвет стеклу',
      'Используется в оптоволокне',
      'Родина — Швеция'
    ]
  },
  { 
    atomicNumber: 69, symbol: 'Tm', name: 'Тулий', mass: '168.93', period: 6, group: 3, block: 'f',
    discoveredBy: 'Пер Теодор Клеве', yearDiscovered: '1879', discoveryPlace: 'Швеция',
    category: 'Лантаноид',
    applications: [
      'Лазеры',
      'Рентгеновские аппараты',
      'Магниты',
      'Евро-банкноты'
    ],
    interestingFacts: [
      'Назван в честь легендарной Туле',
      'Самый редкий лантаноид',
      'Используется в медицине',
      'Открыт в Швеции'
    ]
  },
  { 
    atomicNumber: 70, symbol: 'Yb', name: 'Иттербий', mass: '173.05', period: 6, group: 3, block: 'f',
    discoveredBy: 'Жан де Мариньяк', yearDiscovered: '1878', discoveryPlace: 'Швейцария',
    category: 'Лантаноид',
    applications: [
      'Лазеры',
      'Нержавеющая сталь',
      'Атомные часы',
      'Датчики'
    ],
    interestingFacts: [
      'Назван в честь деревни Иттербю',
      '4 элемента названы в честь Иттербю!',
      'Используется в точных часах',
      'Открыт из гадолинита'
    ]
  },
  { 
    atomicNumber: 71, symbol: 'Lu', name: 'Лютеций', mass: '174.97', period: 6, group: 3, block: 'f',
    discoveredBy: 'Жорж Урбен', yearDiscovered: '1907', discoveryPlace: 'Франция',
    category: 'Лантаноид',
    applications: [
      'Катализаторы',
      'ПЭТ-сканеры',
      'Лазеры',
      'Магниты'
    ],
    interestingFacts: [
      'Назван в честь Парижа (Лютеция)',
      'Последний лантаноид',
      'Используется в медицине',
      'Редкий и дорогой'
    ]
  },
  // АКТИНОИДЫ (Th–Lr)
  { 
    atomicNumber: 90, symbol: 'Th', name: 'Торий', mass: '232.04', period: 7, group: 3, block: 'f',
    discoveredBy: 'Йёнс Якоб Берцелиус', yearDiscovered: '1829', discoveryPlace: 'Швеция',
    category: 'Актиноид',
    applications: [
      'Ядерное топливо',
      'Сварочные электроды',
      'Линзы',
      'Газовые фонари'
    ],
    interestingFacts: [
      'Назван в честь Тора',
      'В 3-4 раза распространённее урана',
      'Может быть ядерным топливом',
      'Светится при нагревании'
    ]
  },
  { 
    atomicNumber: 91, symbol: 'Pa', name: 'Протактиний', mass: '231.04', period: 7, group: 3, block: 'f',
    discoveredBy: 'Касимир Фаянс, Освальд Гёринг', yearDiscovered: '1913', discoveryPlace: 'Германия',
    category: 'Актиноид',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Название от "протактиний" — предшественник актиния',
      'Очень редкий и токсичный',
      'Радиоактивен',
      'Добывается из урановых отходов'
    ]
  },
  { 
    atomicNumber: 92, symbol: 'U', name: 'Уран', mass: '238.03', period: 7, group: 3, block: 'f',
    discoveredBy: 'Мартин Клапрот', yearDiscovered: '1789', discoveryPlace: 'Германия',
    category: 'Актиноид',
    applications: [
      'Ядерное топливо',
      'Ядерное оружие',
      'Бронебойные снаряды',
      'Радиометрия'
    ],
    interestingFacts: [
      'Назван в честь планеты Уран',
      'Слабо радиоактивен',
      'Использовался для окраски стекла',
      'Открыт до открытия радиоактивности'
    ]
  },
  { 
    atomicNumber: 93, symbol: 'Np', name: 'Нептуний', mass: '(237)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Эдвин Макмиллан, Филип Абельсон', yearDiscovered: '1940', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Нейтронные детекторы',
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь планеты Нептун',
      'Первый трансурановый элемент',
      'Радиоактивен',
      'Встречается в природе в следовых количествах'
    ]
  },
  { 
    atomicNumber: 94, symbol: 'Pu', name: 'Плутоний', mass: '(244)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Гленн Сиборг', yearDiscovered: '1940', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Ядерное оружие',
      'Ядерные реакторы',
      'Космические зонды',
      'Кардиостимуляторы'
    ],
    interestingFacts: [
      'Назван в честь Плутона',
      'Самый токсичный элемент',
      'Тёплый на ощупь',
      'Синтезирован в Беркли'
    ]
  },
  { 
    atomicNumber: 95, symbol: 'Am', name: 'Америций', mass: '(243)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Гленн Сиборг', yearDiscovered: '1944', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Дымовые детекторы',
      'Нейтронные источники',
      'Рентгеновские источники'
    ],
    interestingFacts: [
      'Назван в честь Америки',
      'Используется в бытовых датчиках дыма',
      'Радиоактивен',
      'Синтезирован в США'
    ]
  },
  { 
    atomicNumber: 96, symbol: 'Cm', name: 'Кюрий', mass: '(247)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Гленн Сиборг', yearDiscovered: '1944', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Источники энергии (космос)',
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Пьера и Марии Кюри',
      'Радиоактивен',
      'Светится в темноте',
      'Используется в марсоходах'
    ]
  },
  { 
    atomicNumber: 97, symbol: 'Bk', name: 'Берклий', mass: '(247)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Гленн Сиборг', yearDiscovered: '1949', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Беркли',
      'Синтезирован в США',
      'Радиоактивен',
      'Используется для синтеза других элементов'
    ]
  },
  { 
    atomicNumber: 98, symbol: 'Cf', name: 'Калифорний', mass: '(251)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Гленн Сиборг', yearDiscovered: '1950', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Геологоразведка',
      'Медицина (лечение рака)',
      'Нейтронные источники'
    ],
    interestingFacts: [
      'Назван в честь Калифорнии',
      'Очень дорогой (миллионы долларов за грамм)',
      'Используется для поиска золота',
      'Радиоактивен'
    ]
  },
  { 
    atomicNumber: 99, symbol: 'Es', name: 'Эйнштейний', mass: '(252)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Группа Сиборга', yearDiscovered: '1952', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Альберта Эйнштейна',
      'Обнаружен в остатках водородной бомбы',
      'Радиоактивен',
      'Синтезирован в США'
    ]
  },
  { 
    atomicNumber: 100, symbol: 'Fm', name: 'Фермий', mass: '(257)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Группа Сиборга', yearDiscovered: '1952', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Энрико Ферми',
      'Обнаружен в остатках водородной бомбы',
      'Радиоактивен',
      'Синтезирован в США'
    ]
  },
  { 
    atomicNumber: 101, symbol: 'Md', name: 'Менделевий', mass: '(258)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Группа Сиборга', yearDiscovered: '1955', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Дмитрия Менделеева',
      'Синтезирован из эйнштейния',
      'Радиоактивен',
      'Только несколько атомов было получено'
    ]
  },
  { 
    atomicNumber: 102, symbol: 'No', name: 'Нобелий', mass: '(259)', period: 7, group: 3, block: 'f',
    discoveredBy: 'ОИЯИ (Дубна)', yearDiscovered: '1966', discoveryPlace: 'Россия',
    category: 'Актиноид',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Альфреда Нобеля',
      'Спор об открытии между СССР и США',
      'Радиоактивен',
      'Существует секунды'
    ]
  },
  { 
    atomicNumber: 103, symbol: 'Lr', name: 'Лоуренсий', mass: '(266)', period: 7, group: 3, block: 'f',
    discoveredBy: 'Группа Сиборга', yearDiscovered: '1961', discoveryPlace: 'США',
    category: 'Актиноид',
    applications: [
      'Научные исследования'
    ],
    interestingFacts: [
      'Назван в честь Эрнеста Лоуренса',
      'Последний актиноид',
      'Радиоактивен',
      'Существует секунды'
    ]
  },
];

// ====================== ЦВЕТА ПО БЛОКАМ ======================
const getBlockColor = (block: Element['block']) => {
  switch (block) {
    case 's': return 'bg-blue-100 border-blue-500 hover:bg-blue-200 text-blue-900';
    case 'p': return 'bg-emerald-100 border-emerald-500 hover:bg-emerald-200 text-emerald-900';
    case 'd': return 'bg-violet-100 border-violet-500 hover:bg-violet-200 text-violet-900';
    case 'f': return 'bg-amber-100 border-amber-500 hover:bg-amber-200 text-amber-900';
  }
};

const getBlockColorHex = (block: Element['block']) => {
  switch (block) {
    case 's': return '#3b82f6';
    case 'p': return '#10b981';
    case 'd': return '#8b5cf6';
    case 'f': return '#f59e0b';
  }
};

// ====================== МОДАЛЬНОЕ ОКНО ЭЛЕМЕНТА ======================
interface ElementDetailModalProps {
  element: Element;
  onClose: () => void;
}

const ElementDetailModal: React.FC<ElementDetailModalProps> = ({ element, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                   rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden
                   shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Symbol */}
            <div className="flex-shrink-0">
              <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {element.symbol}
              </div>
              <div className="text-sm text-slate-400 mt-1">№ {element.atomicNumber}</div>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">{element.name}</h2>
              <p className="text-slate-400 mt-1">
                Атомная масса: <span className="font-mono text-white">{element.mass}</span>
              </p>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border
                                 ${element.block === 's' ? 'bg-blue-500/20 border-blue-500 text-blue-300' :
                                   element.block === 'p' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' :
                                   element.block === 'd' ? 'bg-violet-500/20 border-violet-500 text-violet-300' :
                                   'bg-amber-500/20 border-amber-500 text-amber-300'}`}>
                  Блок {element.block.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white">
                  Период {element.period}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white">
                  Группа {element.group}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300">
                  {element.category}
                </span>
              </div>
            </div>
            
            {/* Atom Model */}
            <div className="flex-shrink-0">
              <AtomModel 
                atomicNumber={element.atomicNumber} 
                symbol={element.symbol}
                color={getBlockColorHex(element.block)}
              />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid md:grid-cols-2 gap-6">
            {/* History */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 mb-4">
                <History className="w-5 h-5" />
                <h3 className="font-semibold">История открытия</h3>
              </div>
              <div className="space-y-3 text-slate-300">
                <p>
                  <span className="text-slate-400">Кто открыл:</span><br/>
                  <span className="text-white font-medium">{element.discoveredBy}</span>
                </p>
                <p>
                  <span className="text-slate-400">Год открытия:</span><br/>
                  <span className="text-white font-medium">{element.yearDiscovered}</span>
                </p>
                {element.discoveryPlace !== '—' && (
                  <p>
                    <span className="text-slate-400">Место:</span><br/>
                    <span className="text-white font-medium">{element.discoveryPlace}</span>
                  </p>
                )}
              </div>
            </div>
            
            {/* Applications */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <Factory className="w-5 h-5" />
                <h3 className="font-semibold">Применение</h3>
              </div>
              <ul className="space-y-2">
                {element.applications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="text-green-400 mt-1">•</span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Interesting Facts */}
          <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-5 border border-purple-500/30">
            <div className="flex items-center gap-2 text-purple-400 mb-4">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">Интересные факты</h3>
            </div>
            <ul className="grid md:grid-cols-2 gap-3">
              {element.interestingFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300 bg-white/5 rounded-xl p-3">
                  <span className="text-purple-400 text-lg">★</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                      hover:from-purple-600 hover:to-pink-600
                      text-white rounded-xl font-medium transition-colors"
          >
            Закрыть
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ====================== ОСНОВНАЯ КОМПОНЕНТА ======================
interface PeriodicTableProps {
  onClose?: () => void;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ onClose }) => {
  const [selected, setSelected] = useState<Element | null>(null);
  const [search, setSearch] = useState('');

  const filteredElements = elementsData.filter(
    el =>
      el.symbol.toLowerCase().includes(search.toLowerCase()) ||
      el.name.toLowerCase().includes(search.toLowerCase())
  );

  const mainElements = filteredElements.filter(
    el => !(el.atomicNumber >= 58 && el.atomicNumber <= 71) && !(el.atomicNumber >= 90 && el.atomicNumber <= 103)
  );

  const lanthanides = filteredElements.filter(el => el.atomicNumber >= 58 && el.atomicNumber <= 71);
  const actinides = filteredElements.filter(el => el.atomicNumber >= 90 && el.atomicNumber <= 103);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Atom className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Периодическая таблица
          </h2>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Поиск элемента..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 md:w-64 px-4 py-2 border border-slate-300 rounded-xl 
                      focus:outline-none focus:border-purple-500 text-lg"
          />
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="flex items-center gap-2 text-sm">
          <span className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500"></span>
          s-блок
        </span>
        <span className="flex items-center gap-2 text-sm">
          <span className="w-4 h-4 rounded bg-emerald-100 border-2 border-emerald-500"></span>
          p-блок
        </span>
        <span className="flex items-center gap-2 text-sm">
          <span className="w-4 h-4 rounded bg-violet-100 border-2 border-violet-500"></span>
          d-блок
        </span>
        <span className="flex items-center gap-2 text-sm">
          <span className="w-4 h-4 rounded bg-amber-100 border-2 border-amber-500"></span>
          f-блок
        </span>
      </div>

      {/* Main Table */}
      <div className="relative overflow-x-auto pb-4">
        <div
          className="grid gap-1 text-center text-xs font-medium min-w-[900px]"
          style={{
            gridTemplateColumns: 'repeat(18, minmax(48px, 1fr))',
            gridTemplateRows: 'repeat(7, 60px)',
          }}
        >
          {mainElements.map(el => (
            <div
              key={el.atomicNumber}
              onClick={() => setSelected(el)}
              style={{
                gridColumn: el.group,
                gridRow: el.period,
              }}
              className={`group flex flex-col items-center justify-center border-2 rounded-xl cursor-pointer transition-all active:scale-95 ${getBlockColor(el.block)} ${
                selected?.atomicNumber === el.atomicNumber ? 'ring-4 ring-purple-500 ring-offset-2 scale-110 z-10' : ''
              }`}
            >
              <div className="text-[10px] opacity-70">{el.atomicNumber}</div>
              <div className="text-xl md:text-2xl font-bold mt-0.5 group-hover:scale-110 transition-transform">
                {el.symbol}
              </div>
              <div className="text-[10px] mt-0.5 leading-none hidden md:block">{el.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lanthanides */}
      {lanthanides.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span className="text-amber-600 font-semibold text-sm">Лантаноиды (Ce–Lu)</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <div className="grid grid-cols-7 md:grid-cols-14 gap-1 overflow-x-auto">
            {lanthanides.map(el => (
              <div
                key={el.atomicNumber}
                onClick={() => setSelected(el)}
                className={`flex flex-col items-center justify-center border-2 rounded-xl h-14 cursor-pointer transition-all active:scale-95 ${getBlockColor(el.block)} ${
                  selected?.atomicNumber === el.atomicNumber ? 'ring-4 ring-purple-500 ring-offset-2' : ''
                }`}
              >
                <div className="text-[10px] opacity-70">{el.atomicNumber}</div>
                <div className="text-lg font-bold">{el.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actinides */}
      {actinides.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span className="text-amber-600 font-semibold text-sm">Актиноиды (Th–Lr)</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <div className="grid grid-cols-7 md:grid-cols-14 gap-1 overflow-x-auto">
            {actinides.map(el => (
              <div
                key={el.atomicNumber}
                onClick={() => setSelected(el)}
                className={`flex flex-col items-center justify-center border-2 rounded-xl h-14 cursor-pointer transition-all active:scale-95 ${getBlockColor(el.block)} ${
                  selected?.atomicNumber === el.atomicNumber ? 'ring-4 ring-purple-500 ring-offset-2' : ''
                }`}
              >
                <div className="text-[10px] opacity-70">{el.atomicNumber}</div>
                <div className="text-lg font-bold">{el.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Element Detail Modal */}
      <AnimatePresence>
        {selected && (
          <ElementDetailModal 
            element={selected} 
            onClose={() => setSelected(null)} 
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-slate-400">
        Интерактивная периодическая таблица для ИНЕТШКОЛА • кликай на элементы • 118 элементов
      </div>
    </div>
  );
};

export default PeriodicTable;
