class Collection < ApplicationRecord
  belongs_to :user
  has_many :collection_merchants
  has_many :merchants, through: :collection_merchants
end
