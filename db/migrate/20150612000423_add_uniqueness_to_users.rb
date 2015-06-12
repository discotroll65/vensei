class AddUniquenessToUsers < ActiveRecord::Migration
  def down
    drop_table :users

    create_table :users do |t|
      t.string :password_digest, null: false, index: true, unique: true
      t.string :session_token, null: false, index: true, unique: true
      t.string :username, null: false, index: true, unique: true
      t.integer :score, default: 0

      t.timestamps null: false
    end
  end

  def up
    remove_column(:users, :username)
    remove_column(:users, :session_token)

    add_column(:users, :username, :string)
    add_column(:users, :session_token, :string)

    add_index(:users, :username, unique: true)
    add_index(:users, :session_token, unique: true)
  end
end
