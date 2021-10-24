module.exports = {
  async up(db, client) {
    const statisticsCollection = db.collection('statistics');

    const res = await statisticsCollection.aggregate([
      {
        '$lookup': {
          'from': 'games', 
          'localField': 'game', 
          'foreignField': '_id', 
          'as': 'game'
        }
      }, {
        '$project': {
          'game': {
            '$first': '$game'
          }, 
          'team': '$team', 
          'user': '$user'
        }
      }, {
        '$project': {
          'red': {
            '$slice': [
              '$game.players', 2
            ]
          }, 
          'blue': {
            '$slice': [
              '$game.players', 2, 2
            ]
          }, 
          'team': '$team', 
          'user': '$user'
        }
      }, {
        '$project': {
          'enemy': {
            '$cond': [
              {
                '$eq': [
                  '$team', 'blue'
                ]
              }, '$red', '$blue'
            ]
          }, 
          'teammate': {
            '$cond': [
              {
                '$eq': [
                  '$team', 'blue'
                ]
              }, {
                '$cond': [
                  {
                    '$eq': [
                      {
                        '$first': '$blue'
                      }, '$user'
                    ]
                  }, {
                    '$arrayElemAt': [
                      '$blue', 1
                    ]
                  }, {
                    '$first': '$blue'
                  }
                ]
              }, {
                '$cond': [
                  {
                    '$eq': [
                      {
                        '$first': '$red'
                      }, '$user'
                    ]
                  }, {
                    '$arrayElemAt': [
                      '$red', 1
                    ]
                  }, {
                    '$first': '$red'
                  }
                ]
              }
            ]
          }
        }
      }
    ]).toArray();

    for await (let { _id, enemy, teammate } of res) {
      await statisticsCollection.updateOne({ _id }, { $set: { enemy, teammate } });
    }
  },

  async down(db, client) {
    const statisticsCollection = db.collection('statistics');

    await statisticsCollection.updateMany({}, { $unset: { enemy: '', teammate: '' } })
  }
};
