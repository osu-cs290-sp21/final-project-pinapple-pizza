(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['queueEntry'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<tr>\n    <td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"position") || (depth0 != null ? lookupProperty(depth0,"position") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data,"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":20}}}) : helper)))
    + "</td>\n    <td class=\"name-cell\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":26},"end":{"line":3,"column":34}}}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"roomNumber") || (depth0 != null ? lookupProperty(depth0,"roomNumber") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"roomNumber","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":22}}}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"reqType") || (depth0 != null ? lookupProperty(depth0,"reqType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reqType","hash":{},"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":19}}}) : helper)))
    + "</td>\n</tr>";
},"useData":true});
})();