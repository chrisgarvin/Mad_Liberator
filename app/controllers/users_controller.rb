class UsersController < ApplicationController

  def show

    @user = User.find(params[:id])

  end

  def new

    @user = User.new

  end

  def create

    @user = User.create(user_params)

    session[:user_id] = @user.id

    if @user.save
      redirect_to root_path
    else
      flash[:message]
      render :new
    end

  end

  private

  def user_params
    params.require(:user).permit(:name, :username)
  end

end
