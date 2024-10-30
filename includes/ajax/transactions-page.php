<?php
/**
 * This class will manage the transactions page
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Transactions_Page extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_transactions_page() {
        $this->b0xTPortal_get_transactions_data(0);
    }

    function b0xTPortal_transactions_list() {
        $b0xTPortal_offset = sanitize_text_field($_POST["b0xTPortal_offset"]);
        $this->b0xTPortal_get_transactions_data($b0xTPortal_offset);
    }

    function b0xTPortal_get_transactions_data($b0xTPortal_offset) {
        $b0xTPortal_offset = sanitize_text_field($b0xTPortal_offset);

        ///security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);
        $b0xTPortal_search_field         = sanitize_text_field($_POST["b0xTPortal_search"]);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        //we need a valid offset 0+
        if(is_numeric($b0xTPortal_offset)) {} else {
             wp_send_json($this->b0xTPortal_response('error', "Error System: Something went wrong, missing offset!!", ''));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            $b0xTPortal_args = array(
                "command"              => "cmdBoxTPortalTransactionsList",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "customer_id"          => $b0xTPortal_customer_id,
                "offset"               => $b0xTPortal_offset,
                "search"               => $b0xTPortal_search_field
            );

            $b0xTPortal_transactions_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_transactions_data && sanitize_text_field($b0xTPortal_transactions_data->status) == '200') {
                $b0xTPortal_transactions_object_list              = $this->b0xTPortal_sanitize_object_values($b0xTPortal_transactions_data->transactionsObjList);
                $b0xTPortal_transactions_object_list_record_count = sanitize_text_field($b0xTPortal_transactions_data->recordCount);
                $b0xTPortal_transactions_object_list_offset       = sanitize_text_field($b0xTPortal_transactions_data->offset);
                $b0xTPortal_transactions_object_list_cust_email   = sanitize_text_field($b0xTPortal_transactions_data->custEmail);

                //looking for a valid record count and a valid offset.
                if(is_numeric($b0xTPortal_transactions_object_list_record_count) && is_numeric($b0xTPortal_transactions_object_list_offset)) {} else {
                    wp_send_json($this->b0xTPortal_response('error', "Error User: Invalid record count and/or offset.", ''));
                }

                $b0xTPortal_data = array(
                    'b0xTPortal_transactions_object_list'              => $b0xTPortal_transactions_object_list,
                    'b0xTPortal_transactions_object_list_record_count' => $b0xTPortal_transactions_object_list_record_count,
                    'b0xTPortal_transactions_object_list_offset'       => $b0xTPortal_transactions_object_list_offset,
                    'b0xTPortal_transactions_object_list_cust_email'   => $b0xTPortal_transactions_object_list_cust_email
                );

                wp_send_json($this->b0xTPortal_response('success', "Succesful transactions load.", $b0xTPortal_data));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_transactions_data);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_transactions_data)), "Failed transactions load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed transactions load, ".$b0xTPortal_error, ''));
    }

    function b0xTPortal_email_txn() {
        ///security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        //validate the post fields
        $b0xTPortal_txn_email = sanitize_text_field($_POST["b0xTPortal_txn_email"]);
        $b0xTPortal_txn_id    = sanitize_text_field($_POST["b0xTPortal_txn_id"]);

        if(is_numeric($b0xTPortal_txn_id)) {} else {
            wp_send_json($this->b0xTPortal_response('error', "Error System: Something went wrong, invalid transaction id!!", ''));
        }

        $b0xTPortal_email_error = 0;
        $b0xTPortal_email_array = explode('|', $b0xTPortal_txn_email);

        foreach($b0xTPortal_email_array as $b0xTPortal_value) {
            if($b0xTPortal_value == "" || !filter_var($b0xTPortal_value, FILTER_VALIDATE_EMAIL)) {
                $b0xTPortal_email_error++;
            }
        }

        if($b0xTPortal_email_error) {
            wp_send_json($this->b0xTPortal_response('error', "Error System: Something went wrong, invalid email!!", ''));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);

            $b0xTPortal_args = array(
                "command"              => "cmdBoxTPortalEmailTransaction",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "transaction_id"       => $b0xTPortal_txn_id,
                "transaction_email"    => $b0xTPortal_txn_email
            );

            $b0xTPortal_transaction_email_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_transaction_email_data && sanitize_text_field($b0xTPortal_transaction_email_data->status) == '200') {
                $b0xTPortal_data = array();
                wp_send_json($this->b0xTPortal_response('success', "Succesful transactions load.", $b0xTPortal_data));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_transaction_email_data);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_transaction_email_data)), "Failed to email transaction, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed to email transaction, ".$b0xTPortal_error, ''));
    }
}