module Api
  module V1
    class CollectionsController < ApplicationController
      before_action :authenticate_user!
      before_action :set_collection, only: [:show, :update, :destroy]

      def index
        collection_query = Collection.where(user: current_user)
        pagy, records = pagy(collection_query)
        render json: {
          pagy: pagy_metadata(pagy),
          collections: records
        }
      end

      def create
        @collection = Collection.new(collection_params)

        if @collection.save
          render json: @collection, status: :created
        else
          render json: @collection.errors, status: :unprocessable_entity
        end
      end

      def show
        collection_query = @collection.merchants

        pagy, records = pagy(collection_query)
        render json: {
          name: @collection.name,
          pagy: pagy_metadata(pagy),
          merchants: records
        }
      end

      def update
        @collection.update(collection_params)
        render json: @collection, status: :ok
      end

      def destroy
        @collection.destroy
        render status: :ok
      end

      private

      def set_collection
        @collection = Collection.find(params[:id])

        unless @collection.user == current_user
          render json: {}, status: 401
          nil
        end
      end

      def collection_params
        params.require(:collection).permit(:name)
      end
    end
  end
end
