class StaticPagesController < ApplicationController
  before_action :ensure_signed_in!

  def root

  end
end
