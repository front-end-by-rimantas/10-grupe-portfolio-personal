var t0 = performance.now();

renderNavigation( navigation_links, 'nav' );
renderNavigation( navigation_links, '.mobile-nav' );
navigationFunctionality();
renderServices ( services );

var t1 = performance.now();
console.log("" + (t1 - t0) + "ms");