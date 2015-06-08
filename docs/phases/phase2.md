# Phase 2: Voting on Posts, having life graph update

## Rails
### Models

### Controllers
Api::VinesController (create, destroy, index, show)
Api::UsersController (create, destroy, show, update)

### Views
* blogs/show.json.jbuilder

## Backbone
### Models
* Vine (parses nested `battles` and `tags` associations)
* Battle

### Collections
* Vines
* Battles

### Views
* GraphView (composite view, contains VineBar subview)
* VineBar

## Gems/Libraries
