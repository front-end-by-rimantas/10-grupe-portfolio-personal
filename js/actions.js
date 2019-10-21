var t0 = performance.now();
/* ^^^^^^^^^^^^^^^^^^^^^ */

renderNavigation('nav' );
renderNavigation('.mobile-nav' );
navigationFunctionality();

renderServices ( services );

renderFacts( facts );
counterUp( facts );
// renderFeedback(feedbacks);
// changeFeed();
renderPlans(plans);

renderProjects( projects );
filterGallery();
zoomProject();

renderBlog( blog_posts );

renderBrands();
brandsFunctionality();
/* ^^^^^^^^^^^^^^^^^^^^^ */
var t1 = performance.now();
console.log("" + (t1 - t0) + "ms");