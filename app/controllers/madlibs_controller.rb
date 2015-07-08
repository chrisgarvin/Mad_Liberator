class MadlibsController < ApplicationController
  require 'rubygems'
  require 'engtagger'

  def index

    @madlibs = Madlib.all
    @madlibTest = EngTagger.new
    @madlibText = "Chris went to the awesome movie and ate the crazy food."
    @madlibTagged = @madlibTest.add_tags(@madlibText)
    @adjectives = @madlibTest.get_adjectives(@madlibTagged)
    @nouns = @madlibTest.get_nouns(@madlibTagged)

    if session['access_token'] && session['access_token_secret']
      @user = client.user(include_entities: true)
    end

  end

end
