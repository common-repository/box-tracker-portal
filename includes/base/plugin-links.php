<?php
/**
 * This class will ad links that will
 * direct us to the setting page.
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Global_Variables;

class B0xTPortal_Plugin_Links extends B0xTPortal_Global_Variables {
    function b0xTPortal_init() {
        if($this->b0xTPortal_plugin) {
            add_filter('plugin_action_links_'.$this->b0xTPortal_plugin, array($this, 'b0xTPortal_add_links'));
        }
    }

    /**
     * This function will generate a set
     * of links that we can display. i am
     * not sanitizing the param because the
     * array is passed in by add_filter with
     * the deactivate link included.
     * 
     * @param array $b0xTPortal_links
     * @return an array of links
     */
    function b0xTPortal_add_links($b0xTPortal_links) {
        if($this->b0xTPortal_admin_url && wp_http_validate_url($this->b0xTPortal_admin_url)) {
            $b0xTPortal_link = '<a href="'.$this->b0xTPortal_admin_url.'admin.php?page=box-tracker-portal">Settings</a>';
            array_push($b0xTPortal_links, $b0xTPortal_link);
        }
        return $b0xTPortal_links;
    }
}