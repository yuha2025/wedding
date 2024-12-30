!function(k){"use strict";var x={init:function(){k(x.ready),x.bindUIActions()},ready:function(){k(".wpforms-form").each(function(){var e=k(this);x.initDefaultValues(e),x.processConditionals(e,!1)})},initDefaultValues:function(e){e.find(".wpforms-conditional-field input, .wpforms-conditional-field select, .wpforms-conditional-field textarea").each(function(){var e=k(this),t=e.val(),i=e.attr("type"),o=e.prop("tagName");switch(-1<["SELECT","BUTTON"].indexOf(o)?o.toLowerCase():i){case"button":case"submit":case"reset":case"hidden":break;case"checkbox":case"radio":e.is(":checked")&&e.attr("data-default-value","checked");break;default:""!==t&&e.attr("data-default-value",t)}})},bindUIActions:function(){k(document).on("change",".wpforms-conditional-trigger input, .wpforms-conditional-trigger select",function(){x.processConditionals(k(this),!0)}),window.addEventListener("elementor/popup/show",function(){x.processConditionals(k(".elementor-popup-modal .wpforms-form"),!0)}),k(document).on("input paste",".wpforms-conditional-trigger input[type=text], .wpforms-conditional-trigger input[type=email], .wpforms-conditional-trigger input[type=url], .wpforms-conditional-trigger input[type=number], .wpforms-conditional-trigger textarea",function(){x.processConditionals(k(this),!0)}),k(document).on("tinymce-editor-init",function(e,t){t.id.startsWith("wpforms-")&&t.on("keyup",function(){x.processConditionals(k("#"+t.id),!0)})}),k(".wpforms-form").on("submit",function(){x.resetHiddenFields(k(this))})},resetHiddenFields:function(e){window.location.hash&&"#wpformsdebug"===window.location.hash&&console.log("Resetting hidden fields...");var i,o,n,a,s=k(e);s.find(".wpforms-conditional-hide :input").each(function(){switch(i=k(this),o=i.attr("type"),n=i.prop("tagName"),-1<["SELECT","BUTTON"].indexOf(n)?n.toLowerCase():o){case"button":case"submit":case"reset":case"hidden":break;case"checkbox":case"radio":i.closest("ul").find("li").removeClass("wpforms-selected"),(a=i.closest("div.wpforms-field-rating-items")).length&&a.find("label").removeClass("selected"),i.is(":checked")&&i.prop("checked",!1).trigger("change");break;case"select":x.resetHiddenSelectField.init(i);break;case"tel":i.val("").trigger("input");var e=i.closest(".wpforms-field").data("field-id"),t=i.siblings('[name="wpforms[fields]['+e+']"]').first();e&&i.data("ruleSmartPhoneField")&&0<t.length&&t.val("");break;default:""!==i.val()&&(i.hasClass("dropzone-input")&&k('[data-name="'+i[0].name+'"]',s)[0]&&k('[data-name="'+i[0].name+'"]',s)[0].dropzone.removeAllFiles(!0),i.val("").trigger("input"))}}),s.find(".wpforms-field-richtext.wpforms-conditional-hide").each(function(){var e=tinyMCE.get("wpforms-"+k(this).closest(".wpforms-form").data("formid")+"-field_"+k(this).data("field-id"));if(!e)return"";e.setContent("")}),s.find(".wpforms-field-file-upload.wpforms-conditional-hide").each(function(){var e=k(this).find("div.wpforms-uploader.dz-clickable");if("function"!=typeof window.Dropzone||!e.length)return"";e.get(0).dropzone.removeAllFiles(!0)})},resetHiddenSelectField:{$field:null,init:function(e){(this.$field=e).data("choicesjs")?this.modern():this.classic()},modern:function(){var e=this.$field.data("choicesjs"),t=e.getValue(!0);t&&t.length&&(e.removeActiveItems(),this.$field.trigger("change")),this.$field.prop("multiple")?k(e.input.element).removeClass(e.config.classNames.input+"--hidden"):(t=e.config.choices.filter(function(e){return e.placeholder}),Array.isArray(t)&&t.length&&e.setChoiceByValue(t[0].value))},classic:function(){var e=this.$field.find("option.placeholder").length?0:-1;e!==this.$field.prop("selectedIndex")&&this.$field.prop("selectedIndex",e).trigger("change")}},resetToDefaults:function(e){e.find(":input").each(function(){var e=k(this),t=e.attr("data-default-value"),i=e.attr("type"),o=e.prop("tagName");if(void 0!==t)switch(-1<["SELECT","BUTTON"].indexOf(o)?o.toLowerCase():i){case"button":case"submit":case"reset":case"hidden":break;case"checkbox":case"radio":"checked"===t&&(e.prop("checked",!0).closest("li").addClass("wpforms-selected"),e.trigger("change"));break;case"select":var n=e.data("choicesjs"),t=t.split(",");n?(t=t.filter(function(e){return""!==e}),n.getValue(!0)!==t&&(n.setChoiceByValue(t),e.trigger("change"))):e.val()!==t&&e.val(t).trigger("change");break;default:e.val()!==t&&e.val(t).trigger("input")}})},processConditionals:function(e,t){var i=k(e),o=i.closest(".wpforms-form"),n=o.data("formid"),a=!1;if("undefined"==typeof wpforms_conditional_logic||void 0===wpforms_conditional_logic[n])return!1;var s,r=wpforms_conditional_logic[n];for(s in r)if(r.hasOwnProperty(s)){window.location.hash&&"#wpformsdebug"===window.location.hash&&console.log("Processing conditionals for Field #"+s+"...");var l,d=r[s].logic,c=r[s].action,f=!1;for(l in d)if(d.hasOwnProperty(l)){var p,u=d[l],h=!0;for(p in u)if(u.hasOwnProperty(p)){var m,w=u[p],g="",v=!1,y="";if(window.location.hash&&"#wpformsdebug"===window.location.hash&&console.log(w),w.field){switch(y=(g=null==(g=x.getElementValueByRule(w,o))?"":g).toString().trim().toLowerCase(),m=w.value.toString().trim().toLowerCase(),w.operator){case"==":v=y===m;break;case"!=":v=y!==m;break;case"c":v=-1<y.indexOf(m)&&0<y.length;break;case"!c":v=-1===y.indexOf(m)&&0<m.length;break;case"^":v=0===y.lastIndexOf(m,0);break;case"~":v=-1!==y.indexOf(m,y.length-m.length);break;case"e":v=0===y.length;break;case"!e":v=0<y.length;break;case">":v=""!==(y=y.replace(/[^-0-9.]/g,""))&&x.floatval(y)>x.floatval(m);break;case"<":v=""!==(y=y.replace(/[^-0-9.]/g,""))&&x.floatval(y)<x.floatval(m)}if(!v){h=!1;break}}}h&&(f=!0)}window.location.hash&&"#wpformsdebug"===window.location.hash&&console.log("Result: "+f);var b=o.find("#wpforms-"+n+"-field_"+s+"-container"),C=b.closest(".wpforms-field-layout");f&&"hide"===c||!f&&"hide"!==c?(b.hide().addClass("wpforms-conditional-hide").removeClass("wpforms-conditional-show"),x.isInsideLayoutField(b)&&C.find("div.wpforms-conditional-hide").length===C.find(".wpforms-field").length&&C.hide().addClass("wpforms-conditional-hide").removeClass("wpforms-conditional-show"),a=!0):(i.closest(".wpforms-field").attr("id")!==b.attr("id")&&b.hasClass("wpforms-conditional-hide")&&x.resetToDefaults(b),b.show().removeClass("wpforms-conditional-hide").addClass("wpforms-conditional-show"),x.isInsideLayoutField(b)&&C.show().removeClass("wpforms-conditional-hide").addClass("wpforms-conditional-show"),i.trigger("wpformsShowConditionalsField")),k(document).trigger("wpformsProcessConditionalsField",[n,s,f,c])}a&&(x.resetHiddenFields(o),t)&&(window.location.hash&&"#wpformsdebug"===window.location.hash&&console.log("Final Processing"),x.processConditionals(i,!1)),k(document).trigger("wpformsProcessConditionals",[i,o,n])},getElementValueByRule:function(e,t){return t.find("#wpforms-"+t.data("formid")+"-field_"+e.field).data("choicesjs")&&(e.value=e.value.toString().trim()),"e"===e.operator||"!e"===e.operator?x.getElementValueByEmptyTypeRules(e,t):x.getElementValueByOtherTypeRules(e,t)},getElementValueByEmptyTypeRules:function(e,t){var i,o=t.data("formid"),n="";if(e.value="",-1<["radio","checkbox","select","payment-multiple","payment-checkbox","rating","net_promoter_score"].indexOf(e.type))i="select"===e.type?"option:selected:not(.placeholder)":"input:checked",t.find("#wpforms-"+o+"-field_"+e.field+"-container "+i).length&&(n=!0);else{if("richtext"===e.type)return x.getRichTextValue(t,o,e.field);n=(n=t.find("#wpforms-"+o+"-field_"+e.field).val())||""}return n},getElementValueByOtherTypeRules:function(e,t){var i=t.data("formid"),o="";if(-1<["radio","checkbox","select","payment-multiple","payment-checkbox","rating","net_promoter_score"].indexOf(e.type)){var n,a="select"===e.type?"option:selected:not(.placeholder)":"input:checked";(a=t.find("#wpforms-"+i+"-field_"+e.field+"-container "+a)).length&&k.each(a,function(){n=x.escapeText(k(this).val()),-1<["checkbox","payment-checkbox","select"].indexOf(e.type)&&e.value!==n||(o=n)})}else{if("richtext"===e.type)return x.getRichTextValue(t,i,e.field);o=t.find("#wpforms-"+i+"-field_"+e.field).val(),-1<["payment-select"].indexOf(e.type)&&(o=x.escapeText(o))}return o},getRichTextValue:function(e,t,i){return e.find("#wpforms-"+t+"-field_"+i+"-container .wp-editor-wrap").hasClass("html-active")?e.find("#wpforms-"+t+"-field_"+i).val():(e=tinyMCE.get("wpforms-"+t+"-field_"+i))?e.getContent({format:"text"}):""},escapeText:function(e){var t;return null!=e&&e.length?(t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"},e.replace(/[&<>"']/g,function(e){return t[e]})):null},floatval:function(e){return parseFloat(e)||0},isInsideLayoutField:function(e){return e.parent().hasClass("wpforms-layout-column")}};x.init(),window.wpformsconditionals=x}(jQuery);