<?php
/**
 * This class will handle server calls
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Global_Variables;

class B0xTPortal_Server_Calls extends B0xTPortal_Global_Variables {

    /**
     * Validate company information
     * 
     * @return array
     */
    function b0xTPortal_handshake(){
        $b0xTPortal_username = sanitize_text_field(get_option('b0xTPortal_username'));
        $b0xTPortal_password = sanitize_text_field(get_option('b0xTPortal_password'));
        
        $b0xTPortal_user_credentials = array( 
            'command'   => 'cmdBoxTPortalHandShake',
            'username'  => $b0xTPortal_username,
            'password'  => $b0xTPortal_password
        );

        $b0xTPortal_user_credentials_query_string = http_build_query($b0xTPortal_user_credentials);
        $b0xTPortal_response                      = wp_remote_post($this->b0xTPortal_boxT_url, array('body' => $b0xTPortal_user_credentials_query_string));
        $b0xTPortal_handshake_response_array      = json_decode($b0xTPortal_response['body']);
        return $b0xTPortal_handshake_response_array;
    }

    /**
     * Validate customer information
     * Params come in sanitized/validated
     * 
     * @param string $b0xTPortal_username_customer
     * @param string $b0xTPortal_password_customer
     * @param string $b0xTPortal_session_key_customer
     * @param string $b0xTPortal_session_key_api
     * @return array
     */
    function b0xTPortal_customer_handshake($b0xTPortal_username_customer, $b0xTPortal_password_customer, $b0xTPortal_session_key_customer, $b0xTPortal_session_key_api){
        $b0xTPortal_username_customer    = sanitize_text_field($b0xTPortal_username_customer);
        $b0xTPortal_password_customer    = sanitize_text_field($b0xTPortal_password_customer);
        $b0xTPortal_session_key_customer = sanitize_text_field($b0xTPortal_session_key_customer);
        $b0xTPortal_session_key_api      = sanitize_text_field($b0xTPortal_session_key_api);
        $b0xTPortal_username_api         = sanitize_text_field(get_option('b0xTPortal_username'));
        $b0xTPortal_password_api         = sanitize_text_field(get_option('b0xTPortal_password'));       

        $b0xTPortal_user_credentials = array( 
            'command'              => 'cmdBoxTPortalCustomerHandShake',
            'username_api'         => $b0xTPortal_username_api,
            'password_api'         => $b0xTPortal_password_api,
            'session_key_api'      => $b0xTPortal_session_key_api,
            'username_customer'    => $b0xTPortal_username_customer,
            'password_customer'    => $b0xTPortal_password_customer,
            'session_key_customer' => $b0xTPortal_session_key_customer
        );

        $b0xTPortal_user_credentials_query_string     = http_build_query($b0xTPortal_user_credentials);
        $b0xTPortal_response                          = wp_remote_post($this->b0xTPortal_boxT_url, array('body' => $b0xTPortal_user_credentials_query_string));
        $b0xTPortal_customer_handshake_response_array = json_decode($b0xTPortal_response['body']);
        return $b0xTPortal_customer_handshake_response_array;
    }

    /**
     * Call Box Tracker Command
     * 
     * @param array $b0xTPortal_args
     */
     function b0xTPortal_call_command($b0xTPortal_args) {
        if(!is_array($b0xTPortal_args)) {
            return null; 
        }

        $b0xTPortal_args         = $this->b0xTPortal_sanitize_array_values($b0xTPortal_args);
        $b0xTPortal_username_api = sanitize_text_field(get_option('b0xTPortal_username'));   

        $b0xTPortal_credentials = array(
            'username_api' => $b0xTPortal_username_api
        );

        $b0xTPortal_credentials              = array_merge($b0xTPortal_credentials, $b0xTPortal_args);
        $b0xTPortal_credentials_query_string = http_build_query($b0xTPortal_credentials);
        $b0xTPortal_response                 = wp_remote_post($this->b0xTPortal_boxT_url, array('body' => $b0xTPortal_credentials_query_string));
        $b0xTPortal_response_array           = json_decode($b0xTPortal_response['body']);
        return $b0xTPortal_response_array;
     }

    /**
     * Get a list of states
     * 
     * @param string $b0xTPortal_country_id
     * @return string
     */
    function b0xTPortal_get_states($b0xTPortal_country_id) {
        $b0xTPortal_country_id = sanitize_text_field($b0xTPortal_country_id);

        global $wpdb;
        if($b0xTPortal_country_id == "Canada"){
             $b0xTPortal_country_id = 'CAN';
        } else {
             $b0xTPortal_country_id = 'USA';
        }
        
        $b0xTPortal_output = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix."b0xTPortal_states WHERE country_id = '".$b0xTPortal_country_id."'");

        if(!is_array($b0xTPortal_output)) { return null; }
        return $this->b0xTPortal_sanitize_array_values($b0xTPortal_output);
    }

    /**
     * Get a list of states
     * 
     * @return string
     */
    function b0xTPortal_get_all_states() {
        global $wpdb;
        $b0xTPortal_output = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix."b0xTPortal_states");
        if(!is_array($b0xTPortal_output)) { return null; }
        return $this->b0xTPortal_sanitize_array_values($b0xTPortal_output);
    }

    /*
     * redefining these helper functions here, so that i dont
     * have to extend utility in the global variables class.
    */

    /**
     * Sanitize array
     * 
     * @param  array $b0xTPortal_array
     * @return sanitized array
     */
    function b0xTPortal_sanitize_array_values($b0xTPortal_array) { 
        //if not an array dont proceed.
        if(!is_array($b0xTPortal_array)) { return $b0xTPortal_array; }

        foreach ($b0xTPortal_array as $b0xTPortal_key => &$b0xTPortal_value) {
            if(is_array($b0xTPortal_value)) {
                $b0xTPortal_value = $this->b0xTPortal_sanitize_array_values($b0xTPortal_value);
            } else {
                if(is_object($b0xTPortal_value)) {
                    $b0xTPortal_value = $this->b0xTPortal_sanitize_object_values($b0xTPortal_value);  
                } else {
                    $b0xTPortal_value = sanitize_text_field($b0xTPortal_value);
                }
            }
        }

        return $b0xTPortal_array;
    }

    /**
     * Sanitize objects
     * 
     * @param  object $b0xTPortal_object
     * @return sanitized object
     */
    function b0xTPortal_sanitize_object_values($b0xTPortal_object) {
        //if not an object dont proceed.
        if(!is_object($b0xTPortal_object)) { return $b0xTPortal_object; }

        foreach ($b0xTPortal_object as $b0xTPortal_key => &$b0xTPortal_value) {
            if(is_object($b0xTPortal_value)) {
                $b0xTPortal_value = $this->b0xTPortal_sanitize_object_values($b0xTPortal_value);
            } else {
                if(is_array($b0xTPortal_value)) {
                    $b0xTPortal_value = $this->b0xTPortal_sanitize_array_values($b0xTPortal_value);
                } else {
                    $b0xTPortal_value = sanitize_text_field($b0xTPortal_value);
                }
            }
        }

        return $b0xTPortal_object;
    }
}