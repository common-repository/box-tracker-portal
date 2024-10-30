<?php
/**
 * This class will create an instance
 * of one or more classes, and then call
 * the b0xTPortal_init method if it exist.
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes;

use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Session;
use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Plugin_Links;
use b0xTPortal_includes\b0xTPortal_gui\B0xTPortal_Admin_Options;
use b0xTPortal_includes\b0xTPortal_gui\B0xTPortal_Front_House;
use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Ajax_Control;
use b0xTPortal_includes\b0xTPortal_base\B0xTPortal_Enqueue;

final class B0xTPortal_Init {
    /**
     * Get the desired classes to get the
     * plugin working.
     * 
     * @return an array of classes 
     */
    public static function b0xTPortal_get_classes () {
        $b0xTPortal_array = array();
        array_push($b0xTPortal_array, B0xTPortal_Session::class);
        array_push($b0xTPortal_array, B0xTPortal_Ajax_Control::class);
        array_push($b0xTPortal_array, B0xTPortal_Enqueue::class);

        if(is_admin()) {
            array_push($b0xTPortal_array, B0xTPortal_Plugin_Links::class);
            array_push($b0xTPortal_array, B0xTPortal_Admin_Options::class);
        } else {
            array_push($b0xTPortal_array, B0xTPortal_Front_House::class);
        }

        return $b0xTPortal_array;
    }

    /**
     * Iterate through an array of classes
     * instantiate them, and call b0xT_init.
     * 
     */
    public static function b0xTPortal_init () {
        foreach (self::b0xTPortal_get_classes() as $b0xTPortal_class) {
            $b0xTPortal_instance = self::b0xTPortal_instantiate_class($b0xTPortal_class);
            if(method_exists($b0xTPortal_instance, 'b0xTPortal_init')) {
                $b0xTPortal_instance->b0xTPortal_init();
            }
        }
    }

    /**
     * Instatiate the class
     * 
     * @return an instance of a class
     */
    private static function b0xTPortal_instantiate_class($b0xTPortal_class) {
        $b0xTPortal_instance = new $b0xTPortal_class(); 
        return $b0xTPortal_instance;
    }
}