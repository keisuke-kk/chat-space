$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="box">
            <div class="box__name">
              ${message.user_name}
            </div>
            <div class="box__date">
              ${message.created_at}
            </div>
          </div>
          <div class="ms">
            <p class="ms__text">
              ${message.text}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="box">
            <div class="box__name">
              ${message.user_name}
            </div>
            <div class="box__date">
              ${message.created_at}
            </div>
          </div>
          <div class="ms">
            <p class="ms__text">
              ${message.text}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.chat__main_message-list').append(html);
       $('.chat__main_message-list').animate({ scrollTop: $('.chat__main_message-list')[0].scrollHeight });
       $('form')[0].reset();
       $('.inp__bt').attr("disabled", false);
     })
     .fail(function() {
       alert("メッセージ送信に失敗しました");
     });
  })

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat__main_message-list').append(insertHTML);
        $('.chat__main_message-list').animate({ scrollTop: $('.chat__main_message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});