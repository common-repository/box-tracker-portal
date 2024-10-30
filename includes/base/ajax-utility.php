<?php
/**
 * This class will manage ajax utilities
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Server_Calls;

class B0xTPortal_Ajax_Utility {
    public $b0xTPortal_server_calls;
    public $b0xTPortal_login_fields_map;
    public $b0xTPortal_customer_fields_map;
    public $b0xTPortal_jobsite_fields_map;
    public $b0xTPortal_workorder_fields_map;
    public $b0xTPortal_ccard_fields_map;

    function __construct() {
        $this->b0xTPortal_server_calls = new B0xTPortal_Server_Calls();
        $this->b0xTPortal_map_fields();
    }

    /**
     * Map fields
     * 
     */
    function b0xTPortal_map_fields() {
        $this->b0xTPortal_login_fields_map = array(
            "username" => "b0xTPortal_username",
            "password" => "b0xTPortal_password"
        );

        $this->b0xTPortal_customer_fields_map = array(
            "txtName"     => "b0xTPortal_customer_name",
            "txtAddress1" => "b0xTPortal_customer_address",
            "txtAddress2" => "b0xTPortal_customer_address2",
            "txtCity"     => "b0xTPortal_customer_city",
            "selState"    => "b0xTPortal_customer_state",
            "txtZip"      => "b0xTPortal_customer_zip",
            "txtContact"  => "b0xTPortal_customer_contact",
            "txtPhone"    => "b0xTPortal_customer_phone",
            "txtCell"     => "b0xTPortal_customer_cell",
            "txtFax"      => "b0xTPortal_customer_fax",
            "txtEmail"    => "b0xTPortal_customer_email",
        );

        $this->b0xTPortal_jobsite_fields_map = array(
            "selJSState" => "b0xTPortal_jobsite_state",
            "txtJSAddress" => "b0xTPortal_jobsite_address",
            "txtJSCity" => "b0xTPortal_jobsite_city",
            "txtJSContact" => "b0xTPortal_jobsite_contact",
            "txtJSContactCell" => "b0xTPortal_jobsite_contact_cell",
            "txtJSCounty" => "b0xTPortal_jobsite_county",
            "txtJSCrossStreet" => "b0xTPortal_jobsite_cross_street",
            "txtJSMuni" => "b0xTPortal_jobsite_muni",
            "txtJSPO" => "b0xTPortal_jobsite_po",
            "txtJSZip" => "b0xTPortal_jobsite_zip"
        );

        $this->b0xTPortal_workorder_fields_map = array(
            "addWOAsset" => "b0xTPortal_workorder_asset",
            "addWOQty" => "b0xTPortal_workorder_contqty",
            "addWOType" => "b0xTPortal_workorder_wotype"
        );

        $this->b0xTPortal_ccard_fields_map = array(
            "selCardCountry" => "b0xTPortal_ccard_country",
            "selCardState" => "b0xTPortal_ccard_state",
            "selExpMonth" => "b0xTPortal_ccard_exp_month",
            "selExpYear" => "b0xTPortal_ccard_exp_year",
            "txtCardAdd1" => "b0xTPortal_ccard_address",
            "txtCardCity" => "b0xTPortal_ccard_city",
            "txtCardEmail" => "b0xTPortal_ccard_email",
            "txtCardPhone" => "b0xTPortal_ccard_phone",
            "txtCCardCVV" => "b0xTPortal_ccard_cvv",
            "txtCCardFName" => "b0xTPortal_ccard_first_name",
            "txtCCardLName" => "b0xTPortal_ccard_last_name",
            "txtCCardNo" => "b0xTPortal_ccard_number",
            "txtCCZip" => "b0xTPortal_ccard_zip"
        );
    }

    /**
     * Get required fields
     * Params come in sanitized
     * 
     * @param array $b0xTPortal_fields_map
     * @param array $b0xTPortal_required_fields
     * @return array $b0xTPortal_required_fields_mapped
     */
    function b0xTPortal_get_required_fields($b0xTPortal_fields_map, $b0xTPortal_required_fields) {
        $b0xTPortal_required_fields_mapped = array();
        if(is_array($b0xTPortal_required_fields) && is_array($b0xTPortal_fields_map)) {
            $b0xTPortal_required_fields = $this->b0xTPortal_sanitize_array_values($b0xTPortal_required_fields);
            $b0xTPortal_fields_map      = $this->b0xTPortal_sanitize_array_values($b0xTPortal_fields_map);
                
            foreach ($b0xTPortal_required_fields as $b0xTPortal_field_value) {
                if($b0xTPortal_fields_map[$b0xTPortal_field_value]) {
                    array_push($b0xTPortal_required_fields_mapped, $b0xTPortal_fields_map[$b0xTPortal_field_value]);    
                }    
            }
        }

        return $b0xTPortal_required_fields_mapped;
    }

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

    /**
     * Security checks
     * 
     * @return 1 or 0
     */
    function b0xTPortal_security_checks() {
        if(!DOING_AJAX) { return 0; } 
        if(!check_ajax_referer('_check__ajax_101', 'b0xTPortal_nonce')) { return 0; }
        return 1;
    }

    /**
     * clean up session
     * 
     */
    function b0xTPortal_clean_session() {
        if(isset($_SESSION['b0xTPortal_session'])) {
            //unset children just in case
            if(isset($_SESSION['b0xTPortal_session']['username'])) {
                unset($_SESSION['b0xTPortal_session']['username']); 
            }
            if(isset($_SESSION['b0xTPortal_session']['session_key'])) {
                unset($_SESSION['b0xTPortal_session']['session_key']); 
            }

            //unset parent
            unset($_SESSION['b0xTPortal_session']);
        }
    }

    /**
     * Error string from server calls
     * 
     * 
     * @param object $b0xTPortal_object
     * @return string $b0xTPortal_error
     */
    function b0xTPortal_generate_error_string($b0xTPortal_object) {
        #default error
        $b0xTPortal_error_code = "510";
        $b0xTPortal_error_string = "API: Contact administration.";

        if($b0xTPortal_object && is_object($b0xTPortal_object)) {
            $b0xTPortal_object_status = sanitize_text_field($b0xTPortal_object->status);
            $b0xTPortal_object_error  = sanitize_text_field($b0xTPortal_object->errorString);

            //make sure we have valid status
            if($b0xTPortal_object_status) {
                $b0xTPortal_error_code = $b0xTPortal_object_status;
            } else {
                $b0xTPortal_error_code = "0";
            }

            //make sure we have valid error string
            if($b0xTPortal_object_error) {
                $b0xTPortal_error_string = $b0xTPortal_object_error;
            } else {
                $b0xTPortal_error_string = "No data.";
            }
        }

        //generate the error and return it.
        $b0xTPortal_error = "Error (".$b0xTPortal_error_code.") ".$b0xTPortal_error_string;
        return $b0xTPortal_error;
    }

    /**
     * Evaluate handshakes
     * 
     * @param string $b0xTPortal_username
     * @param string $b0xTPortal_password
     * @param string $b0xTPortal_session_key_customer
     * 
     * @return object $b0xTPortal_handshake
     * @return object $b0xTPortal_customer_handshake
     * @return string $b0xTPortal_error
     */
    function b0xTPortal_evaluate_handshakes($b0xTPortal_username, $b0xTPortal_password, $b0xTPortal_session_key_customer) {
        $b0xTPortal_username             = sanitize_text_field($b0xTPortal_username);
        $b0xTPortal_password             = sanitize_text_field($b0xTPortal_password);
        $b0xTPortal_session_key_customer = sanitize_text_field($b0xTPortal_session_key_customer);

        //api handshake to get key
        $b0xTPortal_handshake = $this->b0xTPortal_server_calls->b0xTPortal_handshake();
        if($b0xTPortal_handshake && sanitize_text_field($b0xTPortal_handshake->status) == '200') {

            //customer handshake
            $b0xTPortal_session_key_api    = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_handshake = $this->b0xTPortal_server_calls->b0xTPortal_customer_handshake($b0xTPortal_username, $b0xTPortal_password, $b0xTPortal_session_key_customer, $b0xTPortal_session_key_api);

            if($b0xTPortal_customer_handshake && sanitize_text_field($b0xTPortal_customer_handshake->status) == '200') {
                return [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, null];
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_customer_handshake);
            return [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error];
        }

        $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_handshake);
        return [$b0xTPortal_handshake, null, $b0xTPortal_error];
    }

    /**
     * Evaluate for session expired
     * 
     * @param array $b0xPortal_handshake
     * @return string error/expired
     */
    function b0xTPortal_session_expired($b0xPortal_handshakes) {
        if(!is_array($b0xPortal_handshakes)) {
            return "error";
        }

        $b0xPortal_error = "error";
        foreach($b0xPortal_handshakes as $b0xPortal_handshake) {
            if($b0xPortal_handshake && sanitize_text_field($b0xPortal_handshake->status) == "507") {
                $b0xPortal_error = "expired";
                break; //end loop
            }
        }

        return $b0xPortal_error;
    }

    /**
     * Evaluate required fields 
     * 
     * @param array $b0xTPortal_required_fields
     * @return array $$b0xTPortal_required_fields_safe or null
     */
     function b0xTPortal_evaluate_required_fields($b0xTPortal_required_fields, $b0xTPortal_fields_map) {
        if(!$b0xTPortal_required_fields || !$b0xTPortal_fields_map) { return null; }
        if(!is_array($b0xTPortal_required_fields) || !is_array($b0xTPortal_fields_map)) { return null; }

        $b0xTPortal_required_fields        = $this->b0xTPortal_sanitize_array_values($b0xTPortal_required_fields);
        $b0xTPortal_fields_map             = $this->b0xTPortal_sanitize_array_values($b0xTPortal_fields_map);
        $b0xTPortal_required_fields_mapped = $this->b0xTPortal_get_required_fields($b0xTPortal_fields_map, $b0xTPortal_required_fields);

        //lets escape the values
        $b0xTPortal_required_fields_safe = array();
        foreach ($b0xTPortal_required_fields_mapped as $b0xTPortal_required_fields_value) {
            array_push($b0xTPortal_required_fields_safe, $b0xTPortal_required_fields_value);
        }

        return $b0xTPortal_required_fields_safe;
     }

    /**
     * Validate the credit card number
     * 
     * @param string $b0xTPortal_number
     * @return true or false
     */
    function b0xTPortal_credit_card_number_valid($b0xTPortal_number) {
        $b0xTPortal_number = sanitize_text_field($b0xTPortal_number);

        //Remove non-digits from the number
        $b0xTPortal_number = preg_replace('/[^0-9]/', '', $b0xTPortal_number);
 
        //Get the string length and parity
        $b0xTPortal_number_length = strlen($b0xTPortal_number);
        if($b0xTPortal_number_length == 0){
            return false;
        }

        $b0xTPortal_parity = $b0xTPortal_number_length % 2;
        
        //Split up the number into sin-
        //gle digits and get the total
        $b0xTPortal_total = 0;
        for ($i = 0; $i < $b0xTPortal_number_length; $i++) { 
            $b0xTPortal_digit = $b0xTPortal_number[$i];

            //Multiply alterna-
            //te digits by two
            if ($i % 2 == $b0xTPortal_parity) {
                $b0xTPortal_digit *= 2;

                //If the sum is two dig- 
                //its,  add them together
                if ($b0xTPortal_digit > 9) {
                    $b0xTPortal_digit -= 9;
                }       
            }       
            //Sum up the digits
            $b0xTPortal_total += $b0xTPortal_digit;
        }

        //If the total mod 10 equ-
        //als 0, the number is valid
        return ($b0xTPortal_total % 10 == 0) ? TRUE : FALSE;
    }

    /**
     * generate a json encoded array
     * 
     * @param string $b0xTPortal_status
     * @param string $b0xTPortal_message
     * @param string/array $b0xTPortal_data
     * @return json
     */
    function b0xTPortal_response($b0xTPortal_status, $b0xTPortal_message, $b0xTPortal_data) {
        $b0xTPortal_status  = sanitize_text_field($b0xTPortal_status);
        $b0xTPortal_message = sanitize_text_field($b0xTPortal_message);

        if(is_object($b0xTPortal_data)) {
            $b0xTPortal_data = "Invalid data format";
        }

        if(is_array($b0xTPortal_data)) {
            $b0xTPortal_data = $this->b0xTPortal_sanitize_array_values($b0xTPortal_data);
        } else {
            $b0xTPortal_data = sanitize_text_field($b0xTPortal_data);
        }

        $b0xTPortal_json = json_encode(array(
            'status'  => $b0xTPortal_status,
            'message' => $b0xTPortal_message,
            'data'    => $b0xTPortal_data
        ));
        return $b0xTPortal_json;
    }
}