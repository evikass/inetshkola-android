import { SubjectData, GameLesson } from '@/data/types'

const L = (title: string, description: string, tasks: string[]) => ({ title, description, tasks })

export const lessons: SubjectData = {
  title: "Иностранный язык",
  icon: "Languages",
  color: "text-pink-400",
  topics: ["Alphabet", "Numbers", "Colors", "Family", "Animals", "Food", "Daily routine"],
  detailedTopics: [
    {
      topic: "Alphabet and Sounds",
      lessons: [
        L("Урок 1: English Alphabet", "Английский алфавит.", [
          "26 букв в алфавите",
          "A B C D E F G...",
          "Спеть песенку ABC",
          "Запомнить порядок букв"
        ]),
        L("Урок 2: Vowels and Consonants", "Гласные и согласные.", [
          "Гласные: A, E, I, O, U",
          "Y иногда гласная",
          "Произношение звуков",
          "Прочитать слова"
        ]),
        L("Урок 3: Reading Rules", "Правила чтения.", [
          "Open syllable: name, like",
          "Closed syllable: cat, dog",
          "Прочитать слова",
          "Найти различия"
        ]),
        L("Урок 4: Common Words", "Частые слова.", [
          "the, and, is, it, to",
          "Прочитать предложения",
          "Составить фразы",
          "Использовать в речи"
        ])
      ]
    },
    {
      topic: "Numbers and Colors",
      lessons: [
        L("Урок 5: Numbers 1-20", "Числа от 1 до 20.", [
          "One, two, three, four...",
          "Eleven, twelve, thirteen...",
          "Посчитать предметы",
          "Назвать возраст"
        ]),
        L("Урок 6: Numbers 20-100", "Десятки до ста.", [
          "Twenty, thirty, forty...",
          "25 = twenty-five",
          "Назвать числа",
          "Решить примеры"
        ]),
        L("Урок 7: Colors", "Цвета.", [
          "Red, blue, green, yellow",
          "Orange, purple, pink, brown",
          "Описать предметы",
          "Назвать любимый цвет"
        ]),
        L("Урок 8: Shapes", "Фигуры.", [
          "Circle, square, triangle",
          "Rectangle, oval",
          "Найти фигуры",
          "Нарисовать фигуры"
        ])
      ]
    },
    {
      topic: "Family and People",
      lessons: [
        L("Урок 9: Family Members", "Члены семьи.", [
          "Mother, father, sister, brother",
          "Grandmother, grandfather",
          "Описать семью",
          "Нарисовать семейное дерево"
        ]),
        L("Урок 10: Describing People", "Описание людей.", [
          "Tall, short, young, old",
          "Hair: long, short, curly",
          "Eyes: blue, brown, green",
          "Описать друга"
        ]),
        L("Урок 11: Body Parts", "Части тела.", [
          "Head, shoulders, knees, toes",
          "Eyes, ears, nose, mouth",
          "Спеть песенку",
          "Показать на себе"
        ]),
        L("Урок 12: Clothes", "Одежда.", [
          "Shirt, dress, pants, skirt",
          "Hat, coat, shoes, socks",
          "Описать одежду",
          "Что ты носишь?"
        ])
      ]
    },
    {
      topic: "Animals and Nature",
      lessons: [
        L("Урок 13: Pets", "Домашние питомцы.", [
          "Cat, dog, fish, hamster",
          "Bird, rabbit, turtle",
          "Описать питомца",
          "У кого есть питомец?"
        ]),
        L("Урок 14: Wild Animals", "Дикие животные.", [
          "Lion, tiger, elephant, bear",
          "Monkey, giraffe, zebra",
          "Где они живут?",
          "Описать животное"
        ]),
        L("Урок 15: Farm Animals", "Домашние животные.", [
          "Cow, pig, sheep, horse",
          "Chicken, duck, goat",
          "Что они дают?",
          "Звуки животных"
        ]),
        L("Урок 16: Weather", "Погода.", [
          "Sunny, rainy, cloudy, windy",
          "Snowy, hot, cold, warm",
          "Какая сегодня погода?",
          "Одежда по погоде"
        ])
      ]
    },
    {
      topic: "Food and Drinks",
      lessons: [
        L("Урок 17: Fruits and Vegetables", "Фрукты и овощи.", [
          "Apple, banana, orange",
          "Carrot, potato, tomato",
          "Что ты любишь?",
          "I like... / I don't like..."
        ]),
        L("Урок 18: Food", "Еда.", [
          "Bread, cheese, meat, fish",
          "Rice, pasta, soup, salad",
          "Что на обед?",
          "Составить меню"
        ]),
        L("Урок 19: Drinks", "Напитки.", [
          "Water, milk, juice, tea",
          "Coffee, soda",
          "Что ты пьёшь?",
          "В кафе"
        ]),
        L("Урок 20: At the Cafe", "В кафе.", [
          "Can I have...?",
          "Here you are",
          "Thank you",
          "Диалог в кафе"
        ])
      ]
    },
    {
      topic: "Daily Routine",
      lessons: [
        L("Урок 21: Time", "Время.", [
          "What time is it?",
          "o'clock, half past",
          "It's 3 o'clock",
          "Режим дня"
        ]),
        L("Урок 22: Daily Activities", "Ежедневные дела.", [
          "Wake up, get up, wash",
          "Have breakfast, go to school",
          "Describe your day",
          "Приёмы пищи"
        ]),
        L("Урок 23: Days of Week", "Дни недели.", [
          "Monday, Tuesday, Wednesday...",
          "Sunday is the first day",
          "Что ты делаешь в...?",
          "Расписание"
        ]),
        L("Урок 24: Months and Seasons", "Месяцы и сезоны.", [
          "January, February, March...",
          "Winter, spring, summer, autumn",
          "Какой сейчас месяц?",
          "Любимое время года"
        ])
      ]
    }
  ]
}

