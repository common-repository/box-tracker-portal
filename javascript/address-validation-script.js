function b0xTPortal_cls_address_vldtr(b0xTPortal_arg_config) { 
     var b0xTPortal_address_data = this;
     b0xTPortal_address_data.config = b0xTPortal_arg_config;

     b0xTPortal_address_data.validated = "0";

     var b0xTPortal_place_auto_complete;

     this._b0xTPortal_init = function() {
          //setup google places address autocomplete
          var b0xTPortal_search = b0xTPortal_address_data.config.searchCtrl;
          b0xTPortal_place_auto_complete = new google.maps.places.Autocomplete(
               b0xTPortal_search, { 
                    fields: ['geometry', 'address_component', 'type']
               }
          );

          var b0xTPortal_call_back = function () {
               b0xTPortal_address_data._b0xTPortal_fill_in_address();
          }

          b0xTPortal_place_auto_complete.addListener( 'place_changed',  b0xTPortal_call_back);
          b0xTPortal_address_data.placeautocomplete = b0xTPortal_place_auto_complete;

          //limit the counties to usa and canada
          b0xTPortal_place_auto_complete.setComponentRestrictions({
               country: ['us', 'ca']
          });

          //setup event listensers on fields
          b0xTPortal_address_data.config.addressCtrl.oninput = b0xTPortal_address_data._b0xTPortal_address_changed;
          b0xTPortal_address_data.config.cityCtrl.onchange = b0xTPortal_address_data._b0xTPortal_address_changed;
          b0xTPortal_address_data.config.stateCtrl.onchange = b0xTPortal_address_data._b0xTPortal_address_changed;
          b0xTPortal_address_data.config.postalCtrl.onchange = b0xTPortal_address_data._b0xTPortal_address_changed;
     };

     this._b0xTPortal_fill_in_address = function () {
          var b0xTPortal_place = b0xTPortal_address_data.placeautocomplete.getPlace();

          if (!b0xTPortal_place.geometry) {
               b0xTPortal_address_data.config.addressCtrl.value = "";
               b0xTPortal_address_data.b0xTPortal_refresh_google_verification();
               if(b0xTPortal_address_data.dBox) {
                    b0xTPortal_address_data.dBox.b0xTPortal_open_dialog("WARNING!!", 'No details available for input: '+b0xTPortal_place.name, null);
               }
               return;
          }
        
          //get autocompleted address
          let b0xTPortal_street_number = b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'street_number' );
          b0xTPortal_street_number.short_name = b0xTPortal_street_number.short_name ? b0xTPortal_street_number.short_name : b0xTPortal_address_data.config.searchCtrl.value.split(' ')[0].replaceAll(/\D/g, '');
  
          let b0xTPortal_street_name = b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'street_address' );
          b0xTPortal_street_name = b0xTPortal_street_name.long_name ? b0xTPortal_street_name : b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'route' );
          b0xTPortal_street_name = b0xTPortal_street_name.long_name ? b0xTPortal_street_name : b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'intersection' );
  
          let b0xTPortal_city = b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'locality' );
          b0xTPortal_city = b0xTPortal_city.long_name ? b0xTPortal_city : b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'administrative_area_level_3' );
          b0xTPortal_city = b0xTPortal_city.long_name ? b0xTPortal_city : b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'sublocality_level_1' );
  
          let b0xTPortal_state = b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'administrative_area_level_1' );
          let b0xTPortal_postal = b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'postal_code' );         
          let b0xTPortal_postal_suffix = b0xTPortal_address_data._b0xTPortal_find_address_component( b0xTPortal_place.address_components, 'postal_code_suffix' );

          //we are done, clear address field
          b0xTPortal_address_data.config.addressCtrl.value = "";

          //however, is state part of the selected country ?
          //if not we dont want to go any further than this
          var found_state = 0;
          for(var option of b0xTPortal_address_data.config.stateCtrl.options) {
               if(option.value == b0xTPortal_state.short_name) {
                    found_state++;
               }
          }

          if(!found_state) {
               b0xTPortal_address_data.config.cityCtrl.value = "";
               b0xTPortal_address_data.config.stateCtrl.value = "";
               b0xTPortal_address_data.b0xTPortal_refresh_google_verification();
               if(b0xTPortal_address_data.dBox) {
                    b0xTPortal_address_data.dBox.b0xTPortal_open_dialog("WARNING!!", "This address appears to reside in a country that is not accepted by this company", null);
               }
               return;
          }

          b0xTPortal_address_data.config.addressCtrl.value = `${b0xTPortal_street_number.short_name} ${b0xTPortal_street_name.short_name}`;
          b0xTPortal_address_data.current_address = `${b0xTPortal_street_number.short_name} ${b0xTPortal_street_name.short_name}`;
          b0xTPortal_address_data.config.cityCtrl.value = b0xTPortal_city.long_name;
          b0xTPortal_address_data.config.stateCtrl.value = b0xTPortal_state.short_name;
          b0xTPortal_address_data.config.postalCtrl.value = b0xTPortal_postal.short_name;

          //check if the address is rooftop
          let b0xTPortal_verified = b0xTPortal_place.types.includes('premise') || b0xTPortal_place.geometry.location_type == 'ROOFTOP' || b0xTPortal_postal_suffix.short_name.length;

          b0xTPortal_verified = b0xTPortal_verified ? 1 : 0;
          b0xTPortal_address_data.b0xTPortal_refresh_google_verification(b0xTPortal_verified);
     };

     this._b0xTPortal_find_address_component = function( b0xTPortal_address_array, b0xTPortal_search ) {
          for( let i = 0; i < b0xTPortal_address_array.length; i++ ) {
               if ( b0xTPortal_address_array[i].types[0] == b0xTPortal_search ) {
                    return b0xTPortal_address_array[i];
               }
          }
          return { long_name: '', short_name: '', types: [ b0xTPortal_search ] };
     };

     this.b0xTPortal_refresh_google_verification = function(b0xTPortal_arg_code) {
          //sanity check
          if(!b0xTPortal_arg_code) {
               b0xTPortal_arg_code = 0; 
          }

          switch(b0xTPortal_arg_code * 1) { //make sure its number
               case 1:
               case 2:
               case 3:
                    b0xTPortal_address_data.config.validateCtrl.style.color = "#008000";
                    b0xTPortal_address_data.config.validateCtrl.innerHTML = 'VERIFIED';
                    break;
               default:
                    b0xTPortal_address_data.config.validateCtrl.style.color = "#f30c0c";
                    b0xTPortal_address_data.config.validateCtrl.innerHTML = 'NOT VERIFIED';
                    break;
          }

          b0xTPortal_address_data.validated = String(b0xTPortal_arg_code);
     };

     this._b0xTPortal_address_changed = function() {
          if(b0xTPortal_address_data.validated * 1 == 0) {} else {
               b0xTPortal_address_data.b0xTPortal_refresh_google_verification(0);
          }
     };

     this._b0xTPortal_set_defaults = function() {
          if ( !b0xTPortal_address_data.config.addressCtrl   ) b0xTPortal_address_data.config.addressCtrl   = b0xTPortal_address_data._b0xTPortal_create_input_text_obj();
          if ( !b0xTPortal_address_data.config.cityCtrl      ) b0xTPortal_address_data.config.cityCtrl      = b0xTPortal_address_data._b0xTPortal_create_input_text_obj();
          if ( !b0xTPortal_address_data.config.stateCtrl     ) b0xTPortal_address_data.config.stateCtrl     = b0xTPortal_address_data._b0xTPortal_create_input_text_obj();
          if ( !b0xTPortal_address_data.config.postalCtrl    ) b0xTPortal_address_data.config.postalCtrl    = b0xTPortal_address_data._b0xTPortal_create_input_text_obj();

          if (b0xTPortal_address_data.config.status) {
               b0xTPortal_address_data.validated = b0xTPortal_address_data.config.status;
          }

          if(b0xTPortal_address_data.config.validateCtrl) {
               b0xTPortal_address_data.b0xTPortal_refresh_google_verification(b0xTPortal_address_data.validated);
          }

          if((typeof(b0xTPortal_pop_up_dialog) === "function")) {
               var config = new Object();
               config.binder = b0xTPortal_address_data.config.addressCtrl;
               b0xTPortal_address_data.dBox = new b0xTPortal_pop_up_dialog(config);
          }
     };

     this._b0xTPortal_create_input_text_obj = function() {
        let b0xTPortal_input = document.createElement('INPUT');
        b0xTPortal_input.setAttribute('type', 'text');
        return b0xTPortal_input;
     };

     this._b0xTPortal_set_defaults();
     this._b0xTPortal_init();
     return this;
}



