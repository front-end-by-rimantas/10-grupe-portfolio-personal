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
    document.querySelector('.lnr-menu').addEventListener('click', ( item ) => {
        item.target.classList.toggle('lnr-menu');
        item.target.classList.toggle('lnr-cross');

        document.querySelector('.mobile-overlay').classList.toggle('visible');
        document.querySelector('.mobile-nav').classList.toggle('visible');
    });

    var liHasDropdown = document.querySelectorAll('nav > ul > li.has-dropdown');

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

function renderFacts(data) {
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

function counterUp(data) {
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