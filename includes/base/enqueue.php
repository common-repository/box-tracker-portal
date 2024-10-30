<?php
/**
 * This class will load my
 * scripts and my css files.
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Global_Variables;

class B0xTPortal_Enqueue extends B0xTPortal_Global_Variables {
    function b0xTPortal_init() {
        if($this->b0xTPortal_plugin_url && wp_http_validate_url($this->b0xTPortal_plugin_url)) {
            add_action('admin_enqueue_scripts', array($this, 'b0xTPortal_admin_enqueue'));
            add_action('wp_enqueue_scripts', array($this, 'b0xTPortal_wp_enqueue'));
        }
    }

    //Admin page
    function b0xTPortal_admin_enqueue() {
        wp_enqueue_style('b0xTPortal-admin-options-style', $this->b0xTPortal_plugin_url.'styles/admin-options-styles.css');
    }

    //Front end page
    function b0xTPortal_wp_enqueue() {
        global $post; //we need to know if the short code exist before we load scripts/css
        if(is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'box-tracker-portal')) {
            wp_enqueue_style('b0xTPortal-front-house-style', $this->b0xTPortal_plugin_url.'styles/front-house-style.css', '', '', 'all');
            wp_enqueue_style('b0xTPortal-jquery-ui-style', "https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/themes/base/jquery-ui.css", '', '', 'all');

            wp_enqueue_script('b0xTPortal-login-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/login-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-home-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/home-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-profile-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/profile-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-jobsite-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/jobsite-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-add-edit-jobsite-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/add-edit-jobsite-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-workorder-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/workorder-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-add-edit-workorder-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/add-edit-workorder-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-ccard-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/ccard-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-transactions-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/transactions-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-payment-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/payment-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-reports-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/reports-page.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-reports-output-page', $this->b0xTPortal_plugin_url.'javascript/dynamic-templates/reports-output-page.js', '', '', 'all');

            $b0xT_google_api_key = sanitize_text_field(get_option('b0xT_google_api_key'));
            wp_enqueue_script('b0xTPortal-google-maps', "https://maps.googleapis.com/maps/api/js?key=$b0xT_google_api_key&libraries=places", '', '', 'all');
            wp_enqueue_script('b0xTPortal-google-charts', "https://www.gstatic.com/charts/loader.js", '', '', 'all');
            wp_enqueue_script('b0xTPortal-dialog-box-script', $this->b0xTPortal_plugin_url.'javascript/dialog-box-script.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-slide-up-dialog', $this->b0xTPortal_plugin_url.'javascript/slide-up-dialog.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-address-validation-script', $this->b0xTPortal_plugin_url.'javascript/address-validation-script.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-table-control-script', $this->b0xTPortal_plugin_url.'javascript/table-control-script.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-header-script', $this->b0xTPortal_plugin_url.'javascript/header-script.js', '', '', 'all');
            wp_enqueue_script('b0xTPortal-front-house-script', $this->b0xTPortal_plugin_url.'javascript/front-house-script.js', array('jquery'), '', 'all');
            wp_enqueue_script('jquery-ui-datepicker');

            $this->b0xTPortal_front_house_script_localize();
        }
    }

    //localize front end page
    private function b0xTPortal_front_house_script_localize() {
        if($this->b0xTPortal_admin_url && wp_http_validate_url($this->b0xTPortal_admin_url)) {
            $b0xTPortal_config = array(
                 'ajax_url'   => $this->b0xTPortal_admin_url."admin-ajax.php",
                 'image_url'  => $this->b0xTPortal_plugin_url.'images/',
                 'ajax_nonce' => wp_create_nonce('_check__ajax_101')
             );
            wp_localize_script('b0xTPortal-front-house-script', 'b0xTPortal_config', $b0xTPortal_config);
        }
    }
}