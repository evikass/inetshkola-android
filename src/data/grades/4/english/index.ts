import { SubjectData, GameLesson, LessonItem } from '@/data/types'

const L = (
  title: string, 
  description: string, 
  tasks: string[],
  theory?: string,
  examples?: string[],
  facts?: string[]
): LessonItem => ({
  title,
  description,
  tasks,
  theory,
  examples,
  facts
})

export const lessons: SubjectData = {
  title: "Иностранный язык",
  icon: "Languages",
  color: "text-pink-400",
  topics: ["Знакомство", "Мой мир", "Школа", "Семья", "Еда", "Путешествия"],
  detailedTopics: [
    {
      topic: "Знакомство и общение",
      lessons: [
        L("Урок 1: 👋 Приветствие", "Greetings — слова и фразы для приветствия на английском языке.", [
          "Приветствовать по-английски",
          "Прощаться",
          "Спрашивать «Как дела?»",
          "Отвечать на вопросы"
        ],
        `## 👋 Приветствие (Greetings)

### Основные приветствия

| Английский | Произношение | Русский |
|------------|--------------|---------|
| Hello! | хэ-лОу | Здравствуйте! |
| Hi! | хай | Привет! |
| Good morning! | гуд мОрнинг | Доброе утро! |
| Good afternoon! | гуд афтэрнУн | Добрый день! |
| Good evening! | гуд Ивнинг | Добрый вечер! |

### Прощание

| Английский | Произношение | Русский |
|------------|--------------|---------|
| Goodbye! | гудбАй | До свидания! |
| Bye! | бай | Пока! |
| See you! | си ю | Увидимся! |
| Good night! | гуд найт | Спокойной ночи! |

### Как дела?

**Вопрос:**
- How are you? — Как дела?

**Ответы:**
- I'm fine, thanks! — Хорошо, спасибо!
- I'm OK. — Нормально.
- Not bad. — Неплохо.
- I'm great! — Отлично!`,
        [
          "Hello! — Здравствуйте!",
          "Hi! How are you? — Привет! Как дела?",
          "I'm fine, thanks! — Хорошо, спасибо!"
        ],
        [
          "🗣️ Hello — самое популярное слово в мире",
          "🗣️ Hi — неформальное приветление для друзей",
          "🗣️ Англичане всегда спрашивают «How are you?», но не ждут подробного ответа"
        ]),
        L("Урок 2: 🙋 Представление", "Introducing yourself — как представиться и узнать имя собеседника.", [
          "Назвать своё имя",
          "Сказать, откуда ты",
          "Рассказать о возрасте",
          "Задавать вопросы"
        ],
        `## 🙋 Представление (Introducing yourself)

### Как представиться

| Английский | Русский |
|------------|---------|
| My name is... | Меня зовут... |
| I'm... | Я... |
| I am from... | Я из... |
| I am ... years old. | Мне ... лет. |

### Пример диалога

**— Hello! What is your name?**
*— Привет! Как тебя зовут?*

**— My name is Anna. And you?**
*— Меня зовут Анна. А тебя?*

**— I'm Tom. Nice to meet you!**
*— Я Том. Приятно познакомиться!*

**— Nice to meet you too! Where are you from?**
*— Мне тоже! Откуда ты?*

**— I'm from Russia.**
*— Я из России.*

### Вопросительные фразы

- What is your name? — Как тебя зовут?
- How old are you? — Сколько тебе лет?
- Where are you from? — Откуда ты?`,
        [
          "My name is Ivan. — Меня зовут Иван.",
          "I'm 10 years old. — Мне 10 лет.",
          "I'm from Moscow, Russia. — Я из Москвы, Россия."
        ],
        [
          "🙋 Nice to meet you говорят при знакомстве",
          "🙋 В английском имя называют сразу после приветствия",
          "🙋 Англичане часто сокращают I am до I'm"
        ]),
        L("Урок 3: 🙏 Вежливые слова", "Polite words — слова вежливости на английском языке.", [
          "Говорить «пожалуйста»",
          "Благодарить",
          "Извиняться",
          "Просить о помощи"
        ],
        `## 🙏 Вежливые слова (Polite words)

### Спасибо и пожалуйста

| Английский | Русский |
|------------|---------|
| Thank you! | Спасибо! |
| Thanks! | Спасибо! (неформально) |
| You're welcome! | Пожалуйста! (в ответ на спасибо) |
| Please | Пожалуйста (при просьбе) |

### Извинения

| Английский | Русский |
|------------|---------|
| Sorry! | Извините! |
| Excuse me! | Извините! (чтобы обратить внимание) |
| I'm sorry! | Мне жаль! |

### Примеры использования

**Просьба:**
- Can I have water, please? — Можно воды, пожалуйста?
- Please help me. — Пожалуйста, помоги мне.

**Благодарность:**
- Thank you very much! — Большое спасибо!
- Thanks a lot! — Огромное спасибо!

**Ответ на благодарность:**
- You're welcome! — Пожалуйста!
- No problem! — Не за что!`,
        [
          "Please help me. — Пожалуйста, помоги мне.",
          "Thank you very much! — Большое спасибо!",
          "Sorry, I'm late. — Извините, я опоздал."
        ],
        [
          "🙏 Please всегда ставится в конце просьбы",
          "🙏 Thank you — самое важное слово в английском",
          "🙏 Excuse me используют перед вопросом к незнакомцу"
        ]),
        L("Урок 4: ❓ Вопросительные слова", "Question words — слова для вопросов.", [
          "Задавать вопросы с What",
          "Задавать вопросы с Where",
          "Задавать вопросы с Who",
          "Отвечать на вопросы"
        ],
        `## ❓ Вопросительные слова (Question words)

### Основные вопросительные слова

| Слово | Произношение | Значение |
|-------|--------------|----------|
| What? | уот | Что? Какой? |
| Where? | уэа | Где? Куда? |
| Who? | ху | Кто? |
| When? | уэн | Когда? |
| Why? | уай | Почему? |
| How? | хау | Как? |

### Примеры вопросов

**What — Что / Какой:**
- What is this? — Что это?
- What is your name? — Как тебя зовут?
- What time is it? — Который час?

**Where — Где / Куда:**
- Where are you from? — Откуда ты?
- Where is the school? — Где школа?
- Where do you live? — Где ты живёшь?

**Who — Кто:**
- Who is that? — Кто это?
- Who is your friend? — Кто твой друг?

**How — Как:**
- How are you? — Как дела?
- How old are you? — Сколько тебе лет?`,
        [
          "What is your name? — Как тебя зовут?",
          "Where do you live? — Где ты живёшь?",
          "Who is your friend? — Кто твой друг?"
        ],
        [
          "❓ Вопросительные слова всегда стоят в начале вопроса",
          "❓ Who используется только про людей",
          "❓ How old — специальный вопрос о возрасте"
        ])
      ]
    },
    {
      topic: "Мой мир",
      lessons: [
        L("Урок 5: 🎨 Цвета", "Colours — названия цветов на английском языке.", [
          "Называть цвета",
          "Описывать предметы по цвету",
          "Говорить о любимом цвете",
          "Слушать и понимать"
        ],
        `## 🎨 Цвета (Colours)

### Основные цвета

| Английский | Произношение | Русский |
|------------|--------------|---------|
| red | ред | красный |
| orange | Ориндж | оранжевый |
| yellow | Йеллоу | жёлтый |
| green | гриин | зелёный |
| blue | блу | синий |
| purple | Пёпл | фиолетовый |
| pink | пинк | розовый |
| black | блэк | чёрный |
| white | уайт | белый |
| brown | браун | коричневый |
| grey | грэй | серый |

### Как сказать о цвете

**Вопрос:**
- What colour is it? — Какого это цвета?

**Ответ:**
- It is red. — Он красный.
- It's blue. — Он синий.

**О любимом цвете:**
- My favourite colour is green. — Мой любимый цвет — зелёный.
- I like blue. — Мне нравится синий.

### Описание предметов

- The apple is red. — Яблоко красное.
- The sky is blue. — Небо синее.
- The grass is green. — Трава зелёная.`,
        [
          "What colour is it? — It's red.",
          "My favourite colour is blue.",
          "The sun is yellow. The grass is green."
        ],
        [
          "🎨 Colour (брит.) = Color (амер.)",
          "🎨 Blue — самый популярный цвет в мире",
          "🎨 В английском цвета — прилагательные, ставятся после существительного"
        ]),
        L("Урок 6: 🔢 Числа", "Numbers — числа на английском языке.", [
          "Считать от 1 до 20",
          "Считать до 100",
          "Называть возраст",
          "Решать примеры"
        ],
        `## 🔢 Числа (Numbers)

### Числа 1-10

| Число | Английский | Произношение |
|-------|------------|--------------|
| 1 | one | уан |
| 2 | two | ту |
| 3 | three | сри |
| 4 | four | фо |
| 5 | five | файв |
| 6 | six | сикс |
| 7 | seven | сЕвн |
| 8 | eight | эйт |
| 9 | nine | найн |
| 10 | ten | тэн |

### Числа 11-20

| Число | Английский | Произношение |
|-------|------------|--------------|
| 11 | eleven | илЕвн |
| 12 | twelve | туЭлв |
| 13 | thirteen | сётИн |
| 14 | fourteen | фортИн |
| 15 | fifteen | фитИн |
| 16 | sixteen | сикстИн |
| 17 | seventeen | сэвнтИн |
| 18 | eighteen | эйтИн |
| 19 | nineteen | найнтИн |
| 20 | twenty | туЭнти |

### Десятки

- 30 — thirty
- 40 — forty
- 50 — fifty
- 60 — sixty
- 70 — seventy
- 80 — eighty
- 90 — ninety
- 100 — one hundred

### Математика на английском

- 5 + 3 = 8 — Five plus three is eight.
- 10 - 4 = 6 — Ten minus four is six.`,
        [
          "1, 2, 3, 4, 5 — one, two, three, four, five",
          "I am ten years old. — Мне десять лет.",
          "5 + 5 = 10 — Five plus five is ten."
        ],
        [
          "🔢 Числа 13-19 заканчиваются на -teen",
          "🔢 Десятки заканчиваются на -ty",
          "🔢 В английском двузначные числа пишутся через дефис: twenty-one"
        ]),
        L("Урок 7: 🦶 Части тела", "Body parts — названия частей тела.", [
          "Называть части тела",
          "Описывать внешность",
          "Понимать команды",
          "Играть в игры"
        ],
        `## 🦶 Части тела (Body parts)

### Голова и лицо

| Английский | Русский |
|------------|---------|
| head | голова |
| face | лицо |
| eye | глаз |
| ear | ухо |
| nose | нос |
| mouth | рот |
| hair | волосы |
| tooth | зуб |
| teeth | зубы |

### Тело

| Английский | Русский |
|------------|---------|
| body | тело |
| arm | рука |
| hand | кисть |
| finger | палец |
| leg | нога |
| foot | ступня |
| feet | ступни |
| knee | колено |

### Описание внешности

- I have blue eyes. — У меня голубые глаза.
- He has black hair. — У него чёрные волосы.
- She has a small nose. — У неё маленький нос.

### Команды

- Touch your nose! — Дотронься до носа!
- Close your eyes! — Закрой глаза!
- Open your mouth! — Открой рот!`,
        [
          "I have two eyes and one nose.",
          "Touch your head! — Дотронься до головы!",
          "She has long hair. — У неё длинные волосы."
        ],
        [
          "🦶 Eye — eyes, foot — feet, tooth — teeth — неправильные множественные",
          "🦶 Have got = have — оба означают «иметь»",
          "🦶 Head, shoulders, knees and toes — известная детская песенка"
        ]),
        L("Урок 8: 👔 Одежда", "Clothes — названия одежды.", [
          "Называть одежду",
          "Описывать наряд",
          "Говорить о погоде и одежде",
          "Одевать куклу"
        ],
        `## 👔 Одежда (Clothes)

### Основная одежда

| Английский | Русский |
|------------|---------|
| clothes | одежда |
| T-shirt | футболка |
| shirt | рубашка |
| trousers | брюки |
| jeans | джинсы |
| skirt | юбка |
| dress | платье |
| jacket | куртка |
| coat | пальто |
| hat | шляпа |
| cap | кепка |
| shoes | обувь |
| boots | ботинки |

### Описание одежды

- I'm wearing a red T-shirt. — Я ношу красную футболку.
- She is wearing a blue dress. — Она в синем платье.
- These are my favourite jeans. — Это мои любимые джинсы.

### Одежда и погода

- It's cold. Put on your coat. — Холодно. Надень пальто.
- It's hot. Wear a T-shirt. — Жарко. Надень футболку.
- It's raining. Take your umbrella. — Идёт дождь. Возьми зонт.`,
        [
          "I'm wearing a blue T-shirt and jeans.",
          "Put on your jacket. It's cold.",
          "My favourite clothes are jeans and trainers."
        ],
        [
          "👔 Trousers, jeans, clothes — всегда во множественном числе",
          "👔 Wear — носить (одежду), put on — надевать",
          "👔 Trainers — кроссовки (брит.), sneakers — кроссовки (амер.)"
        ])
      ]
    },
    {
      topic: "Школа и учёба",
      lessons: [
        L("Урок 9: 📚 Школьные принадлежности", "School things — названия школьных принадлежностей.", [
          "Называть предметы",
          "Просить одолжить",
          "Описывать школу",
          "Слушать инструкции"
        ],
        `## 📚 Школьные принадлежности (School things)

### Основные предметы

| Английский | Русский |
|------------|---------|
| pen | ручка |
| pencil | карандаш |
| book | книга |
| notebook | тетрадь |
| ruler | линейка |
| eraser | ластик |
| sharpener | точилка |
| pencil case | пенал |
| bag | сумка |
| schoolbag | школьный рюкзак |
| scissors | ножницы |
| glue | клей |

### В классе

- This is my pencil. — Это мой карандаш.
- I have a new book. — У меня новая книга.
- Open your books, please. — Откройте книги, пожалуйста.

### Просьба одолжить

- Can I borrow your pen? — Можно твой карандаш?
- Do you have a ruler? — У тебя есть линейка?
- Here you are. — Вот, пожалуйста.`,
        [
          "I have a pen, a pencil and a ruler.",
          "Can I borrow your eraser, please?",
          "Open your notebook and write."
        ],
        [
          "📚 Eraser (амер.) = rubber (брит.)",
          "📚 Pencil case — пенал, буквально «чехол для карандашей»",
          "📚 Borrow — одолжить, lend — дать взаймы"
        ]),
        L("Урок 10: 🏫 В классе", "In the classroom — названия предметов в классе.", [
          "Называть мебель",
          "Понимать команды учителя",
          "Описывать класс",
          "Играть в игры"
        ],
        `## 🏫 В классе (In the classroom)

### Мебель и предметы

| Английский | Русский |
|------------|---------|
| classroom | класс |
| desk | парта |
| chair | стул |
| board | доска |
| blackboard | чёрная доска |
| whiteboard | белая доска |
| door | дверь |
| window | окно |
| wall | стена |
| floor | пол |
| teacher | учитель |
| student | ученик |

### Команды учителя

| Английский | Русский |
|------------|---------|
| Stand up! | Встаньте! |
| Sit down! | Сядьте! |
| Open your books! | Откройте книги! |
| Close your books! | Закройте книги! |
| Listen! | Слушайте! |
| Look! | Смотрите! |
| Read! | Читайте! |
| Write! | Пишите! |

### Описание класса

- There is a board in the classroom. — В классе есть доска.
- There are 15 desks in our classroom. — В нашем классе 15 парт.`,
        [
          "Stand up, please. — Встаньте, пожалуйста.",
          "Open your books at page 10. — Откройте книги на странице 10.",
          "There is a big window in our classroom."
        ],
        [
          "🏫 There is — для единственного, There are — для множественного",
          "🏫 At page 10 — на странице 10",
          "🏫 Work in pairs — работайте в парах"
        ]),
        L("Урок 11: 📖 Школьные предметы", "School subjects — названия школьных предметов.", [
          "Называть предметы",
          "Говорить о расписании",
          "Выражать предпочтения",
          "Сравнивать предметы"
        ],
        `## 📖 Школьные предметы (School subjects)

### Основные предметы

| Английский | Русский |
|------------|---------|
| Maths / Math | математика |
| Russian | русский язык |
| English | английский язык |
| Reading | чтение |
| Writing | письмо |
| Science | окружающий мир |
| History | история |
| Geography | география |
| Art | изо |
| Music | музыка |
| PE (Physical Education) | физкультура |
| IT (Information Technology) | информатика |

### О предпочтениях

- My favourite subject is Art. — Мой любимый предмет — ИЗО.
- I like English. — Мне нравится английский.
- I don't like Maths. — Мне не нравится математика.
- I'm good at Music. — Я хорош в музыке.

### Расписание

- What's your first lesson? — Какой у тебя первый урок?
- We have English on Monday. — У нас английский в понедельник.
- I have five lessons today. — У меня сегодня пять уроков.`,
        [
          "My favourite subject is English.",
          "I have Maths on Monday and Wednesday.",
          "We have six lessons today."
        ],
        [
          "📖 Math (амер.) = Maths (брит.)",
          "📖 PE — Physical Education — физкультура",
          "📖 I'm good at... — Я хорош в... (сильно в...)"
        ]),
        L("Урок 12: 📅 Расписание", "Timetable — дни недели и расписание.", [
          "Называть дни недели",
          "Говорить о времени",
          "Описывать расписание",
          "Задавать вопросы"
        ],
        `## 📅 Расписание (Timetable)

### Дни недели

| Английский | Русский |
|------------|---------|
| Monday | понедельник |
| Tuesday | вторник |
| Wednesday | среда |
| Thursday | четверг |
| Friday | пятница |
| Saturday | суббота |
| Sunday | воскресенье |

### Время

| Английский | Русский |
|------------|---------|
| What time is it? | Который час? |
| It's 8 o'clock. | 8 часов. |
| It's half past 3. | Половина четвёртого. |
| morning | утро |
| afternoon | день |
| evening | вечер |
| night | ночь |

### О расписании

- School starts at 8 o'clock. — Школа начинается в 8 часов.
- On Monday I have 5 lessons. — В понедельник у меня 5 уроков.
- We have English on Tuesday and Thursday. — У нас английский во вторник и четверг.

### Вопросы

- What day is it today? — Какой сегодня день?
- What time does school start? — Во сколько начинается школа?`,
        [
          "Today is Monday. — Сегодня понедельник.",
          "School starts at 8 o'clock.",
          "On Friday we have PE."
        ],
        [
          "📅 Дни недели всегда с большой буквы",
          "📅 On Monday — в понедельник (предлог on)",
          "📅 At 8 o'clock — в 8 часов (предлог at)"
        ])
      ]
    },
    {
      topic: "Семья и дом",
      lessons: [
        L("Урок 13: 👨‍👩‍👧‍👦 Члены семьи", "Family members — названия членов семьи.", [
          "Называть родственников",
          "Описывать семью",
          "Говорить о возрасте",
          "Задавать вопросы"
        ],
        `## 👨‍👩‍👧‍👦 Члены семьи (Family members)

### Родственники

| Английский | Русский |
|------------|---------|
| family | семья |
| mother / mum | мама |
| father / dad | папа |
| parent | родитель |
| sister | сестра |
| brother | брат |
| grandmother | бабушка |
| grandfather | дедушка |
| grandmother / grandma | бабушка |
| grandfather / grandpa | дедушка |
| aunt | тётя |
| uncle | дядя |
| cousin | двоюродный брат/сестра |

### О семье

- I have a big family. — У меня большая семья.
- I have a mother, a father and a sister. — У меня есть мама, папа и сестра.
- My mum is a teacher. — Моя мама — учитель.
- My dad is 40 years old. — Моему папе 40 лет.

### Вопросы о семье

- How many people are in your family? — Сколько человек в твоей семье?
- Do you have any brothers or sisters? — У тебя есть братья или сёстры?
- What does your father do? — Кем работает твой папа?`,
        [
          "I have a mother, a father and a little brother.",
          "My grandmother is 65 years old.",
          "I love my family."
        ],
        [
          "👨‍👩‍👧‍👦 Mum, dad — неформальные, mother, father — формальные",
          "👨‍👩‍👧‍👦 Parents = mother + father",
          "👨‍👩‍👧‍👦 Grandparents = grandmother + grandfather"
        ]),
        L("Урок 14: 🏠 Мой дом", "My house — названия комнат в доме.", [
          "Называть комнаты",
          "Описывать дом",
          "Говорить о мебели",
          "Сравнивать дома"
        ],
        `## 🏠 Мой дом (My house)

### Типы жилья

| Английский | Русский |
|------------|---------|
| house | дом |
| flat / apartment | квартира |
| room | комната |

### Комнаты

| Английский | Русский |
|------------|---------|
| living room | гостиная |
| bedroom | спальня |
| kitchen | кухня |
| bathroom | ванная |
| toilet | туалет |
| hall | прихожая |
| garden | сад |

### Описание дома

- I live in a house. — Я живу в доме.
- My house has 5 rooms. — В моём доме 5 комнат.
- There is a kitchen and a living room. — Есть кухня и гостиная.
- My bedroom is small. — Моя спальня маленькая.

### Мебель

- sofa — диван
- bed — кровать
- table — стол
- chair — стул
- wardrobe — шкаф для одежды
- fridge — холодильник`,
        [
          "I live in a big house.",
          "There is a kitchen, a living room and two bedrooms.",
          "My favourite room is my bedroom."
        ],
        [
          "🏠 Flat (брит.) = Apartment (амер.)",
          "🏠 Living room — гостиная, буквально «жилая комната»",
          "🏠 Upstairs — наверху, downstairs — внизу"
        ]),
        L("Урок 15: 🛏️ Моя комната", "My room — описание комнаты.", [
          "Описывать комнату",
          "Говорить о вещах",
          "Использовать предлоги места",
          "Рисовать план"
        ],
        `## 🛏️ Моя комната (My room)

### Мебель в комнате

| Английский | Русский |
|------------|---------|
| bed | кровать |
| desk | письменный стол |
| chair | стул |
| wardrobe | шкаф |
| bookshelf | книжная полка |
| lamp | лампа |
| carpet | ковёр |
| window | окно |
| door | дверь |

### Предлоги места

| Английский | Русский | Пример |
|------------|---------|--------|
| in | в | in the room — в комнате |
| on | на | on the desk — на столе |
| under | под | under the bed — под кроватью |
| next to | рядом с | next to the window — рядом с окном |
| behind | за | behind the door — за дверью |
| in front of | перед | in front of the house — перед домом |

### Описание комнаты

- There is a bed in my room. — В моей комнате есть кровать.
- There is a desk next to the window. — Стол стоит рядом с окном.
- The carpet is on the floor. — Ковёр на полу.
- My books are on the shelf. — Мои книги на полке.`,
        [
          "There is a big bed in my room.",
          "My desk is next to the window.",
          "There are books on the shelf."
        ],
        [
          "🛏️ There is — для единственного, There are — для множественного",
          "🛏️ Is there...? / Are there...? — вопросы",
          "🛏️ In the corner — в углу"
        ]),
        L("Урок 16: 📆 Будни и выходные", "Weekdays and weekends — описание дней.", [
          "Рассказывать о буднях",
          "Описывать выходные",
          "Использовать Present Simple",
          "Сравнивать дни"
        ],
        `## 📆 Будни и выходные (Weekdays and weekends)

### Будни и выходные

| Английский | Русский |
|------------|---------|
| weekday | будний день |
| weekend | выходные |
| Monday - Friday | будни |
| Saturday - Sunday | выходные |

### Рутина (Daily routine)

| Английский | Русский |
|------------|---------|
| get up | вставать |
| have breakfast | завтракать |
| go to school | идти в школу |
| have lunch | обедать |
| come home | приходить домой |
| do homework | делать уроки |
| have dinner | ужинать |
| go to bed | ложиться спать |

### Present Simple (Настоящее простое)

**Утверждение:**
- I get up at 7 o'clock. — Я встаю в 7 часов.
- She goes to school at 8. — Она идёт в школу в 8.

**Вопрос:**
- Do you like weekends? — Тебе нравятся выходные?
- What do you do on Sunday? — Что ты делаешь в воскресенье?`,
        [
          "I get up at 7 o'clock on weekdays.",
          "On Saturday I play with my friends.",
          "I do my homework after school."
        ],
        [
          "📆 On weekdays — в будни, at the weekend — на выходных",
          "📆 В Present Simple добавляем -s/-es к глаголу для he/she/it",
          "📆 Do — для вопросов и отрицаний"
        ])
      ]
    },
    {
      topic: "Еда и напитки",
      lessons: [
        L("Урок 17: 🍕 Продукты", "Food — названия продуктов.", [
          "Называть продукты",
          "Говорить о предпочтениях",
          "Описывать вкус",
          "Составлять список покупок"
        ],
        `## 🍕 Продукты (Food)

### Основные продукты

| Английский | Русский |
|------------|---------|
| bread | хлеб |
| cheese | сыр |
| milk | молоко |
| butter | масло |
| egg | яйцо |
| meat | мясо |
| chicken | курица |
| fish | рыба |
| rice | рис |
| pasta | макароны |
| pizza | пицца |
| sandwich | бутерброд |

### О предпочтениях

- I like pizza. — Мне нравится пицца.
- I don't like fish. — Мне не нравится рыба.
- My favourite food is chicken. — Моя любимая еда — курица.

### Вкус

- sweet — сладкий
- salty — солёный
- sour — кислый
- delicious — вкусный
- tasty — вкусный
- yummy — вкусненький

### Немного / Много

- some bread — немного хлеба
- some cheese — немного сыра
- a lot of fruit — много фруктов`,
        [
          "I like pizza and pasta.",
          "My favourite food is chicken with rice.",
          "Do you like cheese?"
        ],
        [
          "🍕 Food — еда, meal — приём пищи",
          "🍕 Some используется для утверждения, any — для вопросов",
          "🍕 Countable — можно посчитать, uncountable — нельзя"
        ]),
        L("Урок 18: 🥤 Напитки", "Drinks — названия напитков.", [
          "Называть напитки",
          "Предлагать угощение",
          "Принимать и отказываться",
          "Заказывать в кафе"
        ],
        `## 🥤 Напитки (Drinks)

### Названия напитков

| Английский | Русский |
|------------|---------|
| water | вода |
| milk | молоко |
| juice | сок |
| tea | чай |
| coffee | кофе |
| lemonade | лимонад |
| cola | кола |
| hot chocolate | горячий шоколад |

### Предложение

- Would you like some tea? — Хотите чаю?
- Do you want some juice? — Хочешь сока?
- Can I have some water? — Можно воды?

### Ответы

- Yes, please. — Да, пожалуйста.
- No, thank you. — Нет, спасибо.
- I'd love some. — С удовольствием.

### В кафе

- Can I have a cup of tea, please? — Можно чашку чая, пожалуйста?
- I'd like some orange juice. — Я бы хотел апельсиновый сок.
- A glass of water, please. — Стакан воды, пожалуйста.`,
        [
          "Would you like some tea? — Yes, please.",
          "Can I have a glass of juice?",
          "I don't like coffee. I prefer tea."
        ],
        [
          "🥤 A cup of — чашка, a glass of — стакан",
          "🥤 Would you like — вежливое предложение",
          "🥤 I'd like = I would like — я бы хотел"
        ]),
        L("Урок 19: 🍎 Фрукты и овощи", "Fruits and vegetables — названия фруктов и овощей.", [
          "Называть фрукты",
          "Называть овощи",
          "Говорить о пользе",
          "Составлять салат"
        ],
        `## 🍎 Фрукты и овощи (Fruits and vegetables)

### Фрукты

| Английский | Русский |
|------------|---------|
| fruit | фрукт |
| apple | яблоко |
| orange | апельсин |
| banana | банан |
| pear | груша |
| peach | персик |
| grape | виноград |
| strawberry | клубника |
| cherry | вишня |

### Овощи

| Английский | Русский |
|------------|---------|
| vegetable | овощ |
| tomato | помидор |
| potato | картофель |
| carrot | морковь |
| cabbage | капуста |
| onion | лук |
| cucumber | огурец |
| pepper | перец |

### Описание

- Apples are red, green or yellow. — Яблоки красные, зелёные или жёлтые.
- Bananas are yellow. — Бананы жёлтые.
- Carrots are orange. — Морковь оранжевая.
- Vegetables are healthy. — Овощи полезные.

### Полезные фразы

- An apple a day keeps the doctor away. — Одно яблоко в день — и доктор не нужен.
- Eat your vegetables! — Ешь овощи!`,
        [
          "I like apples and bananas.",
          "Tomatoes and cucumbers are vegetables.",
          "Fruit and vegetables are healthy."
        ],
        [
          "🍎 Apple — an apple, но Bananas — без артикля",
          "🍎 Tomato — помидор, potato — картофель",
          "🍎 Healthy — полезный, fresh — свежий"
        ]),
        L("Урок 20: ☕ В кафе", "At the café — диалоги в кафе.", [
          "Делать заказ",
          "Спрашивать о меню",
          "Платить за заказ",
          "Благодарить"
        ],
        `## ☕ В кафе (At the café)

### Фразы для заказа

| Английский | Русский |
|------------|---------|
| Can I have...? | Можно мне...? |
| I'd like... | Я бы хотел... |
| What would you like? | Что вы хотите? |
| Here's your order. | Вот ваш заказ. |
| Anything else? | Что-нибудь ещё? |
| That's all. | Это всё. |

### Диалог в кафе

**Waiter:** Hello! What would you like?
*Официант: Привет! Что вы хотите?*

**Customer:** Can I have a pizza and some juice, please?
*Посетитель: Можно пиццу и сок, пожалуйста?*

**Waiter:** Here you are. Anything else?
*Официант: Вот. Что-нибудь ещё?*

**Customer:** No, that's all. How much is it?
*Посетитель: Нет, это всё. Сколько это стоит?*

**Waiter:** That's 5 pounds. Thank you!
*Официант: 5 фунтов. Спасибо!*

**Customer:** Thank you! Goodbye!
*Посетитель: Спасибо! До свидания!*

### Полезные слова

- menu — меню
- order — заказ
- bill — счёт
- tip — чаевые`,
        [
          "Can I have a sandwich and a cup of tea, please?",
          "How much is it? — That's 10 dollars.",
          "Thank you very much! Goodbye!"
        ],
        [
          "☕ How much is it? — Сколько это стоит?",
          "☕ Here you are — Вот, пожалуйста",
          "☕ Enjoy your meal — Приятного аппетита"
        ])
      ]
    },
    {
      topic: "Путешествия",
      lessons: [
        L("Урок 21: 🚌 Транспорт", "Transport — названия транспорта.", [
          "Называть виды транспорта",
          "Описывать поездку",
          "Покупать билет",
          "Спрашивать дорогу"
        ],
        `## 🚌 Транспорт (Transport)

### Виды транспорта

| Английский | Русский |
|------------|---------|
| car | машина |
| bus | автобус |
| train | поезд |
| plane | самолёт |
| ship | корабль |
| boat | лодка |
| bike / bicycle | велосипед |
| taxi | такси |
| underground / subway | метро |
| tram | трамвай |

### Описание поездки

- I go to school by bus. — Я еду в школу на автобусе.
- We go on holiday by plane. — Мы едем в отпуск на самолёте.
- I ride my bike. — Я катаюсь на велосипеде.

### Покупка билета

- One ticket to London, please. — Один билет до Лондона, пожалуйста.
- How much is a ticket? — Сколько стоит билет?
- Single or return? — В одну сторону или туда-обратно?

### Спрашивать дорогу

- How do I get to the station? — Как добраться до станции?
- Where is the bus stop? — Где автобусная остановка?
- Is it far? — Это далеко?`,
        [
          "I go to school by bus.",
          "We travelled to Moscow by train.",
          "How much is a ticket to the city centre?"
        ],
        [
          "🚌 By car / by bus / by plane — на машине/автобусе/самолёте",
          "🚌 On foot — пешком",
          "🚌 Underground (брит.) = Subway (амер.)"
        ]),
        L("Урок 22: 🏙️ В городе", "In the city — названия мест в городе.", [
          "Называть места в городе",
          "Описывать маршрут",
          "Спрашивать дорогу",
          "Давать указания"
        ],
        `## 🏙️ В городе (In the city)

### Места в городе

| Английский | Русский |
|------------|---------|
| city | город |
| street | улица |
| park | парк |
| shop | магазин |
| supermarket | супермаркет |
| hospital | больница |
| school | школа |
| library | библиотека |
| museum | музей |
| cinema | кинотеатр |
| restaurant | ресторан |
| café | кафе |
| bank | банк |
| post office | почта |

### Спрашивать дорогу

- Excuse me, where is the bank? — Извините, где банк?
- How do I get to the park? — Как добраться до парка?
- Is there a café near here? — Здесь рядом есть кафе?

### Давать указания

- Go straight on. — Идите прямо.
- Turn left. — Поверните налево.
- Turn right. — Поверните направо.
- It's on the left. — Это слева.
- It's on the right. — Это справа.
- It's next to the school. — Это рядом со школой.`,
        [
          "Excuse me, where is the cinema?",
          "Go straight on and turn left.",
          "The bank is next to the post office."
        ],
        [
          "🏙️ Excuse me используется, чтобы обратиться к незнакомцу",
          "🏙️ Turn left/right — поверните налево/направо",
          "🏙️ Go straight = Go ahead — идите прямо"
        ]),
        L("Урок 23: 🗼 Достопримечательности", "Sights — названия достопримечательностей.", [
          "Называть достопримечательности",
          "Описывать места",
          "Рассказывать о городе",
          "Быть гидом"
        ],
        `## 🗼 Достопримечательности (Sights)

### Известные места

| Английский | Русский |
|------------|---------|
| sight | достопримечательность |
| monument | памятник |
| castle | замок |
| palace | дворец |
| church | церковь |
| cathedral | собор |
| bridge | мост |
| tower | башня |
| square | площадь |
| fountain | фонтан |

### Достопримечательности мира

| Английский | Где находится |
|------------|---------------|
| Big Ben | Лондон, Англия |
| Tower of London | Лондон, Англия |
| Eiffel Tower | Париж, Франция |
| Statue of Liberty | Нью-Йорк, США |
| Kremlin | Москва, Россия |
| Red Square | Москва, Россия |

### Описание

- Big Ben is a famous clock tower in London. — Биг-Бен — знаменитая часовая башня в Лондоне.
- The Eiffel Tower is in Paris. — Эйфелева башня находится в Париже.
- The Kremlin is in Moscow. — Кремль находится в Москве.
- It's very beautiful. — Это очень красиво.`,
        [
          "Big Ben is a famous clock tower in London.",
          "Red Square is in the centre of Moscow.",
          "The Eiffel Tower is very beautiful."
        ],
        [
          "🗼 Famous — знаменитый, popular — популярный",
          "🗼 In the centre of — в центре",
          "🗼 I want to visit... — Я хочу посетить..."
        ]),
        L("Урок 24: 🌍 Страны", "Countries — названия стран и национальностей.", [
          "Называть страны",
          "Говорить о национальностях",
          "Описывать флаги",
          "Сравнивать страны"
        ],
        `## 🌍 Страны (Countries)

### Страны и национальности

| Страна | Английский | Национальность |
|--------|------------|----------------|
| Россия | Russia | Russian |
| Англия | England | English |
| США | USA / America | American |
| Франция | France | French |
| Германия | Germany | German |
| Испания | Spain | Spanish |
| Италия | Italy | Italian |
| Китай | China | Chinese |
| Япония | Japan | Japanese |

### Языки

- I speak Russian. — Я говорю по-русски.
- I speak English. — Я говорю по-английски.
- I learn English at school. — Я учу английский в школе.

### Описание страны

- Russia is a big country. — Россия — большая страна.
- The capital of Russia is Moscow. — Столица России — Москва.
- Russian flag is white, blue and red. — Российский флаг белый, синий и красный.

### Вопросы

- Where are you from? — Откуда ты?
- What language do you speak? — На каком языке ты говоришь?
- What's the capital of...? — Какая столица...?`,
        [
          "I'm from Russia. I'm Russian.",
          "The capital of France is Paris.",
          "I speak Russian and English."
        ],
        [
          "🌍 Страны и языки пишутся с большой буквы",
          "🌍 Национальности тоже с большой буквы",
          "🌍 The USA = The United States of America"
        ])
      ]
    }
  ]
}
export const games: GameLesson[] = []
