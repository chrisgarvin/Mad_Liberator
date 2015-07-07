class MadlibsController < ApplicationController
  require 'rubygems'
  require 'engtagger'

  def index
    # @response = HTTParty.get"https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kyleconkright"

    @madlibs = Madlib.all
    @madlibTest = EngTagger.new
    @madlibText = "Chris went to the awesome movie and ate the crazy food."
    @madlibTagged = @madlibTest.add_tags(@madlibText)
    @adjectives = @madlibTest.get_adjectives(@madlibTagged)
    @nouns = @madlibTest.get_nouns(@madlibTagged)

  end

  private

  def client
    @client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV["CONSUMER_KEY"]
    config.consumer_secret     = ENV["CONSUMER_SECRET"]
    config.access_token        = session['access_token']
    config.access_token_secret = session['access_token_secret']
    end
  end

end
