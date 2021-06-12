module Api
  module V1
    class MerchantsController < ApplicationController
      before_action :authenticate_user!

      def index
        merchant_query = Merchant.all

        if params[:name].present?
          merchant_query = merchant_query.with_name_search(params[:name])
        end

        if params[:date_open].present? && params[:time_open].present?
          merchant_query = merchant_query.with_date_time(params[:date_open], params[:time_open])
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
