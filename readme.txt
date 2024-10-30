=== Box Tracker Portal === 

Requires at least: 4.9 
Requires PHP: 5.6.4 
Tested up to: 6.2.0 
Stable tag: 1.1.0 
License: GPLv2 or later 
License URI: http://www.gnu.org/licenses/gpl-2.0.html

==== IMPORTANT ====

The Box Tracker Portal plug in enables web visitors to order dumpster services from the private waste haulers who maintain the sites.  The plug in interacts with the Box Tracker API described here: https://www.dumpster.software/api/ under SSL.  Box Tracker is an enterprise solution for managing  waste hauling by providing services such as order management, and dispatch which the plug in is intended to facilitate.  The information is used exclusively by the company the visitor is explicitely patronizing to facilitate the service that the web visitor is explicitly requesting and is not transmitted, sold, licensed or even accessible by any third party. The plug in does not track the visitor and reports information provided only for the purpose of ordering dumpster services.

Questions may be directed to James Moser President / Lead Developer of Cairn Applications 603 546 6751 ext 101 or jim@cairnapps.com

== Importing Plugin == 

To import “Box Tracker Portal” plugin into WordPress. User needs to navigate to “Upload Plugin” feature under the Plugins area in the WordPress dashboard.

== Activating Plugin == 

To activate the “Box Tracker Portal” plugin user need to navigate to “Installed Plugins” section under the Plugins area in the WordPress dashboard.  
Here user will get list of all the installed plugins, from this list user need to find “BoxTracker Online” and click on “Activate”.

== Setting up Box Tracker Portal ==

To update the settings “Box Tracker Portal”, the user will need to access the plugin's setting using the “Box Tracker Portal” feature from the sidebar of the admin panel, and then update all required fields.

Amongts those required fields is the google api key. The user will need it or the plugin wont function. To obtain a google api key follow the steps bellow:

1. Go to "https://cloud.google.com/maps-platform/" and click on "Get Started"
2. A pop up window will open, asking you to select a product(s); select maps and places.
3. Login to or create a google account, then enter a project name and create a billing account.
4. After you billing account is created, you will be prompt with another option, allowing you to
   enable google maps platform. Click next, and google will respond with an api key. This method will
   activate all google maps platform API(s). However, you can go back and remove the ones you wont need
   for this plugin. The API(s) you will need are the followings: Directions API, Distance Matrix API, 
   Geocoding API, Maps Elevation API, Maps JavaScript API and Places API.

== Using Plugin in front end == 
 
To use the plugin at front of the WordPress site user needs to create a new page and use the shortcode [box-tracker-portal] in the page or the user can add the shortcode [box-tracker-portal] in any existing page where user wants to use the plugin. 