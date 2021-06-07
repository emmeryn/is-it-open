module Api
  module V1
    class MerchantsController < ApplicationController
      def index
        render json: {}, status: 401 unless user_signed_in?

        pagy, records = pagy(Merchant.all)
        render json: {
          pagy: pagy_metadata(pagy),
          merchants: records
        }
      end
    end
  end
end
