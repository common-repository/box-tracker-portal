<?php
/**
 * This class will manage the plugin load
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Plugin_Load extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_plugin_load() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        //handshake
        $b0xTPortal_handshake = $this->b0xTPortal_server_calls->b0xTPortal_handshake();

        if($b0xTPortal_handshake && sanitize_text_field($b0xTPortal_handshake->status) == '200') {
            $b0xTPortal_login_required_fields = $this->b0xTPortal_evaluate_required_fields(array('username', 'password'), $this->b0xTPortal_login_fields_map);
            
            //must have required fields    
            if(!$b0xTPortal_login_required_fields) {
                wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
            }

            //prompt auto login
            $b0xTPortal_login_prompt = "manual";
            if(isset($_SESSION['b0xTPortal_session'])) {
                $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
                $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']); 

                if($b0xTPortal_username && $b0xTPortal_session_key_customer) {
                    $b0xTPortal_login_prompt = "auto"; 
                }
            }

            //prepare data
            $b0xTPortal_plugin_load_data = array(
                "b0xTPortal_required_fields" => $b0xTPortal_login_required_fields,
                "b0xTPortal_login_prompt"    => $b0xTPortal_login_prompt
            );

            wp_send_json($this->b0xTPortal_response('success', "Succesful handshake.", $b0xTPortal_plugin_load_data));
        }

        $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_handshake);
        wp_send_json($this->b0xTPortal_response('error', "Failed to load plugin, ".$b0xTPortal_error, ''));
    }
}