function htmlTemplate(target, data) {
    let HTML = '';
    const originalTemplate = document.querySelector(target + ' > script').innerHTML;

    for (let i = 0; i < data.length; i++) {
        const service = data[i];
        const keywords = Object.keys(service);

        let template = originalTemplate;

        for (let k = 0; k < keywords.length; k++) {
            const pattern = `{{${keywords[k]}}}`;
            while (template.indexOf(pattern) >= 0) {
                template = template.replace(pattern, service[keywords[k]]);
            }
        }

        HTML += template;
    }

    return document.querySelector(target).innerHTML = HTML;
}

function renderNavigation(target) {
    let HTML = '';
    renderMobile = target === '.mobile-nav';

    for (let i = 0; i < navigation_links.length; i++) {
        let data = navigation_links[i];
        let CHILD = addChild(data);

        if (data.hasOwnProperty('childs')) HTML += `<div class="dropdown"><a class="has-childs" href="#">${data.title}</a>${CHILD}</div>`;
        else HTML += `<a href="#">${data.title}</a>`;
    }

    return document.querySelector(target).innerHTML = HTML;
}

function addChild(array) {
    let LINKS = '';
    let HTML = '';

    if (array.hasOwnProperty('childs')) {
        for (let i = 0; i < array.childs.length; i++) {
            let child = array.childs[i];
            let CHILD = addChild(child);

            if (child.hasOwnProperty('childs')) LINKS += `<div class="dropdown"><a class="has-childs" href="#">${child.title}</a>${CHILD}</div>`;
            else LINKS += `<a href="#">${child.title}</a>`;
        }

        HTML = renderMobile ? LINKS : `<div class="childs">${LINKS}</div>`;
    }

    return HTML;
}

function toggleMobileNav() {
    let menu = document.querySelector('i.lnr.xt');

    document.querySelector('.mobile-overlay').classList.toggle('show');
    document.querySelector('.mobile-nav').classList.toggle('show');
    menu.classList.toggle('lnr-menu');
    menu.classList.toggle('lnr-cross');
}

function mobileLnr() {
    toggleMobileNav();

    document.querySelector('.mobile-overlay').addEventListener('click', toggleMobileNav, false);
    document.addEventListener('keydown', () => { if (event.key === "Escape" && document.querySelector('.mobile-nav.show')) toggleMobileNav() });
}

function navigationFunctionality() {
    document.addEventListener('scroll', () => {
        let element = document.querySelector('header').classList;

        (window.scrollY > 100) ? element.add('shadow') : element.remove('shadow');
    })

    document.querySelector('.lnr-menu').addEventListener('click', mobileLnr);

    let dropdown = document.querySelectorAll('nav.mobile-nav .dropdown');

    dropdown.forEach(item => {
        dropdownTitle = item.firstElementChild;

        dropdownTitle.addEventListener('click', (e) => {
            node = item.firstElementChild.nextElementSibling;
            e.target.classList.toggle('active');

            while (node) {
                node.classList.toggle('visible');
                node = node.nextElementSibling;
            }
        });
    });

    dropdown = document.querySelectorAll('header nav .dropdown');

    dropdown.forEach(item => {
        dropdownTitle = item.firstElementChild;

        dropdownTitle.addEventListener('mouseover', (e) => {
            node = item.firstElementChild.nextElementSibling;
            e.target.classList.add('active');

            while (node) {
                node.classList.add('visible');
                node = node.nextElementSibling;
            }
        });

        item.addEventListener('mouseenter', () => {
            item.addEventListener('mouseleave', () => {
                let visibleItems = item.querySelectorAll('.visible');
                let activeItems = item.querySelectorAll('.active');

                visibleItems.forEach(i => i.classList.remove('visible'));
                activeItems.forEach(i => i.classList.remove('active'));
            });
        });

    });
}

