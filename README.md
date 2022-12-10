# Место

### О проекте:

Проект о создании своего профиля, с карточками из разных мест мира.  
Проект переделан под библиотеку React.js со своим сервером написаном на Express.

---

### Установка 

Клонировать репозиторий
```
git clone git@github.com:MKudina/react-mesto-auth.git
```
---
Настройка Backend

```
npm ci - Установка зависимостей из Package-lock
```
создать .env файл в папке backend
```
NODE_ENV=development
PORT=3001
JWT_SECRET="Указать свой JWT_SECRET"
MONGO_URI=mongodb://localhost:27017/mestodb
```
```
npm run dev - Запуск сервера
```
---
Настройка Frontend
```
npm ci - Установка зависимостей из Package-lock
```

```
npm run start - Запуск приложения 
```

---

### Технологии:
* React 16
* JS
* HTML 5
* CSS 3
* Express
