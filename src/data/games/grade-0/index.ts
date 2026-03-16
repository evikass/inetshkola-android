// Экспорт игр для подготовительного класса
import { GameLesson } from '../types'

export const prepClassGames: GameLesson[] = [
  // ========== ПОДГОТОВКА К ПИСЬМУ ==========
  {
    title: "Линии и фигуры",
    subject: "Подготовка к письму",
    icon: "Pencil",
    color: "text-purple-400",
    tasks: [
      { type: 'quiz', question: "Какая линия прямая? ➖〰️", options: ["Первая ➖", "Вторая 〰️", "Обе"], correctAnswer: "Первая ➖", hint: "Прямая линия не изгибается" },
      { type: 'quiz', question: "Сколько углов у квадрата? ⬜", options: ["3", "4", "5"], correctAnswer: "4", hint: "Посчитай уголки у квадрата" },
      { type: 'find', question: "Выбери фигуры с углами:", options: ["Круг ⭕", "Квадрат ⬜", "Овал ⬭", "Треугольник 🔺"], correctAnswer: ["Квадрат ⬜", "Треугольник 🔺"], hint: "Углы есть у фигур с прямыми сторонами" },
      { type: 'quiz', question: "Какая фигура похожа на мяч?", options: ["Квадрат ⬜", "Круг ⭕", "Треугольник 🔺"], correctAnswer: "Круг ⭕", hint: "Мяч круглый!" }
    ],
    reward: { stars: 3, message: "Молодец! Ты знаешь фигуры и линии! ✏️" }
  },
  
  // ========== ОСНОВЫ СЧЁТА ==========
  {
    title: "Счёт до 5",
    subject: "Основы счёта",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько яблок? 🍎🍎🍎", options: ["2", "3", "4"], correctAnswer: "3", hint: "Посчитай: раз, два, три!" },
      { type: 'quiz', question: "Сколько шариков? 🎈🎈", options: ["1", "2", "3"], correctAnswer: "2", hint: "Посчитай внимательно" },
      { type: 'quiz', question: "Сколько звёзд? ⭐⭐⭐⭐", options: ["3", "4", "5"], correctAnswer: "4", hint: "Посчитай: раз, два, три, четыре!" },
      { type: 'quiz', question: "Какое число идёт после 4?", options: ["3", "5", "6"], correctAnswer: "5", hint: "Посчитай: 1, 2, 3, 4, ..." }
    ],
    reward: { stars: 3, message: "Умница! Ты умеешь считать до 5! 🔢" }
  },
  
  {
    title: "Счёт до 10",
    subject: "Основы счёта",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько пальцев на двух руках?", options: ["5", "8", "10"], correctAnswer: "10", hint: "Посчитай: 5 на одной и 5 на другой" },
      { type: 'quiz', question: "Какое число идёт после 7?", options: ["6", "8", "9"], correctAnswer: "8", hint: "Посчитай: 1, 2, 3, 4, 5, 6, 7, ..." },
      { type: 'quiz', question: "Какое число перед 5?", options: ["4", "6", "3"], correctAnswer: "4", hint: "Посчитай назад: 5, ..." },
      { type: 'fill', question: "Какое число между 4 и 6?", correctAnswer: "5", hint: "Посчитай: 4, ?, 6" }
    ],
    reward: { stars: 3, message: "Отлично! Ты умеешь считать до 10! 🎉" }
  },
  
  {
    title: "Цифры",
    subject: "Основы счёта",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Как выглядит цифра 3?", options: ["1", "3", "5"], correctAnswer: "3", hint: "Цифра 3 похожа на ушки зайчика" },
      { type: 'find', question: "Выбери цифры от 1 до 3:", options: ["1", "4", "2", "5", "3"], correctAnswer: ["1", "2", "3"], hint: "1, 2, 3 - первые три цифры" },
      { type: 'quiz', question: "Сколько это: ⭐⭐⭐?", options: ["2", "3", "4"], correctAnswer: "3", hint: "Посчитай звёздочки" },
      { type: 'quiz', question: "Какая цифра показывает «ни одного»?", options: ["0", "1", "2"], correctAnswer: "0", hint: "Ноль - это пусто, ничего нет" }
    ],
    reward: { stars: 3, message: "Молодец! Ты знаешь цифры! ✨" }
  },
  
  {
    title: "Сравнение",
    subject: "Основы счёта",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Что больше: 3 или 5?", options: ["3", "5", "Одинаково"], correctAnswer: "5", hint: "5 идёт позже при счёте" },
      { type: 'quiz', question: "Что меньше: 2 или 4?", options: ["2", "4", "Одинаково"], correctAnswer: "2", hint: "2 идёт раньше при счёте" },
      { type: 'quiz', question: "3 и 3 - это...", options: ["3 больше 3", "3 меньше 3", "3 равно 3"], correctAnswer: "3 равно 3", hint: "Числа одинаковые" },
      { type: 'quiz', question: "Сколько яблок больше? 🍎🍎🍎 vs 🍎🍎", options: ["Первых больше на 1", "Вторых больше на 1", "Одинаково"], correctAnswer: "Первых больше на 1", hint: "Посчитай и сравни" }
    ],
    reward: { stars: 3, message: "Супер! Ты умеешь сравнивать! ⚖️" }
  },
  
  // ========== РАЗВИТИЕ РЕЧИ ==========
  {
    title: "Звуки речи",
    subject: "Развитие речи",
    icon: "MessageCircle",
    color: "text-teal-400",
    tasks: [
      { type: 'quiz', question: "С какого звука начинается слово МАМА?", options: ["А", "М", "О"], correctAnswer: "М", hint: "Произнеси слово: [М]ама" },
      { type: 'find', question: "Выбери слова на А:", options: ["Арбуз 🍉", "Мак 🌺", "Аист 🦩", "Сок 🧃", "Аня 👧"], correctAnswer: ["Арбуз 🍉", "Аист 🦩", "Аня 👧"], hint: "Прислушайся к первому звуку" },
      { type: 'quiz', question: "Сколько звуков в слове ДОМ?", options: ["2", "3", "4"], correctAnswer: "3", hint: "Д-О-М - три звука" },
      { type: 'quiz', question: "Какой звук последний в слове КОТ?", options: ["К", "О", "Т"], correctAnswer: "Т", hint: "Ко-[Т] - последний звук" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь звуки! 🔊" }
  },
  
  {
    title: "Слоги",
    subject: "Развитие речи",
    icon: "MessageCircle",
    color: "text-teal-400",
    tasks: [
      { type: 'quiz', question: "Сколько слогов в слове МА-МА?", options: ["1", "2", "3"], correctAnswer: "2", hint: "Хлопни: МА-МА (два хлопка)" },
      { type: 'quiz', question: "Сколько слогов в слове ШАР?", options: ["1", "2", "3"], correctAnswer: "1", hint: "Хлопни один раз: ШАР" },
      { type: 'find', question: "Выбери слова из 2 слогов:", options: ["Дом 🏠", "Вода 💧", "Кот 🐱", "Рука ✋", "Машина 🚗"], correctAnswer: ["Вода 💧", "Рука ✋"], hint: "Хлопни и посчитай" },
      { type: 'quiz', question: "Какое слово самое длинное?", options: ["Кот", "Машина", "Дом"], correctAnswer: "Машина", hint: "Посчитай слоги в каждом слове" }
    ],
    reward: { stars: 3, message: "Молодец! Ты понимаешь слоги! 📝" }
  },
  
  // ========== ОКРУЖАЮЩИЙ МИР ==========
  {
    title: "Животные",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какое животное говорит «Му»?", options: ["Кошка 🐱", "Корова 🐄", "Собака 🐕"], correctAnswer: "Корова 🐄", hint: "Это большое животное на ферме" },
      { type: 'quiz', question: "Кто умеет летать?", options: ["Рыба 🐟", "Птица 🐦", "Змея 🐍"], correctAnswer: "Птица 🐦", hint: "У кого есть крылья?" },
      { type: 'find', question: "Выбери домашних животных:", options: ["Лиса 🦊", "Кошка 🐱", "Волк 🐺", "Собака 🐕", "Заяц 🐰"], correctAnswer: ["Кошка 🐱", "Собака 🐕"], hint: "Домашние животные живут с людьми" },
      { type: 'quiz', question: "Где живёт рыба?", options: ["В гнезде 🪺", "В воде 🌊", "В норе 🕳️"], correctAnswer: "В воде 🌊", hint: "Рыба плавает" }
    ],
    reward: { stars: 3, message: "Здорово! Ты знаешь животных! 🐾" }
  },
  
  {
    title: "Растения",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Что нужно растению для роста?", options: ["Конфеты 🍬", "Вода и свет 💧☀️", "Мороженое 🍦"], correctAnswer: "Вода и свет 💧☀️", hint: "Растения пьют и любят солнышко" },
      { type: 'quiz', question: "Какого цвета большинство листьев летом?", options: ["Красного", "Зелёного", "Синего"], correctAnswer: "Зелёного", hint: "Вспомни деревья летом" },
      { type: 'find', question: "Что растёт в огороде?", options: ["Морковь 🥕", "Камень 🪨", "Помидор 🍅", "Машина 🚗", "Огурец 🥒"], correctAnswer: ["Морковь 🥕", "Помидор 🍅", "Огурец 🥒"], hint: "В огороде растут овощи" },
      { type: 'quiz', question: "Что вырастает из цветка?", options: ["Ягоды 🍇", "Фрукт 🍎", "Семена 🌱"], correctAnswer: "Семена 🌱", hint: "Из цветка потом вырастают новые растения" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь растения! 🌻" }
  },
  
  {
    title: "Времена года",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какое время года, когда тепло и солнечно?", options: ["Зима ❄️", "Лето ☀️", "Осень 🍂"], correctAnswer: "Лето ☀️", hint: "Можно купаться и загорать" },
      { type: 'quiz', question: "Когда падает снег?", options: ["Летом ☀️", "Зимой ❄️", "Весной 🌸"], correctAnswer: "Зимой ❄️", hint: "Холодно, можно кататься на санках" },
      { type: 'find', question: "Что бывает весной?", options: ["Снег ❄️", "Цветы 🌷", "Жара 🔥", "Листья на деревьях 🌳", "Птицы прилетают 🐦"], correctAnswer: ["Цветы 🌷", "Листья на деревьях 🌳", "Птицы прилетают 🐦"], hint: "Весной всё расцветает" },
      { type: 'quiz', question: "Сколько времён года?", options: ["2", "3", "4"], correctAnswer: "4", hint: "Зима, весна, лето, осень" }
    ],
    reward: { stars: 3, message: "Замечательно! Ты знаешь времена года! 🌸" }
  },
  
  // ========== ЦВЕТА И ФОРМЫ ==========
  {
    title: "Цвета",
    subject: "Окружающий мир",
    icon: "Palette",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Какого цвета солнце? ☀️", options: ["Синее", "Жёлтое", "Зелёное"], correctAnswer: "Жёлтое", hint: "Солнце яркое и тёплое" },
      { type: 'quiz', question: "Какого цвета трава? 🌿", options: ["Красная", "Синяя", "Зелёная"], correctAnswer: "Зелёная", hint: "Трава растёт на лугу" },
      { type: 'find', question: "Выбери красные предметы:", options: ["Помидор 🍅", "Огурец 🥒", "Яблоко 🍎", "Банан 🍌", "Клубника 🍓"], correctAnswer: ["Помидор 🍅", "Яблоко 🍎", "Клубника 🍓"], hint: "Красный - яркий цвет" },
      { type: 'quiz', question: "Смешай жёлтый и синий - получишь?", options: ["Зелёный", "Оранжевый", "Фиолетовый"], correctAnswer: "Зелёный", hint: "Попробуй смешать краски!" }
    ],
    reward: { stars: 3, message: "Умница! Ты знаешь цвета! 🎨" }
  },
  
  // ========== МУЗЫКА ==========
  {
    title: "Звуки и музыка",
    subject: "Музыка",
    icon: "Music",
    color: "text-purple-400",
    tasks: [
      { type: 'quiz', question: "Какой инструмент нужно бить палочками?", options: ["Скрипка 🎻", "Барабан 🥁", "Флейта 🎶"], correctAnswer: "Барабан 🥁", hint: "Бум-бум-бум!" },
      { type: 'quiz', question: "Сколько нот в музыке?", options: ["5", "6", "7"], correctAnswer: "7", hint: "До, ре, ми, фа, соль, ля, си" },
      { type: 'find', question: "Выбери музыкальные инструменты:", options: ["Гитара 🎸", "Стул 🪑", "Пианино 🎹", "Мяч ⚽", "Барабан 🥁"], correctAnswer: ["Гитара 🎸", "Пианино 🎹", "Барабан 🥁"], hint: "На них можно играть музыку" },
      { type: 'quiz', question: "Какой инструмент чёрно-белый?", options: ["Барабан 🥁", "Пианино 🎹", "Труба 🎺"], correctAnswer: "Пианино 🎹", hint: "У него есть клавиши" }
    ],
    reward: { stars: 3, message: "Браво! Ты любишь музыку! 🎵" }
  },
  
  // ========== ФИЗКУЛЬТУРА ==========
  {
    title: "Спорт и движение",
    subject: "Физкультура",
    icon: "Dumbbell",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "В какую игру играют ногами и мячом?", options: ["Баскетбол 🏀", "Футбол ⚽", "Теннис 🎾"], correctAnswer: "Футбол ⚽", hint: "Нельзя брать мяч руками!" },
      { type: 'quiz', question: "Сколько человек в команде по футболу?", options: ["5", "7", "11"], correctAnswer: "11", hint: "Много игроков на поле" },
      { type: 'find', question: "Выбери спортивные игры:", options: ["Футбол ⚽", "Сон 😴", "Бег 🏃", "Мультики 📺", "Плавание 🏊"], correctAnswer: ["Футбол ⚽", "Бег 🏃", "Плавание 🏊"], hint: "Спорт - это движение" },
      { type: 'quiz', question: "Что полезно для здоровья?", options: ["Сидеть весь день", "Делать зарядку", "Есть много конфет"], correctAnswer: "Делать зарядку", hint: "Движение - жизнь!" }
    ],
    reward: { stars: 3, message: "Молодец! Спорт - это здоровье! 💪" }
  },
  
  // ========== ПРОТИВОПОЛОЖНОСТИ ==========
  {
    title: "Большой и маленький",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Что больше: слон 🐘 или мышка 🐭?", options: ["Слон 🐘", "Мышка 🐭", "Одинаково"], correctAnswer: "Слон 🐘", hint: "Слон очень большой!" },
      { type: 'quiz', question: "Что меньше: мяч ⚽ или горошина?", options: ["Мяч ⚽", "Горошина", "Одинаково"], correctAnswer: "Горошина", hint: "Горошина маленькая" },
      { type: 'find', question: "Выбери больших животных:", options: ["Слон 🐘", "Мышь 🐭", "Кит 🐋", "Божья коровка 🐞", "Медведь 🐻"], correctAnswer: ["Слон 🐘", "Кит 🐋", "Медведь 🐻"], hint: "Большие животные!" },
      { type: 'quiz', question: "Что длиннее: карандаш ✏️ или ручка 🖊️?", options: ["Карандаш ✏️", "Ручка 🖊️", "Одинаково"], correctAnswer: "Карандаш ✏️", hint: "Карандаш обычно длиннее" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь размеры! 📏" }
  },
  
  // ========== ГЕОМЕТРИЧЕСКИЕ ФИГУРЫ ==========
  {
    title: "Геометрические фигуры",
    subject: "Основы счёта",
    icon: "Calculator",
    color: "text-indigo-400",
    tasks: [
      { type: 'quiz', question: "Сколько углов у треугольника?", options: ["2", "3", "4"], correctAnswer: "3", hint: "Тре-угольник = три угла" },
      { type: 'find', question: "Что похоже на круг?", options: ["Книга 📕", "Мяч ⚽", "Тарелка 🍽️", "Окно 🪟", "Колесо 🛞"], correctAnswer: ["Мяч ⚽", "Тарелка 🍽️", "Колесо 🛞"], hint: "Круглые предметы!" },
      { type: 'quiz', question: "У квадрата все стороны:", options: ["Разные", "Одинаковые", "Две длинные"], correctAnswer: "Одинаковые", hint: "Квадрат - ровный со всех сторон" },
      { type: 'quiz', question: "Какая фигура есть в окне?", options: ["Круг", "Квадрат", "Треугольник"], correctAnswer: "Квадрат", hint: "Окно обычно квадратное или прямоугольное" }
    ],
    reward: { stars: 3, message: "Умница! Ты знаешь фигуры! 🔷" }
  },
  
  // ========== БУКВЫ ==========
  {
    title: "Буквы А, О, У",
    subject: "Развитие речи",
    icon: "MessageCircle",
    color: "text-rose-400",
    tasks: [
      { type: 'quiz', question: "Какая буква первая в слове АНЯ?", options: ["А", "Н", "Я"], correctAnswer: "А", hint: "А-НЯ" },
      { type: 'find', question: "Выбери слова на букву О:", options: ["Осень 🍂", "Арбуз 🍉", "Ослик 🫏", "Утка 🦆", "Олень 🦌"], correctAnswer: ["Осень 🍂", "Ослик 🫏", "Олень 🦌"], hint: "Слова начинаются на О" },
      { type: 'quiz', question: "Какая буква есть в слове УТКА?", options: ["А", "О", "У"], correctAnswer: "У", hint: "У-Т-КА" },
      { type: 'quiz', question: "Сколько букв А в слове МАМА?", options: ["1", "2", "3"], correctAnswer: "2", hint: "М-А-М-А" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь буквы! 📝" }
  },
  
  // ========== ДНИ НЕДЕЛИ ==========
  {
    title: "Дни недели",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Сколько дней в неделе?", options: ["5", "6", "7"], correctAnswer: "7", hint: "Понедельник, вторник..." },
      { type: 'quiz', question: "Какой день идёт после понедельника?", options: ["Воскресенье", "Вторник", "Среда"], correctAnswer: "Вторник", hint: "Понедельник, вторник..." },
      { type: 'find', question: "Выбери выходные дни:", options: ["Понедельник", "Суббота", "Среда", "Воскресенье", "Пятница"], correctAnswer: ["Суббота", "Воскресенье"], hint: "Когда не нужно в школу/сад" },
      { type: 'quiz', question: "Какой день идёт перед вторником?", options: ["Понедельник", "Среда", "Воскресенье"], correctAnswer: "Понедельник", hint: "Понедельник, вторник..." }
    ],
    reward: { stars: 3, message: "Молодец! Ты знаешь дни недели! 📅" }
  },
  
  // ========== ЧАСТИ ТЕЛА ==========
  {
    title: "Части тела",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Чем мы видим?", options: ["Ушами 👂", "Глазами 👀", "Носом 👃"], correctAnswer: "Глазами 👀", hint: "Глаза - для зрения" },
      { type: 'quiz', question: "Сколько рук у человека?", options: ["1", "2", "4"], correctAnswer: "2", hint: "Посмотри на себя!" },
      { type: 'find', question: "Что на лице?", options: ["Нос 👃", "Колено", "Глаза 👀", "Локоть", "Рот 👄"], correctAnswer: ["Нос 👃", "Глаза 👀", "Рот 👄"], hint: "Лицо - это голова спереди" },
      { type: 'quiz', question: "Чем мы слышим?", options: ["Глазами", "Ушами 👂", "Ртом"], correctAnswer: "Ушами 👂", hint: "Уши - для слуха" }
    ],
    reward: { stars: 3, message: "Умница! Ты знаешь своё тело! 🧍" }
  },
  
  // ========== ОВОЩИ И ФРУКТЫ ==========
  {
    title: "Овощи и фрукты",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-lime-400",
    tasks: [
      { type: 'quiz', question: "Что это: оранжевый, растёт в земле, полезный?", options: ["Яблоко 🍎", "Морковь 🥕", "Банан 🍌"], correctAnswer: "Морковь 🥕", hint: "Морковь - оранжевая" },
      { type: 'find', question: "Выбери фрукты:", options: ["Яблоко 🍎", "Огурец 🥒", "Банан 🍌", "Помидор 🍅", "Груша 🍐"], correctAnswer: ["Яблоко 🍎", "Банан 🍌", "Груша 🍐"], hint: "Фрукты - сладкие, растут на деревьях" },
      { type: 'quiz', question: "Огурец - это:", options: ["Фрукт", "Овощ", "Ягода"], correctAnswer: "Овощ", hint: "Огурцы растут в огороде" },
      { type: 'quiz', question: "Какого цвета лимон?", options: ["Красный", "Зелёный", "Жёлтый"], correctAnswer: "Жёлтый", hint: "Лимон жёлтый и кислый" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь овощи и фрукты! 🥗" }
  },

  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Счёт до 5 с картинками",
    subject: "Основы счёта",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько котят? 🐱🐱🐱🐱", options: ["3", "4", "5"], correctAnswer: "4", hint: "Посчитай: раз, два, три, четыре!" },
      { type: 'quiz', question: "Сколько цветочков? 🌸🌸", options: ["1", "2", "3"], correctAnswer: "2", hint: "Один, два!" },
      { type: 'fill', question: "Сколько солнышек на небе? ☀️ = __", correctAnswer: "1", hint: "На небе одно солнышко" },
      { type: 'quiz', question: "Сколько грибочков? 🍄🍄🍄🍄🍄", options: ["4", "5", "6"], correctAnswer: "5", hint: "Посчитай все грибы!" }
    ],
    reward: { stars: 3, message: "Умница! Ты отлично считаешь! 🔢" }
  },
  {
    title: "Больше и меньше",
    subject: "Основы счёта",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Что больше: 2 или 4?", options: ["2", "4", "Одинаково"], correctAnswer: "4", hint: "4 больше, чем 2" },
      { type: 'quiz', question: "Что меньше: 1 или 3?", options: ["1", "3", "Одинаково"], correctAnswer: "1", hint: "1 меньше, чем 3" },
      { type: 'quiz', question: "Где больше звёзд? ⭐⭐ vs ⭐⭐⭐⭐", options: ["Первых больше", "Вторых больше", "Одинаково"], correctAnswer: "Вторых больше", hint: "Посчитай и сравни" },
      { type: 'quiz', question: "5 и 5 - это...", options: ["5 больше", "5 меньше", "Одинаково"], correctAnswer: "Одинаково", hint: "Числа равны" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь «больше» и «меньше»! ⚖️" }
  },
  {
    title: "Один и много",
    subject: "Основы счёта",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько здесь ёлочек? 🌲 - Это...", options: ["Один", "Много"], correctAnswer: "Один", hint: "Только одна ёлочка" },
      { type: 'quiz', question: "Сколько здесь шариков? 🎈🎈🎈🎈🎈 - Это...", options: ["Один", "Много"], correctAnswer: "Много", hint: "Больше одного - это много" },
      { type: 'find', question: "Выбери, где ОДИН:", options: ["⭐", "🌟🌟🌟", "🌙", "☀️☀️"], correctAnswer: ["⭐", "🌙"], hint: "Один - это когда всего один предмет" },
      { type: 'quiz', question: "На небе много звёзд?", options: ["Да", "Нет"], correctAnswer: "Да", hint: "Звёзд на небе очень много!" }
    ],
    reward: { stars: 3, message: "Молодец! Ты понимаешь «один» и «много»! ✨" }
  },
  {
    title: "Буквы: согласные и гласные",
    subject: "Развитие речи",
    icon: "MessageCircle",
    color: "text-teal-400",
    tasks: [
      { type: 'quiz', question: "Буква А - это...", options: ["Гласная 🔴", "Согласная 🔵"], correctAnswer: "Гласная 🔴", hint: "А, О, У, И, Ы - гласные" },
      { type: 'quiz', question: "Буква М - это...", options: ["Гласная 🔴", "Согласная 🔵"], correctAnswer: "Согласная 🔵", hint: "М, Н, Л, Р - согласные" },
      { type: 'find', question: "Выбери гласные буквы:", options: ["А", "М", "О", "К", "У"], correctAnswer: ["А", "О", "У"], hint: "Гласные можно петь" },
      { type: 'find', question: "Выбери согласные буквы:", options: ["П", "А", "С", "И", "Т"], correctAnswer: ["П", "С", "Т"], hint: "Согласные произносятся с преградой" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь буквы! 🔤" }
  },
  {
    title: "Транспорт",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-indigo-400",
    tasks: [
      { type: 'quiz', question: "Что летает в небе?", options: ["Машина 🚗", "Самолёт ✈️", "Корабль 🚢"], correctAnswer: "Самолёт ✈️", hint: "У самолёта есть крылья" },
      { type: 'find', question: "Выбери транспорт:", options: ["Машина 🚗", "Стол 🪑", "Автобус 🚌", "Дерево 🌳", "Велосипед 🚲"], correctAnswer: ["Машина 🚗", "Автобус 🚌", "Велосипед 🚲"], hint: "Транспорт - это то, на чём ездят" },
      { type: 'quiz', question: "Корабль плавает...", options: ["В небе", "На дороге", "По воде 🌊"], correctAnswer: "По воде 🌊", hint: "Корабли плавают по морям и рекам" },
      { type: 'quiz', question: "Сколько колёс у велосипеда?", options: ["2", "3", "4"], correctAnswer: "2", hint: "Велосипед = два колеса" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь транспорт! 🚗" }
  },
  {
    title: "Профессии",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Кто лечит людей?", options: ["Учитель", "Врач 👨‍⚕️", "Повар"], correctAnswer: "Врач 👨‍⚕️", hint: "Врач даёт лекарства" },
      { type: 'quiz', question: "Кто учит детей в школе?", options: ["Врач", "Повар", "Учитель 👩‍🏫"], correctAnswer: "Учитель 👩‍🏫", hint: "Учитель проводит уроки" },
      { type: 'find', question: "Выбери профессии:", options: ["Врач", "Стол", "Повар", "Книга", "Пожарный"], correctAnswer: ["Врач", "Повар", "Пожарный"], hint: "Профессия - это работа" },
      { type: 'quiz', question: "Кто готовит еду?", options: ["Учитель", "Повар 👨‍🍳", "Врач"], correctAnswer: "Повар 👨‍🍳", hint: "Повар готовит вкусную еду" }
    ],
    reward: { stars: 3, message: "Молодец! Ты знаешь профессии! 👨‍⚕️" }
  },
  {
    title: "Семья",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Папа и мама - это...", options: ["Братья", "Родители", "Друзья"], correctAnswer: "Родители", hint: "Родители - это папа и мама" },
      { type: 'find', question: "Выбери членов семьи:", options: ["Мама 👩", "Друг", "Папа 👨", "Сосед", "Бабушка 👵"], correctAnswer: ["Мама 👩", "Папа 👨", "Бабушка 👵"], hint: "Семья - самые близкие люди" },
      { type: 'quiz', question: "Брат мамы - это...", options: ["Дядя", "Дедушка", "Папа"], correctAnswer: "Дядя", hint: "Брат мамы или папы - дядя" },
      { type: 'quiz', question: "Мама мамы - это...", options: ["Тётя", "Бабушка 👵", "Сестра"], correctAnswer: "Бабушка 👵", hint: "Мама мамы или папы - бабушка" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь семью! 👨‍👩‍👧‍👦" }
  }
]
