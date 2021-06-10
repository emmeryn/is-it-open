require 'test_helper'
require 'minitest/autorun'

class DataImporterTest < Minitest::Test
  def test_parse_hours
    expected_opens_at = Tod::TimeOfDay.new(17, 45)
    expected_closes_at = Tod::TimeOfDay.new(1, 45)
    (hours_only, opens_at, closes_at) = DataImporter.parse_hours('Mon, Wed, Fri 5:45 pm - 1:45 am')
    assert_equal(hours_only, '5:45 pm - 1:45 am')
    assert_equal(opens_at, expected_opens_at)
    assert_equal(closes_at, expected_closes_at)
  end

  def test_parse_days
    expected_opens_at = Tod::TimeOfDay.new(2)
    expected_closes_at = Tod::TimeOfDay.new(23)
    subject = DataImporter.parse_days('Sun - Mon, Thurs', expected_opens_at, expected_closes_at)
    assert_equal(subject[:sunday_opens_at], expected_opens_at)
    assert_equal(subject[:sunday_closes_at], expected_closes_at)
    assert_equal(subject[:monday_opens_at], expected_opens_at)
    assert_equal(subject[:monday_closes_at], expected_closes_at)
    assert_equal(subject[:thursday_opens_at], expected_opens_at)
    assert_equal(subject[:thursday_closes_at], expected_closes_at)
  end

  def test_parse_days_handles_inconsistent_spaces
    expected_opens_at = Tod::TimeOfDay.new(2)
    expected_closes_at = Tod::TimeOfDay.new(23)
    subject = DataImporter.parse_days('Sun-Mon', expected_opens_at, expected_closes_at)
    assert_equal(subject[:sunday_opens_at], expected_opens_at)
    assert_equal(subject[:sunday_closes_at], expected_closes_at)
    assert_equal(subject[:monday_opens_at], expected_opens_at)
    assert_equal(subject[:monday_closes_at], expected_closes_at)
  end

  def test_parse_hours_for_day_range
    expected_opens_at = Tod::TimeOfDay.new(2)
    expected_closes_at = Tod::TimeOfDay.new(23)
    subject = DataImporter.parse_hours_for_day_range(expected_opens_at, expected_closes_at, 'Thurs', 'Mon')
    assert_equal(subject[:thursday_opens_at], expected_opens_at)
    assert_equal(subject[:thursday_closes_at], expected_closes_at)
    assert_equal(subject[:friday_opens_at], expected_opens_at)
    assert_equal(subject[:friday_closes_at], expected_closes_at)
    assert_equal(subject[:saturday_opens_at], expected_opens_at)
    assert_equal(subject[:saturday_closes_at], expected_closes_at)
    assert_equal(subject[:sunday_opens_at], expected_opens_at)
    assert_equal(subject[:sunday_closes_at], expected_closes_at)
    assert_equal(subject[:monday_opens_at], expected_opens_at)
    assert_equal(subject[:monday_closes_at], expected_closes_at)
  end

  def test_parse_hours_for_day
    expected_opens_at = Tod::TimeOfDay.new(2)
    expected_closes_at = Tod::TimeOfDay.new(23)
    subject = DataImporter.parse_hours_for_day(expected_opens_at, expected_closes_at, 'Wed')
    assert_equal(subject[:wednesday_opens_at], expected_opens_at)
    assert_equal(subject[:wednesday_closes_at], expected_closes_at)
  end
end
