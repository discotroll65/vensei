# Schema Information

## battle_results
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
funnier_vineid    | integer   | not null, foreign key (references vines)
owner_id          | integer   | not null, foreign key (references vines)

## watched_vines
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
vine_id     | integer   | not null, foreign key (references vines)

## battles
column name           | data type | details
----------------------|-----------|-----------------------
id                    | integer   | not null, primary key
challenger_vine_id    | integer   | not null, foreign key (references vines)
acceptor_vine_id      | integer   | not null, foreign key (references vines)
challenger_vine_votes | integer   | not null, default: 0 
acceptor_vine_votes   | integer   | not null, default: 0
challenger_id         | integer   | not null, foreign key (references users)
acceptor_id           | integer   | not null, foreign key (references users)

## vines
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
loops       | integer   | not null
url         | string    | not null, unique

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## vine_tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
vine_id     | integer   | not null, foreign key (references vines)
tag_id      | integer   | not null, foreign key (references tags)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
score           | integer   | not null, default 0

## Crowfoot Notation
![crow-foot]

[crow-foot]: ./wireframes/database_schema.png
