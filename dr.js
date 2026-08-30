/* =====================================================
   ЗВЁЗДЫ
===================================================== */

const starsContainer = document.querySelector(".stars");

if (starsContainer) {

    for (let i = 0; i < 120; i++) {

        const star = document.createElement("div");

        star.classList.add("star");

        const size = Math.random() * 3 + 1;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        star.style.animationDuration =
            `${2 + Math.random() * 4}s`;

        star.style.animationDelay =
            `${Math.random() * 4}s`;

        starsContainer.appendChild(star);
    }

}


/* =====================================================
   ЭКРАНЫ
===================================================== */

const firstScreen =
    document.querySelector(".screen-one");

const secondScreen =
    document.querySelector(".screen-two");

const thirdScreen =
    document.querySelector(".screen-three");

const fourthScreen =
    document.querySelector(".screen-four");


/* =====================================================
   ЭКРАН 1
===================================================== */

const startButton =
    document.getElementById("startButton");


/* =====================================================
   ЭКРАН 2
===================================================== */

const glow =
    document.querySelector(".birth-glow");

const birthdayContent =
    document.querySelector(".birthday-content");

const cake =
    document.querySelector(".cake");

const candles =
    document.querySelectorAll(".candle");

const secondNextButton =
    document.getElementById("secondNextButton");


/* =====================================================
   ЭКРАН 3
===================================================== */

const birthdayMessage =
    document.getElementById("birthdayMessage");

const thirdNextButton =
    document.getElementById("thirdNextButton");


/* =====================================================
   ЭКРАН 1 → ЭКРАН 2
===================================================== */

startButton.addEventListener("click", () => {

    /* Первый экран исчезает */

    firstScreen.classList.add("hidden");


    /* Второй экран появляется */

    secondScreen.style.opacity = "1";
    secondScreen.style.pointerEvents = "auto";


    /* Перезапускаем вспышку */

    glow.classList.remove("active");

    void glow.offsetWidth;

    glow.classList.add("active");


    /* Появление текста */

    setTimeout(() => {

        birthdayContent.classList.add("show");

    }, 900);


    /* Появление торта */

    setTimeout(() => {

        cake.classList.add("show");

    }, 2800);


    /* =================================================
       ЗАЖИГАНИЕ СВЕЧЕЙ
    ================================================= */

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.add("lit");


            /* Последняя свеча */

            if (index === candles.length - 1) {

                setTimeout(() => {

                    secondNextButton.classList.add("show");

                }, 1200);

            }

        }, 3500 + index * 500);

    });

});


/* =====================================================
   ЭКРАН 2 → ЭКРАН 3
===================================================== */

secondNextButton.addEventListener("click", () => {

    /* Второй экран исчезает */

    secondScreen.style.opacity = "0";
    secondScreen.style.pointerEvents = "none";


    /* Третий экран появляется */

    thirdScreen.style.opacity = "1";
    thirdScreen.style.pointerEvents = "auto";


    /* Запускаем поздравление */

    startBirthdayMessage();

});


/* =====================================================
   ТЕКСТ ПОЗДРАВЛЕНИЯ
===================================================== */

