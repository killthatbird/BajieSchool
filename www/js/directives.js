angular.module('directives', [])
  .directive('compare',function(){
    var o = {};
    o.strict = 'AE';
    o.scope = {
      orgText: '=compare'
    }
    o.require = 'ngModel';
    o.link = function(sco, ele, att, con){
      con.$validators.compare = function(v){
        return v == sco.orgText;
      }

      sco.$watch('orgText', function(){
        con.$validate();
      })
    }
    return o;
  })
  .directive('pane', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {user: '@'},
      template: '回复<a style="border: 1px solid black;">{{user}}</a>'
    };
  });
