!function(n,e){"use strict";var t=function(n,e){var t=n.find(".bdt-ep-advanced-divider"),i=t.data("settings");if(t.length)if(!0===i.animation)elementorFrontend.waypoint(t,(function(){var n=e(this).find("img");bdtUIkit.svg(n,{strokeAnimation:!0})}),{offset:"bottom-in-view",triggerOnce:!i.loop});else{var o=e(t).find("img");bdtUIkit.svg(o)}};jQuery(window).on("elementor/frontend/init",(function(){elementorFrontend.hooks.addAction("frontend/element_ready/bdt-advanced-divider.default",t)}))}(jQuery,window.elementorFrontend);