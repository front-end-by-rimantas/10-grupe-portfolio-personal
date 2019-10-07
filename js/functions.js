function renderServices( data ) {
    let HTML = '';

    for (let i = 0; i < data.length; i++) {
        let service = data[i];

        HTML += `
            <div class="col-4">
                <div class="service">
                    <i class="lnr lnr-${service.icon}"></i>
                    <h3>${service.category}</h3>
                    <p>${service.text}</p>
                </div>
            </div>
        `;
    }

    return document.querySelector('.services .row.flex').innerHTML = HTML;
}

function renderNavigation ( target ) {
    let LINKS = '';

    for (let i = 0; i < navigation_links.length; i++) {
        let d       = navigation_links[i];
        let aClass  = d.hasOwnProperty('aClass')
                    ? `class="${d.aClass}" `
                    : '';
        let liClass = d.hasOwnProperty('liClass')
                    ? `class="${d.liClass}" `
                    : '';
        let CHILD   = '';

        CHILD = addChild( d );

        LINKS += `
            <li ${liClass}>
                <a ${aClass}href="#">${d.title}</a>
                ${CHILD}
            </li>
        `;
    }

    let flex = target === 'nav' ? 'class="flex" ' : '';

    let HTML = `
        <ul ${flex}>
            ${LINKS}
        </ul>
    `;

    return document.querySelector(target).innerHTML = HTML;
}

function addChild ( array ) {
    let LINKS   = '';
    let HTML    = '';

    if (array.hasOwnProperty('childs')) {
        for (let i = 0; i < array.childs.length; i++) {
            let child = array.childs[i];
            let aClass = child.hasOwnProperty('aClass')
                ? `class="${child.aClass}" `
                : '';
            let liClass = child.hasOwnProperty('liClass')
                ? `class="${child.liClass}" `
                : '';
            let CHILD = addChild( child );

            LINKS += `
                <li ${liClass}>
                    <a ${aClass}href="${child.link}">${child.title}</a>
                    ${CHILD}
                </li>
            `;
        }

        HTML = `
            <ul>
                ${LINKS}
            </ul>
        `;
    }

    return HTML;
}

function navigationFunctionality() {
    document.addEventListener('scroll', ( ) => {
        let element = document.querySelector('header').classList;
        if (window.scrollY > 100) {
            element.add('shadow');
        }

        if (window.scrollY < 100) {
            element.remove('shadow');
        }
    })

    document.querySelector('.lnr-menu').addEventListener('click', ( item ) => {
        item.target.classList.toggle('lnr-menu');
        item.target.classList.toggle('lnr-cross');

        document.querySelector('.mobile-overlay').classList.toggle('visible');
        document.querySelector('.mobile-nav').classList.toggle('visible');
    });

    var liHasDropdown = document.querySelectorAll('nav > ul > li.has-dropdown');

    liHasDropdown.forEach((item) => {
        item.addEventListener('click', (event) => {
            let child = event.toElement.nextElementSibling;

            if (child !== null) {
                child.classList.toggle('visible');
            }
        });
    });

    document.querySelectorAll('nav > ul.flex li').forEach( ( item ) => {
        item.addEventListener('mouseenter', ( enter ) => {
            var liList = document.querySelectorAll('ul.flex > li.has-dropdown');

            liList.forEach((item) => {
                if (item.querySelector('a').textContent !== enter.target.querySelector('a').textContent) {
                    liList.forEach( ( li ) => {
                        if (li.querySelector('a').textContent === enter.target.querySelector('a').textContent) {
                            item.querySelector('ul').classList.remove('visible');
                        }
                    });
                }
            });

            // HOVER LI
            let child = enter.target.querySelector('ul');

            // LI HAVE UL
            if(child !== null) {
                let childLi = child.querySelector('li.has-dropdown');

                // LEAVE CHILD LI
                if(childLi !== null) {
                    childLi.addEventListener('mouseleave', ( leaved ) => {
                        let neighbour = enter.target.querySelector('li:not(.has-dropdown)');

                        if (neighbour !== null) {
                            neighbour.addEventListener('mouseenter', () => {
                                childLi.querySelector('ul').classList.remove('visible');
                            });
                        }

                    });
                }

                child.classList.add('visible');

                // LEAVE LI UL
                child.addEventListener('mouseleave', () => {
                    child.classList.remove('visible');
                });
                // LEAVE HEADER
                document.querySelector('header').addEventListener('mouseleave', () => {
                    child.classList.remove('visible');
                });
            } else {
                let liList = document.querySelectorAll('nav > ul.flex > li:not(.has-dropdown)');

                liList.forEach( ( item ) => {
                    // HOVER LI WITHOUT UL
                    item.addEventListener('mouseenter', () => {
                        let ulList = document.querySelectorAll('nav > ul.flex > li.has-dropdown ul');

                        ulList.forEach( ( ul ) => {
                            ul.classList.remove('visible');
                        });
                    });
                });
            }
        });
    });
}

