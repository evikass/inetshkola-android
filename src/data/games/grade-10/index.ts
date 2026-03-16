// Экспорт игр для 10 класса
import { GameLesson } from '../types'

export const tenthGradeGames: GameLesson[] = [
  // ========== АЛГЕБРА ==========
  {
    title: "Тригонометрия",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "sin²x + cos²x = __", correctAnswer: "1", hint: "Основное тригонометрическое тождество" },
      { type: 'quiz', question: "sin 30° = ?", options: ["0", "0.5", "1"], correctAnswer: "0.5", hint: "sin 30° = 1/2" },
      { type: 'quiz', question: "cos 60° = ?", options: ["0", "0.5", "1"], correctAnswer: "0.5", hint: "cos 60° = 1/2" },
      { type: 'fill', question: "tg x = sin x / __", correctAnswer: "cos x", hint: "Тангенс = синус / косинус" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь тригонометрию! 📐" }
  },
  {
    title: "Производная",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Производная функции показывает:", options: ["Площадь под графиком", "Скорость изменения функции", "Максимум функции"], correctAnswer: "Скорость изменения функции", hint: "f'(x) - скорость изменения" },
      { type: 'fill', question: "(x²)' = __x", correctAnswer: "2", hint: "(xⁿ)' = n·xⁿ⁻¹" },
      { type: 'quiz', question: "(3x + 5)' = ?", options: ["3", "5", "3x"], correctAnswer: "3", hint: "(ax + b)' = a" },
      { type: 'fill', question: "(x³)' = __x²", correctAnswer: "3", hint: "(x³)' = 3x²" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь производные! 🔢" }
  },
  {
    title: "Показательные уравнения",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "2ˣ = 8. Чему равен x?", options: ["2", "3", "4"], correctAnswer: "3", hint: "8 = 2³, значит x = 3" },
      { type: 'fill', question: "3ˣ = 9, x = __", correctAnswer: "2", hint: "9 = 3²" },
      { type: 'quiz', question: "aˣ · aʸ = ?", options: ["aˣʸ", "aˣ⁺ʸ", "aˣ⁻ʸ"], correctAnswer: "aˣ⁺ʸ", hint: "При умножении показатели складываются" },
      { type: 'quiz', question: "(aˣ)ʸ = ?", options: ["aˣʸ", "aˣ⁺ʸ", "aˣ⁻ʸ"], correctAnswer: "aˣʸ", hint: "При возведении в степень - перемножаются" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь показательные уравнения! 📊" }
  },

  // ========== ГЕОМЕТРИЯ ==========
  {
    title: "Стереометрия",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Объём куба с ребром a:", options: ["a²", "a³", "6a²"], correctAnswer: "a³", hint: "V = a³" },
      { type: 'fill', question: "Объём параллелепипеда V = a·b·c. Если a=2, b=3, c=4, то V = __", correctAnswer: "24", hint: "2 × 3 × 4 = 24" },
      { type: 'quiz', question: "Площадь поверхности куба:", options: ["a³", "6a²", "a²"], correctAnswer: "6a²", hint: "6 граней, каждая a²" },
      { type: 'quiz', question: "Объём шара:", options: ["πr²", "(4/3)πr³", "4πr²"], correctAnswer: "(4/3)πr³", hint: "V = 4/3 π r³" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь стереометрию! 📦" }
  },
  {
    title: "Многогранники",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Сколько граней у тетраэдра?", options: ["3", "4", "6"], correctAnswer: "4", hint: "Тетраэдр = 4 грани" },
      { type: 'quiz', question: "Сколько граней у куба?", options: ["4", "6", "8"], correctAnswer: "6", hint: "Куб = 6 граней" },
      { type: 'find', question: "Выбери правильные многогранники:", options: ["Тетраэдр", "Куб", "Пирамида", "Октаэдр", "Цилиндр"], correctAnswer: ["Тетраэдр", "Куб", "Октаэдр"], hint: "Правильные многогранники имеют равные грани" },
      { type: 'quiz', question: "Призма - это многогранник с:", options: ["Треугольным основанием", "Двумя равными основаниями", "Одной вершиной"], correctAnswer: "Двумя равными основаниями", hint: "Призма = два параллельных основания" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь многогранники! 🔷" }
  },

  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Стили речи",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Научный стиль используется в:", options: ["Художественных произведениях", "Научных статьях", "Разговорах"], correctAnswer: "Научных статьях", hint: "Научный стиль - точность, логичность" },
      { type: 'find', question: "Выбери стили речи:", options: ["Научный", "Деловой", "Книжный", "Разговорный", "Художественный"], correctAnswer: ["Научный", "Деловой", "Разговорный", "Художественный"], hint: "Функциональные стили русского языка" },
      { type: 'quiz', question: "Официально-деловой стиль характеризуется:", options: ["Образностью", "Стандартизацией", "Эмоциональностью"], correctAnswer: "Стандартизацией", hint: "Деловой стиль - документы, стандарты" },
      { type: 'quiz', question: "Художественный стиль использует:", options: ["Терминологию", "Образность и эмоции", "Штампы"], correctAnswer: "Образность и эмоции", hint: "Художественный стиль - литература" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь стили речи! 📝" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Чехов",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "А.П. Чехов родился в:", options: ["1860", "1850", "1870"], correctAnswer: "1860", hint: "1860 год, Таганрог" },
      { type: 'find', question: "Выбери произведения Чехова:", options: ["Вишнёвый сад", "Чайка", "Три сестры", "На дне", "Ревизор"], correctAnswer: ["Вишнёвый сад", "Чайка", "Три сестры"], hint: "Чехов - мастер рассказа и драматургии" },
      { type: 'quiz', question: "«Вишнёвый сад» - это:", options: ["Роман", "Пьеса", "Рассказ"], correctAnswer: "Пьеса", hint: "Пьеса о смене эпох" },
      { type: 'quiz', question: "Чехов - профессия:", options: ["Учитель", "Врач", "Юрист"], correctAnswer: "Врач", hint: "Чехов был врачом и писателем" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Чехова! 📖" }
  },
  {
    title: "Бунин и Куприн",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "И.А. Бунин - лауреат Нобелевской премии по литературе:", options: ["Да", "Нет"], correctAnswer: "Да", hint: "Первый русский нобелевский лауреат по литературе" },
      { type: 'find', question: "Выбери произведения Бунина:", options: ["Тёмные аллеи", "Гранатовый браслет", "Окаянные дни", "Поединок", "Жизнь Арсеньева"], correctAnswer: ["Тёмные аллеи", "Окаянные дни", "Жизнь Арсеньева"], hint: "Бунин - мастер лирической прозы" },
      { type: 'quiz', question: "«Гранатовый браслет» - автор:", options: ["Бунин", "Куприн", "Чехов"], correctAnswer: "Куприн", hint: "Куприн - автор повести о любви" },
      { type: 'quiz', question: "«Поединок» - произведение о:", options: ["Любви", "Армейской жизни", "Революции"], correctAnswer: "Армейской жизни", hint: "Куприн описал армейские будни" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь русскую литературу! 📚" }
  },

  // ========== ИСТОРИЯ ==========
  {
    title: "Вторая мировая война",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Когда началась Вторая мировая война?", options: ["1939", "1941", "1945"], correctAnswer: "1939", hint: "1 сентября 1939 - нападение на Польшу" },
      { type: 'quiz', question: "Когда началась Великая Отечественная война?", options: ["22 июня 1941", "1 сентября 1939", "9 мая 1945"], correctAnswer: "22 июня 1941", hint: "Нападение Германии на СССР" },
      { type: 'find', question: "Выбери битвы Великой Отечественной:", options: ["Сталинградская", "Курская", "Бородинская", "Битва за Москву", "Невская"], correctAnswer: ["Сталинградская", "Курская", "Битва за Москву"], hint: "Крупнейшие сражения 1941-1945" },
      { type: 'quiz', question: "Когда закончилась Великая Отечественная война?", options: ["8 мая 1945", "9 мая 1945", "2 сентября 1945"], correctAnswer: "9 мая 1945", hint: "День Победы - 9 мая" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! ⚔️" }
  },

  // ========== ФИЗИКА ==========
  {
    title: "Механика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Второй закон Ньютона:", options: ["F = ma", "F = mv", "F = m/a"], correctAnswer: "F = ma", hint: "Сила = масса × ускорение" },
      { type: 'fill', question: "Если m = 2 кг, a = 3 м/с², то F = __ Н", correctAnswer: "6", hint: "F = 2 × 3 = 6" },
      { type: 'quiz', question: "Закон всемирного тяготения:", options: ["F = Gm₁m₂/r²", "F = Gm₁m₂/r", "F = Gm₁+m₂/r"], correctAnswer: "F = Gm₁m₂/r²", hint: "Сила обратно пропорциональна квадрату расстояния" },
      { type: 'quiz', question: "Импульс тела:", options: ["p = m/v", "p = mv", "p = F·t"], correctAnswer: "p = mv", hint: "Импульс = масса × скорость" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь механику! ⚛️" }
  },

  // ========== ХИМИЯ ==========
  {
    title: "Органическая химия",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Формула метана:", options: ["CH₄", "C₂H₄", "C₂H₆"], correctAnswer: "CH₄", hint: "Метан - простейший алкан" },
      { type: 'quiz', question: "Алканы имеют общую формулу:", options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂"], correctAnswer: "CₙH₂ₙ₊₂", hint: "Алканы - предельные углеводороды" },
      { type: 'find', question: "Выбери алканы:", options: ["Метан", "Этен", "Этан", "Пропан", "Этин"], correctAnswer: ["Метан", "Этан", "Пропан"], hint: "Алканы - только одинарные связи" },
      { type: 'quiz', question: "Этанол - это:", options: ["Уксус", "Спирт", "Сахар"], correctAnswer: "Спирт", hint: "C₂H₅OH - этиловый спирт" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь органическую химию! 🧪" }
  },

  // ========== БИОЛОГИЯ ==========
  {
    title: "Эволюция",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Автор теории эволюции:", options: ["Менделеев", "Дарвин", "Павлов"], correctAnswer: "Дарвин", hint: "Чарльз Дарвин - автор теории эволюции" },
      { type: 'quiz', question: "Естественный отбор - это:", options: ["Выбор человека", "Выживание приспособленных", "Случайные изменения"], correctAnswer: "Выживание приспособленных", hint: "Приспособленные особи выживают" },
      { type: 'find', question: "Выбери доказательства эволюции:", options: ["Палеонтологические", "Сравнительно-анатомические", "Молекулярно-генетические", "Географические", "Физические"], correctAnswer: ["Палеонтологические", "Сравнительно-анатомические", "Молекулярно-генетические"], hint: "Основные доказательства эволюции" },
      { type: 'quiz', question: "Рудименты - это:", options: ["Новые органы", "Органы, утратившие функцию", "Атавизмы"], correctAnswer: "Органы, утратившие функцию", hint: "Например, копчик у человека" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь эволюцию! 🧬" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Modal Verbs",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "«You ___ smoke here» (запрет):", options: ["can", "mustn't", "should"], correctAnswer: "mustn't", hint: "Mustn't = строгий запрет" },
      { type: 'quiz', question: "«She ___ be at home» (вероятность):", options: ["must", "can", "should"], correctAnswer: "must", hint: "Must = большая вероятность" },
      { type: 'fill', question: "You __ take an umbrella. It's raining. (should/must)", correctAnswer: "should", hint: "Should = совет" },
      { type: 'quiz', question: "«I __ swim when I was 5» (прошлое):", options: ["can", "could", "may"], correctAnswer: "could", hint: "Could = мог в прошлом" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь модальные глаголы! 🇬🇧" }
  },

  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Исследование функций",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Точки экстремума - это:", options: ["Точки пересечения с осями", "Точки максимума и минимума", "Точки перегиба"], correctAnswer: "Точки максимума и минимума", hint: "Экстремум = максимум или минимум" },
      { type: 'quiz', question: "Если f'(x) > 0, то функция:", options: ["Возрастает", "Убывает", "Постоянна"], correctAnswer: "Возрастает", hint: "Положительная производная = рост" },
      { type: 'fill', question: "Если f'(x) = 0 в точке, то это __ точка", correctAnswer: "критическая", hint: "Критическая точка = производная равна 0" },
      { type: 'quiz', question: "Вторая производная показывает:", options: ["Скорость роста", "Выпуклость функции", "Экстремум"], correctAnswer: "Выпуклость функции", hint: "f''(x) > 0 = выпуклость вниз" }
    ],
    reward: { stars: 3, message: "Отлично! Ты умеешь исследовать функции! 📊" }
  },
  {
    title: "Векторы в пространстве",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Вектор имеет:", options: ["Только длину", "Длину и направление", "Только направление"], correctAnswer: "Длину и направление", hint: "Вектор - направленный отрезок" },
      { type: 'fill', question: "Длина вектора a(3, 4, 0) = __", correctAnswer: "5", hint: "|a| = √(9 + 16 + 0) = 5" },
      { type: 'quiz', question: "Коллинеарные векторы:", options: ["Перпендикулярны", "Лежат на параллельных прямых", "Равны"], correctAnswer: "Лежат на параллельных прямых", hint: "Коллинеарные = параллельные" },
      { type: 'fill', question: "a(1,2,3), b(2,4,6). Векторы коллинеарны, k = __", correctAnswer: "2", hint: "b = 2a" }
    ],
    reward: { stars: 3, message: "Супер! Ты работаешь с векторами! 📏" }
  },
  {
    title: "Молекулярная физика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Идеальный газ - это:", options: ["Реальный газ", "Модель газа без взаимодействия молекул", "Жидкость"], correctAnswer: "Модель газа без взаимодействия молекул", hint: "Модель идеального газа" },
      { type: 'fill', question: "Уравнение Менделеева-Клапейрона: PV = __RT (ν - количество вещества)", correctAnswer: "ν", hint: "PV = νRT" },
      { type: 'quiz', question: "При постоянном объёме давление газа:", options: ["Не меняется", "Прямо пропорционально температуре", "Обратно пропорционально температуре"], correctAnswer: "Прямо пропорционально температуре", hint: "Закон Шарля: P/T = const" },
      { type: 'fill', question: "При T = 0 К тепловое движение __", correctAnswer: "прекращается", hint: "Абсолютный ноль" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь молекулярную физику! ⚛️" }
  },
  {
    title: "Электромагнетизм",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Магнитное поле создаётся:", options: ["Покоющимися зарядами", "Движущимися зарядами", "Только магнитами"], correctAnswer: "Движущимися зарядами", hint: "Ток создаёт магнитное поле" },
      { type: 'quiz', question: "Сила Лоренца действует на:", options: ["Покоющийся заряд", "Движущийся заряд", "Любой заряд"], correctAnswer: "Движущийся заряд", hint: "F = qvB sin α" },
      { type: 'find', question: "Выбери применения электромагнетизма:", options: ["Электродвигатель", "Генератор", "Термометр", "Трансформатор", "Линейка"], correctAnswer: ["Электродвигатель", "Генератор", "Трансформатор"], hint: "Применения электромагнитной индукции" },
      { type: 'fill', question: "Правило __ руки определяет направление силы (левой)", correctAnswer: "левой", hint: "Правило левой руки для силы Ампера" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь электромагнетизм! ⚡" }
  },
  {
    title: "Гидролиз солей",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Гидролиз - это:", options: ["Разложение водой", "Разложение кислотой", "Окисление"], correctAnswer: "Разложение водой", hint: "Гидролиз = взаимодействие с водой" },
      { type: 'quiz', question: "Соль сильной кислоты и слабого основания даёт среду:", options: ["Нейтральную", "Кислую", "Щелочную"], correctAnswer: "Кислую", hint: "Например, NH₄Cl" },
      { type: 'find', question: "Выбери соли, подвергающиеся гидролизу:", options: ["NaCl", "CH₃COONa", "K₂SO₄", "NH₄Cl", "Al₂S₃"], correctAnswer: ["CH₃COONa", "NH₄Cl", "Al₂S₃"], hint: "Соли слабых кислот или слабых оснований" },
      { type: 'quiz', question: "Среда раствора Na₂CO₃:", options: ["Нейтральная", "Кислая", "Щелочная"], correctAnswer: "Щелочная", hint: "Соль слабой кислоты (угольной)" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь гидролиз! 🧪" }
  },
  {
    title: "Генетика",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Ген - это:", options: ["Белок", "Участок ДНК", "Клетка"], correctAnswer: "Участок ДНК", hint: "Ген кодирует признак" },
      { type: 'quiz', question: "Гомозигота имеет:", options: ["Разные аллели", "Одинаковые аллели", "Только доминантный признак"], correctAnswer: "Одинаковые аллели", hint: "AA или aa" },
      { type: 'find', question: "Выбери законы Менделя:", options: ["Единообразия", "Расщепления", "Независимого наследования", "Сцепления", "Доминирования"], correctAnswer: ["Единообразия", "Расщепления", "Независимого наследования"], hint: "Три закона Менделя" },
      { type: 'fill', question: "При скрещивании Aa × Aa расщепление по фенотипу __:1 (доминантный:рецессивный)", correctAnswer: "3", hint: "3:1 по фенотипу" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь генетику! 🧬" }
  },
  {
    title: "Революция 1917 года",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Февральская революция произошла в:", options: ["1914", "1917", "1918"], correctAnswer: "1917", hint: "Февраль 1917 года" },
      { type: 'quiz', question: "Результат Февральской революции:", options: ["Приход большевиков", "Отречение Николая II", "Начало войны"], correctAnswer: "Отречение Николая II", hint: "Конец монархии в России" },
      { type: 'find', question: "Выбери события 1917 года:", options: ["Февральская революция", "Октябрьская революция", "Отречение Николая II", "Гражданская война", "Первая мировая"], correctAnswer: ["Февральская революция", "Октябрьская революция", "Отречение Николая II"], hint: "Ключевые события 1917 года" },
      { type: 'quiz', question: "Октябрьская революция привела к:", options: ["Конституционной монархии", "Установлению советской власти", "Демократии"], correctAnswer: "Установлению советской власти", hint: "Большевики взяли власть" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! ⚔️" }
  },
  {
    title: "Conditionals",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Zero Conditional описывает:", options: ["Будущее", "Законы природы", "Нереальное"], correctAnswer: "Законы природы", hint: "If + Present, Present" },
      { type: 'quiz', question: "First Conditional: If it rains, I __ (stay) home.", options: ["will stay", "would stay", "stay"], correctAnswer: "will stay", hint: "First = реальное будущее" },
      { type: 'fill', question: "If I __ (be) you, I would study more. (were)", correctAnswer: "were", hint: "Second Conditional = нереальное настоящее" },
      { type: 'find', question: "Выбери типы условных предложений:", options: ["Zero Conditional", "First Conditional", "Past Conditional", "Second Conditional", "Third Conditional"], correctAnswer: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"], hint: "Четыре основных типа" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь условные предложения! 🇬🇧" }
  },
  {
    title: "Сочинение ЕГЭ",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Проблема в сочинении - это:", options: ["Тема текста", "Вопрос, над которым размышляет автор", "Главная мысль"], correctAnswer: "Вопрос, над которым размышляет автор", hint: "Проблема = вопрос" },
      { type: 'quiz', question: "Позиция автора - это:", options: ["Тема текста", "Отношение автора к проблеме", "Вывод"], correctAnswer: "Отношение автора к проблеме", hint: "Что думает автор" },
      { type: 'find', question: "Выбери структуру сочинения:", options: ["Вступление", "Проблема", "Комментарий", "Позиция автора", "Своя позиция"], correctAnswer: ["Вступление", "Проблема", "Комментарий", "Позиция автора", "Своя позиция"], hint: "Структура сочинения ЕГЭ" },
      { type: 'fill', question: "К2 в критериях - это __", correctAnswer: "комментарий", hint: "Комментарий к проблеме" }
    ],
    reward: { stars: 3, message: "Отлично! Ты готов к сочинению! 📝" }
  },

  // ========== НОВЫЕ ИГРЫ v3.41 ==========
  {
    title: "Тригонометрические формулы",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "sin 45° = __/√2 (число)", correctAnswer: "1", hint: "sin 45° = 1/√2 = √2/2" },
      { type: 'quiz', question: "cos 90° = ?", options: ["0", "1", "-1"], correctAnswer: "0", hint: "Косинус 90° = 0" },
      { type: 'quiz', question: "sin 2x = ?", options: ["2 sin x cos x", "sin²x + cos²x", "2 sin²x"], correctAnswer: "2 sin x cos x", hint: "Формула синуса двойного угла" },
      { type: 'fill', question: "cos 2x = cos²x - __²x", correctAnswer: "sin", hint: "cos 2x = cos²x - sin²x" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь тригонометрию! 📐" }
  },
  {
    title: "Тела вращения",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Цилиндр получается вращением:", options: ["Треугольника", "Прямоугольника", "Круга"], correctAnswer: "Прямоугольника", hint: "Вращение прямоугольника вокруг стороны" },
      { type: 'fill', question: "Объём цилиндра V = πr²h. Если r=2, h=5, то V = __π", correctAnswer: "20", hint: "V = π · 4 · 5 = 20π" },
      { type: 'quiz', question: "Конус получается вращением:", options: ["Прямоугольника", "Треугольника", "Круга"], correctAnswer: "Треугольника", hint: "Вращение прямоугольного треугольника" },
      { type: 'quiz', question: "Объём конуса:", options: ["πr²h", "(1/3)πr²h", "(4/3)πr³"], correctAnswer: "(1/3)πr²h", hint: "V = 1/3 · πr² · h" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь тела вращения! ⭕" }
  },
  {
    title: "Законы сохранения",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Закон сохранения энергии:", options: ["E = const", "E всегда растёт", "E всегда убывает"], correctAnswer: "E = const", hint: "Энергия не исчезает, а переходит" },
      { type: 'quiz', question: "Кинетическая энергия:", options: ["mgh", "mv²/2", "kx²/2"], correctAnswer: "mv²/2", hint: "Eк = mv²/2" },
      { type: 'fill', question: "Потенциальная энергия: Eп = mgh. Если m=2, g=10, h=5, то Eп = __ Дж", correctAnswer: "100", hint: "Eп = 2 × 10 × 5 = 100" },
      { type: 'quiz', question: "Закон сохранения импульса:", options: ["p₁ = p₂", "p₁ + p₂ = const", "p всегда 0"], correctAnswer: "p₁ + p₂ = const", hint: "Импульс системы сохраняется" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь законы сохранения! ⚛️" }
  },
  {
    title: "Алкины и алкены",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Алкены имеют общую формулу:", options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂"], correctAnswer: "CₙH₂ₙ", hint: "Алкены содержат двойную связь" },
      { type: 'quiz', question: "Этен (этилен) - это:", options: ["C₂H₄", "C₂H₆", "C₂H₂"], correctAnswer: "C₂H₄", hint: "Этен = C₂H₄ с двойной связью" },
      { type: 'find', question: "Выбери алкины:", options: ["Этин", "Этен", "Пропин", "Пропан", "Бутин"], correctAnswer: ["Этин", "Пропин", "Бутин"], hint: "Алкины содержат тройную связь" },
      { type: 'fill', question: "Этин (ацетилен) имеет формулу: C__H₂", correctAnswer: "2", hint: "C₂H₂ - ацетилен" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь углеводороды! 🧪" }
  },
  {
    title: "Экосистемы",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Продуценты - это:", options: ["Хищники", "Производители органики", "Разлагатели"], correctAnswer: "Производители органики", hint: "Продуценты = растения" },
      { type: 'find', question: "Выбери функциональные группы:", options: ["Продуценты", "Консументы", "Редуценты", "Минералы", "Вода"], correctAnswer: ["Продуценты", "Консументы", "Редуценты"], hint: "Три функциональные группы" },
      { type: 'quiz', question: "Пищевая цепь начинается с:", options: ["Хищников", "Растений", "Разлагателей"], correctAnswer: "Растений", hint: "Растения - продуценты" },
      { type: 'fill', question: "Правило __%: на следующий уровень переходит ~10% энергии", correctAnswer: "10", hint: "Правило 10%" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь экосистемы! 🌿" }
  },
  {
    title: "Холодная война",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "«Холодная война» началась после:", options: ["Первой мировой", "Второй мировой", "Революции 1917"], correctAnswer: "Второй мировой", hint: "Противостояние СССР и США" },
      { type: 'quiz', question: "Карибский кризис:", options: ["1960", "1962", "1965"], correctAnswer: "1962", hint: "1962 год - ядерный кризис" },
      { type: 'find', question: "Выбери события «холодной войны»:", options: ["Карибский кризис", "Берлинская стена", "Вторая мировая", "Война во Вьетнаме", "Первая мировая"], correctAnswer: ["Карибский кризис", "Берлинская стена", "Война во Вьетнаме"], hint: "Глобальное противостояние" },
      { type: 'quiz', question: "«Железный занавес» - это:", options: ["Реальная стена", "Политический барьер", "Военный союз"], correctAnswer: "Политический барьер", hint: "Разделение Востока и Запада" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! ⚔️" }
  },
  {
    title: "Passive Voice",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "The book ___ (write) by Pushkin.", options: ["wrote", "was written", "written"], correctAnswer: "was written", hint: "Past Simple Passive: was/were + V3" },
      { type: 'fill', question: "English ___ (speak) worldwide. (is spoken)", correctAnswer: "is spoken", hint: "Present Simple Passive: am/is/are + V3" },
      { type: 'quiz', question: "The house ___ (build) next year.", options: ["will build", "will be built", "built"], correctAnswer: "will be built", hint: "Future Simple Passive: will be + V3" },
      { type: 'find', question: "Выбери признаки пассивного залога:", options: ["be + V3", "have + V3", "is done", "was written", "will do"], correctAnswer: ["be + V3", "is done", "was written"], hint: "Пассив = быть + причастие" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь пассивный залог! 🇬🇧" }
  }
]
