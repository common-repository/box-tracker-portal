<?php
/**
 * This class will manage the home page
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Profile_Page extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_profile_page() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        } 

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            $b0xTPortal_args = array(
                "command"              => "cmdBoxTPortalCustomerData",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "customer_id"          => $b0xTPortal_customer_id
            );

            //customer data
            $b0xTPortal_customer_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_customer_data && sanitize_text_field($b0xTPortal_customer_data->status) == '200') {
                $b0xTPortal_customer_name     = sanitize_text_field($b0xTPortal_customer_data->customerObj->Name);
                $b0xTPortal_customer_address  = sanitize_text_field($b0xTPortal_customer_data->customerObj->Address1);
                $b0xTPortal_customer_address2 = sanitize_text_field($b0xTPortal_customer_data->customerObj->Address2);
                $b0xTPortal_customer_city     = sanitize_text_field($b0xTPortal_customer_data->customerObj->City);
                $b0xTPortal_customer_state    = sanitize_text_field($b0xTPortal_customer_data->customerObj->State);

                //we need a list of states
                $b0xTPortal_country_id    = sanitize_text_field(get_option('b0xTPortal_admin_country'));
                $b0xTPortal_list_of_state = $this->b0xTPortal_server_calls->b0xTPortal_get_states($b0xTPortal_country_id);

                if(!is_array($b0xTPortal_list_of_state)) {
                    wp_send_json($this->b0xTPortal_response('error', "Failed to get state list.", ''));
                }

                $b0xTPortal_customer_zip             = sanitize_text_field($b0xTPortal_customer_data->customerObj->Zip);
                $b0xTPortal_customer_contact         = sanitize_text_field($b0xTPortal_customer_data->customerObj->Contact);
                $b0xTPortal_customer_phone           = sanitize_text_field($b0xTPortal_customer_data->customerObj->Phone);
                $b0xTPortal_customer_cell            = sanitize_text_field($b0xTPortal_customer_data->customerObj->Cell);
                $b0xTPortal_customer_fax             = sanitize_text_field($b0xTPortal_customer_data->customerObj->Fax);
                $b0xTPortal_customer_email           = sanitize_text_field($b0xTPortal_customer_data->customerObj->Email);
                $b0xTPortal_customer_email_confirm   = sanitize_text_field($b0xTPortal_customer_data->customerObj->EmailConfirm);
                $b0xTPortal_customer_email_reminders = sanitize_text_field($b0xTPortal_customer_data->customerObj->EmailReminders);
                $b0xTPortal_customer_email_thankyou  = sanitize_text_field($b0xTPortal_customer_data->customerObj->EmailThankYou);
                $b0xTPortal_customer_sms             = sanitize_text_field($b0xTPortal_customer_data->customerObj->SMSNotifications);

                $b0xTPortal_customer_required_fields_for_eval = array();
                if(is_array($b0xTPortal_customer_data->customerObj->requiredFields)) {
                    $b0xTPortal_customer_required_fields_for_eval = $this->b0xTPortal_sanitize_array_values($b0xTPortal_customer_data->customerObj->requiredFields);   
                }

                $b0xTPortal_customer_required_fields = $this->b0xTPortal_evaluate_required_fields($b0xTPortal_customer_required_fields_for_eval, $this->b0xTPortal_customer_fields_map);
                
                if(!(is_array($b0xTPortal_customer_required_fields) && !empty($b0xTPortal_customer_required_fields))) {
                    wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
                }

                $b0xTPortal_customer_data_array = array(
                    "b0xTPortal_customer_name"            => $b0xTPortal_customer_name,
                    "b0xTPortal_customer_address"         => $b0xTPortal_customer_address,
                    "b0xTPortal_customer_address2"        => $b0xTPortal_customer_address2,
                    "b0xTPortal_customer_city"            => $b0xTPortal_customer_city,
                    "b0xTPortal_customer_state"           => $b0xTPortal_customer_state,
                    "b0xTPortal_customer_zip"             => $b0xTPortal_customer_zip,
                    "b0xTPortal_customer_contact"         => $b0xTPortal_customer_contact,
                    "b0xTPortal_customer_phone"           => $b0xTPortal_customer_phone,
                    "b0xTPortal_customer_cell"            => $b0xTPortal_customer_cell,
                    "b0xTPortal_customer_fax"             => $b0xTPortal_customer_fax,
                    "b0xTPortal_customer_email"           => $b0xTPortal_customer_email,
                    "b0xTPortal_customer_email_confirm"   => $b0xTPortal_customer_email_confirm,
                    "b0xTPortal_customer_email_thankyou"  => $b0xTPortal_customer_email_thankyou,
                    "b0xTPortal_customer_email_reminders" => $b0xTPortal_customer_email_reminders,
                    "b0xTPortal_customer_sms"             => $b0xTPortal_customer_sms,
                    "b0xTPortal_required_fields"          => $b0xTPortal_customer_required_fields,
                    "b0xTPortal_list_of_state"            => $b0xTPortal_list_of_state
                );

                //attach credit card mask if any on file
                if(is_array($b0xTPortal_customer_data->customerObj->CCardObjList)) {
                    $b0xTPortal_customer_ccard_mask =  $this->b0xTPortal_sanitize_array_values($b0xTPortal_customer_data->customerObj->CCardObjList);
                    $b0xTPortal_customer_data_array["b0xTPortal_customer_ccard_mask"] = $b0xTPortal_customer_ccard_mask;
                }

                wp_send_json($this->b0xTPortal_response('success', "Succesful profile page load.", $b0xTPortal_customer_data_array));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_customer_data);
            wp_send_json($this->b0xTPortal_response('error', "Failed profile page load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed profile page load, ".$b0xTPortal_error, ''));        
    }

    //save customer
    function b0xTPortal_save_customer() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b0xTPortal_customer_name            = sanitize_text_field($_POST["b0xTPortal_customer_name"]);
        $b0xTPortal_customer_address         = sanitize_text_field($_POST["b0xTPortal_customer_address"]);
        $b0xTPortal_customer_address2        = sanitize_text_field($_POST["b0xTPortal_customer_address2"]);
        $b0xTPortal_customer_city            = sanitize_text_field($_POST["b0xTPortal_customer_city"]);
        $b0xTPortal_customer_state           = sanitize_text_field($_POST["b0xTPortal_customer_state"]);
        $b0xTPortal_customer_zip             = sanitize_text_field($_POST["b0xTPortal_customer_zip"]);
        $b0xTPortal_customer_contact         = sanitize_text_field($_POST["b0xTPortal_customer_contact"]);
        $b0xTPortal_customer_phone           = sanitize_text_field($_POST["b0xTPortal_customer_phone"]);
        $b0xTPortal_customer_cell            = sanitize_text_field($_POST["b0xTPortal_customer_cell"]);
        $b0xTPortal_customer_fax             = sanitize_text_field($_POST["b0xTPortal_customer_fax"]);
        $b0xTPortal_customer_email           = sanitize_text_field($_POST["b0xTPortal_customer_email"]);
        $b0xTPortal_customer_email_confirm   = sanitize_text_field($_POST["b0xTPortal_customer_email_confirm"]);
        $b0xTPortal_customer_email_thankyou  = sanitize_text_field($_POST["b0xTPortal_customer_email_thankyou"]);
        $b0xTPortal_customer_email_reminders = sanitize_text_field($_POST["b0xTPortal_customer_email_reminders"]);
        $b0xTPortal_customer_sms             = sanitize_text_field($_POST["b0xTPortal_customer_sms"]);

        //expecting an array from the gui, sanitizing it below.
        $b0xTPortal_profile_required_fields = array();
        if(is_array($_POST["b0xTPortal_required_fields"])) {
            $b0xTPortal_profile_required_fields = $this->b0xTPortal_sanitize_array_values($_POST["b0xTPortal_required_fields"]);
        }

        if(!(is_array($b0xTPortal_profile_required_fields) && !empty($b0xTPortal_profile_required_fields))) {
            wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
        }

        //validate some fields
        $b0xTPortal_field_errors = array();

        foreach($b0xTPortal_profile_required_fields as $b0xTPortal_profile_required_fields_value) {
            //customer name
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_name") {
                if($b0xTPortal_customer_name == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer address
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_address") {
                if($b0xTPortal_customer_address == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer address2
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_address2") {
                if($b0xTPortal_customer_address2 == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer city
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_city") {
                if($b0xTPortal_customer_city == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer state, expecting a certain format
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_state") {
                if(!preg_match("/^[A-Z]{2}$/", $b0xTPortal_customer_state)) {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer zip
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_zip") {
                if($b0xTPortal_customer_zip == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer phone, expexting a certain format
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_phone") {
                if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b0xTPortal_customer_phone)) {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer cell, expexting a certain format
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_cell") {
                if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b0xTPortal_customer_cell)) {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer fax, expexting a certain format
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_fax") {
                if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b0xTPortal_customer_fax)) {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }

            //customer email
            if($b0xTPortal_profile_required_fields_value == "b0xTPortal_customer_email") {
                if($b0xTPortal_customer_email == "" || !filter_var($b0xTPortal_customer_email, FILTER_VALIDATE_EMAIL)) {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_profile_required_fields_value); 
                }
            }
        }

        //confirmations
        if(!($b0xTPortal_customer_email_confirm == 1 || $b0xTPortal_customer_email_confirm == 0)) {
            array_push($b0xTPortal_field_errors, "b0xTPortal_customer_email_confirm");  
        }

        //thank yous
        if(!($b0xTPortal_customer_email_thankyou == 1 || $b0xTPortal_customer_email_thankyou == 0)) {
            array_push($b0xTPortal_field_errors, "b0xTPortal_customer_email_thankyou");  
        }

        //reminders
        if(!($b0xTPortal_customer_email_reminders == 1 || $b0xTPortal_customer_email_reminders == 0)) {
            array_push($b0xTPortal_field_errors, "b0xTPortal_customer_email_reminders");  
        }

        //sms
        if(!($b0xTPortal_customer_sms == 1 || $b0xTPortal_customer_sms == 0)) {
            array_push($b0xTPortal_field_errors, "b0xTPortal_customer_sms");  
        }

        //if any required field fails
        if(!empty($b0xTPortal_field_errors)) {
            $b0xTPortal_validation_data = array(
                "b0xTPortal_field_errors" => $b0xTPortal_field_errors
            );
            wp_send_json($this->b0xTPortal_response('validation_error', "Please correct the highlighted fields.", $b0xTPortal_validation_data));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            $b0xTPortal_customer_args = array(
                "command"                  => "cmdBoxTPortalSaveCustomerProfile",
                "customer_name"            => $b0xTPortal_customer_name,
                "customer_address"         => $b0xTPortal_customer_address,
                "customer_address2"        => $b0xTPortal_customer_address2,
                "customer_city"            => $b0xTPortal_customer_city,
                "customer_state"           => $b0xTPortal_customer_state,
                "customer_zip"             => $b0xTPortal_customer_zip,
                "customer_contact"         => $b0xTPortal_customer_contact,
                "customer_phone"           => $b0xTPortal_customer_phone,
                "customer_cell"            => $b0xTPortal_customer_cell,
                "customer_fax"             => $b0xTPortal_customer_fax,
                "customer_email"           => $b0xTPortal_customer_email,
                "customer_email_confirm"   => $b0xTPortal_customer_email_confirm,
                "customer_email_thankyou"  => $b0xTPortal_customer_email_thankyou,
                "customer_email_reminders" => $b0xTPortal_customer_email_reminders,
                "customer_sms"             => $b0xTPortal_customer_sms,
                "session_key_api"          => $b0xTPortal_session_key_api,
                "username_customer"        => $b0xTPortal_username,
                "session_key_customer"     => $b0xTPortal_session_key_customer,
                "customer_id"              => $b0xTPortal_customer_id
            );

            //save customer profile
            $b0xTPortal_customer_save = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_customer_args);

            if($b0xTPortal_customer_save && sanitize_text_field($b0xTPortal_customer_save->status) == '200') {
                wp_send_json($this->b0xTPortal_response('success', "Successfull profile save", ''));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_customer_save);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_customer_save)), "Failed to save profile, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed to save profile, ".$b0xTPortal_error, ''));
    }
}