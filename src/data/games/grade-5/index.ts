// Экспорт игр для 5 класса
import { GameLesson } from '../types'

export const fifthGradeGames: GameLesson[] = [
  // ========== МАТЕМАТИКА ==========
  {
    title: "Обыкновенные дроби",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сократи дробь: 6/8", options: ["3/4", "2/3", "1/2"], correctAnswer: "3/4", hint: "Раздели числитель и знаменатель на 2" },
      { type: 'quiz', question: "Приведи к общему знаменателю: 1/2 и 1/3", options: ["3/6 и 2/6", "2/6 и 3/6", "1/6 и 1/6"], correctAnswer: "3/6 и 2/6", hint: "Общий знаменатель = 6" },
      { type: 'fill', question: "2/5 + 1/5 = __/5", correctAnswer: "3", hint: "Сложи числители" },
      { type: 'quiz', question: "Какая дробь больше: 2/3 или 3/4?", options: ["2/3", "3/4", "Они равны"], correctAnswer: "3/4", hint: "Приведи к общему знаменателю: 8/12 vs 9/12" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь дроби! 📊" }
  },
  {
    title: "Десятичные дроби",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "0,5 + 0,3 = ?", options: ["0,53", "0,8", "0,35"], correctAnswer: "0,8", hint: "Сложи как обычные числа" },
      { type: 'quiz', question: "0,25 × 4 = ?", options: ["0,100", "1", "1,00"], correctAnswer: "1", hint: "25 × 4 = 100, значит 0,25 × 4 = 1" },
      { type: 'fill', question: "1,5 - 0,7 = __", correctAnswer: "0,8", hint: "15 - 7 = 8" },
      { type: 'find', question: "Выбери равные дроби:", options: ["0,5 = 1/2", "0,25 = 1/4", "0,3 = 1/3", "0,75 = 3/4"], correctAnswer: ["0,5 = 1/2", "0,25 = 1/4", "0,75 = 3/4"], hint: "0,3 ≈ 1/3, но не равно" }
    ],
    reward: { stars: 3, message: "Супер! Ты работаешь с десятичными дробями! 🔢" }
  },
  {
    title: "Проценты",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "50% от 100 = ?", options: ["25", "50", "75"], correctAnswer: "50", hint: "50% = 1/2 от числа" },
      { type: 'quiz', question: "25% от 200 = ?", options: ["25", "50", "100"], correctAnswer: "50", hint: "25% = 1/4 от числа" },
      { type: 'fill', question: "10% от 500 = __", correctAnswer: "50", hint: "10% = 1/10 от числа" },
      { type: 'quiz', question: "Сколько процентов составляет 1/4?", options: ["10%", "25%", "50%"], correctAnswer: "25%", hint: "1/4 = 25/100 = 25%" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь проценты! 💯" }
  },
  {
    title: "Уравнения",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "x + 5 = 12, x = __", correctAnswer: "7", hint: "x = 12 - 5" },
      { type: 'fill', question: "x - 8 = 15, x = __", correctAnswer: "23", hint: "x = 15 + 8" },
      { type: 'fill', question: "3x = 18, x = __", correctAnswer: "6", hint: "x = 18 ÷ 3" },
      { type: 'quiz', question: "Решить: 2x + 4 = 14", options: ["x = 5", "x = 7", "x = 10"], correctAnswer: "x = 5", hint: "2x = 10, x = 5" }
    ],
    reward: { stars: 3, message: "Умница! Ты решаешь уравнения! 📐" }
  },

  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Причастия",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Причастие - это...", options: ["Глагол", "Прилагательное", "Особая форма глагола"], correctAnswer: "Особая форма глагола", hint: "Причастие обозначает признак по действию" },
      { type: 'find', question: "Выбери причастия:", options: ["Читающий", "Читать", "Прочитанный", "Интересный", "Пишущий"], correctAnswer: ["Читающий", "Прочитанный", "Пишущий"], hint: "Причастия отвечают на вопрос «какой?» и имеют признаки глагола" },
      { type: 'quiz', question: "Какой признак причастия от глагола?", options: ["Время", "Вид", "Род"], correctAnswer: "Время", hint: "Причастия бывают настоящего и прошедшего времени" },
      { type: 'fill', question: "Действие, которое совершает сам предмет - __ причастие", correctAnswer: "действительное", hint: "Действительные причастия" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь причастия! 📚" }
  },
  {
    title: "Деепричастия",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Деепричастие обозначает...", options: ["Признак предмета", "Добавочное действие", "Основное действие"], correctAnswer: "Добавочное действие", hint: "Деепричастие отвечает на вопросы «что делая? что сделав?»" },
      { type: 'find', question: "Выбери деепричастия:", options: ["Читая", "Читать", "Прочитав", "Читающий", "Идя"], correctAnswer: ["Читая", "Прочитав", "Идя"], hint: "Деепричастия оканчиваются на -а, -я, -в, -вши" },
      { type: 'quiz', question: "Деепричастие неизменяемо по...", options: ["Роду и числу", "По всем признакам", "По падежам"], correctAnswer: "По всем признакам", hint: "Деепричастие - неизменяемая форма" },
      { type: 'quiz', question: "Как выделяется деепричастный оборот?", options: ["Запятыми", "Тире", "Не выделяется"], correctAnswer: "Запятыми", hint: "Деепричастный оборот обособляется" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь деепричастия! ✍️" }
  },
  {
    title: "Синтаксис сложного предложения",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Сложносочинённое предложение - это...", options: ["С союзом И, А, НО", "С союзами ЧТО, КОГДА", "Без союзов"], correctAnswer: "С союзом И, А, НО", hint: "Союзы сочинения: и, а, но, или" },
      { type: 'quiz', question: "Сложноподчинённое предложение - это...", options: ["С союзом И, А, НО", "С союзами ЧТО, КОГДА", "Без союзов"], correctAnswer: "С союзами ЧТО, КОГДА", hint: "Союзы подчинения: что, когда, если, потому что" },
      { type: 'find', question: "Выбери сложноподчинённые предложения:", options: ["Я пошёл домой, когда закончил работу.", "Светило солнце, и пели птицы.", "Я знаю, что ты придёшь.", "Дождь шёл, но мы гуляли."], correctAnswer: ["Я пошёл домой, когда закончил работу.", "Я знаю, что ты придёшь."], hint: "Сложноподчинённые с союзами когда, что" },
      { type: 'quiz', question: "Сколько грамматических основ в сложном предложении?", options: ["Одна", "Две или больше", "Три"], correctAnswer: "Две или больше", hint: "Сложное = 2+ простых предложений" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь синтаксис! 📖" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Басни и их особенности",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Что такое мораль басни?", options: ["Вступление", "Нравоучительный вывод", "Описание героев"], correctAnswer: "Нравоучительный вывод", hint: "Мораль - это главный урок басни" },
      { type: 'quiz', question: "Кто автор басни «Ворона и Лисица»?", options: ["Крылов", "Пушкин", "Лермонтов"], correctAnswer: "Крылов", hint: "Иван Андреевич Крылов" },
      { type: 'find', question: "Выбери особенности басни:", options: ["Аллегория", "Мораль", "Сказочные герои", "Краткость", "Юмор"], correctAnswer: ["Аллегория", "Мораль", "Краткость", "Юмор"], hint: "Басня - краткий рассказ с моралью" },
      { type: 'quiz', question: "Что такое аллегория в басне?", options: ["Иносказание", "Прямое описание", "Сравнение"], correctAnswer: "Иносказание", hint: "Аллегория = иносказание, животные = люди" }
    ],
    reward: { stars: 3, message: "Прекрасно! Ты понимаешь жанр басни! 📚" }
  },
  {
    title: "Сказки Пушкина",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Сколько лет ждал старик золотую рыбку?", options: ["30 лет и 3 года", "33 года", "35 лет"], correctAnswer: "30 лет и 3 года", hint: "«Жил старик со своею старухой у самого синего моря...»" },
      { type: 'quiz', question: "Кто превратился в лебедя в сказке о царе Салтане?", options: ["Царевна", "Царица", "Ткачиха"], correctAnswer: "Царевна", hint: "Царевна-лебедь" },
      { type: 'find', question: "Выбери сказки Пушкина:", options: ["Сказка о рыбаке и рыбке", "Сказка о мёртвой царевне", "Конёк-горбунок", "Сказка о попе", "Теремок"], correctAnswer: ["Сказка о рыбаке и рыбке", "Сказка о мёртвой царевне", "Сказка о попе"], hint: "Александр Сергеевич Пушкин" },
      { type: 'fill', question: "«Сказка о __ и о работнике его Балде»", correctAnswer: "попе", hint: "Поп нанял Балду" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь сказки Пушкина! ✨" }
  },

  // ========== ИСТОРИЯ ==========
  {
    title: "Древний Египет",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Какая река была главной в Египте?", options: ["Евфрат", "Нил", "Тигр"], correctAnswer: "Нил", hint: "Нил - главная река Египта" },
      { type: 'quiz', question: "Для чего строили пирамиды?", options: ["Для жилья", "Для фараонов (гробницы)", "Для храмов"], correctAnswer: "Для фараонов (гробницы)", hint: "Пирамиды - гробницы фараонов" },
      { type: 'find', question: "Выбери достижения египтян:", options: ["Иероглифы", "Пирамиды", "Колесо", "Папирус", "Бумага"], correctAnswer: ["Иероглифы", "Пирамиды", "Папирус"], hint: "Египтяне изобрели иероглифы и папирус" },
      { type: 'quiz', question: "Кто был правителем Египта?", options: ["Царь", "Фараон", "Император"], correctAnswer: "Фараон", hint: "Фараон - правитель Древнего Египта" }
    ],
    reward: { stars: 3, message: "Здорово! Ты знаешь Древний Египет! 🏛️" }
  },
  {
    title: "Древняя Греция",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Как называлось греческое государство-город?", options: ["Полис", "Империя", "Царство"], correctAnswer: "Полис", hint: "Полис - город-государство в Греции" },
      { type: 'quiz', question: "Где проходили Олимпийские игры?", options: ["В Афинах", "В Олимпии", "В Спарте"], correctAnswer: "В Олимпии", hint: "Олимпия - место первых Олимпийских игр" },
      { type: 'find', question: "Выбери греческих богов:", options: ["Зевс", "Юпитер", "Афина", "Посейдон", "Тор"], correctAnswer: ["Зевс", "Афина", "Посейдон"], hint: "Зевс, Афина, Посейдон - греческие боги" },
      { type: 'quiz', question: "Кто написал «Илиаду» и «Одиссею»?", options: ["Сократ", "Гомер", "Платон"], correctAnswer: "Гомер", hint: "Гомер - автор «Илиады» и «Одиссеи»" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Древнюю Грецию! 🏺" }
  },

  // ========== БИОЛОГИЯ ==========
  {
    title: "Клетка",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какая часть клетки хранит наследственную информацию?", options: ["Ядро", "Цитоплазма", "Мембрана"], correctAnswer: "Ядро", hint: "Ядро содержит ДНК" },
      { type: 'quiz', question: "Что такое цитоплазма?", options: ["Оболочка клетки", "Внутренняя среда клетки", "Ядро"], correctAnswer: "Внутренняя среда клетки", hint: "Цитоплазма заполняет клетку" },
      { type: 'find', question: "Выбери части клетки:", options: ["Ядро", "Сердце", "Митохондрии", "Лёгкие", "Мембрана"], correctAnswer: ["Ядро", "Митохондрии", "Мембрана"], hint: "Органоиды клетки" },
      { type: 'quiz', question: "Какой органоид называют «энергетической станцией»?", options: ["Ядро", "Митохондрия", "Рибосома"], correctAnswer: "Митохондрия", hint: "Митохондрии вырабатывают энергию" }
    ],
    reward: { stars: 3, message: "Замечательно! Ты знаешь строение клетки! 🔬" }
  },
  {
    title: "Царства живой природы",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'find', question: "Выбери царства живой природы:", options: ["Бактерии", "Грибы", "Растения", "Камни", "Животные"], correctAnswer: ["Бактерии", "Грибы", "Растения", "Животные"], hint: "4 царства: бактерии, грибы, растения, животные" },
      { type: 'quiz', question: "Какое царство делает фотосинтез?", options: ["Бактерии", "Растения", "Животные"], correctAnswer: "Растения", hint: "Растения содержат хлорофилл" },
      { type: 'quiz', question: "Грибы - это...", options: ["Растения", "Животные", "Отдельное царство"], correctAnswer: "Отдельное царство", hint: "Грибы - отдельное царство живой природы" },
      { type: 'quiz', question: "Какое царство самое древнее?", options: ["Бактерии", "Грибы", "Растения"], correctAnswer: "Бактерии", hint: "Бактерии появились первыми на Земле" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь классификацию! 🌿" }
  },

  // ========== ГЕОГРАФИЯ ==========
  {
    title: "План и карта",
    subject: "География",
    icon: "Map",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Что показывает масштаб?", options: ["Расстояние", "Во сколько раз уменьшено", "Направление"], correctAnswer: "Во сколько раз уменьшено", hint: "Масштаб показывает степень уменьшения" },
      { type: 'quiz', question: "Как называется линия на карте, соединяющая точки с одинаковой высотой?", options: ["Меридиан", "Изобара", "Горизонталь"], correctAnswer: "Горизонталь", hint: "Горизонтали показывают рельеф" },
      { type: 'find', question: "Выбери стороны горизонта:", options: ["Север", "Верх", "Юг", "Лево", "Восток"], correctAnswer: ["Север", "Юг", "Восток"], hint: "Север, юг, восток, запад" },
      { type: 'fill', question: "Масштаб 1:1000 означает 1 см на карте = __ см на местности", correctAnswer: "1000", hint: "В 1000 раз больше" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь карты! 🗺️" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Present Perfect",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I have ___ this book.", options: ["read", "readed", "reading"], correctAnswer: "read", hint: "Present Perfect: have + V3 (3-я форма)" },
      { type: 'fill', question: "She has ___ (visit) London. (visited)", correctAnswer: "visited", hint: "has + V3 (правильный глагол + -ed)" },
      { type: 'quiz', question: "Present Perfect используется для...", options: ["Действий в прошлом", "Действий с результатом в настоящем", "Будущих действий"], correctAnswer: "Действий с результатом в настоящем", hint: "Результат важен сейчас" },
      { type: 'find', question: "Выбери маркеры Present Perfect:", options: ["Yesterday", "Just", "Last week", "Already", "Ever"], correctAnswer: ["Just", "Already", "Ever"], hint: "Just, already, ever, never, yet" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь Present Perfect! ✨" }
  },
  {
    title: "Modal Verbs",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I ___ swim. (могу)", options: ["can", "must", "should"], correctAnswer: "can", hint: "Can = мочь, уметь" },
      { type: 'quiz', question: "You ___ do your homework. (должен)", options: ["can", "must", "may"], correctAnswer: "must", hint: "Must = должен (обязанность)" },
      { type: 'quiz', question: "You ___ see a doctor. (следовало бы)", options: ["can", "must", "should"], correctAnswer: "should", hint: "Should = следует, совет" },
      { type: 'fill', question: "__ I come in? (Можно?) - May", correctAnswer: "May", hint: "May = можно (просьба разрешения)" }
    ],
    reward: { stars: 3, message: "Excellent! Модальные глаголы! 🇬🇧" }
  },

  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Деление и умножение",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "12 ÷ 4 = __", correctAnswer: "3", hint: "Сколько раз 4 помещается в 12?" },
      { type: 'fill', question: "7 × 8 = __", correctAnswer: "56", hint: "Таблица умножения" },
      { type: 'quiz', question: "72 ÷ 9 = ?", options: ["7", "8", "9"], correctAnswer: "8", hint: "9 × 8 = 72" },
      { type: 'fill', question: "45 ÷ __ = 9", correctAnswer: "5", hint: "Какое число умножить на 9 = 45?" }
    ],
    reward: { stars: 3, message: "Отлично! Ты владеешь умножением и делением! ✖️➗" }
  },
  {
    title: "Площадь и периметр",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Периметр квадрата со стороной 5:", options: ["10", "20", "25"], correctAnswer: "20", hint: "P = 4 × a = 4 × 5" },
      { type: 'fill', question: "Площадь прямоугольника 3 × 4 = __", correctAnswer: "12", hint: "S = a × b" },
      { type: 'quiz', question: "Периметр прямоугольника 2 × 3:", options: ["5", "6", "10"], correctAnswer: "10", hint: "P = 2(a + b) = 2(2 + 3)" },
      { type: 'fill', question: "Площадь квадрата со стороной 6 = __", correctAnswer: "36", hint: "S = a² = 6²" }
    ],
    reward: { stars: 3, message: "Супер! Ты умеешь находить площадь и периметр! 📐" }
  },
  {
    title: "Имя существительное",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Имя существительное обозначает:", options: ["Действие", "Предмет", "Признак"], correctAnswer: "Предмет", hint: "Существительное = предмет" },
      { type: 'find', question: "Выбери имена существительные:", options: ["Бег", "Бежать", "Красота", "Красивый", "Стол"], correctAnswer: ["Бег", "Красота", "Стол"], hint: "Существительные отвечают на «кто?» «что?»" },
      { type: 'quiz', question: "Сколько падежей в русском языке?", options: ["5", "6", "7"], correctAnswer: "6", hint: "И, Р, Д, В, Т, П" },
      { type: 'quiz', question: "Какой падеж отвечает на вопрос «кого? чего?»?", options: ["Именительный", "Родительный", "Дательный"], correctAnswer: "Родительный", hint: "Родительный падеж - нет кого? чего?" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь имя существительное! 📚" }
  },
  {
    title: "Корень слова",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Корень - это:", options: ["Изменяемая часть", "Общая часть родственных слов", "Окончание"], correctAnswer: "Общая часть родственных слов", hint: "В корне заключён общий смысл" },
      { type: 'find', question: "Выбери однокоренные слова к слову «лес»:", options: ["Лесник", "Лестница", "Лесной", "Лесть", "Перелесок"], correctAnswer: ["Лесник", "Лесной", "Перелесок"], hint: "Однокоренные слова имеют общий корень" },
      { type: 'fill', question: "В слове «подосиновик» корень __", correctAnswer: "осин", hint: "Под-осин-овик" },
      { type: 'quiz', question: "Что такое чередование звуков?", options: ["Замена одной буквы другой", "Замена одного звука другим", "Удвоение согласных"], correctAnswer: "Замена одного звука другим", hint: "Например: бег - бежишь (г//ж)" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь состав слова! ✍️" }
  },
  {
    title: "Древняя Русь",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Кто основал династию русских князей?", options: ["Иван Калита", "Рюрик", "Дмитрий Донской"], correctAnswer: "Рюрик", hint: "862 год - призвание варягов" },
      { type: 'quiz', question: "Когда произошло крещение Руси?", options: ["862", "988", "1147"], correctAnswer: "988", hint: "Князь Владимир крестил Русь" },
      { type: 'find', question: "Выбери первых русских князей:", options: ["Рюрик", "Олег", "Иван Грозный", "Святослав", "Пётр I"], correctAnswer: ["Рюрик", "Олег", "Святослав"], hint: "Первые князья Древней Руси" },
      { type: 'quiz', question: "Кто объединил Киев и Новгород?", options: ["Рюрик", "Олег", "Владимир"], correctAnswer: "Олег", hint: "Вещий Олег, 882 год" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю Древней Руси! 🏰" }
  },
  {
    title: "Животные и среды обитания",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'find', question: "Выбери животных суши:", options: ["Медведь", "Акула", "Лиса", "Дельфин", "Заяц"], correctAnswer: ["Медведь", "Лиса", "Заяц"], hint: "Животные, живущие на земле" },
      { type: 'quiz', question: "К какому царству относятся грибы?", options: ["Растения", "Животные", "Отдельное царство"], correctAnswer: "Отдельное царство", hint: "Грибы - это не растения и не животные" },
      { type: 'quiz', question: "Что нужно для фотосинтеза?", options: ["Только вода", "Свет, вода, углекислый газ", "Только свет"], correctAnswer: "Свет, вода, углекислый газ", hint: "Растения создают пищу с помощью света" },
      { type: 'find', question: "Выбери животных водоёмов:", options: ["Рыба", "Лягушка", "Волк", "Бобр", "Сокол"], correctAnswer: ["Рыба", "Лягушка", "Бобр"], hint: "Животные, связанные с водой" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь среды обитания! 🌿" }
  },
  {
    title: "Природные зоны",
    subject: "География",
    icon: "Map",
    color: "text-cyan-400",
    tasks: [
      { type: 'find', question: "Выбери природные зоны России:", options: ["Тундра", "Джунгли", "Тайга", "Саванна", "Степь"], correctAnswer: ["Тундра", "Тайга", "Степь"], hint: "Природные зоны нашей страны" },
      { type: 'quiz', question: "Какая зона находится севернее тайги?", options: ["Степь", "Тундра", "Пустыня"], correctAnswer: "Тундра", hint: "Тундра - самая северная зона с растениями" },
      { type: 'quiz', question: "Тайга - это...", options: ["Лес из лиственных деревьев", "Лес из хвойных деревьев", "Безлесная зона"], correctAnswer: "Лес из хвойных деревьев", hint: "Ель, сосна, кедр - деревья тайги" },
      { type: 'fill', question: "Самая холодная природная зона - арктическая __", correctAnswer: "пустыня", hint: "Лёд и снег" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь природные зоны! 🗺️" }
  },
  {
    title: "Past Simple",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Yesterday I ___ to school. (go)", options: ["go", "went", "goed"], correctAnswer: "went", hint: "Past Simple - прошедшее время" },
      { type: 'fill', question: "She ___ (play) football yesterday. (played)", correctAnswer: "played", hint: "Правильный глагол + -ed" },
      { type: 'find', question: "Выбери неправильные глаголы:", options: ["Go", "Play", "See", "Watch", "Come"], correctAnswer: ["Go", "See", "Come"], hint: "Неправильные глаголы не добавляют -ed" },
      { type: 'quiz', question: "I ___ (see) him yesterday.", options: ["seed", "saw", "seen"], correctAnswer: "saw", hint: "See - saw - seen" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь прошедшее время! 🇬🇧" }
  },

  // ========== НОВЫЕ ИГРЫ v3.41 ==========
  {
    title: "Действия с десятичными дробями",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "0,6 + 0,4 = __", correctAnswer: "1", hint: "6 + 4 = 10, значит 0,6 + 0,4 = 1" },
      { type: 'quiz', question: "2,5 - 1,3 = ?", options: ["1,2", "1,5", "2,2"], correctAnswer: "1,2", hint: "25 - 13 = 12" },
      { type: 'fill', question: "0,2 × 5 = __", correctAnswer: "1", hint: "2 × 5 = 10, значит 0,2 × 5 = 1,0 = 1" },
      { type: 'quiz', question: "1,5 ÷ 0,5 = ?", options: ["3", "0,3", "30"], correctAnswer: "3", hint: "15 ÷ 5 = 3" }
    ],
    reward: { stars: 3, message: "Отлично! Ты работаешь с десятичными дробями! 🔢" }
  },
  {
    title: "Задачи на проценты",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "В классе 20 учеников, 25% - отличники. Сколько отличников?", options: ["4", "5", "6"], correctAnswer: "5", hint: "25% = 1/4, 20 ÷ 4 = 5" },
      { type: 'fill', question: "Цена 100 рублей, скидка 10%. Цена со скидкой = __ руб.", correctAnswer: "90", hint: "100 - 10 = 90" },
      { type: 'quiz', question: "20% от 50 = ?", options: ["5", "10", "15"], correctAnswer: "10", hint: "20% = 1/5, 50 ÷ 5 = 10" },
      { type: 'fill', question: "Если 30% = 15, то 100% = __", correctAnswer: "50", hint: "15 ÷ 0,3 = 50" }
    ],
    reward: { stars: 3, message: "Супер! Ты решаешь задачи на проценты! 💯" }
  },
  {
    title: "Правописание приставок",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "В приставках на -з/-с перед звонкими пишется:", options: ["-з", "-с", "Зависит от корня"], correctAnswer: "-з", hint: "Перед звонкими - з, перед глухими - с" },
      { type: 'fill', question: "Бе__шумный (перед ш - глухой)", correctAnswer: "с", hint: "Ш - глухой звук, пишем с" },
      { type: 'find', question: "Выбери слова с приставкой на -з:", options: ["Беззвёздный", "Бесконечный", "Безопасный", "Бесшумный"], correctAnswer: ["Беззвёздный", "Безопасный"], hint: "Перед звонкими пишется з" },
      { type: 'quiz', question: "Приставка пре- означает:", options: ["Очень", "Пере-", "Оба значения"], correctAnswer: "Оба значения", hint: "Прекрасный = очень красивый, преградить = перегородить" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь приставки! ✍️" }
  },
  {
    title: "Имя прилагательное",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Имя прилагательное обозначает:", options: ["Предмет", "Признак предмета", "Действие"], correctAnswer: "Признак предмета", hint: "Прилагательное отвечает на «какой?»" },
      { type: 'find', question: "Выбери имена прилагательные:", options: ["Красивый", "Красота", "Бежать", "Быстрый", "Синий"], correctAnswer: ["Красивый", "Быстрый", "Синий"], hint: "Прилагательные описывают предметы" },
      { type: 'quiz', question: "Прилагательные изменяются по:", options: ["Временам", "Родам, числам, падежам", "Лицам"], correctAnswer: "Родам, числам, падежам", hint: "Прилагательные согласуются с существительными" },
      { type: 'fill', question: "Красивый (м.р.) → Красивая (ж.р.) → Красив__ (ср.р.)", correctAnswer: "ое", hint: "Красивое (средний род)" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь прилагательные! 📝" }
  },
  {
    title: "Древний Рим",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Столица Римской империи:", options: ["Афины", "Рим", "Александрия"], correctAnswer: "Рим", hint: "Рим - столица Римской империи" },
      { type: 'find', question: "Выбери римских богов:", options: ["Зевс", "Юпитер", "Марс", "Посейдон", "Венера"], correctAnswer: ["Юпитер", "Марс", "Венера"], hint: "Римские боги: Юпитер, Марс, Венера" },
      { type: 'quiz', question: "Гладиаторы - это:", options: ["Боги", "Бойцы на арене", "Политики"], correctAnswer: "Бойцы на арене", hint: "Гладиаторы сражались в Колизее" },
      { type: 'fill', question: "Рим был основан в __ г. до н.э. (753)", correctAnswer: "753", hint: "753 год до н.э." }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Древний Рим! 🏛️" }
  },
  {
    title: "Средние века",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "Феодализм - это:", options: ["Рабовладение", "Система земельных отношений", "Демократия"], correctAnswer: "Система земельных отношений", hint: "Феодалы владели землёй" },
      { type: 'find', question: "Выбери сословия Средневековья:", options: ["Духовенство", "Рабочие", "Рыцари", "Крестьяне", "Буржуазия"], correctAnswer: ["Духовенство", "Рыцари", "Крестьяне"], hint: "Три сословия: духовенство, рыцари, крестьяне" },
      { type: 'quiz', question: "Рыцарь - это:", options: ["Крестьянин", "Воин-феодал", "Священник"], correctAnswer: "Воин-феодал", hint: "Рыцари были воинами" },
      { type: 'fill', question: "Замок - это __ феодала", correctAnswer: "крепость", hint: "Замки защищали феодалов" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь Средние века! ⚔️" }
  },
  {
    title: "Строение растений",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какой орган растения всасывает воду?", options: ["Лист", "Корень", "Стебель"], correctAnswer: "Корень", hint: "Корень всасывает воду из почвы" },
      { type: 'find', question: "Выбери части растения:", options: ["Корень", "Стебель", "Лист", "Цветок", "Плод"], correctAnswer: ["Корень", "Стебель", "Лист", "Цветок", "Плод"], hint: "Основные органы растения" },
      { type: 'quiz', question: "Фотосинтез происходит в:", options: ["Корне", "Листьях", "Стебле"], correctAnswer: "Листьях", hint: "В листьях есть хлорофилл" },
      { type: 'fill', question: "Корень закрепляет растение в __", correctAnswer: "почве", hint: "Корень держит растение" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь растения! 🌱" }
  },
  {
    title: "Мировой океан",
    subject: "География",
    icon: "Map",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Сколько океанов на Земле?", options: ["3", "4", "5"], correctAnswer: "5", hint: "Тихий, Атлантический, Индийский, Северный Ледовитый, Южный" },
      { type: 'find', question: "Выбери части океана:", options: ["Море", "Залив", "Пролив", "Озеро", "Река"], correctAnswer: ["Море", "Залив", "Пролив"], hint: "Части Мирового океана" },
      { type: 'quiz', question: "Самый тёплый океан:", options: ["Тихий", "Индийский", "Атлантический"], correctAnswer: "Индийский", hint: "Индийский океан самый тёплый" },
      { type: 'fill', question: "Солёность океанской воды = __‰ (промилле)", correctAnswer: "35", hint: "В среднем 35‰" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь океаны! 🌊" }
  },
  {
    title: "Present Continuous",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I ___ reading now.", options: ["is", "am", "are"], correctAnswer: "am", hint: "I am + V-ing" },
      { type: 'fill', question: "She __ (play) tennis now. (is playing)", correctAnswer: "is playing", hint: "She is + V-ing" },
      { type: 'quiz', question: "They ___ sleeping.", options: ["is", "am", "are"], correctAnswer: "are", hint: "They are + V-ing" },
      { type: 'find', question: "Выбери маркеры Present Continuous:", options: ["Now", "Yesterday", "At the moment", "Last week", "Today (сейчас)"], correctAnswer: ["Now", "At the moment", "Today (сейчас)"], hint: "Маркеры: now, at the moment, look, listen" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь Present Continuous! ⏳" }
  }
]
