require 'csv'

class DataImporter
  DAY_OF_WEEK = {
    Sun: 0,
    Mon: 1,
    Tues: 2,
    Wed: 3,
    Thurs: 4,
    Fri: 5,
    Sat: 6
  }.with_indifferent_access

  def self.import(file_path)
    CSV.foreach(file_path) do |row|
      name, opening_hours = row
      merchant = Merchant.new(name: name)
      opening_hours.split('/').each do |days_hours_block|
        opening_hours = parse_days_hours_block(days_hours_block)
        merchant.assign_attributes(opening_hours)
      end
      merchant.save
    end
  end

  def self.parse_days_hours_block(days_hours_block)
    days_hours_block.strip!
    (hours_only, opens_at, closes_at) = parse_hours(days_hours_block)
    day_ranges = days_hours_block.chomp(hours_only)
    parse_days(day_ranges, opens_at, closes_at)
  end

  def self.parse_hours(days_hours_block)
    hours_regex = /([01]?[0-9](?::[0-5][0-9])? (?:pm|am)) - ([01]?[0-9](?::[0-5][0-9])? (?:pm|am))/
    hours_matches = hours_regex.match(days_hours_block)
    hours_only = hours_matches[0]
    opens_at = Tod::TimeOfDay.parse hours_matches[1]
    closes_at = Tod::TimeOfDay.parse hours_matches[2]
    [hours_only, opens_at, closes_at]
  end

  def self.parse_days(day_ranges, opens_at, closes_at)
    opening_hours = {}
    day_regex = /(Sun|Mon|Tues|Wed|Thurs|Fri|Sat) ?- ?(Sun|Mon|Tues|Wed|Thurs|Fri|Sat)/
    day_ranges.split(',').each do |day_range_block|
      day_matches = day_regex.match(day_range_block)
      if day_matches
        start_day_short = day_matches[1]
        end_day_short = day_matches[2]

        opening_hours.merge! parse_hours_for_day_range(opens_at, closes_at, start_day_short, end_day_short)
      else
        day_short = day_range_block.strip
        opening_hours.merge! parse_hours_for_day(opens_at, closes_at, day_short)
      end
    end
    opening_hours
  end

  def self.parse_hours_for_day_range(opens_at, closes_at, start_day_short, end_day_short)
    opening_hours = {}
    Date::DAYNAMES.rotate(DAY_OF_WEEK[start_day_short])
                  .cycle do |day|
      opening_hours["#{day.downcase}_opens_at".to_sym] = opens_at
      opening_hours["#{day.downcase}_closes_at".to_sym] = closes_at
      break if day == Date::DAYNAMES[DAY_OF_WEEK[end_day_short]]
    end
    opening_hours
  end

  def self.parse_hours_for_day(opens_at, closes_at, day_short)
    opening_hours = {}
    day = Date::DAYNAMES[DAY_OF_WEEK[day_short]]
    opening_hours["#{day.downcase}_opens_at".to_sym] = opens_at
    opening_hours["#{day.downcase}_closes_at".to_sym] = closes_at
    opening_hours
  end
end