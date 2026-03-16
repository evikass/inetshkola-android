# 📱 ИНЕТШКОЛА — Полное руководство по публикации

## 📦 Структура пакета

```
app-store-builds/
├── 📄 PUBLISH-GUIDE.md              # Это руководство
├── 📄 QUICK-START.md                # Быстрый старт
│
├── 🤖 android-twa/                  # Android TWA проект
│   ├── AndroidManifest.xml          # Манифест приложения
│   ├── build.gradle                 # Конфигурация Gradle
│   ├── build.gradle.kts             # Kotlin DSL конфигурация
│   ├── settings.gradle              # Настройки проекта
│   ├── gradle.properties            # Свойства Gradle
│   ├── proguard-rules.pro           # Правила ProGuard
│   ├── twa-manifest.json            # PWA манифест
│   ├── bubblewrap-config.json       # Конфигурация Bubblewrap
│   └── src/main/res/                # Android ресурсы
│       ├── drawable/                # Иконки, splash screen
│       ├── mipmap-*/                # Иконки для разных DPI
│       ├── mipmap-anydpi-v26/       # Adaptive icons
│       └── values/                  # Строки, цвета, стили
│
├── 🟣 vk-mini-app/                  # VK Mini App
│   └── vk-manifest.json
│
├── 🎨 store-assets/                 # Материалы для магазинов
│   ├── icons/                       # Иконки всех размеров
│   │   ├── icon-36.png              # MDPI
│   │   ├── icon-48.png              # HDPI
│   │   ├── icon-72.png              # XHDPI
│   │   ├── icon-96.png              # XXHDPI
│   │   ├── icon-144.png             # XXXHDPI
│   │   ├── icon-192.png             # Play Store
│   │   ├── icon-512.png             # Play Store High-res
│   │   ├── icon-foreground.png      # Adaptive icon foreground
│   │   ├── icon-background.png      # Adaptive icon background
│   │   └── feature-graphic.png      # Google Play (1024x500)
│   │
│   ├── screenshots/                 # Скриншоты
│   │   ├── phone-1-home.png         # Телефон: главный экран
│   │   ├── phone-2-grade.png        # Телефон: выбор класса
│   │   ├── phone-3-content.png      # Телефон: полный контент
│   │   ├── tablet-1-home.png        # Планшет: главный экран
│   │   ├── store-phone-1.png        # Магазин: телефон 1
│   │   ├── store-phone-2.png        # Магазин: телефон 2
│   │   └── feature-graphic.png      # Feature graphic
│   │
│   ├── descriptions/                # Описания
│   │   ├── google-play-ru.txt       # Google Play (русский)
│   │   ├── google-play-en.txt       # Google Play (английский)
│   │   ├── rustore.txt              # RuStore
│   │   └── samsung-galaxy-store.txt # Samsung Galaxy Store
│   │
│   ├── privacy-policy-ru.html       # Политика конфиденциальности
│   └── terms-ru.html                # Условия использования
│
└── 📜 Скрипты
    ├── generate-screenshots.ts      # Генерация скриншотов
    └── create-icons.ts              # Создание иконок
```

---

## 🚀 БЫСТРЫЙ СТАРТ

### Минимальные требования:
- Java JDK 17+
- Node.js 18+
- 2-4 ГБ свободного места

### Пошаговый план:

```
1️⃣ Создайте keystore для подписи
2️⃣ Соберите APK
3️⃣ Загрузите в магазины
```

---

## 🟢 1. Google Play Store

### 📋 Требования

| Параметр | Значение |
|----------|----------|
| Регистрация | $25 (единоразово) |
| APK/AAB размер | До 150 MB |
| Скриншоты | Минимум 2 (телефон) |
| Возраст | 0+ (для всех) |

### 📝 Шаг 1: Регистрация разработчика

1. Перейдите на **https://play.google.com/console/signup**
2. Войдите через Google аккаунт
3. Оплатите регистрационный сбор **$25**
4. Заполните информацию о разработчике:
   - Имя разработчика: `INETSHKOLA` или ваше имя
   - Контактный email
   - Сайт (опционально)

### 🔨 Шаг 2: Сборка APK

