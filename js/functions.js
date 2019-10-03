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

function renderNavigation ( data, target ) {
    let LINKS = '';

    for (let i = 0; i < data.length; i++) {
        let d       = data[i];
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

    var liHasDropdown = document.querySelectorAll('nav > ul li.has-dropdown');

    liHasDropdown.forEach( ( item ) => {
        item.addEventListener('click', ( event ) => {
            let child = item.querySelector('ul');

            if( child !== null) {
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