import { SubjectData, GameLesson } from '@/data/types'

export const lessons: SubjectData = {
  title: "Иностранный язык",
  icon: "Languages",
  color: "text-pink-400",
  topics: ["Знакомство", "Мир вокруг нас", "Семья и друзья", "Школа", "Путешествия", "Грамматика"],
  detailedTopics: [
    {
      topic: "Знакомство и общение",
      lessons: [
        {
          title: "Урок 1: Приветствие и прощание",
          description: `## Приветствие и прощание 👋

# Способы приветствия

:- **Hello** — здравствуйте
:- **Hi** — привет (неформальное)
:- **Good morning** — доброе утро
:- **Good afternoon** — добрый день
:- **Good evening** — добрый вечер

# Способы прощания

:- **Goodbye** — до свидания
:- **Bye** — пока (неформальное)
:- **See you later** — увидимся позже
:- **See you soon** — до скорой встречи
:- **Good night** — спокойной ночи

!! Выбирайте подходящее приветствие в зависимости от ситуации и времени суток!

## Примеры диалогов

> **Пример 1:**
> - A: Hello! My name is Tom.
> - B: Hi! I'm Anna. Nice to meet you!
> - A: Nice to meet you too!

> **Пример 2:**
> - A: Good morning! How are you?
> - B: Good morning! I'm fine, thanks. And you?
> - A: I'm fine too. Thank you!

## Вежливые фразы

:- **Nice to meet you** — приятно познакомиться
:- **How are you?** — как дела?
:- **I'm fine, thanks** — хорошо, спасибо
:- **Thank you** — спасибо
:- **Please** — пожалуйста

!!! **Key Points:**
- Hi и Bye — неформальные, для друзей
- Good morning/afternoon/evening — формальные
- Good night — только при прощании вечером

+ Отлично! Теперь ты знаешь, как здоровиться и прощаться! 🌟`,
          tasks: [
            "Приветствовать разными способами",
            "Прощаться по-английски",
            "Знакомиться с людьми",
            "Представлять себя и других",
            "Использовать вежливые фразы",
            "Различать формальный и неформальный стиль"
          ]
        },
        {
          title: "Урок 2: Личная информация",
          description: `## Личная информация 📝

# Вопросы о человеке

:- **What is your name?** — Как тебя зовут?
:- **My name is...** — Меня зовут...
:- **How old are you?** — Сколько тебе лет?
:- **I am... years old.** — Мне... лет.
:- **Where are you from?** — Откуда ты?
:- **I am from...** — Я из...
:- **What is your address?** — Какой твой адрес?
:- **What is your phone number?** — Какой твой номер телефона?

# Числительные 1-20

| Число | Слово | Число | Слово |
|-------|-------|-------|-------|
| 1 | one | 11 | eleven |
| 2 | two | 12 | twelve |
| 3 | three | 13 | thirteen |
| 4 | four | 14 | fourteen |
| 5 | five | 15 | fifteen |
| 6 | six | 16 | sixteen |
| 7 | seven | 17 | seventeen |
| 8 | eight | 18 | eighteen |
| 9 | nine | 19 | nineteen |
| 10 | ten | 20 | twenty |

# Десятки 20-100

:- **twenty** — 20
:- **thirty** — 30
:- **forty** — 40
:- **fifty** — 50
:- **sixty** — 60
:- **seventy** — 70
:- **eighty** — 80
:- **ninety** — 90
:- **one hundred** — 100

## Примеры диалогов

> **Диалог 1:**
> - What is your name?
> - My name is Alex.
> - How old are you?
> - I am eleven years old.

> **Диалог 2:**
> - Where are you from?
> - I am from Russia.
> - What is your phone number?
> - My phone number is 123-456-789.

!!! **Key Points:**
- Числительные нужны для возраста и номера телефона
- I'm = I am (сокращённая форма)
- What's = What is

+ Отлично! Ты можешь рассказать о себе! ✨`,
          tasks: [
            "Называть имя и фамилию",
            "Говорить о возрасте",
            "Рассказывать о себе",
            "Задавать вопросы о человеке",
            "Использовать числительные",
            "Заполнять анкету на английском"
          ]
        },
        {
          title: "Урок 3: Страны и национальности",
          description: `## Страны и национальности 🌍

# Страны и национальности

| Страна | Английский | Национальность |
|--------|------------|----------------|
| Россия | Russia | Russian |
| Великобритания | Great Britain | British |
| США | the USA | American |
| Франция | France | French |
| Германия | Germany | German |
| Испания | Spain | Spanish |
| Италия | Italy | Italian |
| Китай | China | Chinese |
| Япония | Japan | Japanese |

# Конструкции

!! Страна и национальность часто отличаются по форме!

## Как сказать «Я из...»

:- **I am from Russia.** — Я из России.
:- **I am Russian.** — Я русский.
:- **I come from Moscow.** — Я из Москвы.

## Вопросы о происхождении

> - Where are you from? — Откуда ты?
> - Where do you come from? — Откуда ты родом?
> - What nationality are you? — Кто ты по национальности?

# Столицы стран

| Страна | Столица |
|--------|---------|
| Russia | Moscow |
| Great Britain | London |
| the USA | Washington |
| France | Paris |
| Germany | Berlin |
| China | Beijing |
| Japan | Tokyo |

> **Пример:**
> - Moscow is the capital of Russia.
> - London is the capital of Great Britain.

!!! **Key Points:**
- I'm from + страна (I'm from Russia)
- I'm + национальность (I'm Russian)
- Страны пишутся с большой буквы!

+ Супер! Ты знаешь страны и национальности! 🗺️`,
          tasks: [
            "Называть страны на английском",
            "Определять национальности",
            "Говорить «Я из...»",
            "Спрашивать о происхождении",
            "Различать страну и национальность",
            "Работать с картой мира"
          ]
        },
        {
          title: "Урок 4: Профессии",
          description: `## Профессии 💼

# Названия профессий

## Образование с суффиксами -er, -or, -ist

:- **teacher** — учитель
:- **doctor** — врач
:- **engineer** — инженер
:- **driver** — водитель
:- **worker** — рабочий
:- **actor** — актёр
:- **scientist** — учёный
:- **artist** — художник
:- **writer** — писатель
:- **pilot** — лётчик
:- **cook** — повар
:- **nurse** — медсестра
:- **policeman** — полицейский

# Вопросы о профессии

:- **What is your job?** — Кем ты работаешь?
:- **What do you do?** — Чем ты занимаешься?
:- **What does your father do?** — Кем работает твой папа?

# Ответы о профессии

> **Примеры:**
> - I am a teacher. — Я учитель.
> - He is a doctor. — Он врач.
> - My mother is a nurse. — Моя мама медсестра.
> - I want to be a pilot. — Я хочу быть лётчиком.

# Суффиксы профессий

| Суффикс | Значение | Примеры |
|---------|----------|---------|
| -er | человек, делающий что-то | teacher, driver, worker |
| -or | профессия | actor, doctor |
| -ist | специалист | artist, scientist |

## Говорим о будущей профессии

:- **I want to be a...** — Я хочу быть...
:- **I would like to be a...** — Я хотел бы быть...

> **Примеры:**
> - I want to be a doctor.
> - She wants to be an actress.
> - He would like to be a pilot.

!!! **Key Points:**
- Перед профессией ставится артикль a/an
- an + гласная (an actor, an engineer)
- a + согласная (a teacher, a doctor)

+ Молодец! Ты знаешь названия профессий! 🎓`,
          tasks: [
            "Называть профессии",
            "Спрашивать о работе",
            "Рассказывать о профессии",
            "Обсуждать будущую профессию",
            "Образовывать названия профессий",
            "Говорить о профессиях семьи"
          ]
        }
      ]
    },
    {
      topic: "Мир вокруг нас",
      lessons: [
        {
          title: "Урок 5: Погода и времена года",
          description: `## Погода и времена года 🌤️

# Времена года

:- **winter** — зима ❄️
:- **spring** — весна 🌷
:- **summer** — лето ☀️
:- **autumn** — осень 🍂

# Месяцы года

| Сезон | Месяцы |
|-------|--------|
| Winter | December, January, February |
| Spring | March, April, May |
| Summer | June, July, August |
| Autumn | September, October, November |

# Описание погоды

:- **sunny** — солнечно ☀️
:- **cloudy** — облачно ☁️
:- **rainy** — дождливо 🌧️
:- **snowy** — снежно ❄️
:- **windy** — ветрено 💨
:- **cold** — холодно 🥶
:- **warm** — тепло 🌡️
:- **hot** — жарко 🔥
:- **foggy** — туманно 🌫️

# Вопросы о погоде

:- **What is the weather like today?** — Какая сегодня погода?
:- **What season is it?** — Какое сейчас время года?
:- **Is it cold today?** — Сегодня холодно?

## Ответы о погоде

> **Примеры:**
> - It is sunny. — Солнечно.
> - It is cold and windy. — Холодно и ветрено.
> - It's raining. — Идёт дождь.
> - It's snowing. — Идёт снег.

# Температура

:- **It's 20 degrees.** — 20 градусов.
:- **It's minus 5.** — Минус 5.
:- **It's above zero.** — Выше нуля.
:- **It's below zero.** — Ниже нуля.

> **Диалог:**
> - What's the weather like today?
> - It's sunny and warm.
> - Great! Let's go for a walk!

!!! **Key Points:**
- It's = It is
- It's raining / It's snowing — действия
- It's rainy / It's snowy — состояния

+ Отлично! Ты умеешь говорить о погоде! 🌈`,
          tasks: [
            "Описывать погоду",
            "Называть времена года и месяцы",
            "Говорить о погоде сегодня",
            "Обсуждать климат",
            "Понимать прогноз погоды",
            "Описывать погоду в разные сезоны"
          ]
        },
        {
          title: "Урок 6: Природа и животные",
          description: `## Природа и животные 🦁

# Дикие животные (Wild Animals)

:- **lion** — лев 🦁
:- **tiger** — тигр 🐅
:- **elephant** — слон 🐘
:- **bear** — медведь 🐻
:- **wolf** — волк 🐺
:- **fox** — лиса 🦊
:- **monkey** — обезьяна 🐒
:- **giraffe** — жираф 🦒
:- **zebra** — зебра 🦓
:- **crocodile** — крокодил 🐊

# Домашние животные (Domestic Animals)

:- **cat** — кошка 🐱
:- **dog** — собака 🐶
:- **horse** — лошадь 🐴
:- **cow** — корова 🐄
:- **sheep** — овца 🐑
:- **pig** — свинья 🐷
:- **chicken** — курица 🐔
:- **rabbit** — кролик 🐰

# Описание животных

## Размер

:- **big** — большой
:- **small** — маленький
:- **huge** — огромный

## Характеристики

:- **beautiful** — красивый
:- **dangerous** — опасный
:- **fast** — быстрый
:- **slow** — медленный
:- **strong** — сильный
:- **clever** — умный

# Среда обитания

:- **forest** — лес 🌲
:- **zoo** — зоопарк
:- **farm** — ферма 🚜
:- **home** — дом 🏠
:- **jungle** — джунгли
:- **ocean** — океан 🌊

# Животные из Красной книги

!! Эти животные нуждаются в защите!

:- **panda** — панда 🐼
:- **tiger** — тигр 🐅
:- **whale** — кит 🐋
:- **elephant** — слон 🐘

## Описание животного

> **Пример:**
> A lion is a wild animal. It is big and strong. It lives in Africa. It has got four legs and a long tail. It can run fast.

!!! **Key Points:**
- It has got... — У него есть...
- It can... — Оно умеет...
- It lives in... — Оно живёт в...

+ Молодец! Ты знаешь названия животных! 🐾`,
          tasks: [
            "Называть животных",
            "Описывать внешность животных",
            "Говорить о среде обитания",
            "Обсуждать охрану природы",
            "Рассказывать о любимом животном",
            "Сравнивать животных"
          ]
        },
        {
          title: "Урок 7: В городе",
          description: `## В городе 🏙️

# Места в городе

:- **school** — школа 🏫
:- **hospital** — больница 🏥
:- **shop** — магазин 🏪
:- **supermarket** — супермаркет
:- **bank** — банк 🏦
:- **post office** — почта 📮
:- **library** — библиотека 📚
:- **museum** — музей 🏛️
:- **park** — парк 🌳
:- **cinema** — кино 🎬
:- **theatre** — театр 🎭
:- **restaurant** — ресторан 🍽️
:- **café** — кафе ☕
:- **hotel** — отель 🏨
:- **station** — станция 🚉
:- **airport** — аэропорт ✈️

# Как спросить дорогу

:- **Where is...?** — Где...?
:- **How can I get to...?** — Как добраться до...?
:- **Is it far?** — Это далеко?
:- **Where is the nearest...?** — Где ближайший...?

# Указания направления

:- **Go straight** — идите прямо
:- **Turn left** — поверните налево ⬅️
:- **Turn right** — поверните направо ➡️
:- **Go along the street** — идите вдоль улицы
:- **Cross the street** — перейдите улицу
:- **It's on the corner** — это на углу
:- **It's next to...** — это рядом с...
:- **It's opposite...** — это напротив...

> **Диалог:**
> - Excuse me! Where is the bank?
> - Go straight and turn left. It's next to the post office.
> - Thank you!
> - You're welcome!

# Предлоги места

:- **in** — в
:- **on** — на
:- **under** — под
:- **next to** — рядом с
:- **behind** — за
:- **in front of** — перед
:- **between** — между
:- **opposite** — напротив

!!! **Key Points:**
- Excuse me — извините (для привлечения внимания)
- Thank you — спасибо
- You're welcome — пожалуйста (ответ на спасибо)

+ Отлично! Ты можешь ориентироваться в городе! 🗺️`,
          tasks: [
            "Называть места в городе",
            "Описывать маршрут",
            "Спрашивать дорогу",
            "Давать указания",
            "Понимать план города",
            "Рассказывать о своём городе"
          ]
        },
        {
          title: "Урок 8: Транспорт",
          description: `## Транспорт 🚗

# Виды транспорта

:- **car** — машина 🚗
:- **bus** — автобус 🚌
:- **train** — поезд 🚆
:- **plane** — самолёт ✈️
:- **ship** — корабль 🚢
:- **bicycle / bike** — велосипед 🚲
:- **taxi** — такси 🚕
:- **metro / underground** — метро 🚇
:- **tram** — трамвай 🚋

# Глаголы движения

:- **go** — идти, ехать
:- **drive** — вести машину
:- **fly** — лететь
:- **sail** — плыть
:- **ride** — ехать (на велосипеде)

# Фразы о транспорте

:- **take a bus** — сесть на автобус
:- **by car** — на машине
:- **by bus** — на автобусе
:- **by train** — на поезде
:- **by plane** — на самолёте
:- **on foot** — пешком 🚶
:- **buy a ticket** — купить билет
:- **catch a train** — успеть на поезд

# Вокзал и аэропорт

:- **ticket** — билет 🎫
:- **platform** — платформа
:- **gate** — выход на посадку
:- **departure** — отправление
:- **arrival** — прибытие
:- **luggage** — багаж 🧳

# Транспорт в Лондоне 🇬🇧

:- **double-decker** — двухэтажный автобус
:- **underground / tube** — метро
:- **black cab** — чёрное такси

> **Диалог:**
> - How do you get to school?
> - I go by bus. And you?
> - I go on foot. It's not far.

## Сравнение транспорта

> **Примеры:**
> - A plane is faster than a train.
> - A bicycle is slower than a car.
> - The metro is the fastest.

!!! **Key Points:**
- by + транспорт (без артикля)
- take a + транспорт (сесть на...)
- on foot — пешком

+ Молодец! Ты знаешь виды транспорта! 🚀`,
          tasks: [
            "Называть виды транспорта",
            "Обсуждать путешествия",
            "Покупать билеты",
            "Описывать поездку",
            "Сравнивать виды транспорта",
            "Рассказывать о транспорте в городе"
          ]
        }
      ]
    },
    {
      topic: "Семья и друзья",
      lessons: [
        {
          title: "Урок 9: Члены семьи",
          description: `## Члены семьи 👨‍👩‍👧‍👦

# Близкие родственники

:- **mother / mum / mom** — мама
:- **father / dad** — папа
:- **parent** — родитель
:- **parents** — родители
:- **sister** — сестра
:- **brother** — брат
:- **grandmother / grandma** — бабушка
:- **grandfather / grandpa** — дедушка

# Расширенная семья

:- **aunt** — тётя
:- **uncle** — дядя
:- **cousin** — двоюродный брат/сестра
:- **nephew** — племянник
:- **niece** — племянница

# Притяжательный падеж

!! Притяжательный падеж показывает, кому что-то принадлежит!

:- **mother's car** — мамина машина
:- **Tom's book** — книга Тома
:- **my sister's room** — комната моей сестры
:- **my parents' house** — дом моих родителей

# Описание семьи

## Глагол have got

:- **I have got a mother and a father.** — У меня есть мама и папа.
:- **I've got a sister.** — У меня есть сестра.
:- **She has got two brothers.** — У неё два брата.

## Представление семьи

:- **This is my sister.** — Это моя сестра.
:- **These are my parents.** — Это мои родители.

> **Пример рассказа:**
> I have got a big family. My mother is a teacher. My father is a doctor. I've got a sister. Her name is Anna. She is 10 years old. I haven't got any brothers.

# Вопросы о семье

> - Have you got any brothers or sisters?
> - How many people are in your family?
> - What does your father do?

!!! **Key Points:**
- have got = have (британский вариант)
- has got = has (для he/she/it)
- haven't got = have not got
- Притяжательный падеж: 's (Tom's) или s' (parents')

+ Отлично! Ты можешь рассказать о семье! ❤️`,
          tasks: [
            "Называть родственников",
            "Описывать семью",
            "Говорить о возрасте членов семьи",
            "Сравнивать членов семьи",
            "Использовать притяжательный падеж",
            "Рассказывать о семье"
          ]
        },
        {
          title: "Урок 10: Внешность и характер",
          description: `## Внешность и характер 👤

# Описание внешности

## Рост и телосложение

:- **tall** — высокий
:- **short** — низкий
:- **medium height** — среднего роста
:- **slim** — стройный
:- **athletic** — атлетический
:- **plump** — полный

## Волосы

:- **long hair** — длинные волосы
:- **short hair** — короткие волосы
:- **straight hair** — прямые волосы
:- **curly hair** — кудрявые волосы
:- **wavy hair** — волнистые волосы

## Цвет волос

:- **fair / blond hair** — светлые волосы
:- **dark hair** — тёмные волосы
:- **brown hair** — каштановые волосы
:- **red / ginger hair** — рыжие волосы

## Глаза

:- **blue eyes** — голубые глаза 👁️
:- **brown eyes** — карие глаза
:- **green eyes** — зелёные глаза
:- **grey eyes** — серые глаза

# Характер человека

:- **kind** — добрый
:- **clever / smart** — умный
:- **friendly** — дружелюбный
:- **funny** — смешной, весёлый
:- **serious** — серьёзный
:- **shy** — застенчивый
:- **brave** — смелый
:- **lazy** — ленивый
:- **honest** — честный

# Грамматические конструкции

## Have got / Has got — для внешности

> **Примеры:**
> - He has got blue eyes. — У него голубые глаза.
> - She's got long curly hair. — У неё длинные кудрявые волосы.

## Am / Is / Are — для характера

> **Примеры:**
> - He is tall and slim. — Он высокий и стройный.
> - She is kind and friendly. — Она добрая и дружелюбная.
> - My friend is funny. — Мой друг весёлый.

# Описание человека

> **Пример:**
> My friend is Tom. He is 11 years old. He is tall and slim. He has got short dark hair and brown eyes. He is very kind and funny. He likes playing football.

!!! **Key Points:**
- has got = has (у него/неё есть)
- He/She is + прилагательное
- He/She has got + особенность

+ Супер! Ты умеешь описывать людей! 😊`,
          tasks: [
            "Описывать внешность",
            "Называть черты характера",
            "Сравнивать людей",
            "Составлять описание человека",
            "Использовать прилагательные",
            "Описывать друзей и родственников"
          ]
        },
        {
          title: "Урок 11: Друзья",
          description: `## Друзья 👫

# Словарь по теме

:- **friend** — друг
:- **friendship** — дружба
:- **best friend** — лучший друг
:- **classmate** — одноклассник
:- **neighbour** — сосед
:- **schoolmate** — школьный товарищ

# Что делают друзья

:- **play together** — играть вместе
:- **go for a walk** — гулять
:- **help each other** — помогать друг другу
:- **share** — делиться
:- **talk** — разговаривать
:- **spend time together** — проводить время вместе

# Качества хорошего друга

:- **loyal** — верный
:- **helpful** — помогающий
:- **honest** — честный
:- **funny** — весёлый
:- **kind** — добрый
:- **trustworthy** — надёжный
:- **supportive** — поддерживающий

# Фразы о дружбе

:- **My best friend is...** — Мой лучший друг —...
:- **We like to...** — Мы любим...
:- **He/She is my friend because...** — Он/Она мой друг, потому что...
:- **We have known each other for...** — Мы знакомы уже...

# Примеры диалогов

> **Диалог 1:**
> - Who is your best friend?
> - My best friend is Anna.
> - Why is she your best friend?
> - Because she is kind and funny. We like to play together.

> **Диалог 2:**
> - What do you do with your friends?
> - We play football and go for a walk.
> - How often do you meet?
> - We meet every day at school.

# Рассказ о друге

> **Пример:**
> My best friend is Max. He is 11 years old. We are classmates. Max is very kind and helpful. He is good at football. We like to play together after school. He is my best friend because he always helps me.

!!! **Key Points:**
- each other — друг друга
- because — потому что
- good at — хорош в чём-то

+ Отлично! Ты можешь говорить о друзьях! 🤝`,
          tasks: [
            "Говорить о друзьях",
            "Описывать дружбу",
            "Обсуждать общение с друзьями",
            "Рассказывать истории о друзьях",
            "Объяснять, почему человек друг",
            "Писать о друге"
          ]
        },
        {
          title: "Урок 12: Дом и быт",
          description: `## Дом и быт 🏠

# Типы жилья

:- **house** — дом
:- **flat / apartment** — квартира
:- **room** — комната

# Комнаты в доме

:- **bedroom** — спальня 🛏️
:- **living room** — гостиная
:- **kitchen** — кухня 🍳
:- **bathroom** — ванная 🛁
:- **hall** — коридор
:- **toilet** — туалет
:- **study** — кабинет
:- **garden** — сад 🌷

# Мебель

:- **bed** — кровать 🛏️
:- **table** — стол
:- **chair** — стул
:- **sofa** — диван 🛋️
:- **armchair** — кресло
:- **wardrobe** — шкаф для одежды
:- **bookcase** — книжный шкаф 📚
:- **desk** — письменный стол
:- **carpet** — ковёр
:- **lamp** — лампа 💡

# Предлоги места

| Предлог | Значение | Пример |
|---------|----------|--------|
| in | в | in the room |
| on | на | on the table |
| under | под | under the bed |
| next to | рядом с | next to the window |
| behind | за | behind the door |
| in front of | перед | in front of the house |
| between | между | between the chairs |

# Конструкция There is / There are

!! There is — для единственного числа
!! There are — для множественного числа

> **Примеры:**
> - There is a table in the kitchen. — На кухне есть стол.
> - There are two chairs in the room. — В комнате два стула.
> - There isn't a sofa in my bedroom. — В моей спальне нет дивана.
> - Are there any books on the desk? — Есть ли книги на столе?

# Описание комнаты

> **Пример:**
> My room is not very big. There is a bed, a desk and a chair in my room. There is a carpet on the floor. There are some posters on the wall. My wardrobe is next to the door. I like my room!

!!! **Key Points:**
- There is + одно
- There are + много
- Is there...? / Are there...?
- My room has... — В моей комнате есть...

+ Супер! Ты можешь описывать дом! 🏡`,
          tasks: [
            "Описывать дом",
            "Называть комнаты",
            "Говорить о мебели",
            "Описывать свою комнату",
            "Использовать предлоги места",
            "Рассказывать о доме"
          ]
        }
      ]
    },
    {
      topic: "Школа и образование",
      lessons: [
        {
          title: "Урок 13: Школьные предметы",
          description: `## Школьные предметы 📚

# Названия предметов

:- **Maths / Mathematics** — математика
:- **English** — английский язык
:- **Russian** — русский язык
:- **History** — история
:- **Geography** — география
:- **Biology** — биология
:- **Physics** — физика
:- **Chemistry** — химия
:- **Physical Education / PE** — физкультура ⚽
:- **Art** — изобразительное искусство 🎨
:- **Music** — музыка 🎵
:- **Information Technology / IT** — информатика 💻
:- **Literature** — литература

# Отношение к предметам

## Нравится

:- **I like...** — Мне нравится...
:- **I love...** — Я обожаю...
:- **My favourite subject is...** — Мой любимый предмет —...

## Не нравится

:- **I don't like...** — Мне не нравится...
:- **I hate...** — Я ненавижу...

# Характеристики предметов

:- **interesting** — интересный
:- **boring** — скучный
:- **difficult / hard** — трудный
:- **easy** — лёгкий
:- **fun** — весёлый
:- **useful** — полезный

# Диалоги о предметах

> **Диалог 1:**
> - What's your favourite subject?
> - My favourite subject is Maths. It's interesting.
> - I don't like Maths. It's too difficult.

> **Диалог 2:**
> - Do you like History?
> - Yes, I do. It's very interesting.
> - What about PE?
> - I love PE! It's my favourite.

# Расписание

| Day | Subject 1 | Subject 2 | Subject 3 |
|-----|-----------|-----------|-----------|
| Monday | Maths | English | PE |
| Tuesday | History | Russian | Art |
| Wednesday | Science | Geography | Music |

!!! **Key Points:**
- What's your favourite...? — Какой твой любимый...?
- What do you think of...? — Что ты думаешь о...?
- Do you like...? — Тебе нравится...?

+ Отлично! Ты знаешь школьные предметы! ✏️`,
          tasks: [
            "Называть предметы",
            "Говорить о расписании",
            "Обсуждать любимые предметы",
            "Сравнивать предметы",
            "Описывать отношение к предметам",
            "Составлять расписание"
          ]
        },
        {
          title: "Урок 14: В классе",
          description: `## В классе 🏫

# Классная комната

:- **classroom** — класс
:- **blackboard** — доска (классная)
:- **whiteboard** — белая доска
:- **desk** — парта
:- **chair** — стул
:- **teacher's desk** — учительский стол
:- **bookcase** — шкаф для книг
:- **window** — окно
:- **door** — дверь
:- **wall** — стена
:- **floor** — пол
:- **ceiling** — потолок

# Школьные принадлежности

:- **pen** — ручка 🖊️
:- **pencil** — карандаш ✏️
:- **ruler** — линейка 📏
:- **rubber / eraser** — ластик
:- **sharpener** — точилка
:- **textbook** — учебник 📖
:- **exercise book** — тетрадь 📓
:- **dictionary** — словарь
:- **schoolbag** — рюкзак 🎒
:- **scissors** — ножницы ✂️
:- **glue** — клей
:- **calculator** — калькулятор

# Команды учителя

:- **Open your books.** — Откройте книги.
:- **Close your books.** — Закройте книги.
:- **Listen to me.** — Послушайте меня.
:- **Read the text.** — Прочитайте текст.
:- **Write down.** — Запишите.
:- **Stand up.** — Встаньте.
:- **Sit down.** — Сядьте.
:- **Raise your hand.** — Поднимите руку.
:- **Work in pairs.** — Работайте в парах.
:- **Look at the board.** — Посмотрите на доску.

# Просьбы в классе

:- **Can I go to the toilet?** — Можно в туалет?
:- **Can you repeat, please?** — Повторите, пожалуйста.
:- **I don't understand.** — Я не понимаю.
:- **How do you spell...?** — Как пишется...?
:- **What does... mean?** — Что значит...?
:- **Can you help me?** — Можете мне помочь?

# Диалог на уроке

> **Диалог:**
> - Teacher: Open your books, page 25.
> - Student: Excuse me, what page?
> - Teacher: Page 25. Read the text, please.
> - Student: Can you repeat, please?
> - Teacher: Of course. Read the text on page 25.

!!! **Key Points:**
- Excuse me — извините (для вопроса)
- Can you...? — Можете...?
- Please — пожалуйста

+ Молодец! Ты знаешь классные фразы! ✨`,
          tasks: [
            "Называть школьные принадлежности",
            "Описывать класс",
            "Понимать инструкции учителя",
            "Давать инструкции",
            "Просить о помощи",
            "Разыгрывать диалоги"
          ]
        },
        {
          title: "Урок 15: Распорядок дня",
          description: `## Распорядок дня ⏰

# Утренние действия

:- **wake up** — просыпаться
:- **get up** — вставать
:- **wash** — умываться
:- **brush teeth** — чистить зубы 🪥
:- **have breakfast** — завтракать 🍳
:- **get dressed** — одеваться
:- **go to school** — идти в школу

# Дневные действия

:- **have lessons** — иметь уроки
:- **have lunch** — обедать
:- **go home** — идти домой
:- **do homework** — делать домашнее задание 📝

# Вечерние действия

:- **have dinner** — ужинать
:- **watch TV** — смотреть телевизор 📺
:- **read a book** — читать книгу
:- **go to bed** — ложиться спать 🛏️

# Время

## Вопрос о времени

:- **What time is it?** — Который час?

## Ответы

:- **It's 7 o'clock.** — 7 часов.
:- **It's half past seven.** — Половина восьмого (7:30).
:- **It's quarter past seven.** — Четверть восьмого (7:15).
:- **It's quarter to eight.** — Без четверти восемь (7:45).

## Предлоги времени

:- **at 7 o'clock** — в 7 часов
:- **in the morning** — утром
:- **in the afternoon** — днём
:- **in the evening** — вечером
:- **at night** — ночью

# Present Simple для регулярных действий

!! Present Simple используется для регулярных, повторяющихся действий!

> **Примеры:**
> - I wake up at 7 o'clock. — Я просыпаюсь в 7 часов.
> - She goes to school at 8. — Она идёт в школу в 8.
> - We have dinner at 7 p.m. — Мы ужинаем в 7 вечера.

## Наречия частотности

:- **always** — всегда (100%)
:- **usually** — обычно (80%)
:- **often** — часто (60%)
:- **sometimes** — иногда (40%)
:- **rarely** — редко (20%)
:- **never** — никогда (0%)

> **Пример:**
> I always have breakfast. I usually go to school by bus. I never watch TV in the morning.

!!! **Key Points:**
- Наречия частотности стоят ПЕРЕД глаголом
- Для he/she/it глагол + -s (goes, watches)
- don't / doesn't для отрицаний

+ Супер! Ты умеешь говорить о режиме дня! 🌅`,
          tasks: [
            "Говорить о режиме дня",
            "Использовать Present Simple",
            "Указывать время",
            "Описывать будни",
            "Составлять рассказ о своём дне",
            "Спрашивать о времени"
          ]
        },
        {
          title: "Урок 16: Выходные и каникулы",
          description: `## Выходные и каникулы 🎉

# Дни недели

| День | Английский | Сокращение |
|------|------------|------------|
| Понедельник | Monday | Mon |
| Вторник | Tuesday | Tue |
| Среда | Wednesday | Wed |
| Четверг | Thursday | Thu |
| Пятница | Friday | Fri |
| Суббота | Saturday | Sat |
| Воскресенье | Sunday | Sun |

!! Выходные (weekend) — Saturday и Sunday!

# Деятельность в выходные

:- **visit friends** — навещать друзей
:- **go shopping** — идти за покупками 🛍️
:- **play sports** — заниматься спортом ⚽
:- **read books** — читать книги 📚
:- **listen to music** — слушать музыку 🎵
:- **watch films** — смотреть фильмы 🎬
:- **go to the cinema** — идти в кино
:- **play computer games** — играть в компьютерные игры
:- **sleep late** — спать допоздна
:- **meet friends** — встречаться с друзьями

# Каникулы

:- **holidays** — каникулы
:- **summer holidays** — летние каникулы ☀️
:- **winter holidays** — зимние каникулы ❄️
:- **spring holidays** — весенние каникулы 🌷
:- **autumn holidays** — осенние каникулы 🍂

# Past Simple для рассказа о прошлом

!! Past Simple используется для действий, завершённых в прошлом!

## Правильные глаголы (+ -ed)

:- **play → played** — играл
:- **watch → watched** — смотрел
:- **visit → visited** — навещал

## Неправильные глаголы

:- **go → went** — шёл, ездил
:- **see → saw** — видел
:- **have → had** — имел
:- **do → did** — делал

# Слова-маркеры прошедшего времени

:- **yesterday** — вчера
:- **last week** — на прошлой неделе
:- **last weekend** — в прошлые выходные
:- **two days ago** — два дня назад
:- **last summer** — прошлым летом

> **Пример рассказа:**
> Last weekend I visited my grandmother. We had a good time together. I played with my cousin. On Sunday I went to the cinema with my friends. We watched an interesting film.

!!! **Key Points:**
- Yesterday, last..., ...ago — маркеры Past Simple
- didn't + глагол (начальная форма) — отрицание
- Did + подлежащее + глагол? — вопрос

+ Отлично! Ты умеешь рассказывать о выходных! 🌈`,
          tasks: [
            "Говорить о выходных",
            "Обсуждать планы",
            "Рассказывать о каникулах",
            "Использовать Past Simple",
            "Описывать отдых",
            "Сравнивать будни и выходные"
          ]
        }
      ]
    },
    {
      topic: "Еда и покупки",
      lessons: [
        {
          title: "Урок 17: Продукты питания",
          description: `## Продукты питания 🍎

# Основные продукты

## Хлеб и злаки

:- **bread** — хлеб 🍞
:- **rice** — рис
:- **pasta** — макароны
:- **cereal** — хлопья

## Молочные продукты

:- **milk** — молоко 🥛
:- **cheese** — сыр 🧀
:- **butter** — масло
:- **yoghurt** — йогурт

## Мясо и рыба

:- **meat** — мясо 🥩
:- **fish** — рыба 🐟
:- **chicken** — курица 🍗
:- **sausage** — колбаса

# Фрукты и овощи

## Фрукты 🍎

:- **apple** — яблоко
:- **orange** — апельсин 🍊
:- **banana** — банан 🍌
:- **pear** — груша
:- **grape** — виноград 🍇

## Овощи 🥕

:- **potato** — картофель
:- **tomato** — помидор 🍅
:- **carrot** — морковь
:- **cucumber** — огурец
:- **onion** — лук

# Другие продукты

:- **egg** — яйцо 🥚
:- **sugar** — сахар
:- **salt** — соль
:- **oil** — масло (растительное)

# Приёмы пищи

:- **breakfast** — завтрак 🍳
:- **lunch** — обед 🥪
:- **dinner** — ужин 🍽️
:- **snack** — перекус

# Напитки

:- **water** — вода 💧
:- **tea** — чай 🍵
:- **coffee** — кофе ☕
:- **juice** — сок 🧃

# Отношение к еде

:- **I like...** — Мне нравится...
:- **I don't like...** — Мне не нравится...
:- **delicious** — вкусно 😋
:- **tasty** — вкусный
:- **yummy** — вкуснятина
:- **disgusting** — отвратительно

> **Диалог:**
> - What do you like for breakfast?
> - I like cereal with milk. And you?
> - I prefer eggs and toast.
> - Do you like orange juice?
> - Yes, it's delicious!

!!! **Key Points:**
- for breakfast / lunch / dinner — на завтрак/обед/ужин
- Would you like...? — Хотите...?
- some + продукты (some milk, some bread)

+ Супер! Ты знаешь названия продуктов! 🛒`,
          tasks: [
            "Называть продукты",
            "Обсуждать предпочтения в еде",
            "Составлять меню",
            "Говорить о здоровом питании",
            "Описывать приёмы пищи",
            "Разыгрывать диалоги о еде"
          ]
        },
        {
          title: "Урок 18: В кафе и ресторане",
          description: `## В кафе и ресторане 🍽️

# Блюда

:- **pizza** — пицца 🍕
:- **hamburger** — гамбургер 🍔
:- **sandwich** — сэндвич 🥪
:- **salad** — салат 🥗
:- **soup** — суп 🍲
:- **ice cream** — мороженое 🍦
:- **cake** — торт 🎂
:- **chips / fries** — картофель фри 🍟

# Диалоги в кафе

## Приветствие и заказ

:- **Can I help you?** — Чем могу помочь?
:- **I would like...** — Я хотел бы...
:- **What would you like to eat/drink?** — Что вы хотели бы съесть/выпить?
:- **Here is the menu.** — Вот меню.
:- **Anything else?** — Что-нибудь ещё?
:- **That's all.** — Это всё.

## Пример диалога

> **Официант:** Can I help you?
> **Клиент:** I would like a hamburger, please.
> **Официант:** What would you like to drink?
> **Клиент:** An orange juice, please.
> **Официант:** Anything else?
> **Клиент:** No, that's all.

# Оплата

:- **How much is it?** — Сколько это стоит?
:- **How much does it cost?** — Сколько это стоит?
:- **Here you are.** — Вот, пожалуйста.
:- **Thank you.** — Спасибо.
:- **Keep the change.** — Сдачи не надо.
:- **Can I have the bill, please?** — Счёт, пожалуйста.

# Выражение мнения о еде

:- **It's delicious!** — Это вкусно!
:- **It's tasty.** — Это вкусно.
:- **It's not very good.** — Не очень хорошо.
:- **I like it.** — Мне нравится.
:- **I don't like it.** — Мне не нравится.

# Полезные фразы

:- **Can I have...?** — Можно мне...?
:- **I'd like...** — Я бы хотел...
:- **Excuse me!** — Извините! (чтобы подозвать)
:- **Waiter!** — Официант!

!!! **Key Points:**
- I would like = I'd like (сокращение)
- Can I have...? — вежливая просьба
- Anything else? — что-нибудь ещё?

+ Отлично! Ты умеешь делать заказ в кафе! 🥤`,
          tasks: [
            "Делать заказ в кафе",
            "Спрашивать о блюдах",
            "Платить за заказ",
            "Выражать мнение о еде",
            "Разыгрывать диалог в кафе",
            "Понимать меню"
          ]
        },
        {
          title: "Урок 19: Покупки",
          description: `## Покупки 🛍️

# Виды магазинов

:- **shop** — магазин
:- **supermarket** — супермаркет
:- **bakery** — булочная 🥖
:- **butcher's** — мясной магазин 🥩
:- **greengrocer's** — овощной магазин 🥬
:- **bookshop** — книжный магазин 📚
:- **clothes shop** — магазин одежды
:- **shoe shop** — обувной магазин 👠
:- **toy shop** — магазин игрушек 🧸

# Совершение покупок

## Вопросы о цене

:- **How much is this?** — Сколько это стоит?
:- **How much are these?** — Сколько стоят эти?
:- **How much does it cost?** — Сколько это стоит?

## Примерка одежды

:- **Can I try it on?** — Можно примерить?
:- **Where is the fitting room?** — Где примерочная?
:- **What size do you need?** — Какой размер вам нужен?
:- **It's too big.** — Это слишком большое.
:- **It's too small.** — Это слишком маленькое.
:- **It fits me.** — Мне подходит.
:- **I'll take it.** — Я возьму это.

# Диалог в магазине

> **Продавец:** Can I help you?
> **Покупатель:** Yes, I'm looking for a T-shirt.
> **Продавец:** What size?
> **Покупатель:** Medium, please. Can I try it on?
> **Продавец:** Sure. The fitting room is over there.
> **Покупатель:** It fits me. How much is it?
> **Продавец:** It's 15 pounds.
> **Покупатель:** I'll take it.

# Денежные единицы

:- **pound (£)** — фунт (Великобритания) 🇬🇧
:- **dollar ($)** — доллар (США) 🇺🇸
:- **euro (€)** — евро 🇪🇺
:- **rouble (₽)** — рубль 🇷🇺

# Сравнение цен

:- **cheap** — дешёвый
:- **expensive** — дорогой
:- **It's cheaper than...** — Это дешевле, чем...
:- **It's more expensive than...** — Это дороже, чем...

!!! **Key Points:**
- I'm looking for... — Я ищу...
- Can I help you? — Вам помочь?
- I'll take it — Я возьму это (решение купить)

+ Супер! Ты умеешь делать покупки! 💳`,
          tasks: [
            "Называть магазины",
            "Спрашивать цену",
            "Совершать покупки",
            "Обсуждать одежду",
            "Разыгрывать диалог в магазине",
            "Сравнивать цены"
          ]
        },
        {
          title: "Урок 20: Одежда",
          description: `## Одежда 👕

# Предметы одежды

## Верхняя одежда

:- **coat** — пальто 🧥
:- **jacket** — куртка
:- **raincoat** — плащ

## Повседневная одежда

:- **dress** — платье 👗
:- **skirt** — юбка
:- **trousers** — брюки 👖
:- **jeans** — джинсы 👖
:- **shirt** — рубашка
:- **T-shirt** — футболка 👕
:- **sweater** — свитер
:- **jumper** — джемпер
:- **shorts** — шорты

## Аксессуары

:- **hat** — шляпа 🎩
:- **cap** — кепка 🧢
:- **scarf** — шарф 🧣
:- **gloves** — перчатки 🧤

## Обувь

:- **shoes** — туфли 👠
:- **boots** — ботинки 👢
:- **trainers** — кроссовки 👟
:- **sandals** — сандалии

# Размеры

:- **size** — размер
:- **small (S)** — маленький
:- **medium (M)** — средний
:- **large (L)** — большой

# Цвета 🎨

:- **black** — чёрный ⚫
:- **white** — белый ⚪
:- **red** — красный 🔴
:- **blue** — синий 🔵
:- **green** — зелёный 🟢
:- **yellow** — жёлтый 🟡
:- **brown** — коричневый 🟤
:- **grey** — серый
:- **pink** — розовый 💗
:- **orange** — оранжевый 🟠
:- **purple** — фиолетовый 🟣

# Сезонная одежда

| Сезон | Одежда |
|-------|--------|
| Summer | T-shirt, shorts, sandals, cap |
| Winter | coat, sweater, boots, scarf, gloves |
| Spring/Autumn | jacket, jeans, trainers |

# Описание одежды

:- **I'm wearing...** — На мне надето...
:- **She is wearing a blue dress.** — На ней синее платье.
:- **He is wearing jeans and a T-shirt.** — На нём джинсы и футболка.

# Вопросы об одежде

> - What are you wearing today?
> - What's your favourite colour?
> - Do you like this dress?
> - What size do you wear?

!!! **Key Points:**
- wear — носить (одежду)
- put on — надевать
- take off — снимать
- try on — примерять

+ Отлично! Ты знаешь названия одежды! 👗`,
          tasks: [
            "Называть предметы одежды",
            "Описывать наряд",
            "Обсуждать моду",
            "Говорить о размерах",
            "Описывать одежду по цвету",
            "Выбирать одежду для сезона"
          ]
        }
      ]
    },
    {
      topic: "Грамматика",
      lessons: [
        {
          title: "Урок 21: Present Simple",
          description: `## Present Simple 📖

# Когда используется

!! Present Simple используется для:
- Регулярных, повторяющихся действий
- Фактов и истин
- Расписаний

# Утверждения

## Правило

| Лицо | Форма | Пример |
|------|-------|--------|
| I / You / We / They | глагол | I work. |
| He / She / It | глагол + -s/-es | He works. |

> **Примеры:**
> - I play tennis every day.
> - She plays tennis on Monday.
> - We go to school by bus.
> - He goes to work at 8 o'clock.

# Отрицания

## Правило

| Лицо | Форма | Пример |
|------|-------|--------|
| I / You / We / They | don't + глагол | I don't work. |
| He / She / It | doesn't + глагол | He doesn't work. |

> **Примеры:**
> - I don't like coffee.
> - She doesn't play football.
> - They don't speak French.
> - He doesn't work on Sunday.

# Вопросы

## Правило

| Лицо | Форма | Пример |
|------|-------|--------|
| I / You / We / They | Do + подлежащее + глагол? | Do you work? |
| He / She / It | Does + подлежащее + глагол? | Does he work? |

> **Примеры:**
> - Do you play tennis?
> - Does she speak English?
> - Do they live in London?

## Краткие ответы

:- **Yes, I do. / No, I don't.**
:- **Yes, he does. / No, he doesn't.**
:- **Yes, they do. / No, they don't.**

# Наречия частотности

| Наречие | Значение | Частота |
|---------|----------|---------|
| always | всегда | 100% |
| usually | обычно | 80% |
| often | часто | 60% |
| sometimes | иногда | 40% |
| rarely | редко | 20% |
| never | никогда | 0% |

!! Наречия частотности ставятся ПЕРЕД глаголом!

> **Примеры:**
> - I always have breakfast.
> - She never watches TV in the morning.
> - We usually go to school by bus.

# Правило -s / -es

| Глагол | Добавление | Пример |
|--------|------------|--------|
| обычный | + s | work → works |
| -s, -ss, -sh, -ch, -x | + es | watch → watches |
| согласная + y | y → ies | study → studies |
| гласная + y | + s | play → plays |

!!! **Key Points:**
- don't / doesn't + глагол (без окончаний!)
- Do / Does + подлежащее + глагол?
- Наречия частотности перед глаголом

+ Супер! Ты знаешь Present Simple! ⏰`,
          tasks: [
            "Образовывать утверждения",
            "Задавать вопросы",
            "Отвечать на вопросы",
            "Использовать наречия частотности",
            "Правильно добавлять -s к глаголу",
            "Описывать регулярные действия"
          ]
        },
        {
          title: "Урок 22: Present Continuous",
          description: `## Present Continuous 🏃

# Когда используется

!! Present Continuous используется для:
- Действий, происходящих прямо сейчас
- Временных ситуаций
- Планов на ближайшее будущее

# Образование

## Формула

\`\`\`
am/is/are + глагол + -ing
\`\`\`

| Подлежащее | Вспомогательный | Пример |
|------------|-----------------|--------|
| I | am | I am reading. |
| He / She / It | is | He is reading. |
| We / You / They | are | They are reading. |

# Утверждения

> **Примеры:**
> - I am reading now. — Я читаю сейчас.
> - She is watching TV. — Она смотрит телевизор.
> - They are playing football. — Они играют в футбол.
> - He is sleeping. — Он спит.

# Отрицания

## Формула

\`\`\`
am/is/are + not + глагол + -ing
\`\`\`

> **Примеры:**
> - I am not sleeping. — Я не сплю.
> - She isn't watching TV. — Она не смотрит телевизор.
> - They aren't playing. — Они не играют.

# Вопросы

## Формула

\`\`\`
Am/Is/Are + подлежащее + глагол + -ing?
\`\`\`

> **Примеры:**
> - Am I sleeping? — Я сплю?
> - Is she reading? — Она читает?
> - Are they playing? — Они играют?

## Краткие ответы

:- **Yes, I am. / No, I'm not.**
:- **Yes, he is. / No, he isn't.**
:- **Yes, they are. / No, they aren't.**

# Слова-маркеры

:- **now** — сейчас
:- **at the moment** — в данный момент
:- **at present** — в настоящее время
:- **Look!** — Смотри!
:- **Listen!** — Слушай!

# Правила написания -ing

| Глагол | Правило | Результат |
|--------|---------|-----------|
| обычный | + ing | read → reading |
| -e | убрать e, + ing | write → writing |
| короткий, одна гласная | удвоить согласную | run → running |

# Отличие от Present Simple

| Present Simple | Present Continuous |
|----------------|-------------------|
| Регулярные действия | Действие сейчас |
| I play tennis every day. | I am playing tennis now. |
| She works here. | She is working today. |

!!! **Key Points:**
- am/is/are + verb-ing
- now, at the moment — маркеры Continuous
- I'm = I am, He's = He is, They're = They are

+ Отлично! Ты знаешь Present Continuous! 🎯`,
          tasks: [
            "Образовывать форму Continuous",
            "Отличать от Present Simple",
            "Использовать для текущих действий",
            "Задавать вопросы",
            "Понимать слова-маркеры",
            "Выбирать правильное время"
          ]
        },
        {
          title: "Урок 23: Past Simple",
          description: `## Past Simple 📅

# Когда используется

!! Past Simple используется для:
- Действий, завершённых в прошлом
- Исторических событий
- Последовательных действий в прошлом

# Правильные глаголы

## Правило

\`\`\`
глагол + -ed
\`\`\`

| Глагол | Прошедшее | Перевод |
|--------|-----------|---------|
| work | worked | работал |
| play | played | играл |
| watch | watched | смотрел |
| visit | visited | посетил |
| clean | cleaned | убирал |

# Неправильные глаголы

!! Неправильные глаголы меняют форму — их нужно запоминать!

| Глагол | Прошедшее | Перевод |
|--------|-----------|---------|
| go | went | шёл, ездил |
| see | saw | видел |
| have | had | имел |
| do | did | делал |
| come | came | приходил |
| take | took | взял |
| give | gave | дал |
| know | knew | знал |
| get | got | получил |
| make | made | сделал |
| say | said | сказал |
| buy | bought | купил |

# Утверждения

> **Примеры:**
> - I played football yesterday.
> - She went to school last week.
> - They watched a film last night.
> - We visited our grandparents.

# Отрицания

## Формула

\`\`\`
did not (didn't) + глагол (начальная форма!)
\`\`\`

> **Примеры:**
> - I didn't play football yesterday.
> - She didn't go to school.
> - They didn't watch TV.

# Вопросы

## Формула

\`\`\`
Did + подлежащее + глагол (начальная форма)?
\`\`\`

> **Примеры:**
> - Did you play football?
> - Did she go to school?
> - Did they watch TV?

## Краткие ответы

:- **Yes, I did. / No, I didn't.**
:- **Yes, he did. / No, he didn't.**

# Слова-маркеры

:- **yesterday** — вчера
:- **last week** — на прошлой неделе
:- **last month** — в прошлом месяце
:- **last year** — в прошлом году
:- **...ago** — ...тому назад
:- **in 2010** — в 2010 году

> **Пример рассказа:**
> Yesterday I went to the park. I played football with my friends. Then we had lunch. We didn't watch TV. We had a great time!

!!! **Key Points:**
- Правильные: verb + ed
- Неправильные: учить наизусть
- didn't + глагол (без окончаний!)
- Did + глагол? (без окончаний!)

+ Супер! Ты знаешь прошедшее время! ⏮️`,
          tasks: [
            "Образовывать правильные глаголы",
            "Запоминать неправильные глаголы",
            "Задавать вопросы в прошедшем",
            "Рассказывать о прошлом",
            "Понимать слова-маркеры",
            "Отличать от других времён"
          ]
        },
        {
          title: "Урок 24: Future Simple",
          description: `## Future Simple 🔮

# Когда используется

!! Future Simple используется для:
- Будущих действий
- Предсказаний
- Мгновенных решений

# Образование

## Формула

\`\`\`
will + глагол (без to)
\`\`\`

# Утверждения

> **Примеры:**
> - I will go to London. — Я поеду в Лондон.
> - She will come tomorrow. — Она придёт завтра.
> - They will help us. — Они помогут нам.
> - It will rain. — Будет дождь.

# Сокращённые формы

:- **I will → I'll**
:- **She will → She'll**
:- **They will → They'll**
:- **We will → We'll**

# Отрицания

## Формула

\`\`\`
will not (won't) + глагол
\`\`\`

> **Примеры:**
> - I won't go there. — Я не пойду туда.
> - She won't come. — Она не придёт.
> - They won't help. — Они не помогут.

# Вопросы

## Формула

\`\`\`
Will + подлежащее + глагол?
\`\`\`

> **Примеры:**
> - Will you come? — Ты придёшь?
> - Will she help? — Она поможет?
> - Will it rain? — Будет дождь?

## Краткие ответы

:- **Yes, I will. / No, I won't.**
:- **Yes, she will. / No, she won't.**

# Слова-маркеры

:- **tomorrow** — завтра
:- **next week** — на следующей неделе
:- **next month** — в следующем месяце
:- **soon** — скоро
:- **in the future** — в будущем
:- **in two days** — через два дня

# Will vs Going to

| Will | Going to |
|------|----------|
| Мгновенные решения | Запланированные действия |
| I'll help you! | I'm going to visit Paris. |
| Предсказания | То, что точно случится |
| It will rain. | Look! It's going to rain. |

> **Примеры:**
> - I'm hungry. — I'll make a sandwich. (решение сейчас)
> - What are you doing tomorrow? — I'm going to visit my grandmother. (план)

# Диалог о планах

> **Диалог:**
> - What will you do tomorrow?
> - I'll visit my friend. And you?
> - I'll go to the cinema.
> - Will you come to my party?
> - Yes, I will. I'll be there!

!!! **Key Points:**
- will + глагол (без to!)
- won't = will not
- I'll, you'll, she'll — сокращения
- will — решения сейчас, going to — планы

+ Отлично! Ты умеешь говорить о будущем! 🚀`,
          tasks: [
            "Использовать will для будущего",
            "Говорить о планах",
            "Делать предсказания",
            "Обсуждать будущее",
            "Образовывать отрицания и вопросы",
            "Различать will и going to"
          ]
        }
      ]
    }
  ]
}

