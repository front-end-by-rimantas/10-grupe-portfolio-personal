function renderAchievements() {
    return;
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
    let elements = document.querySelectorAll('.counter'),
        duration = 3000,
        step = 100;
    let count = function() {
        for (let i = 0; i < elements.length; i++){
            elements[i].textContent = `${data[i].skaitliukas}`;
            let grow = data[i].number > step ? Math.floor(data[i].number / step) : Math.floor(-data[i].number / step);
            data[i].skaitliukas += grow;
            if (data[i].skaitliukas >= data[i].number) {
                data[i].skaitliukas = data[i].number;
                clearInterval(this);
            }
        }
    }; 
    setInterval(count, duration / step);
    return;
}