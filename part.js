// ....... not an isolated part of js-file

/*
 * ***************************  
 * ********** FORMS **********
 * ***************************
 */
function sj_form(obj)  // form_id, required, type, is_popup
{
  var is_popup = obj.popup,
      form_id  = obj.form,
      required = obj.required,
      type     = obj.type,
      fields   = Object.create(null),
      err_bls  = Object.create(null),
      data     = Object.create(null),
      errs     = Object.create(null),
      err_code = {
        1: "Поле обязательно к заполнению",
        2: "Неверный формат телефона",
        3: "Неверный формат E-mail",
        4: "Ошибка при отправке формы"
      },
      form,
      name,
      test,
      inp,
      inp_bg,
      err_cl,
      submit,
      f_name;
  
  if (type) {
    sj_form_init(type);
  }
  
  return Object.freeze({
    sj_form_init
  });
  
  function sj_form_init(btn_type)
  {
    type = btn_type;
    set_form();
    set_handlers();
    return true;
  } 
  
  
  /*
   * ========= HANDLERS =========
   */
  function handle_field(f_name)
  {
    if (validate_required(f_name) && validate_types(f_name)) {
      hide_err(f_name);
      return true;
    } else {
      handle_err(f_name);
    }
  }
  
  function handle_submit() 
  {
    if (validate_test()){
      if (validate_required() && validate_all_types()){
        get_data();
        // show_fields_value();
        send(form);
        return true;
      } else {
        handle_err();
        return false;
      }
    }
    show_send_error();
    return false;
  }
  
  function handle_err(f_name) {
    return f_name ? show_err(f_name) : show_err_all();
  } 
  // --------- END Handlers ---------
  
  /*
   * ========= GETS & SETS =========
   */
  function set_form()
  {
    form     = $(form_id);
    name     = form.attr("name");
    test     = form.find(".input-auth");
    inp      = form.find(".input");
    err_cl   = ".tooltip-error";
    inp_bg   = form.find(".input-background");
    submit   = form.find(".btn-submit");
    get_fields();
    get_err_bls();
  }
  
  function set_handlers() {
    inp.on("blur", function (e) {
    console.log("blur");
      handle_field($(this).attr("name"));
    });
    inp.on("focus", function () {
    console.log("focus");
      hide_err($(this).attr("name"));
    });
    set_submit_onclick();
    return;
  }
  
  function set_submit_onclick()
  {
    submit.on("click", function (e) {
    console.log("submit");
      handle_submit();
    });
  }
  
  function get_fields() {
    inp.each(function (indx, field) {
      var f_obj = $(field);
      fields[f_obj.attr("name")] = f_obj;
    });
    return fields;
  }
  
  function get_err_bls() {
    $.each(fields, function (index, field) {
      err_bls[field.attr("name")] = field.parent(".input-wrap").siblings(".tooltip-error");
    });
  }
  
  function get_data() {
    $.each(fields, function (index, field) {
      data[index] = field.val();
    });
    data.type = type;
  } 
  // --------- GETS & SETS ---------
  
  /*
   * ========= VALIDATE =========
   */
  function validate_test() {
    if (test.val().length > 0) {
      errs.test = 4;
      return false;
    } else {
      return true;
    }
  }
  
  function validate_required(f_name) {
    return f_name ? validate_empty(f_name) : validate_empty_all();
  }
  
  function validate_empty(f_name) {
    if (inArray(f_name, required)){
      if (fields[f_name].val().length < 1) {
        errs[f_name] = 1;
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  
  function validate_empty_all()
  {
    var result = true;
    $.each(fields, function (index, field) {
      f_name = field.attr("name");
      if (inArray(f_name, required)) {
        if (!validate_empty(f_name)) result = false;
      }
    });
    return result;
  }
   
  function validate_types(f_name)
  {
    switch (f_name) {
      case "phone":
        return validate_phone(f_name);
        
      case "mail":
        return validate_mail(f_name);
        
      default:
        return true;
    }
  }
  
  function validate_all_types()
  {
    var res = true;
    $.each(fields, function (f_name, field) {
      if (!validate_types(f_name)){
        res = false;
      }
    });
    if (res){
      return true;
    } else {
      return false;
    }
  }
  
  function validate_phone(f_name)
  {
    var f_val = fields[f_name].val();
    var regexp_phone = /^[\d\+]{1}[\d\(\)\-\s]{4,17}\d$/;
    if (regexp_phone.test(f_val) === -1 || 
          regexp_phone.test(f_val) === false ||
          f_val.length < 7) {
      errs[f_name] = 2; // "Неверный формат телефона"
      return false;
    } else {
      return true;
    }
  }
  
  function validate_mail(f_name)
  {
    var f_val = fields[f_name].val();
    var regexp_email = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,10}$/i;
    if (regexp_email.test(f_val) === -1 || 
          regexp_email.test(f_val) === false ||
          f_val.length < 7) {
      errs[f_name] = 3; // "Неверный формат E-mail"
      return false;
    } else {
      return true;
    }
  } 
  // ---------- END Validate ----------
  
  /*
   * ========= VIEW =========
   */
  function show_err_all()
  {
    $.each(errs, function (index, err_code) {
      show_err(index);
    });
  }
  
  function show_err(f_name)
  {
    err_bls[f_name].addClass("active").children().text(err_code[errs[f_name]]);
  }
  
  function hide_err(f_name)
  {
    if (errs[f_name]) {
      err_bls[f_name].removeClass("active").children().text("");
      delete errs[f_name];
    }
  }
   
  function show_send_success()
  {
    mess_success.fadeIn(300).delay(3000).fadeOut(300);
  }
  
  function show_send_error()
  {
    mess_error.fadeIn(300).delay(3000).fadeOut(300);
  }
  // ---------- END View ----------
   
  /*
   * ========= ACTION =========
   */
  function send(form)
  {
    submit.off();
    ajaxs('send_email', data)
      .always(function( xhr, status )
      {
        set_submit_onclick();
      })
      .done(function(response)
      {
        show_send_success();
        clean();
      })
      .fail(function( xhr, status, error )
      {
        clean();
        show_send_error();
      });
  }
  
  function clean()
  {
    if (is_popup){
      popup.removeClass("active");
      $(".form-title-popup-consultation").text("Заказать консультацию");
      $(".form-subtitle-popup-consultation").text("Позвоните или напишите нам: мы рады новым проектам!");
    }
    form.reset();
    inp_bg.removeClass("active");
    $.each(fields, function (f_name, field) {
      hide_err(f_name);
    });
  } 
  // ---------- END Action ----------
} // ---------- END: sj_form ----------
    
    
    
    
// BTN CARD
btn_card.on("click", function(){
  var card_type  = btn_card.data("type"),
      card_title = btn_card.data("title"),
      card_price = btn_card.data("price");
  
  var form_get_card = new sj_form({
    form: "#consultation",
    required: ["phone", "mail"],
    type: card_title + " " + card_type + " за " + card_price,
    popup: true
  });
  get_popup_consultation(1);
});
    
    
popup_cross.on("click", function(){
  var form = popup.find("form");
  popup.removeClass("active");
  if (form){ 
    form.reset();
    
    $(".form-title-popup-consultation").text("Заказать консультацию");
    $(".form-subtitle-popup-consultation").text("Позвоните или напишите нам: мы рады новым проектам!");
    
    form.find(".tooltip-error").each(function (indx, field) {
      $(field).removeClass("active").children().text("");
    });
    form.find(".input-background").each(function (indx, field) {
      $(field).removeClass("active");
    });
  }
});

// ....... continue .......
