module Api
  module V1
    class MerchantsController < ApplicationController
      def index
        if user_signed_in?
          render json: Merchant.all
        else
          render json: {}, status: 401
        end
      end
    end
  end
end
