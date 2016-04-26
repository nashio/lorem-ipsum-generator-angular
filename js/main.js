
// declare a module
var app = angular.module('myApp', []);

app.factory('generate', function(){
    return {
        mixed: function(s, callback){
           var numSentences = s.maxSentences; 
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
        typical : ['lorem', 'ispum', 'perspiciatis', 'sda','dolores','Neque', 'ispum', 'consectetu', 'adipisci','velit','ddd', 'alacran', 'asda', 'sda','bbb','ddd'],
        hybrid : ['exercitationem','adipisci', 'inventore', 'veritatis et' ,'quasi'],
        clasic : ['voluptatem','commod','gasda','beatae','aperiam','produces'] 
    };
    $scope.generate = function() {

        // Using a factory
        generate.mixed({
            minWords : 1, 
            maxWords : 100, 
            minSentences : this.minSentences | 1, 
            maxSentences : this.maxSentences | 1, 
            numParagraphs : this.numParagraphs | 1,
            data : $scope.seeds["typical"]
        }, function(result){
            $scope.content = { "paragraphs" : result };
        });
    };

}
