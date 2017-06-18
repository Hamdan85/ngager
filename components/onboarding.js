var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('onboard', function(bot) {

        debug('Starting an onboarding experience!');

        if (controller.config.studio_token) {
            bot.api.im.open({user: bot.config.createdBy}, function(err, direct_message) {
                if (err) {
                    debug('Error sending onboarding message:', err);
                } else {
                    controller.studio.run(bot, 'onboarding', bot.config.createdBy, direct_message.channel.id).catch(function(err) {
                        debug('Error: encountered an error loading onboarding script from Botkit Studio:', err);
                    });
                }
            });
        } else {
            bot.startPrivateConversation({user: bot.config.createdBy},function(err,convo) {
              if (err) {
                console.log(err);
              } else {

                  convo.setVar('creator', bot.config.createdBy);

                  convo.say('Hey {{vars.creator}} :wave:\nI\'m so happy that I\'m part of your team now:tada:\nAs our 1st step I recommend that we make a campaign with your team for you to see how I work.\nI prepared :five:  questions so you can see which one you like the most, ok:+1:?');

                  convo.ask({
                      text: ':one: Let\'s pretend we are all heroes , what is your *super* power:muscle: ?`funny` `general`\n:two: Assuming you are Batman, who is your Robbin here? `funny``general`\n:three: Assuming that you are Luke Skywalker, who is your Master Yoda? `funny``leadership`\n:four: What is your favorite superhero movie? `funny`\n:five: How much do you agree with the statement: I feel happy at work `happiness',
                      attachments: [
                          {
                              fallback: 'onboarding_question_type',
                              color: '#bdc3c7',
                              text: 'Which would you like to start with? ',
                              mrkdwn_in: [
                                  'text',
                                  'pretext',
                                  'fields'
                              ],
                              callback_id: 'onboarding_question_type',
                              attachment_type: 'default',
                              actions: [
                                  {
                                      name: '1',
                                      text: '1',
                                      type: 'button',
                                      style: 'default',
                                      value: '1'
                                  },
                                  {
                                      name: '2',
                                      text: '2',
                                      type: 'button',
                                      style: 'default',
                                      value: '2'
                                  },
                                  {
                                      name: '3',
                                      text: '3',
                                      type: 'button',
                                      style: 'default',
                                      value: '3'
                                  },
                                  {
                                      name: '4',
                                      text: '4',
                                      type: 'button',
                                      style: 'default',
                                      value: '4'
                                  },
                                  {
                                      name: '5',
                                      text: '5',
                                      type: 'button',
                                      style: 'default',
                                      value: '5'
                                  }
                              ]
                          }
                      ]
                  });

                  convo.next();

              }
            });
        }
    });

}
