// Экспорт игр для 9 класса
import { GameLesson } from '../types'

export const ninthGradeGames: GameLesson[] = [
  // ========== АЛГЕБРА ==========
  {
    title: "Неравенства",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "При делении неравенства на отрицательное число знак:", options: ["Не меняется", "Меняется на противоположный", "Становится равенством"], correctAnswer: "Меняется на противоположный", hint: "Важно: при делении на минус знак меняется!" },
      { type: 'quiz', question: "Решить: 2x > 6", options: ["x > 3", "x < 3", "x > 4"], correctAnswer: "x > 3", hint: "x > 6/2 = 3" },
      { type: 'fill', question: "-x > 5, значит x < __", correctAnswer: "-5", hint: "При делении на -1 знак меняется" },
      { type: 'quiz', question: "Решить систему: x > 2 и x < 5", options: ["(2; 5)", "x > 5", "x < 2"], correctAnswer: "(2; 5)", hint: "Пересечение интервалов" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь неравенства! 📐" }
  },
  {
    title: "Прогрессии",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Арифметическая прогрессия: aₙ = a₁ + (n-1)d. Чему равен 5-й член: 2, 5, 8...?", options: ["11", "14", "17"], correctAnswer: "14", hint: "a₅ = 2 + 4×3 = 14" },
      { type: 'fill', question: "Сумма первых n членов арифм. прогрессии: Sₙ = n(a₁+aₙ)/2. S₅ = __ (для 2, 5, 8, 11, 14)", correctAnswer: "40", hint: "S₅ = 5(2+14)/2 = 40" },
      { type: 'quiz', question: "Геометрическая прогрессия: bₙ = b₁ × qⁿ⁻¹. Чему равен 4-й член: 2, 6, 18...?", options: ["36", "54", "72"], correctAnswer: "54", hint: "q = 3, b₄ = 2 × 3³ = 54" },
      { type: 'quiz', question: "Знаменатель геометрической прогрессии 3, 6, 12...:", options: ["2", "3", "4"], correctAnswer: "2", hint: "q = b₂/b₁ = 6/3 = 2" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь прогрессии! 🔢" }
  },
  {
    title: "Функции",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Что такое область определения функции?", options: ["Все значения y", "Все значения x", "График функции"], correctAnswer: "Все значения x", hint: "D(f) - допустимые значения x" },
      { type: 'quiz', question: "График y = x² называется:", options: ["Прямая", "Парабола", "Гипербола"], correctAnswer: "Парабола", hint: "Парабола - график квадратичной функции" },
      { type: 'quiz', question: "График y = k/x называется:", options: ["Прямая", "Парабола", "Гипербола"], correctAnswer: "Гипербола", hint: "Обратная пропорциональность" },
      { type: 'quiz', question: "Вершина параболы y = (x-2)² + 3:", options: ["(0; 0)", "(2; 3)", "(-2; 3)"], correctAnswer: "(2; 3)", hint: "y = (x-a)² + b → вершина (a; b)" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь функции! 📊" }
  },

  // ========== ГЕОМЕТРИЯ ==========
  {
    title: "Векторы",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Вектор имеет:", options: ["Только направление", "Только длину", "Направление и длину"], correctAnswer: "Направление и длину", hint: "Вектор - направленный отрезок" },
      { type: 'quiz', question: "Сумма векторов a + b - это:", options: ["Вектор", "Число", "Точка"], correctAnswer: "Вектор", hint: "Сумма векторов - вектор" },
      { type: 'fill', question: "Длина вектора с координатами (3; 4) = __", correctAnswer: "5", hint: "|a| = √(3² + 4²) = 5" },
      { type: 'quiz', question: "Коллинеарные векторы:", options: ["Перпендикулярны", "Лежат на параллельных прямых", "Равны"], correctAnswer: "Лежат на параллельных прямых", hint: "Коллинеарные = сонаправленные или противоположные" }
    ],
    reward: { stars: 3, message: "Отлично! Ты работаешь с векторами! 📏" }
  },
  {
    title: "Окружность и круг",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Вписанный угол равен:", options: ["Дуге", "Половине дуги", "Центральному углу"], correctAnswer: "Половине дуги", hint: "Вписанный угол = ½ дуги" },
      { type: 'quiz', question: "Центральный угол равен:", options: ["Дуге", "Половине дуги", "Вписанному углу"], correctAnswer: "Дуге", hint: "Центральный угол = дуга" },
      { type: 'fill', question: "Длина окружности C = 2πr. Если r = 5, то C = __π", correctAnswer: "10", hint: "C = 2π × 5 = 10π" },
      { type: 'quiz', question: "Угол, опирающийся на диаметр:", options: ["Острый", "Тупой", "Прямой"], correctAnswer: "Прямой", hint: "Вписанный угол на диаметр = 90°" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь окружность! ⭕" }
  },

  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Сложное предложение",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Сложносочинённое предложение связывается:", options: ["Инфинитивом", "Сочинительными союзами", "Подчинительными союзами"], correctAnswer: "Сочинительными союзами", hint: "ССП: и, а, но, или" },
      { type: 'quiz', question: "Сложноподчинённое предложение связывается:", options: ["Инфинитивом", "Сочинительными союзами", "Подчинительными союзами"], correctAnswer: "Подчинительными союзами", hint: "СПП: что, чтобы, если, когда" },
      { type: 'find', question: "Выбери подчинительные союзы:", options: ["И", "Что", "Но", "Если", "А"], correctAnswer: ["Что", "Если"], hint: "Подчинительные: что, чтобы, если, когда, потому что" },
      { type: 'quiz', question: "Бессоюзное предложение связывается:", options: ["Союзами", "Интонацией", "Предлогами"], correctAnswer: "Интонацией", hint: "БСП: части связаны по смыслу" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь сложные предложения! 📝" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Достоевский",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Ф.М. Достоевский родился в:", options: ["1819", "1821", "1825"], correctAnswer: "1821", hint: "1821 год, Москва" },
      { type: 'find', question: "Выбери произведения Достоевского:", options: ["Преступление и наказание", "Война и мир", "Идиот", "Братья Карамазовы", "Отцы и дети"], correctAnswer: ["Преступление и наказание", "Идиот", "Братья Карамазовы"], hint: "Достоевский - великий психолог" },
      { type: 'quiz', question: "Родион Раскольников - герой произведения:", options: ["Идиот", "Преступление и наказание", "Бесы"], correctAnswer: "Преступление и наказание", hint: "Раскольников - главный герой романа" },
      { type: 'quiz', question: "Теория Раскольникова о:", options: ["Любви", "Тварях дрожащих и Право имеющих", "Боге"], correctAnswer: "Тварях дрожащих и Право имеющих", hint: "Люди делятся на два типа" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Достоевского! 📚" }
  },
  {
    title: "Толстой",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Л.Н. Толстой родился в:", options: ["1828", "1820", "1835"], correctAnswer: "1828", hint: "1828 год, Ясная Поляна" },
      { type: 'find', question: "Выбери произведения Толстого:", options: ["Война и мир", "Анна Каренина", "Преступление и наказание", "Воскресение", "Отцы и дети"], correctAnswer: ["Война и мир", "Анна Каренина", "Воскресение"], hint: "Толстой - великий русский писатель" },
      { type: 'quiz', question: "«Война и мир» - это:", options: ["Роман", "Роман-эпопея", "Повесть"], correctAnswer: "Роман-эпопея", hint: "Масштабное произведение о войне 1812 года" },
      { type: 'quiz', question: "Пьер Безухов - герой:", options: ["Анны Карениной", "Войны и мира", "Воскресения"], correctAnswer: "Войны и мира", hint: "Пьер - один из главных героев" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Толстого! 📖" }
  },

  // ========== ИСТОРИЯ ==========
  {
    title: "Первая мировая война",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Когда началась Первая мировая война?", options: ["1914", "1917", "1939"], correctAnswer: "1914", hint: "28 июля 1914 года" },
      { type: 'quiz', question: "Повод к войне:", options: ["Убийство эрцгерцога Франца Фердинанда", "Нападение Германии на Польшу", "Революция в России"], correctAnswer: "Убийство эрцгерцога Франца Фердинанда", hint: "Сараевское убийство" },
      { type: 'find', question: "Выбери страны Антанты:", options: ["Россия", "Германия", "Франция", "Австро-Венгрия", "Великобритания"], correctAnswer: ["Россия", "Франция", "Великобритания"], hint: "Антанта = Россия, Франция, Англия" },
      { type: 'quiz', question: "Когда Россия вышла из войны?", options: ["1915", "1917", "1918"], correctAnswer: "1917", hint: "После Октябрьской революции" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! ⚔️" }
  },
  {
    title: "Революция 1917 года",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Когда произошла Февральская революция?", options: ["Февраль 1917", "Март 1917", "Октябрь 1917"], correctAnswer: "Февраль 1917", hint: "По старому стилю - февраль" },
      { type: 'quiz', question: "Последний российский император:", options: ["Александр III", "Николай II", "Александр II"], correctAnswer: "Николай II", hint: "Николай II отрёкся в 1917 году" },
      { type: 'find', question: "Выбери события 1917 года:", options: ["Февральская революция", "Отречение Николая II", "Кровавое воскресенье", "Октябрьская революция", "Русско-японская война"], correctAnswer: ["Февральская революция", "Отречение Николая II", "Октябрьская революция"], hint: "1917 год - год двух революций" },
      { type: 'quiz', question: "Кто возглавил Октябрьскую революцию?", options: ["Керенский", "Ленин", "Николай II"], correctAnswer: "Ленин", hint: "Большевики под руководством Ленина" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю России! 🏛️" }
  },

  // ========== ФИЗИКА ==========
  {
    title: "Оптика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Угол падения равен:", options: ["Углу отражения", "Половине угла отражения", "Двойному углу отражения"], correctAnswer: "Углу отражения", hint: "Закон отражения света" },
      { type: 'quiz', question: "При переходе света в более плотную среду:", options: ["Увеличивается скорость", "Уменьшается скорость", "Скорость не меняется"], correctAnswer: "Уменьшается скорость", hint: "Показатель преломления больше" },
      { type: 'fill', question: "Фокусное расстояние линзы F = 20 см. Оптическая сила D = __ дптр", correctAnswer: "5", hint: "D = 1/F = 1/0.2 = 5 дптр" },
      { type: 'quiz', question: "Линза, которая собирает лучи:", options: ["Рассеивающая", "Собирающая", "Плоская"], correctAnswer: "Собирающая", hint: "Выпуклая линза - собирающая" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь оптику! 💡" }
  },

  // ========== ХИМИЯ ==========
  {
    title: "Химические реакции",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Реакция соединения:", options: ["A + B → AB", "AB → A + B", "AB + C → AC + B"], correctAnswer: "A + B → AB", hint: "Из нескольких веществ - одно" },
      { type: 'quiz', question: "Реакция разложения:", options: ["A + B → AB", "AB → A + B", "AB + C → AC + B"], correctAnswer: "AB → A + B", hint: "Из одного вещества - несколько" },
      { type: 'find', question: "Выбери типы химических реакций:", options: ["Соединения", "Разложения", "Замещения", "Образования", "Разрушения"], correctAnswer: ["Соединения", "Разложения", "Замещения"], hint: "Основные типы реакций" },
      { type: 'quiz', question: "Катализатор:", options: ["Ускоряет реакцию", "Замедляет реакцию", "Не влияет на реакцию"], correctAnswer: "Ускоряет реакцию", hint: "Катализатор ускоряет, но не расходуется" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь химию! 🧪" }
  },

  // ========== БИОЛОГИЯ ==========
  {
    title: "Генетика",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Ген - это:", options: ["Клетка", "Участок ДНК", "Белок"], correctAnswer: "Участок ДНК", hint: "Ген кодирует признак" },
      { type: 'quiz', question: "Гомозигота - это:", options: ["AA", "Aa", "aa или AA"], correctAnswer: "aa или AA", hint: "Гомозигота - одинаковые аллели" },
      { type: 'find', question: "Выбери термины генетики:", options: ["Генотип", "Фенотип", "Хлорофилл", "Аллель", "Митохондрия"], correctAnswer: ["Генотип", "Фенотип", "Аллель"], hint: "Основные термины генетики" },
      { type: 'quiz', question: "При скрещивании Aa × Aa (гетерозиготы), расщепление по фенотипу:", options: ["1:1", "1:2:1", "3:1"], correctAnswer: "3:1", hint: "Второй закон Менделя" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь генетику! 🧬" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Reported Speech",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Прямая: «I am happy» → Косвенная:", options: ["He said he is happy", "He said he was happy", "He said he will be happy"], correctAnswer: "He said he was happy", hint: "Present → Past при согласовании" },
      { type: 'quiz', question: "«I will come» → He said:", options: ["he will come", "he would come", "he came"], correctAnswer: "he would come", hint: "Future → Future in the Past" },
      { type: 'fill', question: "«I saw him» → She said she __ seen him. (had/has)", correctAnswer: "had", hint: "Past → Past Perfect" },
      { type: 'quiz', question: "«Don't go!» → She told me:", options: ["don't go", "not to go", "to not go"], correctAnswer: "not to go", hint: "Повелительное → инфинитив с not" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь косвенную речь! 🇬🇧" }
  },

  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Степени сравнения прилагательных",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "good - better - ___", options: ["goodest", "best", "more good"], correctAnswer: "best", hint: "good - better - best (исключение)" },
      { type: 'fill', question: "bad - worse - __", correctAnswer: "worst", hint: "bad - worse - worst" },
      { type: 'quiz', question: "important - more important - ___", options: ["most important", "importanter", "more important"], correctAnswer: "most important", hint: "Длинные слова: more/most" },
      { type: 'find', question: "Выбери правильные формы:", options: ["tall-taller-tallest", "bad-worse-worst", "good-gooder-goodest", "far-farther-farthest"], correctAnswer: ["tall-taller-tallest", "bad-worse-worst", "far-farther-farthest"], hint: "Исключения: good, bad, far" }
    ],
    reward: { stars: 3, message: "Excellent! Степени сравнения! 📈" }
  },
  {
    title: "Корни и степени",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "√81 = __", correctAnswer: "9", hint: "9 × 9 = 81" },
      { type: 'fill', question: "³√27 = __", correctAnswer: "3", hint: "3 × 3 × 3 = 27" },
      { type: 'quiz', question: "2³ = ?", options: ["6", "8", "9"], correctAnswer: "8", hint: "2 × 2 × 2 = 8" },
      { type: 'quiz', question: "5⁰ = ?", options: ["0", "1", "5"], correctAnswer: "1", hint: "Любое число в нулевой степени = 1" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь корни и степени! 🔢" }
  },
  {
    title: "Системы уравнений",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько решений может иметь система линейных уравнений?", options: ["Только одно", "0, 1 или бесконечно много", "Только два"], correctAnswer: "0, 1 или бесконечно много", hint: "Система может иметь 0, 1 или ∞ решений" },
      { type: 'fill', question: "x + y = 5, x - y = 1. Сложив, получим: 2x = __", correctAnswer: "6", hint: "y исчезает, 2x = 6" },
      { type: 'quiz', question: "Метод подстановки:", options: ["Сложить уравнения", "Выразить одну переменную через другую", "Умножить уравнения"], correctAnswer: "Выразить одну переменную через другую", hint: "Подстановка в другое уравнение" },
      { type: 'fill', question: "Если x + y = 5 и x = 2, то y = __", correctAnswer: "3", hint: "2 + y = 5, y = 3" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь системы! 📐" }
  },
  {
    title: "Свойства функций",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Область определения - это:", options: ["Все значения y", "Все допустимые значения x", "График функции"], correctAnswer: "Все допустимые значения x", hint: "D(f) - допустимые x" },
      { type: 'quiz', question: "Функция возрастает, если:", options: ["y уменьшается", "y увеличивается при росте x", "y постоянна"], correctAnswer: "y увеличивается при росте x", hint: "Возрастание = рост" },
      { type: 'find', question: "Выбери чётные функции:", options: ["y = x²", "y = x³", "y = |x|", "y = √x", "y = cos x"], correctAnswer: ["y = x²", "y = |x|", "y = cos x"], hint: "f(-x) = f(x) для чётных" },
      { type: 'quiz', question: "Нули функции - это:", options: ["Максимумы", "Точки пересечения с осью x", "Минимумы"], correctAnswer: "Точки пересечения с осью x", hint: "f(x) = 0" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь функции! 📊" }
  },
  {
    title: "Подобие треугольников",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Подобные треугольники имеют:", options: ["Равные стороны", "Равные углы и пропорциональные стороны", "Равные площади"], correctAnswer: "Равные углы и пропорциональные стороны", hint: "Подобие = одинаковость формы" },
      { type: 'quiz', question: "Первый признак подобия:", options: ["По трём сторонам", "По двум углам", "По стороне и углу"], correctAnswer: "По двум углам", hint: "Два угла одного = два угла другого" },
      { type: 'fill', question: "Если коэффициент подобия k = 3, то площадь больше в __ раз", correctAnswer: "9", hint: "Площади относятся как k²" },
      { type: 'quiz', question: "Отношение периметров подобных треугольников:", options: ["k²", "k", "k³"], correctAnswer: "k", hint: "Периметры относятся как k" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь подобие! 📐" }
  },
  {
    title: "Окружность",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Вписанный угол равен:", options: ["Дуге", "Половине дуги", "Центральному углу"], correctAnswer: "Половине дуги", hint: "Вписанный = ½ центрального" },
      { type: 'quiz', question: "Угол, опирающийся на диаметр:", options: ["Острый", "Тупой", "Прямой"], correctAnswer: "Прямой", hint: "Всегда 90°" },
      { type: 'fill', question: "Длина окружности C = 2πr. Если r = 7, то C = __π", correctAnswer: "14", hint: "C = 2π × 7 = 14π" },
      { type: 'find', question: "Выбери элементы окружности:", options: ["Радиус", "Диаметр", "Хорда", "Высота", "Дуга"], correctAnswer: ["Радиус", "Диаметр", "Хорда", "Дуга"], hint: "Элементы окружности" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь окружность! ⭕" }
  },
  {
    title: "Синтаксис сложного предложения",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Сложносочинённое предложение связывается:", options: ["Подчинительными союзами", "Сочинительными союзами", "Интонацией"], correctAnswer: "Сочинительными союзами", hint: "И, а, но, или" },
      { type: 'find', question: "Выбери сочинительные союзы:", options: ["И", "Что", "А", "Если", "Но"], correctAnswer: ["И", "А", "Но"], hint: "Сочинительные: и, а, но, или" },
      { type: 'quiz', question: "Сложноподчинённое предложение имеет:", options: ["Равные части", "Главное и придаточное", "Только главное"], correctAnswer: "Главное и придаточное", hint: "Подчинение частей" },
      { type: 'fill', question: "Бессоюзное предложение связывается __", correctAnswer: "интонацией", hint: "Без союзов" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь синтаксис! 📝" }
  },
  {
    title: "Русская литература XIX века",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "«Герой нашего времени» - автор:", options: ["Пушкин", "Лермонтов", "Гоголь"], correctAnswer: "Лермонтов", hint: "Михаил Юрьевич Лермонтов" },
      { type: 'find', question: "Выбери произведения Пушкина:", options: ["Евгений Онегин", "Мцыри", "Капитанская дочка", "Ревизор", "Руслан и Людмила"], correctAnswer: ["Евгений Онегин", "Капитанская дочка", "Руслан и Людмила"], hint: "А.С. Пушкин" },
      { type: 'quiz', question: "«Мёртвые души» - автор:", options: ["Пушкин", "Гоголь", "Тургенев"], correctAnswer: "Гоголь", hint: "Н.В. Гоголь" },
      { type: 'fill', question: "«Отцы и __» - роман Тургенева", correctAnswer: "дети", hint: "И.С. Тургенев" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь литературу! 📚" }
  },
  {
    title: "Гражданская война",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Гражданская война в России:", options: ["1914-1918", "1917-1922", "1920-1925"], correctAnswer: "1917-1922", hint: "После революции 1917 года" },
      { type: 'find', question: "Выбери стороны Гражданской войны:", options: ["Красные", "Синие", "Белые", "Зелёные", "Коричневые"], correctAnswer: ["Красные", "Белые", "Зелёные"], hint: "Основные силы" },
      { type: 'quiz', question: "Кто возглавлял Красную армию?", options: ["Колчак", "Троцкий", "Деникин"], correctAnswer: "Троцкий", hint: "Л.Д. Троцкий" },
      { type: 'quiz', question: "Комуч - это:", options: ["Комитет учительства", "Комитет членов Учредительного собрания", "Коммунальный комитет"], correctAnswer: "Комитет членов Учредительного собрания", hint: "Самара, 1918" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! ⚔️" }
  },
  {
    title: "СССР в 1920-30-е годы",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "НЭП - это:", options: ["Национализация", "Новая экономическая политика", "Народное образование"], correctAnswer: "Новая экономическая политика", hint: "1921-1928 годы" },
      { type: 'quiz', question: "Коллективизация - это:", options: ["Создание колхозов", "Индустриализация", "Национализация"], correctAnswer: "Создание колхозов", hint: "Объединение крестьянских хозяйств" },
      { type: 'find', question: "Выбери итоги индустриализации:", options: ["Строительство заводов", "Раскулачивание", "Электрификация", "Коллективизация", "Новые города"], correctAnswer: ["Строительство заводов", "Электрификация", "Новые города"], hint: "Результаты индустриализации" },
      { type: 'fill', question: "«Год великого перелома» - __ год", correctAnswer: "1929", hint: "Начало форсированной индустриализации" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю СССР! 🏛️" }
  },
  {
    title: "Кислоты и основания",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Формула серной кислоты:", options: ["HCl", "H₂SO₄", "HNO₃"], correctAnswer: "H₂SO₄", hint: "Серная кислота" },
      { type: 'quiz', question: "pH нейтральной среды:", options: ["0", "7", "14"], correctAnswer: "7", hint: "Нейтральная среда = pH 7" },
      { type: 'find', question: "Выбери кислоты:", options: ["HCl", "NaOH", "H₂SO₄", "KOH", "HNO₃"], correctAnswer: ["HCl", "H₂SO₄", "HNO₃"], hint: "Кислоты содержат H⁺" },
      { type: 'fill', question: "Кислота + основание = __ + вода", correctAnswer: "соль", hint: "Реакция нейтрализации" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь химию! 🧪" }
  },
  {
    title: "Законы Менделя",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Первый закон Менделя:", options: ["Расщепление", "Единообразие гибридов", "Независимое наследование"], correctAnswer: "Единообразие гибридов", hint: "AA × aa → Aa (все одинаковые)" },
      { type: 'quiz', question: "При скрещивании Aa × Aa расщепление по фенотипу:", options: ["1:1", "1:2:1", "3:1"], correctAnswer: "3:1", hint: "Второй закон Менделя" },
      { type: 'find', question: "Выбери термины генетики:", options: ["Ген", "Атом", "Аллель", "Молекула", "Генотип"], correctAnswer: ["Ген", "Аллель", "Генотип"], hint: "Основные термины" },
      { type: 'fill', question: "Гетерозигота - это __", correctAnswer: "Aa", hint: "Разные аллели" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь генетику! 🧬" }
  }
]
