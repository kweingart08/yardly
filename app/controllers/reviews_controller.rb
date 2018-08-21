class ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
      render json: Review.all
  end

  def show
      render json: Review.find(params["id"])
  end

  def create
      render json: Review.create(params["review"])
  end

  def delete
      render json: Review.delete(params["id"])
  end

  def update
      render json: Review.update(params["id"], params["review"])
  end


end
