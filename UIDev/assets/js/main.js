jQuery(document).ready(function () {

  $(".secondlevelFields").hide();
  $(".thirdlevelFields").hide();
  $(".thirdlevelNormalFields").hide();
  $('.thirdlevelExpertFields').hide();
  $(".reg-alert").hide();

$("#selectExpertiseArea").prop("selectedIndex", -1);
$("#selectType").prop("selectedIndex", -1);
  // $('#experts,#interests').hide();    
})
function onSignup() {
  var inputs={};
   inputs["email"] = $("#InputEmail").val();
  
    inputs["password"] = $("#InputPassword").val();

  if (!($("#inlineCheckbox1")[0].checked)) {
    $(".reg-alert").show();
    $(".reg-alert span.alert-content")[0].innerText = "Please accept terms ";

  }
  else {
    console.log("isnide signup");
    var inputs = {};

    
var url="http://host.beyond-government.com/api/account/VerifyAccount?email="+inputs.email+"&password"+inputs.password;
    $.ajax({
      type: 'Get',
      // make sure you respect the same origin policy with this url:
      // http://en.wikipedia.org/wiki/Same_origin_policy
      url:url,
     // url: 'http://host.beyond-government.com/api/account/SignUp?email=' + inputs.email + '&password=' + inputs.password + '&firstName=' + inputs.firstName + '&lastName=' + inputs.lastName,
      // data: { 
      //     'foo': 'bar', 
      //     'ca$libri': 'no$libri' // <-- the $ sign in the parameter name seems unusual, I would avoid it
      // },
      success: function (msg) {
        handleSuccessResponse(msg);

      
      }
    });
  }

  // $("#firstlevelFields").hide();
  // $(".secondlevelFields").show();
}

function handleSuccessResponse(response) {
 
  if (response == 'Verified')
  {
     $(".reg-alert").show();
        $(".reg-alert span.alert-content")[0].innerText = "User already exists";
  }
 
  else {
    $(".reg-alert").hide();
    $("#firstlevelFields").hide(500);
    $(".secondlevelFields").show(500);
  }

}
function displayExpert(check) {
  if (check) {
    $("#firstlevelFields").hide();
   $(".secondlevelFields").hide();
    $('.thirdlevelExpertFields').show();
  } else {
    // $('#experts').hide();
    // $('#noExpert').prop('checked', false);
  }
}

function displayIntrests(check) {
  if (check) {
    $("#firstlevelFields").hide();
    $(".secondlevelFields").hide();

    $('.thirdlevelNormalFields').show();
    $('#isExpert').prop('checked', true);
  } else {
   // $('#interests').hide();
  }
}
function onRegister() {
  console.log("isndie register");
  var inputs = {};

    inputs["email"] = $("#InputEmail").val();
    inputs["firstName"] = $("#InputFirstName").val();
    inputs["lastName"] = $("#InputLastName").val();
    inputs["password"] = $("#InputPassword").val();
    inputs["country"]=$("#InputCountry").val();
    inputs["phone"]=$("#InputContact").val();
    inputs["pin"]=$("#InputPin").val();
    inputs["expert"]=$("#isExpert").is(":checked");
    inputs["expertiseDomain"]=$("#selectExpertiseArea").val();
    inputs["organizationType"]=$("#selectType").val();
    inputs["organizationName"]=$("#orgName").val();
    inputs["jobTitle"]=$("#jobTitle").val();
    inputs["interestStayUpdate"]=$("#first").is(":checked");
    inputs["interestHelpOthers"]=$("#third").is(":checked");
    inputs["interestConnectExpert"]=$("#second").is(":checked");    

  console.log(inputs);
  var url="http://host.beyond-government.com/api/account/SignUp";
    $.ajax({
      type: 'Post',
      // make sure you respect the same origin policy with this url:
      // http://en.wikipedia.org/wiki/Same_origin_policy
      url:url,
     // url: 'http://host.beyond-government.com/api/account/SignUp?email=' + inputs.email + '&password=' + inputs.password + '&firstName=' + inputs.firstName + '&lastName=' + inputs.lastName,
      data: inputs,
      //     'foo': 'bar', 
      //     'ca$libri': 'no$libri' // <-- the $ sign in the parameter name seems unusual, I would avoid it
      // },
      success: function (msg) {
    console.log(msg);
    if(msg=="Inserted")
    {
      window.location.href="index.html";
    }
    else{
      $(".reg-alert").show();
        $(".reg-alert span.alert-content")[0].innerText = "Error! Work in progress";
    }

      
      },
      error:function(e){
        console.log("isndie error");
        console.log(e);
      }
    });


}
function showFirstlevelDetails()
{
  console.log("isnide showFirstlevelDetails");
    $(".secondlevelFields").hide();
     $('.thirdlevelExpertFields').hide();
     $("#firstlevelFields").show();

}
function showSecondLevelDetails()
{
   $('.thirdlevelExpertFields').hide();
   $('.thirdlevelNormalFields').hide();
      $("#firstlevelFields").hide();
        $(".secondlevelFields").show();
}
$('.login-form').submit(function() {
  
    doLogin();
    return false;
});
function doLogin()
{
  
  let username=$(".login-email").val();
  let password=$(".login-password").val();
      
var url="http://host.beyond-government.com/api/account/VerifyAccount?email="+username+"&password="+password;
    $.ajax({
      type: 'Get',
      // make sure you respect the same origin policy with this url:
      // http://en.wikipedia.org/wiki/Same_origin_policy
      url:url,
     // url: 'http://host.beyond-government.com/api/account/SignUp?email=' + inputs.email + '&password=' + inputs.password + '&firstName=' + inputs.firstName + '&lastName=' + inputs.lastName,
      // data: { 
      //     'foo': 'bar', 
      //     'ca$libri': 'no$libri' // <-- the $ sign in the parameter name seems unusual, I would avoid it
      // },
      success: function (msg) {
        console.log(msg);
        if(msg=='Verified')
        {
          window.localStorage.username=username;
          window.location.href="index.html";
          
        }
        else{

          alert("Wrong credentials");
        }

        // alert('wow' + msg);
      }
    });
  



}
(function() {
    $('form.login-form > input').keyup(function() {

        var empty = false;
        $('form > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#login-submit').attr('disabled', 'disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        } else {
            $('#login-submit').removeAttr('disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        }
    });
})()