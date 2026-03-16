import { SubjectData, GameLesson } from '@/data/types'

export const lessons: SubjectData = {
  title: "Иностранный язык",
  icon: "Languages",
  color: "text-pink-400",
  topics: [
    "Путешествия и туризм",
    "Профессии и карьера",
    "Экология и окружающая среда",
    "Средства массовой информации",
    "Научно-технический прогресс"
  ],
  detailedTopics: [
    {
      topic: "Путешествия и туризм",
      lessons: [
        {
          title: "Виды путешествий",
          description: `Изучение лексики по теме путешествия: авиаперелёты, железнодорожные поездки, круизы, автотуризм.

**Travel vocabulary:** flight (полёт), journey (путешествие), destination (место назначения), accommodation (размещение), itinerary (маршрут), sightseeing (осмотр достопримечательностей).

**Present Perfect для описания опыта путешествий:**
- I have visited Paris. (Я посетил Париж.)
- She has never been to London. (Она никогда не была в Лондоне.)
- Have you ever travelled by train? (Вы когда-нибудь путешествовали на поезде?)`,
          tasks: [
            "Как перевести слово destination?",
            "Когда используется Present Perfect для описания путешествий?",
            "Образуйте Past Participle от глагола be",
            "Составьте предложение: Я никогда не был в Японии"
          ]
        },
        {
          title: "В аэропорту",
          description: `Лексика для ориентирования в аэропорту: регистрация, паспортный контроль, таможня, посадка.

**Airport vocabulary:** check-in (регистрация), boarding pass (посадочный талон), departure lounge (зал вылета), gate (выход на посадку), customs (таможня), baggage claim (получение багажа).

**Useful phrases:**
- Where is the check-in counter? (Где стойка регистрации?)
- I'd like a window seat. (Я хотел бы место у окна.)
- My flight has been delayed. (Мой рейс задержан.)
- I've lost my luggage. (Я потерял багаж.)`,
          tasks: [
            "Как сказать «посадочный талон» на английском?",
            "Где получают багаж после прилёта?",
            "Переведите: I'd like an aisle seat",
            "Что означает фраза «boarding pass»?"
          ]
        },
        {
          title: "В гостинице",
          description: `Бронирование номера, регистрация заезда и выезда, решение проблем в отеле.

**Hotel vocabulary:** reservation (бронирование), check-in/out (заезд/выезд), room service (обслуживание номеров), amenities (удобства), deposit (залог), complimentary (бесплатный).

**Making a reservation:**
- I'd like to book a room for two nights. (Я хотел бы забронировать номер на две ночи.)
- Do you have any vacancies? (У вас есть свободные номера?)
- What's the rate per night? (Какая цена за ночь?)
- Is breakfast included? (Завтрак включён?)`,
          tasks: [
            "Что означает слово complimentary?",
            "Как забронировать номер на английском?",
            "Переведите: amenities",
            "Как спросить, включён ли завтрак?"
          ]
        }
      ]
    },
    {
      topic: "Профессии и карьера",
      lessons: [
        {
          title: "Мир профессий",
          description: `Изучение названий профессий, описание обязанностей и требований. Модальные глаголы для описания профессиональных требований.

**Professions:** doctor (врач), engineer (инженер), lawyer (юрист), accountant (бухгалтер), software developer (разработчик ПО), journalist (журналист), architect (архитектор).

**Modal verbs for job requirements:**
- You must have a medical degree to become a doctor. (Вы должны иметь медицинскую степень.)
- You should be good at math for engineering. (Вам следует быть хорошим в математике.)
- You need to be creative as a designer. (Вам нужно быть креативным.)`,
          tasks: [
            "Как будет «архитектор» на английском?",
            "Какой модальный глагол выражает обязательность?",
            "Переведите: software developer",
            "Опишите требования к профессии врача"
          ]
        },
        {
          title: "Поиск работы",
          description: `Написание резюме, сопроводительного письма, подготовка к собеседованию.

**Job search vocabulary:** CV/resume (резюме), cover letter (сопроводительное письмо), interview (собеседование), vacancy (вакансия), applicant (соискатель), salary (зарплата), benefits (льготы).

**Interview phrases:**
- Tell me about yourself. (Расскажите о себе.)
- Why do you want this job? (Почему вы хотите эту работу?)
- What are your strengths and weaknesses? (Какие ваши сильные и слабые стороны?)
- When can you start? (Когда вы можете начать?)`,
          tasks: [
            "Чем отличается CV от cover letter?",
            "Как ответить на вопрос о сильных сторонах?",
            "Переведите: vacancy",
            "Какие вопросы задают на собеседовании?"
          ]
        },
        {
          title: "Деловое общение",
          description: `Деловая переписка, телефонные разговоры, презентации. Профессиональный этикет.

**Business vocabulary:** meeting (встреча), deadline (крайний срок), proposal (предложение), negotiation (переговоры), contract (контракт), partnership (партнёрство).

**Email phrases:**
- I am writing to inquire about... (Я пишу, чтобы узнать о...)
- Please find attached... (Пожалуйста, найдите во вложении...)
- I look forward to hearing from you. (Жду вашего ответа.)
- Thank you for your consideration. (Спасибо за рассмотрение.)`,
          tasks: [
            "Что такое deadline?",
            "Как начать деловое письмо?",
            "Переведите: negotiation",
            "Как вежливо закончить деловое письмо?"
          ]
        }
      ]
    },
    {
      topic: "Экология и окружающая среда",
      lessons: [
        {
          title: "Экологические проблемы",
          description: `Изучение лексики по теме экологии: загрязнение, изменение климата, исчезновение видов.

**Environmental problems:** pollution (загрязнение), climate change (изменение климата), global warming (глобальное потепление), deforestation (вырубка лесов), endangered species (исчезающие виды).

**Causes and effects:**
- Pollution causes health problems. (Загрязнение вызывает проблемы со здоровьем.)
- Deforestation leads to habitat loss. (Вырубка лесов ведёт к потере среды обитания.)
- Carbon emissions contribute to global warming. (Выбросы углерода способствуют глобальному потеплению.)`,
          tasks: [
            "Что означает endangered species?",
            "Какие причины глобального потепления?",
            "Переведите: deforestation",
            "Опишите последствия загрязнения"
          ]
        },
        {
          title: "Защита окружающей среды",
          description: `Способы защиты природы: переработка, энергосбережение, устойчивое развитие.

**Environmental protection:** recycling (переработка), renewable energy (возобновляемая энергия), sustainable development (устойчивое развитие), conservation (сохранение), eco-friendly (экологичный).

**Actions:**
- We should reduce, reuse, and recycle. (Мы должны сокращать, повторно использовать и перерабатывать.)
- We can use public transport instead of driving. (Мы можем использовать общественный транспорт.)
- We need to protect natural habitats. (Нам нужно защищать естественную среду.)`,
          tasks: [
            "Что означает eco-friendly?",
            "Назовите три принципа защиты среды (3 R's)",
            "Переведите: renewable energy",
            "Как можно снизить углеродный след?"
          ]
        }
      ]
    },
    {
      topic: "Средства массовой информации",
      lessons: [
        {
          title: "Типы СМИ",
          description: `Изучение типов средств массовой информации: печать, радио, телевидение, интернет-медиа.

**Media types:** newspaper (газета), magazine (журнал), television (телевидение), radio (радио), online news (онлайн-новости), social media (социальные сети).

**Media vocabulary:** journalist (журналист), editor (редактор), headline (заголовок), article (статья), broadcast (трансляция), coverage (освещение).`,
          tasks: [
            "Чем отличается newspaper от magazine?",
            "Что такое headline?",
            "Переведите: broadcast",
            "Назовите типы СМИ"
          ]
        },
        {
          title: "Социальные сети",
          description: `Влияние социальных сетей на общество, преимущества и недостатки. Безопасность в интернете.

**Social media vocabulary:** platform (платформа), follower (подписчик), post (публикация), like (лайк), share (поделиться), comment (комментарий), viral (вирусный/популярный).

**Advantages:** staying connected, sharing information, building communities.
**Disadvantages:** fake news, cyberbullying, addiction, privacy concerns.`,
          tasks: [
            "Что означает viral content?",
            "Какие опасности социальных сетей?",
            "Переведите: cyberbullying",
            "Как защитить личную информацию в сети?"
          ]
        }
      ]
    },
    {
      topic: "Научно-технический прогресс",
      lessons: [
        {
          title: "Технологии будущего",
          description: `Изучение лексики по теме технологий: искусственный интеллект, роботы, виртуальная реальность.

**Technology vocabulary:** artificial intelligence (искусственный интеллект), robotics (робототехника), virtual reality (виртуальная реальность), automation (автоматизация), innovation (инновация).

**Future technologies:** self-driving cars (автопилотируемые автомобили), smart homes (умные дома), medical robots (медицинские роботы), space exploration (освоение космоса).`,
          tasks: [
            "Как расшифровывается AI?",
            "Что такое virtual reality?",
            "Переведите: automation",
            "Опишите технологии будущего"
          ]
        },
        {
          title: "Цифровая грамотность",
          description: `Безопасное использование технологий, защита личных данных, критическое мышление в цифровую эпоху.

**Digital literacy vocabulary:** cybersecurity (кибербезопасность), password (пароль), encryption (шифрование), phishing (фишинг), malware (вредоносное ПО), backup (резервная копия).

**Online safety tips:**
- Use strong passwords. (Используйте надёжные пароли.)
- Don't share personal information. (Не делитесь личной информацией.)
- Be careful with email attachments. (Будьте осторожны с вложениями.)
- Update your software regularly. (Регулярно обновляйте ПО.)`,
          tasks: [
            "Что такое phishing?",
            "Как создать надёжный пароль?",
            "Переведите: backup",
            "Какие правила цифровой безопасности?"
          ]
        }
      ]
    }
  ]
}

