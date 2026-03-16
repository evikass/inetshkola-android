// Экспорт игр для 7 класса
import { GameLesson } from '../types'

export const seventhGradeGames: GameLesson[] = [
  // ========== АЛГЕБРА ==========
  {
    title: "Линейные уравнения",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Реши: 2x + 4 = 10", options: ["x = 3", "x = 7", "x = 2"], correctAnswer: "x = 3", hint: "2x = 10 - 4 = 6, x = 3" },
      { type: 'fill', question: "3x - 5 = 7, x = __", correctAnswer: "4", hint: "3x = 12, x = 4" },
      { type: 'quiz', question: "Что такое корень уравнения?", options: ["Значение переменной", "Число в уравнении", "Знак равно"], correctAnswer: "Значение переменной", hint: "Корень - это значение, при котором уравнение верно" },
      { type: 'fill', question: "5x = 25, x = __", correctAnswer: "5", hint: "x = 25 / 5" }
    ],
    reward: { stars: 3, message: "Отлично! Ты решаешь линейные уравнения! 📐" }
  },
  {
    title: "Формулы сокращённого умножения",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "(a + b)² = ?", options: ["a² + 2ab + b²", "a² + b²", "a² - 2ab + b²"], correctAnswer: "a² + 2ab + b²", hint: "Квадрат суммы = квадрат a + 2ab + квадрат b" },
      { type: 'quiz', question: "(a - b)² = ?", options: ["a² - 2ab + b²", "a² - b²", "a² + 2ab + b²"], correctAnswer: "a² - 2ab + b²", hint: "Квадрат разности" },
      { type: 'fill', question: "(x + 3)² = x² + 6x + __", correctAnswer: "9", hint: "3² = 9" },
      { type: 'quiz', question: "a² - b² = ?", options: ["(a-b)(a+b)", "(a+b)²", "(a-b)²"], correctAnswer: "(a-b)(a+b)", hint: "Разность квадратов = произведение разности на сумму" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь формулы! 🧮" }
  },
  {
    title: "Степени",
    subject: "Алгебра",
    icon: "Sigma",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "2³ × 2² = ?", options: ["2⁵", "2⁶", "4⁵"], correctAnswer: "2⁵", hint: "При умножении степеней показатели складываются" },
      { type: 'fill', question: "3⁴ = __", correctAnswer: "81", hint: "3 × 3 × 3 × 3 = 81" },
      { type: 'quiz', question: "(2³)² = ?", options: ["2⁶", "2⁵", "2⁸"], correctAnswer: "2⁶", hint: "При возведении степени в степень показатели перемножаются" },
      { type: 'quiz', question: "5⁰ = ?", options: ["0", "1", "5"], correctAnswer: "1", hint: "Любое число в нулевой степени = 1" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь степени! 🔢" }
  },

  // ========== MATCHING GAMES ==========
  {
    title: "Математические пары",
    subject: "Алгебра",
    icon: "Link2",
    color: "text-cyan-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини формулу с её названием:",
        options: ["a² + 2ab + b²", "a² - b²", "(a-b)(a+b)", "Квадрат суммы", "Разность квадратов", "Разложение разности"],
        correctAnswer: ["a² + 2ab + b²→Квадрат суммы", "a² - b²→Разность квадратов", "(a-b)(a+b)→Разложение разности"]
      },
      { 
        type: 'match', 
        question: "Соедини степень с её значением:",
        options: ["2³", "3²", "4²", "8", "9", "16"],
        correctAnswer: ["2³→8", "3²→9", "4²→16"]
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь пары! 🔗" }
  },

  // ========== ГЕОМЕТРИЯ ==========
  {
    title: "Треугольники",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Сумма углов треугольника равна?", options: ["90°", "180°", "360°"], correctAnswer: "180°", hint: "Это важная теорема геометрии" },
      { type: 'quiz', question: "В равнобедренном треугольнике:", options: ["Все стороны равны", "Две стороны равны", "Все углы равны"], correctAnswer: "Две стороны равны", hint: "Равнобедренный = две равные стороны" },
      { type: 'find', question: "Выбери виды треугольников:", options: ["Равносторонний", "Прямоугольный", "Квадратный", "Тупоугольный", "Круглый"], correctAnswer: ["Равносторонний", "Прямоугольный", "Тупоугольный"], hint: "Треугольники различают по сторонам и углам" },
      { type: 'quiz', question: "В равностороннем треугольнике каждый угол равен?", options: ["90°", "60°", "45°"], correctAnswer: "60°", hint: "180° / 3 = 60°" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь треугольники! 🔺" }
  },
  {
    title: "Геометрические пары",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини фигуру с количеством углов:",
        options: ["Треугольник", "Квадрат", "Пятиугольник", "3 угла", "4 угла", "5 углов"],
        correctAnswer: ["Треугольник→3 угла", "Квадрат→4 угла", "Пятиугольник→5 углов"]
      }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь геометрию! 📐" }
  },
  {
    title: "Параллельные прямые",
    subject: "Геометрия",
    icon: "Shapes",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Какие прямые называются параллельными?", options: ["Пересекающиеся", "Непересекающиеся", "Перпендикулярные"], correctAnswer: "Непересекающиеся", hint: "Параллельные прямые никогда не пересекаются" },
      { type: 'quiz', question: "Накрест лежащие углы при параллельных прямых:", options: ["Равны", "Дают 180°", "Разные"], correctAnswer: "Равны", hint: "Это признак параллельности" },
      { type: 'fill', question: "Если один из соответственных углов равен 45°, то другой = __°", correctAnswer: "45", hint: "Соответственные углы равны" },
      { type: 'quiz', question: "Односторонние углы в сумме дают:", options: ["90°", "180°", "360°"], correctAnswer: "180°", hint: "Это свойство параллельных прямых" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь параллельность! 📏" }
  },

  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Причастие",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Причастие - это:", options: ["Глагол", "Прилагательное", "Самостоятельная часть речи"], correctAnswer: "Самостоятельная часть речи", hint: "Причастие обозначает признак по действию" },
      { type: 'find', question: "Выбери причастия:", options: ["Бегущий", "Бегать", "Читающий", "Читальный", "Решённый"], correctAnswer: ["Бегущий", "Читающий", "Решённый"], hint: "Причастия отвечают на «какой? что делающий?»" },
      { type: 'quiz', question: "Действительные причастия обозначают:", options: ["Признак самого предмета", "Признак, направленный на предмет", "Время действия"], correctAnswer: "Признак самого предмета", hint: "Действительные: читающий, бежавший" },
      { type: 'quiz', question: "Страдательные причастия обозначают:", options: ["Признак самого предмета", "Признак, направленный на предмет", "Время действия"], correctAnswer: "Признак, направленный на предмет", hint: "Страдательные: читаемый, решённый" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь причастия! 📝" }
  },
  {
    title: "Части речи - пары",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини часть речи с примером:",
        options: ["Существительное", "Прилагательное", "Глагол", "Стол", "Красивый", "Бежать"],
        correctAnswer: ["Существительное→Стол", "Прилагательное→Красивый", "Глагол→Бежать"]
      },
      { 
        type: 'match', 
        question: "Соедини причастие с его типом:",
        options: ["Читающий", "Прочитанный", "Читаемый", "Действительное", "Страдательное прош.", "Страдательное наст."],
        correctAnswer: ["Читающий→Действительное", "Прочитанный→Страдательное прош.", "Читаемый→Страдательное наст."]
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь части речи! ✍️" }
  },
  {
    title: "Деепричастие",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Деепричастие отвечает на вопросы:", options: ["Что делая? Как?", "Что делать? Что сделать?", "Какой? Чей?"], correctAnswer: "Что делая? Как?", hint: "Деепричастие = глагол + наречие" },
      { type: 'find', question: "Выбери деепричастия:", options: ["Читая", "Читать", "Читающий", "Решив", "Решённый"], correctAnswer: ["Читая", "Решив"], hint: "Деепричастия оканчиваются на -а, -я, -в, -вши" },
      { type: 'quiz', question: "Деепричастие в предложении является:", options: ["Сказуемым", "Обстоятельством", "Дополнением"], correctAnswer: "Обстоятельством", hint: "Деепричастный оборот = обстоятельство" },
      { type: 'quiz', question: "Деепричастие обозначает:", options: ["Признак предмета", "Добавочное действие", "Качество"], correctAnswer: "Добавочное действие", hint: "Основное действие - глагол, добавочное - деепричастие" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь деепричастия! ✍️" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Былины",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Что такое былина?", options: ["Сказка", "Русский героический эпос", "Летопись"], correctAnswer: "Русский героический эпос", hint: "Былины рассказывают о подвигах богатырей" },
      { type: 'find', question: "Выбери русских богатырей:", options: ["Илья Муромец", "Добрыня Никитич", "Алёша Попович", "Змей Горыныч", "Соловей-разбойник"], correctAnswer: ["Илья Муромец", "Добрыня Никитич", "Алёша Попович"], hint: "Это главные герои былин" },
      { type: 'quiz', question: "Сколько лет лежал Илья Муромец на печи?", options: ["10 лет", "33 года", "50 лет"], correctAnswer: "33 года", hint: "До 33 лет он не мог ходить" },
      { type: 'quiz', question: "Былины исполнялись:", options: ["Под аккомпанемент гуслей", "Без музыки", "Под барабаны"], correctAnswer: "Под аккомпанемент гуслей", hint: "Сказители пели былины" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь былины! 📜" }
  },
  {
    title: "Литературные пары",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини автора с произведением:",
        options: ["А.С. Пушкин", "М.Ю. Лермонтов", "Н.В. Гоголь", "Евгений Онегин", "Мцыри", "Ревизор"],
        correctAnswer: ["А.С. Пушкин→Евгений Онегин", "М.Ю. Лермонтов→Мцыри", "Н.В. Гоголь→Ревизор"]
      },
      { 
        type: 'match', 
        question: "Соедини жанр с примером:",
        options: ["Роман", "Поэма", "Сказка", "Война и мир", "Руслан и Людмила", "Золотой петушок"],
        correctAnswer: ["Роман→Война и мир", "Поэма→Руслан и Людмила", "Сказка→Золотой петушок"]
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь литературу! 📚" }
  },
  {
    title: "Лирика Пушкина",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "А.С. Пушкин родился в:", options: ["1799", "1809", "1819"], correctAnswer: "1799", hint: "6 июня 1799 года" },
      { type: 'find', question: "Выбери произведения Пушкина:", options: ["Евгений Онегин", "Капитанская дочка", "Мцыри", "Руслан и Людмила", "Герой нашего времени"], correctAnswer: ["Евгений Онегин", "Капитанская дочка", "Руслан и Людмила"], hint: "Пушкин - великий русский поэт" },
      { type: 'quiz', question: "К какому жанру относится «Евгений Онегин»?", options: ["Роман", "Роман в стихах", "Поэма"], correctAnswer: "Роман в стихах", hint: "Это уникальный жанр Пушкина" },
      { type: 'quiz', question: "Кто была женой Пушкина?", options: ["Анна Керн", "Наталья Гончарова", "Мария Волконская"], correctAnswer: "Наталья Гончарова", hint: "Жена поэта" }
    ],
    reward: { stars: 3, message: "Прекрасно! Ты знаешь творчество Пушкина! 📖" }
  },

  // ========== ИСТОРИЯ ==========
  {
    title: "Древняя Русь IX-XI века",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "В каком году был основан Новгород?", options: ["859", "862", "882"], correctAnswer: "859", hint: "Первое упоминание в летописи" },
      { type: 'quiz', question: "Кто крестил Русь?", options: ["Олег", "Игорь", "Владимир"], correctAnswer: "Владимир", hint: "Владимир Святославич в 988 году" },
      { type: 'find', question: "Выбери киевских князей:", options: ["Рюрик", "Олег", "Игорь", "Святослав", "Ярослав Мудрый"], correctAnswer: ["Олег", "Игорь", "Святослав", "Ярослав Мудрый"], hint: "Рюрик правил в Новгороде" },
      { type: 'quiz', question: "«Русская Правда» - это:", options: ["Летопись", "Свод законов", "Договор"], correctAnswer: "Свод законов", hint: "Первый письменный закон Древней Руси" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю Руси! 🏰" }
  },
  {
    title: "Исторические пары",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини князя с событием:",
        options: ["Владимир", "Ярослав Мудрый", "Александр Невский", "Крещение Руси", "Русская Правда", "Ледовое побоище"],
        correctAnswer: ["Владимир→Крещение Руси", "Ярослав Мудрый→Русская Правда", "Александр Невский→Ледовое побоище"]
      },
      { 
        type: 'match', 
        question: "Соедини год с событием:",
        options: ["988", "1147", "1380", "Крещение Руси", "Основание Москвы", "Куликовская битва"],
        correctAnswer: ["988→Крещение Руси", "1147→Основание Москвы", "1380→Куликовская битва"]
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! ⚔️" }
  },
  {
    title: "Татаро-монгольское иго",
    subject: "История",
    icon: "Landmark",
    color: "text-orange-400",
    tasks: [
      { type: 'quiz', question: "В каком году Батый напал на Русь?", options: ["1223", "1237", "1240"], correctAnswer: "1237", hint: "Зимой 1237-1238 годов" },
      { type: 'quiz', question: "Кто разбил шведов на Неве?", options: ["Дмитрий Донской", "Александр Невский", "Иван Калита"], correctAnswer: "Александр Невский", hint: "1240 год - Невская битва" },
      { type: 'find', question: "Выбери битвы Александра Невского:", options: ["Невская битва", "Ледовое побоище", "Куликовская битва", "Битва на Калке"], correctAnswer: ["Невская битва", "Ледовое побоище"], hint: "Александр Невский победил шведов и рыцарей" },
      { type: 'quiz', question: "Когда закончилось татаро-монгольское иго?", options: ["1380", "1480", "1500"], correctAnswer: "1480", hint: "Стояние на Угре при Иване III" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь историю! ⚔️" }
  },

  // ========== БИОЛОГИЯ ==========
  {
    title: "Цитология",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какая органоида является «энергетической станцией» клетки?", options: ["Ядро", "Митохондрия", "Рибосома"], correctAnswer: "Митохондрия", hint: "Митохондрии производят энергию (АТФ)" },
      { type: 'quiz', question: "Что содержит ДНК?", options: ["Цитоплазма", "Ядро", "Рибосомы"], correctAnswer: "Ядро", hint: "ДНК находится в хромосомах ядра" },
      { type: 'find', question: "Выбери органоиды клетки:", options: ["Митохондрия", "Рибосома", "Сердце", "Ядро", "Лёгкие"], correctAnswer: ["Митохондрия", "Рибосома", "Ядро"], hint: "Органоиды - структуры клетки" },
      { type: 'quiz', question: "Какой органоид отвечает за синтез белка?", options: ["Митохондрия", "Рибосома", "Ядро"], correctAnswer: "Рибосома", hint: "Рибосомы собирают белки" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь клетку! 🔬" }
  },
  {
    title: "Биологические пары",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини органоид с функцией:",
        options: ["Митохондрия", "Рибосома", "Хлоропласт", "Синтез белка", "Производство энергии", "Фотосинтез"],
        correctAnswer: ["Митохондрия→Производство энергии", "Рибосома→Синтез белка", "Хлоропласт→Фотосинтез"]
      },
      { 
        type: 'match', 
        question: "Соедини царство с примером:",
        options: ["Бактерии", "Растения", "Животные", "Берёза", "Медведь", "Кишечная палочка"],
        correctAnswer: ["Бактерии→Кишечная палочка", "Растения→Берёза", "Животные→Медведь"]
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь биологию! 🌱" }
  },
  {
    title: "Фотосинтез",
    subject: "Биология",
    icon: "Leaf",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Где происходит фотосинтез?", options: ["В корнях", "В листьях", "В стебле"], correctAnswer: "В листьях", hint: "В хлоропластах листьев" },
      { type: 'find', question: "Что нужно для фотосинтеза?", options: ["CO₂", "O₂", "Вода", "Свет", "Глюкоза"], correctAnswer: ["CO₂", "Вода", "Свет"], hint: "Углекислый газ + вода + свет = глюкоза + кислород" },
      { type: 'quiz', question: "Какой газ выделяется при фотосинтезе?", options: ["CO₂", "O₂", "N₂"], correctAnswer: "O₂", hint: "Кислород - продукт фотосинтеза" },
      { type: 'fill', question: "__CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (сколько CO₂?)", correctAnswer: "6", hint: "Уравнение фотосинтеза" }
    ],
    reward: { stars: 3, message: "Супер! Ты понимаешь фотосинтез! 🌱" }
  },

  // ========== ГЕОГРАФИЯ ==========
  {
    title: "Материки и океаны",
    subject: "География",
    icon: "Map",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Сколько материков на Земле?", options: ["5", "6", "7"], correctAnswer: "6", hint: "Евразия, Африка, Сев. Америка, Юж. Америка, Австралия, Антарктида" },
      { type: 'find', question: "Выбери материки:", options: ["Евразия", "Атлантида", "Африка", "Арктика", "Австралия"], correctAnswer: ["Евразия", "Африка", "Австралия"], hint: "Материки - крупные участки суши" },
      { type: 'quiz', question: "Какой океан самый большой?", options: ["Атлантический", "Тихий", "Индийский"], correctAnswer: "Тихий", hint: "Тихий океан занимает 1/3 поверхности Земли" },
      { type: 'quiz', question: "Какой материк самый маленький?", options: ["Австралия", "Антарктида", "Южная Америка"], correctAnswer: "Австралия", hint: "Австралия - самый маленький материк" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь географию! 🌍" }
  },
  {
    title: "Географические пары",
    subject: "География",
    icon: "Map",
    color: "text-cyan-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини материк с его особенностью:",
        options: ["Евразия", "Африка", "Антарктида", "Самый холодный", "Самый большой", "Самый жаркий"],
        correctAnswer: ["Евразия→Самый большой", "Африка→Самый жаркий", "Антарктида→Самый холодный"]
      },
      { 
        type: 'match', 
        question: "Соедини океан с его площадью:",
        options: ["Тихий", "Атлантический", "Северный Ледовитый", "Самый большой", "Второй по величине", "Самый маленький"],
        correctAnswer: ["Тихий→Самый большой", "Атлантический→Второй по величине", "Северный Ледовитый→Самый маленький"]
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь географию! 🗺️" }
  },

  // ========== ФИЗИКА ==========
  {
    title: "Механическое движение",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { type: 'quiz', question: "Формула скорости:", options: ["v = s/t", "v = t/s", "v = s × t"], correctAnswer: "v = s/t", hint: "Скорость = путь / время" },
      { type: 'fill', question: "Если s = 100 м, t = 20 с, то v = __ м/с", correctAnswer: "5", hint: "v = 100 / 20 = 5" },
      { type: 'quiz', question: "Единица измерения скорости в СИ:", options: ["км/ч", "м/с", "см/с"], correctAnswer: "м/с", hint: "Метр в секунду - единица СИ" },
      { type: 'quiz', question: "Что такое инерция?", options: ["Изменение скорости", "Сохранение скорости", "Ускорение"], correctAnswer: "Сохранение скорости", hint: "Тело сохраняет состояние покоя или движения" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь механику! ⚛️" }
  },
  {
    title: "Физические пары",
    subject: "Физика",
    icon: "Atom",
    color: "text-violet-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини величину с единицей измерения:",
        options: ["Скорость", "Время", "Путь", "м/с", "с", "м"],
        correctAnswer: ["Скорость→м/с", "Время→с", "Путь→м"]
      },
      { 
        type: 'match', 
        question: "Соедини формулу с названием:",
        options: ["v = s/t", "s = v × t", "t = s/v", "Скорость", "Путь", "Время"],
        correctAnswer: ["v = s/t→Скорость", "s = v × t→Путь", "t = s/v→Время"]
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь физику! ⚡" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Present Perfect",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I have ___ (see) this film.", options: ["see", "saw", "seen"], correctAnswer: "seen", hint: "Present Perfect: have/has + V3" },
      { type: 'quiz', question: "She ___ finished her homework.", options: ["have", "has", "had"], correctAnswer: "has", hint: "She = has (3-е лицо ед.ч.)" },
      { type: 'find', question: "Выбери маркеры Present Perfect:", options: ["Yesterday", "Just", "Last week", "Already", "Ever"], correctAnswer: ["Just", "Already", "Ever"], hint: "Just, already, ever, never, yet" },
      { type: 'fill', question: "They have ___ (go) to school. (gone/been)", correctAnswer: "gone", hint: "Gone = ушёл, не вернулся" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь Present Perfect! 🇬🇧" }
  },
  {
    title: "Английские пары",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { 
        type: 'match', 
        question: "Соедини глагол с Past Participle:",
        options: ["go", "see", "write", "gone", "seen", "written"],
        correctAnswer: ["go→gone", "see→seen", "write→written"]
      },
      { 
        type: 'match', 
        question: "Соедини время с маркером:",
        options: ["Present Simple", "Past Simple", "Present Perfect", "Always", "Yesterday", "Just"],
        correctAnswer: ["Present Simple→Always", "Past Simple→Yesterday", "Present Perfect→Just"]
      }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь английский! 🇬🇧" }
  },
  {
    title: "Conditionals",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "If it rains, I ___ at home.", options: ["stay", "will stay", "stayed"], correctAnswer: "will stay", hint: "First Conditional: If + Present, will + V" },
      { type: 'quiz', question: "If I were you, I ___ study more.", options: ["will", "would", "shall"], correctAnswer: "would", hint: "Second Conditional: If + Past, would + V" },
      { type: 'fill', question: "If you __ water to 100°C, it boils. (heat)", correctAnswer: "heat", hint: "Zero Conditional: If + Present, Present" },
      { type: 'quiz', question: "Если бы я был тобой (Second Conditional):", options: ["If I am you", "If I were you", "If I be you"], correctAnswer: "If I were you", hint: "Во 2-м условном всегда were" }
    ],
    reward: { stars: 3, message: "Excellent! Ты знаешь условные предложения! 🔄" }
  }
]
