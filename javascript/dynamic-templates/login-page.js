function b0xTPortal_login_template(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b0xTPortal_init = function(b0xTPortal_required_fields) {
		var b0xTPortal_host_div = document.getElementById(b0xTPortal_data.config.hostDiv);
		var b0xTPortal_parent_div = document.getElementById(b0xTPortal_data.config.parentDiv);

		if(b0xTPortal_parent_div) {
			b0xTPortal_parent_div.style.maxWidth = "486px";
		}

		//make sure host exists
		if(b0xTPortal_host_div) {
			{
				//factory reset
				b0xTPortal_host_div.innerHTML = "";
				if(b0xTPortal_data.fields) { b0xTPortal_data.fields = undefined; };
				if(b0xTPortal_data.required_fields) { b0xTPortal_data.required_fields = undefined; };

				//make sure the element passed in is an array
				if(Array.isArray(b0xTPortal_required_fields)) {
					b0xTPortal_data.required_fields = b0xTPortal_required_fields;
				}
			}

			//wrapper div
			var b0xTPortal_wrapper_div = document.createElement("div");
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_login_template");

			{
				//limiter div
				var b0xTPortal_limiter_div = document.createElement("div");
				b0xTPortal_data.fields = {}; //place holder for the fields

				{
					//username
					var b0xTPortal_username_div = document.createElement("div");
					var b0xTPortal_username_input = document.createElement("input");

					b0xTPortal_username_input.setAttribute("placeholder", "Username");
					b0xTPortal_username_input.setAttribute("type", "textbox");

					b0xTPortal_username_input.style.textAlign = "center";

					b0xTPortal_username_div.appendChild(b0xTPortal_username_input);
					b0xTPortal_limiter_div.appendChild(b0xTPortal_username_div);

					//store input
					b0xTPortal_data.fields["b0xTPortal_username"] = b0xTPortal_username_input;
				}

				{
					//password
					var b0xTPortal_password_div = document.createElement("div");
					var b0xTPortal_password_input = document.createElement("input");

					b0xTPortal_password_input.setAttribute("placeholder", "Password");
					b0xTPortal_password_input.setAttribute("type", "password");

					b0xTPortal_password_input.style.textAlign = "center";

					b0xTPortal_password_div.appendChild(b0xTPortal_password_input);
					b0xTPortal_limiter_div.appendChild(b0xTPortal_password_div);

					//store input
					b0xTPortal_data.fields["b0xTPortal_password"] = b0xTPortal_password_input;		
				}

				{
					//submit button
					var b0xTPortal_submit_div = document.createElement("div");
					var b0xTPortal_submit_button = document.createElement("input");

					b0xTPortal_submit_button.setAttribute("type", "button");
				
					b0xTPortal_submit_button.value = "Log in";		

					b0xTPortal_submit_button.onclick = function() {
						//clear the failure if posible.
						var b0xTPortal_failure_flag = document.getElementById(b0xTPortal_data.config.failFlag);
						if(b0xTPortal_failure_flag) { b0xTPortal_failure_flag.innerHTML = ""; }

						//make sure that we dont have any flags
						if(b0xTPortal_data.b0xTPortal_validate_fields(b0xTPortal_data.required_fields)) { 
							if(b0xTPortal_failure_flag) {
								var b0xTPortal_message = document.createElement("p");
								b0xTPortal_message.setAttribute("class", "b0xTPortal-error-msg");
								b0xTPortal_message.innerHTML = "Please fill the highlighted fields.";
								b0xTPortal_failure_flag.appendChild(b0xTPortal_message);
							}
							return; 
						}

						if(typeof(b0xTPortal_data.config.nextF) === "function") {
							var object = new Object();
							object.username = b0xTPortal_data.fields["b0xTPortal_username"].value;	
							object.password = b0xTPortal_data.fields["b0xTPortal_password"].value;	
							object.required_fields = b0xTPortal_data.required_fields;
							b0xTPortal_data.config.nextF(object);
						}
					}

					b0xTPortal_submit_div.appendChild(b0xTPortal_submit_button);
					b0xTPortal_limiter_div.appendChild(b0xTPortal_submit_div);
				}

				//finalize structure
				b0xTPortal_wrapper_div.appendChild(b0xTPortal_limiter_div);
			}

			b0xTPortal_host_div.appendChild(b0xTPortal_wrapper_div);

			//apply css and set an observer
			_b0xTPortal_observer();
		}
	}

	//dynamic blend
	function _b0xTPortal_observer() {
		var b0xTPortal_resize_observer = new ResizeObserver(function() {
			var b0xTPortal_div = document.getElementById("b0xTPortal_login_template");

			if(b0xTPortal_div) {} else {
				b0xTPortal_resize_observer.disconnect();
				return; //skip evaluations
			}

			var b0xTPortal_div_width = b0xTPortal_div.offsetWidth;

			if(b0xTPortal_div_width > 375) {
				b0xTPortal_div.className = "b0xTPortal_login_template_mw375";
			} else {
				b0xTPortal_div.className = "";
			}
		});

		var b0xTPortal_div = document.getElementById("b0xTPortal_login_template");
		b0xTPortal_resize_observer.observe(b0xTPortal_div);
	}

	//add or update required fields
	this.b0xTPortal_update_required_fields = function(b0xTPortal_fields) {
		if(!Array.isArray(b0xTPortal_fields)) { return; }
		b0xTPortal_data.required_fields = b0xTPortal_fields;
	}

	//validate array of fields will attempt to filter
	//using the map we defined when setting the defaults.
	this.b0xTPortal_validate_fields = function(b0xTPortal_fields) {
		if(!Array.isArray(b0xTPortal_fields)) { return 0; }

		var b0xTPortal_flags = 0;
		for(var b0xTPortal_index = 0; b0xTPortal_index < b0xTPortal_fields.length; b0xTPortal_index++) {
			var b0xTPortal_key = b0xTPortal_fields[b0xTPortal_index];
			
			//check to see if we find the field and if so validate it.
			if(b0xTPortal_data.b0xTPortal_validate_field(b0xTPortal_key, 0)) {
				b0xTPortal_flags++;	
			}			
		}

		return b0xTPortal_flags;
	}

	//validate a field.
	this.b0xTPortal_validate_field = function(b0xTPortal_field, b0xTPortal_force_error) {
		var b0xTPortal_field_element = b0xTPortal_data.fields[b0xTPortal_field];

		if(b0xTPortal_field_element) {
			//all check boxes must be evaluated diffrently
			if(b0xTPortal_field_element.tagName.toLowerCase() == "input") {
				if(b0xTPortal_field_element.type == "checkbox") {
					b0xTPortal_field_element.style.boxShadow = "0px 0px 0px 0px transparent";
					b0xTPortal_field_element.style.background = "transparent";

					if(!b0xTPortal_field_element.checked || b0xTPortal_force_error) {
						b0xTPortal_field_element.style.boxShadow = "0px 0px 0px 1px #ff0000";
						b0xTPortal_field_element.style.background = "#ff0000";
						return 1;
					}
					return 0;
				}
			}

			//all other elements
			b0xTPortal_field_element.style.border = "solid 1px #ddd";

			if(!b0xTPortal_field_element.value || b0xTPortal_force_error) {
				b0xTPortal_field_element.style.border = "solid 1px #ff0000";
				return 1;
			}
		}
		return 0;
	}

	//set some defaults
	var _b0xTPortal_defaults = function() {
		if(b0xTPortal_data.config.parentDiv == undefined) { b0xTPortal_data.config.parentDiv = "b0xTPortal_template_wrapper" }
		if(b0xTPortal_data.config.hostDiv == undefined) { b0xTPortal_data.config.hostDiv = "b0xTPortal_template"; }
		if(b0xTPortal_data.config.failFlag == undefined) { b0xTPortal_data.config.failFlag = "b0xTPortal_failure_flag"; }
	} 

	_b0xTPortal_defaults();
	return this;
}