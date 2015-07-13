require 'twitter-text'
require 'engtagger'
module ApplicationHelper

  include Twitter::Autolink

  def twitter_text(text)
    text = auto_link(text)
    text ? text.html_safe : ''
  end

  def partsOfSpeech(text)
    @pos = EngTagger.new()
    @pos.add_tags(text).html_safe
  end

  def tweetTweet(text)
    @sessionClient.update(text)
  end

end
