import { SubjectData, GameLesson } from '@/data/types'

export const lessons: SubjectData = {
  title: "Иностранный язык",
  icon: "Languages",
  color: "text-pink-400",
  topics: ["Daily Life", "Travel and Tourism", "Environment", "Technology"],
  detailedTopics: [
    {
      topic: "Daily Life",
      lessons: [
        {
          title: "Daily Routines and Habits",
          description: `**Daily Routines** — повседневные дела и привычки.

**Present Simple for Routines:**
- I usually wake up at 7 o'clock.
- She always has breakfast at 8 am.
- We often go to school by bus.

**Frequency Adverbs:**
- Always — всегда (100%)
- Usually — обычно (80%)
- Often — часто (60%)
- Sometimes — иногда (40%)
- Rarely — редко (20%)
- Never — никогда (0%)

**Position in sentence:**
- Before the main verb: I always eat breakfast.
- After 'to be': She is never late.

**Daily Activities:**
- Wake up — просыпаться
- Get up — вставать
- Have breakfast — завтракать
- Go to school — идти в школу
- Have lunch — обедать
- Do homework — делать домашнюю работу
- Have dinner — ужинать
- Go to bed — ложиться спать

**Time Expressions:**
- In the morning — утром
- In the afternoon — днём
- In the evening — вечером
- At night — ночью
- At noon — в полдень`,
          tasks: [
            "Translate: Я обычно просыпаюсь в 7 часов",
            "Put the adverb: She (often) is late for school",
            "Make a sentence: always / I / breakfast / have",
            "Write 5 daily activities"
          ]
        },
        {
          title: "Household Chores",
          description: `**Household Chores** — домашние обязанности.

**Common Chores:**
- Do the washing-up — мыть посуду
- Do the laundry — стирать бельё
- Do the ironing — гладить
- Do the cleaning — убираться
- Make the bed — заправлять постель
- Take out the rubbish — выносить мусор
- Vacuum the carpet — пылесосить ковёр
- Water the plants — поливать растения
- Walk the dog — гулять с собакой

**Modal Verbs for Obligation:**

**Have to / Has to:**
- I have to clean my room.
- She has to wash the dishes.
- Do you have to cook dinner?

**Must:**
- You must help your parents.
- I must do my homework.

**Should:**
- You should help your mother.
- Children should make their beds.

**Questions:**
- What chores do you do?
- Who has to do the washing-up?
- How often do you clean your room?

**Making Requests:**
- Can you help me, please?
- Could you take out the rubbish?
- Would you mind doing the dishes?`,
          tasks: [
            "Translate: Мне нужно помыть посуду",
            "Make a question: you / have to / do / chores / what?",
            "Write 5 household chores",
            "Use 'should': help / parents / you / your"
          ]
        }
      ]
    },
    {
      topic: "Travel and Tourism",
      lessons: [
        {
          title: "Planning a Trip",
          description: `**Travel Vocabulary:**
- Journey — путешествие
- Trip — поездка
- Tour — тур, экскурсия
- Voyage — морское путешествие
- Excursion — экскурсия

**Transport:**
- By plane — самолётом
- By train — поездом
- By bus — автобусом
- By car — на машине
- By ship — кораблём
- On foot — пешком

**At the Airport:**
- Check-in — регистрация
- Boarding pass — посадочный талон
- Gate — выход на посадку
- Departure — отправление
- Arrival — прибытие
- Luggage / baggage — багаж
- Delay — задержка

**Booking a Hotel:**
- Book a room — забронировать номер
- Single room — одноместный номер
- Double room — двухместный номер
- Check in — заселиться
- Check out — выселиться

**Future Tenses for Plans:**

**Going to:**
- I'm going to visit Paris.
- We're going to stay at a hotel.

**Present Continuous:**
- I'm flying to London tomorrow.
- She's leaving next week.`,
          tasks: [
            "Translate: Я собираюсь посетить Лондон",
            "Write 5 types of transport",
            "Make a sentence: going to / I / visit / Paris",
            "What's the difference: journey / trip / voyage?"
          ]
        },
        {
          title: "Sightseeing and Activities",
          description: `**Places to Visit:**
- Museum — музей
- Gallery — галерея
- Cathedral — собор
- Castle — замок
- Palace — дворец
- Monument — памятник
- Fountain — фонтан
- Square — площадь
- Bridge — мост

**Useful Phrases:**
- What's there to see?
- How do I get to...?
- Is it far from here?
- Can you show me on the map?
- How much is the entrance fee?
- What time does it open/close?

**Describing Places:**
- Beautiful — красивый
- Magnificent — величественный
- Ancient — древний
- Modern — современный
- Crowded — переполненный
- Peaceful — спокойный
- Touristy — туристический

**Past Simple for Travel Stories:**
- I visited the Louvre last year.
- We saw many interesting places.
- Did you go to the Eiffel Tower?
- We didn't have enough time.

**Writing a Postcard:**
Dear [Name],
I'm writing from [city].
Yesterday I visited [place].
It was [adjective].
Tomorrow I'm going to [plan].
See you soon!
Love,
[Your name]`,
          tasks: [
            "Translate: Как добраться до музея?",
            "Write 5 adjectives to describe places",
            "Tell about your last trip (5 sentences)",
            "Write a postcard from London"
          ]
        }
      ]
    },
    {
      topic: "Environment",
      lessons: [
        {
          title: "Environmental Problems",
          description: `**Environmental Issues:**
- Pollution — загрязнение
- Air pollution — загрязнение воздуха
- Water pollution — загрязнение воды
- Global warming — глобальное потепление
- Climate change — изменение климата
- Deforestation — вырубка лесов
- Endangered species — исчезающие виды
- Waste — отходы
- Plastic — пластик

**Causes:**
- Cars produce exhaust fumes.
- Factories pollute the air.
- People cut down forests.
- We use too much plastic.

**Consequences:**
- Animals lose their habitats.
- The ice caps are melting.
- Sea levels are rising.
- Weather is becoming extreme.

**Modal Verbs for Environment:**

**Should:**
- We should recycle more.
- People should use public transport.

**Must:**
- We must protect nature.
- Governments must take action.

**First Conditional:**
- If we don't act, the climate will change.
- If people recycle, there will be less waste.

**Vocabulary for Solutions:**
- Recycle — перерабатывать
- Reuse — использовать повторно
- Reduce — уменьшать
- Save energy — экономить энергию
- Use public transport — пользоваться общественным транспортом
- Plant trees — сажать деревья`,
          tasks: [
            "Translate: Мы должны защищать природу",
            "Write 5 environmental problems",
            "Make a sentence with First Conditional",
            "What should people do to help?"
          ]
        }
      ]
    },
    {
      topic: "Technology",
      lessons: [
        {
          title: "Digital World",
          description: `**Technology Vocabulary:**
- Computer — компьютер
- Laptop — ноутбук
- Smartphone — смартфон
- Tablet — планшет
- Internet — интернет
- Website — веб-сайт
- App — приложение
- Social media — социальные сети
- Email — электронная почта

**Digital Activities:**
- Go online — выходить в интернет
- Browse the web — просматривать веб-страницы
- Download files — скачивать файлы
- Upload photos — загружать фото
- Send messages — отправлять сообщения
- Make video calls — делать видеозвонки
- Play online games — играть в онлайн-игры

**Present Perfect for Experience:**
- I have bought a new smartphone.
- Have you ever used this app?
- She has never played this game.
- We have downloaded many songs.

**Internet Safety:**
- Keep your password safe.
- Don't share personal information.
- Be careful with strangers online.
- Ask parents for help.

**Advantages and Disadvantages:**

**Pros:**
- Easy communication
- Access to information
- Entertainment
- Online shopping

**Cons:**
- Addiction to gadgets
- Less physical activity
- Cyberbullying
- Fake information`,
          tasks: [
            "Translate: Я никогда не играл в эту игру",
            "Write 5 digital devices",
            "Present Perfect: you / ever / use / this app?",
            "Write about pros and cons of the Internet"
          ]
        }
      ]
    }
  ]
}

