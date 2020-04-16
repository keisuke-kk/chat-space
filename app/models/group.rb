class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups
  has_many :messages

  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.text?
        last_message.text
      else
        '画像が投稿されています'
      end
    else
      'まだメッセージはありません。'
    end
  end

end
