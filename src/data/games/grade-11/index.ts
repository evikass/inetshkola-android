// Экспорт игр для 11 класса
import { GameLesson } from '../types'

export const eleventhGradeGames: GameLesson[] = [
  // ========== АЛГЕБРА ==========
  {
    title: "Интеграл",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Интеграл - это:", options: ["Производная", "Первобразная", "Скорость"], correctAnswer: "Первообразная", hint: "Интегрирование - операция, обратная дифференцированию" },
      { type: 'fill', question: "∫x²dx = x³/__ + C", correctAnswer: "3", hint: "∫xⁿdx = xⁿ⁺¹/(n+1)" },
      { type: 'quiz', question: "∫cos(x)dx = ?", options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C"], correctAnswer: "sin(x) + C", hint: "Производная синуса - косинус" },
      { type: 'quiz', question: "Формула Ньютона-Лейбница:", options: ["∫ᵃᵇf(x)dx = F(b) - F(a)", "∫ᵃᵇf(x)dx = F(a) - F(b)", "∫ᵃᵇf(x)dx = F(a) + F(b)"], correctAnswer: "∫ᵃᵇf(x)dx = F(b) - F(a)", hint: "Определённый интеграл через первообразную" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь интегралы! 📐" }
  },
  {
    title: "Логарифмы",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "log₂8 = __ (2 в какой степени = 8?)", correctAnswer: "3", hint: "2³ = 8" },
      { type: 'quiz', question: "logₐa = ?", options: ["0", "1", "a"], correctAnswer: "1", hint: "a¹ = a" },
      { type: 'quiz', question: "logₐ1 = ?", options: ["0", "1", "a"], correctAnswer: "0", hint: "a⁰ = 1" },
      { type: 'quiz', question: "logₐ(xy) = ?", options: ["logₐx + logₐy", "logₐx · logₐy", "logₐx - logₐy"], correctAnswer: "logₐx + logₐy", hint: "Логарифм произведения = сумма логарифмов" }
    ],
    reward: { stars: 3, message: "Супер! Ты работаешь с логарифмами! 🔢" }
  },
  {
    title: "Комплексные числа",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "i² = ?", options: ["-1", "1", "0"], correctAnswer: "-1", hint: "i = √(-1), i² = -1" },
      { type: 'fill', question: "(3 + 2i) + (1 + 4i) = __ + 6i", correctAnswer: "4", hint: "Складываем действительные части: 3 + 1" },
      { type: 'quiz', question: "Мнимая единица i = ?", options: ["√1", "√(-1)", "√0"], correctAnswer: "√(-1)", hint: "i = √(-1)" },
      { type: 'quiz', question: "Комплексное число a + bi содержит:", options: ["Только действительную часть", "Только мнимую часть", "Обе части"], correctAnswer: "Обе части", hint: "a - действительная, bi - мнимая часть" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь комплексные числа! 📊" }
  },

  // ========== ГЕОМЕТРИЯ ==========
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
    title: "Координаты и векторы в пространстве",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'fill', question: "Расстояние между точками A(0,0,0) и B(3,4,0) = __", correctAnswer: "5", hint: "√(3² + 4² + 0²) = 5" },
      { type: 'quiz', question: "Скалярное произведение векторов a·b = ?", options: ["|a| × |b|", "|a| × |b| × cos α", "|a| + |b|"], correctAnswer: "|a| × |b| × cos α", hint: "Через модули и косинус угла" },
      { type: 'fill', question: "Вектор a(1,2,3), вектор b(2,1,1). a·b = __", correctAnswer: "7", hint: "1·2 + 2·1 + 3·1 = 7" },
      { type: 'quiz', question: "Если скалярное произведение = 0, то векторы:", options: ["Коллинеарны", "Перпендикулярны", "Равны"], correctAnswer: "Перпендикулярны", hint: "a·b = 0 → cos 90° = 0" }
    ],
    reward: { stars: 3, message: "Супер! Ты работаешь в пространстве! 📏" }
  },

  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Нормы языка",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Орфоэпические нормы - это:", options: ["Правила написания", "Правила произношения", "Правила образования слов"], correctAnswer: "Правила произношения", hint: "Орфоэпия = произношение" },
      { type: 'quiz', question: "Грамматические нормы регулируют:", options: ["Произношение", "Образование форм слов", "Написание"], correctAnswer: "Образование форм слов", hint: "Склонение, спряжение" },
      { type: 'find', question: "Выбери языковые нормы:", options: ["Орфоэпические", "Лексические", "Грамматические", "Математические", "Физические"], correctAnswer: ["Орфоэпические", "Лексические", "Грамматические"], hint: "Основные нормы литературного языка" },
      { type: 'quiz', question: "Лексические нормы - это:", options: ["Правила произношения", "Правила употребления слов", "Правила написания"], correctAnswer: "Правила употребления слов", hint: "Правильное использование слов" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь нормы языка! 📝" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Серебряный век",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Серебряный век - это период:", options: ["XIX века", "Конца XIX - начала XX века", "XX века"], correctAnswer: "Конца XIX - начала XX века", hint: "1890-1917 годы" },
      { type: 'find', question: "Выбери поэтов Серебряного века:", options: ["Блок", "Есенин", "Маяковский", "Пушкин", "Ахматова"], correctAnswer: ["Блок", "Есенин", "Маяковский", "Ахматова"], hint: "Поэты рубежа XIX-XX веков" },
      { type: 'quiz', question: "Символизм - это направление:", options: ["Реалистическое", "Модернистское", "Классическое"], correctAnswer: "Модернистское", hint: "Символизм - течение модернизма" },
      { type: 'quiz', question: "Акмеизм противопоставлялся:", options: ["Реализму", "Символизму", "Классицизму"], correctAnswer: "Символизму", hint: "Акмеисты отказались от символизма" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Серебряный век! 📖" }
  },
  {
    title: "Литература XX века",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "М.А. Булгаков написал:", options: ["Тихий Дон", "Мастер и Маргарита", "Доктор Живаго"], correctAnswer: "Мастер и Маргарита", hint: "Роман о любви и творчестве" },
      { type: 'find', question: "Выбери писателей XX века:", options: ["Шолохов", "Пастернак", "Булгаков", "Толстой", "Солженицын"], correctAnswer: ["Шолохов", "Пастернак", "Булгаков", "Солженицын"], hint: "Русская литература XX века" },
      { type: 'quiz', question: "«Тихий Дон» - автор:", options: ["Булгаков", "Шолохов", "Пастернак"], correctAnswer: "Шолохов", hint: "Шолохов - нобелевский лауреат" },
      { type: 'quiz', question: "«Доктор Живаго» - автор:", options: ["Булгаков", "Шолохов", "Пастернак"], correctAnswer: "Пастернак", hint: "Пастернак - нобелевский лауреат" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь литературу XX века! 📚" }
  },

  // ========== ИСТОРИЯ ==========
  {
    title: "Холодная война",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "«Холодная война» началась после:", options: ["Первой мировой", "Второй мировой", "Революции 1917"], correctAnswer: "Второй мировой", hint: "Противостояние СССР и США" },
      { type: 'quiz', question: "Фултонская речь Черчилля:", options: ["1945", "1946", "1947"], correctAnswer: "1946", hint: "1946 год - начало «холодной войны»" },
      { type: 'find', question: "Выбери события «холодной войны»:", options: ["Карибский кризис", "Берлинская стена", "Вторая мировая", "Война во Вьетнаме", "Первая мировая"], correctAnswer: ["Карибский кризис", "Берлинская стена", "Война во Вьетнаме"], hint: "Глобальное противостояние" },
      { type: 'quiz', question: "Карибский кризис:", options: ["1960", "1962", "1965"], correctAnswer: "1962", hint: "1962 год - ядерный кризис" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! ⚔️" }
  },
  {
    title: "Распад СССР",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Когда был распад СССР?", options: ["1989", "1991", "1993"], correctAnswer: "1991", hint: "Декабрь 1991 года" },
      { type: 'quiz', question: "Первый президент России:", options: ["Горбачёв", "Ельцин", "Путин"], correctAnswer: "Ельцин", hint: "Б.Н. Ельцин - первый президент РФ" },
      { type: 'find', question: "Выбери события перестройки:", options: ["Гласность", "Ускорение", "Коллективизация", "Демократизация", "Индустриализация"], correctAnswer: ["Гласность", "Ускорение", "Демократизация"], hint: "Политика Горбачёва" },
      { type: 'quiz', question: "Последний лидер СССР:", options: ["Ельцин", "Горбачёв", "Андропов"], correctAnswer: "Горбачёв", hint: "М.С. Горбачёв - последний генсек" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь новейшую историю! 🏛️" }
  },

  // ========== ФИЗИКА ==========
  {
    title: "Атомная физика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Кто открыл радиоактивность?", options: ["Резерфорд", "Беккерель", "Кюри"], correctAnswer: "Беккерель", hint: "Анри Беккерель, 1896" },
      { type: 'quiz', question: "Альфа-излучение - это:", options: ["Поток электронов", "Поток ядер гелия", "Электромагнитные волны"], correctAnswer: "Поток ядер гелия", hint: "α = ₂⁴He" },
      { type: 'find', question: "Выбери виды радиоактивного распада:", options: ["Альфа-распад", "Бета-распад", "Гамма-излучение", "Дельта-распад"], correctAnswer: ["Альфа-распад", "Бета-распад", "Гамма-излучение"], hint: "Три основных вида" },
      { type: 'quiz', question: "Формула Эйнштейна E = ?", options: ["mc", "mc²", "m²c"], correctAnswer: "mc²", hint: "E = mc² - энергия и масса эквивалентны" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь атомную физику! ⚛️" }
  },
  {
    title: "Квантовая физика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Квант - это:", options: ["Волна", "Порция энергии", "Частица"], correctAnswer: "Порция энергии", hint: "E = hν - энергия кванта" },
      { type: 'quiz', question: "Постоянная Планка обозначается:", options: ["c", "h", "ν"], correctAnswer: "h", hint: "h ≈ 6.63 × 10⁻³⁴ Дж·с" },
      { type: 'fill', question: "E = hν, где ν - это __ (частота)", correctAnswer: "частота", hint: "Греческая буква ню" },
      { type: 'quiz', question: "Фотоэффект открыл:", options: ["Эйнштейн", "Столетов", "Планк"], correctAnswer: "Столетов", hint: "А.Г. Столетов изучал фотоэффект" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь квантовую физику! 🔬" }
  },

  // ========== ХИМИЯ ==========
  {
    title: "Химическая кинетика",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Скорость химической реакции измеряется в:", options: ["моль/л·с", "г/см³", "м/с"], correctAnswer: "моль/л·с", hint: "Изменение концентрации в единицу времени" },
      { type: 'quiz', question: "При повышении температуры скорость реакции:", options: ["Уменьшается", "Увеличивается", "Не меняется"], correctAnswer: "Увеличивается", hint: "Правило Вант-Гоффа" },
      { type: 'find', question: "Выбери факторы, влияющие на скорость:", options: ["Температура", "Концентрация", "Катализатор", "Давление", "Объём"], correctAnswer: ["Температура", "Концентрация", "Катализатор", "Давление"], hint: "Факторы скорости реакции" },
      { type: 'quiz', question: "Катализатор:", options: ["Расходуется в реакции", "Не расходуется", "Замедляет реакцию"], correctAnswer: "Не расходуется", hint: "Катализатор ускоряет, но не расходуется" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь кинетику! 🧪" }
  },

  // ========== БИОЛОГИЯ ==========
  {
    title: "Экология",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Экология изучает:", options: ["Клетки", "Взаимоотношения организмов", "Молекулы"], correctAnswer: "Взаимоотношения организмов", hint: "Экология - наука о связях в природе" },
      { type: 'find', question: "Выбери уровни организации жизни:", options: ["Клеточный", "Организменный", "Популяционный", "Молекулярный", "Биосферный"], correctAnswer: ["Клеточный", "Организменный", "Популяционный", "Биосферный"], hint: "Уровни организации живого" },
      { type: 'quiz', question: "Пищевая цепь начинается с:", options: ["Хищников", "Производителей", "Разлагателей"], correctAnswer: "Производителей", hint: "Растения - производители" },
      { type: 'quiz', question: "Биосфера - это:", options: ["Часть Земли с жизнью", "Атмосфера", "Гидросфера"], correctAnswer: "Часть Земли с жизнью", hint: "По Вернадскому - оболочка Земли с жизнью" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь экологию! 🌿" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Academic English",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Essay structure includes:", options: ["Introduction, Body, Conclusion", "Only Body", "Introduction only"], correctAnswer: "Introduction, Body, Conclusion", hint: "Три части эссе" },
      { type: 'find', question: "Выбери linking words:", options: ["However", "Therefore", "Moreover", "Beautiful", "Quickly"], correctAnswer: ["However", "Therefore", "Moreover"], hint: "Слова-связки для эссе" },
      { type: 'quiz', question: "«In conclusion» используется:", options: ["В начале", "В конце", "В середине"], correctAnswer: "В конце", hint: "In conclusion = в заключение" },
      { type: 'fill', question: "On the one hand... on the __ hand...", correctAnswer: "other", hint: "С одной стороны... с другой стороны" }
    ],
    reward: { stars: 3, message: "Excellent! Ты готов к академическому английскому! 🇬🇧" }
  },
  {
    title: "Phrasal Verbs",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "«Give up» means:", options: ["Start", "Stop trying", "Continue"], correctAnswer: "Stop trying", hint: "Give up = бросить, отказаться" },
      { type: 'quiz', question: "«Look after» means:", options: ["Search", "Take care of", "Watch"], correctAnswer: "Take care of", hint: "Look after = присматривать" },
      { type: 'find', question: "Выбери фразовые глаголы:", options: ["Look up", "Go on", "Turn off", "Beautiful house", "Very quickly"], correctAnswer: ["Look up", "Go on", "Turn off"], hint: "Фразовые глаголы = глагол + предлог" },
      { type: 'fill', question: "Turn __ the light, please. (off/on)", correctAnswer: "off", hint: "Turn off = выключить" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь фразовые глаголы! 🔄" }
  },

  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Определённый интеграл",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "∫₀² x dx = __ (по формуле Ньютона-Лейбница)", correctAnswer: "2", hint: "x²/2 от 0 до 2 = 4/2 - 0 = 2" },
      { type: 'quiz', question: "Площадь под графиком f(x) от a до b:", options: ["f(b) - f(a)", "∫ₐᵇ f(x)dx", "f'(x)"], correctAnswer: "∫ₐᵇ f(x)dx", hint: "Определённый интеграл = площадь" },
      { type: 'fill', question: "∫₀¹ 2x dx = __", correctAnswer: "1", hint: "x² от 0 до 1 = 1 - 0 = 1" },
      { type: 'quiz', question: "Интеграл от константы C:", options: ["Cx + C", "C", "Cx"], correctAnswer: "Cx + C", hint: "∫C dx = Cx + C₁" }
    ],
    reward: { stars: 3, message: "Отлично! Ты работаешь с интегралами! 📐" }
  },
  {
    title: "Дифференциальные уравнения",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Дифференциальное уравнение содержит:", options: ["Только функцию", "Функцию и её производные", "Только производные"], correctAnswer: "Функцию и её производные", hint: "Уравнение с производными" },
      { type: 'quiz', question: "Решение y' = kx:", options: ["y = kx", "y = kx²/2 + C", "y = k"], correctAnswer: "y = kx²/2 + C", hint: "Интегрируем обе части" },
      { type: 'fill', question: "y' = 5, тогда y = 5x + __", correctAnswer: "C", hint: "Произвольная постоянная" },
      { type: 'quiz', question: "Порядок дифференциального уравнения определяется:", options: ["Старшей степенью", "Старшей производной", "Количеством переменных"], correctAnswer: "Старшей производной", hint: "Порядок = наивысший порядок производной" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь дифференциальные уравнения! 🔢" }
  },
  {
    title: "Оптика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Закон преломления света:", options: ["sin α = sin β", "sin α / sin β = n", "α = β"], correctAnswer: "sin α / sin β = n", hint: "Закон Снеллиуса" },
      { type: 'fill', question: "Угол падения __ углу отражения", correctAnswer: "равен", hint: "Закон отражения" },
      { type: 'quiz', question: "Показатель преломления стекла:", options: ["≈ 1", "≈ 1.5", "≈ 2"], correctAnswer: "≈ 1.5", hint: "Стекло преломляет свет" },
      { type: 'find', question: "Выбери оптические явления:", options: ["Преломление", "Отражение", "Дифракция", "Испарение", "Интерференция"], correctAnswer: ["Преломление", "Отражение", "Дифракция", "Интерференция"], hint: "Явления, связанные со светом" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь оптику! 💡" }
  },
  {
    title: "Ядерная физика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Ядро состоит из:", options: ["Протонов и электронов", "Протонов и нейтронов", "Только протонов"], correctAnswer: "Протонов и нейтронов", hint: "Нуклоны = протоны + нейтроны" },
      { type: 'fill', question: "Массовое число A = Z + N, где Z - протоны, N - __", correctAnswer: "нейтроны", hint: "N = количество нейтронов" },
      { type: 'quiz', question: "Альфа-распад:", options: ["Вылет электрона", "Вылет ядра гелия", "Вылет нейтрона"], correctAnswer: "Вылет ядра гелия", hint: "₂⁴He" },
      { type: 'quiz', question: "Бета-распад:", options: ["Вылет электрона", "Вылет ядра гелия", "Вылет протона"], correctAnswer: "Вылет электрона", hint: "Превращение нейтрона в протон" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь ядерную физику! ⚛️" }
  },
  {
    title: "Общая химия",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Окислительно-восстановительные реакции:", options: ["Без изменения степеней", "С изменением степеней окисления", "Только с кислородом"], correctAnswer: "С изменением степеней окисления", hint: "ОВР = передача электронов" },
      { type: 'find', question: "Выбери окислители:", options: ["O₂", "H₂", "KMnO₄", "Na", "Cl₂"], correctAnswer: ["O₂", "KMnO₄", "Cl₂"], hint: "Окислители принимают электроны" },
      { type: 'fill', question: "В реакции Zn + 2HCl → ZnCl₂ + H₂ окислитель - __", correctAnswer: "HCl", hint: "Водород принимает электроны" },
      { type: 'quiz', question: "Электролиз - это:", options: ["Разложение током", "Нагревание", "Окисление"], correctAnswer: "Разложение током", hint: "Незапланированное разложение вещества током" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь химию! 🧪" }
  },
  {
    title: "Биосфера и экология",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Автор учения о биосфере:", options: ["Дарвин", "Вернадский", "Менделеев"], correctAnswer: "Вернадский", hint: "В.И. Вернадский" },
      { type: 'find', question: "Выбери функции биосферы:", options: ["Газовая", "Концентрационная", "Окислительная", "Механическая", "Биохимическая"], correctAnswer: ["Газовая", "Концентрационная", "Окислительная", "Биохимическая"], hint: "Функции живого вещества" },
      { type: 'quiz', question: "Красная книга содержит:", options: ["Все виды", "Редкие и исчезающие виды", "Опасные виды"], correctAnswer: "Редкие и исчезающие виды", hint: "Охрана природы" },
      { type: 'fill', question: "Биосфера - оболочка Земли, заселённая __ организмами", correctAnswer: "живыми", hint: "Сфера жизни" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь экологию! 🌍" }
  },
  {
    title: "Россия в 90-е годы",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Конституция 1993 года принята:", options: ["12 декабря", "12 июня", "7 ноября"], correctAnswer: "12 декабря", hint: "День Конституции" },
      { type: 'find', question: "Выбери события 90-х:", options: ["Приватизация", "Дефолт 1998", "Крым 2014", "Чеченские войны", "Олимпиада 2014"], correctAnswer: ["Приватизация", "Дефолт 1998", "Чеченские войны"], hint: "Россия в переходный период" },
      { type: 'quiz', question: "Приватизация в России началась в:", options: ["1990", "1992", "1995"], correctAnswer: "1992", hint: "Ваучерная приватизация" },
      { type: 'quiz', question: "Дефолт в России произошёл в:", options: ["1995", "1998", "2000"], correctAnswer: "1998", hint: "17 августа 1998" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь новейшую историю! 🏛️" }
  },
  {
    title: "Reported Speech",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "«I am happy» → He said he __ happy.", options: ["is", "was", "will be"], correctAnswer: "was", hint: "Смещение времён: Present → Past" },
      { type: 'fill', question: "«I will come» → She said she __ come.", correctAnswer: "would", hint: "Will → would" },
      { type: 'quiz', question: "«I can swim» → He said he __ swim.", options: ["can", "could", "will"], correctAnswer: "could", hint: "Can → could" },
      { type: 'find', question: "Выбери изменения в косвенной речи:", options: ["Here → There", "Now → Then", "Today → That day", "Tomorrow → Yesterday", "Yesterday → The day before"], correctAnswer: ["Here → There", "Now → Then", "Today → That day", "Yesterday → The day before"], hint: "Смещение местоимений и наречий" }
    ],
    reward: { stars: 3, message: "Excellent! Ты знаешь косвенную речь! 🇬🇧" }
  },

  // ========== НОВЫЕ ИГРЫ v3.42 ==========
  {
    title: "Тригонометрические уравнения",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "sin x = 0, x = ?", options: ["πn", "π/2 + πn", "2πn"], correctAnswer: "πn", hint: "sin x = 0 при x = πn" },
      { type: 'fill', question: "cos x = 1, x = __n", correctAnswer: "2π", hint: "cos x = 1 при x = 2πn" },
      { type: 'quiz', question: "tg x = 0, x = ?", options: ["πn", "π/2 + πn", "2πn"], correctAnswer: "πn", hint: "tg x = 0 при x = πn" },
      { type: 'quiz', question: "sin x = 1/2, x = ?", options: ["π/6 + 2πn", "π/3 + 2πn", "π/4 + 2πn"], correctAnswer: "π/6 + 2πn", hint: "sin 30° = 1/2" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь тригонометрические уравнения! 📐" }
  },
  {
    title: "Комбинации тел",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Шар вписан в куб. Диаметр шара равен:", options: ["Стороне куба", "Диагонали куба", "Половине стороны"], correctAnswer: "Стороне куба", hint: "Шар касается всех граней" },
      { type: 'quiz', question: "Конус вписан в цилиндр. Их высоты:", options: ["Разные", "Одинаковые", "Зависит от размера"], correctAnswer: "Одинаковые", hint: "Конус касается оснований цилиндра" },
      { type: 'fill', question: "Если радиус шара = 3, то объём = __π (4/3πr³)", correctAnswer: "36", hint: "V = 4/3 × π × 27 = 36π" },
      { type: 'quiz', question: "Сфера вписана в куб со стороной a. Радиус сферы:", options: ["a", "a/2", "a√2"], correctAnswer: "a/2", hint: "Диаметр = a" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь комбинации тел! 📦" }
  },
  {
    title: "Изобразительные средства",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "«Золотые руки» - это:", options: ["Эпитет", "Метафора", "Сравнение"], correctAnswer: "Метафора", hint: "Скрытое сравнение" },
      { type: 'quiz', question: "«Как лев, он был смел» - это:", options: ["Метафора", "Эпитет", "Сравнение"], correctAnswer: "Сравнение", hint: "Сравнение с союзом «как»" },
      { type: 'find', question: "Выбери эпитеты:", options: ["Золотая осень", "Сладкий сон", "Шёпот листьев", "Крикливый сосед", "Бежит быстро"], correctAnswer: ["Золотая осень", "Сладкий сон", "Крикливый сосед"], hint: "Образные определения" },
      { type: 'quiz', question: "«Шёпот листьев» - это:", options: ["Метафора", "Олицетворение", "Эпитет"], correctAnswer: "Олицетворение", hint: "Наделение предметов свойствами живых" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь изобразительные средства! ✨" }
  },
  {
    title: "Постмодернизм",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Постмодернизм характеризуется:", options: ["Чётким сюжетом", "Игрой с текстом", "Простотой"], correctAnswer: "Игрой с текстом", hint: "Интертекстуальность, ирония" },
      { type: 'find', question: "Выбери черты постмодернизма:", options: ["Интертекстуальность", "Ирония", "Цитатность", "Реализм", "Чёткий сюжет"], correctAnswer: ["Интертекстуальность", "Ирония", "Цитатность"], hint: "Особенности постмодернизма" },
      { type: 'quiz', question: "Постмодернизм возник:", options: ["В XIX веке", "Во второй половине XX века", "В XXI веке"], correctAnswer: "Во второй половине XX века", hint: "1960-е годы" },
      { type: 'quiz', question: "«Школа для дураков» - автор:", options: ["Пелевин", "Соколов", "Сорокин"], correctAnswer: "Соколов", hint: "Саша Соколов - постмодернист" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь постмодернизм! 📖" }
  },
  {
    title: "Современная Россия",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Крым вошёл в состав России:", options: ["2010", "2014", "2018"], correctAnswer: "2014", hint: "Март 2014 года" },
      { type: 'find', question: "Выбери события современной России:", options: ["Олимпиада Сочи 2014", "Крым 2014", "Конституция 1993", "Перестройка", "Вступление в ВТО 2012"], correctAnswer: ["Олимпиада Сочи 2014", "Крым 2014", "Вступление в ВТО 2012"], hint: "События после 2000 года" },
      { type: 'quiz', question: "Олимпиада в Сочи прошла в:", options: ["2010", "2014", "2018"], correctAnswer: "2014", hint: "Зимняя олимпиада" },
      { type: 'fill', question: "Конституция РФ принята в __ году", correctAnswer: "1993", hint: "12 декабря 1993" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь современную историю! 🇷🇺" }
  },
  {
    title: "Термодинамика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Первый закон термодинамики:", options: ["Q = A", "Q = ΔU + A", "ΔU = Q"], correctAnswer: "Q = ΔU + A", hint: "Количество теплоты = изменение внутренней энергии + работа" },
      { type: 'quiz', question: "Адиабатный процесс:", options: ["При постоянной температуре", "Без теплообмена", "При постоянном давлении"], correctAnswer: "Без теплообмена", hint: "Q = 0" },
      { type: 'find', question: "Выбери изопроцессы:", options: ["Изотермический", "Изобарный", "Изохорный", "Адиабатный", "Изотопный"], correctAnswer: ["Изотермический", "Изобарный", "Изохорный", "Адиабатный"], hint: "Процессы при постоянном параметре" },
      { type: 'fill', question: "КПД = (Q₁ - Q₂) / __", correctAnswer: "Q₁", hint: "КПД = полезная работа / затраченная энергия" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь термодинамику! ⚛️" }
  },
  {
    title: "Генетика человека",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Человек имеет хромосом:", options: ["23", "46", "48"], correctAnswer: "46", hint: "23 пары хромосом" },
      { type: 'quiz', question: "Пол человека определяется:", options: ["X-хромосомой", "Y-хромосомой", "Обеими"], correctAnswer: "Y-хромосомой", hint: "XY = мужчина, XX = женщина" },
      { type: 'find', question: "Выбери наследственные заболевания:", options: ["Гемофилия", "Дальтонизм", "Грипп", "Синдром Дауна", "Простуда"], correctAnswer: ["Гемофилия", "Дальтонизм", "Синдром Дауна"], hint: "Генетические нарушения" },
      { type: 'fill', question: "Гемофилия - __-сцепленное заболевание", correctAnswer: "X", hint: "Ген в X-хромосоме" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь генетику! 🧬" }
  },
  {
    title: "Mixed Conditionals",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "If I __ (study) harder yesterday, I would pass now.", options: ["studied", "had studied", "study"], correctAnswer: "had studied", hint: "Mixed: Past Perfect + would + V" },
      { type: 'quiz', question: "If she __ (be) rich, she would have bought it.", options: ["is", "were", "had been"], correctAnswer: "were", hint: "Mixed: Second + Third" },
      { type: 'fill', question: "If I knew her, I __ (say) hello yesterday. (would have said)", correctAnswer: "would have said", hint: "Present unreal + Past unreal" },
      { type: 'find', question: "Выбери типы conditionals:", options: ["Zero", "First", "Second", "Third", "Mixed"], correctAnswer: ["Zero", "First", "Second", "Third", "Mixed"], hint: "Пять типов условных предложений" }
    ],
    reward: { stars: 3, message: "Excellent! Ты знаешь смешанные условия! 🇬🇧" }
  }
]
