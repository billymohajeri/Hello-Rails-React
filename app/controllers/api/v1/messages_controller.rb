class Api::V1::MessagesController < ApplicationController
  def random_greeting
    messages = Message.all
    greeting = messages.sample
    render json: greeting
  end
end
