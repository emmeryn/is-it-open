require 'test_helper'

module Api
  module V1
    class MerchantsControllerTest < ActionDispatch::IntegrationTest
      include Devise::Test::IntegrationHelpers

      test 'should return list of merchants and pagination metadata for authenticated user' do
        get new_user_session_path
        sign_in users(:user_one)
        post user_session_url
        get api_v1_merchants_url
        assert_response :success
        json_response = JSON.parse(response.body)
        assert_equal 2, json_response['data'].count
        assert_not_empty json_response['pagy']
      end

      test 'should return unauthorized for unauthenticated user' do
        get api_v1_merchants_url
        assert_response :unauthorized
      end
    end
  end
end
