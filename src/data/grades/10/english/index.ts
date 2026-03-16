import { SubjectData, GameLesson } from '@/data/types'

const L = (title: string, description: string, tasks: string[], image?: string, content?: string, examples?: string[], facts?: string[]) => ({ 
  title, description, tasks, image, content, examples, facts
})

export const lessons: SubjectData = {
  title: "Английский язык",
  icon: "Languages",
  color: "text-pink-400",
  topics: ["Grammar", "Vocabulary", "Reading", "Speaking"],
  detailedTopics: [
    {
      topic: "Грамматика",
      lessons: [
        L("Урок 1: Времена группы Perfect", "Present, Past, Future Perfect.", [
          "Present Perfect: have/has + V3",
          "Past Perfect: had + V3",
          "Future Perfect: will have + V3",
          "Отличие от Simple и Continuous"
        ], "/school-curriculum-app/images/lessons/english/grammar.png",
        "**Present Perfect** — настоящее совершённое время.\n\n**Образование:**\nhave/has + V3 (причастие прошедшего времени)\n\n| Лицо | Единственное | Множественное |\n|------|--------------|----------------|\n| I/You | have worked | have worked |\n| He/She/It | has worked | have worked |\n\n**Употребление:**\n1. Действие завершилось, результат важен сейчас:\n- I have lost my key. (Я потерял ключ — и сейчас не могу найти)\n2. Личный опыт:\n- I have been to Paris. (Я был в Париже)\n3. С маркерами: ever, never, already, just, yet, recently:\n- Have you ever seen a ghost?\n- I have already done my homework.\n\n---\n\n**Past Perfect** — прошедшее совершённое время.\n\n**Образование:**\nhad + V3\n\n**Употребление:**\nДействие завершилось до другого действия в прошлом.\n- When I came home, mother had cooked dinner. (Мама приготовила обед ДО того, как я пришёл)\n\n---\n\n**Future Perfect** — будущее совершённое время.\n\n**Образование:**\nwill have + V3\n\n**Употребление:**\nДействие завершится к определённому моменту в будущем.\n- By 5 o'clock I will have finished my work. (К 5 часам я закончу работу)\n\n---\n\n**Сравнение времён:**\n- **Present Perfect:** I have lost my key. (результат важен сейчас)\n- **Past Simple:** I lost my key yesterday. (указано время)\n- **Past Perfect:** I had lost my key before I found it. (до другого действия)",
        ["I have finished. (Я закончил — результат)", "She had left when I came. (Она ушла до моего прихода)", "By 2025 I will have graduated. (К 2025 я закончу)"],
        ["Present Perfect связывает прошлое с настоящим", "Past Perfect — «предпрошедшее» время", "Future Perfect используется редко"]),
        L("Урок 2: Passive Voice", "Страдательный залог.", [
          "Образование пассивного залога",
          "Все времена в пассиве",
          "Когда использовать пассив",
          "Примеры в речи"
        ], "/school-curriculum-app/images/lessons/english/grammar.png",
        "**Passive Voice** — страдательный залог.\n\n**Образование:**\nbe + V3 (причастие прошедшего времени)\n\n**Формула:**\nОбъект + be + V3 (+ by агент)\n\n**Сравнение:**\n- Active: They built this house in 1990.\n- Passive: This house was built in 1990.\n\n**Времена в Passive Voice:**\n\n| Время | Форма | Пример |\n|-------|-------|--------|\n| Present Simple | am/is/are + V3 | The book is read. |\n| Past Simple | was/were + V3 | The book was read. |\n| Future Simple | will be + V3 | The book will be read. |\n| Present Continuous | am/is/are being + V3 | The book is being read. |\n| Past Continuous | was/were being + V3 | The book was being read. |\n| Present Perfect | have/has been + V3 | The book has been read. |\n| Past Perfect | had been + V3 | The book had been read. |\n\n**Когда использовать:**\n1. Когда неизвестно, кто совершил действие:\n- The window was broken. (Окно разбито — неизвестно кто)\n\n2. Когда важнее объект, чем субъект:\n- The Mona Lisa was painted by Da Vinci. (Важна картина)\n\n3. В научных текстах и инструкциях:\n- Water is heated to 100°C.\n\n**Отсутствие Perfect Continuous и Future Continuous в Passive.**\n\n**Замена:** вместо Future Continuous Passive используют Future Simple Passive.\n\n**Инфинитив в пассиве:**\n- to be done (быть сделанным)\n- to have been done (быть сделанным ранее)",
        ["The book is written. (Книга написана)", "The house was built in 1990. (Дом был построен)", "English is spoken here. (Здесь говорят по-английски)"],
        ["В Passive не указывается, кто совершает действие", "by используется, если нужно указать агента", "Passive часто используется в научных текстах"]),
        L("Урок 3: Conditionals", "Условные предложения.", [
          "Zero Conditional",
          "First Conditional",
          "Second Conditional",
          "Third Conditional"
        ], "/school-curriculum-app/images/lessons/english/grammar.png",
        "**Conditionals** — условные предложения.\n\n**Структура:**\nIf + условие, результат\n\n---\n\n**Zero Conditional (0)**\n\n**Использование:** факты, законы природы, всегда истинные условия.\n\n**Структура:**\nIf + Present Simple, Present Simple\n\n**Примеры:**\n- If you heat water to 100°C, it boils.\n- If I'm tired, I go to bed early.\n\n---\n\n**First Conditional (I)**\n\n**Использование:** реальное условие в будущем.\n\n**Структура:**\nIf + Present Simple, will + V\n\n**Примеры:**\n- If it rains, I will stay at home.\n- If you study hard, you will pass the exam.\n\n---\n\n**Second Conditional (II)**\n\n**Использование:** нереальное условие в настоящем или будущем.\n\n**Структура:**\nIf + Past Simple, would + V\n\n**Примеры:**\n- If I had a million dollars, I would buy a house. (Но у меня нет миллиона)\n- If I were you, I would accept the offer. (На твоём месте я бы...)\n\n**Важно:** в условии используется were для всех лиц (If I were, If he were).\n\n---\n\n**Third Conditional (III)**\n\n**Использование:** нереальное условие в прошлом.\n\n**Структура:**\nIf + Past Perfect, would have + V3\n\n**Примеры:**\n- If I had studied harder, I would have passed the exam. (Но я не учился и не сдал)\n- If she had known, she would have come. (Но она не знала и не пришла)\n\n---\n\n**Таблица условных:**\n\n| Тип | Условие | Результат | Значение |\n|-----|---------|-----------|----------|\n| 0 | Present | Present | Факт |\n| I | Present | will + V | Реальное будущее |\n| II | Past | would + V | Нереальное настоящее |\n| III | Past Perfect | would have + V3 | Нереальное прошлое |",
        ["If you heat ice, it melts. (0 — факт)", "If it rains, I'll stay home. (I — реальное)", "If I were rich, I would travel. (II — нереальное)"],
        ["В II Conditional: If I were (не was!)", "III Conditional — сожаление о прошлом", "Без if: Had I known... = If I had known..."]),
        L("Урок 4: Reported Speech", "Косвенная речь.", [
          "Прямая и косвенная речь",
          "Изменение времён",
          "Изменение местоимений",
          "Вопросы в косвенной речи"
        ], "/school-curriculum-app/images/lessons/english/grammar.png",
        "**Reported Speech** — косвенная речь.\n\n**Сравнение:**\n- Direct: \"I am happy,\" said Tom.\n- Reported: Tom said that he was happy.\n\n---\n\n**Изменение времён (Sequence of Tenses):**\n\nПри переводе в косвенную речь времена «отодвигаются назад»:\n\n| Прямая речь | Косвенная речь |\n|-------------|----------------|\n| Present Simple | Past Simple |\n| Present Continuous | Past Continuous |\n| Present Perfect | Past Perfect |\n| Past Simple | Past Perfect |\n| will | would |\n| can | could |\n| may | might |\n| must | had to |\n\n**Примеры:**\n- \"I work here.\" → He said he worked there.\n- \"I am working.\" → He said he was working.\n- \"I have finished.\" → He said he had finished.\n- \"I will come.\" → He said he would come.\n\n---\n\n**Изменение местоимений и наречий:**\n\n| Прямая речь | Косвенная речь |\n|-------------|----------------|\n| I | he/she |\n| my | his/her |\n| this | that |\n| here | there |\n| now | then |\n| today | that day |\n| yesterday | the day before |\n| tomorrow | the next day |\n\n---\n\n**Вопросы в косвенной речи:**\n\n**Общие вопросы (yes/no):**\n- Direct: \"Do you like coffee?\"\n- Reported: He asked if/whether I liked coffee.\n\n**Специальные вопросы (wh-questions):**\n- Direct: \"Where do you live?\"\n- Reported: He asked where I lived.\n\n**Важно:** порядок слов — прямой (подлежащее + сказуемое)!\n\n---\n\n**Команды и просьбы:**\n- Direct: \"Open the door.\"\n- Reported: He told me to open the door.\n- Direct: \"Don't go there.\"\n- Reported: He told me not to go there.",
        ["\"I am happy.\" → He said he was happy.", "\"Where do you live?\" → He asked where I lived.", "\"Don't do it!\" → He told me not to do it."],
        ["Время «сдвигается назад» в косвенной речи", "if/whether для общих вопросов", "to + V для команд в косвенной речи"])
      ]
    },
    {
      topic: "Лексика",
      lessons: [
        L("Урок 5: Phrasal Verbs", "Фразовые глаголы.", [
          "Глаголы с up, down, on, off",
          "Глаголы с out, away, back",
          "Значение фразовых глаголов",
          "Употребление в речи"
        ], "/school-curriculum-app/images/lessons/english/vocabulary.png",
        "**Phrasal Verbs** — фразовые глаголы (глагол + предлог/наречие).\n\n**Глаголы с UP:**\n\n- **give up** — бросить, отказаться\n  - I gave up smoking. (Я бросил курить)\n\n- **take up** — начать заниматься чем-то\n  - He took up tennis. (Он начал заниматься теннисом)\n\n- **wake up** — просыпаться\n  - I wake up at 7 a.m.\n\n- **grow up** — вырастать\n  - She grew up in London.\n\n- **look up** — искать (в словаре)\n  - Look up this word in the dictionary.\n\n---\n\n**Глаголы с DOWN:**\n\n- **break down** — сломаться\n  - My car broke down.\n\n- **turn down** — отклонить, отказать\n  - They turned down my offer.\n\n- **write down** — записать\n  - Write down my phone number.\n\n- **calm down** — успокоиться\n  - Calm down, everything will be fine.\n\n---\n\n**Глаголы с ON/OFF:**\n\n- **turn on/off** — включить/выключить\n  - Turn on the light. / Turn off the TV.\n\n- **put on/off** — надеть/отложить\n  - Put on your coat. / The meeting was put off.\n\n- **get on/off** — сесть/выйти (на транспорт)\n  - Get on the bus. / Get off at the next stop.\n\n---\n\n**Глаголы с OUT:**\n\n- **find out** — узнать, выяснить\n  - I found out the truth.\n\n- **run out of** — закончиться (о запасах)\n  - We ran out of milk.\n\n- **work out** — разработать, понять; тренироваться\n  - We need to work out a plan. / He works out at the gym.\n\n---\n\n**Важно:** многие фразовые глаголы имеют несколько значений!",
        ["give up — бросить; take up — начать", "turn on/off — включить/выключить", "find out — узнать; run out of — закончиться"],
        ["Фразовые глаголы очень распространены в английском", "Они делают речь более естественной", "Один глагол может иметь разные значения с разными предлогами"]),
        L("Урок 6: Idioms", "Английские идиомы.", [
          "Идиомы с частями тела",
          "Идиомы с животными",
          "Идиомы с цветами",
          "Использование в речи"
        ], "/school-curriculum-app/images/lessons/english/vocabulary.png",
        "**Idioms** — устойчивые выражения, значение которых не выводится из значений слов.\n\n**Идиомы с частями тела:**\n\n- **break a leg** — ни пуха ни пера!\n  - Break a leg at the audition!\n\n- **cost an arm and a leg** — стоить очень дорого\n  - This car costs an arm and a leg.\n\n- **keep an eye on** — присматривать за\n  - Can you keep an eye on my bag?\n\n- **lend a hand** — помочь\n  - Could you lend me a hand with this?\n\n- **pull someone's leg** — разыграть, подшутить\n  - Are you pulling my leg?\n\n- **see eye to eye** — соглашаться\n  - We don't see eye to eye on this.\n\n---\n\n**Идиомы с животными:**\n\n- **let the cat out of the bag** — выдать секрет\n  - Don't let the cat out of the bag!\n\n- **it's raining cats and dogs** — льёт как из ведра\n  - Take an umbrella, it's raining cats and dogs.\n\n- **when pigs fly** — когда рак на горе свистнет\n  - He'll finish his work when pigs fly.\n\n- **kill two birds with one stone** — убить двух зайцев\n  - I killed two birds with one stone.\n\n- **a bull in a china shop** — слон в посудной лавке\n  - He's like a bull in a china shop.\n\n---\n\n**Идиомы с цветами:**\n\n- **once in a blue moon** — очень редко\n  - We meet once in a blue moon.\n\n- **green with envy** — позеленеть от зависти\n  - She was green with envy.\n\n- **red tape** — бюрократия\n  - We need to cut through the red tape.\n\n- **black sheep** — паршивая овца\n  - He's the black sheep of the family.\n\n---\n\n**Идиомы о времени:**\n\n- **time flies** — время летит\n  - Time flies when you're having fun.\n\n- **better late than never** — лучше поздно, чем никогда",
        ["break a leg — ни пуха ни пера!", "let the cat out of the bag — выдать секрет", "once in a blue moon — очень редко"],
        ["Идиомы делают речь живой и естественной", "Их нельзя переводить дословно", "Английский богат идиомами"]),
        L("Урок 7: Word Formation", "Словообразование.", [
          "Префиксы",
          "Суффиксы существительных",
          "Суффиксы прилагательных",
          "Суффиксы глаголов"
        ], "/school-curriculum-app/images/lessons/english/vocabulary.png",
        "**Word Formation** — способы образования слов в английском языке.\n\n**Префиксы:**\n\n| Префикс | Значение | Пример |\n|---------|----------|--------|\n| un- | не- | unhappy, unusual |\n| dis- | не-, рас- | disagree, disappear |\n| re- | пере- | rewrite, return |\n| pre- | пред- | prehistoric, pre-war |\n| mis- | не-, оши- | misunderstand, mislead |\n| over- | чрезмерно | overwork, oversleep |\n| under- | недостаточно | underpaid, underestimate |\n\n---\n\n**Суффиксы существительных:**\n\n| Суффикс | Значение | Пример |\n|---------|----------|--------|\n| -er/-or | деятель | teacher, actor |\n| -tion/-sion | действие | education, decision |\n| -ment | результат | development, agreement |\n| -ness | качество | happiness, kindness |\n| -ity | свойство | ability, reality |\n| -ance/-ence | состояние | importance, difference |\n| -dom | состояние | freedom, kingdom |\n| -ship | состояние, качество | friendship, leadership |\n\n---\n\n**Суффиксы прилагательных:**\n\n| Суффикс | Значение | Пример |\n|---------|----------|--------|\n| -ful | с качеством | beautiful, useful |\n| -less | без качества | useless, hopeless |\n| -ous | обладающий | famous, dangerous |\n| -able/-ible | способный | comfortable, possible |\n| -ive | свойство | active, creative |\n| -al | свойство | natural, musical |\n| -y | характеристика | sunny, windy, noisy |\n\n---\n\n**Суффиксы глаголов:**\n\n| Суффикс | Значение | Пример |\n|---------|----------|--------|\n| -ize/-ise | делать | organize, realise |\n| -ify | делать | simplify, classify |\n| -en | делать | widen, strengthen |\n\n---\n\n**Примеры словообразования:**\n- happy (счастливый) → unhappy (несчастный) → happiness (счастье) → happily (счастливо)\n- create (создавать) → creative (творческий) → creator (создатель) → creation (создание)",
        ["un- = не- (unhappy); -ful = с качеством (useful)", "-er = деятель (teacher); -tion = действие (education)", "-less = без качества (useless, hopeless)"],
        ["Знание суффиксов помогает угадывать значение слов", "Суффиксы указывают на часть речи", "Префиксы меняют значение, суффиксы — часть речи"])
      ]
    },
    {
      topic: "Чтение и понимание",
      lessons: [
        L("Урок 8: Reading Strategies", "Стратегии чтения.", [
          "Skimming и scanning",
          "Чтение с пониманием общего содержания",
          "Поиск конкретной информации",
          "Анализ текста"
        ], "/school-curriculum-app/images/lessons/english/reading.png",
        "**Стратегии чтения:**\n\n**1. Skimming (беглое чтение)**\n\n**Цель:** понять общее содержание текста.\n\n**Техника:**\n- Читайте заголовок и подзаголовки\n- Обращайте внимание на первые и последние предложения абзацев\n- Не читайте каждое слово\n- Ищите ключевые слова\n\n**Применение:**\n- Когда нужно быстро понять, о чём текст\n- При выборе статьи для детального чтения\n\n---\n\n**2. Scanning (поисковое чтение)**\n\n**Цель:** найти конкретную информацию.\n\n**Техника:**\n- Не читайте текст полностью\n- Ищите конкретные слова, даты, имена, числа\n- Используйте структуру текста\n\n**Применение:**\n- Поиск нужной информации в расписании\n- Поиск конкретного факта в статье\n\n---\n\n**3. Intensive Reading (интенсивное чтение)**\n\n**Цель:** полное понимание текста.\n\n**Техника:**\n- Внимательное чтение каждого предложения\n- Анализ незнакомых слов\n- Понимание грамматических структур\n- Работа с контекстом\n\n---\n\n**4. Extensive Reading (экстенсивное чтение)**\n\n**Цель:** чтение для удовольствия и улучшения языка.\n\n**Техника:**\n- Чтение длинных текстов\n- Фокус на понимании общего смысла\n- Не останавливаться на каждом слове\n\n---\n\n**Советы для улучшения чтения:**\n\n1. **Угадывайте значение слов по контексту**\n2. **Не переводите каждое слово**\n3. **Обращайте внимание на связки слов** (however, therefore, moreover)\n4. **Читайте регулярно**\n5. **Выбирайте тексты по уровню**",
        ["Skimming — общее понимание текста", "Scanning — поиск конкретной информации", "Не переводите каждое слово!"],
        ["Чтение — лучший способ расширить словарный запас", "Начинайте с адаптированных текстов", "Читайте то, что вам интересно"]),
        L("Урок 9: Text Analysis", "Анализ текста.", [
          "Структура текста",
          "Связность и логика",
          "Тон и стиль автора",
          "Главная идея текста"
        ], "/school-curriculum-app/images/lessons/english/reading.png",
        "**Анализ текста:**\n\n**Структура текста:**\n\n1. **Введение (Introduction)**\n- Представление темы\n- Основной тезис (thesis statement)\n\n2. **Основная часть (Body)**\n- Развитие идеи\n- Аргументы и примеры\n- Связующие элементы\n\n3. **Заключение (Conclusion)**\n- Подведение итогов\n- Выводы\n\n---\n\n**Связующие слова (Linking Words):**\n\n**Добавление информации:**\n- moreover, furthermore, in addition, besides\n\n**Противопоставление:**\n- however, nevertheless, on the other hand, although\n\n**Причина и следствие:**\n- therefore, consequently, as a result, because of\n\n**Примеры:**\n- for example, for instance, such as\n\n**Заключение:**\n- in conclusion, to sum up, in summary\n\n---\n\n**Тон и стиль:**\n\n**Тон (Tone):** отношение автора к предмету.\n- formal (формальный)\n- informal (неформальный)\n- neutral (нейтральный)\n- ironic (ироничный)\n- critical (критический)\n\n**Стиль (Style):**\n- научный (academic)\n- публицистический (journalistic)\n- художественный (literary)\n- разговорный (conversational)\n\n---\n\n**Вопросы для анализа:**\n\n1. Какова главная идея текста?\n2. Какова цель автора?\n3. Кто целевая аудитория?\n4. Какой тон использует автор?\n5. Какие аргументы приводит автор?\n6. Согласны ли вы с автором?",
        ["Moreover, however, therefore — связующие слова", "Introduction — Body — Conclusion — структура текста", "Тон может быть формальным, неформальным, ироничным"],
        ["Связующие слова делают текст логичным", "Анализ текста развивает критическое мышление", "Структура текста помогает понять содержание"])
      ]
    },
    {
      topic: "Говорение",
      lessons: [
        L("Урок 10: Discussion Skills", "Навыки дискуссии.", [
          "Выражение мнения",
          "Согласие и несогласие",
          "Аргументация",
          "Вежливое прерывание"
        ], "/school-curriculum-app/images/lessons/english/speaking.png",
        "**Discussion Skills** — навыки участия в дискуссии.\n\n**Выражение мнения:**\n\n- **In my opinion, ...** — По моему мнению...\n- **From my point of view, ...** — С моей точки зрения...\n- **I believe/think that ...** — Я считаю, что...\n- **As far as I'm concerned, ...** — Что касается меня...\n- **It seems to me that ...** — Мне кажется, что...\n\n---\n\n**Согласие:**\n\n- **I agree with you.** — Я согласен с вами.\n- **I couldn't agree more.** — Не могу не согласиться.\n- **Exactly! / Absolutely!** — Точно! / Абсолютно!\n- **That's a good point.** — Это хороший аргумент.\n- **You're right.** — Вы правы.\n\n---\n\n**Несогласие (вежливое):**\n\n- **I see your point, but ...** — Я понимаю вашу точку зрения, но...\n- **I'm afraid I disagree.** — Боюсь, я не согласен.\n- **I don't think so.** — Я так не думаю.\n- **That's not how I see it.** — Я это вижу иначе.\n- **I have a different opinion.** — У меня другое мнение.\n\n---\n\n**Аргументация:**\n\n- **Firstly, ... Secondly, ...** — Во-первых... Во-вторых...\n- **For example, ...** — Например...\n- **According to ...** — Согласно...\n- **Research shows that ...** — Исследования показывают, что...\n- **This is because ...** — Это потому, что...\n\n---\n\n**Вежливое прерывание:**\n\n- **Excuse me, but ...** — Извините, но...\n- **Sorry to interrupt, but ...** — Извините, что перебиваю, но...\n- **Can I just say ...?** — Можно я скажу...?\n- **If I may ...** — Если позволите...\n\n---\n\n**Подведение итогов:**\n\n- **To sum up, ...** — Подводя итог...\n- **In conclusion, ...** — В заключение...\n- **All in all, ...** — В целом...\n- **Taking everything into account, ...** — Принимая всё во внимание...",
        ["In my opinion... — По моему мнению", "I agree with you. / I'm afraid I disagree.", "Firstly... Secondly... For example..."],
        ["В английской культуре важно быть вежливым при несогласии", "Фразы-клише помогают структурировать речь", "Практика дискуссий улучшает навык говорения"])
      ]
    }
  ]
}

