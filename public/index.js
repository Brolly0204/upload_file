$(function() {
  $('#upload').click(function() { // 单张图片上传
    const formData = new FormData();
    const file = $('#file')[0].files[0];
    if(!file) return;
    formData.append('file', file);
    $.ajax({
      url: '/file_upload',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success(res) {
        console.log(res);
        $('body').append(`<img src=/upload/${res}>`)
      }
    })
  });

  $("#uploadMore").click(function() { // 多张图片上传
    const files = $('#files')[0].files;
    if(!files.length) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    $.ajax({
      url: '/files_upload',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success(res) {
        $(res).each((index, item) => {
          $('body').append(`<img src=/upload/${item.filename}>`)
        })
      }
    })
  })
});
