# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_06_092718) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collection_merchants", force: :cascade do |t|
    t.bigint "collection_id", null: false
    t.bigint "merchant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["collection_id"], name: "index_collection_merchants_on_collection_id"
    t.index ["merchant_id"], name: "index_collection_merchants_on_merchant_id"
  end

  create_table "collections", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_collections_on_user_id"
  end

  create_table "merchants", force: :cascade do |t|
    t.string "name"
    t.time "sunday_opens_at"
    t.time "sunday_closes_at"
    t.time "monday_opens_at"
    t.time "monday_closes_at"
    t.time "tuesday_opens_at"
    t.time "tuesday_closes_at"
    t.time "wednesday_opens_at"
    t.time "wednesday_closes_at"
    t.time "thursday_opens_at"
    t.time "thursday_closes_at"
    t.time "friday_opens_at"
    t.time "friday_closes_at"
    t.time "saturday_opens_at"
    t.time "saturday_closes_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "collection_merchants", "collections"
  add_foreign_key "collection_merchants", "merchants"
  add_foreign_key "collections", "users"
end
