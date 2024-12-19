const sendEmail = require("./emailSender")

const subscribe = (user, event) => {
    const eventTime = new Date(event.date);
    const now = Date.now();
    const delay = eventTime.getTime() - now;

    console.log("*******" + delay);
    console.log("*******" + eventTime);
    console.log("*******" + now);

    sendEmail(user.email, "Запис на подію", `Ви записані на подію: ${event.name}, яка запланована на ${eventTime}`)
    console.log(`Запис на подію ${user.email}`);

    if(delay < 0){
        console.log('Подія пройшла чи залишилось менше години.');
    }
    else if(delay <  3600 * 1000){
        sendEmail(user.email, "Нагадування про подію", `Подія, на яку ви записані: ${event.name}, відбудеться менше ніж за годину!`);
        console.log(`Менше години`);
    }
    else {
        setTimeout(() => {
            sendEmail(user.email, "Нагадування про подію", `Подія, на яку ви записані: ${event.name}, відбудеться за годину!`);
        }, delay -  (3600 * 1000));
        console.log(`Більше години`);
    }
};

const unsubscribe = (user, event) => {
    const eventTime = new Date(event.date).getTime();

    sendEmail(user.email, "Відмова від події", `Ви відмовились від події: ${event.name}, яка запланована на ${eventTime}`)
    console.log(`Відмова від події: ${user.email}`);

};

module.exports = { subscribe, unsubscribe };