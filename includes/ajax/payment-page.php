<?php
/**
 * This class will manage the payment page
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Payment_Page extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_payment_page() {
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
                "command"              => "cmdBoxTPortalTransactionData",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "customer_id"          => $b0xTPortal_customer_id,
                "version"              => 2
            );

            //transactions data
            $b0xTPortal_transaction_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_transaction_data && sanitize_text_field($b0xTPortal_transaction_data->status) == '200') {
                $b0xTPortal_transaction_list  = $this->b0xTPortal_sanitize_array_values($b0xTPortal_transaction_data->transactionObj->TxnList);
                $b0xTPortal_customer_balance  = sanitize_text_field($b0xTPortal_transaction_data->transactionObj->CustBalance);

                $b0xTPortal_ccard_required_fields = array(
                    "b0xTPortal_ccard_country", "b0xTPortal_ccard_state", "b0xTPortal_ccard_exp_month", "b0xTPortal_ccard_exp_year",
                    "b0xTPortal_ccard_address", "b0xTPortal_ccard_city", "b0xTPortal_ccard_email", "b0xTPortal_ccard_phone",
                    "b0xTPortal_ccard_cvv", "b0xTPortal_ccard_first_name", "b0xTPortal_ccard_last_name", "b0xTPortal_ccard_number",
                    "b0xTPortal_ccard_zip"
                );

                //we need a list of states
                $b0xTPortal_list_of_state = $this->b0xTPortal_server_calls->b0xTPortal_get_all_states();

                if(!is_array($b0xTPortal_list_of_state)) {
                    wp_send_json($this->b0xTPortal_response('error', "Failed to get state list.", ''));
                }

                $b0xTPortal_transaction_data_array = array(
                    "b0xTPortal_list_of_state"     => $b0xTPortal_list_of_state,
                    "b0xTPortal_required_fields"   => $b0xTPortal_ccard_required_fields,
                    "b0xTPortal_transaction_list"  => $b0xTPortal_transaction_list,
                    "b0xTPortal_customer_balance"  => $b0xTPortal_customer_balance
                );

                //attach credit card mask if any on file
                if(is_array($b0xTPortal_transaction_data->transactionObj->CCardObjList)) {
                    $b0xTPortal_transaction_ccard_mask =  $this->b0xTPortal_sanitize_array_values($b0xTPortal_transaction_data->transactionObj->CCardObjList);
                    $b0xTPortal_transaction_data_array["b0xTPortal_transaction_ccard_mask"] = $b0xTPortal_transaction_ccard_mask;
                }

                wp_send_json($this->b0xTPortal_response('success', "Succesful payment page load.", $b0xTPortal_transaction_data_array));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_transactions_data);
            wp_send_json($this->b0xTPortal_response('error', "Failed payment page load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed payment page load, ".$b0xTPortal_error, '')); 
    }

    function b0xTPortal_process_payment() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        } 

        //transaction id
        $b0xTPortal_payment_mode   = sanitize_text_field($_POST["b0xTPortal_payment_mode"]);
        $b0xTPortal_transaction_id = sanitize_text_field($_POST["b0xTPortal_transaction_id"]);
        $b0xTPortal_ccard_id       = sanitize_text_field($_POST["b0xTPortal_ccard_id"]);

        //we need a numeric ids and with valid logic
        if(is_numeric($b0xTPortal_payment_mode) && ($b0xTPortal_payment_mode == 1 || $b0xTPortal_payment_mode == 2) && is_numeric($b0xTPortal_ccard_id)) {} else {
             wp_send_json($this->b0xTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        }

        $b0xTPortal_field_errors = array();
        $b0xTPortal_extra_fields = array();

        if($b0xTPortal_ccard_id == "0") { //field validation
            $b0xTPortal_ccard_address      = sanitize_text_field($_POST["b0xTPortal_ccard_address"]);
            $b0xTPortal_ccard_address2     = sanitize_text_field($_POST["b0xTPortal_ccard_address2"]);
            $b0xTPortal_ccard_city         = sanitize_text_field($_POST["b0xTPortal_ccard_city"]);
            $b0xTPortal_ccard_country      = sanitize_text_field($_POST["b0xTPortal_ccard_country"]);
            $b0xTPortal_ccard_cvv          = sanitize_text_field($_POST["b0xTPortal_ccard_cvv"]);
            $b0xTPortal_ccard_email        = sanitize_text_field($_POST["b0xTPortal_ccard_email"]);
            $b0xTPortal_ccard_exp_month    = sanitize_text_field($_POST["b0xTPortal_ccard_exp_month"]);
            $b0xTPortal_ccard_exp_year     = sanitize_text_field($_POST["b0xTPortal_ccard_exp_year"]);
            $b0xTPortal_ccard_first_name   = sanitize_text_field($_POST["b0xTPortal_ccard_first_name"]);
            $b0xTPortal_ccard_last_name    = sanitize_text_field($_POST["b0xTPortal_ccard_last_name"]);
            $b0xTPortal_ccard_number       = sanitize_text_field($_POST["b0xTPortal_ccard_number"]);
            $b0xTPortal_ccard_phone        = sanitize_text_field($_POST["b0xTPortal_ccard_phone"]);
            $b0xTPortal_ccard_state        = sanitize_text_field($_POST["b0xTPortal_ccard_state"]);
            $b0xTPortal_ccard_zip          = sanitize_text_field($_POST["b0xTPortal_ccard_zip"]);
            $b0xTPortal_ccard_store        = sanitize_text_field($_POST["b0xTPortal_ccard_store"]);
            $b0xTPortal_ccard_make_primary = sanitize_text_field($_POST["b0xTPortal_ccard_make_primary"]);

            //store fields on the extra array
            $b0xTPortal_extra_fields["ccard_address"]      = $b0xTPortal_ccard_address;
            $b0xTPortal_extra_fields["ccard_address2"]     = $b0xTPortal_ccard_address2;
            $b0xTPortal_extra_fields["ccard_city"]         = $b0xTPortal_ccard_city;
            $b0xTPortal_extra_fields["ccard_country"]      = $b0xTPortal_ccard_country;
            $b0xTPortal_extra_fields["ccard_cvv"]          = $b0xTPortal_ccard_cvv;
            $b0xTPortal_extra_fields["ccard_email"]        = $b0xTPortal_ccard_email;
            $b0xTPortal_extra_fields["ccard_exp_month"]    = $b0xTPortal_ccard_exp_month;
            $b0xTPortal_extra_fields["ccard_exp_year"]     = $b0xTPortal_ccard_exp_year;
            $b0xTPortal_extra_fields["ccard_first_name"]   = $b0xTPortal_ccard_first_name;
            $b0xTPortal_extra_fields["ccard_last_name"]    = $b0xTPortal_ccard_last_name;
            $b0xTPortal_extra_fields["ccard_number"]       = $b0xTPortal_ccard_number;
            $b0xTPortal_extra_fields["ccard_phone"]        = $b0xTPortal_ccard_phone;
            $b0xTPortal_extra_fields["ccard_state"]        = $b0xTPortal_ccard_state;
            $b0xTPortal_extra_fields["ccard_zip"]          = $b0xTPortal_ccard_zip;
            $b0xTPortal_extra_fields["ccard_store"]        = $b0xTPortal_ccard_store;
            $b0xTPortal_extra_fields["ccard_make_primary"] = $b0xTPortal_ccard_make_primary;

            $b0xTPortal_ccard_required_fields = array();
            if(is_array($_POST["b0xTPortal_required_fields"])) {
                $b0xTPortal_ccard_required_fields = $this->b0xTPortal_sanitize_array_values($_POST["b0xTPortal_required_fields"]);
            }

            if(!(is_array($b0xTPortal_ccard_required_fields) && !empty($b0xTPortal_ccard_required_fields))) {
                wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
            }

            foreach($b0xTPortal_ccard_required_fields as $b0xTPortal_ccard_required_fields_value) {
                //address
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_address") {
                    if($b0xTPortal_ccard_address == "") {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //address2
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_address2") {
                    if($b0xTPortal_ccard_address2 == "") {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //city
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_city") {
                    if($b0xTPortal_ccard_city == "") {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //cvv
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_cvv") {
                    if(!preg_match('/^[0-9]{3,4}$/', $b0xTPortal_ccard_cvv)) {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //email
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_email") {
                    if($b0xTPortal_ccard_email == "" || !filter_var($b0xTPortal_ccard_email, FILTER_VALIDATE_EMAIL)) {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //month
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_exp_month") {
                    if(!preg_match('/^[0-9]{1,2}$/', $b0xTPortal_ccard_exp_month)) {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //year
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_exp_year") {
                    if(!preg_match('/^[0-9]{2}$/', $b0xTPortal_ccard_exp_year)) {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //first name
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_first_name") {
                    if($b0xTPortal_ccard_first_name == "") {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //last name
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_last_name") {
                    if($b0xTPortal_ccard_last_name == "") {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //ccard number
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_number") {
                    if($this->b0xTPortal_credit_card_number_valid($b0xTPortal_ccard_number) == false) {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //phone
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_phone") {
                    if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b0xTPortal_ccard_phone)) {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //state
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_state") {
                    if(!preg_match("/^[A-Z]{2}$/", $b0xTPortal_ccard_state)) {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }

                //zip
                if($b0xTPortal_ccard_required_fields_value == "b0xTPortal_ccard_zip") {
                    if($b0xTPortal_ccard_zip == "") {
                        array_push($b0xTPortal_field_errors, $b0xTPortal_ccard_required_fields_value); 
                    }
                }
            }

            //store bit
            if(!($b0xTPortal_ccard_store == 1 || $b0xTPortal_ccard_store == 0)) {
                array_push($b0xTPortal_field_errors, "b0xTPortal_ccard_store");  
            }

            //primary bit
            if(!($b0xTPortal_ccard_make_primary == 1 || $b0xTPortal_ccard_make_primary == 0)) {
                array_push($b0xTPortal_field_errors, "b0xTPortal_ccard_make_primary");  
            }
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

            $b0xTPortal_ccard_args = array(
                "command"              => "cmdBoxTPortalProcessPayment",
                "version"              => 2,
                "payment_mode"         => $b0xTPortal_payment_mode,
                "ccard_id"             => $b0xTPortal_ccard_id,
                "transaction_id"       => $b0xTPortal_transaction_id,
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "customer_id"          => $b0xTPortal_customer_id
            );

            $b0xTPortal_ccard_args = array_merge($b0xTPortal_ccard_args, $b0xTPortal_extra_fields);
            $b0xTPortal_process_payment = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_ccard_args);

            if($b0xTPortal_process_payment && sanitize_text_field($b0xTPortal_process_payment->status) == '200') {
                wp_send_json($this->b0xTPortal_response('success', "Successfull process payment", ''));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_process_payment);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_process_payment)), "Failed to process payment, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed to process payment, ".$b0xTPortal_error, ''));
    }
}