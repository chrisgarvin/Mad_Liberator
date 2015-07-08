class MadlibsController < ApplicationController
  require 'rubygems'
  require 'engtagger'

  def index

    if session['access_token'] && session['access_token_secret']
      @user = client.user(include_entities: true)
      @randomTweetObject = client.home_timeline.sample(1).first
      @randomTweeter = @randomTweetObject.user.screen_name
      @randomTweet = @randomTweetObject.text
    end

  end

end
