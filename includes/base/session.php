<?php
/**
 * This class will create a session
 * when the plug in launches.
 * 
 * @package BoxTrackerPortal
 */

namespace b0xTPortal_includes\b0xTPortal_base;

class B0xTPortal_Session {
    function b0xTPortal_init() {
        add_action('init', array($this, 'b0xTPortal_session_start'));
    }

    //start session
    function b0xTPortal_session_start() {
        if(!session_id()) {
            session_start();
        }
    }
}