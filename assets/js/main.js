---
---

jQuery(document).ready(function() {
    getPageOnLoad();
    setupNavLinks();
});

/* SET-UP MAIN PAGE SWITCHING
 * ------------------------------------------------------------------------- */

// show the given page content
function showContentPage(page) {
    jQuery(".nav li.active").removeClass("active");
    jQuery(".nav a[href='" + page + "']").parent().addClass("active");
    document.title = "{{ site.name }} | " + capitalize(page.slice(1));
    jQuery(".content-page.active").fadeOut(250, function() {
        jQuery(this).removeClass("active");
        jQuery(page + "-page").addClass("active").fadeIn(250);
        jQuery("#resume-success").hide();
    });
}

// show the page given by the URL hash on site load
function getPageOnLoad() {
    var page = window.location.hash;
    switch (page) {
        case "#home":
        case "#projects":
        case "#blog":
        case "#resume":
        case "#contact":
            break;
        case "#resume-requested":
            jQuery("#resume-success").show();
            page = "#resume";
            break;
        default:
            page = "#home";
            break;
    }
    jQuery(".nav a[href='" + page + "']").parent().addClass("active");
    jQuery(page + "-page").addClass("active").fadeIn(500);
    document.title = "{{ site.name }} | " + capitalize(page.slice(1));
}

// make same-page links trigger site content change
function setupNavLinks() {
    jQuery('a[href^="#"]').each(function() {
        var page = jQuery(this).attr("href");
        jQuery(this).click(function(e) {
            e.preventDefault();
            window.location.hash = page;
            showContentPage(page);
        });
    });
}


/* UTILITY FUNCTIONS
 * ------------------------------------------------------------------------- */

// trim whitespace off ends of string
function trim(s) {
    var b = 0, e = s.length-1;
    while (s[b] == ' ') b++;
    while (e > b && s[e] == ' ') e--;
    return s.substring(b, e + 1);
}

// capitalize the first letter of the string
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
