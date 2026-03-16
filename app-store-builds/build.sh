#!/bin/bash

# ИНЕТШКОЛА - Скрипт сборки для магазинов приложений
# Использование: ./build.sh [command]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "📱 ИНЕТШКОЛА — Build Script"
echo "============================"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }
info() { echo -e "${YELLOW}ℹ️  $1${NC}"; }

# Команда: проверка зависимостей
check_deps() {
    echo "Проверка зависимостей..."

    # Проверка Node.js
    if command -v node &> /dev/null; then
        success "Node.js: $(node -v)"
    else
        error "Node.js не установлен"
    fi

    # Проверка Java (для Android)
    if command -v java &> /dev/null; then
        success "Java: $(java -version 2>&1 | head -n 1)"
    else
        info "Java не установлена (нужна для сборки APK)"
    fi

    # Проверка Android SDK
    if [ -n "$ANDROID_HOME" ]; then
        success "Android SDK: $ANDROID_HOME"
    else
        info "ANDROID_HOME не установлен (нужен для сборки APK)"
    fi

    # Проверка Bubblewrap
    if command -v bubblewrap &> /dev/null; then
        success "Bubblewrap установлен"
    else
        info "Bubblewrap не установлен. Установите: npm install -g @anthropic/bubblewrap"
    fi
}

# Команда: генерация иконок
generate_icons() {
    echo "Генерация иконок..."
    cd "$SCRIPT_DIR"

    if [ -f "create-icons.ts" ]; then
        bun run create-icons.ts
        success "Иконки созданы"
    else
        error "Файл create-icons.ts не найден"
    fi
}

# Команда: создание keystore
create_keystore() {
    echo "Создание keystore для подписи..."

    KEYSTORE_PATH="$SCRIPT_DIR/android-twa/inetshkola.keystore"

    if [ -f "$KEYSTORE_PATH" ]; then
        info "Keystore уже существует: $KEYSTORE_PATH"
        read -p "Пересоздать? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            return
        fi
        rm "$KEYSTORE_PATH"
    fi

    read -p "Введите пароль для keystore: " -s KEYSTORE_PASS
    echo
    read -p "Повторите пароль: " -s KEYSTORE_PASS_CONFIRM
    echo

    if [ "$KEYSTORE_PASS" != "$KEYSTORE_PASS_CONFIRM" ]; then
        error "Пароли не совпадают"
    fi

    keytool -genkey -v \
        -keystore "$KEYSTORE_PATH" \
        -alias inetshkola \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -storepass "$KEYSTORE_PASS" \
        -keypass "$KEYSTORE_PASS" \
        -dname "CN=INETSHKOLA, OU=Education, O=INETSHKOLA, L=Moscow, ST=Moscow, C=RU"

    success "Keystore создан: $KEYSTORE_PATH"
    info "⚠️  СОХРАНИТЕ ПАРОЛЬ! Без него вы не сможете обновлять приложение!"
}

# Команда: сборка через Bubblewrap
build_bubblewrap() {
    echo "Сборка APK через Bubblewrap..."
    cd "$SCRIPT_DIR/android-twa"

    if ! command -v bubblewrap &> /dev/null; then
        error "Bubblewrap не установлен. Установите: npm install -g @anthropic/bubblewrap"
    fi

    # Инициализация проекта
    if [ ! -d "android-project" ]; then
        info "Инициализация Bubblewrap проекта..."
        bubblewrap init --manifest="https://evikass.github.io/school-curriculum-app/manifest.json"
    fi

    # Сборка APK
    info "Сборка APK..."
    bubblewrap build

    success "APK создан!"
    ls -la "*.apk" 2>/dev/null || info "APK файлы в папке android-project/app/build/outputs/apk/"
}

# Команда: показать структуру
show_structure() {
    echo "Структура файлов:"
    cd "$SCRIPT_DIR"
    find . -type f -name "*.json" -o -name "*.xml" -o -name "*.png" -o -name "*.txt" -o -name "*.html" -o -name "*.md" | head -50
}

# Команда: помощь
show_help() {
    echo "
Использование: $0 [команда]

Команды:
  check       Проверка зависимостей
  icons       Генерация иконок
  keystore    Создание keystore для подписи
  build       Сборка APK через Bubblewrap
  structure   Показать структуру файлов
  help        Показать эту справку

Примеры:
  $0 check          # Проверить зависимости
  $0 icons          # Создать иконки
  $0 keystore       # Создать keystore
  $0 build          # Собрать APK

Для публикации в магазинах:
  1. Установите зависимости: npm install -g @anthropic/bubblewrap
  2. Проверьте зависимости: $0 check
  3. Создайте keystore: $0 keystore
  4. Соберите APK: $0 build
  5. Загрузите APK в магазины (см. PUBLISH-GUIDE.md)
"
}

# Главная логика
case "${1:-help}" in
    check)      check_deps ;;
    icons)      generate_icons ;;
    keystore)   create_keystore ;;
    build)      build_bubblewrap ;;
    structure)  show_structure ;;
    help|*)     show_help ;;
esac