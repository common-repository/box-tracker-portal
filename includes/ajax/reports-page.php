<?php
/**
 * This class will manage the reports page
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Reports_Page extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_reports_page() {
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
                "command"              => "cmdBoxTPortalReportList",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer
            );

            //report list data
            $b0xTPortal_reports_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_reports_data && sanitize_text_field($b0xTPortal_reports_data->status) == '200') {
                $b0xTPortal_reports_object_list = $this->b0xTPortal_sanitize_array_values($b0xTPortal_reports_data->reportObjList);

                $b0xTPortal_data = array(
                    "b0xTPortal_reports_object_list" => $b0xTPortal_reports_object_list
                );

                wp_send_json($this->b0xTPortal_response('success', "Succesful reports page load.", $b0xTPortal_data));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_reports_data);
            wp_send_json($this->b0xTPortal_response('error', "Failed reports page load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed reports page load, ".$b0xTPortal_error, '')); 
    }

    function b0xTPortal_reports_output_page() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        } 

        $b0xTPortal_report_id = sanitize_text_field($_POST["b0xTPortal_report_id"]);

        //we need a numeric id
        if(is_numeric($b0xTPortal_report_id)) {} else {
             wp_send_json($this->b0xTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            $b0xTPortal_args = array(
                "command"              => "cmdBoxTPortalReportParams",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "report_id"            => $b0xTPortal_report_id,
                "customer_id"          => $b0xTPortal_customer_id
            );

            //report params data
            $b0xTPortal_report_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_report_data && sanitize_text_field($b0xTPortal_report_data->status) == '200') {
                $b0xTPortal_report_params = $this->b0xTPortal_sanitize_object_values($b0xTPortal_report_data->reportParamsObj);

                $b0xTPortal_data = array(
                    "b0xTPortal_report_params" => $b0xTPortal_report_params
                );

                wp_send_json($this->b0xTPortal_response('success', "Succesful reports output page load.", $b0xTPortal_data));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_report_data);
            wp_send_json($this->b0xTPortal_response('error', "Failed reports output page load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed reports output page load, ".$b0xTPortal_error, '')); 
    }

    function b0xTPortal_report_details() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        } 

        $b0xTPortal_report_id = sanitize_text_field($_POST["b0xTPortal_report_id"]);

        //we need a numeric id
        if(is_numeric($b0xTPortal_report_id)) {} else {
             wp_send_json($this->b0xTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        } 

        $b0xTPortal_report_params = array();
        if($_POST["b0xTPortal_report_start_date"]) {
            $b0xTPortal_report_params["startDate"] = sanitize_text_field($_POST["b0xTPortal_report_start_date"]);
        }

        if($_POST["b0xTPortal_report_end_date"]) {
            $b0xTPortal_report_params["endDate"] = sanitize_text_field($_POST["b0xTPortal_report_end_date"]);
        }

        if($_POST["b0xTPortal_report_delivery_date"]) {
            $b0xTPortal_report_params["deliveryDate"] = sanitize_text_field($_POST["b0xTPortal_report_delivery_date"]);
        }

        if($_POST["b0xTPortal_report_month"]) {
            $b0xTPortal_report_params["month"] = sanitize_text_field($_POST["b0xTPortal_report_month"]);
        }

        if($_POST["b0xTPortal_report_year"]) {
            $b0xTPortal_report_params["year"] = sanitize_text_field($_POST["b0xTPortal_report_year"]);
        }

        if($_POST["b0xTPortal_report_jobsite_id"]) {
            $b0xTPortal_report_params["jobSite"] = sanitize_text_field($_POST["b0xTPortal_report_jobsite_id"]);
        }

        if($_POST["b0xTPortal_report_wo_type"]) {
            $b0xTPortal_report_params["woType"] = sanitize_text_field($_POST["b0xTPortal_report_wo_type"]);
        }

        if($_POST["b0xTPortal_report_check_boxes"] && is_array($_POST["b0xTPortal_report_check_boxes"])) {
            $b0xTPortal_check_boxes = $this->b0xTPortal_sanitize_array_values($_POST["b0xTPortal_report_check_boxes"]);

            //iterate through the check boxes
            foreach($b0xTPortal_check_boxes as $b0xTPortal_check_box) {
                $b0xTPortal_split_string = explode("|", $b0xTPortal_check_box);
                $b0xTPortal_report_params[$b0xTPortal_split_string[0]] = $b0xTPortal_split_string[1];
            }
        }

        if($_POST["b0xTPortal_report_sort_by"]) {
            $b0xTPortal_report_params["sortBy"] = sanitize_text_field($_POST["b0xTPortal_report_sort_by"]);
        }

        if($_POST["b0xTPortal_report_filter_by"]) {
            $b0xTPortal_report_params["filterBy"] = sanitize_text_field($_POST["b0xTPortal_report_filter_by"]);
        }

        if($_POST["b0xTPortal_report_list_by"]) {
            $b0xTPortal_report_params["listBy"] = sanitize_text_field($_POST["b0xTPortal_report_list_by"]);
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            $b0xTPortal_args = array(
                "command"              => "cmdBoxTPortalReportDetails",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "report_id"            => $b0xTPortal_report_id
            );

            $b0xTPortal_args = array_merge($b0xTPortal_args, $b0xTPortal_report_params);

            $b0xTPortal_report_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_report_data && sanitize_text_field($b0xTPortal_report_data->status) == '200') {
                $b0xTPortal_report_lines = $this->b0xTPortal_sanitize_array_values($b0xTPortal_report_data->reportObj);

                $b0xTPortal_data = array(
                    "b0xTPortal_report_lines" => $b0xTPortal_report_lines
                );
                
                wp_send_json($this->b0xTPortal_response('success', "Succesfully got report", $b0xTPortal_data));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_report_data);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_report_data)), "Failed to get report, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed to get report, ".$b0xTPortal_error, ''));
    }
}