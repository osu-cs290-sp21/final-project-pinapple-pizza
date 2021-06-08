(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['queueEntry'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<td class=\"close-button-cell\"><button type=\"button\" class=\"queue-remove-button\" onclick=\"queueRemoveClicked("
    + alias4(((helper = (helper = lookupProperty(helpers,"position") || (depth0 != null ? lookupProperty(depth0,"position") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data,"loc":{"start":{"line":6,"column":128},"end":{"line":6,"column":140}}}) : helper)))
    + ", '"
    + alias4(((helper = (helper = lookupProperty(helpers,"password") || (depth0 != null ? lookupProperty(depth0,"password") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"password","hash":{},"data":data,"loc":{"start":{"line":6,"column":143},"end":{"line":6,"column":155}}}) : helper)))
    + "')\"><i class=\"fas fa-times\"></i></button></td>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
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
    + "</td>\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"password") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":6,"column":208}}})) != null ? stack1 : "")
    + "\n</tr>";
},"useData":true});
})();