function counterUp(data) {
    let elements = document.querySelectorAll('.counter'),
        duration = 2000,
        step = 100,
        factSection = document.querySelector('#facts');

    let count = function () {
        if (window.scrollY + window.innerHeight > factSection.offsetTop) {
            for (let i = 0; i < elements.length; i++) {
                let grow = data[i].number > step ? Math.floor(data[i].number / step) : Math.floor(-data[i].number / step);
                elements[i].textContent = `${data[i].skaitliukas}`;
                data[i].skaitliukas += grow;

                if (data[i].skaitliukas > data[i].number) {
                    data[i].skaitliukas = data[i].number;
                    clearInterval(this);
                }
            }
        }
    };

    setInterval(count, duration / step);
}

function renderProjects(data) {
    let PROJECTS = '';
    let categories = [];
    let CATEGORIES = [];

    for (let i = 0; i < data.length; i++) {
        let project = data[i];

        PROJECTS += `
            <div class="col-4 visible" data-category="${project.category}">
                <div class="project-photo">
                    <div class="overlay"></div>
                    <img src="./img/gallery/${project.img}" alt="Project image">
                </div>
                <h4>${project.title}</h4>
                <div class="project-category">${project.text}</div>
            </div>
        `;

        if (categories.indexOf(project.category) === -1) {
            if (i === 0) {
                categories.push('All');
                CATEGORIES = '<div class="filter active">All</div>';
            }

            categories.push(project.category);

            CATEGORIES += `<div class="filter">${project.category}</div>`;
        }
    }

    document.querySelector('.project-categories > .col').innerHTML = CATEGORIES;

    return document.querySelector('.projects .row.flex').innerHTML = PROJECTS;
}

function filterGallery() {
    let categories = document.querySelectorAll('.project-categories > .col > .filter');

    categories.forEach((item) => {
        item.addEventListener('click', (event) => {
            let category = event.target.textContent;

            event.preventDefault();

            document.querySelector('.project-categories > .col > .active').classList.remove('active');
            event.target.classList.add('active');

            let projects = document.querySelectorAll('.projects .row.flex > .col-4');

            projects.forEach((project) => {
                if (category === 'All') {
                    project.classList.add('visible');
                } else {
                    if (project.dataset.category === category) {
                        project.classList.add('visible');
                    } else {
                        project.classList.remove('visible');
                    }
                }
            });
        });
    });
}

function zoomProject() {
    document.querySelectorAll('.project-photo').forEach((project, index) => {

        project.addEventListener('click', (event) => {
            let node = document.createElement('div');
            let length = projects.length;
            let INDEX = index;

            node.className = 'gallery-zoom';
            node.innerHTML = `
                <div class="gallery-close"></div>
                <span class="lnr lnr-arrow-left-circle" data-side="left"></span>
                <div class="showing">
                    <span class="lnr lnr-cross-circle"></span>
                    <figure>
                        <img src="./img/gallery/${projects[index].img}" alt="Project" data-side="right">
                        <figcaption>${index + 1} of ${length}</figcaption>
                    </figure>
                </div>
                <span class="lnr lnr-arrow-right-circle" data-side="right"></span>
            `;

            document.body.appendChild(node);

            let x = document.querySelector('.showing > .lnr-cross-circle');

            if (x !== null) {
                x.addEventListener('click', () => {
                    document.querySelector('.gallery-zoom').remove();
                });

                document.addEventListener('keydown', (event) => {
                    if (event.key === "Escape") {
                        if (document.querySelector('.gallery-zoom')) {
                            document.querySelector('.gallery-zoom').remove();
                        }
                    }
                });

                document.querySelector('.gallery-close').addEventListener('click', () => {
                    document.querySelector('.gallery-zoom').remove();
                });
            }

            document.querySelectorAll('.lnr-arrow-right-circle, .lnr-arrow-left-circle, figure img').forEach(item => {
                item.addEventListener('click', (event) => {
                    if (item.dataset.side === 'right') {

                        if (INDEX === length - 1) {
                            INDEX = -1;
                        }
                        INDEX++;

                        let photo = `./img/gallery/${projects[INDEX].img}`;

                        document.querySelector('figure img').setAttribute('src', photo);
                        document.querySelector('figcaption').innerHTML = `${INDEX + 1} of ${length}`;
                    }
                    if (item.dataset.side === 'left') {
                        if (INDEX === 0) {
                            INDEX = length;
                        }
                        INDEX--;

                        let photo = `./img/gallery/${projects[INDEX].img}`;

                        document.querySelector('figure img').setAttribute('src', photo);
                        document.querySelector('figcaption').innerHTML = `${INDEX + 1} of ${length}`;
                    }
                });
            });
        });
    });
}