export const games: GameLesson[] = [
  {
    title: "Numbers in English",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Как будет «5» на английском?", options: ["four", "five", "six"], correctAnswer: "five", hint: "1-one, 2-two, 3-three, 4-four, 5-?" },
      { type: 'quiz', question: "Как будет «12» на английском?", options: ["twelve", "twenty", "two"], correctAnswer: "twelve", hint: "11-eleven, 12-?" },
      { type: 'fill', question: "«25» по-английски: twenty-__", correctAnswer: "five", hint: "25 = twenty-five" },
      { type: 'quiz', question: "Какое число «seventeen»?", options: ["16", "17", "18"], correctAnswer: "17", hint: "Seven + teen = seventeen" }
    ],
    reward: { stars: 3, message: "Great! You know numbers! 🔢" }
  },
  {
    title: "Colors in English",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Как будет «красный» на английском?", options: ["red", "blue", "green"], correctAnswer: "red", hint: "Apple is red" },
      { type: 'quiz', question: "Какой цвет «yellow»?", options: ["жёлтый", "зелёный", "синий"], correctAnswer: "жёлтый", hint: "Sun is yellow" },
      { type: 'find', question: "Выбери названия цветов:", options: ["Red", "Cat", "Blue", "Green", "Dog", "Yellow"], correctAnswer: ["Red", "Blue", "Green", "Yellow"], hint: "Colors are: red, blue, green, yellow..." },
      { type: 'quiz', question: "Как будет «оранжевый»?", options: ["orange", "purple", "pink"], correctAnswer: "orange", hint: "Orange fruit is orange!" }
    ],
    reward: { stars: 3, message: "Excellent! You know colors! 🎨" }
  },
  {
    title: "Family Members",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "«Mother» — это:", options: ["папа", "мама", "сестра"], correctAnswer: "мама", hint: "Mother = мама" },
      { type: 'quiz', question: "Как будет «бабушка» на английском?", options: ["grandmother", "grandfather", "mother"], correctAnswer: "grandmother", hint: "Grand + mother = grandmother" },
      { type: 'fill', question: "Brother — это __", correctAnswer: "брат", hint: "Brother = брат, Sister = сестра" },
      { type: 'quiz', question: "«Father» — это:", options: ["отец", "дедушка", "брат"], correctAnswer: "отец", hint: "Father = папа, отец" }
    ],
    reward: { stars: 3, message: "Great! You know family! 👨‍👩‍👧‍👦" }
  },
  {
    title: "Animals in English",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Как будет «кошка» на английском?", options: ["dog", "cat", "bird"], correctAnswer: "cat", hint: "Meow! 🐱" },
      { type: 'quiz', question: "«Dog» — это:", options: ["собака", "кошка", "лошадь"], correctAnswer: "собака", hint: "Woof! 🐕" },
      { type: 'quiz', question: "Как будет «лев»?", options: ["tiger", "lion", "bear"], correctAnswer: "lion", hint: "King of the jungle 🦁" },
      { type: 'fill', question: "Elephant — это __", correctAnswer: "слон", hint: "Big grey animal with a trunk 🐘" }
    ],
    reward: { stars: 3, message: "Super! You know animals! 🐾" }
  },
  {
    title: "Food and Drinks",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "«Apple» — это:", options: ["апельсин", "яблоко", "банан"], correctAnswer: "яблоко", hint: "Red or green fruit 🍎" },
      { type: 'quiz', question: "Как будет «хлеб» на английском?", options: ["bread", "water", "milk"], correctAnswer: "bread", hint: "Bread 🍞" },
      { type: 'quiz', question: "«Water» — это:", options: ["молоко", "вода", "сок"], correctAnswer: "вода", hint: "We drink water 💧" },
      { type: 'fill', question: "Banana — это __", correctAnswer: "банан", hint: "Yellow fruit 🍌" }
    ],
    reward: { stars: 3, message: "Excellent! You know food! 🍎" }
  },
  {
    title: "Days and Months",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Как будет «понедельник»?", options: ["Monday", "Sunday", "Friday"], correctAnswer: "Monday", hint: "First day of the week" },
      { type: 'quiz', question: "«Sunday» — это:", options: ["суббота", "воскресенье", "понедельник"], correctAnswer: "воскресенье", hint: "Last day of the week" },
      { type: 'quiz', question: "Какой месяц «January»?", options: ["февраль", "январь", "март"], correctAnswer: "январь", hint: "First month of the year" },
      { type: 'quiz', question: "Как будет «лето»?", options: ["spring", "summer", "winter"], correctAnswer: "summer", hint: "Hot season with holidays ☀️" }
    ],
    reward: { stars: 3, message: "Great! You know calendar! 📅" }
  },
  {
    title: "Body Parts",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "«Head» — это:", options: ["рука", "голова", "нога"], correctAnswer: "голова", hint: "On your shoulders" },
      { type: 'quiz', question: "Как будет «глаза»?", options: ["ears", "eyes", "nose"], correctAnswer: "eyes", hint: "Two eyes to see 👀" },
      { type: 'fill', question: "Nose — это __", correctAnswer: "нос", hint: "On your face, you breathe with it 👃" },
      { type: 'quiz', question: "«Hands» — это:", options: ["ноги", "руки", "уши"], correctAnswer: "руки", hint: "You write with your hands ✋" }
    ],
    reward: { stars: 3, message: "Super! You know body parts! 🫀" }
  },
  {
    title: "Basic Phrases",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "«Hello» — это:", options: ["пока", "привет", "спасибо"], correctAnswer: "привет", hint: "Greeting" },
      { type: 'quiz', question: "Как сказать «спасибо»?", options: ["Please", "Thank you", "Sorry"], correctAnswer: "Thank you", hint: "When someone helps you" },
      { type: 'quiz', question: "«Goodbye» — это:", options: ["здравствуйте", "до свидания", "извините"], correctAnswer: "до свидания", hint: "When you leave" },
      { type: 'fill', question: "«Как дела?» — How __ you?", correctAnswer: "are", hint: "How are you?" }
    ],
    reward: { stars: 3, message: "Excellent! You know phrases! 💬" }
  }
]
