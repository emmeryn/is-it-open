require 'test_helper'

class MerchantTest < ActiveSupport::TestCase
  test '#with_name_search' do
    query = Merchant.with_name_search('Name 2')
    refute_includes query, merchants(:one)
    assert_includes query, merchants(:two)
  end

  test '#with_date_time returns merchants with closing time before midnight' do
    sunday_date = '2021-06-06'
    assert_includes Merchant.with_date_time(
      sunday_date,
      Tod::TimeOfDay.new(10).to_s
    ), merchants(:one)

    refute_includes Merchant.with_date_time(
      sunday_date,
      Tod::TimeOfDay.new(7).to_s
    ), merchants(:one)
  end

  test '#with_date_time returns merchants with closing time after midnight' do
    monday_date = '2021-06-07'
    query = Merchant.with_date_time(
      monday_date,
      Tod::TimeOfDay.new(10).to_s
    )
    assert_includes query, merchants(:one)
    refute_includes query, merchants(:two)
  end

  test '#with_date_time returns merchants with closing time after midnight yesterday' do
    tuesday_date = '2021-06-08'
    within_hours_query = Merchant.with_date_time(
      tuesday_date,
      Tod::TimeOfDay.new(1).to_s
    )
    assert_includes within_hours_query, merchants(:one)
    refute_includes within_hours_query, merchants(:two)

    outside_hours_query = Merchant.with_date_time(
      tuesday_date,
      Tod::TimeOfDay.new(3).to_s
    )
    refute_includes outside_hours_query, merchants(:one)
  end
end
