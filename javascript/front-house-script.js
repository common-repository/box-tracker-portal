jQuery(document).ready(function($){
    //navigation 
    var b0xTPortal_header;
    if(typeof(b0xTPortal_header_builder === "function")) {
        b0xTPortal_header = new b0xTPortal_header_builder({
            "image_url" : b0xTPortal_config.image_url,
            "homeNextF" : b0xTPortal_load_home_page,
            "profileNextF" : b0xTPortal_load_profile_page,
            "jobsiteNextF": b0xTPortal_load_jobsite_page,
            "workOrderNextF" : b0xTPortal_load_workorder_page,
            "transactionsNextF": b0xTPortal_load_transactions_page,
            "reportsNextF": b0xTPortal_load_reports_page,
            "logOutNextF" : b0xTPortal_log_out
        });
    }

    //load login template script
    var b0xTPortal_login_page;
    if(typeof(b0xTPortal_login_template) === "function") {
        b0xTPortal_login_page = new b0xTPortal_login_template({
            "hostDiv" : "b0xTPortal_template",
            'nextF' : b0xTPortal_login
        });
    }

    //load home page
    var b0xTPortal_home_page;
    if(typeof(b0xTPortal_home_page_template) === "function") {
        b0xTPortal_home_page = new b0xTPortal_home_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "hostDiv" : "b0xTPortal_template",
            "profileNextF" : b0xTPortal_load_profile_page,
            "jobsiteNextF" : b0xTPortal_load_jobsite_page,
            "workOrderNextF" : b0xTPortal_load_workorder_page,
            "transactionsNextF": b0xTPortal_load_transactions_page,
            "reportsNextF": b0xTPortal_load_reports_page,
            "header" : b0xTPortal_header
        });
    }

    //load profile page
    var b0xTPortal_profile_page;
    if(typeof(b0xTPortal_profile_page_template) === "function") {
        b0xTPortal_profile_page = new b0xTPortal_profile_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "hostDiv" : "b0xTPortal_template",
            "header" : b0xTPortal_header,
            "saveCustomerNextF" : b0xTPortal_save_customer_file,
            "loadCcardNextF": b0xTPortal_load_ccard_page,
            "ccardMakePrimaryNextF": b0xTPortal_ccard_make_primary
        });
    }

    //load job site page
    var b0xTPortal_jobsite_page;
    if(typeof(b0xTPortal_jobsite_page_template) === "function") {
        b0xTPortal_jobsite_page = new b0xTPortal_jobsite_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "hostDiv" : "b0xTPortal_template",
            "loadListNextF": b0xTPortal_load_jobsite_list,
            "loadAddEditNextF": b0xTPortal_load_add_edit_jobsite,
            "loadAddEditWONextF": b0xTPortal_load_add_edit_workorder,
            "header" : b0xTPortal_header
        });
    }

    //add edit job site page
    var b0xTPortal_add_edit_jobsite_page;
    if(typeof(b0xTPortal_add_edit_jobsite_page_template) === "function") {
        b0xTPortal_add_edit_jobsite_page = new b0xTPortal_add_edit_jobsite_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "hostDiv" : "b0xTPortal_template",
            "header" : b0xTPortal_header,
            "saveJobSiteNextF": b0xTPortal_save_jobsite
        });
    }

    //load work order page
    var b0xTPortal_workorder_page;
    if(typeof(b0xTPortal_workorder_page_template) === "function") {
        b0xTPortal_workorder_page = new b0xTPortal_workorder_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "hostDiv" : "b0xTPortal_template",
            "loadListNextF": b0xTPortal_load_workorder_list,
            "loadAddEditNextF": b0xTPortal_load_add_edit_workorder,
            "removeNextF": b0xPortal_remove_workorder,
            "header" : b0xTPortal_header
        });
    }

    //add edit work order page
    var b0xTPortal_add_edit_workorder_page;
    if(typeof(b0xTPortal_add_edit_workorder_page_template) === "function") {
        b0xTPortal_add_edit_workorder_page = new b0xTPortal_add_edit_workorder_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "hostDiv" : "b0xTPortal_template",
            "saveWorkOrderNextF" : b0xTPortal_save_workorder,
            "datePicker": b0xTPortal_set_datepicker,
            "setPosition": b0xTPortal_set_position,
            "header" : b0xTPortal_header
        });
    }

    //credit card page
    var b0xTPortal_ccard_page;
    if(typeof(b0xTPortal_ccard_page_template) === "function") {
        b0xTPortal_ccard_page = new b0xTPortal_ccard_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "hostDiv" : "b0xTPortal_template",
            "header" : b0xTPortal_header,
            "saveCCardNextF" : b0xTPortal_save_ccard
        });
    }

    //transactions page
    var b0xTPortal_transactions_page;
    if(typeof(b0xTPortal_transactions_page_template) === "function") {
        b0xTPortal_transactions_page = new b0xTPortal_transactions_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "loadListNextF": b0xTPortal_load_transactions_list,
            "paymentNextF": b0xTPortal_load_payment_page,
            "emailNextF": b0xTPortal_email_txn,
            "hostDiv" : "b0xTPortal_template",
            "header" : b0xTPortal_header
        });
    }

    //transactions page
    var b0xTPortal_payment_page;
    if(typeof(b0xTPortal_payment_page_template) === "function") {
        b0xTPortal_payment_page = new b0xTPortal_payment_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "processPaymentNextF" : b0xTPortal_process_payment,
            "hostDiv" : "b0xTPortal_template",
            "header" : b0xTPortal_header
        });
    }

    //reports page
    var b0xTPortal_reports_page;
    if(typeof(b0xTPortal_reports_page_template) === "function") {
        b0xTPortal_reports_page = new b0xTPortal_reports_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "reportsNextF": b0xTPortal_load_reports_output_page,
            "hostDiv" : "b0xTPortal_template",
            "header" : b0xTPortal_header
        });
    }

    //reports output page
    var b0xTPortal_reports_output_page;
    if(typeof(b0xTPortal_reports_output_page_template) === "function") {
        b0xTPortal_reports_output_page = new b0xTPortal_reports_output_page_template({
            "image_url" : b0xTPortal_config.image_url,
            "hostDiv" : "b0xTPortal_template",
            "datePicker": b0xTPortal_set_datepicker,
            "setPosition": b0xTPortal_set_position,
            "getReportNextF": b0xTPortal_report_details,
            "header" : b0xTPortal_header
        });
    }

    if( //sanity checks, dont continue unless they pass
        b0xTPortal_login_page && b0xTPortal_home_page && 
        b0xTPortal_profile_page && b0xTPortal_jobsite_page && 
        b0xTPortal_add_edit_jobsite_page && b0xTPortal_workorder_page &&
        b0xTPortal_add_edit_workorder_page && b0xTPortal_ccard_page && 
        b0xTPortal_transactions_page && b0xTPortal_payment_page &&
        b0xTPortal_reports_page && b0xTPortal_reports_output_page
    ) {
        //DO NOTHING.
    } else {
        $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Something went wrong, contact administration.</p>');
        return false;
    }

    //clear error messages
    function b0xTPortal_clear_flags() {
        $('.b0xTPortal-error-msg').remove();
        $('.b0xTPortal-success-msg').remove();
    }

    //create loader
    function b0xTPortal_loader(b0xTPortal_action) {
        if(b0xTPortal_action == 'remove') {
            $('.b0xTPortal_ajax_shield').remove();
        } else {
            //make sure we are not re appending the loader
            if($('#b0xTPortal_ajax_shield').children().length == 0) {
                $('#b0xTPortal_ajax_shield').append('<div class="b0xTPortal_ajax_shield"><div></div></div>');
            }
        }
    }

	$(function() { //on load.
  		var b0xTPortal_form_data = {
            'action': 'b0xTPortal_plugin_load',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    if(b0xTPortal_response.data.b0xTPortal_login_prompt == "manual") {
                        b0xTPortal_login_page.b0xTPortal_init(b0xTPortal_response.data.b0xTPortal_required_fields);
                        b0xTPortal_loader('remove');
                    } else {
                        b0xTPortal_auto_login(b0xTPortal_response.data.b0xTPortal_required_fields);
                    }
                } else {
                	$('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
           		$('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });	
	});

    //will receive an object b0xTPortal_args
    function b0xTPortal_login(b0xTPortal_args) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_login',
            'b0xTPortal_username': b0xTPortal_args.username,
            'b0xTPortal_password': b0xTPortal_args.password,
            'b0xTPortal_required_fields': b0xTPortal_args.required_fields,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'validation_error'){
                    $.each(b0xTPortal_response.data.b0xTPortal_field_errors, function(b0xTPortal_field_key, b0xTPortal_field_value){
                        b0xTPortal_login_page.b0xTPortal_validate_field(b0xTPortal_field_value, 1);
                    });

                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                } else if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_home_page.b0xTPortal_init(b0xTPortal_response.data);
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                }
                b0xTPortal_loader('remove');
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        }); 
    }

    //receive required fields, and attempt to retrive session
    function b0xTPortal_auto_login(b0xTPortal_required_fields) {
       var b0xTPortal_form_data = {
            'action': 'b0xTPortal_auto_login',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        }; 

        b0xTPortal_clear_flags();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_home_page.b0xTPortal_init(b0xTPortal_response.data);
                } else {
                    b0xTPortal_login_page.b0xTPortal_init(b0xTPortal_required_fields);      
                }
                b0xTPortal_loader('remove');  
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        }); 
    }

    function b0xTPortal_load_home_page(nextF) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_home_page',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b0xTPortal_clear_flags();
            b0xTPortal_loader();
        }

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_home_page.b0xTPortal_init(b0xTPortal_response.data);
                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b0xTPortal_loader('remove'); 
                    }
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });        
    }

    function b0xTPortal_load_profile_page(nextF) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_profile_page',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b0xTPortal_clear_flags();
            b0xTPortal_loader();
        }

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_profile_page.b0xTPortal_init(b0xTPortal_response.data);
                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b0xTPortal_loader('remove'); 
                    }
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });   
    }

    function b0xTPortal_save_customer_file(b0xTPortal_args) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_save_customer',
            'b0xTPortal_customer_name': b0xTPortal_args.customer_name,
            'b0xTPortal_customer_address': b0xTPortal_args.customer_address,
            'b0xTPortal_customer_address2': b0xTPortal_args.customer_address2,
            'b0xTPortal_customer_city': b0xTPortal_args.customer_city,
            'b0xTPortal_customer_state': b0xTPortal_args.customer_state,
            'b0xTPortal_customer_zip': b0xTPortal_args.customer_zip,
            'b0xTPortal_customer_contact': b0xTPortal_args.customer_contact,
            'b0xTPortal_customer_phone': b0xTPortal_args.customer_phone,
            'b0xTPortal_customer_cell': b0xTPortal_args.customer_cell,
            'b0xTPortal_customer_fax': b0xTPortal_args.customer_fax,
            'b0xTPortal_customer_email': b0xTPortal_args.customer_email,
            'b0xTPortal_customer_email_confirm': b0xTPortal_args.customer_email_confirm,
            'b0xTPortal_customer_email_reminders': b0xTPortal_args.customer_email_reminders,
            'b0xTPortal_customer_email_thankyou': b0xTPortal_args.customer_email_thankyou,
            'b0xTPortal_customer_sms': b0xTPortal_args.customer_sms,
            'b0xTPortal_required_fields': b0xTPortal_args.required_fields,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'validation_error'){
                    $.each(b0xTPortal_response.data.b0xTPortal_field_errors, function(b0xTPortal_field_key, b0xTPortal_field_value){
                        b0xTPortal_profile_page.b0xTPortal_validate_field(b0xTPortal_field_value, 1);
                    });
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                } else if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_load_home_page(function() {
                        $('#b0xTPortal_success_flag').append('<p class="b0xTPortal-success-msg">'+b0xTPortal_response.message+'</p>');
                        b0xTPortal_loader('remove');
                    });
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b0xTPortal_refresh_page();
            }
        }); 
    }

    function b0xTPortal_load_jobsite_page(nextF) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_jobsite_page',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b0xTPortal_clear_flags();
            b0xTPortal_loader();
        }

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_jobsite_page.b0xTPortal_init(b0xTPortal_response.data);
                    
                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b0xTPortal_loader('remove'); 
                    }
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });      
    }

    function b0xTPortal_load_jobsite_list(b0xTPortal_data_object) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_load_jobsite_list',
            'b0xTPortal_offset': b0xTPortal_data_object.offset,
            'b0xTPortal_search': b0xTPortal_data_object.search,
            'b0xTPortal_sort': b0xTPortal_data_object.sort,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_jobsite_page.b0xTPortal_reload_jobsite_list(b0xTPortal_response.data, b0xTPortal_data_object.control);
                    b0xTPortal_loader('remove');

                    if(typeof(b0xTPortal_data_object.call_back) === "function") {
                        b0xTPortal_data_object.call_back();
                    }
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });  
    }

    function b0xTPortal_load_add_edit_jobsite(b0xTPortal_id) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_add_edit_jobsite',
            'b0xTPortal_jobsite_id': b0xTPortal_id,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_add_edit_jobsite_page.b0xTPortal_init(b0xTPortal_response.data);
                    b0xTPortal_loader('remove');
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        }); 
    }

    function b0xTPortal_save_jobsite(b0xTPortal_args) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_save_jobsite',
            'b0xTPortal_jobsite_id': b0xTPortal_args.jobsite_id,
            'b0xTPortal_jobsite_name': b0xTPortal_args.jobsite_name,
            'b0xTPortal_jobsite_address': b0xTPortal_args.jobsite_address,
            'b0xTPortal_jobsite_city': b0xTPortal_args.jobsite_city,
            'b0xTPortal_jobsite_state': b0xTPortal_args.jobsite_state,
            'b0xTPortal_jobsite_zip': b0xTPortal_args.jobsite_zip,
            'b0xTPortal_jobsite_county': b0xTPortal_args.jobsite_county,
            'b0xTPortal_jobsite_muni': b0xTPortal_args.jobsite_muni,
            'b0xTPortal_jobsite_cross_street': b0xTPortal_args.jobsite_cross_street,
            'b0xTPortal_jobsite_po': b0xTPortal_args.jobsite_po,
            'b0xTPortal_jobsite_contact': b0xTPortal_args.jobsite_contact,
            'b0xTPortal_jobsite_contact_cell': b0xTPortal_args.jobsite_contact_cell,
            'b0xTPortal_jobsite_hazzards': b0xTPortal_args.jobsite_hazzards,
            'b0xTPortal_jobsite_billing_note': b0xTPortal_args.jobsite_billing_note,
            'b0xTPortal_jobsite_leed': b0xTPortal_args.jobsite_leed,
            'b0xTPortal_jobsite_validated': b0xTPortal_args.jobsite_validated,
            'b0xTPortal_required_fields': b0xTPortal_args.required_fields,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'validation_error'){
                    $.each(b0xTPortal_response.data.b0xTPortal_field_errors, function(b0xTPortal_field_key, b0xTPortal_field_value){
                        b0xTPortal_add_edit_jobsite_page.b0xTPortal_validate_field(b0xTPortal_field_value, 1);
                    });
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                } else if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_load_jobsite_page(function() {
                        $('#b0xTPortal_success_flag').append('<p class="b0xTPortal-success-msg">'+b0xTPortal_response.message+'</p>');
                        b0xTPortal_loader('remove');
                    });
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b0xTPortal_refresh_page();
            }
        }); 
    }

    function b0xTPortal_load_workorder_page(nextF) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_workorder_page',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b0xTPortal_clear_flags();
            b0xTPortal_loader();
        }

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_workorder_page.b0xTPortal_init(b0xTPortal_response.data);
                    
                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b0xTPortal_loader('remove'); 
                    }
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });  
    }

    function b0xTPortal_load_workorder_list(b0xTPortal_data_object) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_load_workorder_list',
            'b0xTPortal_offset': b0xTPortal_data_object.offset,
            'b0xTPortal_search': b0xTPortal_data_object.search,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_workorder_page.b0xTPortal_reload_workorder_list(b0xTPortal_response.data, b0xTPortal_data_object.control);
                    b0xTPortal_loader('remove');

                    //extra functionality posibilities
                    if(typeof(b0xTPortal_data_object.call_back) === "function") {
                        b0xTPortal_data_object.call_back();
                    }
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });  
    }

    function b0xTPortal_load_add_edit_workorder(b0xTPortal_workorder_id, b0xTPortal_jobsite_id) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_add_edit_workorder',
            'b0xTPortal_workorder_id': b0xTPortal_workorder_id,
            'b0xTPortal_jobsite_id': b0xTPortal_jobsite_id,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_add_edit_workorder_page.b0xTPortal_init(b0xTPortal_response.data);
                    b0xTPortal_loader('remove');
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        }); 
    }

    function b0xTPortal_save_workorder(b0xTPortal_args) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_save_workorder',
            'b0xTPortal_workorder_id': b0xTPortal_args.workorder_id,
            'b0xTPortal_workorder_jsid': b0xTPortal_args.workorder_jsid,
            'b0xTPortal_workorder_user_bypass': b0xTPortal_args.workorder_user_bypass,
            'b0xTPortal_workorder_asset': b0xTPortal_args.workorder_asset,
            'b0xTPortal_workorder_contqty': b0xTPortal_args.workorder_contqty,
            'b0xTPortal_workorder_targetcont': b0xTPortal_args.workorder_targetcont,
            'b0xTPortal_workorder_wodate': b0xTPortal_args.workorder_wodate,
            'b0xTPortal_workorder_wotype': b0xTPortal_args.workorder_wotype,
            'b0xTPortal_workorder_remarks': b0xTPortal_args.workorder_remarks,
            'b0xTPortal_workorder_material': b0xTPortal_args.workorder_material,
            'b0xTPortal_required_fields': b0xTPortal_args.required_fields,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'validation_error'){
                    $.each(b0xTPortal_response.data.b0xTPortal_field_errors, function(b0xTPortal_field_key, b0xTPortal_field_value){
                        b0xTPortal_add_edit_workorder_page.b0xTPortal_validate_field(b0xTPortal_field_value, 1);
                    });
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                } else if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_load_workorder_page(function() {
                        $('#b0xTPortal_success_flag').append('<p class="b0xTPortal-success-msg">'+b0xTPortal_response.message+'</p>');
                        b0xTPortal_loader('remove');
                    });
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else if(b0xTPortal_response.status == 'userConfirm') {
                    b0xTPortal_add_edit_workorder_page.b0xTPortal_user_confirmation(b0xTPortal_response.data);
                    b0xTPortal_loader('remove');
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b0xTPortal_refresh_page();
            }
        });         
    }

    function _b0xTPortal_refresh_page() {
        location.reload(true);
    }

    function b0xPortal_remove_workorder(b0xTPortal_id) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_remove_workorder',
            'b0xTPortal_workorder_id': b0xTPortal_id,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_load_workorder_page(function() {
                        $('#b0xTPortal_success_flag').append('<p class="b0xTPortal-success-msg">'+b0xTPortal_response.message+'</p>');
                        b0xTPortal_loader('remove');
                    });
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b0xTPortal_refresh_page();
            }
        });    
    }

    function b0xTPortal_ccard_make_primary(b0xTPortal_id, b0xTPortal_old_id) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_ccard_make_primary',
            'b0xTPortal_ccard_id': b0xTPortal_id,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') { 
                    $('#b0xTPortal_success_flag').append('<p class="b0xTPortal-success-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    b0xTPortal_profile_page.b0xTPortal_update_mask_value(b0xTPortal_old_id);
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b0xTPortal_refresh_page();
            }
        });  
    }

    function b0xTPortal_load_ccard_page() {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_ccard_page',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_ccard_page.b0xTPortal_init(b0xTPortal_response.data);
                    b0xTPortal_loader('remove');
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });   
    }

    function b0xTPortal_save_ccard(b0xTPortal_args) {      
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_save_ccard',
            'b0xTPortal_ccard_address': b0xTPortal_args.ccard_address,
            'b0xTPortal_ccard_address2': b0xTPortal_args.ccard_address2,
            'b0xTPortal_ccard_city': b0xTPortal_args.ccard_city,
            'b0xTPortal_ccard_country': b0xTPortal_args.ccard_country,
            'b0xTPortal_ccard_cvv': b0xTPortal_args.ccard_cvv,
            'b0xTPortal_ccard_email': b0xTPortal_args.ccard_email,
            'b0xTPortal_ccard_exp_month': b0xTPortal_args.ccard_exp_month,
            'b0xTPortal_ccard_exp_year': b0xTPortal_args.ccard_exp_year,
            'b0xTPortal_ccard_first_name': b0xTPortal_args.ccard_first_name,
            'b0xTPortal_ccard_last_name': b0xTPortal_args.ccard_last_name,
            'b0xTPortal_ccard_number': b0xTPortal_args.ccard_number,
            'b0xTPortal_ccard_phone': b0xTPortal_args.ccard_phone,
            'b0xTPortal_ccard_state': b0xTPortal_args.ccard_state,
            'b0xTPortal_ccard_zip': b0xTPortal_args.ccard_zip,
            'b0xTPortal_required_fields': b0xTPortal_args.required_fields,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'validation_error'){
                    $.each(b0xTPortal_response.data.b0xTPortal_field_errors, function(b0xTPortal_field_key, b0xTPortal_field_value){
                        b0xTPortal_ccard_page.b0xTPortal_validate_field(b0xTPortal_field_value, 1);
                    });
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                } else if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_load_profile_page(function() {
                        $('#b0xTPortal_success_flag').append('<p class="b0xTPortal-success-msg">'+b0xTPortal_response.message+'</p>');
                        b0xTPortal_loader('remove');
                    });
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b0xTPortal_refresh_page();
            }
        });   
    }

    function b0xTPortal_load_transactions_page(nextF) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_transactions_page',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b0xTPortal_clear_flags();
            b0xTPortal_loader();
        }

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_transactions_page.b0xTPortal_init(b0xTPortal_response.data);

                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b0xTPortal_loader('remove'); 
                    }
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });  
    }

    function b0xTPortal_load_transactions_list(b0xTPortal_data_object, nextF) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_load_transactions_list',
            'b0xTPortal_offset': b0xTPortal_data_object.offset,
            'b0xTPortal_search': b0xTPortal_data_object.search,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b0xTPortal_clear_flags();
            b0xTPortal_loader();
        }

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_transactions_page.b0xTPortal_reload_transactions_list(b0xTPortal_response.data, b0xTPortal_data_object.control);

                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b0xTPortal_loader('remove'); 
                    }

                    //extra functionality posibilities
                    if(typeof(b0xTPortal_data_object.call_back) === "function") {
                        b0xTPortal_data_object.call_back();
                    }
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });  
    }

    function b0xTPortal_email_txn(b0xTPortal_data_object) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_email_txn',
            'b0xTPortal_txn_id': b0xTPortal_data_object.txn_id,
            'b0xTPortal_txn_email': b0xTPortal_data_object.txn_email,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_load_transactions_list(b0xTPortal_data_object, function() {
                        b0xTPortal_loader('remove');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b0xTPortal_refresh_page();
            }
        }); 
    }

    function b0xTPortal_load_payment_page() {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_payment_page',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_payment_page.b0xTPortal_init(b0xTPortal_response.data);
                    b0xTPortal_loader('remove');
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });  
    }

    function b0xTPortal_process_payment(b0xTPortal_args) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_process_payment',
            "b0xTPortal_payment_mode": b0xTPortal_args.payment_mode,
            "b0xTPortal_ccard_id": b0xTPortal_args.ccard_id,
            "b0xTPortal_transaction_id":b0xTPortal_args.transaction_id,
            'b0xTPortal_required_fields': b0xTPortal_args.required_fields,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        if(b0xTPortal_args.ccard_id * 1) {} else {
            b0xTPortal_form_data["b0xTPortal_ccard_first_name"] = b0xTPortal_args.ccard_first_name;
            b0xTPortal_form_data["b0xTPortal_ccard_last_name"] = b0xTPortal_args.ccard_last_name;
            b0xTPortal_form_data["b0xTPortal_ccard_address"] = b0xTPortal_args.ccard_address;
            b0xTPortal_form_data["b0xTPortal_ccard_address2"] = b0xTPortal_args.ccard_address2;
            b0xTPortal_form_data["b0xTPortal_ccard_city"] = b0xTPortal_args.ccard_city;
            b0xTPortal_form_data["b0xTPortal_ccard_state"] = b0xTPortal_args.ccard_state;
            b0xTPortal_form_data["b0xTPortal_ccard_zip"] = b0xTPortal_args.ccard_zip;
            b0xTPortal_form_data["b0xTPortal_ccard_country"] = b0xTPortal_args.ccard_country;
            b0xTPortal_form_data["b0xTPortal_ccard_phone"] = b0xTPortal_args.ccard_phone;
            b0xTPortal_form_data["b0xTPortal_ccard_email"] = b0xTPortal_args.ccard_email;
            b0xTPortal_form_data["b0xTPortal_ccard_number"] = b0xTPortal_args.ccard_number;
            b0xTPortal_form_data["b0xTPortal_ccard_exp_month"] = b0xTPortal_args.ccard_exp_month;
            b0xTPortal_form_data["b0xTPortal_ccard_exp_year"] = b0xTPortal_args.ccard_exp_year;
            b0xTPortal_form_data["b0xTPortal_ccard_cvv"] = b0xTPortal_args.ccard_cvv;
            b0xTPortal_form_data["b0xTPortal_ccard_store"] = b0xTPortal_args.ccard_store;
            b0xTPortal_form_data["b0xTPortal_ccard_make_primary"] = b0xTPortal_args.ccard_primary;
        }

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'validation_error'){
                    $.each(b0xTPortal_response.data.b0xTPortal_field_errors, function(b0xTPortal_field_key, b0xTPortal_field_value){
                        b0xTPortal_payment_page.b0xTPortal_validate_field(b0xTPortal_field_value, 1);
                    });
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                } else if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_load_transactions_page(function() {
                        $('#b0xTPortal_success_flag').append('<p class="b0xTPortal-success-msg">'+b0xTPortal_response.message+'</p>');
                        b0xTPortal_loader('remove');
                    });
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b0xTPortal_refresh_page();
            }
        }); 
    }

    function b0xTPortal_load_reports_page() {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_reports_page',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_reports_page.b0xTPortal_init(b0xTPortal_response.data);
                    b0xTPortal_loader('remove');
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });   
    }

    function b0xTPortal_load_reports_output_page(b0xTPortal_id) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_reports_output_page',
            'b0xTPortal_report_id': b0xTPortal_id,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_reports_output_page.b0xTPortal_init(b0xTPortal_response.data);
                    b0xTPortal_loader('remove');
                } else {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        });  
    }

    function b0xTPortal_report_details(b0xTPortal_args) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_report_details',
            'b0xTPortal_report_id': b0xTPortal_args.report_id,
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        if(b0xTPortal_args.report_start_date) {
            b0xTPortal_form_data["b0xTPortal_report_start_date"] = $("#"+b0xTPortal_args.report_start_date).val();
        }

        if(b0xTPortal_args.report_end_date) {
            b0xTPortal_form_data["b0xTPortal_report_end_date"] = $("#"+b0xTPortal_args.report_end_date).val();
        }

        if(b0xTPortal_args.report_delivery_date) {
            b0xTPortal_form_data["b0xTPortal_report_delivery_date"] = $("#"+b0xTPortal_args.report_delivery_date).val();
        }

        if(b0xTPortal_args.report_month) {
            b0xTPortal_form_data["b0xTPortal_report_month"] = b0xTPortal_args.report_month;
        }

        if(b0xTPortal_args.report_year) {
            b0xTPortal_form_data["b0xTPortal_report_year"] = b0xTPortal_args.report_year;
        }

        if(b0xTPortal_args.report_jobsite_id) {
            b0xTPortal_form_data["b0xTPortal_report_jobsite_id"] = b0xTPortal_args.report_jobsite_id;
        }

        if(b0xTPortal_args.report_wo_type) {
            b0xTPortal_form_data["b0xTPortal_report_wo_type"] = b0xTPortal_args.report_wo_type;
        }

        if(b0xTPortal_args.check_boxes) {
            b0xTPortal_form_data["b0xTPortal_report_check_boxes"] = b0xTPortal_args.check_boxes;
        }

        if(b0xTPortal_args.report_sort_by) {
            b0xTPortal_form_data["b0xTPortal_report_sort_by"] = b0xTPortal_args.report_sort_by;
        }

        if(b0xTPortal_args.report_filter_by) {
            b0xTPortal_form_data["b0xTPortal_report_filter_by"] = b0xTPortal_args.report_filter_by;
        }

        if(b0xTPortal_args.report_list_by) {
            b0xTPortal_form_data["b0xTPortal_report_list_by"] = b0xTPortal_args.report_list_by;
        }

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    b0xTPortal_reports_output_page.b0xTPortal_build_report_details(b0xTPortal_response.data);
                    b0xTPortal_loader('remove');
                } else if(b0xTPortal_response.status == 'expired') {
                    b0xTPortal_log_out(function() {
                         $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    b0xTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        }); 
    }

    function b0xTPortal_set_datepicker(b0xTPortal_element, b0xTPortal_order_date, b0xTPortal_min_date, b0xTPortal_max_date) {
        $("#"+b0xTPortal_element).datepicker({
            dateFormat: "M dd, yy",
            minDate: b0xTPortal_min_date,
            maxDate: b0xTPortal_max_date,
            beforeShow: function(){
               $("#ui-datepicker-div").css("min-width", $(this).outerWidth()+"px");
               $("#ui-datepicker-div").attr("b0xTPortal_clicked_element", b0xTPortal_element);
            },
            onClose: function() {
                $("#ui-datepicker-div").removeAttr("b0xTPortal_clicked_element");
            }
        })

        $("#"+b0xTPortal_element).val(b0xTPortal_order_date);

        //attach a class to the ui date picker
        $("#ui-datepicker-div").addClass("b0xTPortal_all_page_datepicker");
    }

    function b0xTPortal_set_position(b0xTPortal_element, b0xTPortal_target_element) {
        $("#"+b0xTPortal_target_element).css("left", $("#"+b0xTPortal_element).offset().left);
        $("#"+b0xTPortal_target_element).css("top", ($("#"+b0xTPortal_element).offset().top+$("#"+b0xTPortal_element).outerHeight()));
    }

    function b0xTPortal_log_out(nextF) {
        var b0xTPortal_form_data = {
            'action': 'b0xTPortal_logout',
            'b0xTPortal_nonce': b0xTPortal_config.ajax_nonce
        };

        b0xTPortal_clear_flags();
        b0xTPortal_loader();

        $.ajax({
            url : b0xTPortal_config.ajax_url,
            type : 'post',
            data : b0xTPortal_form_data,
            success : function(b0xTPortal_data) {
                var b0xTPortal_response = JSON.parse(b0xTPortal_data);
                if(b0xTPortal_response.status == 'success') {
                    if(typeof(nextF) === "function") {} else {
                        $('#b0xTPortal_success_flag').append('<p class="b0xTPortal-success-msg">'+b0xTPortal_response.message+'</p>');
                    }
                } else {
                    if(typeof(nextF) === "function") {} else {
                        $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">'+b0xTPortal_response.message+'</p>');
                    }
                }

                //success or not we forcing a log out and loading the login page
                b0xTPortal_login_page.b0xTPortal_init(b0xTPortal_response.data.b0xTPortal_required_fields);

                //for aditional functionalities
                if(typeof(nextF) === "function") { nextF(); }

                b0xTPortal_loader('remove');
            }, error: function (error) {
                $('#b0xTPortal_failure_flag').append('<p class="b0xTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b0xTPortal_loader('remove');
            }
        }); 
    }
});