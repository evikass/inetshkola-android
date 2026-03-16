// Экспорт игр для 2 класса
import { GameLesson } from '../types'

export const secondGradeGames: GameLesson[] = [
  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Части речи",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Что такое имя существительное?", options: ["Предмет", "Действие", "Признак"], correctAnswer: "Предмет", hint: "Существительное отвечает на вопрос КТО? ЧТО?" },
      { type: 'find', question: "Выбери имена существительные:", options: ["Бежать", "Стол 🪑", "Красивый", "Книга 📖", "Петь"], correctAnswer: ["Стол 🪑", "Книга 📖"], hint: "Существительное = предмет" },
      { type: 'quiz', question: "На какой вопрос отвечает глагол?", options: ["Какой?", "Что делать?", "Кто?"], correctAnswer: "Что делать?", hint: "Глагол = действие" },
      { type: 'find', question: "Выбери глаголы:", options: ["Бежать 🏃", "Стол 🪑", "Петь 🎤", "Красивый", "Рисовать 🎨"], correctAnswer: ["Бежать 🏃", "Петь 🎤", "Рисовать 🎨"], hint: "Глагол обозначает действие" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь части речи! 📝" }
  },
  {
    title: "Корень слова",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Что такое корень слова?", options: ["Окончание", "Главная часть слова", "Приставка"], correctAnswer: "Главная часть слова", hint: "В корне заключён главный смысл" },
      { type: 'find', question: "Найди однокоренные слова к слову ЛЕС:", options: ["Лесник 🌲", "Лиса 🦊", "Лесной 🌳", "Лист 🍃", "Перелесок"], correctAnswer: ["Лесник 🌲", "Лесной 🌳", "Перелесок"], hint: "Однокоренные слова имеют общий корень" },
      { type: 'quiz', question: "Какой корень в слове ВОДНЫЙ?", options: ["ВОД", "ВОДН", "НЫЙ"], correctAnswer: "ВОД", hint: "Найди общую часть с похожими словами" },
      { type: 'quiz', question: "Какое слово лишнее?", options: ["Гора ⛰️", "Горный", "Гореть 🔥", "Пригорок"], correctAnswer: "Гореть 🔥", hint: "Проверь значение корня" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь корень слова! 🌱" }
  },
  {
    title: "Правописание приставок",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Приставка - это...", options: ["Конец слова", "Часть перед корнем", "Корень"], correctAnswer: "Часть перед корнем", hint: "Приставка стоит ПЕРЕД корнем" },
      { type: 'find', question: "Найди слова с приставкой ПРИ-:", options: ["Приехал 🚗", "Пример", "Прыгнул", "Пришёл 🚶", "Праздник"], correctAnswer: ["Приехал 🚗", "Пример", "Пришёл 🚶"], hint: "ПРИ- = приближение, присоединение" },
      { type: 'quiz', question: "Сколько приставок в слове ПЕРЕПРИШЁЛ?", options: ["1", "2", "3"], correctAnswer: "2", hint: "ПЕРЕ- и ПРИ- - две приставки" },
      { type: 'fill', question: "Вставь приставку: __ехал (приблизился)", correctAnswer: "При", hint: "Приближение = ПРИ-" }
    ],
    reward: { stars: 3, message: "Умница! Ты знаешь приставки! 📖" }
  },

  // ========== МАТЕМАТИКА ==========
  {
    title: "Сложение до 20",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "8 + 7 = ?", options: ["13", "14", "15"], correctAnswer: "15", hint: "8 + 7 = 15" },
      { type: 'quiz', question: "9 + 6 = ?", options: ["14", "15", "16"], correctAnswer: "15", hint: "9 + 6 = 15" },
      { type: 'fill', question: "12 + __ = 18", correctAnswer: "6", hint: "Сколько добавить?" },
      { type: 'quiz', question: "15 + 5 = ?", options: ["19", "20", "21"], correctAnswer: "20", hint: "15 + 5 = 20" }
    ],
    reward: { stars: 3, message: "Отлично! Ты умеешь складывать до 20! ➕" }
  },
  {
    title: "Вычитание до 20",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "18 - 9 = ?", options: ["8", "9", "10"], correctAnswer: "9", hint: "18 - 9 = 9" },
      { type: 'quiz', question: "15 - 7 = ?", options: ["7", "8", "9"], correctAnswer: "8", hint: "15 - 7 = 8" },
      { type: 'fill', question: "20 - __ = 14", correctAnswer: "6", hint: "Сколько отнять?" },
      { type: 'quiz', question: "16 - 8 = ?", options: ["7", "8", "9"], correctAnswer: "8", hint: "16 - 8 = 8" }
    ],
    reward: { stars: 3, message: "Супер! Ты умеешь вычитать! ➖" }
  },
  {
    title: "Умножение",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "2 × 3 = ?", options: ["5", "6", "7"], correctAnswer: "6", hint: "2 + 2 + 2 = 6" },
      { type: 'quiz', question: "3 × 4 = ?", options: ["10", "11", "12"], correctAnswer: "12", hint: "3 + 3 + 3 + 3 = 12" },
      { type: 'quiz', question: "5 × 2 = ?", options: ["7", "10", "12"], correctAnswer: "10", hint: "5 + 5 = 10" },
      { type: 'fill', question: "4 × __ = 8", correctAnswer: "2", hint: "Какое число умножить?" }
    ],
    reward: { stars: 3, message: "Здорово! Ты изучаешь умножение! ✖️" }
  },
  {
    title: "Деление",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "6 ÷ 2 = ?", options: ["2", "3", "4"], correctAnswer: "3", hint: "6 разделить на 2 части" },
      { type: 'quiz', question: "10 ÷ 5 = ?", options: ["1", "2", "5"], correctAnswer: "2", hint: "10 разделить на 5" },
      { type: 'quiz', question: "8 ÷ 4 = ?", options: ["2", "3", "4"], correctAnswer: "2", hint: "8 разделить на 4" },
      { type: 'fill', question: "12 ÷ __ = 3", correctAnswer: "4", hint: "На сколько разделить 12?" }
    ],
    reward: { stars: 3, message: "Замечательно! Ты изучаешь деление! ➗" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Русские писатели",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Кто написал «Мойдодыр»?", options: ["Пушкин", "Чуковский", "Барто"], correctAnswer: "Чуковский", hint: "Корней Чуковский" },
      { type: 'quiz', question: "Кто написал «Муха-Цокотуха»?", options: ["Маршак", "Чуковский", "Михалков"], correctAnswer: "Чуковский", hint: "Тот же автор, что и Мойдодыр" },
      { type: 'find', question: "Выбери произведения Пушкина:", options: ["Сказка о рыбаке и рыбке", "Мойдодыр", "Сказка о царе Салтане", "Колобок"], correctAnswer: ["Сказка о рыбаке и рыбке", "Сказка о царе Салтане"], hint: "Александр Сергеевич Пушкин" },
      { type: 'quiz', question: "Кто автор стихов про игрушки?", options: ["Барто", "Маршак", "Чуковский"], correctAnswer: "Барто", hint: "Агния Барто писала про игрушки" }
    ],
    reward: { stars: 3, message: "Прекрасно! Ты знаешь писателей! 📚" }
  },

  // ========== ОКРУЖАЮЩИЙ МИР ==========
  {
    title: "Планета Земля",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какая планета наша?", options: ["Марс 🔴", "Земля 🌍", "Луна 🌙"], correctAnswer: "Земля 🌍", hint: "Мы живём на планете Земля" },
      { type: 'quiz', question: "Что такое Солнце?", options: ["Планета", "Звезда ⭐", "Спутник"], correctAnswer: "Звезда ⭐", hint: "Солнце - это звезда!" },
      { type: 'find', question: "Выбери планеты:", options: ["Земля 🌍", "Солнце ☀️", "Марс 🔴", "Луна 🌙"], correctAnswer: ["Земля 🌍", "Марс 🔴"], hint: "Планеты вращаются вокруг Солнца" },
      { type: 'quiz', question: "Луна - это...", options: ["Планета", "Спутник Земли", "Звезда"], correctAnswer: "Спутник Земли", hint: "Луна вращается вокруг Земли" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь космос! 🚀" }
  },
  {
    title: "Природа России",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какое животное символ России?", options: ["Медведь 🐻", "Тигр 🐯", "Лиса 🦊"], correctAnswer: "Медведь 🐻", hint: "Большой бурый медведь" },
      { type: 'find', question: "Что растёт в лесу?", options: ["Берёза 🌳", "Ель 🌲", "Кактус 🌵", "Пальма 🌴"], correctAnswer: ["Берёза 🌳", "Ель 🌲"], hint: "Русский лес" },
      { type: 'quiz', question: "Какое озеро самое глубокое?", options: ["Каспийское", "Байкал", "Ладожское"], correctAnswer: "Байкал", hint: "Байкал - самое глубокое в мире" },
      { type: 'quiz', question: "Столица России?", options: ["Петербург", "Москва", "Казань"], correctAnswer: "Москва", hint: "Москва - столица России" }
    ],
    reward: { stars: 3, message: "Молодец! Ты знаешь Россию! 🇷🇺" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Животные по-английски",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Cat - это...", options: ["Собака 🐕", "Кошка 🐱", "Птица 🐦"], correctAnswer: "Кошка 🐱", hint: "Cat = кошка" },
      { type: 'quiz', question: "Как будет «собака»?", options: ["Cat", "Dog", "Bird"], correctAnswer: "Dog", hint: "Dog = собака" },
      { type: 'find', question: "Выбери названия животных:", options: ["Cat 🐱", "Red", "Dog 🐕", "Big", "Bird 🐦"], correctAnswer: ["Cat 🐱", "Dog 🐕", "Bird 🐦"], hint: "Animals = животные" },
      { type: 'quiz', question: "Что такое Fish?", options: ["Птица 🐦", "Рыба 🐟", "Животное 🐾"], correctAnswer: "Рыба 🐟", hint: "Fish = рыба" }
    ],
    reward: { stars: 3, message: "Wonderful! Замечательно! 🐾" }
  },
  {
    title: "Семья по-английски",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Mother - это...", options: ["Папа", "Мама", "Бабушка"], correctAnswer: "Мама", hint: "Mother = мама" },
      { type: 'quiz', question: "Как будет «папа»?", options: ["Mother", "Father", "Sister"], correctAnswer: "Father", hint: "Father = папа" },
      { type: 'find', question: "Выбери слова о семье:", options: ["Mother 👩", "Cat 🐱", "Father 👨", "Dog 🐕", "Sister 👧"], correctAnswer: ["Mother 👩", "Father 👨", "Sister 👧"], hint: "Family = семья" },
      { type: 'quiz', question: "Brother - это...", options: ["Сестра", "Брат", "Дедушка"], correctAnswer: "Брат", hint: "Brother = брат" }
    ],
    reward: { stars: 3, message: "Great! Отлично! 👨‍👩‍👧‍👦" }
  },

  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Умножение на 2 и 3",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "2 × 6 = __", correctAnswer: "12", hint: "2 + 2 + 2 + 2 + 2 + 2 = 12" },
      { type: 'fill', question: "3 × 4 = __", correctAnswer: "12", hint: "3 + 3 + 3 + 3 = 12" },
      { type: 'quiz', question: "2 × 8 = ?", options: ["14", "16", "18"], correctAnswer: "16", hint: "2 × 8 = 16" },
      { type: 'quiz', question: "3 × 7 = ?", options: ["18", "21", "24"], correctAnswer: "21", hint: "3 × 7 = 21" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь таблицу умножения! ✖️" }
  },
  {
    title: "Деление на 2 и 3",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "12 ÷ 2 = __", correctAnswer: "6", hint: "Какое число × 2 = 12?" },
      { type: 'fill', question: "15 ÷ 3 = __", correctAnswer: "5", hint: "Какое число × 3 = 15?" },
      { type: 'quiz', question: "18 ÷ 2 = ?", options: ["7", "8", "9"], correctAnswer: "9", hint: "9 × 2 = 18" },
      { type: 'quiz', question: "21 ÷ 3 = ?", options: ["6", "7", "8"], correctAnswer: "7", hint: "7 × 3 = 21" }
    ],
    reward: { stars: 3, message: "Супер! Ты умеешь делить! ➗" }
  },
  {
    title: "Правописание ЖИ-ШИ",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'fill', question: "Маш__на (И/Ы)", correctAnswer: "И", hint: "ЖИ-ШИ пиши с И!" },
      { type: 'fill', question: "Ш__на (И/Ы)", correctAnswer: "И", hint: "ШИ пиши с И!" },
      { type: 'find', question: "Выбери слова с ЖИ-ШИ:", options: ["Жираф", "Шина", "Машина", "Жизнь", "Шар"], correctAnswer: ["Жираф", "Шина", "Машина", "Жизнь"], hint: "ЖИ-ШИ пишутся с И" },
      { type: 'quiz', question: "В слове «лыжи» пишется:", options: ["И", "Ы", "Е"], correctAnswer: "И", hint: "ЖИ пиши с И" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь правило ЖИ-ШИ! ✍️" }
  },
  {
    title: "Правописание ЧА-ЩА",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'fill', question: "Туч__ (А/Я)", correctAnswer: "А", hint: "ЧА-ЩА пиши с А!" },
      { type: 'fill', question: "Рощ__ (А/Я)", correctAnswer: "А", hint: "ЩА пиши с А!" },
      { type: 'find', question: "Выбери слова с ЧА-ЩА:", options: ["Чаща", "Чаша", "Роща", "Туча", "Чай"], correctAnswer: ["Чаща", "Чаша", "Роща", "Туча"], hint: "ЧА-ЩА пишутся с А" },
      { type: 'quiz', question: "В слове «дача» пишется:", options: ["А", "Я", "Е"], correctAnswer: "А", hint: "ЧА пиши с А" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь правило ЧА-ЩА! ✍️" }
  },
  {
    title: "Правописание ЧУ-ЩУ",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'fill', question: "Щ__ка (У/Ю)", correctAnswer: "У", hint: "ЧУ-ЩУ пиши с У!" },
      { type: 'fill', question: "Ч__до (У/Ю)", correctAnswer: "У", hint: "ЧУ пиши с У!" },
      { type: 'find', question: "Выбери слова с ЧУ-ЩУ:", options: ["Щука", "Чудо", "Чугун", "Щупальце", "Чудак"], correctAnswer: ["Щука", "Чудо", "Чугун", "Щупальце", "Чудак"], hint: "ЧУ-ЩУ пишутся с У" },
      { type: 'quiz', question: "В слове «чулок» пишется:", options: ["У", "Ю", "О"], correctAnswer: "У", hint: "ЧУ пиши с У" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь правило ЧУ-ЩУ! ✍️" }
  },
  {
    title: "Правописание ЧК-ЧН",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "В слове «ночка» мягкий знак:", options: ["Нужен", "Не нужен", "Не знаю"], correctAnswer: "Не нужен", hint: "ЧК-ЧН пишутся без мягкого знака!" },
      { type: 'quiz', question: "В слове «ночной» мягкий знак:", options: ["Нужен", "Не нужен", "Не знаю"], correctAnswer: "Не нужен", hint: "ЧК-ЧН пишутся без мягкого знака!" },
      { type: 'find', question: "Выбери слова без мягкого знака:", options: ["Ночка", "Ночной", "Точка", "Тучка", "Ручка"], correctAnswer: ["Ночка", "Ночной", "Точка", "Тучка", "Ручка"], hint: "ЧК-ЧН без Ь" },
      { type: 'fill', question: "В слове «дочка» мягкий знак __", correctAnswer: "не нужен", hint: "ЧК без Ь" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь правило ЧК-ЧН! ✍️" }
  },
  {
    title: "Слова-предметы",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "На какой вопрос отвечает слово «стол»?", options: ["Что делает?", "Какой?", "Что?"], correctAnswer: "Что?", hint: "Стол - это предмет" },
      { type: 'find', question: "Выбери слова-предметы:", options: ["Книга", "Бежать", "Красивый", "Стол", "Прыгать"], correctAnswer: ["Книга", "Стол"], hint: "Слова-предметы отвечают на «кто? что?»" },
      { type: 'quiz', question: "Слово «мама» - это:", options: ["Предмет", "Действие", "Признак"], correctAnswer: "Предмет", hint: "Мама - это кто?" },
      { type: 'quiz', question: "На какой вопрос отвечает слово «кот»?", options: ["Что делает?", "Кто?", "Какой?"], correctAnswer: "Кто?", hint: "Кот - это кто?" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь слова-предметы! 📝" }
  },
  {
    title: "Слова-признаки",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "На какой вопрос отвечает слово «красивый»?", options: ["Что делает?", "Какой?", "Что?"], correctAnswer: "Какой?", hint: "Красивый - это признак" },
      { type: 'find', question: "Выбери слова-признаки:", options: ["Большой", "Бежать", "Красный", "Стол", "Быстрый"], correctAnswer: ["Большой", "Красный", "Быстрый"], hint: "Слова-признаки отвечают на «какой? какая? какое?»" },
      { type: 'quiz', question: "Слово «зелёный» - это:", options: ["Предмет", "Действие", "Признак"], correctAnswer: "Признак", hint: "Зелёный - это какой?" },
      { type: 'quiz', question: "На какой вопрос отвечает слово «умный»?", options: ["Что делает?", "Кто?", "Какой?"], correctAnswer: "Какой?", hint: "Умный - это какой?" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь слова-признаки! 📝" }
  },
  {
    title: "Овощи и фрукты",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'find', question: "Выбери овощи:", options: ["Морковь 🥕", "Яблоко 🍎", "Огурец 🥒", "Груша 🍐", "Помидор 🍅"], correctAnswer: ["Морковь 🥕", "Огурец 🥒", "Помидор 🍅"], hint: "Овощи растут в огороде" },
      { type: 'find', question: "Выбери фрукты:", options: ["Яблоко 🍎", "Морковь 🥕", "Банан 🍌", "Огурец 🥒", "Груша 🍐"], correctAnswer: ["Яблоко 🍎", "Банан 🍌", "Груша 🍐"], hint: "Фрукты растут на деревьях" },
      { type: 'quiz', question: "Где растут овощи?", options: ["На деревьях", "В огороде", "В лесу"], correctAnswer: "В огороде", hint: "Огород - место для овощей" },
      { type: 'quiz', question: "Что полезнее: фрукт или конфета?", options: ["Фрукт", "Конфета", "Одинаково"], correctAnswer: "Фрукт", hint: "Фрукты содержат витамины" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь овощи и фрукты! 🥗" }
  },
  {
    title: "Еда по-английски",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Apple - это...", options: ["Апельсин", "Яблоко 🍎", "Банан"], correctAnswer: "Яблоко 🍎", hint: "Apple = яблоко" },
      { type: 'quiz', question: "Как будет «хлеб»?", options: ["Bread", "Water", "Milk"], correctAnswer: "Bread", hint: "Bread = хлеб" },
      { type: 'find', question: "Выбери названия еды:", options: ["Apple 🍎", "Cat 🐱", "Bread 🍞", "Dog 🐕", "Milk 🥛"], correctAnswer: ["Apple 🍎", "Bread 🍞", "Milk 🥛"], hint: "Food = еда" },
      { type: 'fill', question: "Water = __ (вода)", correctAnswer: "вода", hint: "Water = вода" }
    ],
    reward: { stars: 3, message: "Great! Отлично! 🍎" }
  },

  // ========== НОВЫЕ ИГРЫ v3.41 ==========
  {
    title: "Таблица умножения на 4 и 5",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "4 × 4 = __", correctAnswer: "16", hint: "4 × 4 = 16" },
      { type: 'fill', question: "5 × 5 = __", correctAnswer: "25", hint: "5 × 5 = 25" },
      { type: 'quiz', question: "4 × 6 = ?", options: ["20", "24", "28"], correctAnswer: "24", hint: "4 × 6 = 24" },
      { type: 'quiz', question: "5 × 7 = ?", options: ["30", "35", "40"], correctAnswer: "35", hint: "5 × 7 = 35" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь таблицу умножения! ✖️" }
  },
  {
    title: "Периметр и площадь",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Периметр квадрата со стороной 3:", options: ["6", "9", "12"], correctAnswer: "12", hint: "P = 4 × 3 = 12" },
      { type: 'fill', question: "Периметр прямоугольника 2 и 4 = __", correctAnswer: "12", hint: "P = 2 × (2 + 4) = 12" },
      { type: 'quiz', question: "Площадь квадрата со стороной 4:", options: ["8", "12", "16"], correctAnswer: "16", hint: "S = 4 × 4 = 16" },
      { type: 'fill', question: "Площадь прямоугольника 3 × 5 = __", correctAnswer: "15", hint: "S = 3 × 5 = 15" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь периметр и площадь! 📐" }
  },
  {
    title: "Имя прилагательное",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Имя прилагательное обозначает:", options: ["Предмет", "Признак предмета", "Действие"], correctAnswer: "Признак предмета", hint: "Прилагательное отвечает на «какой?»" },
      { type: 'find', question: "Выбери прилагательные:", options: ["Красивый", "Красота", "Большой", "Дом", "Быстрый"], correctAnswer: ["Красивый", "Большой", "Быстрый"], hint: "Прилагательные описывают предметы" },
      { type: 'quiz', question: "На какой вопрос отвечает прилагательное?", options: ["Что?", "Какой?", "Что делает?"], correctAnswer: "Какой?", hint: "Какой? - это признак" },
      { type: 'fill', question: "Зелёный (какой?) - это __", correctAnswer: "прилагательное", hint: "Прилагательное = признак" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь прилагательные! ✍️" }
  },
  {
    title: "Части тела",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Чем мы видим?", options: ["Ушами", "Глазами", "Носом"], correctAnswer: "Глазами", hint: "Глаза - орган зрения" },
      { type: 'find', question: "Выбери органы чувств:", options: ["Глаза", "Уши", "Рука", "Нос", "Язык"], correctAnswer: ["Глаза", "Уши", "Нос", "Язык"], hint: "Пять органов чувств" },
      { type: 'quiz', question: "Чем мы слышим?", options: ["Глазами", "Ушами", "Ртом"], correctAnswer: "Ушами", hint: "Уши - орган слуха" },
      { type: 'fill', question: "Нос - орган __", correctAnswer: "обоняния", hint: "Обоняние = чувство запаха" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь органы чувств! 👃" }
  },
  {
    title: "Present Simple",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I ___ to school every day.", options: ["go", "goes", "going"], correctAnswer: "go", hint: "I go = я хожу" },
      { type: 'quiz', question: "She ___ to school.", options: ["go", "goes", "going"], correctAnswer: "goes", hint: "She goes = она ходит" },
      { type: 'fill', question: "They __ (play) football. (play)", correctAnswer: "play", hint: "They play = они играют" },
      { type: 'find', question: "Выбери маркеры Present Simple:", options: ["Every day", "Yesterday", "Usually", "Last week", "Always"], correctAnswer: ["Every day", "Usually", "Always"], hint: "Present Simple = регулярно" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь Present Simple! 🇬🇧" }
  },
  {
    title: "Дни недели и месяцы",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Monday - это...", options: ["Вторник", "Понедельник", "Среда"], correctAnswer: "Понедельник", hint: "Monday = понедельник" },
      { type: 'quiz', question: "Как будет «пятница»?", options: ["Friday", "Monday", "Sunday"], correctAnswer: "Friday", hint: "Friday = пятница" },
      { type: 'fill', question: "Sunday = __ (воскресенье)", correctAnswer: "воскресенье", hint: "Sunday = воскресенье" },
      { type: 'find', question: "Выбери дни недели:", options: ["Monday", "January", "Friday", "December", "Sunday"], correctAnswer: ["Monday", "Friday", "Sunday"], hint: "Days of the week" }
    ],
    reward: { stars: 3, message: "Wonderful! Ты знаешь дни недели! 📅" }
  }
]
