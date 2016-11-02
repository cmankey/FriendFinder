
var friendsData = require('../data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function (request, response) {
        response.json(friendsData);
    });

    app.post('/api/friends', function (request, response) {
        var newFriend = request.body;
        friendsData.push(newFriend);
        var leastTotalDifference = 50;
        var bestMatch = [];

        if (friendsData.length > 1) {
                
            for (var i = 0; i < friendsData.length - 1; i++) {
                    
                var currentFriendScores = friendsData[i].scores;
                var totalDifference = 0;
                
                for (var j = 0; j < currentFriendScores.length; j++) {
                     totalDifference += Math.abs(currentFriendScores[j] - newFriend.scores[j]);
                }

                if (totalDifference < leastTotalDifference) {
                    leastTotalDifference = totalDifference;
                    bestMatch = [friendsData[i]];
                    
                } else if (totalDifference == leastTotalDifference) {
                    bestMatch.push(friendsData[i])
                }
               
            }
        }
        response.send(bestMatch);
    });
};