export const games: GameLesson[] = [
  {
    title: "Perfect Tenses",
    subject: "Английский язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Present Perfect образуется с:", options: ["have/has + V3", "had + V3", "will have + V3"], correctAnswer: "have/has + V3", hint: "I have finished. She has finished." },
      { type: 'quiz', question: "Past Perfect используется для:", options: ["Действия в будущем", "Действия до другого действия в прошлом", "Действия сейчас"], correctAnswer: "Действия до другого действия в прошлом", hint: "He had left when I came." },
      { type: 'fill', question: "By 2025, I __ graduated. (Future Perfect)", correctAnswer: "will have", hint: "will have + V3" },
      { type: 'quiz', question: "Какой маркер типичен для Present Perfect?", options: ["yesterday", "already", "tomorrow"], correctAnswer: "already", hint: "I have already done it." }
    ],
    reward: { stars: 3, message: "Great! You know Perfect tenses! 🎯" }
  },
  {
    title: "Passive Voice",
    subject: "Английский язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Passive Voice образуется:", options: ["be + V3", "have + V3", "will + V"], correctAnswer: "be + V3", hint: "The book is written." },
      { type: 'quiz', question: "The house ____ in 1990. (Past Simple Passive)", options: ["built", "was built", "is built"], correctAnswer: "was built", hint: "Past Simple: was/were + V3" },
      { type: 'fill', question: "English ____ spoken here. (Present Simple Passive)", correctAnswer: "is", hint: "is spoken" },
      { type: 'quiz', question: "Passive используется, когда:", options: ["Важен субъект", "Важен объект или субъект неизвестен", "Всегда"], correctAnswer: "Важен объект или субъект неизвестен", hint: "The window was broken. (Кем? — неизвестно)" }
    ],
    reward: { stars: 3, message: "Excellent! You know Passive Voice! 📚" }
  },
  {
    title: "Conditionals",
    subject: "Английский язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "If I __ rich, I would travel. (Second Conditional)", options: ["am", "was", "were"], correctAnswer: "were", hint: "Во II Conditional: If I were..." },
      { type: 'quiz', question: "First Conditional описывает:", options: ["Факты", "Реальное будущее условие", "Нереальное прошлое"], correctAnswer: "Реальное будущее условие", hint: "If it rains, I will stay home." },
      { type: 'fill', question: "If you heat ice, it __. (Zero Conditional)", correctAnswer: "melts", hint: "Факт: Present Simple" },
      { type: 'quiz', question: "Third Conditional описывает:", options: ["Реальное будущее", "Нереальное настоящее", "Нереальное прошлое"], correctAnswer: "Нереальное прошлое", hint: "If I had known, I would have come." }
    ],
    reward: { stars: 3, message: "Super! You know Conditionals! 🎓" }
  },
  {
    title: "Phrasal Verbs",
    subject: "Английский язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "give up означает:", options: ["начать", "бросить", "искать"], correctAnswer: "бросить", hint: "I gave up smoking." },
      { type: 'quiz', question: "turn on — это:", options: ["выключить", "включить", "отложить"], correctAnswer: "включить", hint: "Turn on the light." },
      { type: 'fill', question: "find __ — узнать, выяснить", correctAnswer: "out", hint: "I found out the truth." },
      { type: 'quiz', question: "run out of означает:", options: ["выбежать", "закончиться (о запасах)", "бежать из"], correctAnswer: "закончиться (о запасах)", hint: "We ran out of milk." }
    ],
    reward: { stars: 3, message: "Great! You know Phrasal Verbs! 📖" }
  }
]
