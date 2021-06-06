class CreateCollectionMerchants < ActiveRecord::Migration[6.1]
  def change
    create_table :collection_merchants do |t|
      t.belongs_to :collection, null: false, foreign_key: true
      t.belongs_to :merchant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
