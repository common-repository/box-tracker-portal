<?php
/**
 * @package BoxTrackerPortal
 */

//Some security protocols
if(!defined('WP_UNINSTALL_PLUGIN')) { die; }

//now delete the options.
 delete_option('b0xTPortal_page_title');
 delete_option('b0xTPortal_username');
 delete_option('b0xTPortal_password');
 delete_option('b0xTPortal_zipcode_label');
 delete_option('b0xTPortal_admin_country');
 delete_option('b0xTPortal_google_api_key');
 delete_option('b0xTPortal_mode');