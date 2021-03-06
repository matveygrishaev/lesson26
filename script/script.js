window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Главный input
    document.addEventListener("input", (event) => {
        const target = event.target;
        
        if (
        !target.matches(
            ".mess, .form-name, .calc-square, .calc-day, .calc-count, .form-phone"
        )
        ) {
        return;
        }
        if (target.matches(".mess, .form-name")) {
        target.value = target.value.replace(/[^а-яё\s]/gi, "");
        }

        if (target.matches(".form-phone")) {
        target.value = target.value.replace(/[^+0-9]/gi, "");
        }

        if (
        target.matches(".calc-square") ||
        target.matches(".calc-day") ||
        target.matches(".calc-count")
        ) {
        target.value = target.value.replace(/\D/g, "");
        }
    });

    //Timer
    function countTimer(deadLine) {
        let idInterval,
            timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {

            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        } //вычисляет сколько времени осталось до deadline

        function updateClock() {
            let timer = getTimeRemaining();

            const timeCheck = (element1, element2) => {
                if (String(element1).length === 1) {
                    element2.textContent = '0' + element1;
                } else {
                    element2.textContent = element1;
                }
            };


            //Часы
            timeCheck(timer.hours, timerHours);

            //Минуты
            timeCheck(timer.minutes, timerMinutes);

            // Секунды
            timeCheck(timer.seconds, timerSeconds);

            if (timer.timeRemaining < 0) {
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerHours.style.color = 'tomato';

                timerMinutes.textContent = '00';
                timerMinutes.style.color = 'tomato';

                timerSeconds.textContent = '00';
                timerSeconds.style.color = 'tomato';
            }
        } // получаем и записываем значения seconds, minutes, hours

        updateClock();

        idInterval = setInterval(updateClock, 1000);
    }

    countTimer('07 november 2020 23:32:20');

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'), // кнопка бургер, открывает и закрывает меню
            menu = document.querySelector('menu'), // скрытое, с помощью translate(-100%) меню
            body = document.querySelector('body'),
            closeBtn = document.querySelector('.close-btn'), // кнопка "крестик" в меню 
            menuItems = menu.querySelectorAll('ul>li>a'), // список ссылок в выпадающем меню

            // Кнопка-бургер меню, открыть и закрыть
            handlerMenu = () => {
                menu.classList.toggle('active-menu');
            };

        // btnMenu.addEventListener('click', handlerMenu);

        body.addEventListener('click', (event) => {

            //Присваиваем кликнутый элемент target'у
            let target = event.target;

            if (target.closest('.menu')) {
                handlerMenu();
            } else if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (!target.matches('.active-menu') && !target.matches('li')) {
                menu.classList.remove('active-menu');
            }
        });
    };

    toggleMenu();

    //PopUp окно
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpContent = document.querySelector('.popup-content'),
            popUpBtns = document.querySelectorAll('.popup-btn');

        //Навешивает всем popUpBtns display block по клику + анимация Opacity
        popUpBtns.forEach(elem => {
            elem.addEventListener('click', () => {
                if (window.innerWidth > 768) {
                    let count = 0;
                    popUpContent.style.opacity = 0;
                    console.log(popUpContent.style.opacity);
                    popUp.style.display = 'block';

                    setInterval(() => {
                        if (popUpContent.style.opacity < 1) {
                            count += 0.04;
                            popUpContent.style.opacity = count;
                        } else {
                            clearInterval();
                        }
                    }, 40);
                } else {
                    popUp.style.display = 'block';
                }
            });
        });

        // PopUp окно
        popUp.addEventListener('click', (event) => {
            let target = event.target;
            // Проверка на нажатие на крестик
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                //Если кликнем за пределами .popup-content, то получим NaN
                target = target.closest('.popup-content');

                //Если мы Не получили target(NaN), то закрываем popUp окно
                if (!target) {
                    popUp.style.display = 'none';
                }
            }

        });
    };

    togglePopUp();

    //Табы
    const tabs = () => {

        const tabHeader = document.querySelector('.service-header'), //Родитель табов
            tab = tabHeader.querySelectorAll('.service-header-tab'), //Табы
            tabContent = document.querySelectorAll('.service-tab'); //Содержание таба

        //Перебирает табы и показывает его, остальные скрывает
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {

                if (index === i) {
                    tabContent[i].classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        // Делегирование
        tabHeader.addEventListener('click', (event) => {

            //получаем элемент по которому кликнули
            let target = event.target;

            //с помощью .closest присваивает .service-header-tab элементу
            target = target.closest('.service-header-tab');
            console.log(target);

            // проверка клика по табу
            if (target) {

                tab.forEach((item, i) => {

                    if (item === target) {
                        //запускает цикл и сравнивает i с index из  toggleTabContent
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // Слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'), //ul родитель для слайдев li
            portfolioDots = document.querySelector('.portfolio-dots');

        // номер слайда, по-умолчанию 0
        let currentSlide = 0,
            interval,
            dot = {};

        // Функция создания .dot
        const createDot = () => {

            //Счетчик
            let count = 0;
            // Элемент .dot
            let li = `<li class="dot"></li>`;

            slide.forEach(() => {

                if (count <= slide.length) {

                    portfolioDots.insertAdjacentHTML('beforeend', li);
                    count++;
                }
            });

            dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');
        };

        createDot();

        // Функция следующий слайд
        const prevSlide = (elem, index, stringClass) => {
            // Пример: slide[currentSlide].classList.remove('portfolio-item-active');
            elem[index].classList.remove(stringClass);
        };

        // Предыдущий слайд
        const nextSlide = (elem, index, stringClass) => {
            elem[index].classList.add(stringClass);
        };

        // Слайдшоу
        const autoPlaySlide = () => {

            // Удаляем активный класс у активных слайдов
            prevSlide(slide, currentSlide, 'portfolio-item-active');

            // Удаляем активный класс у активных точек
            prevSlide(dot, currentSlide, 'dot-active');

            currentSlide++;

            // Ограничевает слайды по колличеству, замыкает круг
            if (currentSlide >= slide.length) {
                // Если слайд последний, то возвращаемся к первому
                currentSlide = 0;
            }

            // Активирует следующий класс
            nextSlide(slide, currentSlide, 'portfolio-item-active');

            // активирует следующую точку
            nextSlide(dot, currentSlide, 'dot-active');
        };

        // Запуcкает слайдер каждые time секунд
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        // Останавливает слайдер
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {

            // Ссылка теперь не сслыка
            event.preventDefault();

            let target = event.target;

            //Если кликнули мимо .portfolio-btn и .dot, то return (дальше действий нет)
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            console.log(target);

            // Удаляем активный класс у активных слайдов
            prevSlide(slide, currentSlide, 'portfolio-item-active');

            // Удаляем активный класс у активных точек
            prevSlide(dot, currentSlide, 'dot-active');

            // Проверка: Куда конкретно кликнули
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        // Присваиваем currentSlide индекс точки на которую кликнули
                        currentSlide = index;
                    }
                });
            }

            // Условия возврата от проследнего слайда к первому, замыкает круг
            if (currentSlide >= slide.length) {

                currentSlide = 0;
            }

            // Условия возврата от первого слайда к последнему, замыкает круг
            if (currentSlide < 0) {

                currentSlide = slide.length - 1;
            }

            // Активирует следующий класс, после условий if-else выше 
            nextSlide(slide, currentSlide, 'portfolio-item-active');

            // активирует следующую точку, после условий if-else выше
            nextSlide(dot, currentSlide, 'dot-active');

        });

        // Если курсор зашел на .dot или стрелках, останавливать слайдшоу
        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });

        // Если курсор покинул на .dot или стрелках, возобновить слайдшоу
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();

    // Блок "Наша команда" (lesson 23)
    const changeCommandPhoto = () => {
        const command = document.getElementById('command');

        command.addEventListener('mouseover', (event) => {
            let target = event.target,
                targetMainSrc = target.getAttribute('src'),
                targetDataImg = target.getAttribute('data-img');

            if (target.closest('.command')) {
                target.src = targetDataImg;

                command.addEventListener('mouseout', (event) => {
                    target.src = targetMainSrc;
                });
            }
        });
    };

    changeCommandPhoto();

    // Калькулятор
    const calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),

            calcSquare = document.querySelector('.calc-square'), //Input: Общая площадь
            calcDay = document.querySelector('.calc-day'), // Input: Срок исполнения (в днях)
            calcCount = document.querySelector('.calc-count'), // Input: количество помещений
            totalValue = document.getElementById('total');

        const countSum = () => {

            let total = 0,
                countValue = 1,
                dayValue = 1;

            calcSquare.value = calcSquare.value.replace(/\D/g, '');
            calcDay.value = calcDay.value.replace(/\D/g, '');
            calcCount.value = calcCount.value.replace(/\D/g, '');

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value; // коэффициент

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            //  Если существуют typeValue && squareValue
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('input', (event) => {
            const target = event.target;

            // if (target.matches('.calc-type') || target.matches('.calc-square') ||
            // target.matches('.calc-day') || target.matches('.calc-count')) {
            //     console.log(1);
            // }

            // if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
            //     console.log(1);
            // }

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calc(100);

    // Отправка формы (AJAX)

    const sendForm = () => {

        // Сообщения
        const errorMessage = "Что-то пошло не так...",
            loadMessage = `
            <div class='sk-chasing-dots'>
            <div class='sk-child sk-dot-1'></div>
            <div class='sk-child sk-dot-2'></div>
            </div>
            `,
            successMessage = "Спасибо! Мы скоро с вами свяжемся!";

        // Форма
        const form1 = document.getElementById("form1"),
        form2 = document.getElementById("form2"),
        form3 = document.getElementById("form3");

        // Оповещение пользователя
        const statusMessage = document.createElement("div"); // создаем div
        statusMessage.style.cssText = "font-size: 2rem"; // стиль
        statusMessage.style.color = "#19b5fe"; // цвет

        // Прослушиватель на форме для проверки и отправки
        document.addEventListener("submit", (event) => {
            const target = event.target;
            event.preventDefault();
                if (!target.matches("#form1, #form2, #form3")) {
                    return;
                }

                let formTransformator;

                if (target === form1) {
                    formTransformator = form1;
                }

                if (target === form2) {
                    formTransformator = form2;
                }

                if (target === form3) {
                    formTransformator = form3;
                }

        event.preventDefault(); // отменяем перезагрзку страницы
        formTransformator.appendChild(statusMessage); // помещаем сообщение для пользователя
        statusMessage.innerHTML = loadMessage;

        // Создаем form-data для получения с нее данных и отправки на сервер
        const formData = new FormData(formTransformator);

        // Если перед отправкой на сервер нужно переформатировать в формат JSON:
        const body = {};
        // for (let value of formData.entries()) {
                //     body[value[0]] = value[1];
                //     console.log(body);

        formData.forEach((value, key) => {
            body[key] = value;
        });

        // eslint-disable-next-line no-use-before-define
        postData(
            body,
            () => {

                statusMessage.textContent = successMessage;

                document.querySelectorAll(".form-name").forEach((elem) => {
                    elem.value = "";
                });

                document.querySelectorAll(".form-phone").forEach((elem) => {
                    elem.value = "";
                });

                document.querySelectorAll(".form-email").forEach((elem) => {
                    elem.value = "";
                });

                document.querySelector(".mess").value = "";
            },

            (error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            }
        );});

        const postData = (body, success, error) => {
        // ОТправка данных на сервер (урок 26)
        //!Дальше уже будем писать сам запрос к серверу
        //!мы создаем объект экземпляра класса XML HTTP REQUEST
            const request = new XMLHttpRequest();

            // Отлавливаем событие
            request.addEventListener("readystatechange", () => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    success();
                } else {
                    error(request.status);
                }
            });

            request.open("POST", "./server.php");
            request.setRequestHeader("Content-Type", "application/json");

            // request.send(formData);
            request.send(JSON.stringify(body)); // получили данные и отправляем, конвертируя в JSON

            /*теперь после отправки формы, в браузере нажать Network, то в разделе Headers можно увидеть всю информацию и введеные пользователем данные*/
        };
    };
    
    sendForm();

});