// function renderFeedback(data) {
//     // clone feedbacks [1, 2, 3, 4]
//     // add 1 in front
//     // add 1 in back
//     data = [data[data.length - 1], ...data, data[0]];

//     // first original feedback element
//     let firstOriginalFeedback = 1;

//     let HTML = '';
//     for (let i = 0; i < data.length; i++) {
//         let feed = data[i];

//         HTML += `<div class="col-6 flex feed"
//                       data-index="${i}"
//                       style="flex-basis: ${100 / data.length}%;">
//                     <div class="row">
//                         <div class="col">
//                             <img src="./img/user/${feed.clientImg}" alt="User photo">
//                         </div>
//                     </div>
//                     <div class="row">
//                         <div class="col">
//                             <p>${feed.clientComment}</p>
//                             <h4>${feed.clientName}</h4>
//                             <p>${feed.clientPosition}</p>
//                         </div>
//                     </div>
//                 </div>`;
//     }

//     let FEEDS = `<div class="row flex row-center feeds"
//                       style="width: ${100 * (data.length / 2)}%;
//                       margin-left: -${(firstOriginalFeedback * 100) / 2}%">
//                     ${HTML}
//                 </div>`;

//     return document.querySelector('.testimonial').innerHTML = FEEDS;
// }

// function changeFeed() {
//     let arrows = document.querySelectorAll('.feedback-btn .lnr');
//     const list = document.querySelector('.feeds');
//     let currentFeedbackIndex = parseInt(list.style.marginLeft) / -50;
//     const length = document.querySelectorAll('.feed').length;
//     const duration = 1000;
//     const steps = 100;
//     // let directionIndex = 1;

//     arrows.forEach((arrow) => {
//         arrow.addEventListener('click', () => {
//             const direction = arrow.dataset.direction;

//             if (direction === 'left') {
//                 // directionIndex = 1;
//                 currentFeedbackIndex--;
//                 if (currentFeedbackIndex === 0) {
//                     currentFeedbackIndex = length - 2;
//                 }
//             }
//             if (direction === 'right') {
//                 // directionIndex = -1;
//                 currentFeedbackIndex++;
//                 if (currentFeedbackIndex === length - 1) {
//                     currentFeedbackIndex = 1;
//                 }
//             }

//             list.style.marginLeft = -currentFeedbackIndex * 50 + '%';

//             // let step = 0;
//             // const timer = setInterval(() => {
//             //     if (step <= steps) {
//             //         list.style.marginLeft = - ( currentFeedbackIndex - directionIndex / steps * step ) * 50 +'%';
//             //         step++;
//             //     } else {
//             //         clearInterval(timer);
//             //     }
//             // }, duration / steps);
//         })
//     });

// }

function renderPlans(data) {
    let HTML = '';

    for (let i = 0; i < data.length; i++) {
        let plan = data[i];

        let options = '';
        for (let j = 0; j < plan.options.length; j++) options += `<p>${plan.options[j]}</p>`;

        HTML += `
            <div class="col-3">
                <h3>${plan.num}</h3>
                <h4>${plan.name}</h4>
                <p>${plan.dedicated}</p>
                ${options}
                <h6>${plan.cost}</h6>
                <a class="text-uppercase" href="#">${plan.button}</a>
            </div>
        `;
    }
    return document.querySelector('.plans .row.flex').innerHTML = HTML;
}

// function renderBlog(data) {
//     let HTML = '';

//     for (let i = 0; i < data.length; i++) {
//         let post = data[i];

