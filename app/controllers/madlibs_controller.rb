class MadlibsController < ApplicationController
  require 'rubygems'
  require 'engtagger'
  require 'twitter'

  def index

    if session['access_token'] && session['access_token_secret']
      @sessionClient = client;
      @sessionUser = client.user(include_entities: true)
      @randomTweetObject = client.home_timeline.sample(1).first
      @randomTweeter = @randomTweetObject.user.screen_name
      @randomTweet = @randomTweetObject.text

    end

  end

end
