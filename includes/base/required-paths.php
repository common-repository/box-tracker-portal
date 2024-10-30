<?php
/**
 * generates a list of paths that we
 * can use to make all our includes
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

class B0xTPortal_Required_Paths {
    public $b0xTPortal_plugin_path;

    /**
     * set the plugin path
     * 
     * @param string $b0xTPortal_path
     */
    function __construct(string $b0xTPortal_path) {
        $b0xTPortal_path = sanitize_text_field($b0xTPortal_path);
        $this->b0xTPortal_plugin_path = $b0xTPortal_path;
    }

    /**
     * Get a list of paths
     * 
     * @return an array of paths
     */
    function b0xTPortal_get_paths() {
        $b0xTPortal_list_of_paths = array();
        if($this->b0xTPortal_plugin_path) {
            if(file_exists($this->b0xTPortal_plugin_path.'includes/init.php')) {
                    array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/init.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/base/session.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/session.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/base/global_variables.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/global_variables.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/base/ajax-utility.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/ajax-utility.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/base/server-calls.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/server-calls.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/base/ajax-control.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/ajax-control.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/plugin-load.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/plugin-load.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/login.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/login.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/logout.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/logout.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/home-page.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/home-page.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/profile-page.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/profile-page.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/jobsite-page.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/jobsite-page.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/workorder-page.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/workorder-page.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/ccard-page.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/ccard-page.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/transactions-page.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/transactions-page.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/payment-page.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/payment-page.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/ajax/reports-page.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/ajax/reports-page.php');
            }
            if(file_exists($this->b0xTPortal_plugin_path.'includes/base/enqueue.php')) {
                array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/enqueue.php');
            }

            //conditional
            if(is_admin()) {
                if(file_exists($this->b0xTPortal_plugin_path.'includes/base/activate.php')) {
                    array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/activate.php');
                }
                if(file_exists($this->b0xTPortal_plugin_path.'includes/base/deactivate.php')) {
                    array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/deactivate.php');
                }
                if(file_exists($this->b0xTPortal_plugin_path.'includes/base/plugin-links.php')) {       
                    array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/base/plugin-links.php');
                }
                if(file_exists($this->b0xTPortal_plugin_path.'includes/gui-pages/admin-options.php')) {
                    array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/gui-pages/admin-options.php');
                }
            } else {
                if(file_exists($this->b0xTPortal_plugin_path.'includes/gui-pages/front-house.php')) {
                    array_push($b0xTPortal_list_of_paths, $this->b0xTPortal_plugin_path.'includes/gui-pages/front-house.php');
                }
            }
        }
        return $b0xTPortal_list_of_paths;
    }
}