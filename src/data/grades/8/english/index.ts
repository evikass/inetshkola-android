import { SubjectData, GameLesson } from '@/data/types'

export const lessons: SubjectData = {
  title: "Иностранный язык",
  icon: "Languages",
  color: "text-pink-400",
  topics: [
    "Present Tenses",
    "Past Tenses",
    "Future Tenses",
    "Modal Verbs",
    "Passive Voice",
    "Conditionals",
    "Vocabulary: Daily Life",
    "Reading Comprehension"
  ],
  detailedTopics: [
    {
      topic: "Present Tenses",
      lessons: [
        {
          title: "Present Simple",
          description: `**Present Simple** используется для описания регулярных действий, фактов и постоянных состояний.

**Основные случаи употребления:**
- Регулярные, повторяющиеся действия: *I wake up at 7 o'clock every day.*
- Факты и общеизвестные истины: *The Earth goes round the Sun.*
- Постоянные состояния: *She lives in London.*
- Расписания и программы: *The train leaves at 9:30.*

**Образование утверждений:**
I/You/We/They + V (base form): *I work, we play*
He/She/It + V+s/es: *He works, she watches*

**Образование вопросов:**
Do + I/you/we/they + V?: *Do you like music?*
Does + he/she/it + V?: *Does he play football?*

**Образование отрицаний:**
I/You/We/They + don't + V: *I don't like coffee.*
He/She/It + doesn't + V: *She doesn't work here.*

**Слова-маркеры:**
always, usually, often, sometimes, rarely, never, every day, on Mondays

**Правила правописания:**
- work → works
- play → plays
- watch → watches, teach → teaches
- study → studies
- have → has

**Примеры:**
- *My brother works in a bank.*
- *Do you speak English?*
- *She doesn't eat meat.*`,
          tasks: [
            "Раскройте скобки: He (go) to school every day.",
            "Поставьте вопрос: She plays tennis on Sundays.",
            "Образуйте отрицание: They live in Moscow.",
            "Переведите: Мой папа всегда читает газету утром."
          ]
        },
        {
          title: "Present Continuous",
          description: `**Present Continuous** используется для описания действий, происходящих в данный момент.

**Основные случаи употребления:**
- Действие в момент речи: *I am reading a book now.*
- Временные ситуации: *She is staying with her aunt this week.*
- Развивающиеся ситуации: *The population is growing fast.*
- Планы на ближайшее будущее: *We are meeting tomorrow.*

**Образование:**
I + am + V-ing: *I am working.*
He/She/It + is + V-ing: *She is reading.*
We/You/They + are + V-ing: *They are playing.*

**Вопросы:**
Am I working? Is he reading? Are they playing?

**Отрицания:**
I am not working. She is not (isn't) reading. They are not (aren't) playing.

**Правила правописания:**
- work → working
- make → making (немая -e отпадает)
- run → running (удвоение согласной)
- lie → lying (ie → y)

**Слова-маркеры:**
now, at the moment, at present, today, this week, tonight

**Глаголы, не употребляющиеся в Continuous:**
- состояния: be, have, know, understand, believe
- чувства: like, love, hate, want, prefer
- восприятие: see, hear, smell, taste

**Примеры:**
- *Look! It is raining.*
- *What are you doing now?*
- *She isn't watching TV at the moment.*`,
          tasks: [
            "Раскройте скобки: Look! The children (play) in the garden.",
            "Поставьте вопрос: He is reading a newspaper now.",
            "Образуйте отрицание: We are watching TV.",
            "Выберите правильную форму: I (am knowing / know) him well."
          ]
        },
        {
          title: "Present Perfect",
          description: `**Present Perfect** связывает прошлое с настоящим.

**Основные случаи употребления:**
- Действие завершилось, результат важен сейчас: *I have lost my keys.* (не могу найти)
- Личный опыт: *I have been to Paris.*
- Недавние действия: *She has just arrived.*
- Действия с незавершённым временем: *I have written three letters today.*

**Образование:**
I/You/We/They + have + V3 (past participle)
He/She/It + has + V3

**Правильные глаголы:** work → worked
**Неправильные глаголы:** go → gone, see → seen, write → written

**Вопросы:**
Have you seen this film? Has she finished her work?

**Отрицания:**
I haven't seen him. She hasn't called me.

**Слова-маркеры:**
just, already, yet, ever, never, recently, lately
for (период времени), since (момент времени)

**Present Perfect vs Past Simple:**
- *I have lost my key.* (результат важен — не могу войти)
- *I lost my key yesterday.* (просто факт прошлого)

**Примеры:**
- *I have just finished my homework.*
- *Have you ever been to London?*
- *She has lived here for 5 years.*
- *We haven't met since 2020.*`,
          tasks: [
            "Раскройте скобки: I (see) this film already.",
            "Поставьте вопрос: She has finished the report.",
            "Заполните: I have known him ___ 2015. (for/since)",
            "Выберите время: We (went / have gone) to Paris last year."
          ]
        }
      ]
    },
    {
      topic: "Past Tenses",
      lessons: [
        {
          title: "Past Simple",
          description: `**Past Simple** используется для описания завершённых действий в прошлом.

**Основные случаи употребления:**
- Завершённые действия в прошлом: *I visited Paris last year.*
- Последовательность действий в прошлом: *He came home, had dinner and went to bed.*
- Повторяющиеся действия в прошлом: *We went to the cinema every weekend.*

**Образование правильных глаголов:**
V + ed: work → worked, play → played, watch → watched

**Образование неправильных глаголов:**
go → went, see → saw, have → had, come → came, do → did

**Вопросы:**
Did + subject + V?: *Did you see him yesterday?*

**Отрицания:**
subject + didn't + V: *I didn't go to school yesterday.*

**Правила правописания:**
- work → worked
- live → lived
- study → studied (y после согласной → i)
- stop → stopped (удвоение согласной)
- play → played

**Слова-маркеры:**
yesterday, last week/month/year, ... ago, in 2020, when I was young

**Глагол to be в Past Simple:**
I/He/She/It was: *I was at home.*
We/You/They were: *They were happy.*

**Примеры:**
- *We went to the cinema yesterday.*
- *Did she call you last night?*
- *He didn't understand the question.*
- *When I was a child, I liked ice cream.*`,
          tasks: [
            "Раскройте скобки: We (go) to the park last Sunday.",
            "Поставьте вопрос: She bought a new dress yesterday.",
            "Образуйте отрицание: He saw his friend at the party.",
            "Напишите 3-ю форму: go, see, have, come, do"
          ]
        },
        {
          title: "Past Continuous",
          description: `**Past Continuous** описывает действия, которые длились в определённый момент в прошлом.

**Основные случаи употребления:**
- Действие в определённый момент прошлого: *At 5 o'clock yesterday I was reading.*
- Два одновременных действия: *While I was cooking, my husband was reading.*
- Прерванное действие: *When the phone rang, I was sleeping.*
- Фоновое действие: *The sun was shining and the birds were singing.*

**Образование:**
was/were + V-ing

I/He/She/It was + V-ing: *She was reading.*
We/You/They were + V-ing: *They were playing.*

**Вопросы:**
Was she reading? Were they playing?

**Отрицания:**
She wasn't reading. They weren't playing.

**Сочетание с Past Simple:**
Когда одно действие прерывает другое:
- Длинное действие — Past Continuous
- Короткое действие — Past Simple

*When I came home, my mother was cooking dinner.*
*While I was walking, it started to rain.*

**Слова-маркеры:**
at 5 o'clock yesterday, at that moment, while, when

**Примеры:**
- *What were you doing at 8 p.m. yesterday?*
- *While he was driving, he was listening to music.*
- *I wasn't sleeping when you called.*`,
          tasks: [
            "Раскройте скобки: At 7 o'clock yesterday I (watch) TV.",
            "Соедините: While she (cook), the phone (ring).",
            "Образуйте отрицание: They were playing football at that time.",
            "Переведите: Когда я пришёл домой, мама готовила ужин."
          ]
        }
      ]
    },
    {
      topic: "Future Tenses",
      lessons: [
        {
          title: "Future Simple",
          description: `**Future Simple (will + V)** используется для будущих действий.

**Основные случаи употребления:**
- Мгновенные решения: *It's cold. I'll close the window.*
- Предсказания: *It will rain tomorrow.*
- Обещания: *I'll help you with your homework.*
- Предложения: *I'll carry your bag.*
- Угрозы: *I'll tell mum!*

**Образование:**
will + V (base form)

**Утверждения:**
I/You/He/She/We/They will come. (I'll come)

**Вопросы:**
Will you come to the party?

**Отрицания:**
I won't (will not) come.

**Слова-маркеры:**
tomorrow, next week/month/year, soon, in the future, in 2030

**Will vs Going to:**
- *I'll help you.* — мгновенное решение
- *I'm going to help you.* — запланированное действие

**Примеры:**
- *I think it will snow tomorrow.*
- *Will you marry me?*
- *She won't tell anyone.*
- *I'll call you later.*`,
          tasks: [
            "Раскройте скобки: I think it (be) cold tomorrow.",
            "Поставьте вопрос: She will come to the party.",
            "Образуйте отрицание: We will meet tomorrow.",
            "Выберите: Look at the clouds! It (will / is going to) rain."
          ]
        },
        {
          title: "To be going to",
          description: `**To be going to + V** используется для планов и намерений.

**Основные случаи употребления:**
- Планы и намерения: *I'm going to study medicine.*
- Предсказания на основе очевидных признаков: *Look at those clouds! It's going to rain.*

**Образование:**
am/is/are going to + V

I am going to + V: *I'm going to visit my grandmother.*
He/She/It is going to + V: *She's going to buy a car.*
We/You/They are going to + V: *They're going to move.*

**Вопросы:**
Am I going to pass? Is she going to come? Are they going to help?

**Отрицания:**
I'm not going to study. She isn't going to come. They aren't going to stay.

**Going to vs Present Continuous для планов:**
Оба используются для планов:
- *I'm going to meet Tom.* (намерение)
- *I'm meeting Tom at 5.* (договорённость)

**Going to vs Will:**
- *I'm going to study tonight.* (план)
- *I'll study tonight.* (решение в момент речи)

**Примеры:**
- *What are you going to do tomorrow?*
- *She's going to have a baby.*
- *He isn't going to sell his house.*`,
          tasks: [
            "Раскройте скобки: I (be going to) visit Paris next summer.",
            "Поставьте вопрос: She is going to buy a new car.",
            "Образуйте отрицание: They are going to leave early.",
            "Переведите: Я собираюсь стать врачом."
          ]
        }
      ]
    },
    {
      topic: "Modal Verbs",
      lessons: [
        {
          title: "Modal Verbs: Can, Could, Must",
          description: `**Modal Verbs (Модальные глаголы)** выражают отношение говорящего к действию.

**CAN — физическая возможность, умение:**
- *I can swim.* (Я умею плавать)
- *Can you help me?* (Можешь помочь?)
- *She can't speak French.* (Она не умеет говорить по-французски)

**COULD — вежливая просьба, возможность в прошлом:**
- *Could you open the door?* (Не могли бы вы открыть дверь?)
- *When I was young, I could run fast.* (В молодости я мог бегать быстро)

**MUST — обязанность, настоятельная необходимость:**
- *You must wear a uniform.* (Ты должен носить форму)
- *I must go now.* (Мне пора идти)
- *Must I do it now?* (Я должен делать это сейчас?)

**Особенности модальных глаголов:**
1. Не имеют окончаний -s, -ed, -ing
2. Не требуют вспомогательных глаголов
3. За ними следует инфинитив без to
4. Вопросы и отрицания образуются без do/does

**MUST vs HAVE TO:**
- *I must do it.* (личное решение)
- *I have to do it.* (внешняя необходимость)

**MUSTN'T vs DON'T HAVE TO:**
- *You mustn't smoke here.* (запрещено)
- *You don't have to come.* (не обязательно)

**Примеры:**
- *Can I borrow your pen?*
- *You must stop at the red light.*
- *She couldn't come yesterday.*`,
          tasks: [
            "Выберите: (Can / Must) you swim?",
            "Переведите: Ты должен сделать домашнее задание.",
            "Заполните: You (mustn't / don't have to) smoke here. It's forbidden.",
            "Образуйте вопрос: She can speak English."
          ]
        },
        {
          title: "Modal Verbs: Should, May, Might",
          description: `**SHOULD — совет, рекомендация:**
- *You should see a doctor.* (Тебе следует показаться врачу)
- *You shouldn't eat so much sugar.* (Тебе не стоит есть столько сахара)
- *What should I do?* (Что мне делать?)

**MAY — вероятность, разрешение (формально):**
- *It may rain tomorrow.* (Возможно, завтра пойдёт дождь)
- *May I come in?* (Можно войти?) — формально
- *May I help you?* (Разрешите помочь?)

**MIGHT — меньшая вероятность:**
- *It might snow tonight.* (Возможно, ночью пойдёт снег — меньше уверенности)
- *She might be at home.* (Она, возможно, дома)

**Степени вероятности:**
- *must be* — точно, наверняка (She must be tired.)
- *may be / might be* — возможно (She may be at work.)
- *can't be* — не может быть (It can't be true!)

**Модальные глаголы в прошедшем времени:**
- *could have done* — мог бы сделать (но не сделал)
- *should have done* — следовало сделать
- *might have done* — мог бы сделать

**Примеры:**
- *You should study harder.*
- *May I ask a question?*
- *He might come later.*`,
          tasks: [
            "Выберите: You (should / must) see a dentist. Your tooth hurts.",
            "Переведите: Возможно, она придёт завтра.",
            "Заполните: (May / Must) I use your phone?",
            "Образуйте вопрос: I should tell her the truth."
          ]
        }
      ]
    },
    {
      topic: "Passive Voice",
      lessons: [
        {
          title: "Passive Voice",
          description: `**Passive Voice (Страдательный залог)** — действие производится над подлежащим.

**Active:** *People speak English all over the world.*
**Passive:** *English is spoken all over the world.*

**Образование Passive Voice:**
to be + V3 (past participle)

**Present Simple Passive:**
am/is/are + V3
- *This book is written in English.*
- *Cars are made in Japan.*

**Past Simple Passive:**
was/were + V3
- *The letter was sent yesterday.*
- *The houses were built last year.*

**Future Simple Passive:**
will be + V3
- *The project will be finished soon.*

**Present Perfect Passive:**
have/has been + V3
- *The work has been done.*

**Когда используется Passive:**
1. Важен объект, а не исполнитель
2. Исполнитель неизвестен
3. Официальный стиль

**Предлог BY:**
Если указываем исполнителя:
- *This picture was painted by Picasso.*

**Примеры:**
- *English is spoken here.*
- *The report was written by the manager.*
- *When will the decision be made?*`,
          tasks: [
            "Преобразуйте в Passive: They built this house in 1900.",
            "Преобразуйте в Passive: People speak Spanish in many countries.",
            "Заполните: The book (write) by a famous author.",
            "Переведите: Письмо было отправлено вчера."
          ]
        }
      ]
    },
    {
      topic: "Conditionals",
      lessons: [
        {
          title: "Conditionals: Zero and First",
          description: `**Zero Conditional — факты и истины:**
If + Present Simple, Present Simple
- *If you heat water to 100°C, it boils.*
- *If I'm tired, I go to bed early.*

**First Conditional — реальные условия:**
If + Present Simple, will + V
- *If it rains, I will stay at home.*
- *If you study hard, you will pass the exam.*

**Структура First Conditional:**
If clause (условие) + Main clause (результат)
или
Main clause + If clause

**Вариации Main Clause:**
- *If you go to Paris, you can see the Eiffel Tower.* (can)
- *If you finish early, you may leave.* (may)
- *If you need help, call me.* (imperative)

**Unless = If not:**
- *Unless you hurry, you'll miss the bus.*
- (= If you don't hurry, you'll miss the bus.)

**When vs If:**
- *When I see him* — уверен, что увижу
- *If I see him* — не уверен

**Примеры:**
- *If the weather is good, we'll go for a walk.*
- *I won't come unless you invite me.*
- *If I have time, I'll call you.*`,
          tasks: [
            "Раскройте скобки: If she (come), I (be) happy.",
            "Переделайте: If you don't study, you won't pass. (use unless)",
            "Выберите тип: If you heat ice, it melts. (Zero/First)",
            "Переведите: Если будет хорошая погода, мы пойдём в парк."
          ]
        },
        {
          title: "Conditionals: Second and Third",
          description: `**Second Conditional — нереальные условия в настоящем:**
If + Past Simple, would + V
- *If I had a million dollars, I would buy a house.*
- *If I were you, I would accept the offer.*

**Важно:** were используется для всех лиц в Second Conditional
- *If I were you... / If she were here...*

**Second Conditional для советов:**
- *If I were you, I would study medicine.*

**Third Conditional — нереальные условия в прошлом:**
If + Past Perfect, would have + V3
- *If I had studied harder, I would have passed the exam.*
- *If she had come earlier, she would have seen him.*

**Таблица условных предложений:**

| Type | Condition | Result | Time |
|------|-----------|--------|------|
| Zero | Present | Present | Always |
| First | Present | will + V | Future |
| Second | Past | would + V | Present/Future (unreal) |
| Third | Past Perfect | would have + V3 | Past (unreal) |

**Примеры:**
- *If I knew the answer, I would tell you.* (Second)
- *If I had known the answer, I would have told you.* (Third)
- *If I were rich, I would travel the world.* (Second)`,
          tasks: [
            "Раскройте скобки: If I (be) you, I (go) to the doctor.",
            "Раскройте скобки: If she (study) harder, she (pass) the exam. (Third Conditional)",
            "Выберите тип: If I won the lottery, I would buy a house. (Second/Third)",
            "Переведите: Если бы я знал правду, я бы сказал тебе."
          ]
        }
      ]
    },
    {
      topic: "Vocabulary: Daily Life",
      lessons: [
        {
          title: "Daily Routine",
          description: `**Vocabulary: Daily Routine (Повседневные дела)**

**Утро (Morning):**
- wake up — просыпаться
- get up — вставать
- have a shower — принимать душ
- brush teeth — чистить зубы
- get dressed — одеваться
- have breakfast — завтракать
- leave home — выходить из дома
- go to school/work — идти в школу/на работу

**День (Day):**
- have lunch — обедать
- have classes — посещать уроки
- study — учиться
- do homework — делать домашнее задание
- work — работать
- have a break — делать перерыв

**Вечер (Evening):**
- come home — приходить домой
- have dinner — ужинать
- watch TV — смотреть телевизор
- read a book — читать книгу
- surf the Internet — сидеть в Интернете
- go to bed — ложиться спать

**Предлоги времени:**
- at 7 o'clock, at noon, at night
- in the morning, in the afternoon, in the evening
- on Monday, on the 5th of May

**Примеры:**
- *I usually wake up at 7 o'clock.*
- *After school I have lunch and do my homework.*
- *In the evening I watch TV or read a book.*`,
          tasks: [
            "Переведите: Я обычно просыпаюсь в 7 часов.",
            "Заполните: I have breakfast ___ the morning. (at/in/on)",
            "Составьте предложение: she / usually / up / get / at 7 o'clock",
            "Переведите: После школы я делаю домашнее задание."
          ]
        },
        {
          title: "Hobbies and Free Time",
          description: `**Vocabulary: Hobbies and Free Time (Хобби и свободное время)**

**Виды хобби:**
- read books / magazines — читать книги/журналы
- watch films / series — смотреть фильмы/сериалы
- listen to music — слушать музыку
- play sports — заниматься спортом
- play computer games — играть в компьютерные игры
- draw / paint — рисовать
- dance — танцевать
- sing — петь
- cook — готовить
- travel — путешествовать
- take photos — фотографировать
- collect (stamps, coins) — коллекционировать

**Музыкальные инструменты:**
- play the piano — играть на пианино
- play the guitar — играть на гитаре
- play the violin — играть на скрипке

**Спорт:**
- play football / tennis / basketball
- go swimming — плавать
- go running — бегать
- go skiing — кататься на лыжах

**Вопросы о хобби:**
- *What do you do in your free time?*
- *What are your hobbies?*
- *Do you like reading?*
- *How often do you play sports?*

**Примеры:**
- *In my free time I like reading and listening to music.*
- *She's interested in photography.*
- *He's fond of playing football.*`,
          tasks: [
            "Переведите: В свободное время я люблю читать книги.",
            "Заполните: She can play ___ piano. (the/-)",
            "Составьте вопрос: you / do / What / do / free time / in your / ?",
            "Переведите: Я увлекаюсь фотографией."
          ]
        }
      ]
    },
    {
      topic: "Reading Comprehension",
      lessons: [
        {
          title: "Reading Strategies",
          description: `**Reading Strategies (Стратегии чтения)**

**Виды чтения:**

**1. Skimming (Просмотровое чтение):**
- Быстрое прочтение для общего понимания
- Чтение заголовков, первых и последних предложений
- Цель: понять главную идею текста

**2. Scanning (Поисковое чтение):**
- Поиск конкретной информации
- Чтение с вопросом в голове
- Цель: найти нужные факты, даты, имена

**3. Detailed Reading (Изучающее чтение):**
- Внимательное чтение всего текста
- Анализ деталей и деталей
- Цель: полное понимание

**Полезные приёмы:**
1. **Predicting:** предсказать содержание по заголовку
2. **Guessing meaning:** догадаться о значении слова по контексту
3. **Identifying keywords:** находить ключевые слова
4. **Understanding reference:** понимать местоимения (he, she, it, they)

**Структура текста:**
- Introduction (введение) — главная идея
- Body paragraphs (основная часть) — детали и примеры
- Conclusion (заключение) — итоги

**При чтении обращайте внимание на:**
- Title — заголовок
- First sentence — первое предложение
- Linking words — слова-связки (however, therefore, because)
- Numbers and dates — цифры и даты`,
          tasks: [
            "Определите тип чтения: Find all names in the text. (Skimming/Scanning/Detailed)",
            "Что такое skimming?",
            "Перечислите три части структуры текста.",
            "Как догадаться о значении незнакомого слова?"
          ]
        }
      ]
    }
  ]
}

