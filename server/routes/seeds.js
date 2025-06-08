const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Event = require('../models/Event');
const User = require('../models/User');
const Vote = require('../models/Vote');

router.get('/', async (req, res) => {
    try {
        const rand = (max) => Math.floor(Math.random() * max)//rand [0,max)
        const cats = ["sport", "music", "holyday"]
        let users = [];
        let events = [];
        let votes = [];

        // Clear existing data
        await Promise.all([
            Event.deleteMany({}),
            User.deleteMany({}),
            Vote.deleteMany({}),
            Category.deleteMany({})
        ]);

        // Event templates for more realistic data
        const eventTemplates = {
            sport: [
                {
                    name: "Футбольний турнір аматорів",
                    description: "Запрошуємо всіх любителів футболу на щорічний турнір! Збираємо команди по 5 гравців, гра проходить у форматі міні-футболу. Забезпечуємо воду, музику та гарний настрій. Реєстрація команд на місці.",
                    venue: "Спортивний комплекс 'Енергія'"
                },
                {
                    name: "Марафон здоров'я",
                    description: "5-кілометровий забіг парком міста. Підходить для бігунів будь-якого рівня підготовки. Кожен учасник отримає медаль фінішера та пам'ятну футболку. Старт о 9:00.",
                    venue: "Центральний парк"
                },
                {
                    name: "Йога на свіжому повітрі",
                    description: "Практика йоги для всіх рівнів під керівництвом досвідченого інструктора. Приносьте свій килимок та воду. У разі дощу заняття переноситься в приміщення.",
                    venue: "Парк культури та відпочинку"
                }
            ],
            music: [
                {
                    name: "Вечір джазової музики",
                    description: "Живий джаз від місцевих музикантів. У програмі класичні джазові композиції та авторські твори. Працює бар з легкими закусками. Рекомендується попереднє бронювання столиків.",
                    venue: "Джаз-клуб 'Синя птаха'"
                },
                {
                    name: "Рок-фестиваль молодих гуртів",
                    description: "Фестиваль для початківців та молодих рок-гуртів міста. Можливість виступити на великій сцені та знайти своїх перших фанатів. Вхід вільний для всіх бажаючих.",
                    venue: "Літній амфітеатр"
                },
                {
                    name: "Класична музика під зорями",
                    description: "Концерт симфонічного оркестру просто неба. У програмі твори Моцарта, Бетховена та українських композиторів. Приносьте пледи для комфортного перегляду.",
                    venue: "Площа Свободи"
                }
            ],
            holyday: [
                {
                    name: "Фестиваль вуличної їжі",
                    description: "Найкращі фуд-траки міста, майстер-класи від шеф-кухарів, дегустації та розважальна програма для всієї родини. Спеціальні пропозиції для вегетаріанців.",
                    venue: "Набережна міста"
                },
                {
                    name: "Великодній ярмарок",
                    description: "Традиційний ярмарок з продажем пасхальних кошиків, писанок та святкових смаколиків. Майстер-класи з писанкарства для дітей та дорослих.",
                    venue: "Соборна площа"
                },
                {
                    name: "Новорічна вечірка",
                    description: "Святкування Нового року з конкурсами, призами та святковою програмою. Дід Мороз та Снігуронька, феєрверк опівночі. Dress code: святковий.",
                    venue: "Готель 'Україна'"
                }
            ]
        };

        //events
        for (let i = 0; i < 200; i++) {
            const category = cats[rand(3)];
            const template = eventTemplates[category][rand(3)];
            
            const event = new Event({
                name: template.name,
                describe: template.description,
                date: new Date(
                    rand(2) + 2024,//year
                    rand(12),//month
                    rand(30),//day
                    rand(12) + 10,//hours
                    rand(2) * 30,//min
                ),
                category: category,
                venue: template.venue,
            });
            await event.save();

            await Category.findOne({ name: event.category }).then(res => {
                if (!res) {
                    newCat = new Category({ name: event.category });
                    newCat.save();
                }
            })
            
            events.push(event);
        }

        //users
        const adminUser = new User({
            name: "Admin",
            email: `admin@example.com`,
            password: 'password',
            role: 'admin'
        })
        await adminUser.save();
        users.push(adminUser);

        for (let i = 0; i < 10; i++) {
            const user = new User({
                name: "User " + i,
                email: `example${i}@email.com`,
                // No password for regular users
            })
            await user.save();
            users.push(user);
        }

        //votes
        for (let i = 0; i < 300; i++) {
            const vote = new Vote({
                vote: rand(4) > 0,
                event_id: String(events[rand(events.length)]._id),
                user_id: String(users[rand(users.length)]._id),
            })
            await vote.save();
            votes.push(vote);
        }

        res.status(200).json({events,cats,users,votes});
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ message: 'Error seeding database', error: error.message });
    }
});

module.exports = router;