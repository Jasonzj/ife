import './css/style.scss'
import { Calendar } from './js/calendar';

new Calendar({
    ele: '.main',
    input: 'inp',
    callBack() {
        console.log('callback');
    }
})