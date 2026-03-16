# Инструкция по сборке APK для RuStore

## 📱 Проект: ИНЕТШКОЛА

**Пакет:** `ru.inetshkola.app`  
**Версия:** 1.0.0

---

## ⚠️ Требования для локальной сборки

### Минимальные требования:
- **Node.js** 18+ 
- **Java JDK 17** (не JDK 21!)
- **Android SDK** с компонентами:
  - Build Tools 35+
  - Platform 36
  - NDK 27.1.12297006
- **Gradle 8.13+**

### Рекомендуемый способ: EAS Build (облачная сборка)

Это самый простой способ - не требует установки Android SDK!

```bash
# 1. Распаковать архив
tar -xzvf inetshkola-android-full.tar.gz
cd inetshkola-android

# 2. Установить зависимости
npm install

# 3. Авторизоваться в Expo (бесплатно)
npx eas login
# Или зарегистрироваться: npx eas register

# 4. Собрать APK в облаке
npx eas-cli build --platform android --profile preview

# APK будет готов через 5-10 минут
# Ссылка на скачивание появится в терминале
```

---

## 🖥️ Локальная сборка (для продвинутых)

### Установка Java JDK 17:
```bash
# Ubuntu/Debian
sudo apt install openjdk-17-jdk

# macOS
brew install openjdk@17

# Windows - скачайте с adoptium.net
```

### Установка Android SDK:
```bash
# Создать директорию
mkdir -p ~/android-sdk/cmdline-tools

# Скачать command-line tools
cd ~/android-sdk/cmdline-tools
curl -O https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-*.zip
mv cmdline-tools latest

# Установить компоненты
export ANDROID_HOME=~/android-sdk
~/android-sdk/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-36" "build-tools;35.0.0" "ndk;27.1.12297006"

# Принять лицензии
yes | ~/android-sdk/cmdline-tools/latest/bin/sdkmanager --licenses
```

### Сборка APK:
```bash
cd inetshkola-android
npm install
npx expo prebuild --platform android
cd android
export ANDROID_HOME=~/android-sdk
./gradlew assembleRelease

# APK будет в:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 Альтернатива: Expo Development Build

Если не нужна сборка APK, можно запустить на устройстве:

```bash
cd inetshkola-android
npm install
npx expo start

# Отсканируйте QR-код приложением Expo Go
```

---

## 🏪 Публикация в RuStore

### Требования RuStore:
- ✅ React Native = нативный код (не WebView!)
- ✅ Все данные встроены (оффлайн-работа)
- ✅ Package: `ru.inetshkola.app`
- ✅ Адаптивные иконки

### Материалы для публикации:
- Скриншоты: `/home/z/my-project/app-store-builds/store-assets/screenshots/`
- Иконки: `/home/z/my-project/app-store-builds/store-assets/icons/`
- Описание: `/home/z/my-project/app-store-builds/store-assets/descriptions/rustore.txt`

---

## 📊 Статистика проекта

| Компонент | Количество |
|-----------|------------|
| Классы | 12 (0-11) |
| Предметы | 10+ в каждом классе |
| Уроки | 200+ |
| Уровни | 20+ |
| Достижения | 8 |

---

## 🔧 Решение проблем

### "JAVA_COMPILER not found"
Установите JDK 17, не JDK 21

### "NDK not found"
```bash
sdkmanager "ndk;27.1.12297006"
```

### "Gradle version error"
Обновите `android/gradle/wrapper/gradle-wrapper.properties`:
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-bin.zip
```

### "Not logged in" (EAS)
```bash
npx eas login
```

---

## 📁 Структура проекта

```
inetshkola-android/
├── App.tsx              # Главный компонент
├── src/
│   ├── screens/         # Экраны приложения
│   ├── context/         # React Context
│   └── data/           # Данные уроков
├── assets/             # Иконки и изображения
├── android/           # Android проект (после prebuild)
├── app.json           # Конфигурация Expo
├── eas.json           # Конфигурация EAS
└── package.json       # Зависимости
```

---

*Последнее обновление: 2025-03-13*
