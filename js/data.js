const time = 500;
const setAfter = 5 * time, step = 50;

let showWidth, count, timer, renderMobile = false;
let showInRow = 3, position = 0, i = 0;

const navigation_links = [
    { title: 'home' },
    { title: 'about' },
    { title: 'services' },
    { title: 'portfolio' },
    { title: 'pricing' },
    {
        title: 'blog',
        childs: [
            { title: 'blog home' },
            { title: 'blog single' }
        ]
    },
    {
        title: 'pages',
        childs: [
            { title: 'elements' },
            {
                title: 'level 2',
                childs: [
                    { title: 'item one' },
                    { title: 'item two' }
                ]
            }
        ]
    },
    { title: 'contact' },
];

const services = [
    {
        category: 'Web design',
        icon: 'pie-chart',
        text: '“It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.”'
    },
    {
        category: 'Web development',
        icon: 'laptop-phone',
        text: 'If you are an entrepreneur, you know that your success cannot depend on the opinions of others. Like the wind, opinions.'
    },
    {
        category: 'Photography',
        icon: 'camera',
        text: 'Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills.'
    },
    {
        category: 'Clipping Path',
        icon: 'picture',
        text: 'Hypnosis quit smoking methods maintain caused quite a stir in the medical world over the last two decades. There is a lot of argument.'
    },
    {
        category: 'Apps interface',
        icon: 'tablet',
        text: 'Do you sometimes have the feeling that you’re running into the same obstacles over and over again? Many of my conflicts.'
    },
    {
        category: 'Graphic design',
        icon: 'rocket',
        text: 'You’ve heard the expression, “Just believe it and it will come.” Well, technically, that is true, however, ‘believing’ is not just thinking that.'
    },
];

const facts = [
    {
        number: 2536,
        title: 'Project Completed',
        skaitliukas: 0,
    },
    {
        number: 6784,
        title: 'Happy Clients',
        skaitliukas: 0,
    },
    {
        number: 2239,
        title: 'Cups of Coffee',
        skaitliukas: 0,
    },
    {
        number: 434,
        title: 'Real Professionals',
        skaitliukas: 0,
    }
];

const projects = [
    {
        img: 'p1.jpg',
        title: '2D vinyl design',
        text: 'vector',
        category: 'vector',
    },
    {
        img: 'p2.jpg',
        title: '2D vinyl design',
        text: 'vector',
        category: 'raster',
    },
    {
        img: 'p3.jpg',
        title: 'Creative Poster Design',
        text: 'Agency',
        category: 'ui/ux',
    },
    {
        img: 'p4.jpg',
        title: 'Embosed Logo Design',
        text: 'Portal',
        category: 'printing',
    },
    {
        img: 'p5.jpg',
        title: '3D Helmet Design',
        text: 'vector',
        category: 'vector',
    },
    {
        img: 'p6.jpg',
        title: '2D vinyl design',
        text: 'raster',
        category: 'raster',
    },
];

const feedbacks = [
    {
        clientImg: 'user1.png',
        clientName: 'Harriet Maxwell',
        clientPosition: 'CEO at Google',
        clientComment: 'Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills, the bigger the payoff you.'
    },
    {
        clientImg: 'user2.png',
        clientName: 'Carolyn Craig',
        clientPosition: 'CEO at Facebook',
        clientComment: 'A purpose is the eternal condition for success. Every former smoker can tell you just how hard it is to stop smoking cigarettes. However.'
    },
    {
        clientImg: 'user1.png',
        clientName: 'Vardenis Pavardenis',
        clientPosition: 'CEO at Vardenis',
        clientComment: 'A purpose is the eternal condition for success. Every former smoker can tell you just how hard it is to stop smoking cigarettes. However.'
    },
    {
        clientImg: 'user2.png',
        clientName: 'Pavardenis Vardenis',
        clientPosition: 'CEO at Pavardenis',
        clientComment: 'A purpose is the eternal condition for success. Every former smoker can tell you just how hard it is to stop smoking cigarettes. However.'
    }
];

const plans = [
    {
        num: '01',
        name: 'Economy',
        dedicated: 'For the individuals',
        options: [
            'Secure Online Transfer',
            'Unlimited Styles for interface',
            'Reliable Customer Service'
        ],
        cost: '£199.00',
        button: 'Buy now',
    },
    {
        num: '02',
        name: 'Business',
        dedicated: 'For the individuals',
        options: [
            'Secure Online Transfer',
            'Unlimited Styles for interface',
            'Reliable Customer Service'
        ],
        cost: '£199.00',
        button: 'Buy now',
    },
    {
        num: '03',
        name: 'Premium',
        dedicated: 'For the individuals',
        options: [
            'Secure Online Transfer',
            'Unlimited Styles for interface',
            'Reliable Customer Service'
        ],
        cost: '£199.00',
        button: 'Buy now',
    },
    {
        num: '04',
        name: 'Exlusive',
        dedicated: 'For the individuals',
        options: [
            'Secure Online Transfer',
            'Unlimited Styles for interface',
            'Reliable Customer Service'
        ],
        cost: '£199.00',
        button: 'Buy now',
    }
];

const blog_posts = [
    {
        imgPhoto: '2.jpg',
        imgUser: 'gv.jpg',
        user: 'Giedrius V.',
        date: '1st Oct',
        time: '2019-10-01',
        link: '#',
        likes: 9,
        comments: 0,
        title: 'Break through self doubt and fear',
        text: 'Dream interpretation has many forms; it can be done be done for the sake of fun, hobby or can be taken up as a serious career.',
    },
    {
        imgPhoto: '3.jpg',
        imgUser: 'user.png',
        user: 'Mark Wiens',
        date: '24th Sep',
        time: '2019-09-24',
        link: '#',
        likes: 15,
        comments: 4,
        title: 'Portable fashion for women',
        text: 'You may be a skillful, effective employer but if you don’t trust your personnel and the opposite, then the chances of improving.',
    },
    {
        imgPhoto: '1.jpg',
        imgUser: 'am.jpg',
        user: 'Artūras M.',
        date: '2nd Sep',
        time: '2019-09-02',
        link: '#',
        likes: 11,
        comments: 7,
        title: 'Practice makes perfect',
        text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit dolore similique quam quidem eos deleniti at aperiam minima aut?',
    }
];

const brands = [
    { img: '1.png' },
    { img: '2.png' },
    { img: '3.png' },
    { img: '4.png' },
    { img: '5.png' }
];