function renderFacts( data ) {
    let HTML = '';

    data.forEach(fact => {
        if(typeof(fact.number) === 'string' || fact.title === undefined || fact.title.length === 0) {
            return;
        }

        HTML += `<div class="col-3">
                    <h4 class="counter">${fact.number}</h4>
                    <p>${fact.title}</p>
                </div>`;
    });

    return document.getElementById('facts').innerHTML = HTML;
}

function counterUp( data ) {
    let elements    = document.querySelectorAll('.counter'),
        duration    = 2000,
        step        = 100,
        factSection = document.querySelector('#facts');

    let count = function() {
        if (window.scrollY + window.innerHeight > factSection.offsetTop){
            for (let i = 0; i < elements.length; i++){
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

function renderProjects( data ) {
    let PROJECTS    = '';
    let categories  = [];
    let CATEGORIES  = [];

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

    categories.forEach( ( item ) => {
        item.addEventListener('click', ( event ) => {
            let category = event.target.textContent;

            event.preventDefault();

            document.querySelector('.project-categories > .col > .active').classList.remove('active');
            event.target.classList.add('active');

            let projects = document.querySelectorAll('.projects .row.flex > .col-4');

            projects.forEach( ( project ) => {
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
    document.querySelectorAll('.project-photo').forEach( ( project, index ) => {

        project.addEventListener('click', ( event ) => {
            let node    = document.createElement('div');
            let length  = projects.length;
            let INDEX = index;

            node.className = 'gallery-zoom';
            node.innerHTML = `
                <div class="gallery-close"></div>
                <span class="lnr lnr-arrow-left-circle" data-side="left"></span>
                <div class="showing">
                    <span class="lnr lnr-cross-circle"></span>
                    <figure>
                        <img src="./img/gallery/${projects[index].img}" alt="Project" data-side="right">
                        <figcaption>${index+1} of ${length}</figcaption>
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

                document.addEventListener('keydown', ( event ) => {
                    if( event.key === "Escape") {
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
                    if (item.dataset.side === 'right' ) {

                        if (INDEX === length-1) {
                            INDEX = -1;
                        }
                        INDEX++;

                        let photo = `./img/gallery/${projects[INDEX].img}`;

                        document.querySelector('figure img').setAttribute('src', photo);
                        document.querySelector('figcaption').innerHTML = `${INDEX+1} of ${length}`;
                    }
                    if( item.dataset.side === 'left' ) {
                        if (INDEX === 0) {
                            INDEX = length;
                        }
                        INDEX--;

                        let photo = `./img/gallery/${projects[INDEX].img}`;

                        document.querySelector('figure img').setAttribute('src', photo);
                        document.querySelector('figcaption').innerHTML = `${INDEX+1} of ${length}`;
                    }
                });
            });
        });
    });
}

function renderFeedback(data) {
    // clone feedbacks [1, 2, 3, 4]
    // add 1 in front
    // add 1 in back
    data = [  data[data.length-1], ...data, data[0] ];

    // first original feedback element
    let firstOriginalFeedback = 1;
    
    let HTML = '';
    for (let i = 0; i < data.length; i++){
        let feed = data[i];
        
        HTML += `<div class="col-6 flex feed" 
                      data-index="${i}" 
                      style="flex-basis: ${100 / data.length}%;">
                    <div class="row">
                        <div class="col">
                            <img src="./img/user/${feed.clientImg}" alt="User photo">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>${feed.clientComment}</p>
                            <h4>${feed.clientName}</h4>
                            <p>${feed.clientPosition}</p>
                        </div>
                    </div>
                </div>`;
    }

    let FEEDS = `<div class="row flex row-center feeds" 
                      style="width: ${100 * (data.length / 2)}%;
                      margin-left: -${(firstOriginalFeedback * 100) / 2}%">
                    ${HTML}
                </div>`;
 
    return document.querySelector('.testimonial').innerHTML = FEEDS;
}

function changeFeed() {
    let arrows = document.querySelectorAll('.feedback-btn .lnr');
    const list = document.querySelector('.feeds');
    let currentFeedbackIndex = parseInt(list.style.marginLeft) / -50;
    const length = document.querySelectorAll('.feed').length; 
    const duration = 1000;
    const steps = 100;   
    // let directionIndex = 1;
    
    arrows.forEach((arrow) => {
        arrow.addEventListener('click', () => {
            const direction = arrow.dataset.direction;
            
            if (direction === 'left') {
                // directionIndex = 1;
                currentFeedbackIndex--;
                if (currentFeedbackIndex === 0){
                    currentFeedbackIndex = length - 2;
                } 
            }
            if (direction === 'right') {
                // directionIndex = -1;
                currentFeedbackIndex++;
                if (currentFeedbackIndex === length - 1){
                    currentFeedbackIndex = 1;
                } 
            }

            list.style.marginLeft = -currentFeedbackIndex * 50 +'%';
            
            // let step = 0;
            // const timer = setInterval(() => {
            //     if (step <= steps) {
            //         list.style.marginLeft = - ( currentFeedbackIndex - directionIndex / steps * step ) * 50 +'%';
            //         step++;
            //     } else {
            //         clearInterval(timer);
            //     }
            // }, duration / steps);
        })
    });
            
}

function renderPlans(data) {
    let HTML = '';

    for (let i = 0; i < data.length; i++){
        let plan = data[i];

        let options = '';
        for(let j = 0; j < plan.options.length; j++){
            options += `<p>${plan.options[j]}</p>`;
        }

        HTML += `<div class="col-3">
                    <h3>${plan.num}</h3>
                    <h4>${plan.name}</h4>
                    <p>${plan.dedicated}</p>
                    ${options}
                    <h6>${plan.cost}</h6>
                    <a class="text-uppercase" href="#">${plan.button}</a>
                </div>`;
    }
    return document.querySelector('.plans .row.flex.text-center').innerHTML = HTML;
}

function renderBlog( data ) {
    let HTML = '';

    for (let i = 0; i < data.length; i++) {
        let post = data[i];

        HTML += `
            <div class="col-4">
                <div class="row photo">
                    <img src="./img/blog/${post.imgPhoto}" alt="Blog post photo">
                </div>
                <div class="row flex post-info">
                    <div class="col flex row-center person">
                        <img src="./img/user/${post.imgUser}" alt="User photo">
                        <a href="#">${post.user}</a>
                    </div>
                    <div class="col flex row-center meta">
                        <p>
                            <time datetime="${post.time}">${post.date}</time>
                        </p>
                        <span>
                            <i class="lnr lnr-heart"></i>
                            ${post.likes}
                        </span>
                        <span>
                            <i class="lnr lnr-bubble"></i>
                            ${post.comments}
                        </span>
                    </div>
                </div>
                <div class="row post">
                    <a href="${post.link}">
                        <h4>${post.title}</h4>
                    </a>
                    <p>${post.text}</p>
                </div>
            </div>
        `;
    }

    return document.querySelector('.posts .row.flex').innerHTML = HTML;
}

function countInRow(params) {
    if (window.matchMedia("(min-width: 1200px)").matches)   showInRow = 5;
    if (window.matchMedia("(max-width: 992px)").matches)    showInRow = 4;
    if (window.matchMedia("(max-width: 768px)").matches)    showInRow = 3;
    if (window.matchMedia("(max-width: 576px)").matches)    showInRow = 2;
}

function renderBrands() {
    BRANDS  = '';
    HTML    = '';

    countInRow();
    window.addEventListener('resize', renderBrands);

    let brandsCount = brands.length;
        showInRow = (showInRow > brandsCount) ? brandsCount : showInRow;
        showWidth = 100 / showInRow;
        position = showInRow + 1;
    let data        = [
        ...brands.slice(brands.length - showInRow),
        ...brands,
        ...brands.slice(0, showInRow),
    ];
        count       = data.length;
    let colWidth    = 100 / count;
    let middle      = Math.round(data.length / 2)-showInRow;
    let showMiddle  = middle - showInRow * showWidth;
    let rowWidth    = count / showInRow * 100;

    data.forEach( ( item, index ) => {
        BRANDS += `
            <div class="col" data-index="${index}" style="flex-basis: ${colWidth}%">
                <a href="${item.link}"><img src="./img/brands/${item.img}" alt="Brand logo"></a>
            </div>
        `;
    });

    HTML = `
        <div class="row flex" style="width: ${rowWidth}%;margin-left: ${showMiddle}%">
            ${BRANDS}
        </div>
    `;

    return document.querySelector('.brands > .container').innerHTML = HTML;
}

/* not working. coding in progress */
function dragBrands() {
    let row = document.querySelector('.brands > .container > .row');
    // row.addEventListener('drag', () => {
    //     console.log('mousedown');
    //     row.addEventListener('mouseover', dragBrands, true);
    // });


    // row.addEventListener('mouseup', () => {
    //     console.log('mouseUP');
    //     row.removeEventListener('mouseover', dragBrands, true);
    // });

    // console.log(event.clientX);
    // // document.querySelector('.brands img').draggable = false;
    // if (event.offsetX <= xxx) {
    //     // console.log('draging to right' + xxx);
    //     // row.style.marginLeft = (ml + (1)) + '%';
    // }
    // if (event.offsetX >= xxx) {
    //     // console.log('draggin to left' + xxx);
    //     // let ml = parseInt(row.style.marginLeft);
    //     // row.style.marginLeft = (ml + (-1)) + '%';
    // }

    /*if (typeof lastX !== 'undefined') {
        var diff = lastX - event.clientX;
        let ml = parseFloat(row.style.marginLeft);

        if (diff > 0) {
            row.style.marginLeft = ml - diff/11 + '%';
        }
        if (diff < 0) {
            row.style.marginLeft = ml - diff/11 + '%';
        }

    } else console.log('undifineeeeeeed');*/

    lastX = event.clientX;
}

function brandsFunctionality() {
    setTimeout(function moveBrand() {
        timer = setInterval(moveBrands, time / step);

        setTimeout(() => {
            clearInterval(timer);
            setTimeout(moveBrand, setAfter);
        }, time);
    }, setAfter);
}

function moveBrands() {
    let row = document.querySelector('.brands > .container > .row');
    let ml = parseFloat(row.style.marginLeft);

    if (position > count - showInRow) {
        row.style.marginLeft = 0 + '%';
        position = 0;
        i = step;
    }

    if (i < step) {
        row.style.marginLeft = ml - (showWidth / step) + '%';
        i++;
    } else {
        position++;
        i = 0;
        clearInterval(timer);
        // row.style.marginLeft = Math.round(parseFloat(row.style.marginLeft).toFixed(3))+'%';
    }
}