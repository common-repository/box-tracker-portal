<?php
/**
 * This class will manage the home page
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Home_Page extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_home_page() {
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
                $b0xTPortal_customer_name    = sanitize_text_field($b0xTPortal_customer_data->customerObj->Name);
                $b0xTPortal_customer_balance = sanitize_text_field($b0xTPortal_customer_data->customerObj->Balance);

                $b0xTPortal_customer_data_array = array(
                    "b0xTPortal_customer_name"    => $b0xTPortal_customer_name,
                    "b0xTPortal_customer_balance" => $b0xTPortal_customer_balance
                );

                wp_send_json($this->b0xTPortal_response('success', "Succesful home page load.", $b0xTPortal_customer_data_array));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_customer_data);
            wp_send_json($this->b0xTPortal_response('error', "Failed home page load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed home page load, ".$b0xTPortal_error, ''));        
    }
}