renderAchievements( achievements );

renderFacts(facts);

window.addEventListener('scroll', function(){
    let factSection = document.querySelector('#facts');
    if (window.scrollY + window.innerHeight > factSection.offsetTop){
        counterUp(facts);
    }
});