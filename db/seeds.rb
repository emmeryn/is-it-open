# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

newuser = User.first || User.create(email: 'admin@gmail.com', password: 'password', password_confirmation: 'password')

merchants = [
  {
    name: 'Merchant Name',
    sunday_opens_at: Tod::TimeOfDay.new(8),
    sunday_closes_at: Tod::TimeOfDay.new(18),
    monday_opens_at: Tod::TimeOfDay.new(8),
    monday_closes_at: Tod::TimeOfDay.new(18),
    tuesday_opens_at: Tod::TimeOfDay.new(8),
    tuesday_closes_at: Tod::TimeOfDay.new(18),
    wednesday_opens_at: Tod::TimeOfDay.new(8),
    wednesday_closes_at: Tod::TimeOfDay.new(18),
    thursday_opens_at: Tod::TimeOfDay.new(8),
    thursday_closes_at: Tod::TimeOfDay.new(18),
    friday_opens_at: Tod::TimeOfDay.new(8),
    friday_closes_at: Tod::TimeOfDay.new(18),
    saturday_opens_at: Tod::TimeOfDay.new(8),
    saturday_closes_at: Tod::TimeOfDay.new(18)
  },
  {
    name: 'Merchant Name 2',
    sunday_opens_at: Tod::TimeOfDay.new(9),
    sunday_closes_at: Tod::TimeOfDay.new(19),
    monday_opens_at: Tod::TimeOfDay.new(9),
    monday_closes_at: Tod::TimeOfDay.new(19),
    tuesday_opens_at: Tod::TimeOfDay.new(9),
    tuesday_closes_at: Tod::TimeOfDay.new(19),
    wednesday_opens_at: Tod::TimeOfDay.new(9),
    wednesday_closes_at: Tod::TimeOfDay.new(19),
    thursday_opens_at: Tod::TimeOfDay.new(9),
    thursday_closes_at: Tod::TimeOfDay.new(19),
    friday_opens_at: Tod::TimeOfDay.new(9),
    friday_closes_at: Tod::TimeOfDay.new(19),
    saturday_opens_at: Tod::TimeOfDay.new(9),
    saturday_closes_at: Tod::TimeOfDay.new(19)
  }
].each { |merchant|
  Merchant.create(merchant)
}
