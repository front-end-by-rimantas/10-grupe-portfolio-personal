const navigation_links = [
    {
        title:  'home',
        link:   '#',
        aClass:  'active',
    },
    {
        title:  'about',
        link:   '#',
    },
    {
        title:  'services',
        link:   '#',
    },
    {
        title:  'portfolio',
        link:   '#',
    },
    {
        title:  'pricing',
        link:   '#',
    },
    {
        title:      'blog',
        link:       '#',
        aClass:     'with-dropdown',
        liClass:    'has-dropdown',
        childs:     [
            {
                title:  'blog home',
                link:   '#',
            },
            {
                title:  'blog single',
                link:   '#',
            },
        ],
    },
    {
        title:      'pages',
        link:       '#',
        aClass:     'with-dropdown',
        liClass:    'has-dropdown',
        childs: [
            {
                title:  'elements',
                link:   '#',
            },
            {
                title:      'level 2',
                link:       '#',
                aClass:     'with-dropdown',
                liClass:    'has-dropdown',
                childs:     [
                    {
                        title:  'item one',
                        link:   '#',
                    },
                    {
                        title: 'item two',
                        link: '#',
                    },
                ],
            },
        ],
    },
    {
        title:  'contact',
        link:   '#',
    },
];

const services = [
    {
        category:   'Web design',
        icon:       'pie-chart',
        text:       '“It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.”'
    },
    {
        category:   'Web development',
        icon:       'laptop-phone',
        text:       'If you are an entrepreneur, you know that your success cannot depend on the opinions of others. Like the wind, opinions.'
    },
    {
        category:   'Photography',
        icon:       'camera',
        text:       'Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills.'
    },
    {
        category:   'Clipping Path',
        icon:       'picture',
        text:       'Hypnosis quit smoking methods maintain caused quite a stir in the medical world over the last two decades. There is a lot of argument.'
    },
    {
        category:   'Apps interface',
        icon:       'tablet',
        text:       'Do you sometimes have the feeling that you’re running into the same obstacles over and over again? Many of my conflicts.'
    },
    {
        category:   'Graphic design',
        icon:       'rocket',
        text:       'You’ve heard the expression, “Just believe it and it will come.” Well, technically, that is true, however, ‘believing’ is not just thinking that.'
    },
];

const facts = [
    {
        number:         2536,
        title:          'Project Completed',
        skaitliukas:    0,
    },
    {
        number:         6784,
        title:          'Happy Clients',
        skaitliukas:    0,
    },
    {
        number:         2239,
        title:          'Cups of Coffee',
        skaitliukas:    0,
    },
    {
        number:         434,
        title:          'Real Professionals',
        skaitliukas:    0,
    }
];

const projects = [
    {
        img:        'p1.jpg',
        title:      '2D vinyl design',
        text:       'vector',
        category:   'vector',
    },
    {
        img:        'p2.jpg',
        title:      '2D vinyl design',
        text:       'vector',
        category:   'raster',
    },
    {
        img:        'p3.jpg',
        title:      'Creative Poster Design',
        text:       'Agency',
        category:   'ui/ux',
    },
    {
        img:        'p4.jpg',
        title:      'Embosed Logo Design',
        text:       'Portal',
        category:   'printing',
    },
    {
        img:        'p5.jpg',
        title:      '3D Helmet Design',
        text:       'vector',
        category:   'vector',
    },
    {
        img:        'p6.jpg',
        title:      '2D vinyl design',
        text:       'raster',
        category:   'raster',
    },
];

const blog_posts = [
    {
        imgPhoto:   '2.jpg',
        imgUser:    'gv.jpg',
        user:       'Giedrius V.',
        date:       '1st Oct',
        time:       '2019-10-01',
        link:       '#',
        likes:      9,
        comments:   0,
        title:      'Break through self doubt and fear',
        text:       'Dream interpretation has many forms; it can be done be done for the sake of fun, hobby or can be taken up as a serious career.',
    },
    {
        imgPhoto:   '3.jpg',
        imgUser:    'user.png',
        user:       'Mark Wiens',
        date:       '24th Sep',
        time:       '2019-09-24',
        link:       '#',
        likes:      15,
        comments:   4,
        title:      'Portable fashion for women',
        text:       'You may be a skillful, effective employer but if you don’t trust your personnel and the opposite, then the chances of improving.',
    },
    {
        imgPhoto:   '1.jpg',
        imgUser:    'am.jpg',
        user:       'Artūras M.',
        date:       '2nd Sep',
        time:       '2019-09-02',
        link:       '#',
        likes:      11,
        comments:   7,
        title:      'Practice makes perfect',
        text:       'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit dolore similique quam quidem eos deleniti at aperiam minima aut?',
    },
];