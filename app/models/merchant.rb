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
end
