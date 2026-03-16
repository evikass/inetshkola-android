// Экспорт игр для 1 класса
import { GameLesson } from '../types'

export const firstGradeGames: GameLesson[] = [
  // ========== РУССКИЙ ЯЗЫК ==========
  {
    title: "Алфавит: первые буквы",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Какая буква первая в алфавите?", options: ["А", "Б", "В"], correctAnswer: "А", hint: "Алфавит начинается с А" },
      { type: 'quiz', question: "Какая буква следует за А?", options: ["В", "Б", "Г"], correctAnswer: "Б", hint: "А, Б, ..." },
      { type: 'find', question: "Выбери гласные буквы:", options: ["А", "Б", "О", "М", "У"], correctAnswer: ["А", "О", "У"], hint: "Гласные - их можно петь" },
      { type: 'quiz', question: "Сколько букв в русском алфавите?", options: ["30", "33", "35"], correctAnswer: "33", hint: "В русском алфавите 33 буквы" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь алфавит! 🔤" }
  },
  {
    title: "Буква А",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Какой звук обозначает буква А?", options: ["Гласный 🔴", "Согласный 🔵"], correctAnswer: "Гласный 🔴", hint: "Этот звук поётся свободно!" },
      { type: 'find', question: "Выбери слова с буквой А:", options: ["МАМА 👩", "ПАПА 👨", "СЫН 👦", "ДОМ 🏠", "АНЯ 👧"], correctAnswer: ["МАМА 👩", "ПАПА 👨", "АНЯ 👧"], hint: "Ищи букву А в словах" },
      { type: 'quiz', question: "С какой буквы начинается слово АРБУЗ?", options: ["О", "А", "У"], correctAnswer: "А", hint: "Произнеси слово: [А]рбуз" },
      { type: 'quiz', question: "Сколько звуков [а] в слове БАНАН?", options: ["1", "2", "3"], correctAnswer: "2", hint: "БА-НАН - послушай внимательно!" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь букву А! 🌟" }
  },
  {
    title: "ЖИ-ШИ пиши с И",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Как правильно: МАШ__НА?", options: ["МАШЫНА", "МАШИНА"], correctAnswer: "МАШИНА", hint: "ЖИ-ШИ пиши с И!" },
      { type: 'quiz', question: "Как правильно написать?", options: ["ШЫНА 🛞", "ШИНА 🛞"], correctAnswer: "ШИНА 🛞", hint: "ШИ всегда пишется с буквой И" },
      { type: 'find', question: "Выбери слова с ЖИ и ШИ:", options: ["ЖИРАФ 🦒", "ШИЛО", "МАМА 👩", "МАШИНА 🚗", "ЖИЗНЬ ✨"], correctAnswer: ["ЖИРАФ 🦒", "ШИЛО", "МАШИНА 🚗", "ЖИЗНЬ ✨"], hint: "Ищи сочетания ЖИ и ШИ" },
      { type: 'fill', question: "Вставь букву: ЛЫЖ__", correctAnswer: "И", hint: "ЖИ - пиши с И!" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь правило! 🏆" }
  },
  {
    title: "Ча-ща пиши с А",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Как правильно: ТУЧ__?", options: ["ТУЧА ☁️", "ТУЧЯ ☁️"], correctAnswer: "ТУЧА ☁️", hint: "ЧА-ЩА пиши с А!" },
      { type: 'find', question: "Выбери слова с ЧА и ЩА:", options: ["ЧАЩА 🌲", "ЧАША 🏆", "МАМА 👩", "ЩУКА 🐟", "ДАЧА 🏡"], correctAnswer: ["ЧАЩА 🌲", "ЧАША 🏆", "ДАЧА 🏡"], hint: "Ищи ЧА и ЩА" },
      { type: 'quiz', question: "В слове РОЩА какая орфограмма?", options: ["ЖИ-ШИ", "ЧА-ЩА"], correctAnswer: "ЧА-ЩА", hint: "РОЩА - это ЩА" },
      { type: 'fill', question: "Вставь букву: ЗАДАЧ__", correctAnswer: "А", hint: "ЧА - пиши с А!" }
    ],
    reward: { stars: 3, message: "Замечательно! Ты знаешь правило ЧА-ЩА! 📝" }
  },
  {
    title: "Большая буква",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "С какой буквы начинаются имена?", options: ["С маленькой", "С большой"], correctAnswer: "С большой", hint: "Имена пишутся с большой буквы!" },
      { type: 'find', question: "Выбери правильно написанные имена:", options: ["маша", "Маша", "ПЕТЯ", "Петя", "аня"], correctAnswer: ["Маша", "Петя"], hint: "Имена начинаются с большой буквы" },
      { type: 'quiz', question: "Как написать название города?", options: ["москва", "Москва", "МОСКВА"], correctAnswer: "Москва", hint: "Названия городов - с большой буквы" },
      { type: 'quiz', question: "Что пишется с большой буквы?", options: ["Стол", "Москва", "Бежит"], correctAnswer: "Москва", hint: "Название города!" }
    ],
    reward: { stars: 3, message: "Умница! Ты знаешь про большую букву! 📖" }
  },

  // ========== МАТЕМАТИКА ==========
  {
    title: "Числа 1-5",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько звёзд? ⭐⭐⭐", options: ["2", "3", "4"], correctAnswer: "3", hint: "Посчитай: раз, два, три!" },
      { type: 'quiz', question: "Сколько яблок? 🍎🍎🍎🍎🍎", options: ["4", "5", "6"], correctAnswer: "5", hint: "Посчитай все яблоки!" },
      { type: 'order', question: "Расставь по порядку: 3, 1, 5, 2", correctAnswer: "1, 2, 3, 5", hint: "От меньшего к большему" },
      { type: 'quiz', question: "Какое число больше: 2 или 4?", options: ["2", "4", "Одинаково"], correctAnswer: "4", hint: "4 идёт позже при счёте" }
    ],
    reward: { stars: 3, message: "Умница! Ты знаешь числа! 🔢" }
  },
  {
    title: "Сложение до 10",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "2 + 3 = ?", options: ["4", "5", "6"], correctAnswer: "5", hint: "Два плюс три..." },
      { type: 'quiz', question: "4 + 2 = ?", options: ["5", "6", "7"], correctAnswer: "6", hint: "Четыре и два вместе" },
      { type: 'fill', question: "3 + __ = 7", correctAnswer: "4", hint: "Сколько добавить до семи?" },
      { type: 'quiz', question: "5 + 5 = ?", options: ["9", "10", "11"], correctAnswer: "10", hint: "Это все пальцы на руках!" }
    ],
    reward: { stars: 3, message: "Супер! Ты умеешь складывать! ➕" }
  },
  {
    title: "Вычитание",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "5 - 2 = ?", options: ["2", "3", "4"], correctAnswer: "3", hint: "Пять минус два..." },
      { type: 'quiz', question: "7 - 3 = ?", options: ["3", "4", "5"], correctAnswer: "4", hint: "Семь убери три" },
      { type: 'fill', question: "10 - __ = 6", correctAnswer: "4", hint: "Что отнять от 10, чтобы получить 6?" },
      { type: 'quiz', question: "8 - 0 = ?", options: ["0", "8", "7"], correctAnswer: "8", hint: "Если ничего не отнять..." }
    ],
    reward: { stars: 3, message: "Отлично! Ты умеешь вычитать! ➖" }
  },
  {
    title: "Геометрические фигуры",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Сколько углов у треугольника?", options: ["2", "3", "4"], correctAnswer: "3", hint: "Треугольник = три угла" },
      { type: 'quiz', question: "Какая фигура круглой формы?", options: ["Квадрат ⬜", "Круг ⭕", "Треугольник 🔺"], correctAnswer: "Круг ⭕", hint: "Круглая как мяч!" },
      { type: 'find', question: "Выбери фигуры с 4 углами:", options: ["Квадрат ⬜", "Треугольник 🔺", "Прямоугольник ▭", "Круг ⭕"], correctAnswer: ["Квадрат ⬜", "Прямоугольник ▭"], hint: "4 угла = четырёхугольник" },
      { type: 'quiz', question: "Что похоже на квадрат?", options: ["Мяч ⚽", "Окно 🪟", "Колесо 🛞"], correctAnswer: "Окно 🪟", hint: "У окна 4 равные стороны" }
    ],
    reward: { stars: 3, message: "Здорово! Ты знаешь фигуры! 🔷" }
  },

  // ========== ЛИТЕРАТУРНОЕ ЧТЕНИЕ ==========
  {
    title: "Сказки",
    subject: "Литература",
    icon: "BookOpenText",
    color: "text-amber-400",
    tasks: [
      { type: 'quiz', question: "Кто съел Колобка?", options: ["Волк 🐺", "Лиса 🦊", "Медведь 🐻"], correctAnswer: "Лиса 🦊", hint: "Хитрая рыжая плутовка" },
      { type: 'quiz', question: "Из чего сделан Буратино?", options: ["Из железа", "Из дерева", "Из пластилина"], correctAnswer: "Из дерева", hint: "Папа Карло вырезал его" },
      { type: 'find', question: "Кто помогал Красной Шапочке?", options: ["Волк 🐺", "Охотники 🔫", "Бабушка 👵", "Дровосеки 🪓"], correctAnswer: ["Охотники 🔫", "Дровосеки 🪓"], hint: "Они спасли бабушку" },
      { type: 'quiz', question: "Кто тянул репку первым?", options: ["Бабка", "Дедка", "Внучка"], correctAnswer: "Дедка", hint: "Посадил дед репку..." }
    ],
    reward: { stars: 3, message: "Прекрасно! Ты знаешь сказки! 📚" }
  },

  // ========== ОКРУЖАЮЩИЙ МИР ==========
  {
    title: "Времена года",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какое время года после зимы?", options: ["Лето ☀️", "Весна 🌸", "Осень 🍂"], correctAnswer: "Весна 🌸", hint: "Когда тает снег?" },
      { type: 'find', question: "Что бывает осенью?", options: ["Листопад 🍂", "Снег ❄️", "Дожди 🌧️", "Цветы 🌷"], correctAnswer: ["Листопад 🍂", "Дожди 🌧️"], hint: "Осенью прохладно" },
      { type: 'quiz', question: "Когда можно купаться в речке?", options: ["Зимой ❄️", "Летом ☀️", "Осенью 🍂"], correctAnswer: "Летом ☀️", hint: "Когда тепло и солнечно" },
      { type: 'quiz', question: "Сколько времён года?", options: ["3", "4", "5"], correctAnswer: "4", hint: "Зима, весна, лето, осень" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь времена года! 🌸" }
  },
  {
    title: "Животные",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какое животное говорит «Му»?", options: ["Кошка 🐱", "Корова 🐄", "Собака 🐕"], correctAnswer: "Корова 🐄", hint: "Большое животное на ферме" },
      { type: 'find', question: "Выбери домашних животных:", options: ["Кошка 🐱", "Лиса 🦊", "Собака 🐕", "Волк 🐺", "Корова 🐄"], correctAnswer: ["Кошка 🐱", "Собака 🐕", "Корова 🐄"], hint: "Они живут с людьми" },
      { type: 'quiz', question: "Кто умеет летать?", options: ["Рыба 🐟", "Птица 🐦", "Змея 🐍"], correctAnswer: "Птица 🐦", hint: "У кого есть крылья?" },
      { type: 'quiz', question: "Где живёт белка?", options: ["В норе 🕳️", "В дупле 🌳", "В воде 🌊"], correctAnswer: "В дупле 🌳", hint: "Белка живёт на дереве" }
    ],
    reward: { stars: 3, message: "Молодец! Ты знаешь животных! 🐾" }
  },

  // ========== АНГЛИЙСКИЙ ==========
  {
    title: "Hello! Привет!",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Как сказать «Привет» по-английски?", options: ["Goodbye 👋", "Hello 👋", "Thanks 🙏"], correctAnswer: "Hello 👋", hint: "Самое популярное приветствие" },
      { type: 'quiz', question: "Что значит Hi?", options: ["Пока", "Привет", "Спасибо"], correctAnswer: "Привет", hint: "Hi = Привет" },
      { type: 'find', question: "Выбери приветствия:", options: ["Hello", "Hi", "Goodbye", "Bye", "Thanks"], correctAnswer: ["Hello", "Hi"], hint: "Приветствия по-английски" },
      { type: 'quiz', question: "Как сказать «Пока»?", options: ["Hello", "Bye", "Hi"], correctAnswer: "Bye", hint: "Bye = Пока" }
    ],
    reward: { stars: 3, message: "Great! Отлично! 👋" }
  },
  {
    title: "Цвета по-английски",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Red - это...", options: ["Синий", "Красный", "Зелёный"], correctAnswer: "Красный", hint: "Red = красный цвет" },
      { type: 'quiz', question: "Как будет «жёлтый»?", options: ["Yellow", "Green", "Blue"], correctAnswer: "Yellow", hint: "Yellow = цвет солнца" },
      { type: 'find', question: "Выбери цвета радуги:", options: ["Red", "Cat", "Blue", "Dog", "Green"], correctAnswer: ["Red", "Blue", "Green"], hint: "Цвета = Colors" },
      { type: 'quiz', question: "Какого цвета трава?", options: ["Red", "Blue", "Green"], correctAnswer: "Green", hint: "Green = зелёный" }
    ],
    reward: { stars: 3, message: "Wonderful! Замечательно! 🎨" }
  },
  
  // ========== НОВЫЕ ИГРЫ ==========
  {
    title: "Счёт до 20",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Какое число идёт после 15?", options: ["14", "16", "17"], correctAnswer: "16", hint: "Посчитай: 14, 15, ..." },
      { type: 'fill', question: "Какое число между 12 и 14?", correctAnswer: "13", hint: "12, ?, 14" },
      { type: 'quiz', question: "Сколько десятков в числе 17?", options: ["1", "7", "17"], correctAnswer: "1", hint: "17 = 1 десяток и 7 единиц" },
      { type: 'quiz', question: "Какое число больше: 19 или 15?", options: ["19", "15", "Одинаково"], correctAnswer: "19", hint: "19 идёт позже при счёте" }
    ],
    reward: { stars: 3, message: "Умница! Ты считаешь до 20! 🔢" }
  },
  {
    title: "Состав числа",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'fill', question: "5 - это 2 + __", correctAnswer: "3", hint: "2 + 3 = 5" },
      { type: 'fill', question: "7 - это 4 + __", correctAnswer: "3", hint: "4 + 3 = 7" },
      { type: 'quiz', question: "Из каких чисел состоит 6?", options: ["3 и 3", "2 и 2", "5 и 2"], correctAnswer: "3 и 3", hint: "3 + 3 = 6" },
      { type: 'fill', question: "10 - это 6 + __", correctAnswer: "4", hint: "6 + 4 = 10" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь состав чисел! 🧮" }
  },
  {
    title: "Чу-щу пиши с У",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Как правильно: Щ__КА?", options: ["ЩУКА 🐟", "ЩАКА"], correctAnswer: "ЩУКА 🐟", hint: "ЧУ-ЩУ пиши с У!" },
      { type: 'find', question: "Выбери слова с ЧУ и ЩУ:", options: ["ЧУДО ✨", "ЩУКА 🐟", "МАМА 👩", "ЧУГУН", "РОЩА 🌳"], correctAnswer: ["ЧУДО ✨", "ЩУКА 🐟", "ЧУГУН"], hint: "ЧУ-ЩУ с буквой У" },
      { type: 'fill', question: "Вставь букву: Ч__ДО", correctAnswer: "У", hint: "ЧУ - пиши с У!" },
      { type: 'quiz', question: "В слове ЧУМАКА какая орфограмма?", options: ["ЖИ-ШИ", "ЧУ-ЩУ"], correctAnswer: "ЧУ-ЩУ", hint: "ЧУ - пишется с У" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь правило ЧУ-ЩУ! ✍️" }
  },
  {
    title: "Слова-действия",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Что делает птица? 🐦", options: ["Летит", "Плавает", "Бегает"], correctAnswer: "Летит", hint: "Птицы летают!" },
      { type: 'find', question: "Выбери слова-действия:", options: ["Бежит 🏃", "Красивый", "Пишет ✍️", "Стол", "Читает 📖"], correctAnswer: ["Бежит 🏃", "Пишет ✍️", "Читает 📖"], hint: "Слова-действия отвечают на «что делает?»" },
      { type: 'quiz', question: "На какой вопрос отвечает слово «рисует»?", options: ["Что?", "Что делает?", "Какой?"], correctAnswer: "Что делает?", hint: "Рисует - это действие" },
      { type: 'quiz', question: "Что делает рыба? 🐟", options: ["Летит", "Плавает", "Бегает"], correctAnswer: "Плавает", hint: "Рыбы плавают в воде" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь слова-действия! 📝" }
  },
  {
    title: "Дни недели и месяцы",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Какой день идёт после среды?", options: ["Вторник", "Четверг", "Пятница"], correctAnswer: "Четверг", hint: "Понедельник, вторник, среда, ..." },
      { type: 'find', question: "Выбери зимние месяцы:", options: ["Декабрь", "Июнь", "Январь", "Июль", "Февраль"], correctAnswer: ["Декабрь", "Январь", "Февраль"], hint: "Зимние месяцы - холодные" },
      { type: 'quiz', question: "Сколько месяцев в году?", options: ["10", "11", "12"], correctAnswer: "12", hint: "В году 12 месяцев" },
      { type: 'quiz', question: "В каком месяце начинается учебный год?", options: ["Август", "Сентябрь", "Октябрь"], correctAnswer: "Сентябрь", hint: "1 сентября - День знаний" }
    ],
    reward: { stars: 3, message: "Умница! Ты знаешь календарь! 📅" }
  },
  {
    title: "Животные и их детёныши",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Кто детёныш у кошки?", options: ["Щенок", "Котёнок", "Медвежонок"], correctAnswer: "Котёнок", hint: "Кошка - котёнок" },
      { type: 'find', question: "Выбери правильные пары:", options: ["Собака - щенок", "Корова - телёнок", "Кошка - щенок", "Лошадь - жеребёнок"], correctAnswer: ["Собака - щенок", "Корова - телёнок", "Лошадь - жеребёнок"], hint: "У каждого животного свой детёныш" },
      { type: 'quiz', question: "Кто детёныш у курицы?", options: ["Утёнок", "Цыплёнок", "Гусёнок"], correctAnswer: "Цыплёнок", hint: "Курица - цыплёнок" },
      { type: 'quiz', question: "Кто детёныш у медведя?", options: ["Медвежонок", "Зайчонок", "Лисёнок"], correctAnswer: "Медвежонок", hint: "Медведь - медвежонок" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь детёнышей! 🐾" }
  },
  {
    title: "Числа на английском",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "One - это...", options: ["Один", "Два", "Три"], correctAnswer: "Один", hint: "One = 1" },
      { type: 'quiz', question: "Как будет «три»?", options: ["Two", "Three", "Four"], correctAnswer: "Three", hint: "Three = 3" },
      { type: 'fill', question: "Two + Two = __ (Four)", correctAnswer: "Four", hint: "2 + 2 = 4" },
      { type: 'find', question: "Выбери числа от 1 до 3:", options: ["One", "Four", "Two", "Five", "Three"], correctAnswer: ["One", "Two", "Three"], hint: "1, 2, 3" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь числа! 🔢" }
  },

  // ========== НОВЫЕ ИГРЫ v3.41 ==========
  {
    title: "Сравнение чисел",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Что больше: 7 или 5?", options: ["7", "5", "Одинаково"], correctAnswer: "7", hint: "7 идёт позже при счёте" },
      { type: 'quiz', question: "Что меньше: 3 или 6?", options: ["3", "6", "Одинаково"], correctAnswer: "3", hint: "3 идёт раньше при счёте" },
      { type: 'fill', question: "Поставь знак: 4 __ 4 (равно)", correctAnswer: "=", hint: "Числа одинаковые" },
      { type: 'quiz', question: "Сколько яблок больше? 🍎🍎🍎 vs 🍎🍎", options: ["Первых больше на 1", "Вторых больше", "Одинаково"], correctAnswer: "Первых больше на 1", hint: "3 > 2" }
    ],
    reward: { stars: 3, message: "Отлично! Ты умеешь сравнивать! ⚖️" }
  },
  {
    title: "Задачи в картинках",
    subject: "Математика",
    icon: "Calculator",
    color: "text-blue-400",
    tasks: [
      { type: 'quiz', question: "Было 3 яблока 🍎🍎🍎, съели 1. Сколько осталось?", options: ["1", "2", "4"], correctAnswer: "2", hint: "3 - 1 = 2" },
      { type: 'quiz', question: "Было 2 птички 🐦🐦, прилетели ещё 2. Сколько стало?", options: ["2", "4", "3"], correctAnswer: "4", hint: "2 + 2 = 4" },
      { type: 'fill', question: "5 конфет 🍬🍬🍬🍬🍬, 2 съели. Осталось __", correctAnswer: "3", hint: "5 - 2 = 3" },
      { type: 'quiz', question: "У Маши 2 куклы 🎎🎎, у Даши 3. Сколько всего?", options: ["4", "5", "6"], correctAnswer: "5", hint: "2 + 3 = 5" }
    ],
    reward: { stars: 3, message: "Умница! Ты решаешь задачи! 📊" }
  },
  {
    title: "Слоги",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Сколько слогов в слове МА-МА?", options: ["1", "2", "3"], correctAnswer: "2", hint: "Хлопни два раза: МА-МА" },
      { type: 'quiz', question: "Сколько слогов в слове ШАР?", options: ["1", "2", "3"], correctAnswer: "1", hint: "Хлопни один раз" },
      { type: 'find', question: "Выбери слова из 2 слогов:", options: ["Дом 🏠", "Вода 💧", "Кот 🐱", "Рука ✋", "Сад 🌳"], correctAnswer: ["Вода 💧", "Рука ✋"], hint: "Посчитай хлопки" },
      { type: 'quiz', question: "Какое слово самое длинное?", options: ["Кот", "Машина", "Дом"], correctAnswer: "Машина", hint: "Посчитай слоги" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь слоги! 📝" }
  },
  {
    title: "Слова-признаки",
    subject: "Русский язык",
    icon: "BookOpen",
    color: "text-red-400",
    tasks: [
      { type: 'quiz', question: "Какой мяч? ⚽", options: ["Круглый", "Бежит", "Мяч"], correctAnswer: "Круглый", hint: "Признак предмета" },
      { type: 'find', question: "Выбери слова-признаки:", options: ["Большой", "Стол", "Красный", "Дом", "Быстрый"], correctAnswer: ["Большой", "Красный", "Быстрый"], hint: "Слова-признаки описывают предметы" },
      { type: 'quiz', question: "На какой вопрос отвечает слово «красивый»?", options: ["Что?", "Какой?", "Что делает?"], correctAnswer: "Какой?", hint: "Какой? - это признак" },
      { type: 'quiz', question: "Какое небо? ☁️", options: ["Синее", "Бежит", "Небо"], correctAnswer: "Синее", hint: "Признак неба" }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь слова-признаки! ✍️" }
  },
  {
    title: "Семья",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-green-400",
    tasks: [
      { type: 'quiz', question: "Мама и папа - это...", options: ["Дети", "Родители", "Бабушка"], correctAnswer: "Родители", hint: "Родители - это мама и папа" },
      { type: 'find', question: "Выбери членов семьи:", options: ["Мама 👩", "Учитель", "Папа 👨", "Друг", "Бабушка 👵"], correctAnswer: ["Мама 👩", "Папа 👨", "Бабушка 👵"], hint: "Семья - самые близкие люди" },
      { type: 'quiz', question: "Брат мамы - это...", options: ["Дядя", "Дедушка", "Папа"], correctAnswer: "Дядя", hint: "Брат мамы или папы" },
      { type: 'quiz', question: "Дочь мамы - это...", options: ["Тётя", "Сестра", "Бабушка"], correctAnswer: "Сестра", hint: "Дочь моих родителей" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь семью! 👨‍👩‍👧‍👦" }
  },
  {
    title: "Транспорт",
    subject: "Окружающий мир",
    icon: "Globe",
    color: "text-indigo-400",
    tasks: [
      { type: 'quiz', question: "Что летает в небе?", options: ["Машина 🚗", "Самолёт ✈️", "Корабль 🚢"], correctAnswer: "Самолёт ✈️", hint: "У самолёта есть крылья" },
      { type: 'find', question: "Выбери транспорт:", options: ["Машина 🚗", "Стол 🪑", "Автобус 🚌", "Дерево 🌳", "Велосипед 🚲"], correctAnswer: ["Машина 🚗", "Автобус 🚌", "Велосипед 🚲"], hint: "Транспорт - это то, на чём ездят" },
      { type: 'quiz', question: "Корабль плавает...", options: ["В небе", "На дороге", "По воде 🌊"], correctAnswer: "По воде 🌊", hint: "Корабли плавают по морям и рекам" },
      { type: 'quiz', question: "Сколько колёс у велосипеда?", options: ["2", "3", "4"], correctAnswer: "2", hint: "Велосипед = два колеса" }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь транспорт! 🚗" }
  },
  {
    title: "Семья по-английски",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Mother - это...", options: ["Папа", "Мама", "Сестра"], correctAnswer: "Мама", hint: "Mother = мама" },
      { type: 'quiz', question: "Как будет «папа»?", options: ["Mother", "Father", "Sister"], correctAnswer: "Father", hint: "Father = папа" },
      { type: 'find', question: "Выбери слова о семье:", options: ["Mother 👩", "Cat 🐱", "Father 👨", "Dog 🐕", "Sister 👧"], correctAnswer: ["Mother 👩", "Father 👨", "Sister 👧"], hint: "Family = семья" },
      { type: 'fill', question: "Brother = __ (брат)", correctAnswer: "брат", hint: "Brother - это брат" }
    ],
    reward: { stars: 3, message: "Great! Ты знаешь семью! 👨‍👩‍👧‍👦" }
  },
  {
    title: "Животные по-английски",
    subject: "Английский",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      { type: 'quiz', question: "Cat - это...", options: ["Собака", "Кошка", "Птица"], correctAnswer: "Кошка", hint: "Cat = кошка 🐱" },
      { type: 'quiz', question: "Как будет «собака»?", options: ["Cat", "Dog", "Bird"], correctAnswer: "Dog", hint: "Dog = собака 🐕" },
      { type: 'fill', question: "Fish = __ (рыба)", correctAnswer: "рыба", hint: "Fish плавает в воде" },
      { type: 'find', question: "Выбери названия животных:", options: ["Cat 🐱", "Red", "Dog 🐕", "Big", "Bird 🐦"], correctAnswer: ["Cat 🐱", "Dog 🐕", "Bird 🐦"], hint: "Animals = животные" }
    ],
    reward: { stars: 3, message: "Wonderful! Ты знаешь животных! 🐾" }
  }
]
