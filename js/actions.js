renderNavigation('header nav');
renderNavigation('.mobile-nav');
navigationFunctionality();

// renderFeedback(feedbacks);
// changeFeed();

renderPlans(plans);
renderProjects(projects);
filterGallery();
zoomProject();

renderBrands();
window.addEventListener('resize', renderBrands);

htmlTemplate('.services > .row.flex', services);
htmlTemplate('.facts > .row.flex', facts);
counterUp(facts);
htmlTemplate('.posts .row.flex', blog_posts);