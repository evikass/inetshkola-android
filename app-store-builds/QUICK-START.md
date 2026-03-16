# ⚡ БЫСТРЫЙ СТАРТ — Публикация ИНЕТШКОЛА

## 🎯 Минимум действий для публикации

### 1️⃣ Сборка APK (5-10 минут)

```bash
# Установите Bubblewrap
npm install -g @bubblewrap/cli

# Перейдите в папку проекта
cd app-store-builds/android-twa

# Инициализируйте проект
bubblewrap init --manifest="https://evikass.github.io/school-curriculum-app/manifest.json"

# Соберите APK
bubblewrap build
```

**Результат:** APK файл в `android-project/app/build/outputs/apk/release/`

---

### 2️⃣ Создание keystore (1 минута)

```bash
keytool -genkey -v \
  -keystore inetshkola.keystore \
  -alias inetshkola \
  -keyalg RSA -keysize 2048 -validity 10000
```

⚠️ **СОХРАНИТЕ ПАРОЛЬ!** Он нужен для каждого обновления!

---

### 3️⃣ Публикация в магазинах

#### Google Play ($25)
1. https://play.google.com/console/signup
2. Создать приложение → Загрузить APK → Заполнить описание
3. Скриншоты: `store-assets/screenshots/store-phone-*.png`
4. Иконка: `store-assets/icons/icon-512.png`
5. Описание: `store-assets/descriptions/google-play-ru.txt`

#### RuStore (Бесплатно)
1. https://developer.rustore.ru/
2. Добавить приложение → Загрузить APK
3. Описание: `store-assets/descriptions/rustore.txt`

#### VK Apps (Бесплатно)
1. https://vk.com/editapp?act=create
2. Тип: Веб-сайт
3. URL: https://evikass.github.io/school-curriculum-app/

---

## 📁 Готовые материалы

| Файл | Назначение |
|------|------------|
| `icons/icon-512.png` | Иконка для магазинов |
| `icons/feature-graphic.png` | Баннер Google Play |
| `screenshots/store-phone-*.png` | Скриншоты |
| `descriptions/*.txt` | Описания на русском |
| `privacy-policy-ru.html` | Политика конфиденциальности |

---

## 📊 Сроки модерации

| Магазин | Срок |
|---------|------|
| Google Play | 1-7 дней |
| RuStore | 1-3 дня |
| VK Apps | 1-3 дня |
| Samsung | 3-7 дней |

---

**Подробности:** См. `PUBLISH-GUIDE.md`