class ServicesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
      render json: Service.all
  end

  def show
      render json: Service.find(params["id"])
  end

  def create
      render json: Service.create(params["service"])
  end

  def delete
      render json: Service.delete(params["id"])
  end

  def update
      render json: Service.update(params["id"], params["service"])
  end


end
