$(document).ready(function(){
    $("#submit").on('click', function(){
		var pass = $("#newPassword").val();
		var id = localStorage['userId'];
		var data = {"user": { "user_password": pass } };
		var test = JSON.stringify(data);
        $.ajax({
            url: '/users/'+id,
			headers: {
				'Content-Type':'application/json'
			},
			dataType: "json",
            type : "POST",
            data : test, 
            success : function(result, status, xhr) {
				if (result.status) {
					document.cookie = xhr.getResponseHeader('Set-Cookie');
					window.location.href = "/Resources.html";
				}
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });

    $("#logout").on('click', function(){
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage['userId'] = null;
   		window.location="/Login.html";
    });
});