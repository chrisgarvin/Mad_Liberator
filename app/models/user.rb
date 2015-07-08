class User < ActiveRecord::Base

  def self.from_omniauth(auth)
        user = find_or_create_by(uid: auth['uid'], provider: auth['provider'])
        user.provider = auth.provider
        user.uid = auth.uid
        user.name = auth.info.name
        user.username = auth.info.nickname
        user.image_url = auth.info.image
        user.oauth_token = auth.credentials.token
        user.oauth_secret = auth.credentials.secret
    user.save!
    user
  end


end
