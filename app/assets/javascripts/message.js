$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message">
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
        `<div class="message">
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
       console.log("reset")
       $('.inp__bt').attr("disabled", false);
     })
     .fail(function() {
       alert("メッセージ送信に失敗しました");
     });
  })
});