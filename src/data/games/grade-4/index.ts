// Экспорт игр для 4 класса
import { GameLesson } from '../types'

export const fourthGradeGames: GameLesson[] = [
  // ========== МАТЕМАТИКА ==========
  {
    title: "Многозначные числа",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько сотен в числе 3521?", options: ["3", "5", "52"], correctAnswer: "5", hint: "3 тысячи, 5 сотен, 2 десятка, 1 единица" },
      { type: 'quiz', question: "Какое число больше: 4050 или 4500?", options: ["4050", "4500", "Они равны"], correctAnswer: "4500", hint: "Сравни разряды слева направо" },
      { type: 'fill', question: "5432 + 1234 = __", correctAnswer: "6666", hint: "Сложи поразрядно" },
      { type: 'quiz', question: "Округли 347 до сотен:", options: ["300", "340", "350"], correctAnswer: "300", hint: "47 < 50, значит округляем вниз" }
    ],
    reward: { stars: 3, message: "Отлично! Ты работаешь с большими числами! 🔢" }
  },
  {
    title: "Действия с числами",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "25 × 4 = ?", options: ["80", "100", "125"], correctAnswer: "100", hint: "25 × 4 = 100" },
      { type: 'quiz', question: "144 ÷ 12 = ?", options: ["10", "11", "12"], correctAnswer: "12", hint: "12 × 12 = 144" },
      { type: 'fill', question: "1000 - 367 = __", correctAnswer: "633", hint: "Вычти поразрядно" },
      { type: 'find', question: "Выбери верные равенства:", options: ["15×4=60", "72÷8=9", "100÷25=5", "16×5=80"], correctAnswer: ["15×4=60", "72÷8=9", "16×5=80"], hint: "Проверь каждое" }
    ],
    reward: { stars: 3, message: "Супер! Ты отлично считаешь! ✖️➗" }
  },
  {
    title: "Задачи на скорость",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Скорость 60 км/ч, время 2 ч. Какое расстояние?", options: ["30 км", "62 км", "120 км"], correctAnswer: "120 км", hint: "S = v × t" },
      { type: 'quiz', question: "Расстояние 180 км, время 3 ч. Найди скорость.", options: ["60 км/ч", "90 км/ч", "540 км/ч"], correctAnswer: "60 км/ч", hint: "v = S ÷ t" },
      { type: 'fill', question: "Скорость 50 км/ч, время 4 ч. Расстояние = __ км", correctAnswer: "200", hint: "S = 50 × 4" },
      { type: 'quiz', question: "Формула расстояния?", options: ["S = v × t", "v = S × t", "t = S × v"], correctAnswer: "S = v × t", hint: "Расстояние = скорость × время" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь задачи на движение! 🚗" }
  },
  {
    title: "Дроби и действия",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "1/2 + 1/4 = ?", options: ["1/6", "2/6", "3/4"], correctAnswer: "3/4", hint: "Приведи к общему знаменателю: 2/4 + 1/4" },
      { type: 'quiz', question: "3/4 - 1/4 = ?", options: ["2/4", "2/0", "1/2"], correctAnswer: "2/4", hint: "3/4 - 1/4 = 2/4 = 1/2" },
      { type: 'find', question: "Выбери равные дроби:", options: ["1/2 = 2/4", "1/3 = 2/6", "2/3 = 4/9", "3/4 = 6/8"], correctAnswer: ["1/2 = 2/4", "1/3 = 2/6", "3/4 = 6/8"], hint: "Умножь числитель и знаменатель на одно число" },
      { type: 'fill', question: "2/5 от 100 = __", correctAnswer: "40", hint: "100 ÷ 5 × 2 = 40" }
    ],
    reward: { stars: 3, message: "Умница! Ты понимаешь дроби! 📊" }
  },

  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Спряжения глаголов",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Глагол «писать» - какого спряжения?", options: ["I спряжение", "II спряжение"], correctAnswer: "I спряжение", hint: "ПишЕШЬ - окончание -ЕШЬ (I спр.)" },
      { type: 'quiz', question: "Глагол «говорить» - какого спряжения?", options: ["I спряжение", "II спряжение"], correctAnswer: "II спряжение", hint: "ГоворИШЬ - окончание -ИШЬ (II спр.)" },
      { type: 'find', question: "Выбери глаголы II спряжения:", options: ["Делать", "Смотреть", "Видеть", "Говорить", "Читать"], correctAnswer: ["Смотреть", "Видеть", "Говорить"], hint: "II спряжение - окончания -ИТЬ, исключения" },
      { type: 'fill', question: "Они пиш__т (I спр.)", correctAnswer: "ут", hint: "I спряжение, 3 лицо мн.ч. - -УТ/-ЮТ" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь спряжения! 📝" }
  },
  {
    title: "Непроизносимые согласные",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'fill', question: "Вставь букву: Сер__це (сердечный)", correctAnswer: "д", hint: "Проверочное слово - сердечный" },
      { type: 'quiz', question: "Как проверить непроизносимую согласную?", options: ["Подобрать проверочное слово", "Посмотреть в словаре", "Написать без неё"], correctAnswer: "Подобрать проверочное слово", hint: "Нужно, чтобы согласная слышалась чётко" },
      { type: 'find', question: "Выбери слова с непроизносимой согласной:", options: ["Солнце (солнечный)", "Звезда (звёздный)", "Праздник (праздный)", "Чудесный", "Местный (место)"], correctAnswer: ["Солнце (солнечный)", "Звезда (звёздный)", "Праздник (праздный)", "Местный (место)"], hint: "Проверь, произносится ли согласная" },
      { type: 'fill', question: "Чес__ный (честен) - честный", correctAnswer: "т", hint: "Честен - проверочное слово" }
    ],
    reward: { stars: 3, message: "Супер! Ты проверяешь согласные! ✅" }
  },
  {
    title: "Однородные члены",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Какой знак ставится между однородными членами без союза?", options: ["Запятая", "Тире", "Двоеточие"], correctAnswer: "Запятая", hint: "Однородные члены без союза разделяются запятыми" },
      { type: 'quiz', question: "Какой союз не требует запятой?", options: ["А", "И", "Но"], correctAnswer: "И", hint: "Перед И однородные члены не разделяются запятой" },
      { type: 'find', question: "Найди предложения с однородными членами:", options: ["Кошка спит.", "Кошка ест и спит.", "На столе лежат книги, тетради и ручки.", "Дети играют."], correctAnswer: ["Кошка ест и спит.", "На столе лежат книги, тетради и ручки."], hint: "Однородные члены отвечают на один вопрос" },
      { type: 'quiz', question: "«В саду растут яблони, груши ___ сливы.» Какой знак?", options: ["Запятая", "Без знака", "Точка с запятой"], correctAnswer: "Без знака", hint: "Перед И запятая не ставится" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь синтаксис! 📚" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Былины",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Кто главный герой былины об Илье Муромце?", options: ["Добрыня Никитич", "Илья Муромец", "Алёша Попович"], correctAnswer: "Илья Муромец", hint: "Былина так и называется" },
      { type: 'quiz', question: "Сколько лет лежал Илья Муромец?", options: ["10 лет", "33 года", "50 лет"], correctAnswer: "33 года", hint: "«Тридцать три года лежал Илья...»" },
      { type: 'find', question: "Выбери русских богатырей:", options: ["Илья Муромец", "Змей Горыныч", "Добрыня Никитич", "Баба Яга", "Алёша Попович"], correctAnswer: ["Илья Муромец", "Добрыня Никитич", "Алёша Попович"], hint: "Три главных богатыря" },
      { type: 'quiz', question: "Что такое былина?", options: ["Сказка", "Русская эпическая песня", "Стихотворение"], correctAnswer: "Русская эпическая песня", hint: "Былина рассказывает о подвигах богатырей" }
    ],
    reward: { stars: 3, message: "Прекрасно! Ты знаешь былины! ⚔️" }
  },
  {
    title: "Поэзия XIX века",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Кто написал «Бородино»?", options: ["Пушкин", "Лермонтов", "Тютчев"], correctAnswer: "Лермонтов", hint: "Михаил Юрьевич Лермонтов" },
      { type: 'quiz', question: "Кого называют «солнцем русской поэзии»?", options: ["Лермонтова", "Пушкина", "Есенина"], correctAnswer: "Пушкина", hint: "Александр Сергеевич Пушкин" },
      { type: 'find', question: "Выбери поэтов XIX века:", options: ["Пушкин", "Есенин", "Лермонтов", "Маяковский", "Фет"], correctAnswer: ["Пушкин", "Лермонтов", "Фет"], hint: "XIX век - золотой век русской поэзии" },
      { type: 'quiz', question: "Кто написал «Парус»?", options: ["Пушкин", "Лермонтов", "Тютчев"], correctAnswer: "Лермонтов", hint: "«Белеет парус одинокой...»" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь поэзию! 📖" }
  },

  // ========== ОКРУЖАЮЩИЙ МИР ==========
  {
    title: "История Древней Руси",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Кто крестил Русь?", options: ["Иван Грозный", "Князь Владимир", "Пётр I"], correctAnswer: "Князь Владимир", hint: "Владимир Святославич в 988 году" },
      { type: 'quiz', question: "В каком году была крещена Русь?", options: ["862", "988", "1147"], correctAnswer: "988", hint: "Крещение Руси - 988 год" },
      { type: 'find', question: "Выбери города Древней Руси:", options: ["Москва", "Киев", "Новгород", "Санкт-Петербург"], correctAnswer: ["Киев", "Новгород"], hint: "Москва и СПб основаны позже" },
      { type: 'quiz', question: "Кто призван на княжение в Новгород?", options: ["Олег", "Рюрик", "Владимир"], correctAnswer: "Рюрик", hint: "862 год - призвание варягов" }
    ],
    reward: { stars: 3, message: "Здорово! Ты знаешь историю! 🏰" }
  },
  {
    title: "Организм человека",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какой орган перекачивает кровь?", options: ["Лёгкие", "Сердце", "Печень"], correctAnswer: "Сердце", hint: "Сердце - главный орган кровеносной системы" },
      { type: 'quiz', question: "Где происходит газообмен?", options: ["В сердце", "В лёгких", "В желудке"], correctAnswer: "В лёгких", hint: "Лёгкие - орган дыхания" },
      { type: 'find', question: "Выбери органы пищеварения:", options: ["Сердце", "Желудок", "Кишечник", "Печень", "Лёгкие"], correctAnswer: ["Желудок", "Кишечник", "Печень"], hint: "Пищеварительная система перерабатывает пищу" },
      { type: 'quiz', question: "Сколько костей в теле взрослого человека?", options: ["156", "206", "306"], correctAnswer: "206", hint: "В скелете взрослого 206 костей" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь анатомию! 🫀" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Past Simple",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I ___ to the park yesterday.", options: ["go", "went", "going"], correctAnswer: "went", hint: "Past Simple - прошедшее время" },
      { type: 'fill', question: "She ___ (play) football last week. (played)", correctAnswer: "played", hint: "Правильный глагол + -ed" },
      { type: 'quiz', question: "Did you watch TV? - No, I ___.", options: ["didn't", "don't", "doesn't"], correctAnswer: "didn't", hint: "Отрицание в Past Simple - didn't" },
      { type: 'find', question: "Выбери формы Past Simple:", options: ["went", "goes", "saw", "see", "played"], correctAnswer: ["went", "saw", "played"], hint: "Past Simple - прошедшее время" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь Past Simple! ⏮️" }
  },
  {
    title: "Degrees of comparison",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "big - bigger - ___", options: ["biggest", "more big", "bigger"], correctAnswer: "biggest", hint: "Превосходная степень: the biggest" },
      { type: 'quiz', question: "good - better - ___", options: ["goodest", "best", "more good"], correctAnswer: "best", hint: "good - better - the best (исключение)" },
      { type: 'fill', question: "beautiful - more beautiful - __ beautiful", correctAnswer: "most", hint: "Длинные слова: more/most" },
      { type: 'find', question: "Выбери правильные сравнения:", options: ["tall-taller-tallest", "big-bigger-biggest", "good-gooder-goodest", "interesting-more interesting"], correctAnswer: ["tall-taller-tallest", "big-bigger-biggest", "interesting-more interesting"], hint: "good - better - best (исключение)" }
    ],
    reward: { stars: 3, message: "Excellent! Степени сравнения! 📈" }
  },

  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Умножение и деление",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "25 × 4 = __", correctAnswer: "100", hint: "25 × 4 = 100" },
      { type: 'fill', question: "144 ÷ 12 = __", correctAnswer: "12", hint: "12 × 12 = 144" },
      { type: 'quiz', question: "15 × 6 = ?", options: ["80", "90", "100"], correctAnswer: "90", hint: "15 × 6 = 90" },
      { type: 'quiz', question: "96 ÷ 8 = ?", options: ["10", "11", "12"], correctAnswer: "12", hint: "8 × 12 = 96" }
    ],
    reward: { stars: 3, message: "Отлично! Ты умеешь умножать и делить! ✖️➗" }
  },
  {
    title: "Единицы измерения",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько метров в 1 километре?", options: ["100", "1000", "10000"], correctAnswer: "1000", hint: "1 км = 1000 м" },
      { type: 'fill', question: "1 час = __ минут", correctAnswer: "60", hint: "В часе 60 минут" },
      { type: 'quiz', question: "Сколько граммов в 1 килограмме?", options: ["100", "1000", "10000"], correctAnswer: "1000", hint: "1 кг = 1000 г" },
      { type: 'fill', question: "2 кг 500 г = __ г", correctAnswer: "2500", hint: "2000 + 500 = 2500" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь единицы измерения! 📏" }
  },
  {
    title: "Порядок действий",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Какое действие выполняется первым: 2 + 3 × 4?", options: ["Сложение", "Умножение", "Оба вместе"], correctAnswer: "Умножение", hint: "Сначала умножение и деление" },
      { type: 'fill', question: "3 + 2 × 5 = __", correctAnswer: "13", hint: "Сначала 2 × 5 = 10, потом 3 + 10 = 13" },
      { type: 'quiz', question: "(4 + 3) × 2 = ?", options: ["10", "11", "14"], correctAnswer: "14", hint: "Сначала скобки: 7 × 2 = 14" },
      { type: 'fill', question: "10 - 2 × 3 = __", correctAnswer: "4", hint: "Сначала 2 × 3 = 6, потом 10 - 6 = 4" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь порядок действий! 🔢" }
  },
  {
    title: "Имя прилагательное",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Имя прилагательное обозначает:", options: ["Предмет", "Признак предмета", "Действие"], correctAnswer: "Признак предмета", hint: "Прилагательное отвечает на «какой? какая? какое?»" },
      { type: 'find', question: "Выбери имена прилагательные:", options: ["Красивый", "Красота", "Бежать", "Быстрый", "Синий"], correctAnswer: ["Красивый", "Быстрый", "Синий"], hint: "Прилагательные описывают предметы" },
      { type: 'quiz', question: "Прилагательное изменяется по:", options: ["Падежам", "Лицам", "Времени"], correctAnswer: "Падежам", hint: "Прилагательные изменяются по падежам, числам и родам" },
      { type: 'fill', question: "Прилагательное «большой» в женском роде: __", correctAnswer: "большая", hint: "Большой дом, большая книга" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь прилагательные! ✍️" }
  },
  {
    title: "Глагол",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Глагол обозначает:", options: ["Предмет", "Признак", "Действие"], correctAnswer: "Действие", hint: "Глагол отвечает на «что делать? что сделать?»" },
      { type: 'find', question: "Выбери глаголы:", options: ["Бежать", "Бег", "Красивый", "Писать", "Письмо"], correctAnswer: ["Бежать", "Писать"], hint: "Глаголы обозначают действия" },
      { type: 'quiz', question: "Глаголы изменяются по:", options: ["Падежам", "Временам", "Родам"], correctAnswer: "Временам", hint: "Прошедшее, настоящее, будущее время" },
      { type: 'fill', question: "Глагол «читать» в прошедшем времени: __", correctAnswer: "читал", hint: "Читать → читал" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь глаголы! 📝" }
  },
  {
    title: "Правописание приставок",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Приставки на -з/-с: какой согласный пишется перед к?", options: ["-з", "-с", "Любой"], correctAnswer: "-с", hint: "Перед к, п, т пишется -с (без-, бес-)" },
      { type: 'fill', question: "Бе__шумный (з/с)", correctAnswer: "с", hint: "Бесшумный - перед ш пишется с" },
      { type: 'find', question: "Выбери слова с приставкой на -з:", options: ["Беззвездный", "Бесконечный", "Безопасный", "Бесшумный", "Беззаботный"], correctAnswer: ["Беззвездный", "Безопасный", "Беззаботный"], hint: "-з перед звонкими, -с перед глухими" },
      { type: 'quiz', question: "В слове «расписать» пишется:", options: ["з", "с"], correctAnswer: "с", hint: "Расписать - перед п пишется с" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь приставки! 📖" }
  },
  {
    title: "Сказки зарубежных писателей",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Кто написал «Русалочка»?", options: ["Андерсен", "Братья Гримм", "Перро"], correctAnswer: "Андерсен", hint: "Ганс Христиан Андерсен" },
      { type: 'quiz', question: "Кто автор «Золушки»?", options: ["Андерсен", "Братья Гримм", "Перро"], correctAnswer: "Перро", hint: "Шарль Перро - французский сказочник" },
      { type: 'find', question: "Выбери сказки Андерсена:", options: ["Русалочка", "Золушка", "Снежная королева", "Белоснежка", "Дюймовочка"], correctAnswer: ["Русалочка", "Снежная королева", "Дюймовочка"], hint: "Андерсен - датский сказочник" },
      { type: 'quiz', question: "«Бременские музыканты» - авторы:", options: ["Андерсен", "Братья Гримм", "Перро"], correctAnswer: "Братья Гримм", hint: "Немецкие сказочники" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь зарубежные сказки! 📚" }
  },
  {
    title: "Природа России",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какое животное - символ России?", options: ["Тигр", "Медведь", "Лиса"], correctAnswer: "Медведь", hint: "Бурый медведь - символ России" },
      { type: 'find', question: "Выбери растения России:", options: ["Берёза", "Кактус", "Ель", "Пальма", "Ромашка"], correctAnswer: ["Берёза", "Ель", "Ромашка"], hint: "Типичные растения России" },
      { type: 'quiz', question: "Самое глубокое озеро в мире:", options: ["Каспийское", "Байкал", "Ладожское"], correctAnswer: "Байкал", hint: "Байкал - глубочайшее озеро" },
      { type: 'fill', question: "Столица России - __", correctAnswer: "Москва", hint: "Москва - столица нашей страны" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Россию! 🇷🇺" }
  },
  {
    title: "Охрана природы",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Что такое Красная книга?", options: ["Книга о природе", "Список редких животных", "Учебник"], correctAnswer: "Список редких животных", hint: "Красная книга содержит редкие и исчезающие виды" },
      { type: 'find', question: "Выбери, что загрязняет природу:", options: ["Заводы", "Леса", "Автомобили", "Парки", "Мусор"], correctAnswer: ["Заводы", "Автомобили", "Мусор"], hint: "Источники загрязнения" },
      { type: 'quiz', question: "Почему нельзя сжигать листья?", options: ["Не красиво", "Опасный дым", "Холодно"], correctAnswer: "Опасный дым", hint: "При горении выделяются вредные вещества" },
      { type: 'quiz', question: "Сколько лет разлагается пластик?", options: ["10 лет", "100 лет", "Более 100 лет"], correctAnswer: "Более 100 лет", hint: "Пластик разлагается очень долго" }
    ],
    reward: { stars: 3, message: "Молодец! Ты бережёшь природу! 🌿" }
  },
  {
    title: "Future Simple",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I ___ visit London next summer.", options: ["will", "am", "did"], correctAnswer: "will", hint: "Future Simple: will + глагол" },
      { type: 'fill', question: "She __ come tomorrow. (will)", correctAnswer: "will", hint: "Will для всех лиц" },
      { type: 'quiz', question: "Tomorrow I ___ to school.", options: ["go", "will go", "went"], correctAnswer: "will go", hint: "Tomorrow = будущее время" },
      { type: 'find', question: "Выбери маркеры Future Simple:", options: ["Tomorrow", "Yesterday", "Next week", "Last year", "Soon"], correctAnswer: ["Tomorrow", "Next week", "Soon"], hint: "Маркеры будущего времени" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь будущее время! ⏭️" }
  },
  {
    title: "Профессии",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-indigo-400",
    tasks: [
      { type: 'quiz', question: "Кто лечит животных?", options: ["Врач", "Ветеринар", "Учитель"], correctAnswer: "Ветеринар", hint: "Ветеринар - врач для животных" },
      { type: 'find', question: "Выбери профессии:", options: ["Врач", "Стол", "Учитель", "Книга", "Пожарный"], correctAnswer: ["Врач", "Учитель", "Пожарный"], hint: "Профессии - это работа" },
      { type: 'quiz', question: "Кто строит дома?", options: ["Врач", "Строитель", "Повар"], correctAnswer: "Строитель", hint: "Строитель создаёт здания" },
      { type: 'quiz', question: "Кто преподаёт в школе?", options: ["Врач", "Строитель", "Учитель"], correctAnswer: "Учитель", hint: "Учитель обучает детей" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь профессии! 👨‍⚕️" }
  },

  // ========== НОВЫЕ ИГРЫ v3.42 ==========
  {
    title: "Площадь и периметр",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Формула периметра квадрата:", options: ["P = 4a", "P = a²", "P = 2a"], correctAnswer: "P = 4a", hint: "У квадрата 4 равные стороны" },
      { type: 'fill', question: "Периметр квадрата со стороной 5 см = __ см", correctAnswer: "20", hint: "P = 4 × 5 = 20" },
      { type: 'quiz', question: "Формула площади прямоугольника:", options: ["S = a + b", "S = a × b", "S = 2(a + b)"], correctAnswer: "S = a × b", hint: "Площадь = длина × ширина" },
      { type: 'fill', question: "Площадь прямоугольника 6 × 4 = __ см²", correctAnswer: "24", hint: "S = 6 × 4 = 24" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь площадь и периметр! 📐" }
  },
  {
    title: "Уравнения",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "x + 15 = 30, x = __", correctAnswer: "15", hint: "x = 30 - 15" },
      { type: 'fill', question: "x - 8 = 12, x = __", correctAnswer: "20", hint: "x = 12 + 8" },
      { type: 'fill', question: "x × 4 = 24, x = __", correctAnswer: "6", hint: "x = 24 ÷ 4" },
      { type: 'fill', question: "x ÷ 3 = 9, x = __", correctAnswer: "27", hint: "x = 9 × 3" }
    ],
    reward: { stars: 3, message: "Супер! Ты решаешь уравнения! ✖️" }
  },
  {
    title: "Склонения существительных",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "К какому склонению относятся слова на -а, -я (мама, дядя)?", options: ["1 склонение", "2 склонение", "3 склонение"], correctAnswer: "1 склонение", hint: "1 склонение - ж.р. и м.р. на -а, -я" },
      { type: 'quiz', question: "К какому склонению относится слово «стол»?", options: ["1 склонение", "2 склонение", "3 склонение"], correctAnswer: "2 склонение", hint: "2 склонение - м.р. без окончания, ср.р. на -о, -е" },
      { type: 'find', question: "Выбери слова 3 склонения:", options: ["Мышь", "Степь", "Стол", "Мама", "Ночь"], correctAnswer: ["Мышь", "Степь", "Ночь"], hint: "3 склонение - ж.р. на -ь" },
      { type: 'fill', question: "Слово «окно» - __ склонение (число)", correctAnswer: "2", hint: "Окно - ср.р. на -о, 2 склонение" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь склонения! 📚" }
  },
  {
    title: "Части речи",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Существительное обозначает:", options: ["Действие", "Предмет", "Признак"], correctAnswer: "Предмет", hint: "Существительное - это предмет" },
      { type: 'find', question: "Выбери существительные:", options: ["Дом", "Бежать", "Красивый", "Стол", "Писать"], correctAnswer: ["Дом", "Стол"], hint: "Существительные - это предметы" },
      { type: 'quiz', question: "Наречие отвечает на вопрос:", options: ["Кто? Что?", "Какой?", "Как? Где? Когда?"], correctAnswer: "Как? Где? Когда?", hint: "Наречие - обстоятельство" },
      { type: 'fill', question: "«Быстро» - это __ (часть речи)", correctAnswer: "наречие", hint: "Как? Быстро - это наречие" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь части речи! ✍️" }
  },
  {
    title: "Басни Крылова",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Кто автор басни «Ворона и Лисица»?", options: ["Пушкин", "Крылов", "Лермонтов"], correctAnswer: "Крылов", hint: "Иван Андреевич Крылов" },
      { type: 'find', question: "Выбери басни Крылова:", options: ["Стрекоза и Муравей", "Репка", "Квартет", "Колобок", "Лебедь, Щука и Рак"], correctAnswer: ["Стрекоза и Муравей", "Квартет", "Лебедь, Щука и Рак"], hint: "Крылов - великий баснописец" },
      { type: 'quiz', question: "Что такое мораль басни?", options: ["Вступление", "Нравоучительный вывод", "Описание"], correctAnswer: "Нравоучительный вывод", hint: "Мораль учит чему-то важному" },
      { type: 'fill', question: "«Ты всё пела? Это дело: Так поди же, __!» (попляши)", correctAnswer: "попляши", hint: "Из басни «Стрекоза и Муравей»" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь басни! 📖" }
  },
  {
    title: "Планеты Солнечной системы",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-purple-400",
    tasks: [
      { type: 'quiz', question: "Какая планета ближе всех к Солнцу?", options: ["Венера", "Меркурий", "Земля"], correctAnswer: "Меркурий", hint: "Меркурий - самая близкая к Солнцу" },
      { type: 'quiz', question: "Сколько планет в Солнечной системе?", options: ["7", "8", "9"], correctAnswer: "8", hint: "Меркурий, Венера, Земля, Марс, Юпитер, Сатурн, Уран, Нептун" },
      { type: 'find', question: "Выбери планеты:", options: ["Луна", "Земля", "Солнце", "Марс", "Юпитер"], correctAnswer: ["Земля", "Марс", "Юпитер"], hint: "Луна - спутник, Солнце - звезда" },
      { type: 'quiz', question: "Какая планета самая большая?", options: ["Земля", "Юпитер", "Сатурн"], correctAnswer: "Юпитер", hint: "Юпитер - крупнейшая планета" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь космос! 🚀" }
  },
  {
    title: "Can / Could",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I ___ swim. (умею)", options: ["can", "could", "am"], correctAnswer: "can", hint: "Can = могу/умею (настоящее)" },
      { type: 'quiz', question: "___ you help me? (можешь)", options: ["Can", "Are", "Is"], correctAnswer: "Can", hint: "Can используется для просьбы" },
      { type: 'fill', question: "She __ speak English. (can)", correctAnswer: "can", hint: "Can для всех лиц" },
      { type: 'find', question: "Выбери предложения с can/could:", options: ["I can swim", "I am swim", "Could you help?", "She can dances", "We could go"], correctAnswer: ["I can swim", "Could you help?", "We could go"], hint: "Can/Could + глагол без to" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь модальные глаголы! 🇬🇧" }
  },
  {
    title: "Геометрические фигуры",
    subject: "Математика",
    icon: "Calculator",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Сколько углов у треугольника?", options: ["2", "3", "4"], correctAnswer: "3", hint: "Тре-угольник = три угла" },
      { type: 'quiz', question: "У прямоугольника:", options: ["Все стороны равны", "Противоположные стороны равны", "Нет углов"], correctAnswer: "Противоположные стороны равны", hint: "У прямоугольника 4 прямых угла" },
      { type: 'find', question: "Выбери фигуры с 4 углами:", options: ["Квадрат", "Треугольник", "Прямоугольник", "Круг", "Ромб"], correctAnswer: ["Квадрат", "Прямоугольник", "Ромб"], hint: "Четырёхугольники" },
      { type: 'fill', question: "У квадрата __ угла", correctAnswer: "4", hint: "У квадрата 4 прямых угла" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь геометрические фигуры! 🔷" }
  }
]