const messageParagraphs = [

    `Моя Госпожа, хочу вас от всей души поздравить с вашим днём рождения, а именно — с восемнадцатилетием. 🎉`,

    `Сегодня вы официально ступаете на ту самую загадочную и, судя по рассказам взрослых, крайне опасную тропу взрослого человека. Теперь вы совершеннолетняя, но, надеюсь, это не помешает нам и дальше творить всякую хуйню, смеяться с максимально тупых вещей и периодически задавать вопросы друг другу: «А ты будешь со мной дружить, если я буду килькой в томате?»`,

    `Я желаю вам огромного счастья, добра и успехов и, конечно же, побольше моментов, от которых хочется улыбаться. Желаю, чтобы учёба не пыталась окончательно уничтожить остатки вашей психики, чтобы всё задуманное постепенно получалось, а рядом всегда были люди, с которыми спокойно, весело и можно оставаться собой.`,

    `А ещё я хочу сказать спасибо.`,

    `Я действительно крайне рад, что однажды мы познакомились. Мне очень приятно и комфортно с вами общаться, гулять, смеяться, обсуждать всякую чушь и болтать часами. В нашем общении есть что-то такое, что мне действительно дорого.`,

    `И я очень надеюсь, что вам со мной тоже комфортно и приятно, потому что было бы несколько неловко узнать после всего этого, что я просто бибизян, который прицепился и не отстаёт.`,

    `Мне, конечно, немного грустно, что я не могу поздравить вас сегодня вживую. Не могу нормально вручить подарок, обнять вас и, как порядочный друг, торжественно кинуть вам тортик прямо в лицо.`,

    `Поэтому пришлось импровизировать.`,

    `Именно поэтому перед вами сейчас находится сей цифровой шедевр.`,

    `В него я вложил немного своего времени, немного нервных клеток, а также частичку себя.`,

    `Так что пусть этот маленький сайт останется у вас как небольшое напоминание о том, что где-то существует один долбоёб, который будет делать вам такие тупые, но милые вещи.`,

    `С днём рождения вас, моя Госпожа. ❤️`,

    `Я правда очень благодарен судьбе за то, что однажды наши дороги пересеклись.`,

    `Пусть ваши восемнадцать будут началом чего-то действительно хорошего.`,

    `А всё остальное мы как-нибудь переживём.`,

    `Ну и да...`,

    `Тортик я всё ещё вам должен, так что, как приеду, просите торт какой захотите.`

];


/* =====================================================
   ПЕЧАТЬ ОДНОГО АБЗАЦА
===================================================== */

function typeText(element, text, speed = 18) {

    return new Promise((resolve) => {

        let index = 0;

        const cursor =
            document.createElement("span");

        cursor.classList.add("typing-cursor");

        element.appendChild(cursor);


        function type() {

            if (index < text.length) {

                cursor.before(
                    document.createTextNode(
                        text[index]
                    )
                );

                index++;

                setTimeout(type, speed);

            } else {

                cursor.remove();

                resolve();

            }

        }


        type();

    });

}


/* =====================================================
   ЗАПУСК ПОЗДРАВЛЕНИЯ
===================================================== */

let messageStarted = false;


async function startBirthdayMessage() {

    /* Защита от повторного запуска */

    if (messageStarted) {
        return;
    }

    messageStarted = true;


    /* Ждём 5 секунд */

    await new Promise(resolve => {

        setTimeout(resolve, 5000);

    });


    /* Печатаем каждый абзац */

    for (
        let i = 0;
        i < messageParagraphs.length;
        i++
    ) {

        const paragraph =
            document.createElement("p");

        paragraph.classList.add(
            "message-paragraph"
        );


        birthdayMessage.appendChild(
            paragraph
        );


        /* Печатаем текст */

        await typeText(
            paragraph,
            messageParagraphs[i],
            18
        );


        /* Пауза между абзацами */

        await new Promise(resolve => {

            setTimeout(resolve, 900);

        });


        /* Прокручиваем вниз */

        birthdayMessage.scrollTo({

            top:
                birthdayMessage.scrollHeight,

            behavior:
                "smooth"

        });

    }


    /* После полного текста */

    setTimeout(() => {

        thirdNextButton.classList.add("show");

    }, 1000);

}


/* =====================================================
   ЭКРАН 3 → ЭКРАН 4
===================================================== */

thirdNextButton.addEventListener("click", () => {

    /* Третий экран исчезает */

    thirdScreen.style.opacity = "0";
    thirdScreen.style.pointerEvents = "none";


    /* Четвёртый появляется */

    fourthScreen.style.opacity = "1";
    fourthScreen.style.pointerEvents = "auto";

});


/* =====================================================
   КАРТОЧКИ
===================================================== */

const memoryCards =
    document.querySelectorAll(".memory-card");


memoryCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});
