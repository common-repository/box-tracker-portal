<?php
/**
 * This class will manage the work order page
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Workorder_Page extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_workorder_page() {
        $this->b0xTPortal_get_workorder_data(0);
    }

    function b0xTPortal_workorder_list() {
        $b0xTPortal_offset = sanitize_text_field($_POST["b0xTPortal_offset"]);
        $this->b0xTPortal_get_workorder_data($b0xTPortal_offset);
    }

    function b0xTPortal_get_workorder_data($b0xTPortal_offset) {
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
                "command"              => "cmdBoxTPortalWorkOrderList",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "customer_id"          => $b0xTPortal_customer_id,
                "offset"               => $b0xTPortal_offset,
                "search"               => $b0xTPortal_search_field
            );

            //work order data
            $b0xTPortal_workorder_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_workorder_data && sanitize_text_field($b0xTPortal_workorder_data->status) == '200') {
                $b0xTPortal_workorder_object_list              = $this->b0xTPortal_sanitize_object_values($b0xTPortal_workorder_data->workOrderObjList);
                $b0xTPortal_workorder_object_list_record_count = sanitize_text_field($b0xTPortal_workorder_data->recordCount);
                $b0xTPortal_workorder_object_list_offset       = sanitize_text_field($b0xTPortal_workorder_data->offset);

                //looking for a valid record count and a valid offset.
                if(is_numeric($b0xTPortal_workorder_object_list_record_count) && is_numeric($b0xTPortal_workorder_object_list_offset)) {} else {
                    wp_send_json($this->b0xTPortal_response('error', "Error User: Invalid record count and/or offset.", ''));
                }

                $b0xTPortal_data = array(
                    'b0xTPortal_workorder_object_list'              => $b0xTPortal_workorder_object_list,
                    'b0xTPortal_workorder_object_list_record_count' => $b0xTPortal_workorder_object_list_record_count,
                    'b0xTPortal_workorder_object_list_offset'       => $b0xTPortal_workorder_object_list_offset
                );

                wp_send_json($this->b0xTPortal_response('success', "Succesful work order load.", $b0xTPortal_data));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_workorder_data);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_workorder_data)), "Failed work order load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed work order load, ".$b0xTPortal_error, ''));
    }

    function b0xTPortal_add_edit_workorder() {
        ///security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b0xTPortal_workorder_id = sanitize_text_field($_POST["b0xTPortal_workorder_id"]);
        $b0xTPortal_jobsite_id   = sanitize_text_field($_POST["b0xTPortal_jobsite_id"]);

        //we need a numeric ids and with valid logic
        if(is_numeric($b0xTPortal_workorder_id) && is_numeric($b0xTPortal_jobsite_id)) {} else {
             wp_send_json($this->b0xTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            $b0xTPortal_args = array(
                "command"              => "cmdBoxTPortalWorkOrderData",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "workorder_id"         => $b0xTPortal_workorder_id,
                "jobsite_id"           => $b0xTPortal_jobsite_id
            );

            //work order data
            $b0xTPortal_workorder_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_workorder_data && sanitize_text_field($b0xTPortal_workorder_data->status) == '200') {
                $b0xTPortal_workorder_jsid            = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->jobSiteObj->ID);
                $b0xTPortal_workorder_jsname          = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->jobSiteObj->JobName);
                $b0xTPortal_workorder_jsaddress       = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->jobSiteObj->Address);               
                $b0xTPortal_workorder_jscity          = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->jobSiteObj->City);
                $b0xTPortal_workorder_jsstate         = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->jobSiteObj->State);
                $b0xTPortal_workorder_jszip           = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->jobSiteObj->Zip);
                $b0xTPortal_workorder_jsonsite        = $this->b0xTPortal_sanitize_array_values($b0xTPortal_workorder_data->workOrderObj->jobSiteObj->ContainersOnSite);

                $b0xTPortal_workorder_targetcont      = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->TargetCont);
                $b0xTPortal_workorder_wotype          = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->OrderType);
                $b0xTPortal_workorder_wotypes         = $this->b0xTPortal_sanitize_object_values($b0xTPortal_workorder_data->workOrderObj->woTypes);

                $b0xTPortal_workorder_contqty         = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->ContQty);
                $b0xTPortal_workorder_contsize        = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->ContSize);
                $b0xTPortal_workorder_conttype        = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->ContType);
                $b0xTPortal_workorder_remarks         = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->Remarks);
                $b0xTPortal_workorder_material        = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->Material);
                $b0xTPortal_workorder_assets          = $this->b0xTPortal_sanitize_array_values($b0xTPortal_workorder_data->workOrderObj->assets);
                $b0xTPortal_workorder_materials       = $this->b0xTPortal_sanitize_array_values($b0xTPortal_workorder_data->workOrderObj->materials);

                $b0xTPortal_workorder_wodate          = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->OrderDateStr);
                $b0xTPortal_workorder_early_book_date = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->earlyBookDate);
                $b0xTPortal_workorder_late_book_date  = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->availability->MaxDate);        

                $b0xTPortal_country_id                = sanitize_text_field(get_option('b0xTPortal_admin_country'));
                $b0xTPortal_list_of_state             = $this->b0xTPortal_server_calls->b0xTPortal_get_states($b0xTPortal_country_id);

                if(!is_array($b0xTPortal_list_of_state)) {
                    wp_send_json($this->b0xTPortal_response('error', "Failed to get state list.", ''));
                }

                //required fields merge
                $b0xTPortal_required_fields_for_eval = array();
                if(is_array($b0xTPortal_workorder_data->workOrderObj->requiredFields)) {
                    $b0xTPortal_required_fields_for_eval = $this->b0xTPortal_sanitize_array_values($b0xTPortal_workorder_data->workOrderObj->requiredFields);
                }

                $b0xTPortal_required_fields = $this->b0xTPortal_evaluate_required_fields($b0xTPortal_required_fields_for_eval, $this->b0xTPortal_workorder_fields_map);

                if(!$b0xTPortal_required_fields) {
                    wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
                }

                //availability headers and rows
                $b0xTPortal_availability_buffer  = sanitize_text_field($b0xTPortal_workorder_data->workOrderObj->assetBuffer);
                $b0xTPortal_availability_headers = $this->b0xTPortal_sanitize_array_values($b0xTPortal_workorder_data->workOrderObj->availability->ColHeaders);
                $b0xTPortal_availability_rows    = $this->b0xTPortal_sanitize_array_values($b0xTPortal_workorder_data->workOrderObj->availability->RowContent);

                $b0xTPortal_availability_array = array(
                    "b0xTPortal_availability_headers" => $b0xTPortal_availability_headers,
                    "b0xTPortal_availability_rows"    => $b0xTPortal_availability_rows
                );

                $b0xTPortal_data  = array(
                    "b0xTPortal_workorder_id"              => $b0xTPortal_workorder_id,
                    "b0xTPortal_workorder_jsid"            => $b0xTPortal_workorder_jsid,
                    "b0xTPortal_workorder_jsname"          => $b0xTPortal_workorder_jsname,
                    "b0xTPortal_workorder_jsaddress"       => $b0xTPortal_workorder_jsaddress,
                    "b0xTPortal_workorder_jscity"          => $b0xTPortal_workorder_jscity,
                    "b0xTPortal_workorder_jsstate"         => $b0xTPortal_workorder_jsstate,
                    "b0xTPortal_list_of_state"             => $b0xTPortal_list_of_state,
                    "b0xTPortal_workorder_jszip"           => $b0xTPortal_workorder_jszip,
                    "b0xTPortal_workorder_jsonsite"        => $b0xTPortal_workorder_jsonsite,
                    "b0xTPortal_workorder_targetcont"      => $b0xTPortal_workorder_targetcont,
                    "b0xTPortal_workorder_wotype"          => $b0xTPortal_workorder_wotype,
                    "b0xTPortal_workorder_wotypes"         => $b0xTPortal_workorder_wotypes,
                    "b0xTPortal_workorder_contqty"         => $b0xTPortal_workorder_contqty,
                    "b0xTPortal_workorder_contsize"        => $b0xTPortal_workorder_contsize,
                    "b0xTPortal_workorder_conttype"        => $b0xTPortal_workorder_conttype,
                    "b0xTPortal_workorder_remarks"         => $b0xTPortal_workorder_remarks,
                    "b0xTPortal_workorder_material"        => $b0xTPortal_workorder_material,
                    "b0xTPortal_workorder_wodate"          => $b0xTPortal_workorder_wodate,
                    "b0xTPortal_workorder_assets"          => $b0xTPortal_workorder_assets,
                    "b0xTPortal_workorder_materials"       => $b0xTPortal_workorder_materials,
                    "b0xTPortal_availability_buffer"       => $b0xTPortal_availability_buffer,
                    "b0xTPortal_availability"              => $b0xTPortal_availability_array,
                    "b0xTPortal_workorder_early_book_date" => $b0xTPortal_workorder_early_book_date,
                    "b0xTPortal_workorder_late_book_date"  => $b0xTPortal_workorder_late_book_date,
                    "b0xTPortal_required_fields"           => $b0xTPortal_required_fields
                );

                wp_send_json($this->b0xTPortal_response('success', "Succesful work order load.", $b0xTPortal_data));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_workorder_data);
            wp_send_json($this->b0xTPortal_response('error', "Failed work order load, ".$b0xTPortal_error, ''));         
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed work order load, ".$b0xTPortal_error, ''));
    }

    function b0xTPortal_save_workorder() {
        //security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b0xTPortal_workorder_id          = sanitize_text_field($_POST["b0xTPortal_workorder_id"]);
        $b0xTPortal_workorder_jsid        = sanitize_text_field($_POST["b0xTPortal_workorder_jsid"]);
        $b0xTPortal_workorder_asset       = sanitize_text_field($_POST["b0xTPortal_workorder_asset"]);
        $b0xTPortal_workorder_contqty     = sanitize_text_field($_POST["b0xTPortal_workorder_contqty"]);
        $b0xTPortal_workorder_targetcont  = sanitize_text_field($_POST["b0xTPortal_workorder_targetcont"]);
        $b0xTPortal_workorder_wodate      = sanitize_text_field($_POST["b0xTPortal_workorder_wodate"]);
        $b0xTPortal_workorder_wotype      = sanitize_text_field($_POST["b0xTPortal_workorder_wotype"]);
        $b0xTPortal_workorder_remarks     = sanitize_text_field($_POST["b0xTPortal_workorder_remarks"]);
        $b0xTPortal_workorder_material    = sanitize_text_field($_POST["b0xTPortal_workorder_material"]);
        $b0xTPortal_workorder_user_bypass = sanitize_text_field($_POST["b0xTPortal_workorder_user_bypass"]);

        //jobsite id must be valid
        if(!(is_numeric($b0xTPortal_workorder_jsid) && $b0xTPortal_workorder_jsid > 0)) {
            wp_send_json($this->b0xTPortal_response('error', "No job site id, System: Contact administration.", ''));
        }

        //expecting an array from the gui, sanitizing it below.
        $b0xTPortal_workorder_required_fields = array();
        if(is_array($_POST["b0xTPortal_required_fields"])) {
            $b0xTPortal_workorder_required_fields = $this->b0xTPortal_sanitize_array_values($_POST["b0xTPortal_required_fields"]);
        }

        if(!(is_array($b0xTPortal_workorder_required_fields) && !empty($b0xTPortal_workorder_required_fields))) {
            wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
        }

        //validate some fields
        $b0xTPortal_field_errors = array();

        foreach($b0xTPortal_workorder_required_fields as $b0xTPortal_workorder_required_fields_value) {
            //workorder asset
            if($b0xTPortal_workorder_required_fields_value == "b0xTPortal_workorder_asset") {
                if($b0xTPortal_workorder_asset == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_workorder_required_fields_value);
                }
            }

            //workoder qty
            if($b0xTPortal_workorder_required_fields_value == "b0xTPortal_workorder_contqty") {
                if($b0xTPortal_workorder_contqty == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_workorder_required_fields_value);
                }
            }

            //workorder type
            if($b0xTPortal_workorder_required_fields_value == "b0xTPortal_workorder_wotype") {
                if($b0xTPortal_workorder_wotype == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_workorder_required_fields_value);
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

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            //save work order
            $b0xTPortal_workorder_args = array(
                "command"               => "cmdBoxTPortalSaveWorkOrder",
                "workorder_id"          => $b0xTPortal_workorder_id,
                "workorder_jsid"        => $b0xTPortal_workorder_jsid,
                "workorder_asset"       => $b0xTPortal_workorder_asset,
                "workorder_contqty"     => $b0xTPortal_workorder_contqty,
                "workorder_targetcont"  => $b0xTPortal_workorder_targetcont,
                "workorder_wodate"      => $b0xTPortal_workorder_wodate,
                "workorder_wotype"      => $b0xTPortal_workorder_wotype,
                "workorder_remarks"     => $b0xTPortal_workorder_remarks,
                "workorder_material"    => $b0xTPortal_workorder_material,
                "session_key_api"       => $b0xTPortal_session_key_api,
                "username_customer"     => $b0xTPortal_username,
                "session_key_customer"  => $b0xTPortal_session_key_customer,
                "customer_id"           => $b0xTPortal_customer_id,
                "workorder_user_bypass" => $b0xTPortal_workorder_user_bypass
            );

            //save work order
            $b0xTPortal_workorder_save = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_workorder_args);

            if($b0xTPortal_workorder_save && sanitize_text_field($b0xTPortal_workorder_save->status) == '200') {
                wp_send_json($this->b0xTPortal_response('success', "Successfull work order save", ''));
            }

            //check for user confirm data
            $b0xTPortal_user_confirm = array();

            if($b0xTPortal_workorder_save->similarWOs && is_array($b0xTPortal_workorder_save->similarWOs)) {
                $b0xTPortal_user_confirm['similarWOs'] = $this->b0xTPortal_sanitize_array_values($b0xTPortal_workorder_save->similarWOs);
            }

            if(!empty($b0xTPortal_user_confirm)) { //end here if not empty
                wp_send_json($this->b0xTPortal_response('userConfirm', "Needs user confirmation", $b0xTPortal_user_confirm));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_workorder_save);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_workorder_save)), "Failed to save work order, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed to save work order, ".$b0xTPortal_error, ''));
    }

    function b0xTPortal_remove_workorder() {
        ///security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b0xTPortal_workorder_id = sanitize_text_field($_POST["b0xTPortal_workorder_id"]);

        if(!(is_numeric($b0xTPortal_workorder_id))) {
            wp_send_json($this->b0xTPortal_response('error', "No work order id, System: Contact administration.", ''));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            //remove work order
            $b0xTPortal_workorder_args = array(
                "command"              => "cmdBoxTPortalRemoveWorkOrder",
                "workorder_id"         => $b0xTPortal_workorder_id,
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "customer_id"          => $b0xTPortal_customer_id
            );

            //remove
            $b0xTPortal_workorder_remove = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_workorder_args);

            if($b0xTPortal_workorder_remove && sanitize_text_field($b0xTPortal_workorder_remove->status) == '200') {
                wp_send_json($this->b0xTPortal_response('success', "Successfull work order remove", ''));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_workorder_remove);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_workorder_remove)), "Failed to remove work order, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed to remove work order, ".$b0xTPortal_error, ''));
    }
}