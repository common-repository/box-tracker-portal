<?php
/**
 * This class will set global variables
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

class B0xTPortal_Global_Variables {
    public $b0xTPortal_plugin;
    public $b0xTPortal_plugin_path;
    public $b0xTPortal_plugin_url;
    public $b0xTPortal_admin_url;
    public $b0xTPortal_boxT_url;

    //set variables
    function __construct() {
        $this->b0xTPortal_plugin      = plugin_basename(dirname(__FILE__, 3)).'/box-tracker-portal.php';
        $this->b0xTPortal_plugin_path = plugin_dir_path(dirname(__FILE__, 2));
        $this->b0xTPortal_plugin_url  = plugin_dir_url(dirname(__FILE__, 2));
        $this->b0xTPortal_admin_url   = admin_url();
        $this->b0xTPortal_boxT_url    = 'https://www.dumpster.software/controller.html';
        //$this->b0xTPortal_boxT_url  = 'https://boxtracker.dev2.rocks/controller.html';
    }
}