require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'should redirect unauthenticated user to login' do
    get home_url
    assert_redirected_to new_user_session_path
  end

  test 'should get index after signing in' do
    get new_user_session_path
    sign_in users(:user_one)
    post user_session_url
    get home_url
    assert_response :success
  end
end
