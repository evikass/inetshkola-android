# Быстрая сборка APK для RuStore

## Шаг 1: Скачайте архив
Скачайте файл: `inetshkola-android-v2.tar.gz`

## Шаг 2: Распакуйте и запустите

Откройте терминал и выполните:

```bash
# Распакуйте архив
tar -xzvf inetshkola-android-v2.tar.gz

# Перейдите в папку
cd inetshkola-android

# Установите зависимости
npm install

# Войдите в Expo (используйте ваши данные)
npx expo login
# Введите: evi-kass
# Введите пароль: Jenuari11!

# Запустите сборку APK
npx eas build --platform android --profile preview
```

## Шаг 3: Скачайте APK

После завершения (10-20 мин):
1. Откройте ссылку из терминала
2. Или зайдите на https://expo.dev/accounts/evi-kass/projects/inetshkola-android/builds
3. Скачайте готовый APK

---

## Альтернатива: Локальная сборка

Если установлен Android Studio:

```bash
npx eas build --platform android --profile preview --local
```

---

## Если нужна помощь

Проверьте что установлено:
- Node.js 18+: `node --version`
- npm: `npm --version`

Установка Node.js (если нет):
```bash
# Windows: скачайте с https://nodejs.org/
# macOS:
brew install node

# Linux:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

**Package:** ru.inetshkola.app
**Работает БЕЗ интернета!**
