<?php
/**
 * This class will manage the jobsite page
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_ajax;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Jobsite_Page extends B0xTPortal_Ajax_Utility {
    function b0xTPortal_jobsite_page() {
        $this->b0xTPortal_get_job_site_data(0, "", "Address|ASC");
    }

    function b0xTPortal_load_jobsite_list() {
        $b0xTPortal_offset = sanitize_text_field($_POST["b0xTPortal_offset"]);
        $b0xTPortal_search = sanitize_text_field($_POST["b0xTPortal_search"]);
        $b0xTPortal_sortBy = sanitize_text_field($_POST["b0xTPortal_sort"]);

        $this->b0xTPortal_get_job_site_data($b0xTPortal_offset, $b0xTPortal_search, $b0xTPortal_sortBy);
    }

    function b0xTPortal_get_job_site_data($b0xTPortal_offset, $b0xTPortal_search, $b0xTPortal_sortBy) {
        $b0xTPortal_offset = sanitize_text_field($b0xTPortal_offset);
        $b0xTPortal_search = sanitize_text_field($b0xTPortal_search);
        $b0xTPortal_sortBy = sanitize_text_field($b0xTPortal_sortBy);

        ///security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

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
                "command"              => "cmdBoxTPortalJobsiteList",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "customer_id"          => $b0xTPortal_customer_id,
                "offset"               => $b0xTPortal_offset,
                "search"               => $b0xTPortal_search,
                "orderBy"              => $b0xTPortal_sortBy
            );

            //job site data
            $b0xTPortal_jobsite_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_jobsite_data && sanitize_text_field($b0xTPortal_jobsite_data->status) == '200') {
                $b0xTPortal_jobsite_object_list              = $this->b0xTPortal_sanitize_object_values($b0xTPortal_jobsite_data->jobSiteObjList);
                $b0xTPortal_jobsite_object_list_record_count = sanitize_text_field($b0xTPortal_jobsite_data->recordCount);
                $b0xTPortal_jobsite_object_list_offset       = sanitize_text_field($b0xTPortal_jobsite_data->offset);

                //looking for a valid record count and a valid offset.
                if(is_numeric($b0xTPortal_jobsite_object_list_record_count) && is_numeric($b0xTPortal_jobsite_object_list_offset)) {} else {
                    wp_send_json($this->b0xTPortal_response('error', "Error User: Invalid record count and/or offset.", ''));
                }

                $b0xTPortal_data = array(
                    'b0xTPortal_jobsite_object_list'              => $b0xTPortal_jobsite_object_list,
                    'b0xTPortal_jobsite_object_list_record_count' => $b0xTPortal_jobsite_object_list_record_count,
                    'b0xTPortal_jobsite_object_list_offset'       => $b0xTPortal_jobsite_object_list_offset
                );

                wp_send_json($this->b0xTPortal_response('success', "Succesful job site load.", $b0xTPortal_data));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_jobsite_data);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_jobsite_data)), "Failed jobsite load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed job site load, ".$b0xTPortal_error, ''));
    }

    function b0xTPortal_load_add_edit_jobsite() {
        ///security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b0xTPortal_jobsite_id = sanitize_text_field($_POST["b0xTPortal_jobsite_id"]);

        //we need a valid offset 0+
        if(is_numeric($b0xTPortal_jobsite_id)) {} else {
             wp_send_json($this->b0xTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        }

        [$b0xTPortal_handshake, $b0xTPortal_customer_handshake, $b0xTPortal_error] = $this->b0xTPortal_evaluate_handshakes($b0xTPortal_username, "", $b0xTPortal_session_key_customer);

        if($b0xTPortal_handshake && $b0xTPortal_customer_handshake && !$b0xTPortal_error) {
            $b0xTPortal_session_key_api = sanitize_text_field($b0xTPortal_handshake->key);
            $b0xTPortal_customer_id     = sanitize_text_field($b0xTPortal_customer_handshake->customerID);

            $b0xTPortal_args = array(
                "command"              => "cmdBoxTPortalJobsiteData",
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "jobsite_id"           => $b0xTPortal_jobsite_id
            );

            //job site data
            $b0xTPortal_jobsite_data = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_args);

            if($b0xTPortal_jobsite_data && sanitize_text_field($b0xTPortal_jobsite_data->status) == '200') {
                $b0xTPortal_jobsite_id      = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->ID);
                $b0xTPortal_jobsite_address = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->Address);
                $b0xTPortal_jobsite_city    = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->City);
                $b0xTPortal_jobsite_state   = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->State);

                $b0xTPortal_country_id    = sanitize_text_field(get_option('b0xTPortal_admin_country'));
                $b0xTPortal_list_of_state = $this->b0xTPortal_server_calls->b0xTPortal_get_states($b0xTPortal_country_id);

                if(!is_array($b0xTPortal_list_of_state)) {
                    wp_send_json($this->b0xTPortal_response('error', "Failed to get state list.", ''));
                }

                $b0xTPortal_jobsite_name         = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->JobName);
                $b0xTPortal_jobsite_zip          = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->Zip);
                $b0xTPortal_jobsite_county       = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->County);
                $b0xTPortal_jobsite_muni         = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->Muni);
                $b0xTPortal_jobsite_cross_street = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->CrossStreet);
                $b0xTPortal_jobsite_po           = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->PO);
                $b0xTPortal_jobsite_contact      = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->Contact);
                $b0xTPortal_jobsite_contact_cell = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->ContactCell);
                $b0xTPortal_jobsite_hazzards     = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->Hazzards);
                $b0xTPortal_jobsite_billing_note = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->BillingNote);
                $b0xTPortal_jobsite_leed         = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->LEED);
                $b0xTPortal_validated            = sanitize_text_field($b0xTPortal_jobsite_data->jobSiteObj->Validated);
                $b0xTPortal_jobsite_validated    = is_numeric($b0xTPortal_validated) ? $b0xTPortal_validated : "0";

                $b0xTPortal_jobsite_required_fields_for_eval = array();
                if(is_array($b0xTPortal_jobsite_data->jobSiteObj->requiredFields)) {
                    $b0xTPortal_jobsite_required_fields_for_eval = $this->b0xTPortal_sanitize_array_values($b0xTPortal_jobsite_data->jobSiteObj->requiredFields);
                }

                $b0xTPortal_jobsite_required_fields = $this->b0xTPortal_evaluate_required_fields($b0xTPortal_jobsite_required_fields_for_eval, $this->b0xTPortal_jobsite_fields_map);

                if(!(is_array($b0xTPortal_jobsite_required_fields) && !empty($b0xTPortal_jobsite_required_fields))) {
                    wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
                }

                $b0xTPortal_jobsite_data_array = array(
                    "b0xTPortal_jobsite_id"           => $b0xTPortal_jobsite_id,
                    "b0xTPortal_jobsite_name"         => $b0xTPortal_jobsite_name,
                    "b0xTPortal_jobsite_address"      => $b0xTPortal_jobsite_address,
                    "b0xTPortal_jobsite_city"         => $b0xTPortal_jobsite_city,
                    "b0xTPortal_jobsite_state"        => $b0xTPortal_jobsite_state,
                    "b0xTPortal_list_of_state"        => $b0xTPortal_list_of_state,
                    "b0xTPortal_jobsite_zip"          => $b0xTPortal_jobsite_zip,
                    "b0xTPortal_jobsite_county"       => $b0xTPortal_jobsite_county,
                    "b0xTPortal_jobsite_muni"         => $b0xTPortal_jobsite_muni,
                    "b0xTPortal_jobsite_cross_street" => $b0xTPortal_jobsite_cross_street,
                    "b0xTPortal_jobsite_po"           => $b0xTPortal_jobsite_po,
                    "b0xTPortal_jobsite_contact"      => $b0xTPortal_jobsite_contact,
                    "b0xTPortal_jobsite_contact_cell" => $b0xTPortal_jobsite_contact_cell,
                    "b0xTPortal_jobsite_hazzards"     => $b0xTPortal_jobsite_hazzards,
                    "b0xTPortal_jobsite_billing_note" => $b0xTPortal_jobsite_billing_note,
                    "b0xTPortal_jobsite_leed"         => $b0xTPortal_jobsite_leed,
                    "b0xTPortal_jobsite_validated"    => $b0xTPortal_jobsite_validated,
                    "b0xTPortal_required_fields"      => $b0xTPortal_jobsite_required_fields
                );

                wp_send_json($this->b0xTPortal_response('success', "Succesful job site load.", $b0xTPortal_jobsite_data_array));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_jobsite_data);
            wp_send_json($this->b0xTPortal_response('error', "Failed jobsite load, ".$b0xTPortal_error, ''));
        }

        wp_send_json($this->b0xTPortal_response('error', "Failed job site load, ".$b0xTPortal_error, ''));
    }

    function b0xTPortal_save_jobsite() {
        ///security checks
        if(!$this->b0xTPortal_security_checks()) {
            wp_send_json($this->b0xTPortal_response('error', "Failed security checks.", ''));
        }

        $b0xTPortal_username             = sanitize_text_field($_SESSION['b0xTPortal_session']['username']);
        $b0xTPortal_session_key_customer = sanitize_text_field($_SESSION['b0xTPortal_session']['session_key']);

        if($b0xTPortal_username == "" || $b0xTPortal_session_key_customer == "") {
            wp_send_json($this->b0xTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b0xTPortal_jobsite_id           = sanitize_text_field($_POST["b0xTPortal_jobsite_id"]);
        $b0xTPortal_jobsite_name         = sanitize_text_field($_POST["b0xTPortal_jobsite_name"]);
        $b0xTPortal_jobsite_address      = sanitize_text_field($_POST["b0xTPortal_jobsite_address"]);
        $b0xTPortal_jobsite_city         = sanitize_text_field($_POST["b0xTPortal_jobsite_city"]);
        $b0xTPortal_jobsite_state        = sanitize_text_field($_POST["b0xTPortal_jobsite_state"]);
        $b0xTPortal_jobsite_zip          = sanitize_text_field($_POST["b0xTPortal_jobsite_zip"]);
        $b0xTPortal_jobsite_county       = sanitize_text_field($_POST["b0xTPortal_jobsite_county"]);
        $b0xTPortal_jobsite_muni         = sanitize_text_field($_POST["b0xTPortal_jobsite_muni"]);
        $b0xTPortal_jobsite_po           = sanitize_text_field($_POST["b0xTPortal_jobsite_po"]);
        $b0xTPortal_jobsite_cross_street = sanitize_text_field($_POST["b0xTPortal_jobsite_cross_street"]);
        $b0xTPortal_jobsite_contact      = sanitize_text_field($_POST["b0xTPortal_jobsite_contact"]);
        $b0xTPortal_jobsite_contact_cell = sanitize_text_field($_POST["b0xTPortal_jobsite_contact_cell"]);
        $b0xTPortal_jobsite_hazzards     = sanitize_text_field($_POST["b0xTPortal_jobsite_hazzards"]);
        $b0xTPortal_jobsite_billing_note = sanitize_text_field($_POST["b0xTPortal_jobsite_billing_note"]);
        $b0xTPortal_jobsite_leed         = sanitize_text_field($_POST["b0xTPortal_jobsite_leed"]);
        $b0xTPortal_jobsite_validated    = sanitize_text_field($_POST["b0xTPortal_jobsite_validated"]);

        //expecting an array from the gui, sanitizing it below.
        $b0xTPortal_jobsite_required_fields = array();
        if(is_array($_POST["b0xTPortal_required_fields"])) {
            $b0xTPortal_jobsite_required_fields = $this->b0xTPortal_sanitize_array_values($_POST["b0xTPortal_required_fields"]);
        }

        if(!(is_array($b0xTPortal_jobsite_required_fields) && !empty($b0xTPortal_jobsite_required_fields))) {
            wp_send_json($this->b0xTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
        }

        //validate some fields
        $b0xTPortal_field_errors = array();

        foreach($b0xTPortal_jobsite_required_fields as $b0xTPortal_jobsite_required_fields_value) {
            //job site state
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_state") {
                if(!preg_match("/^[A-Z]{2}$/", $b0xTPortal_jobsite_state)) {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }

            //job site address
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_address") {
                if($b0xTPortal_jobsite_address == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }

            //job site city
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_city") {
                if($b0xTPortal_jobsite_city == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }

            //job site contact
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_contact") {
                if($b0xTPortal_jobsite_contact == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }

            //job site contact cell
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_contact_cell") {
                if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b0xTPortal_jobsite_contact_cell)) {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }

            //job site county
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_county") {
                if($b0xTPortal_jobsite_county == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }   

            //job site cross street
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_cross_street") {
                if($b0xTPortal_jobsite_cross_street == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }

            //job site muni
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_muni") {
                if($b0xTPortal_jobsite_muni == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }

            //job site po
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_po") {
                if($b0xTPortal_jobsite_po == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }            

            //job site zip
            if($b0xTPortal_jobsite_required_fields_value == "b0xTPortal_jobsite_zip") {
                if($b0xTPortal_jobsite_zip == "") {
                    array_push($b0xTPortal_field_errors, $b0xTPortal_jobsite_required_fields_value); 
                }
            }   
        }

        //leed
        if(!($b0xTPortal_jobsite_leed == 1 || $b0xTPortal_jobsite_leed == 0)) {
            array_push($b0xTPortal_field_errors, "b0xTPortal_jobsite_leed");  
        }

        //validated
        if(!is_numeric($b0xTPortal_jobsite_validated)) {
            wp_send_json($this->b0xTPortal_response('error', "Invalid google validation bit.", ""));
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

            //save job site
            $b0xTPortal_jobsite_args = array(
                "command"              => "cmdBoxTPortalSaveJobSite",
                "jobsite_id"           => $b0xTPortal_jobsite_id,
                "jobsite_name"         => $b0xTPortal_jobsite_name,
                "jobsite_address"      => $b0xTPortal_jobsite_address,
                "jobsite_city"         => $b0xTPortal_jobsite_city,
                "jobsite_state"        => $b0xTPortal_jobsite_state,
                "jobsite_zip"          => $b0xTPortal_jobsite_zip,
                "jobsite_county"       => $b0xTPortal_jobsite_county,
                "jobsite_muni"         => $b0xTPortal_jobsite_muni,
                "jobsite_po"           => $b0xTPortal_jobsite_po,
                "jobsite_cross_street" => $b0xTPortal_jobsite_cross_street,
                "jobsite_contact"      => $b0xTPortal_jobsite_contact,
                "jobsite_contact_cell" => $b0xTPortal_jobsite_contact_cell,
                "jobsite_hazzards"     => $b0xTPortal_jobsite_hazzards,
                "jobsite_billing_note" => $b0xTPortal_jobsite_billing_note,
                "jobsite_leed"         => $b0xTPortal_jobsite_leed,
                "jobsite_validated"    => $b0xTPortal_jobsite_validated,
                "session_key_api"      => $b0xTPortal_session_key_api,
                "username_customer"    => $b0xTPortal_username,
                "session_key_customer" => $b0xTPortal_session_key_customer,
                "customer_id"          => $b0xTPortal_customer_id
            );

            //save customer profile
            $b0xTPortal_jobsite_save = $this->b0xTPortal_server_calls->b0xTPortal_call_command($b0xTPortal_jobsite_args);

            if($b0xTPortal_jobsite_save && sanitize_text_field($b0xTPortal_jobsite_save->status) == '200') {
                wp_send_json($this->b0xTPortal_response('success', "Successfull job site save", ''));
            }

            $b0xTPortal_error = $this->b0xTPortal_generate_error_string($b0xTPortal_jobsite_save);
            wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_jobsite_save)), "Failed to save job site, ".$b0xTPortal_error, ''));            
        }

        wp_send_json($this->b0xTPortal_response($this->b0xTPortal_session_expired(array($b0xTPortal_handshake, $b0xTPortal_customer_handshake)), "Failed to save job site, ".$b0xTPortal_error, ''));
    }
}