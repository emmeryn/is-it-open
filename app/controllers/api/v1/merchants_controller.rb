module Api
  module V1
    class MerchantsController < ApplicationController
      def index
        render json: {}, status: 401 unless user_signed_in?

        merchant_query = Merchant.all

        if params[:name].present?
          merchant_query = merchant_query.with_name_search(params[:name])
        end

        pagy, records = pagy(merchant_query)
        render json: {
          pagy: pagy_metadata(pagy),
          merchants: records
        }
      end
    end
  end
end
