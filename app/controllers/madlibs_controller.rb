class MadlibsController < ApplicationController
  require 'rubygems'
  require 'engtagger'

  $client = Twitter::REST::Client.new do |config|
  config.consumer_key        = ENV["CONSUMER_KEY"]
  config.consumer_secret     = ENV["CONSUMER_SECRET"]
  config.access_token        = ENV["ACCESS_TOKEN"]
  config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
  end

  def index
    # @response = HTTParty.get"https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kyleconkright"

    @madlibs = Madlib.all
    @madlibTest = EngTagger.new
    @madlibText = "Chris went to the awesome movie and ate the crazy food."
    @madlibTagged = @madlibTest.add_tags(@madlibText)
    @adjectives = @madlibTest.get_adjectives(@madlibTagged)
    @nouns = @madlibTest.get_nouns(@madlibTagged)

  end

end
