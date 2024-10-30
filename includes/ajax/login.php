<?php
/**
 * This class will manage the login
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Login extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_login() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username = sanitize_text_field($_POST["b0xTPortal_username"]);
        $b0xTPortal_password = sanitize_text_field($_POST["b0xTPortal_password"]);

        $b0xTPortal_login_required_fields = array();
        if(is_array($_POST["b0xTPortal_required_fields"])) {
            $b0xTPortal_login_required_fields = $this->b0xTPortal_sanitize_array_values($_POST["b0xTPortal_required_fields"]);
        }

        //making sure that we still have an array that is not empty
        if(!(is_array($b0xTPortal_login_required_fields) && !empty($b0xTPortal_login_required_fields))) {
            wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
        }

        //validate some fields
        $b0xTPortal_field_errors = array();
        
        foreach($b0xTPortal_login_required_fields as $b0xTPortal_login_required_fields_value) {
            //username
            if($b0xTPortal_login_required_fields_value == "b0xTPortal_username") {
                if($b0xTPortal_username == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_login_required_fields_value); 
                }
            }

            //password
            if($b0xTPortal_login_required_fields_value == "b0xTPortal_password") {
                if($b0xTPortal_password == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_login_required_fields_value); 
                }
            }
        }

        //if any required field fails
        if(!empty($b0xTPortal_field_errors)) {
            $b0xTPortal_validation_data = array(
                "b0xTPortal_field_errors" => $b0xTPortal_field_errors
            );
            wp_send_json($this->b0xTPortal_response('validation_error', "Please correct the highlighted fields.", $b0xTPortal_validation_data));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username,  $b0xTPortal_password, "");

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api      = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_session_key_customer = sanitize_text_field($b0xTPortal_customer_handshake->key);
            $b0xTPortal_customer_id          = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            //storing username and session key in session, all sanitized
            $_SESSION['b0xTPortal_session']['username']    = $b0xTPortal_username;
            $_SESSION['b0xTPortal_session']['session_key'] = $b0xTPortal_session_key_customer;

            [$b0xTPortal_customer_data, $b0xTPortal_error] = $this->b0xTPortal_customer_data($b0xTPortal_username, $b0xTPortal_session_key_customer, $b0xTPortal_session_key_api, $b0xTPortal_customer_id);

            if($b0xTPortal_customer_data && is_array($b0xTPortal_customer_data) && !$b0xTPortal_error) {
                wp_send_json($this->b0xTPortal_response('success', "Succesful login.", $b0xTPortal_customer_data));
            }
       
            $this->b0xTPortal_clean_session();
            wp_send_json($this->b0xTPortal_response('error', "Failed to login, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed to login, ".$b0xTPortal_error, ''));
    }

    function b0xTPortal_auto_login() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Failed to auto login.", ''));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            [$b0xTPortal_customer_data, $b0xTPortal_error] = $this->b0xTPortal_customer_data($b0xTPortal_username, $b0xTPortal_session_key_customer, $b0xTPortal_session_key_api, $b0xTPortal_customer_id);

            if($b0xTPortal_customer_data && is_array($b0xTPortal_customer_data) && !$b0xTPortal_error) {
                wp_send_json($this->b0xTPortal_response('success', "Succesful auto login.", $b0xTPortal_customer_data));
            }
       
            $this->b0xTPortal_clean_session();
            wp_send_json($this->b0xTPortal_response('error', "Failed to auto login, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed to auto login, ".$b0xTPortal_error, ''));
    }

    /**
     * get customer data
     * 
     * @param string $b0xTPortal_username
     * @param string $b0xTPortal_session_key_customer
     * @param string $b0xTPortal_session_key_api
     * @param int $b0xTPortal_customer_id
     * 
     * @return array $b0xTPortal_customer_data
     * @return string $b0xTPortal_error
     */
    function b0xTPortal_customer_data($b0xTPortal_username, $b0xTPortal_session_key_customer, $b0xTPortal_session_key_api, $b0xTPortal_customer_id) {
        $b0xTPortal_username             = sanitize_text_field($b0xTPortal_username);
        $b0xTPortal_session_key_customer = sanitize_text_field($b0xTPortal_session_key_customer);
        $b0xTPortal_session_key_api      = sanitize_text_field($b0xTPortal_session_key_api);
        $b0xTPortal_customer_id          = sanitize_text_field($b0xTPortal_customer_id);

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
            $b0xTPortal_customer_name    = sanitize_text_field($b0xTPortal_customer_data->customerObj->Name);
            $b0xTPortal_customer_balance = sanitize_text_field($b0xTPortal_customer_data->customerObj->Balance);

            $b0xTPortal_customer_data_array = array(
                "b0xTPortal_customer_name"    => $b0xTPortal_customer_name,
                "b0xTPortal_customer_balance" => $b0xTPortal_customer_balance
            );

            return [$b0xTPortal_customer_data_array, null];
        }

        $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_customer_data);
        return [null, $b0xTPortal_error];
    }
}