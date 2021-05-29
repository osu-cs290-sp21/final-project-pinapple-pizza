(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['question'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<article class=\"post\">\n    <div class=\"question-content\">\n        <p class=\"content\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"content") || (depth0 != null ? lookupProperty(depth0,"content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":23}}}) : helper)))
    + "\n        </p>\n        <p class=\"author\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"author") || (depth0 != null ? lookupProperty(depth0,"author") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":7,"column":22}}}) : helper)))
    + "\n        </p>\n    </div>\n</article>";
},"useData":true});
})();