# Drozhi -  Маркетинговое агенство
Web-сайт для маркетингового агентсва Дрожжи. Сборка проекта на GULP. <br/>Для достижения адаптивности в проете используются технологии CSS Grid и Flexbox.
Соблюдены базовые требования доступности ( семантическая вёрстка, используются атрибуты aria-label, atl).
В проекте используется адаптивное burger-menu, плавный scroll по якорным ссылкам. 
Так же добавлена функция кастомного модального окна. В проекте предусмотрена валидация формы отправки заявки с помощью плагина Just-Validate.JS
<br/>
<br/>
*Директория docs используется только для демонстрации проекта.*
<br/>
## Для запуска проекта скачайте файлы репозитория, установите зависимости командой -- npm install. После чего запустите одну из служебных команд:

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- gulp default : для сборки dev версии :hammer:<br/>
-- gulp build : для сборки prod версии :handbag:


## Use Plugins :floppy_disk: :
<br/>
"@babel/core": "^7.16.7",<br/>
    "@babel/preset-env": "^7.16.7",<br/>
    "babel-loader": "^8.2.3",<br/>
    "browser-sync": "^2.26.14",<br/>
    "del": "^6.0.0",<br/>
    "gulp": "^4.0.2",<br/>
    "gulp-autoprefixer": "^7.0.1",<br/>
    "gulp-babel": "^8.0.0",<br/>
    "gulp-clean-css": "^4.3.0",<br/>
    "gulp-cli": "^2.3.0",<br/>
    "gulp-concat": "^2.6.1",<br/>
    "gulp-htmlmin": "^5.0.1",<br/>
    "gulp-imagemin": "^7.1.0",<br/>
    "gulp-notify": "^3.2.0",<br/>
    "gulp-rename": "^2.0.0",<br/>
    "gulp-sass": "^5.0.0",<br/>
    "gulp-sourcemaps": "^3.0.0",<br/>
    "gulp-svg-sprite": "^1.5.0",<br/>
    "gulp-ttf2woff": "^1.1.1",<br/>
    "gulp-ttf2woff2": "^4.0.1",<br/>
    "gulp-uglify-es": "^3.0.0",<br/>
    "sass": "^1.45.1",<br/>
    "webpack": "^5.65.0",<br/>
    "webpack-stream": "^7.0.0"<br/>
    "just-validate": "^3.5.2"<br/>