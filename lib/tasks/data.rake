require 'csv'

namespace :data do
  desc 'Import data from CSV'
  task import: :environment do
    DataImporter.import Rails.root.join('lib', 'assets', 'restaurant-data.csv')
  end
end
