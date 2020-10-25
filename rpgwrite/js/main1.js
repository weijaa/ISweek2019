document.write("<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></script>");
var NID;
var HOST = "https://king.hackersir.org/aaaabbbbcccceeee"; //結尾不要/
//////////////////////nid格式/////////////////
function checknid(NID1) {
  if (NID1.length==9 || NID1.length==7){
    NID=NID1.substring(0, NID1.length-1);
  }
  re1 = /^[dempDEMP]{1}0[0-9]{6}$/;
  re2 = /^[tT][0-9]{5}$/
  if (re1.test(NID)||re2.test(NID)){
   return true; }
  else{
    return false;
  }
}

/////////////////hide////////////////////////
$(document).ready(function(){
	$(".Question_page").each(function(index,item){
	   $(item).hide();
  })
});

//////////////////登記//////////////////////////
$("#start_btn").click(function(){
  NID=document.getElementById("input_nid").value;
	if (checknid(NID)){
    var used = localStorage.getItem("used")==="false" ? false : true;
    if (used){
      alert("你已經登記過了!");
    } else {
      writeRPG(NID);
    }
	}
	else{
		alert("NID格式錯誤");
		$("#start_div").show();
	}

});

function writeRPG(NID){
  $.ajax({
  type: "post",
  data: {
  "username": NID,
  },
  url:  HOST+"/insertRPG",
  success: function (e) {
      if (e =="成功"){
        alert(e);
        localStorage.setItem("used", true );
      } else {
        alert("登記失敗");
      }
    }
  });
}
$('#input_nid').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    NID=document.getElementById("input_nid").value;
  	if (checknid(NID)){
      var used = localStorage.getItem("used")==="false" ? false : true;
      if (used){
        alert("你已經登記過了!");
      } else {
        writeRPG(NID);
      }
  	}
  	else{
  		alert("NID格式錯誤");
  		$("#start_div").show();
  	}

		}

});
