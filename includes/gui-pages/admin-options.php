<?php
/**
 * This class will create an admin
 * setting page on the dashboard.
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_gui;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Global_Variables;

class B0xTPortal_Admin_Options extends B0xTPortal_Global_Variables {
    function b0xTPortal_init() {
        add_action('admin_menu', array($this, 'b0xTPortal_admin_menu_page'));
        add_action('admin_init', array($this, 'b0xTPortal_admin_options_settings'));
    }

    //admin page menu
    function b0xTPortal_admin_menu_page() {
        $b0xTPortal_imgage_icon = '';
        if($this->b0xTPortal_plugin_url && wp_http_validate_url($this->b0xTPortal_plugin_url)) {
            $b0xTPortal_imgage_icon = $this->b0xTPortal_plugin_url.'images/icon.png';
        }

        add_menu_page('Box Tracker Portal', 'Box Tracker Portal', 'administrator', 'box-tracker-portal', method_exists($this, 'b0xTPortal_admin_options_template') ? array($this, 'b0xTPortal_admin_options_template') : '', $b0xTPortal_imgage_icon, 101);
    }

    //admin page menu settings
    function b0xTPortal_admin_options_settings() {
        register_setting('b0xTPortal_setting_group', 'b0xTPortal_username', method_exists($this, 'b0xTPortal_validate_username') ? array($this, 'b0xTPortal_validate_username') : '');
        register_setting('b0xTPortal_setting_group', 'b0xTPortal_password', method_exists($this, 'b0xTPortal_validate_password') ? array($this, 'b0xTPortal_validate_password') : '');
        register_setting('b0xTPortal_setting_group', 'b0xTPortal_admin_country', method_exists($this, 'b0xTPortal_validate_admin_country') ? array($this, 'b0xTPortal_validate_admin_country') : '');
        register_setting('b0xTPortal_setting_group', 'b0xTPortal_google_api_key', method_exists($this, 'b0xTPortal_validate_google_api_key') ? array($this, 'b0xTPortal_validate_google_api_key') : '');
        register_setting('b0xTPortal_setting_group', 'b0xTPortal_mode', method_exists($this, 'b0xTPortal_validate_mode') ? array($this, 'b0xTPortal_validate_mode') : '');
        register_setting('b0xTPortal_setting_group', 'b0xTPortal_zipcode_label', '');
        register_setting('b0xTPortal_setting_group', 'b0xTPortal_page_title', '');
    }

    //load main template
    function b0xTPortal_admin_options_template() {
        if($this->b0xTPortal_plugin_path && file_exists($this->b0xTPortal_plugin_path.'templates/admin-options-template.php')) {      
            return require_once $this->b0xTPortal_plugin_path.'templates/admin-options-template.php';
        }       
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b0xTPortal_input
     * @return string $b0xTPortal_input
     */
    function b0xTPortal_validate_username($b0xTPortal_input) {
        //sanitize
        $b0xTPortal_input = sanitize_text_field($b0xTPortal_input);

        //validate
        if($b0xTPortal_input == ""){
            add_settings_error('b0xTPortal_username', 'b0xTPortal_username', __('Please enter a username', 'b0xTPortal'), 'error');
            $b0xTPortal_input = sanitize_text_field(get_option('b0xTPortal_username'));
        }  

        return $b0xTPortal_input;
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b0xTPortal_input
     * @return string $b0xTPortal_input
     */
    function b0xTPortal_validate_password($b0xTPortal_input) {
        //sanitize
        $b0xTPortal_input = sanitize_text_field($b0xTPortal_input);

        //validate
        if($b0xTPortal_input == ""){
            add_settings_error('b0xTPortal_password', 'b0xTPortal_password', __('Please enter a password', 'b0xTPortal'), 'error');
            $b0xTPortal_input = sanitize_text_field(get_option('b0xTPortal_password'));
        }

        return $b0xTPortal_input;
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b0xTPortal_input
     * @return string $b0xTPortal_input
     */
    function b0xTPortal_validate_admin_country($b0xTPortal_input) {
        //sanitize
        $b0xTPortal_input = sanitize_text_field($b0xTPortal_input);

        //validate
        if(!($b0xTPortal_input == "United States" || $b0xTPortal_input == "Canada")) {
            add_settings_error('b0xTPortal_admin_country', 'b0xTPortal_admin_country', __('Please select a country', 'b0xTPortal'), 'error');
            $b0xTPortal_input = sanitize_text_field(get_option('b0xTPortal_admin_country'));
        }   

        return $b0xTPortal_input;
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b0xTPortal_input
     * @return string $b0xTPortal_input
     */
    function b0xTPortal_validate_google_api_key($b0xTPortal_input) {
        //sanitize
        $b0xTPortal_input = sanitize_text_field($b0xTPortal_input);

        //validate
        if($b0xTPortal_input == ""){
            add_settings_error('b0xTPortal_google_api_key', 'b0xTPortal_google_api_key', __('Please enter a Google API Key', 'b0xTPortal'), 'error');
            $b0xTPortal_input = sanitize_text_field(get_option('b0xTPortal_google_api_key'));
        }   

        return $b0xTPortal_input;
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b0xTPortal_input
     * @return string $b0xTPortal_input
     */
    function b0xTPortal_validate_mode($b0xTPortal_input) {
        //sanitize
        $b0xTPortal_input = sanitize_text_field($b0xTPortal_input);

        //validate
        if(!($b0xTPortal_input == "TEST" || $b0xTPortal_input == "LIVE")){
            add_settings_error('b0xTPortal_mode', 'b0xTPortal_mode', __('Please select a Test/Live mode', 'b0xTPortal'), 'error');
            $b0xTPortal_input = sanitize_text_field(get_option('b0xTPortal_mode'));
        }  

        return $b0xTPortal_input;
    }
}