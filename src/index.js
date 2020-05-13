'use strict';

// полифилы для работоспособности JS в IE
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'es6-promise';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculator from './modules/calculator';
import changeImgTeam from './modules/changeImgTeam';
import sendForm from './modules/sendForm';
import validationField from './modules/validationField';

// Таймер
countTimer('02 july 2020');
// Меню
toggleMenu();
// popup
togglePopup();
// табы
tabs();
// слайдер
slider();
// Калькулятор
calculator(100);
// Наша команда
changeImgTeam();
// send-ajax-form
sendForm();
// Валидация форм
validationField();