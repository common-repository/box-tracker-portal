<?php
/**
 * This class will manage the logout
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Logout extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_logout() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            //clean up session for security
            $this->b0xTPortal_clean_session();
            wp_send_json($this->b0xTPortal_response('error', "Logged out, Error (600) System: Contact administration.", ''));
        }

        $b0xTPortal_login_required_fields = $this->b0xTPortal_evaluate_required_fields(array('username', 'password'), $this->b0xTPortal_login_fields_map);
         
        //if for whatever reason the eval fails       
        if(!$b0xTPortal_login_required_fields) {
            $b0xTPortal_login_required_fields = array("b0xTPortal_username", "b0xTPortal_password");
        }

        //we need to pass back the required
        //fields even when we do a log out.
        $b0xTPortal_logout_data = array(
            "b0xTPortal_required_fields" => $b0xTPortal_login_required_fields
        );

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            $b0xTPortal_args = array(
                "command"              => "cmdBoxTPortalCustomerLogOut",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer
            );

            $b0xTPortal_customer_logout = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_customer_logout && sanitize_text_field($b0xTPortal_customer_logout->status) == '200') {
                //clean up session for security
                //fully logout on server/local
                $this->b0xTPortal_clean_session();
                wp_send_json($this->b0xTPortal_response('success', "Logged out", $b0xTPortal_logout_data));
            }

            $this->b0xTPortal_clean_session();
            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_customer_logout);
            wp_send_json($this->b0xTPortal_response('error', "Logged out, ".$b0xTPortal_error, $b0xTPortal_logout_data));
        }

        $this->b0xTPortal_clean_session();
        wp_send_json($this->b0xTPortal_response('error', "Logged out, ".$b0xTPortal_error, $b0xTPortal_logout_data));
    }
}











