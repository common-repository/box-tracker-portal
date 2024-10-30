<?php
/**
 * @package BoxTrackerPortal
 */

/*
Plugin Name: Box Tracker Portal
Plugin URI: https://www.dumpster.software/api/word-press-plugin.html
Description: The Box Tracker Portal plugin facilitates online ordering for waste haulers. Customers will be able to book and manage work orders, manage job sites, view reporting and manage their transactions.  Using the Web API tab on Box Tracker's Preferences app, you can prevent over booking, control which days of the week online orders will be accepted, and prevent same day ordering.  For more information about Box Tracker or this plugin please contact support at 603 546 6751 option 2 or support@cairnapps.com
Version: 1.1.0
Author: Cairn Applications Inc
Author URI: https://www.cloud-computing.rocks/
License: GPLv2 or later
Text Domain: box-tracker-portal
*/

//security protocols
if(!defined('ABSPATH')) { die; }
if(!function_exists('add_action')) { die; }

//include some classes, these classes will be used to implement namespaces
if(file_exists(plugin_dir_path(__FILE__).'includes/base/required-paths.php')) {
    require_once plugin_dir_path(__FILE__).'includes/base/required-paths.php';
}

if(class_exists('b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Required_Paths')) {
    $b0xTPortal_required_paths = new b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Required_Paths(plugin_dir_path(__FILE__));
    foreach($b0xTPortal_required_paths->b0xTPortal_get_paths() as $b0xTPortal_path) {
        require_once $b0xTPortal_path;
    }
}

//flush and create tables
function b0xTPortal_activate_flush() {
    if(class_exists('b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Activate')) {
        b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Activate::b0xTPortal_activate();
    }
}

//flushes and drop tables
function b0xTPortal_deactivate_flush() {
    if(class_exists('b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Deactivate')) {
        b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Deactivate::b0xTPortal_deactivate();
    }
}

register_activation_hook(__FILE__, 'b0xTPortal_activate_flush');
register_deactivation_hook(__FILE__, 'b0xTPortal_deactivate_flush');

//initialize some classes 
if(class_exists('b0xTPortal_includes\B0xTPortal_Init')) {
    b0xTPortal_includes\B0xTPortal_Init::b0xTPortal_init();
}