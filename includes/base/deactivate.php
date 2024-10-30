<?php
/**
 * This class will trigger everytime
 * the plugin gets deactivated
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

class B0xTPortal_Deactivate {
    public static function b0xTPortal_deactivate() {
        flush_rewrite_rules();
        self::b0xTPortal_clean_database();
    }

    /**
     * This function will drop the
     * states table if it exist..
     * 
     */
    private static function b0xTPortal_clean_database() {
        global $wpdb;
        $b0xTPortal_table_name = $wpdb->prefix.'b0xTPortal_states';

        $b0xTPortal_table_exist = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($b0xTPortal_table_name)); 
               
        if($wpdb->get_var($b0xTPortal_table_exist) === $b0xTPortal_table_name) {
            $b0xTPortal_query_drop_table = "DROP TABLE $b0xTPortal_table_name";
            $wpdb->query($b0xTPortal_query_drop_table); 
        }
    }
}