export const games: GameLesson[] = [
  {
    title: "Приветствие и знакомство",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Как сказать «Как тебя зовут?»", options: ["How old are you?", "What is your name?", "Where are you from?"], correctAnswer: "What is your name?", hint: "Name = имя" },
      { type: 'quiz', question: "Как ответить на «How are you?»?", options: ["I am 12", "I am fine", "I am from Russia"], correctAnswer: "I am fine", hint: "Fine = хорошо" },
      { type: 'find', question: "Выбери фразы приветствия:", options: ["Hello", "Goodbye", "Hi", "Good night", "Good morning", "See you"], correctAnswer: ["Hello", "Hi", "Good morning"], hint: "Hello, Hi, Good morning = приветствие" },
      { type: 'quiz', question: "Nice to meet you = ?", options: ["До свидания", "Приятно познакомиться", "Как дела"], correctAnswer: "Приятно познакомиться", hint: "Meet = встречать, знакомиться" }
    ],
    reward: { stars: 3, message: "Great! Ты умеешь знакомиться! 👋" }
  },
  {
    title: "Погода и времена года",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Как сказать «солнечно»?", options: ["Rainy", "Sunny", "Cloudy"], correctAnswer: "Sunny", hint: "Sun = солнце" },
      { type: 'find', question: "Выбери названия времён года:", options: ["Monday", "Winter", "Spring", "January", "Summer", "Autumn"], correctAnswer: ["Winter", "Spring", "Summer", "Autumn"], hint: "Seasons = времена года" },
      { type: 'quiz', question: "What's the weather like? = ?", options: ["Который час?", "Какая погода?", "Как дела?"], correctAnswer: "Какая погода?", hint: "Weather = погода" },
      { type: 'quiz', question: "Какая погода: It's raining?", options: ["Солнечно", "Дождливо", "Снежно"], correctAnswer: "Дождливо", hint: "Rain = дождь" }
    ],
    reward: { stars: 3, message: "Excellent! Ты говоришь о погоде! ☀️" }
  },
  {
    title: "Семья и дом",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Mother - это?", options: ["Папа", "Мама", "Бабушка"], correctAnswer: "Мама", hint: "Mother = мама" },
      { type: 'find', question: "Выбери названия комнат:", options: ["Kitchen", "Car", "Bedroom", "Garden", "Bathroom", "Living room"], correctAnswer: ["Kitchen", "Bedroom", "Bathroom", "Living room"], hint: "Rooms = комнаты" },
      { type: 'quiz', question: "Как будет «семья»?", options: ["Friend", "Family", "House"], correctAnswer: "Family", hint: "Family = семья" },
      { type: 'quiz', question: "Sister - это?", options: ["Сестра", "Брат", "Тётя"], correctAnswer: "Сестра", hint: "Sister = сестра" }
    ],
    reward: { stars: 3, message: "Wonderful! Ты говоришь о семье! 🏠" }
  },
  {
    title: "Present Simple vs Present Continuous",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Когда используем Present Simple?", options: ["Для регулярных действий", "Для действий сейчас", "Для прошлого"], correctAnswer: "Для регулярных действий", hint: "Present Simple: I play tennis every day" },
      { type: 'quiz', question: "Когда используем Present Continuous?", options: ["Для регулярных действий", "Для действий в данный момент", "Для будущего"], correctAnswer: "Для действий в данный момент", hint: "Present Continuous: I am playing now" },
      { type: 'find', question: "Выбери предложения в Present Continuous:", options: ["I am reading now", "She reads every day", "They are playing", "He works here", "We are watching TV"], correctAnswer: ["I am reading now", "They are playing", "We are watching TV"], hint: "Present Continuous = am/is/are + verb-ing" },
      { type: 'quiz', question: "I ___ to school every day. (go)", options: ["am going", "go", "went"], correctAnswer: "go", hint: "Present Simple для регулярных действий" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь времена! ⏰" }
  },
  {
    title: "Past Simple - прошедшее время",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Go в прошедшем времени = ?", options: ["goed", "went", "gone"], correctAnswer: "went", hint: "Go - неправильный глагол: went" },
      { type: 'quiz', question: "Play в прошедшем времени = ?", options: ["played", "plaied", "playd"], correctAnswer: "played", hint: "Play - правильный глагол + ed" },
      { type: 'find', question: "Выбери глаголы в Past Simple:", options: ["Went", "Go", "Played", "Eat", "Visited", "See"], correctAnswer: ["Went", "Played", "Visited"], hint: "Past Simple = прошедшее время" },
      { type: 'quiz', question: "I ___ to the cinema yesterday.", options: ["go", "went", "am going"], correctAnswer: "went", hint: "Yesterday = вчера (прошедшее время)" }
    ],
    reward: { stars: 3, message: "Excellent! Ты знаешь прошедшее время! 📅" }
  }
]
