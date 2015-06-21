# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150621023650) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "battles", force: :cascade do |t|
    t.integer  "challenger_vine_id", null: false
    t.integer  "acceptor_vine_id",   null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.integer  "proto_poll_id"
  end

  add_index "battles", ["challenger_vine_id", "acceptor_vine_id"], name: "index_battles_on_challenger_vine_id_and_acceptor_vine_id", unique: true, using: :btree
  add_index "battles", ["proto_poll_id"], name: "index_battles_on_proto_poll_id", unique: true, using: :btree

  create_table "poll_votes", force: :cascade do |t|
    t.integer  "user_id",      null: false
    t.integer  "vine_vote_id", null: false
    t.integer  "poll_id",      null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "poll_votes", ["user_id", "poll_id"], name: "index_poll_votes_on_user_id_and_poll_id", unique: true, using: :btree
  add_index "poll_votes", ["vine_vote_id"], name: "index_poll_votes_on_vine_vote_id", using: :btree

  create_table "polls", force: :cascade do |t|
    t.string   "name",                                  null: false
    t.integer  "user_id",                               null: false
    t.integer  "battle_id",                             null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.boolean  "presentation_poll",     default: false, null: false
    t.integer  "challenger_vine_votes", default: 0,     null: false
    t.integer  "acceptor_vine_votes",   default: 0,     null: false
  end

  add_index "polls", ["battle_id"], name: "index_polls_on_battle_id", using: :btree
  add_index "polls", ["name"], name: "index_polls_on_name", unique: true, using: :btree
  add_index "polls", ["presentation_poll"], name: "index_polls_on_presentation_poll", using: :btree
  add_index "polls", ["user_id"], name: "index_polls_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "password_digest",             null: false
    t.integer  "score",           default: 0
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "username"
    t.string   "session_token"
  end

  add_index "users", ["password_digest"], name: "index_users_on_password_digest", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "vine_authors", force: :cascade do |t|
    t.string   "vine_username", null: false
    t.string   "profile_url",   null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "vine_authors", ["vine_username"], name: "index_vine_authors_on_vine_username", unique: true, using: :btree

  create_table "vines", force: :cascade do |t|
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "text"
    t.string   "vine_url"
    t.string   "src_url"
    t.string   "thumbnail_url"
    t.integer  "vine_author_id", null: false
  end

  add_index "vines", ["src_url"], name: "index_vines_on_src_url", unique: true, using: :btree
  add_index "vines", ["vine_author_id"], name: "index_vines_on_vine_author_id", using: :btree
  add_index "vines", ["vine_url"], name: "index_vines_on_vine_url", unique: true, using: :btree

end
