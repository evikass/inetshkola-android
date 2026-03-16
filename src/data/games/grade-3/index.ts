// Экспорт игр для 3 класса
import { GameLesson } from '../types'

export const thirdGradeGames: GameLesson[] = [
  // ========== МАТЕМАТИКА ==========
  {
    title: "Таблица умножения на 2-5",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "2 × 7 = ?", options: ["12", "14", "16"], correctAnswer: "14", hint: "2 × 7 = 14" },
      { type: 'quiz', question: "3 × 6 = ?", options: ["15", "18", "21"], correctAnswer: "18", hint: "3 × 6 = 18" },
      { type: 'quiz', question: "4 × 5 = ?", options: ["15", "20", "25"], correctAnswer: "20", hint: "4 × 5 = 20" },
      { type: 'fill', question: "5 × __ = 35", correctAnswer: "7", hint: "Сколько раз по 5 будет 35?" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь таблицу умножения! ✖️" }
  },
  {
    title: "Таблица умножения на 6-9",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "6 × 7 = ?", options: ["36", "42", "48"], correctAnswer: "42", hint: "6 × 7 = 42" },
      { type: 'quiz', question: "7 × 8 = ?", options: ["54", "56", "64"], correctAnswer: "56", hint: "7 × 8 = 56" },
      { type: 'quiz', question: "8 × 9 = ?", options: ["64", "72", "81"], correctAnswer: "72", hint: "8 × 9 = 72" },
      { type: 'fill', question: "9 × __ = 63", correctAnswer: "7", hint: "9 × 7 = 63" }
    ],
    reward: { stars: 3, message: "Супер! Ты освоил сложную таблицу! 🏆" }
  },
  {
    title: "Деление",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "36 ÷ 6 = ?", options: ["5", "6", "7"], correctAnswer: "6", hint: "36 ÷ 6 = 6" },
      { type: 'quiz', question: "56 ÷ 8 = ?", options: ["6", "7", "8"], correctAnswer: "7", hint: "56 ÷ 8 = 7" },
      { type: 'fill', question: "__ ÷ 9 = 8", correctAnswer: "72", hint: "Какое число делится на 9 и даёт 8?" },
      { type: 'quiz', question: "81 ÷ 9 = ?", options: ["8", "9", "10"], correctAnswer: "9", hint: "81 ÷ 9 = 9" }
    ],
    reward: { stars: 3, message: "Здорово! Ты умеешь делить! ➗" }
  },
  {
    title: "Дроби",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Какая дробь больше: 1/2 или 1/4?", options: ["1/2", "1/4", "Они равны"], correctAnswer: "1/2", hint: "Чем меньше знаменатель, тем больше дробь" },
      { type: 'quiz', question: "1/2 + 1/2 = ?", options: ["1/4", "1", "2"], correctAnswer: "1", hint: "Две половины составляют целое" },
      { type: 'find', question: "Выбери правильные дроби:", options: ["1/2 = 0.5", "1/4 = 0.25", "1/3 = 0.5", "3/4 = 0.75"], correctAnswer: ["1/2 = 0.5", "1/4 = 0.25", "3/4 = 0.75"], hint: "Проверь каждое равенство" },
      { type: 'quiz', question: "Сколько четвертей в целом?", options: ["2", "3", "4"], correctAnswer: "4", hint: "1/4 + 1/4 + 1/4 + 1/4 = 1" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь дроби! 📊" }
  },
  {
    title: "Площадь и периметр",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Периметр квадрата со стороной 4 см?", options: ["12 см", "16 см", "20 см"], correctAnswer: "16 см", hint: "P = 4 × сторона" },
      { type: 'quiz', question: "Площадь прямоугольника 3×5?", options: ["8", "15", "16"], correctAnswer: "15", hint: "S = длина × ширина" },
      { type: 'fill', question: "Периметр прямоугольника 2×5 = __ см", correctAnswer: "14", hint: "P = 2×(длина + ширина)" },
      { type: 'quiz', question: "Сторона квадрата с периметром 20 см?", options: ["4 см", "5 см", "10 см"], correctAnswer: "5 см", hint: "Сторона = P ÷ 4" }
    ],
    reward: { stars: 3, message: "Умница! Ты знаешь геометрию! 📐" }
  },
  {
    title: "Сложение и вычитание до 1000",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "245 + 132 = ?", options: ["367", "377", "387"], correctAnswer: "377", hint: "Сложи сотни, десятки и единицы" },
      { type: 'quiz', question: "500 - 234 = ?", options: ["266", "276", "366"], correctAnswer: "266", hint: "500 - 234 = 266" },
      { type: 'fill', question: "356 + 144 = __", correctAnswer: "500", hint: "356 + 144 = 500" },
      { type: 'find', question: "Выбери примеры с ответом 500:", options: ["250 + 250", "600 - 100", "450 + 50", "400 + 200"], correctAnswer: ["250 + 250", "600 - 100", "450 + 50"], hint: "Реши каждый пример" }
    ],
    reward: { stars: 3, message: "Отлично! Ты считаешь до 1000! 🔢" }
  },
  {
    title: "Задачи на время",
    subject: "Математика",
    icon: "Clock",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько минут в 1 часе?", options: ["60", "100", "24"], correctAnswer: "60", hint: "1 час = 60 минут" },
      { type: 'quiz', question: "Сколько часов в сутках?", options: ["12", "24", "60"], correctAnswer: "24", hint: "1 сутки = 24 часа" },
      { type: 'fill', question: "2 часа 30 минут = __ минут", correctAnswer: "150", hint: "2×60 + 30 = 150" },
      { type: 'quiz', question: "Полчаса - это сколько минут?", options: ["15", "30", "45"], correctAnswer: "30", hint: "Половина часа" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь время! ⏰" }
  },

  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Склонения существительных",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "К какому склонению относится слово «мама»?", options: ["1-е", "2-е", "3-е"], correctAnswer: "1-е", hint: "Ж.р., окончание -а - это 1-е склонение" },
      { type: 'quiz', question: "Склонение слова «стол»?", options: ["1-е", "2-е", "3-е"], correctAnswer: "2-е", hint: "М.р., нулевое окончание - 2-е склонение" },
      { type: 'find', question: "Выбери слова 3-го склонения:", options: ["Мать", "Степь", "Отец", "Ночь", "Сын"], correctAnswer: ["Мать", "Степь", "Ночь"], hint: "3-е склонение - ж.р. с ь на конце" },
      { type: 'quiz', question: "Склонение слова «окно»?", options: ["1-е", "2-е", "3-е"], correctAnswer: "2-е", hint: "Ср.р., окончание -о - 2-е склонение" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь склонения! 📚" }
  },
  {
    title: "Падежи",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Какой падеж: «вижу (кого?) маму»?", options: ["Именительный", "Родительный", "Винительный"], correctAnswer: "Винительный", hint: "Винительный падеж отвечает на «кого? что?»" },
      { type: 'quiz', question: "Падеж: «нет (кого?) мамы»?", options: ["Родительный", "Дательный", "Винительный"], correctAnswer: "Родительный", hint: "Родительный падеж - «кого? чего? нет»" },
      { type: 'find', question: "Выбери вопросы дательного падежа:", options: ["Кого? Что?", "Кому? Чему?", "Кем? Чем?", "О ком? О чём?"], correctAnswer: ["Кому? Чему?"], hint: "Дательный падеж - «кому? чему?»" },
      { type: 'fill', question: "Предложный падеж отвечает: О __? О чём?", correctAnswer: "ком", hint: "О ком? О чём?" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь падежи! 📝" }
  },
  {
    title: "Безударные гласные",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'fill', question: "Вставь букву: В__да (проверочное слово воды)", correctAnswer: "о", hint: "ВОдЫ - проверочное слово" },
      { type: 'quiz', question: "Как проверить безударную гласную?", options: ["Подобрать проверочное слово", "Посмотреть в словаре", "Написать любую букву"], correctAnswer: "Подобрать проверочное слово", hint: "Нужно изменить слово так, чтобы гласная стала ударной" },
      { type: 'find', question: "Выбери слова с проверяемой безударной:", options: ["Сосна (сОсы)", "Собака", "Мороз (мОрозы)", "Ворона", "Трава (трАвка)"], correctAnswer: ["Сосна (сОсы)", "Мороз (мОрозы)", "Трава (трАвка)"], hint: "Можно ли проверить ударением?" },
      { type: 'fill', question: "Вставь букву: К__за (кОзы)", correctAnswer: "о", hint: "КОзЫ - проверочное слово" }
    ],
    reward: { stars: 3, message: "Умница! Ты умеешь проверять гласные! ✅" }
  },
  {
    title: "Состав слова",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Какая часть слова стоит перед корнем?", options: ["Приставка", "Суффикс", "Окончание"], correctAnswer: "Приставка", hint: "Приставка стоит перед корнем" },
      { type: 'quiz', question: "Какая часть слова служит для образования новых слов?", options: ["Корень", "Окончание", "Суффикс"], correctAnswer: "Суффикс", hint: "Суффикс образует новые слова" },
      { type: 'find', question: "Выбери части слова:", options: ["Корень", "Слог", "Приставка", "Буква", "Окончание"], correctAnswer: ["Корень", "Приставка", "Окончание"], hint: "Морфемы - части слова" },
      { type: 'fill', question: "В слове «подснежник» корень: __", correctAnswer: "снеж", hint: "Снеж - общая часть родственных слов" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь состав слова! 📖" }
  },
  {
    title: "Правописание приставок",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Приставка «пре-» означает:", options: ["Пере-", "Очень", "Оба значения"], correctAnswer: "Оба значения", hint: "Пре- = очень или пере-" },
      { type: 'fill', question: "Приставка в слове «пр__бежать»", correctAnswer: "при", hint: "Прибежать - приближение" },
      { type: 'find', question: "Выбери слова с приставкой «при-»:", options: ["Прибежать", "Прекрасный", "Пришкольный", "Прервать", "Прилететь"], correctAnswer: ["Прибежать", "Пришкольный", "Прилететь"], hint: "При- = приближение, присоединение, неполнота действия" },
      { type: 'quiz', question: "В слове «преградить» приставка означает:", options: ["Приближение", "Пере- (через)", "Очень"], correctAnswer: "Пере- (через)", hint: "Преградить = перегородить" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь приставки! ✍️" }
  },

  // ========== ЛИТЕРАТУРА ==========
  {
    title: "Басни Крылова",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Кто герои басни «Квартет»?", options: ["Волк и Ягнёнок", "Мартышка, Осёл, Козёл, Медведь", "Стрекоза и Муравей"], correctAnswer: "Мартышка, Осёл, Козёл, Медведь", hint: "Четверо музыкантов" },
      { type: 'quiz', question: "Мораль басни «Стрекоза и Муравей»?", options: ["Работай летом, зимой будешь сыт", "Не будь ленивым", "Помогай другим"], correctAnswer: "Работай летом, зимой будешь сыт", hint: "«Ты всё пела? Это дело: Так поди же, попляши!»" },
      { type: 'find', question: "Выбери басни Крылова:", options: ["Ворона и Лисица", "Колобок", "Квартет", "Репка", "Стрекоза и Муравей"], correctAnswer: ["Ворона и Лисица", "Квартет", "Стрекоза и Муравей"], hint: "Иван Андреевич Крылов" },
      { type: 'quiz', question: "Кто обманул Ворону в басне?", options: ["Волк", "Лиса", "Медведь"], correctAnswer: "Лиса", hint: "«Ворона каркнула во всё воронье горло...»" }
    ],
    reward: { stars: 3, message: "Прекрасно! Ты знаешь басни! 📖" }
  },
  {
    title: "Сказки Пушкина",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Сколько сказок написал Пушкин?", options: ["5", "6", "7"], correctAnswer: "5", hint: "Пушкин написал 5 сказок" },
      { type: 'find', question: "Выбери сказки Пушкина:", options: ["О рыбаке и рыбке", "Колобок", "О царе Салтане", "О Золотом петушке", "Теремок"], correctAnswer: ["О рыбаке и рыбке", "О царе Салтане", "О Золотом петушке"], hint: "Александр Сергеевич Пушкин" },
      { type: 'quiz', question: "Кто испугал царевну в «Сказке о мёртвой царевне»?", options: ["Баба Яга", "Злая мачеха", "Кощей"], correctAnswer: "Злая мачеха", hint: "Мачеха была jealous" },
      { type: 'fill', question: "«Сказка о __ и о работнике его Балде»", correctAnswer: "попе", hint: "Поп нанял Балду работником" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь сказки Пушкина! 📚" }
  },
  {
    title: "Устное народное творчество",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Что такое устное народное творчество?", options: ["Книги писателей", "Фольклор", "Стихи"], correctAnswer: "Фольклор", hint: "Произведения, созданные народом" },
      { type: 'find', question: "Выбери жанры фольклора:", options: ["Сказка", "Роман", "Пословица", "Пьеса", "Загадка"], correctAnswer: ["Сказка", "Пословица", "Загадка"], hint: "Фольклор создан народом" },
      { type: 'quiz', question: "Кто является автором сказки «Колобок»?", options: ["Пушкин", "Народ", "Андерсен"], correctAnswer: "Народ", hint: "Это русская народная сказка" },
      { type: 'quiz', question: "Что такое пословица?", options: ["Короткая сказка", "Краткое мудрое изречение", "Загадка"], correctAnswer: "Краткое мудрое изречение", hint: "«Без труда не вытащишь и рыбку из пруда»" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь фольклор! 📜" }
  },

  // ========== ОКРУЖАЮЩИЙ МИР ==========
  {
    title: "Природные зоны",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какая природная зона самая холодная?", options: ["Тундра", "Арктика", "Тайга"], correctAnswer: "Арктика", hint: "Арктика - это полярная пустыня" },
      { type: 'find', question: "Выбери животных тундры:", options: ["Белый медведь", "Песец", "Северный олень", "Тигр", "Полярная сова"], correctAnswer: ["Песец", "Северный олень", "Полярная сова"], hint: "Белый медведь живёт в Арктике" },
      { type: 'quiz', question: "Какое дерево типично для тайги?", options: ["Дуб", "Берёза", "Ель"], correctAnswer: "Ель", hint: "Тайга - хвойный лес" },
      { type: 'quiz', question: "Какая зона самая тёплая?", options: ["Степь", "Пустыня", "Тропики"], correctAnswer: "Тропики", hint: "Тропики - у экватора" }
    ],
    reward: { stars: 3, message: "Здорово! Ты знаешь природные зоны! 🌍" }
  },
  {
    title: "Солнечная система",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Сколько планет в Солнечной системе?", options: ["7", "8", "9"], correctAnswer: "8", hint: "Плутон больше не считается планетой" },
      { type: 'quiz', question: "Какая планета самая большая?", options: ["Земля", "Юпитер", "Сатурн"], correctAnswer: "Юпитер", hint: "Юпитер - газовый гигант" },
      { type: 'find', question: "Выбери планеты земной группы:", options: ["Меркурий", "Юпитер", "Земля", "Марс", "Нептун"], correctAnswer: ["Меркурий", "Земля", "Марс"], hint: "Планеты земной группы - твёрдые" },
      { type: 'quiz', question: "Какая планета ближе всего к Солнцу?", options: ["Венера", "Меркурий", "Земля"], correctAnswer: "Меркурий", hint: "Меркурий - первая от Солнца" }
    ],
    reward: { stars: 3, message: "Космически! Ты знаешь Солнечную систему! 🚀" }
  },
  {
    title: "Животный мир",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какие животные делают запасы на зиму?", options: ["Волки", "Белки", "Медведи"], correctAnswer: "Белки", hint: "Белки прячут орехи" },
      { type: 'find', question: "Выбери животных, которые впадают в спячку:", options: ["Медведь", "Заяц", "Ёж", "Белка", "Суслик"], correctAnswer: ["Медведь", "Ёж", "Суслик"], hint: "Спячка помогает пережить зиму" },
      { type: 'quiz', question: "Какое животное меняет шубку зимой?", options: ["Лиса", "Заяц", "Волк"], correctAnswer: "Заяц", hint: "Заяц белеет зимой" },
      { type: 'quiz', question: "Кто строит плотины?", options: ["Бобры", "Выдры", "Нутрии"], correctAnswer: "Бобры", hint: "Бобры - отличные строители" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь животных! 🐾" }
  },
  {
    title: "Растения",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какой орган растения поглощает воду из почвы?", options: ["Листья", "Корень", "Стебель"], correctAnswer: "Корень", hint: "Корень всасывает воду и минералы" },
      { type: 'find', question: "Выбери части растения:", options: ["Корень", "Почка", "Стебель", "Лист", "Сердце"], correctAnswer: ["Корень", "Стебель", "Лист"], hint: "Органы растения" },
      { type: 'quiz', question: "Для чего растениям нужны листья?", options: ["Для дыхания и фотосинтеза", "Для красоты", "Для защиты"], correctAnswer: "Для дыхания и фотосинтеза", hint: "В листьях происходит фотосинтез" },
      { type: 'quiz', question: "Какое растение хвойное?", options: ["Дуб", "Сосна", "Берёза"], correctAnswer: "Сосна", hint: "Сосна имеет иголки" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь растения! 🌿" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Present Simple",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I ___ to school every day.", options: ["go", "goes", "going"], correctAnswer: "go", hint: "Present Simple для I - без окончаний" },
      { type: 'quiz', question: "She ___ English.", options: ["speak", "speaks", "speaking"], correctAnswer: "speaks", hint: "Для he/she добавляем -s" },
      { type: 'fill', question: "They ___ (play) football.", correctAnswer: "play", hint: "They - множественное число" },
      { type: 'quiz', question: "Do you like apples? - Yes, I ___.", options: ["do", "does", "am"], correctAnswer: "do", hint: "Краткий ответ с do" }
    ],
    reward: { stars: 3, message: "Great! Отлично! Present Simple! 🇬🇧" }
  },
  {
    title: "Numbers 1-100",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Twenty-five - это...", options: ["15", "25", "35"], correctAnswer: "25", hint: "Twenty = 20, five = 5" },
      { type: 'fill', question: "30 по-английски: ___", correctAnswer: "thirty", hint: "Thirty = 30" },
      { type: 'quiz', question: "Как будет 77?", options: ["seventy-seven", "seventy-seven", "seventy seven"], correctAnswer: "seventy-seven", hint: "Десятки-единицы через дефис" },
      { type: 'find', question: "Выбери числа:", options: ["Fifteen", "Apple", "Sixty", "Cat", "Hundred"], correctAnswer: ["Fifteen", "Sixty", "Hundred"], hint: "Numbers = числа" }
    ],
    reward: { stars: 3, message: "Excellent! Превосходно! 🔢" }
  },
  {
    title: "Colors and Shapes",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Red - это...", options: ["Синий", "Красный", "Зелёный"], correctAnswer: "Красный", hint: "Red = красный" },
      { type: 'quiz', question: "Как будет «круг» по-английски?", options: ["Square", "Circle", "Triangle"], correctAnswer: "Circle", hint: "Circle = круг" },
      { type: 'find', question: "Выбери цвета:", options: ["Blue", "Dog", "Green", "Table", "Yellow"], correctAnswer: ["Blue", "Green", "Yellow"], hint: "Colors = цвета" },
      { type: 'fill', question: "A square has __ sides. (четыре)", correctAnswer: "four", hint: "У квадрата 4 стороны" }
    ],
    reward: { stars: 3, message: "Wonderful! Прекрасно! 🎨" }
  },

  // ========== ИНФОРМАТИКА ==========
  {
    title: "Алгоритмы",
    subject: "Информатика",
    icon: "Cpu",
    color: "text-purple-400",
    tasks: [
      { type: 'quiz', question: "Что такое алгоритм?", options: ["Загадка", "Порядок действий", "Сказка"], correctAnswer: "Порядок действий", hint: "Алгоритм - последовательность шагов" },
      { type: 'find', question: "Выбери примеры алгоритмов:", options: ["Рецепт блюда", "Стихотворение", "Инструкция по сборке", "Роман"], correctAnswer: ["Рецепт блюда", "Инструкция по сборке"], hint: "Алгоритм имеет последовательность шагов" },
      { type: 'quiz', question: "Какой фигурой обозначается начало алгоритма?", options: ["Прямоугольник", "Овал", "Ромб"], correctAnswer: "Овал", hint: "Начало и конец - овал" },
      { type: 'quiz', question: "Какой фигурой обозначается действие?", options: ["Прямоугольник", "Овал", "Ромб"], correctAnswer: "Прямоугольник", hint: "Действие - прямоугольник" }
    ],
    reward: { stars: 3, message: "Отлично! Ты понимаешь алгоритмы! 💻" }
  },

  // ========== РОБОТОТЕХНИКА ==========
  {
    title: "Основы робототехники",
    subject: "Робототехника",
    icon: "Bot",
    color: "text-cyan-400",
    tasks: [
      { type: 'quiz', question: "Что такое робот?", options: ["Живое существо", "Машина, выполняющая действия", "Книга"], correctAnswer: "Машина, выполняющая действия", hint: "Робот - механическое устройство" },
      { type: 'find', question: "Выбери части робота:", options: ["Датчики", "Крылья", "Моторы", "Жабры", "Процессор"], correctAnswer: ["Датчики", "Моторы", "Процессор"], hint: "Робот состоит из механизмов и электроники" },
      { type: 'quiz', question: "Для чего роботу нужны датчики?", options: ["Для красоты", "Для получения информации", "Для питания"], correctAnswer: "Для получения информации", hint: "Датчики собирают данные об окружении" },
      { type: 'quiz', question: "Какой робот помогает на производстве?", options: ["Промышленный", "Развлекательный", "Бытовой"], correctAnswer: "Промышленный", hint: "Промышленные роботы собирают машины" }
    ],
    reward: { stars: 3, message: "Круто! Ты знаешь робототехнику! 🤖" }
  },

  // ========== ЭТИКА ==========
  {
    title: "Правила этикета",
    subject: "Этика",
    icon: "Heart",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Как нужно здороваться со старшими?", options: ["Молча", "Громко крикнуть", "Вежливо сказать «Здравствуйте»"], correctAnswer: "Вежливо сказать «Здравствуйте»", hint: "Уважение к старшим - важно" },
      { type: 'find', question: "Выбери вежливые слова:", options: ["Спасибо", "Подай", "Пожалуйста", "Дай", "Извините"], correctAnswer: ["Спасибо", "Пожалуйста", "Извините"], hint: "Вежливые слова показывают воспитание" },
      { type: 'quiz', question: "Как поступить, если нечаянно толкнул кого-то?", options: ["Пройти мимо", "Извиниться", "Обвинить другого"], correctAnswer: "Извиниться", hint: "Нужно извиниться" },
      { type: 'quiz', question: "Можно ли перебивать говорящего?", options: ["Да", "Нет", "Иногда"], correctAnswer: "Нет", hint: "Перебивать невежливо" }
    ],
    reward: { stars: 3, message: "Отлично! Ты вежливый человек! 💖" }
  }
]
