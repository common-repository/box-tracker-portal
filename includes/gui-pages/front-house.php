<?php
/**
 * This class will load up the
 * form for the front house page.
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_gui;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Global_Variables;

class B0xTPortal_Front_House extends B0xTPortal_Global_Variables {
    function b0xTPortal_init() {
        add_shortcode('box-tracker-portal', array($this, 'b0xTPortal_load_plugin_form'));
    }

     /**
     * Load the main plug template
     * 
     * @return an error if any
     */
    function b0xTPortal_load_plugin_form() {
        //lets make sure we have some credentials on file.
        $b0xTPortal_username = sanitize_text_field(get_option('b0xTPortal_username'));
        $b0xTPortal_password = sanitize_text_field(get_option('b0xTPortal_password'));
        if($b0xTPortal_username == "" || $b0xTPortal_password == "") {
            return __('Please contact to administrator, Invalid configuration.', 'box-tracker-portal');
        }

        if($this->b0xTPortal_plugin_path) {
            if(file_exists($this->b0xTPortal_plugin_path.'templates/front-house-template.php')) {
                require_once $this->b0xTPortal_plugin_path.'templates/front-house-template.php';
            }
        }
    }
}