//         HTML += `
//             <div class="col-4">
//                 <div class="row photo">
//                     <img src="./img/blog/${post.imgPhoto}" alt="Blog post photo">
//                 </div>
//                 <div class="row flex post-info">
//                     <div class="col flex row-center person">
//                         <img src="./img/user/${post.imgUser}" alt="User photo">
//                         <a href="#">${post.user}</a>
//                     </div>
//                     <div class="col flex row-center meta">
//                         <p>
//                             <time datetime="${post.time}">${post.date}</time>
//                         </p>
//                         <span>
//                             <i class="lnr lnr-heart"></i>
//                             ${post.likes}
//                         </span>
//                         <span>
//                             <i class="lnr lnr-bubble"></i>
//                             ${post.comments}
//                         </span>
//                     </div>
//                 </div>
//                 <div class="row post">
//                     <a href="${post.link}">
//                         <h4>${post.title}</h4>
//                     </a>
//                     <p>${post.text}</p>
//                 </div>
//             </div>
//         `;
//     }

//     return document.querySelector('.posts .row.flex').innerHTML = HTML;
// }

function renderBrands() {
    clearInterval(timer);
    let HTML = '', BRANDS = '';
    updateBrandsCarouselData();

    data.forEach(item => BRANDS += `<div class = "col" style="flex-basis: ${itemWidth}px;"><a href="#"><img src="./img/brands/${item.img}" alt="Brand logo"></a></div>`);
    HTML = `<div class="row flex" style="width: ${data.length * itemWidth}px; margin-left: ${-firstItemIndex * itemWidth}px">${BRANDS}</div>`;

    target.innerHTML = HTML;
    timer = setInterval(move, delay);
}

function updateBrandsCarouselData() {
    targetWidth = parseInt(getComputedStyle(target).width);
    maxElements = Math.floor(targetWidth / minItemWidth);
    itemWidth = targetWidth / maxElements;
    minus = itemWidth / steps;
    data = [
        ...brands.slice(brands.length - maxElements),
        ...brands,
        ...brands.slice(0, maxElements),
    ];
}

function move() {
    if (wait) {
        if (++s > delayMultipy) {
            clearInterval(timer);
            wait = false;
            timer = setInterval(move, time / steps);
        }
    } else {
        if (steps >= ++i) document.querySelector('.brands .row').style.marginLeft = `calc( ${-firstItemIndex * itemWidth}px - ${minus * i}px )`;
        else {
            clearInterval(timer);
            s = 0, i = 0, wait = true;
            timer = setInterval(move, delay);
            if (++firstItemIndex === data.length - maxElements) firstItemIndex = maxElements;
        }
    }
}

/* not working. coding in progress */
// function dragBrands() {
//     let row = document.querySelector('.brands > .container > .row');
//     row.addEventListener('drag', () => {
//         console.log('mousedown');
//         row.addEventListener('mouseover', dragBrands, true);
//     });


//     row.addEventListener('mouseup', () => {
//         console.log('mouseUP');
//         row.removeEventListener('mouseover', dragBrands, true);
//     });

//     console.log(event.clientX);
//     // document.querySelector('.brands img').draggable = false;
//     if (event.offsetX <= xxx) {
//         // console.log('draging to right' + xxx);
//         // row.style.marginLeft = (ml + (1)) + '%';
//     }
//     if (event.offsetX >= xxx) {
//         // console.log('draggin to left' + xxx);
//         // let ml = parseInt(row.style.marginLeft);
//         // row.style.marginLeft = (ml + (-1)) + '%';
//     }

//     /*if (typeof lastX !== 'undefined') {
//         var diff = lastX - event.clientX;
//         let ml = parseFloat(row.style.marginLeft);

//         if (diff > 0) {
//             row.style.marginLeft = ml - diff/11 + '%';
//         }
//         if (diff < 0) {
//             row.style.marginLeft = ml - diff/11 + '%';
//         }

//     } else console.log('undifineeeeeeed');*/

//     lastX = event.clientX;
// }