class EmployeesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
      render json: Employee.all
  end

  def show
      render json: Employee.find(params["id"])
  end

  def create
      render json: Employee.create(params["employee"])
  end

  def delete
      render json: Employee.delete(params["id"])
  end

  def update
      render json: Employee.update(params["id"], params["employee"])
  end


end
