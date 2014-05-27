
// declare a module
var app = angular.module('myApp', []);

app.factory('generate', function(){
    return {
        mixed: function(s, callback){
           var numSentences = s.maxSentences; 
           //parseInt( Math.random() * (s.maxSentences - s.minSentences) + s.minSentences + 1);
           var numWords     = parseInt( Math.random(s.maxWords - s.minWords) + s.minWords + 1);
           var result       = "";
           var paragraphs   = [];

           for(var p = 0; p < s.numParagraphs; p++) {
               result = "<p>";
               for(var sn = 0; sn < numSentences; sn++) {
                   for(var w = 0; w < numWords; w++){
                       if(w > 0) result += " ";
                       result += s.data[parseInt( Math.random() * s.data.length ) ];
                   }
                   result += ". ";
               }
               result += "</p>";
               paragraphs.push(result);
           }
           callback(paragraphs);
       }
       
    }
});

function LoremCtrl($scope, generate) {

    $scope.seeds = {
        mexican : ['lorem', 'ispum', 'asda', 'sda','bbb','ddd', 'ispum', 'arroz', 'tortilla','bbb','ddd', 'alacran', 'asda', 'sda','bbb','ddd'],
        hybrid : ['lorem2','asdasd','gasda','rsder','asdas','bbsdf'],
        clasic : ['lorem2','asdasd','gasda','rsder','asdas','bbsdf'] 
    };
    $scope.generate = function() {

        // Using a factory
        generate.mixed({
            minWords : 1, 
            maxWords : 100, 
            minSentences : this.minSentences | 1, 
            maxSentences : this.maxSentences | 1, 
            numParagraphs : this.numParagraphs | 1,
            data : $scope.seeds["mexican"]
        }, function(result){
            $scope.content = { "paragraphs" : result };
        });
    };

}
