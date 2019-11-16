renderNavigation('header nav');
renderNavigation('.mobile-nav');
navigationFunctionality();

renderServices(services);

renderFacts(facts);
counterUp(facts);

// renderFeedback(feedbacks);
// changeFeed();

renderPlans(plans);

renderProjects(projects);
filterGallery();
zoomProject();

renderBlog(blog_posts);

renderBrands();
window.addEventListener('resize', renderBrands);