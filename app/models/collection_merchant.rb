class CollectionMerchant < ApplicationRecord
  belongs_to :collection
  belongs_to :merchant
end
