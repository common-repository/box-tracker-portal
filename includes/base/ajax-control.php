<?php
/**
 * This class will manage the ajax calls
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Plugin_Load;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Login;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Logout;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Home_Page;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Profile_Page;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Jobsite_Page;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Workorder_Page;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_CCard_Page;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Transactions_Page;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Payment_Page;
use b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Reports_Page;
use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Utility;

class B0xTPortal_Ajax_Control extends B0xTPortal_Ajax_Utility {
    //set up some hooks
    function b0xTPortal_init() {
        $b0xTPortal_array_of_actions  = array(
            'b0xTPortal_plugin_load', 'b0xTPortal_login', 'b0xTPortal_auto_login',
            'b0xTPortal_logout', 'b0xTPortal_home_page', 'b0xTPortal_profile_page',
            'b0xTPortal_save_customer', 'b0xTPortal_jobsite_page', 'b0xTPortal_load_jobsite_list',
            'b0xTPortal_add_edit_jobsite', 'b0xTPortal_save_jobsite', 'b0xTPortal_workorder_page',
            'b0xTPortal_load_workorder_list', 'b0xTPortal_add_edit_workorder', 'b0xTPortal_save_workorder',
            'b0xTPortal_remove_workorder', 'b0xTPortal_ccard_page', 'b0xTPortal_save_ccard',
            'b0xTPortal_ccard_make_primary', 'b0xTPortal_transactions_page', 'b0xTPortal_load_transactions_list',
            'b0xTPortal_payment_page', 'b0xTPortal_process_payment', 'b0xTPortal_reports_page', 
            'b0xTPortal_reports_output_page', 'b0xTPortal_report_details', 'b0xTPortal_email_txn'
        );
        
        foreach($b0xTPortal_array_of_actions as $b0xPortal_action) {
            $this->b0xTPortal_attach_action($b0xPortal_action);
        }
    }

    //add action
    function b0xTPortal_attach_action($b0xTPortal_action) {
        $b0xTPortal_action = sanitize_text_field($b0xTPortal_action);
        add_action('wp_ajax_nopriv_'.$b0xTPortal_action, array($this, $b0xTPortal_action));
        add_action('wp_ajax_'.$b0xTPortal_action, array($this, $b0xTPortal_action));
    }

    //throw error
    function b0xTPortal_throw_error() {
        #should never reach here, but if it does throw an error.
        $b0xTPortal_error = "Something went wrong, contact administration.";
        wp_send_json($this->b0xTPortal_response('error', $b0xTPortal_error, ''));
    }

    //call when page gets refreshed
    function b0xTPortal_plugin_load() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Plugin_Load")) {
            $b0xTPortal_plugin_load = new B0xTPortal_Plugin_Load();
            $b0xTPortal_plugin_load->b0xTPortal_plugin_load();
        }

        $this->b0xTPortal_throw_error();
    }

    //login user
    function b0xTPortal_login() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Login")) {
            $b0xTPortal_login = new B0xTPortal_Login();
            $b0xTPortal_login->b0xTPortal_login();
        }   

        $this->b0xTPortal_throw_error();
    }

    //auto login user
    function b0xTPortal_auto_login() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Login")) {
            $b0xTPortal_auto_login = new B0xTPortal_Login();
            $b0xTPortal_auto_login->b0xTPortal_auto_login();
        }

        $this->b0xTPortal_throw_error();
    }

    //logout user
    function b0xTPortal_logout() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Logout")) {
            $b0xTPortal_logout = new B0xTPortal_Logout();
            $b0xTPortal_logout->b0xTPortal_logout();
        }

        $this->b0xTPortal_throw_error();
    }

    //home page
    function b0xTPortal_home_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Home_Page")) {
            $b0xTPortal_home_page = new B0xTPortal_Home_Page();
            $b0xTPortal_home_page->b0xTPortal_home_page(); 
        }
     

        $this->b0xTPortal_throw_error();   
    }

    //profile
    function b0xTPortal_profile_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Profile_Page")) {
            $b0xTPortal_profile_page = new B0xTPortal_Profile_Page();
            $b0xTPortal_profile_page->b0xTPortal_profile_page(); 
        }
     
        $this->b0xTPortal_throw_error(); 
    }

    //profile save customer
    function b0xTPortal_save_customer() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Profile_Page")) {
            $b0xTPortal_save_customer = new B0xTPortal_Profile_Page();
            $b0xTPortal_save_customer->b0xTPortal_save_customer();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //jobsite
    function b0xTPortal_jobsite_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Jobsite_Page")) {
            $b0xTPortal_jobsite_page = new B0xTPortal_Jobsite_Page();
            $b0xTPortal_jobsite_page->b0xTPortal_jobsite_page(); 
        }
     
        $this->b0xTPortal_throw_error();
    }

    //jobsite refresh
    function b0xTPortal_load_jobsite_list() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Jobsite_Page")) {
            $b0xTPortal_load_jobsite_list = new B0xTPortal_Jobsite_Page();
            $b0xTPortal_load_jobsite_list->b0xTPortal_load_jobsite_list(); 
        }
     
        $this->b0xTPortal_throw_error();
    }

    //add edit job site
    function b0xTPortal_add_edit_jobsite() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Jobsite_Page")) {
            $b0xTPortal_add_edit_jobsite = new B0xTPortal_Jobsite_Page();
            $b0xTPortal_add_edit_jobsite->b0xTPortal_load_add_edit_jobsite(); 
        }
     
        $this->b0xTPortal_throw_error();
    }

    //add edit job site save
    function b0xTPortal_save_jobsite() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Jobsite_Page")) {
            $b0xTPortal_save_jobsite = new B0xTPortal_Jobsite_Page();
            $b0xTPortal_save_jobsite->b0xTPortal_save_jobsite();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //work order
    function b0xTPortal_workorder_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Workorder_Page")) {
            $b0xTPortal_workorder_page = new B0xTPortal_Workorder_Page();
            $b0xTPortal_workorder_page->b0xTPortal_workorder_page();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //work order refresh
    function b0xTPortal_load_workorder_list() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Workorder_Page")) {
            $b0xTPortal_workorder_list = new B0xTPortal_Workorder_Page();
            $b0xTPortal_workorder_list->b0xTPortal_workorder_list();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //work order add edit page
    function b0xTPortal_add_edit_workorder() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Workorder_Page")) {
            $b0xTPortal_add_edit_workorder = new B0xTPortal_Workorder_Page();
            $b0xTPortal_add_edit_workorder->b0xTPortal_add_edit_workorder();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //work order save
    function b0xTPortal_save_workorder() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Workorder_Page")) {
            $b0xTPortal_save_workorder = new B0xTPortal_Workorder_Page();
            $b0xTPortal_save_workorder->b0xTPortal_save_workorder();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //remove work order
    function b0xTPortal_remove_workorder() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Workorder_Page")) {
            $b0xTPortal_remove_workorder = new B0xTPortal_Workorder_Page();
            $b0xTPortal_remove_workorder->b0xTPortal_remove_workorder();
        }

        $this->b0xTPortal_throw_error();
    }

    //load ccard page
    function b0xTPortal_ccard_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_CCard_Page")) {
            $b0xTPortal_ccard_page = new B0xTPortal_CCard_Page();
            $b0xTPortal_ccard_page->b0xTPortal_ccard_page();
        }

        $this->b0xTPortal_throw_error();
    }

    //save ccard
    function b0xTPortal_save_ccard() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_CCard_Page")) {
            $b0xTPortal_save_ccard = new B0xTPortal_CCard_Page();
            $b0xTPortal_save_ccard->b0xTPortal_save_ccard();
        }

        $this->b0xTPortal_throw_error();
    }

    //ccard make primary
    function b0xTPortal_ccard_make_primary() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_CCard_Page")) {
            $b0xTPortal_ccard_make_primary = new B0xTPortal_CCard_Page();
            $b0xTPortal_ccard_make_primary->b0xTPortal_ccard_make_primary();
        }

        $this->b0xTPortal_throw_error();
    }

    //load transactions page
    function b0xTPortal_transactions_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Transactions_Page")) {
            $b0xTPortal_transactions_page = new B0xTPortal_Transactions_Page();
            $b0xTPortal_transactions_page->b0xTPortal_transactions_page();
        }

        $this->b0xTPortal_throw_error();
    }

    //transactions refresh
    function b0xTPortal_load_transactions_list() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Transactions_Page")) {
            $b0xTPortal_transactions_list = new B0xTPortal_Transactions_Page();
            $b0xTPortal_transactions_list->b0xTPortal_transactions_list();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //transaction email
    function b0xTPortal_email_txn() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Transactions_Page")) {
            $b0xTPortal_transactions_list = new B0xTPortal_Transactions_Page();
            $b0xTPortal_transactions_list->b0xTPortal_email_txn();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //payment page
    function b0xTPortal_payment_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Payment_Page")) {
            $b0xTPortal_payment_page = new B0xTPortal_Payment_Page();
            $b0xTPortal_payment_page->b0xTPortal_payment_page();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //process payment
    function b0xTPortal_process_payment() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Payment_Page")) {
            $b0xTPortal_process_payment = new B0xTPortal_Payment_Page();
            $b0xTPortal_process_payment->b0xTPortal_process_payment();
        }
     
        $this->b0xTPortal_throw_error();
    }

    //reports page
    function b0xTPortal_reports_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Reports_Page")) {
            $b0xTPortal_reports_page = new B0xTPortal_Reports_Page();
            $b0xTPortal_reports_page->b0xTPortal_reports_page();
        }
     
        $this->b0xTPortal_throw_error();
    }

    function b0xTPortal_reports_output_page() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Reports_Page")) {
            $b0xTPortal_reports_output_page = new B0xTPortal_Reports_Page();
            $b0xTPortal_reports_output_page->b0xTPortal_reports_output_page();
        }
     
        $this->b0xTPortal_throw_error();
    }

    function b0xTPortal_report_details() {
        if(class_exists("b0xTPortal_includes\b0xTPortal_ajax\B0xTPortal_Reports_Page")) {
            $b0xTPortal_report_details = new B0xTPortal_Reports_Page();
            $b0xTPortal_report_details->b0xTPortal_report_details();
        }
     
        $this->b0xTPortal_throw_error();  
    }
}