export const games: GameLesson[] = [
  {
    title: "Present Tenses",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I ___ to school every day.", options: ["am going", "go", "have gone", "went"], correctAnswer: "go", hint: "Regular action = Present Simple" },
      { type: 'quiz', question: "Look! It ___ .", options: ["rains", "is raining", "rained", "has rained"], correctAnswer: "is raining", hint: "Happening now = Present Continuous" },
      { type: 'fill', question: "I have ___ (see) this film already.", correctAnswer: "seen", hint: "Present Perfect uses V3" },
      { type: 'quiz', question: "She ___ in London for 5 years.", options: ["lives", "is living", "has lived", "lived"], correctAnswer: "has lived", hint: "For + period = Present Perfect" }
    ],
    reward: { stars: 3, message: "Excellent! You know Present Tenses! 🌟" }
  },
  {
    title: "Past Tenses",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "We ___ to the cinema yesterday.", options: ["go", "are going", "went", "have gone"], correctAnswer: "went", hint: "Yesterday = Past Simple" },
      { type: 'quiz', question: "At 5 o'clock yesterday I ___ TV.", options: ["watched", "was watching", "have watched", "watch"], correctAnswer: "was watching", hint: "At specific time in the past = Past Continuous" },
      { type: 'fill', question: "Did she ___ (come) to the party?", correctAnswer: "come", hint: "Did + base form" },
      { type: 'quiz', question: "When the phone rang, I ___ .", options: ["slept", "was sleeping", "have slept", "sleep"], correctAnswer: "was sleeping", hint: "Interrupted action = Past Continuous" }
    ],
    reward: { stars: 3, message: "Great job! You understand Past Tenses! ⏮️" }
  },
  {
    title: "Future Tenses",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "I think it ___ rain tomorrow.", options: ["will", "is going to", "would", "shall"], correctAnswer: "will", hint: "Prediction = will" },
      { type: 'quiz', question: "Look at the clouds! It ___ rain.", options: ["will", "is going to", "would", "shall"], correctAnswer: "is going to", hint: "Evidence now = going to" },
      { type: 'fill', question: "I'm going ___ (study) tonight.", correctAnswer: "to study", hint: "going to + V" },
      { type: 'quiz', question: "We ___ meet tomorrow at 5. (agreed)", options: ["will", "are going to", "are meeting", "would"], correctAnswer: "are meeting", hint: "Arrangement = Present Continuous" }
    ],
    reward: { stars: 3, message: "Well done! You know Future Tenses! 🔮" }
  },
  {
    title: "Modal Verbs",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "You ___ smoke here. It's forbidden.", options: ["can't", "mustn't", "shouldn't", "don't have to"], correctAnswer: "mustn't", hint: "Forbidden = mustn't" },
      { type: 'quiz', question: "You ___ see a doctor. You look ill.", options: ["can", "must", "should", "may"], correctAnswer: "should", hint: "Advice = should" },
      { type: 'fill', question: "She can ___ (speak) three languages.", correctAnswer: "speak", hint: "can + base form" },
      { type: 'quiz', question: "___ you help me, please?", options: ["Can", "Must", "Should", "Have to"], correctAnswer: "Can", hint: "Request = Can/Could" }
    ],
    reward: { stars: 3, message: "Perfect! You understand Modal Verbs! ✨" }
  },
  {
    title: "Passive Voice",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "English ___ all over the world.", options: ["speaks", "is spoken", "spoke", "is speaking"], correctAnswer: "is spoken", hint: "Present Simple Passive" },
      { type: 'quiz', question: "The letter ___ yesterday.", options: ["sent", "was sent", "is sent", "sends"], correctAnswer: "was sent", hint: "Past Simple Passive" },
      { type: 'fill', question: "The book will be ___ (finish) soon.", correctAnswer: "finished", hint: "will be + V3" },
      { type: 'quiz', question: "This picture was painted ___ Picasso.", options: ["with", "by", "from", "of"], correctAnswer: "by", hint: "Agent = by" }
    ],
    reward: { stars: 3, message: "Excellent! You know Passive Voice! 📝" }
  },
  {
    title: "Conditionals",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "If it rains, I ___ at home.", options: ["stay", "will stay", "would stay", "stayed"], correctAnswer: "will stay", hint: "First Conditional" },
      { type: 'quiz', question: "If I were you, I ___ accept.", options: ["will", "would", "would have", "had"], correctAnswer: "would", hint: "Second Conditional" },
      { type: 'fill', question: "If I had known, I ___ have told you.", correctAnswer: "would", hint: "Third Conditional" },
      { type: 'quiz', question: "If you heat water to 100°C, it ___.", options: ["will boil", "would boil", "boils", "boiled"], correctAnswer: "boils", hint: "Zero Conditional = fact" }
    ],
    reward: { stars: 3, message: "Great! You understand Conditionals! 🔀" }
  }
]
