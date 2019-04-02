class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false 
      t.string :description, null: false 
      t.boolean :direct_message?, null: false
      t.integer :workspace_id, null: false 
      t.timestamps
    end
    add_index :channels, :workspace_id
  end
end