export const games: GameLesson[] = [
  {
    title: "Путешествия",
    subject: "Иностранный язык",
    icon: "Plane",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "What is 'accommodation'?", options: ["Place to stay", "Type of food", "Transport", "Currency"], correctAnswer: "Place to stay", hint: "Hotel, hostel, etc." },
      { type: 'fill', question: "I'd like a window ___. (место у окна)", correctAnswer: "seat", hint: "On a plane" },
      { type: 'quiz', question: "'Departure' means:", options: ["Leaving", "Arriving", "Staying", "Booking"], correctAnswer: "Leaving", hint: "Opposite of arrival" },
      { type: 'fill', question: "My flight was ___ for two hours. (задержан)", correctAnswer: "delayed", hint: "Not on time" },
      { type: 'quiz', question: "Where do you pick up your luggage?", options: ["Baggage claim", "Check-in", "Gate", "Customs"], correctAnswer: "Baggage claim", hint: "After arrival" }
    ],
    reward: { stars: 3, message: "Отлично! Ты готов к путешествию!" }
  },
  {
    title: "Профессии",
    subject: "Иностранный язык",
    icon: "Briefcase",
    color: "text-pink-400",
    tasks: [
      { type: 'fill', question: "A ___ treats patients in a hospital. (врач)", correctAnswer: "doctor", hint: "Medical professional" },
      { type: 'quiz', question: "Who prepares financial reports?", options: ["Accountant", "Doctor", "Teacher", "Driver"], correctAnswer: "Accountant", hint: "Works with numbers" },
      { type: 'fill', question: "I work as a software ___ at Google. (разработчик)", correctAnswer: "developer", hint: "Creates programs" },
      { type: 'quiz', question: "A lawyer works in:", options: ["Law firm", "Hospital", "School", "Restaurant"], correctAnswer: "Law firm", hint: "Legal services" },
      { type: 'fill', question: "She has been ___ for ten years. (работать)", correctAnswer: "working", hint: "Present perfect continuous" }
    ],
    reward: { stars: 3, message: "Ты хорошо знаешь названия профессий!" }
  },
  {
    title: "Экология",
    subject: "Иностранный язык",
    icon: "Leaf",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "What causes global warming?", options: ["Greenhouse gases", "Recycling", "Wind energy", "Solar panels"], correctAnswer: "Greenhouse gases", hint: "Carbon dioxide, methane" },
      { type: 'fill', question: "We need to ___ plastic waste. (перерабатывать)", correctAnswer: "recycle", hint: "Process for reuse" },
      { type: 'quiz', question: "Which animal is endangered?", options: ["Panda", "Cat", "Dog", "Rabbit"], correctAnswer: "Panda", hint: "Risk of extinction" },
      { type: 'fill', question: "___ is the clearing of forests. (вырубка лесов)", correctAnswer: "Deforestation", hint: "Cutting down trees" },
      { type: 'quiz', question: "Solar and wind are ___ energy sources.", options: ["Renewable", "Fossil", "Nuclear", "Electric"], correctAnswer: "Renewable", hint: "Can be replenished" }
    ],
    reward: { stars: 3, message: "Ты понимаешь экологические проблемы!" }
  },
  {
    title: "СМИ и технологии",
    subject: "Иностранный язык",
    icon: "Monitor",
    color: "text-pink-400",
    tasks: [
      { type: 'fill', question: "The ___ of the article caught my attention. (заголовок)", correctAnswer: "headline", hint: "Title of a news piece" },
      { type: 'quiz', question: "AI stands for:", options: ["Artificial Intelligence", "Automated Internet", "Advanced Innovation", "Audio Interface"], correctAnswer: "Artificial Intelligence", hint: "Smart machines" },
      { type: 'fill', question: "Don't forget to create a ___ of your files. (резервная копия)", correctAnswer: "backup", hint: "Extra copy" },
      { type: 'quiz', question: "Which is a social media platform?", options: ["Instagram", "Microsoft Word", "Google Chrome", "Netflix"], correctAnswer: "Instagram", hint: "Photo and video sharing" },
      { type: 'fill', question: "Virtual ___ creates computer-generated environments. (реальность)", correctAnswer: "reality", hint: "VR technology" }
    ],
    reward: { stars: 3, message: "Отличное знание современной лексики!" }
  },
  {
    title: "Грамматика",
    subject: "Иностранный язык",
    icon: "BookOpen",
    color: "text-pink-400",
    tasks: [
      { type: 'fill', question: "I have ___ been to Paris. (никогда)", correctAnswer: "never", hint: "Negative experience" },
      { type: 'quiz', question: "Choose the correct form: She ___ here for five years.", options: ["has worked", "have worked", "worked", "working"], correctAnswer: "has worked", hint: "Present perfect" },
      { type: 'fill', question: "You ___ wear a seatbelt in a car. (должен)", correctAnswer: "must", hint: "Obligation" },
      { type: 'quiz', question: "I look forward to ___ from you.", options: ["hearing", "hear", "heard", "hears"], correctAnswer: "hearing", hint: "After 'look forward to' use -ing" },
      { type: 'fill', question: "The report was ___ yesterday. (написан)", correctAnswer: "written", hint: "Passive voice" }
    ],
    reward: { stars: 3, message: "Ты отлично владеешь грамматикой!" }
  },
  {
    title: "Деловой английский",
    subject: "Иностранный язык",
    icon: "FileText",
    color: "text-pink-400",
    tasks: [
      { type: 'fill', question: "I'm writing to apply for the ___ of manager. (должность)", correctAnswer: "position", hint: "Job role" },
      { type: 'quiz', question: "What is a 'deadline'?", options: ["Final date", "Starting time", "Meeting", "Contract"], correctAnswer: "Final date", hint: "Time limit" },
      { type: 'fill', question: "Please find my CV ___ to this email. (приложенным)", correctAnswer: "attached", hint: "Included in email" },
      { type: 'quiz', question: "A formal way to end a business email:", options: ["Best regards", "See ya", "Later", "Bye-bye"], correctAnswer: "Best regards", hint: "Professional closing" },
      { type: 'fill', question: "We need to schedule a ___. (встречу)", correctAnswer: "meeting", hint: "Business gathering" }
    ],
    reward: { stars: 3, message: "Ты готов к деловому общению!" }
  }
]
