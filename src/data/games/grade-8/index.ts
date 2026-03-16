// Экспорт игр для 8 класса
import { GameLesson } from '../types'

export const eighthGradeGames: GameLesson[] = [
  // ========== АЛГЕБРА ==========
  {
    title: "Квадратные уравнения",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Дискриминант уравнения ax² + bx + c = 0 равен:", options: ["D = b² - 4ac", "D = b² + 4ac", "D = 4ac - b²"], correctAnswer: "D = b² - 4ac", hint: "Формула дискриминанта" },
      { type: 'fill', question: "x² - 4x + 3 = 0. D = __", correctAnswer: "4", hint: "D = 16 - 12 = 4" },
      { type: 'quiz', question: "Если D > 0, то уравнение имеет:", options: ["1 корень", "2 корня", "Нет корней"], correctAnswer: "2 корня", hint: "При D > 0 - два различных корня" },
      { type: 'fill', question: "x² = 9, x = __ (или -3)", correctAnswer: "3", hint: "x = ±√9 = ±3" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь квадратные уравнения! 📐" }
  },
  {
    title: "Квадратный корень",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "√16 = __", correctAnswer: "4", hint: "4 × 4 = 16" },
      { type: 'quiz', question: "√(a × b) = ?", options: ["√a × √b", "√a + √b", "√a - √b"], correctAnswer: "√a × √b", hint: "Корень из произведения = произведение корней" },
      { type: 'quiz', question: "Какое число не имеет действительного корня?", options: ["16", "0", "-4"], correctAnswer: "-4", hint: "Отрицательные числа не имеют действительных корней" },
      { type: 'fill', question: "√25 + √9 = __", correctAnswer: "8", hint: "5 + 3 = 8" }
    ],
    reward: { stars: 3, message: "Супер! Ты работаешь с корнями! 🔢" }
  },
  {
    title: "Рациональные выражения",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Допустимые значения - это:", options: ["Все числа", "Числа, при которых знаменатель ≠ 0", "Положительные числа"], correctAnswer: "Числа, при которых знаменатель ≠ 0", hint: "На 0 делить нельзя!" },
      { type: 'quiz', question: "a/b × c/d = ?", options: ["(a+c)/(b+d)", "(ac)/(bd)", "(ad)/(bc)"], correctAnswer: "(ac)/(bd)", hint: "Умножение дробей: числитель на числитель, знаменатель на знаменатель" },
      { type: 'fill', question: "x/2 + x/3 = __/6 (общий знаменатель)", correctAnswer: "5x", hint: "3x/6 + 2x/6 = 5x/6" },
      { type: 'quiz', question: "Сократить дробь: 6/8 =", options: ["3/4", "2/3", "4/5"], correctAnswer: "3/4", hint: "6/8 = (6÷2)/(8÷2) = 3/4" }
    ],
    reward: { stars: 3, message: "Отлично! Ты умеешь работать с дробями! 🧮" }
  },

  // ========== ГЕОМЕТРИЯ ==========
  {
    title: "Четырёхугольники",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Сумма углов четырёхугольника равна:", options: ["180°", "270°", "360°"], correctAnswer: "360°", hint: "n-угольник: (n-2) × 180°" },
      { type: 'find', question: "Выбери свойства параллелограмма:", options: ["Противоположные стороны равны", "Все углы равны", "Диагонали точкой пересечения делятся пополам", "Все стороны равны"], correctAnswer: ["Противоположные стороны равны", "Диагонали точкой пересечения делятся пополам"], hint: "Параллелограмм имеет особые свойства" },
      { type: 'quiz', question: "В прямоугольнике диагонали:", options: ["Не равны", "Равны", "Перпендикулярны"], correctAnswer: "Равны", hint: "Диагонали прямоугольника равны" },
      { type: 'quiz', question: "Ромб - это параллелограмм, у которого:", options: ["Все углы равны", "Все стороны равны", "Диагонали равны"], correctAnswer: "Все стороны равны", hint: "Ромб = равные стороны" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь четырёхугольники! ⬜" }
  },
  {
    title: "Площади фигур",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Площадь прямоугольника:", options: ["S = a + b", "S = a × b", "S = 2(a + b)"], correctAnswer: "S = a × b", hint: "Площадь = длина × ширина" },
      { type: 'fill', question: "Площадь треугольника: S = (a × h) / 2. Если a = 6, h = 4, то S = __", correctAnswer: "12", hint: "S = (6 × 4) / 2 = 12" },
      { type: 'quiz', question: "Площадь круга:", options: ["S = πr", "S = 2πr", "S = πr²"], correctAnswer: "S = πr²", hint: "Площадь круга = π × радиус²" },
      { type: 'quiz', question: "Площадь трапеции:", options: ["S = (a+b) × h", "S = (a+b) × h / 2", "S = a × b × h"], correctAnswer: "S = (a+b) × h / 2", hint: "Полусумма оснований × высота" }
    ],
    reward: { stars: 3, message: "Супер! Ты умеешь находить площади! 📏" }
  },

  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Наречие",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Наречие отвечает на вопросы:", options: ["Кто? Что?", "Какой? Чей?", "Как? Где? Когда?"], correctAnswer: "Как? Где? Когда?", hint: "Наречие - обстоятельственное слово" },
      { type: 'find', question: "Выбери наречия:", options: ["Быстро", "Быстрый", "Вчера", "Завтрашний", "Здесь"], correctAnswer: ["Быстро", "Вчера", "Здесь"], hint: "Наречия не изменяются" },
      { type: 'quiz', question: "Наречие - это:", options: ["Изменяемая часть речи", "Неизменяемая часть речи", "Служебная часть речи"], correctAnswer: "Неизменяемая часть речи", hint: "Наречия не имеют окончаний" },
      { type: 'quiz', question: "Как пишется «на_всегда»?", options: ["Навсегда", "На всегда", "На-всегда"], correctAnswer: "Навсегда", hint: "Наречия пишутся слитно" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь наречия! 📝" }
  },
  {
    title: "Предлоги и союзы",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Предлог - это:", options: ["Самостоятельная часть речи", "Служебная часть речи", "Частица"], correctAnswer: "Служебная часть речи", hint: "Предлоги, союзы, частицы - служебные" },
      { type: 'find', question: "Выбери предлоги:", options: ["В", "И", "На", "Но", "К"], correctAnswer: ["В", "На", "К"], hint: "Предлоги выражают отношения" },
      { type: 'quiz', question: "Сочинительные союзы связывают:", options: ["Главное и придаточное", "Однородные члены", "Подлежащее и сказуемое"], correctAnswer: "Однородные члены", hint: "И, а, но, или - сочинительные" },
      { type: 'quiz', question: "Какой союз подчинительный?", options: ["И", "Но", "Что"], correctAnswer: "Что", hint: "Подчинительные: что, чтобы, если, когда" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь служебные части речи! ✍️" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Лермонтов",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "М.Ю. Лермонтов родился в:", options: ["1814", "1799", "1820"], correctAnswer: "1814", hint: "1814 год, Москва" },
      { type: 'find', question: "Выбери произведения Лермонтова:", options: ["Мцыри", "Евгений Онегин", "Герой нашего времени", "Маскарад", "Ревизор"], correctAnswer: ["Мцыри", "Герой нашего времени", "Маскарад"], hint: "Лермонтов - великий русский поэт и писатель" },
      { type: 'quiz', question: "«Мцыри» - это:", options: ["Роман", "Поэма", "Рассказ"], correctAnswer: "Поэма", hint: "Поэма о юном монахе" },
      { type: 'quiz', question: "Печорин - герой произведения:", options: ["Мцыри", "Герой нашего времени", "Демон"], correctAnswer: "Герой нашего времени", hint: "Печорин - «лишний человек»" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Лермонтова! 📖" }
  },
  {
    title: "Гоголь",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Н.В. Гоголь родился в:", options: ["1809", "1812", "1820"], correctAnswer: "1809", hint: "1809 год, Украина" },
      { type: 'find', question: "Выбери произведения Гоголя:", options: ["Ревизор", "Мёртвые души", "Вишнёвый сад", "Тарас Бульба", "Преступление и наказание"], correctAnswer: ["Ревизор", "Мёртвые души", "Тарас Бульба"], hint: "Гоголь - мастер сатиры" },
      { type: 'quiz', question: "«Ревизор» - это:", options: ["Роман", "Комедия", "Поэма"], correctAnswer: "Комедия", hint: "Комедия о чиновниках" },
      { type: 'quiz', question: "Чичиков - герой произведения:", options: ["Ревизор", "Мёртвые души", "Тарас Бульба"], correctAnswer: "Мёртвые души", hint: "Чичиков скупал «мёртвые души»" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Гоголя! 📚" }
  },

  // ========== ИСТОРИЯ ==========
  {
    title: "Смутное время",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Когда началось Смутное время?", options: ["1584", "1598", "1605"], correctAnswer: "1598", hint: "После смерти Фёдора Ивановича" },
      { type: 'quiz', question: "Кто был первым царём из династии Романовых?", options: ["Алексей Михайлович", "Михаил Фёдорович", "Пётр I"], correctAnswer: "Михаил Фёдорович", hint: "1613 год - избрание Михаила Романова" },
      { type: 'find', question: "Выбери события Смутного времени:", options: ["Голод", "Лжедмитрий I", "Крещение Руси", "Осада Смоленска", "Ополчение Минина и Пожарского"], correctAnswer: ["Голод", "Лжедмитрий I", "Осада Смоленска", "Ополчение Минина и Пожарского"], hint: "Смутное время - период кризиса" },
      { type: 'quiz', question: "Когда был созван первый Земский собор?", options: ["1549", "1598", "1613"], correctAnswer: "1549", hint: "При Иване IV Грозном" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! 🏰" }
  },

  // ========== ФИЗИКА ==========
  {
    title: "Тепловые явления",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Температура плавления льда:", options: ["0°C", "100°C", "-273°C"], correctAnswer: "0°C", hint: "При 0°C лёд превращается в воду" },
      { type: 'quiz', question: "При плавлении температура:", options: ["Повышается", "Не меняется", "Понижается"], correctAnswer: "Не меняется", hint: "Энергия идёт на разрушение решётки" },
      { type: 'find', question: "Выбери агрегатные состояния:", options: ["Твёрдое", "Жидкое", "Газообразное", "Плазменное", "Жидковидное"], correctAnswer: ["Твёрдое", "Жидкое", "Газообразное", "Плазменное"], hint: "Основные агрегатные состояния вещества" },
      { type: 'fill', question: "Q = cm(t₂-t₁). Если c = 4200 Дж/(кг·°C), m = 2 кг, Δt = 10°C, то Q = __ Дж", correctAnswer: "84000", hint: "Q = 4200 × 2 × 10 = 84000" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь тепловые явления! ⚛️" }
  },
  {
    title: "Электричество",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Закон Ома для участка цепи:", options: ["I = U/R", "I = R/U", "U = I/R"], correctAnswer: "I = U/R", hint: "Сила тока = напряжение / сопротивление" },
      { type: 'fill', question: "Если U = 12 В, R = 4 Ом, то I = __ А", correctAnswer: "3", hint: "I = 12/4 = 3" },
      { type: 'quiz', question: "Единица измерения сопротивления:", options: ["Вольт", "Ампер", "Ом"], correctAnswer: "Ом", hint: "Сопротивление измеряется в Омах" },
      { type: 'quiz', question: "При последовательном соединении:", options: ["Токи равны", "Напряжения равны", "Сопротивления равны"], correctAnswer: "Токи равны", hint: "При последовательном I₁ = I₂" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь электричество! ⚡" }
  },

  // ========== ХИМИЯ ==========
  {
    title: "Основы химии",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Химический элемент - это:", options: ["Вещество", "Вид атомов", "Молекула"], correctAnswer: "Вид атомов", hint: "Атомы с одинаковым зарядом ядра" },
      { type: 'find', question: "Выбери металлы:", options: ["Железо", "Кислород", "Медь", "Азот", "Золото"], correctAnswer: ["Железо", "Медь", "Золото"], hint: "Металлы - это элементы с особыми свойствами" },
      { type: 'quiz', question: "Формула воды:", options: ["H₂O", "HO₂", "H₂O₂"], correctAnswer: "H₂O", hint: "Вода = два водорода + один кислород" },
      { type: 'fill', question: "Относительная молекулярная масса H₂O = __", correctAnswer: "18", hint: "1×2 + 16 = 18" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь основы химии! 🧪" }
  },

  // ========== БИОЛОГИЯ ==========
  {
    title: "Организм человека",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какой орган является «насосом» организма?", options: ["Лёгкие", "Сердце", "Печень"], correctAnswer: "Сердце", hint: "Сердце перекачивает кровь" },
      { type: 'find', question: "Выбери органы кровообращения:", options: ["Сердце", "Лёгкие", "Артерии", "Вены", "Желудок"], correctAnswer: ["Сердце", "Артерии", "Вены"], hint: "Система кровообращения" },
      { type: 'quiz', question: "Где происходит газообмен?", options: ["В сердце", "В лёгких", "В печени"], correctAnswer: "В лёгких", hint: "В альвеолах лёгких" },
      { type: 'quiz', question: "Какой орган фильтрует кровь?", options: ["Сердце", "Почки", "Желудок"], correctAnswer: "Почки", hint: "Почки очищают кровь от вредных веществ" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь анатомию! 🫀" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Passive Voice",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "The book ___ (write) by Pushkin.", options: ["wrote", "was written", "written"], correctAnswer: "was written", hint: "Passive: be + V3" },
      { type: 'quiz', question: "English ___ (speak) worldwide.", options: ["speaks", "is spoken", "spoke"], correctAnswer: "is spoken", hint: "Present Simple Passive: am/is/are + V3" },
      { type: 'find', question: "Выбери признаки пассивного залога:", options: ["be + V3", "have + V3", "is done", "was written", "will do"], correctAnswer: ["be + V3", "is done", "was written"], hint: "Пассив = быть + причастие" },
      { type: 'fill', question: "The house ___ built in 1990. (was/is)", correctAnswer: "was", hint: "Past Simple Passive" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь пассивный залог! 🇬🇧" }
  },

  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Теорема Пифагора",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Теорема Пифагора:", options: ["a² + b² = c²", "a + b = c", "a² - b² = c²"], correctAnswer: "a² + b² = c²", hint: "Сумма квадратов катетов = квадрат гипотенузы" },
      { type: 'fill', question: "Если катеты 3 и 4, то гипотенуза = __", correctAnswer: "5", hint: "√(9 + 16) = √25 = 5" },
      { type: 'fill', question: "Если гипотенуза 13, катет 5, то второй катет = __", correctAnswer: "12", hint: "c² - a² = b², 169 - 25 = 144, √144 = 12" },
      { type: 'quiz', question: "В каком треугольнике работает теорема Пифагора?", options: ["Остроугольном", "Прямоугольном", "Тупоугольном"], correctAnswer: "Прямоугольном", hint: "Только для прямоугольного треугольника" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь теорему Пифагора! 📐" }
  },
  {
    title: "Подобные треугольники",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Подобные треугольники имеют:", options: ["Равные стороны", "Равные углы и пропорциональные стороны", "Равные периметры"], correctAnswer: "Равные углы и пропорциональные стороны", hint: "Подобие = одинаковость формы" },
      { type: 'quiz', question: "Коэффициент подобия равен:", options: ["Отношению периметров", "Отношению сторон", "Обоим"], correctAnswer: "Обоим", hint: "k = отношение соответствующих сторон" },
      { type: 'fill', question: "Если k = 2, то площадь больше в __ раз", correctAnswer: "4", hint: "Площади относятся как k²" },
      { type: 'find', question: "Выбери признаки подобия:", options: ["По двум углам", "По трём сторонам", "По двум сторонам и углу", "По трём углам"], correctAnswer: ["По двум углам", "По двум сторонам и углу"], hint: "Три признака подобия треугольников" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь подобие! 📏" }
  },
  {
    title: "Системы уравнений",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Метод подстановки:", options: ["Выразить одну переменную через другую", "Сложить уравнения", "Умножить уравнения"], correctAnswer: "Выразить одну переменную через другую", hint: "Подстановка одного уравнения в другое" },
      { type: 'fill', question: "x + y = 5, x - y = 1. x = __", correctAnswer: "3", hint: "Метод сложения: 2x = 6, x = 3" },
      { type: 'fill', question: "Если x = 3 и x + y = 5, то y = __", correctAnswer: "2", hint: "3 + y = 5, y = 2" },
      { type: 'quiz', question: "Сколько решений имеет система двух линейных уравнений?", options: ["Одно", "Ни одного", "Зависит от уравнений"], correctAnswer: "Зависит от уравнений", hint: "Может быть 0, 1 или бесконечно много" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь системы уравнений! 🔢" }
  },
  {
    title: "Функции и графики",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Линейная функция имеет вид:", options: ["y = ax² + bx + c", "y = kx + b", "y = a/x"], correctAnswer: "y = kx + b", hint: "Линейная функция - прямая линия" },
      { type: 'fill', question: "График y = 2x + 1 пересекает ось Y в точке (0; __)", correctAnswer: "1", hint: "При x = 0, y = b = 1" },
      { type: 'quiz', question: "Парабола - это график:", options: ["Линейной функции", "Квадратичной функции", "Обратной пропорциональности"], correctAnswer: "Квадратичной функции", hint: "y = ax² + bx + c - парабола" },
      { type: 'quiz', question: "Если k < 0 в y = kx + b, то прямая:", options: ["Возрастает", "Убывает", "Горизонтальная"], correctAnswer: "Убывает", hint: "Отрицательный угловой коэффициент" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь функции! 📊" }
  },
  {
    title: "Причастный оборот",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Причастный оборот - это:", options: ["Причастие + зависимые слова", "Два причастия", "Причастие + существительное"], correctAnswer: "Причастие + зависимые слова", hint: "Причастие с зависимыми словами" },
      { type: 'quiz', question: "Причастный оборот выделяется:", options: ["Всегда запятыми", "После определяемого слова", "Перед определяемым словом"], correctAnswer: "После определяемого слова", hint: "Если стоит после определяемого слова" },
      { type: 'find', question: "Выбери причастные обороты:", options: ["Читающий книгу", "Красивая книга", "Написанное письмо", "Прочитав книгу", "Интересная история"], correctAnswer: ["Читающий книгу", "Написанное письмо"], hint: "Причастие + зависимые слова" },
      { type: 'quiz', question: "В предложении «Книга, прочитанная мною, интересная» причастный оборот:", options: ["Выделяется запятыми", "Не выделяется", "Выделяется тире"], correctAnswer: "Выделяется запятыми", hint: "Стоит после определяемого слова" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь причастный оборот! ✍️" }
  },
  {
    title: "Орфография: Н и НН",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "В прилагательном «кожа__ый» пишется:", options: ["Н", "НН"], correctAnswer: "Н", hint: "-ан-, -ян-, -ин- пишется Н" },
      { type: 'quiz', question: "В слове «серебря__ый» пишется:", options: ["Н", "НН"], correctAnswer: "Н", hint: "-ян- пишется Н" },
      { type: 'fill', question: "В слове «стекля__ый» пишется __", correctAnswer: "НН", hint: "Исключение: стеклянный, оловянный, деревянный" },
      { type: 'find', question: "Выбери слова с НН:", options: ["Сонный", "Серебряный", "Лимонный", "Кожаный", "Традиционный"], correctAnswer: ["Сонный", "Лимонный", "Традиционный"], hint: "НН пишется в производных от основ на -н-" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь правописание Н и НН! 📝" }
  },
  {
    title: "Правление Ивана Грозного",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Иван IV был прозван «Грозным» за:", options: ["Мудрость", "Жестокость и суровость", "Доброту"], correctAnswer: "Жестокость и суровость", hint: "Опричнина и казни" },
      { type: 'quiz', question: "Когда Иван IV принял титул царя?", options: ["1547", "1550", "1560"], correctAnswer: "1547", hint: "Первый русский царь" },
      { type: 'find', question: "Выбери реформы Ивана IV:", options: ["Судебник 1550", "Опричнина", "Отмена крепостного права", "Создание стрелецкого войска", "Земский собор"], correctAnswer: ["Судебник 1550", "Опричнина", "Создание стрелецкого войска", "Земский собор"], hint: "Реформы царя" },
      { type: 'quiz', question: "Опричнина - это:", options: ["Налог", "Территория и войско в личном подчинении царя", "Закон"], correctAnswer: "Территория и войско в личном подчинении царя", hint: "1565-1572 годы" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! 🏰" }
  },
  {
    title: "Законы физики: механика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Первый закон Ньютона:", options: ["F = ma", "Тело сохраняет состояние покоя", "Действие = противодействие"], correctAnswer: "Тело сохраняет состояние покоя", hint: "Закон инерции" },
      { type: 'quiz', question: "Третий закон Ньютона:", options: ["F = ma", "Тело сохраняет состояние покоя", "Действие = противодействие"], correctAnswer: "Действие = противодействие", hint: "Силы действуют парами" },
      { type: 'fill', question: "Кинетическая энергия: E = mv²/__", correctAnswer: "2", hint: "E = mv²/2" },
      { type: 'fill', question: "Потенциальная энергия: E = mgh. Если m=2, g=10, h=5, то E = __", correctAnswer: "100", hint: "E = 2 × 10 × 5 = 100" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь механику! ⚛️" }
  },
  {
    title: "Химические реакции",
    subject: "Химия",
    icon: "FlaskConical",
    color: "text-emerald-400",
    tasks: [
      { type: 'quiz', question: "Реакция соединения:", options: ["A + B = AB", "AB = A + B", "AB + C = AC + B"], correctAnswer: "A + B = AB", hint: "Из двух веществ - одно" },
      { type: 'quiz', question: "Реакция разложения:", options: ["A + B = AB", "AB = A + B", "AB + C = AC + B"], correctAnswer: "AB = A + B", hint: "Из одного вещества - несколько" },
      { type: 'find', question: "Выбери типы химических реакций:", options: ["Соединения", "Разложения", "Замещения", "Сложения", "Обмена"], correctAnswer: ["Соединения", "Разложения", "Замещения", "Обмена"], hint: "Четыре типа реакций" },
      { type: 'quiz', question: "Катализатор:", options: ["Ускоряет реакцию", "Замедляет реакцию", "Не влияет"], correctAnswer: "Ускоряет реакцию", hint: "Катализатор ускоряет, но не расходуется" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь типы реакций! 🧪" }
  },

  // ========== НОВЫЕ ИГРЫ v3.42 ==========
  {
    title: "Неравенства",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Если обе части неравенства умножить на отрицательное число, то знак:", options: ["Не меняется", "Меняется на противоположный", "Становится равенством"], correctAnswer: "Меняется на противоположный", hint: "При умножении на отрицательное - знак меняется!" },
      { type: 'fill', question: "2x > 6, x > __", correctAnswer: "3", hint: "x > 6 ÷ 2 = 3" },
      { type: 'fill', question: "-3x < 9, x > __", correctAnswer: "-3", hint: "Делим на -3, знак меняется: x > -3" },
      { type: 'quiz', question: "Решение неравенства 2x - 4 > 0:", options: ["x > 2", "x < 2", "x > -2"], correctAnswer: "x > 2", hint: "2x > 4, x > 2" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь неравенства! 📊" }
  },
  {
    title: "Окружность и круг",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Отрезок, соединяющий центр с точкой окружности:", options: ["Хорда", "Радиус", "Диаметр"], correctAnswer: "Радиус", hint: "Радиус = R" },
      { type: 'quiz', question: "Диаметр равен:", options: ["R", "2R", "R/2"], correctAnswer: "2R", hint: "D = 2R" },
      { type: 'fill', question: "Длина окружности C = 2πR. Если R = 3, то C = __π", correctAnswer: "6", hint: "C = 2π × 3 = 6π" },
      { type: 'quiz', question: "Хорда, проходящая через центр - это:", options: ["Радиус", "Диаметр", "Касательная"], correctAnswer: "Диаметр", hint: "Самая длинная хорда" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь окружность! ⭕" }
  },
  {
    title: "Деепричастный оборот",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Деепричастный оборот - это:", options: ["Деепричастие + существительное", "Деепричастие + зависимые слова", "Два деепричастия"], correctAnswer: "Деепричастие + зависимые слова", hint: "Деепричастие с зависимыми словами" },
      { type: 'quiz', question: "Деепричастный оборот на письме:", options: ["Не выделяется", "Выделяется запятыми", "Выделяется тире"], correctAnswer: "Выделяется запятыми", hint: "Всегда выделяется запятыми" },
      { type: 'find', question: "Выбери деепричастные обороты:", options: ["Читая книгу", "Прочитав письмо", "Интересная книга", "Глядя на небо", "Красивый вид"], correctAnswer: ["Читая книгу", "Прочитав письмо", "Глядя на небо"], hint: "Деепричастие + зависимые слова" },
      { type: 'quiz', question: "Деепричастие обозначает:", options: ["Признак предмета", "Добавочное действие", "Главное действие"], correctAnswer: "Добавочное действие", hint: "Что делая? Что сделав?" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь деепричастный оборот! ✍️" }
  },
  {
    title: "И.С. Тургенев",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Кто написал «Отцы и дети»?", options: ["Толстой", "Тургенев", "Достоевский"], correctAnswer: "Тургенев", hint: "Иван Сергеевич Тургенев" },
      { type: 'find', question: "Выбери произведения Тургенева:", options: ["Отцы и дети", "Муму", "Ася", "Война и мир", "Записки охотника"], correctAnswer: ["Отцы и дети", "Муму", "Ася", "Записки охотника"], hint: "Тургенев - мастер описания природы" },
      { type: 'quiz', question: "Базаров - это:", options: ["Дворянин", "Нигилист", "Офицер"], correctAnswer: "Нигилист", hint: "Евгений Базаров - нигилист" },
      { type: 'quiz', question: "«Муму» - это:", options: ["Роман", "Рассказ", "Поэма"], correctAnswer: "Рассказ", hint: "Рассказ о немом дворнике" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Тургенева! 📖" }
  },
  {
    title: "Пётр I",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Пётр I правил в:", options: ["XVI веке", "XVII веке", "XVIII веке"], correctAnswer: "XVIII веке", hint: "1682-1725 годы" },
      { type: 'find', question: "Выбери реформы Петра I:", options: ["Создание флота", "Отмена крепостного права", "Европеизация", "Введение Табели о рангах", "Основание Санкт-Петербурга"], correctAnswer: ["Создание флота", "Европеизация", "Введение Табели о рангах", "Основание Санкт-Петербурга"], hint: "Пётр I преобразил Россию" },
      { type: 'quiz', question: "Санкт-Петербург основан в:", options: ["1700", "1703", "1710"], correctAnswer: "1703", hint: "27 мая 1703 года" },
      { type: 'quiz', question: "Северная война закончилась в:", options: ["1710", "1721", "1725"], correctAnswer: "1721", hint: "Ништадтский мир 1721 года" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Петра I! 🏰" }
  },
  {
    title: "Оптика",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Угол падения равен:", options: ["Углу преломления", "Углу отражения", "90°"], correctAnswer: "Углу отражения", hint: "Закон отражения" },
      { type: 'quiz', question: "Преломление света происходит при:", options: ["Отражении", "Переходе из одной среды в другую", "Поглощении"], correctAnswer: "Переходе из одной среды в другую", hint: "Изменение направления луча" },
      { type: 'find', question: "Выбери оптические явления:", options: ["Отражение", "Преломление", "Дифракция", "Трение", "Интерференция"], correctAnswer: ["Отражение", "Преломление", "Дифракция", "Интерференция"], hint: "Оптика изучает свет" },
      { type: 'quiz', question: "Линза, собирающая лучи:", options: ["Рассеивающая", "Собирающая", "Плоская"], correctAnswer: "Собирающая", hint: "Выпуклая линза" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь оптику! 🔍" }
  },
  {
    title: "Деление клетки",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Митоз - это:", options: ["Образование половых клеток", "Деление соматических клеток", "Деление ядра"], correctAnswer: "Деление соматических клеток", hint: "Митоз = неполовое деление" },
      { type: 'find', question: "Выбери фазы митоза:", options: ["Профаза", "Метафаза", "Анафаза", "Телофаза", "Интерфаза"], correctAnswer: ["Профаза", "Метафаза", "Анафаза", "Телофаза"], hint: "Четыре фазы митоза" },
      { type: 'quiz', question: "В результате митоза образуется:", options: ["2 клетки", "4 клетки", "1 клетка"], correctAnswer: "2 клетки", hint: "Две дочерние клетки" },
      { type: 'fill', question: "Перед делением происходит удвоение __", correctAnswer: "ДНК", hint: "Репликация ДНК в интерфазе" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь деление клетки! 🔬" }
  },
  {
    title: "Reported Speech",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "He said, «I am happy.» → He said he __ happy.", options: ["is", "was", "will be"], correctAnswer: "was", hint: "Present → Past в косвенной речи" },
      { type: 'quiz', question: "She said, «I will come.» → She said she __ come.", options: ["will", "would", "can"], correctAnswer: "would", hint: "Will → Would" },
      { type: 'fill', question: "«I am reading.» → He said he __ reading. (was)", correctAnswer: "was", hint: "Am reading → Was reading" },
      { type: 'find', question: "Выбери изменения в косвенной речи:", options: ["Today → That day", "Now → Then", "Here → There", "Tomorrow → The next day", "Yesterday → Today"], correctAnswer: ["Today → That day", "Now → Then", "Here → There", "Tomorrow → The next day"], hint: "Временные и местоименные изменения" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь косвенную речь! 🇬🇧" }
  }
]