#### Вариант А: Bubblewrap (рекомендуется)

```bash
# Установка Bubblewrap
npm install -g @bubblewrap/cli

# Переход в папку проекта
cd app-store-builds/android-twa

# Инициализация (ответьте "n" на вопрос о JDK)
bubblewrap init --manifest="https://evikass.github.io/school-curriculum-app/manifest.json"

# Сборка APK
bubblewrap build

# APK будет в: android-project/app/build/outputs/apk/release/
```

#### Вариант Б: Android Studio

1. Установите **Android Studio** (https://developer.android.com/studio)
2. Установите **Android SDK** (API 34)
3. Откройте проект: `File → Open → android-twa`
4. Сборка: `Build → Generate Signed Bundle/APK`
5. Создайте keystore (сохраните пароль!)

### 🔑 Шаг 3: Создание keystore

```bash
keytool -genkey -v \
  -keystore inetshkola.keystore \
  -alias inetshkola \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass ВАШ_ПАРОЛЬ \
  -keypass ВАШ_ПАРОЛЬ \
  -dname "CN=INETSHKOLA, OU=Education, O=INETSHKOLA, L=Moscow, C=RU"
```

⚠️ **ВАЖНО:** Сохраните keystore и пароль! Без них вы не сможете обновлять приложение!

### 📤 Шаг 4: Загрузка в Google Play Console

1. **Создайте приложение:**
   - `Все приложения → Создать приложение`
   - Название: `ИНЕТШКОЛА`
   - Язык: Русский

2. **Настройка контента:**
   ```
   Главная страница → Настройка магазина:

   Название: ИНЕТШКОЛА
   Краткое описание: Интерактивная школьная программа для классов 0-11
   Полное описание: (скопируйте из google-play-ru.txt)
   ```

3. **Загрузите медиа:**
   - Иконка приложения: `icon-512.png`
   - Feature graphic: `feature-graphic.png` (1024x500)
   - Скриншоты телефона: `store-phone-1.png`, `store-phone-2.png`
   - Скриншоты планшета: `tablet-1-home.png`

4. **Классификация контента:**
   - Заполните опросник (выберите все пункты "Нет" для детских приложений)
   - Рейтинг: **0+** (для всех возрастов)

5. **Целевая аудитория:**
   - Выберите "Дети"
   - Укажите возрастные группы: 0-5, 6-8, 9-12, 13-16

6. **Privacy Policy:**
   - URL: `https://evikass.github.io/school-curriculum-app/privacy-policy.html`
   - Или загрузите `privacy-policy-ru.html` на свой хостинг

7. **Загрузка APK:**
   - `Рабочий трек → Создать релиз`
   - Загрузите APK/AAB файл
   - Заполните примечания к релизу

8. **Публикация:**
   - Нажмите "Отправить на проверку"
   - Срок проверки: **1-7 дней**

---

## 🔵 2. RuStore

### 📋 Требования

| Параметр | Значение |
|----------|----------|
| Регистрация | Бесплатно |
| APK размер | До 200 MB |
| Скриншоты | 2-8 штук |
| Верификация | Паспорт РФ |

### 📝 Шаг 1: Регистрация

1. Перейдите на **https://developer.rustore.ru/**
2. Авторизуйтесь через **VK ID**
3. Заполните анкету разработчика
4. Подтвердите личность (загрузите фото паспорта)

### 📤 Шаг 2: Публикация

1. Нажмите **"Добавить приложение"**
2. Загрузите APK файл
3. Заполните информацию:

   ```
   Название: ИНЕТШКОЛА

   Краткое описание:
   Интерактивная образовательная платформа для школьников 0-11 классов

   Полное описание:
   (скопируйте из rustore.txt)

   Категория: Образование
   Возрастной рейтинг: 0+
   ```

4. Загрузите медиа:
   - Иконка: `icon-512.png`
   - Скриншоты: `store-phone-1.png`, `store-phone-2.png`

5. Укажите:
   - Privacy Policy URL
   - Контактный email

6. Отправьте на модерацию

### ⏱ Срок модерации: **1-3 рабочих дня**

---

## 🟣 3. VK Mini Apps

### 📋 Требования

| Параметр | Значение |
|----------|----------|
| Регистрация | Бесплатно |
| Хостинг | Ваш сайт |
| Возраст | 0+ |

### 📝 Шаг 1: Создание приложения

1. Перейдите на **https://vk.com/editapp?act=create**
2. Выберите тип: **"Веб-сайт"**
3. Заполните:

   ```
   Название: ИНЕТШКОЛА
   Адрес сайта: https://evikass.github.io/school-curriculum-app/
   Базовый домен: evikass.github.io
   ```

### 📤 Шаг 2: Настройка

1. Загрузите иконку (512x512)
2. Настройте права:
   - Отключите все дополнительные права
3. Опишите приложение:
   - Категория: Образование
   - Описание: Интерактивная школьная программа

### 📤 Шаг 3: Публикация

1. Перейдите в **"Каталог"**
2. Отправьте заявку на проверку
3. После одобрения приложение появится в каталоге

### ⏱ Срок модерации: **1-3 дня**

---

## 🟠 4. Samsung Galaxy Store

### 📋 Требования

| Параметр | Значение |
|----------|----------|
| Регистрация | Бесплатно |
| APK размер | До 150 MB |
| Скриншоты | 2-8 штук |

### 📝 Шаг 1: Регистрация продавца

1. Перейдите на **https://seller.samsungapps.com/**
2. Создайте Samsung аккаунт
3. Заполните коммерческую информацию
4. Подтвердите email

### 📤 Шаг 2: Публикация

1. Нажмите **"Add New Application"**
2. Выберите **"Android"**
3. Загрузите APK
4. Заполните:

   ```
   App Name: ИНЕТШКОЛА
   Description: (скопируйте из samsung-galaxy-store.txt)
   Category: Education
   Age Rating: Everyone
   ```

5. Загрузите:
   - App Icon: `icon-512.png`
   - Screenshots: `store-phone-1.png`, `store-phone-2.png`

6. Укажите:
   - Privacy Policy URL
   - Support email

7. Отправьте на проверку

### ⏱ Срок модерации: **3-7 дней**

---

## 📊 Сравнение магазинов

| Параметр | Google Play | RuStore | VK Apps | Samsung |
|----------|-------------|---------|---------|---------|
| **Регистрация** | $25 | Бесплатно | Бесплатно | Бесплатно |
| **Модерация** | 1-7 дней | 1-3 дня | 1-3 дня | 3-7 дней |
| **Аудитория** | 🌍 Мировая | 🇷🇺 РФ | 🇷🇺 РФ | 🌍 Мировая |
| **Оффлайн** | ✅ Да | ✅ Да | ❌ Нет | ✅ Да |
| **Сложность** | Средняя | Низкая | Низкая | Средняя |

---

## 📋 Чек-лист перед публикацией

- [ ] Проверен манифест (manifest.json)
- [ ] Подготовлены иконки всех размеров
- [ ] Созданы скриншоты
- [ ] Написаны описания (RU + EN для Google Play)
- [ ] Размещена Privacy Policy
- [ ] Создан keystore и сохранён пароль
- [ ] Собран APK
- [ ] Проверена работа APK на устройстве

---

## ❓ FAQ

### Q: Сколько стоит публикация?
**A:** Google Play — $25 единоразово. Остальные магазины бесплатны.

### Q: Нужен ли ИП/юрлицо?
**A:** Нет, можно публиковать как физлицо. Для RuStore нужна верификация паспортом.

### Q: Как обновлять приложение?
**A:** Загрузите новый APK с увеличенным versionCode в каждый магазин.

### Q: Что делать если забыл пароль keystore?
**A:** К сожалению, восстановить невозможно. Придётся публиковать как новое приложение с новым package name.

### Q: Можно ли опубликовать в App Store?
**A:** Да, но нужно конвертировать PWA в iOS app (PWABuilder или Capacitor). Требуется аккаунт Apple Developer ($99/год).

---

## 📧 Поддержка

- Email: **support@inetshkola.ru**
- Сайт: **https://evikass.github.io/school-curriculum-app/**

---

© 2024-2025 ИНЕТШКОЛА. Все права защищены.