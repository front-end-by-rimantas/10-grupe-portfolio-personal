var t0 = performance.now();
/* ^^^^^^^^^^^^^^^^^^^^^ */

renderNavigation( navigation_links, 'nav' );
renderNavigation( navigation_links, '.mobile-nav' );
navigationFunctionality();

renderServices ( services );

renderFacts( facts );
counterUp( facts );
renderFeedback(feedbacks);
changeFeed();
renderPlans(plans);

renderBlog( blog_posts );

/* ^^^^^^^^^^^^^^^^^^^^^ */
var t1 = performance.now();
console.log("" + (t1 - t0) + "ms");