require "test_helper"

class MerchantTest < ActiveSupport::TestCase
  test "#with_name_search" do
    refute_includes Merchant.with_name_search('Name 2'), merchants(:one)
    assert_includes Merchant.with_name_search('Name 2'), merchants(:two)
  end
end