export const games: GameLesson[] = [
  {
    title: "Daily Life",
    subject: "English",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "What time do you ___ get up?", options: ["usually", "ever", "never", "always"], correctAnswer: "usually", hint: "Frequency adverb" },
      { type: 'quiz', question: "She ___ has breakfast at 8 am.", options: ["have to", "has to", "must to", "should to"], correctAnswer: "has to", hint: "Obligation for he/she/it" },
      { type: 'find', question: "Select household chores:", options: ["Do homework", "Do the washing-up", "Watch TV", "Make the bed", "Play games"], correctAnswer: ["Do the washing-up", "Make the bed"], hint: "Work around the house" },
      { type: 'quiz', question: "I'm ___ visit Paris next summer.", options: ["will", "going to", "will be", "would"], correctAnswer: "going to", hint: "Plans for future" }
    ],
    reward: { stars: 3, message: "Excellent! You know daily routines! 🌟" }
  },
  {
    title: "Travel and Environment",
    subject: "English",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "What's the Russian for 'boarding pass'?", options: ["Билет", "Посадочный талон", "Багаж", "Регистрация"], correctAnswer: "Посадочный талон", hint: "At the airport" },
      { type: 'quiz', question: "We ___ protect nature.", options: ["should", "must", "have", "need"], correctAnswer: "must", hint: "Strong obligation" },
      { type: 'find', question: "Select environmental problems:", options: ["Pollution", "Journey", "Global warming", "Deforestation", "Hotel"], correctAnswer: ["Pollution", "Global warming", "Deforestation"], hint: "Issues with nature" },
      { type: 'quiz', question: "Have you ever ___ this app?", options: ["use", "used", "using", "uses"], correctAnswer: "used", hint: "Present Perfect" }
    ],
    reward: { stars: 3, message: "Great job! You're an English pro! 🎉" }
  }
]
