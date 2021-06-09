class Merchant < ApplicationRecord
  has_many :collection_merchants
  has_many :collections, through: :collection_merchants

  opening_hours_attributes = Date::DAYNAMES.map do |day_of_week|
    [
      "#{day_of_week.downcase}_opens_at".to_sym,
      "#{day_of_week.downcase}_closes_at".to_sym
    ]
  end.flatten

  opening_hours_attributes.each do |attribute|
    attribute attribute, :time_only
  end

  scope :with_name_search, ->(name) { where('name LIKE ?', "%#{name}%") }
  scope :with_date_time, lambda { |date, time|
    day_of_week_int = Date.parse(date).wday
    yesterday_day_of_week_int = day_of_week_int.zero? ? 6 : day_of_week_int - 1

    date_yesterday_day_of_week = Date::DAYNAMES[yesterday_day_of_week_int].downcase
    date_day_of_week = Date::DAYNAMES[day_of_week_int].downcase

    opens_at_yesterday = "#{date_yesterday_day_of_week}_opens_at"
    closes_at_yesterday = "#{date_yesterday_day_of_week}_closes_at"

    opens_at = "#{date_day_of_week}_opens_at"
    closes_at = "#{date_day_of_week}_closes_at"

    where("#{opens_at} <= ? and ? <= #{closes_at}", time, time)
      .or(where("#{opens_at} <= ? and #{closes_at} < #{opens_at}", time))
      .or(where("? <= #{closes_at_yesterday} and #{closes_at_yesterday} < #{opens_at_yesterday}", time))
  }
end
