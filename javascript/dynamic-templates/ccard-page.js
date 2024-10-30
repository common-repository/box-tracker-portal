function b0xTPortal_ccard_page_template(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b0xTPortal_init = function(b0xTPortal_extra_config) {
		var b0xTPortal_host_div = document.getElementById(b0xTPortal_data.config.hostDiv);
		var b0xTPortal_parent_div = document.getElementById(b0xTPortal_data.config.parentDiv);

		if(b0xTPortal_parent_div) {
			b0xTPortal_parent_div.style.maxWidth = "490px";
		}

		//make sure host exists
		if(b0xTPortal_host_div) {
			{
				//factory reset
				b0xTPortal_host_div.innerHTML = "";
				if(b0xTPortal_data.fields) { b0xTPortal_data.fields = undefined; };
				if(b0xTPortal_data.required_fields) { b0xTPortal_data.required_fields = undefined; };

				//make sure the element passed in is an array
				if(Array.isArray(b0xTPortal_extra_config.b0xTPortal_required_fields)) {
					b0xTPortal_data.required_fields = b0xTPortal_extra_config.b0xTPortal_required_fields;
				}
			}

			//wrapper div
			var b0xTPortal_wrapper_div = document.createElement("div");
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_ccard_page_template");
			b0xTPortal_wrapper_div.setAttribute("class", "b0xTPortal_backend_template");

			{
				//limiter div
				var b0xTPortal_limiter_div = document.createElement("div");
				b0xTPortal_data.fields = {}; //place holder for the fields

				{
					//header div
					var b0xTPortal_header_div = document.createElement("div");

					b0xTPortal_header_div.style.width = "100%";
					b0xTPortal_header_div.style.marginBottom = "30px";

					//build header
					if(typeof(b0xTPortal_data.config.header === "object")) {
						if(typeof(b0xTPortal_data.config.header.b0xTPortal_build_header) == "function") {
							var b0xTPortal_config = new Object();
							b0xTPortal_config.hostDiv = b0xTPortal_header_div;
							b0xTPortal_config.selected = "PROFILE";
							b0xTPortal_config.customerName = '<strong style="font-size: x-large;"">CREDIT CARD</strong>';
							b0xTPortal_data.config.header.b0xTPortal_build_header(b0xTPortal_config);
						} 
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_header_div);
				}

				{
					b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.gap = "2px";

					{
						//first name
						b0xTPortal_div_row = _b0xTPortal_create_rows("First Name", "", "b0xTPortal_ccard_first_name", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//last name
						b0xTPortal_div_row = _b0xTPortal_create_rows("Last Name", "", "b0xTPortal_ccard_last_name", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//address
						b0xTPortal_div_row = _b0xTPortal_create_rows("Address", "", "b0xTPortal_ccard_address", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//address2
						b0xTPortal_div_row = _b0xTPortal_create_rows("Address2", "", "b0xTPortal_ccard_address2", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//city
						b0xTPortal_div_row = _b0xTPortal_create_rows("City", "", "b0xTPortal_ccard_city", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//state
						var b0xTPortal_list  = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_list_of_state : new Array();
						b0xTPortal_div_row = _b0xTPortal_create_select_rows("State", "", "b0xTPortal_ccard_state", b0xTPortal_list, 0, "state");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//zip
						b0xTPortal_div_row = _b0xTPortal_create_rows("Zip", "", "b0xTPortal_ccard_zip", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//state
						var b0xTPortal_list  = new Array({ "short": "US", "long": "United States" }, { "short": "CA", "long": "Canada" });
						b0xTPortal_div_row = _b0xTPortal_create_select_rows("Country", "", "b0xTPortal_ccard_country", b0xTPortal_list, 0, "country");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//phone
						b0xTPortal_div_row = _b0xTPortal_create_rows("Phone", "", "b0xTPortal_ccard_phone", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}


					{
						//email
						b0xTPortal_div_row = _b0xTPortal_create_rows("Email", "", "b0xTPortal_ccard_email", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}


					{
						//card number
						b0xTPortal_div_row = _b0xTPortal_create_rows("Card Number", "", "b0xTPortal_ccard_number", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{

						//exp moth
						var b0xTPortal_list  = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
						b0xTPortal_div_row = _b0xTPortal_create_select_rows("Exp. Month", "", "b0xTPortal_ccard_exp_month", b0xTPortal_list, 0, "months");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{

						//exp year
						var b0xTPortal_list  = new Array();
						b0xTPortal_div_row = _b0xTPortal_create_select_rows("Exp. Year", "", "b0xTPortal_ccard_exp_year", b0xTPortal_list, 0, "year");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//cvv
						b0xTPortal_div_row = _b0xTPortal_create_rows("CVV", "", "b0xTPortal_ccard_cvv", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//save button
						b0xTPortal_div_row = document.createElement("div");
						b0xTPortal_div_row.style.justifyContent = "end";
						b0xTPortal_div_row.style.marginTop = "20px";
						b0xTPortal_div_row.style.display = "flex";

						b0xTPortal_button = document.createElement("input");
						b0xTPortal_button.setAttribute("type", "button");

						b0xTPortal_button.style.width = "125px";

						b0xTPortal_button.value = "Save";

						b0xTPortal_button.onclick = function() {
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

							if(typeof(b0xTPortal_data.config.saveCCardNextF) === "function") {
								var object = new Object();
								object.ccard_first_name = b0xTPortal_data.fields["b0xTPortal_ccard_first_name"].value;
								object.ccard_last_name = b0xTPortal_data.fields["b0xTPortal_ccard_last_name"].value;
								object.ccard_address = b0xTPortal_data.fields["b0xTPortal_ccard_address"].value;
								object.ccard_address2 = b0xTPortal_data.fields["b0xTPortal_ccard_address2"].value;
								object.ccard_city = b0xTPortal_data.fields["b0xTPortal_ccard_city"].value;
								object.ccard_state = b0xTPortal_data.fields["b0xTPortal_ccard_state"].value;
								object.ccard_zip = b0xTPortal_data.fields["b0xTPortal_ccard_zip"].value;
								object.ccard_country = b0xTPortal_data.fields["b0xTPortal_ccard_country"].value;
								object.ccard_phone = b0xTPortal_data.fields["b0xTPortal_ccard_phone"].value;
								object.ccard_email = b0xTPortal_data.fields["b0xTPortal_ccard_email"].value;
								object.ccard_number = b0xTPortal_data.fields["b0xTPortal_ccard_number"].value;
								object.ccard_exp_month = b0xTPortal_data.fields["b0xTPortal_ccard_exp_month"].value;
								object.ccard_exp_year = b0xTPortal_data.fields["b0xTPortal_ccard_exp_year"].value;
								object.ccard_cvv = b0xTPortal_data.fields["b0xTPortal_ccard_cvv"].value;
								object.required_fields = b0xTPortal_data.required_fields;

								b0xTPortal_data.config.saveCCardNextF(object);
							}
						}

						b0xTPortal_div_row.appendChild(b0xTPortal_button);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);	
				}

				//finalize structure
				b0xTPortal_wrapper_div.appendChild(b0xTPortal_limiter_div);
			}

			b0xTPortal_host_div.appendChild(b0xTPortal_wrapper_div);
		}
	}

	//create rows
	function _b0xTPortal_create_rows(b0xTPortal_label, b0xTPortal_value, b0xTPortal_key, b0xTPortal_type) {
		var b0xTPortal_div_row = document.createElement("div");
		b0xTPortal_div_row.style.display = "flex";

		//check boxes work a bit diffrent
		if(b0xTPortal_type == "checkbox") {
			b0xTPortal_div_row.style.flexDirection = "row-reverse";
		}

		{
			var b0xTPortal_label_wrapper = document.createElement("div");
			b0xTPortal_label_wrapper.style.width = "100px";
			b0xTPortal_label_wrapper.style.marginTop = "auto";
			b0xTPortal_label_wrapper.style.marginBottom = "auto";
			b0xTPortal_label_wrapper.style.marginRight = "10px";
			b0xTPortal_label_wrapper.style.flexShrink = "0";

			//check boxes work a bit diffrent
			if(b0xTPortal_type == "checkbox") {
				b0xTPortal_label_wrapper.style.flexGrow = "1";
			}

			var b0xTPortal_label_span = document.createElement("span");
			b0xTPortal_label_span.innerHTML = "<strong>"+b0xTPortal_label+"</strong>";

			b0xTPortal_label_wrapper.appendChild(b0xTPortal_label_span);
			b0xTPortal_div_row.appendChild(b0xTPortal_label_wrapper);
		}

		{
			var b0xTPortal_input_wrapper = document.createElement("div");
			b0xTPortal_input_wrapper.style.flexGrow = "1";

			var b0xTPortal_input = document.createElement("input");
			b0xTPortal_input.setAttribute("type", b0xTPortal_type);

			//check boxes work a bit diffrent
			if(b0xTPortal_type == "checkbox") {
				b0xTPortal_input_wrapper.style.flexGrow = "0";
				b0xTPortal_input_wrapper.style.marginRight = "10px";

				//expecting value to be 1 or "1" other wise ill set to 0. No exceptions
				b0xTPortal_value = (b0xTPortal_value == 1 || b0xTPortal_value == "1") ? 1 : 0;
				b0xTPortal_input.checked = b0xTPortal_value ? true : false;
			} else {
				b0xTPortal_input.value = b0xTPortal_value;	
			}		

			b0xTPortal_input_wrapper.appendChild(b0xTPortal_input);
			b0xTPortal_div_row.appendChild(b0xTPortal_input_wrapper);

			//store the input.
			b0xTPortal_data.fields[b0xTPortal_key] = b0xTPortal_input;
		}

		//return the row.
		return b0xTPortal_div_row;
	}

	//create select row
	function _b0xTPortal_create_select_rows(b0xTPortal_label, b0xTPortal_value, b0xTPortal_key, b0xTPortal_list, b0xTPortal_disabled, b0xTPortal_control) {
		var b0xTPortal_div_row = document.createElement("div");
		b0xTPortal_div_row.style.display = "flex";

		{
			var b0xTPortal_label_wrapper = document.createElement("div");
			b0xTPortal_label_wrapper.style.width = "100px";
			b0xTPortal_label_wrapper.style.marginTop = "auto";
			b0xTPortal_label_wrapper.style.marginBottom = "auto";
			b0xTPortal_label_wrapper.style.marginRight = "10px";
			b0xTPortal_label_wrapper.style.flexShrink = "0";

			var b0xTPortal_label_span = document.createElement("span");
			b0xTPortal_label_span.innerHTML = "<strong>"+b0xTPortal_label+"</strong>";

			b0xTPortal_label_wrapper.appendChild(b0xTPortal_label_span);
			b0xTPortal_div_row.appendChild(b0xTPortal_label_wrapper);
		}

		{
			var b0xTPortal_select_wrapper = document.createElement("div");
			b0xTPortal_select_wrapper.style.flexGrow = "1";

			var b0xTPortal_select = document.createElement("select");

			{
				var option = document.createElement("option");
				option.value = "";
				option.innerHTML = "Please select";
				b0xTPortal_select.appendChild(option);
			}

			if(Array.isArray(b0xTPortal_list) || typeof(b0xTPortal_list) === "object") {
				var foundValue = 0; //make sure the value exist
				switch(b0xTPortal_control) {
					case "state":
						b0xTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.state_short;
							option.innerHTML = value.state_name;
							b0xTPortal_select.appendChild(option);

							if(value.state_short == b0xTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "country":
						b0xTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.short;
							option.innerHTML = value.long;
							b0xTPortal_select.appendChild(option);

							if(value.short == b0xTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "months":
						for(var b0xTPortal_index = 0; b0xTPortal_index < 12; b0xTPortal_index++) {
							var option = document.createElement("option");
							var b0xTPortal_month_value = b0xTPortal_index+1;
							option.value = b0xTPortal_month_value;
							option.innerHTML = b0xTPortal_list[b0xTPortal_index]+"("+(b0xTPortal_month_value)+")";
							b0xTPortal_select.appendChild(option);

							if(b0xTPortal_month_value == b0xTPortal_value) {
								foundValue++;
							}
						}
						break;
					case "year":
						var b0xTPortal_date = new Date();
						var b0xTPortal_full_year = b0xTPortal_date.getFullYear();
						var b0xTPortal_yeah_abrv = parseInt(b0xTPortal_full_year.toString().substr(2));

						for(var b0xTPortal_index = 0; b0xTPortal_index < 12; b0xTPortal_index++) {
							var option = document.createElement("option");
							option.value = b0xTPortal_yeah_abrv+b0xTPortal_index;
							option.innerHTML = b0xTPortal_full_year+b0xTPortal_index;
							b0xTPortal_select.appendChild(option);

							if((b0xTPortal_yeah_abrv+b0xTPortal_index) == (b0xTPortal_value * 1)) {
								foundValue++;
							}
						}
						break;
					default:
						//Should never happen
				}

				if(foundValue) {
					b0xTPortal_select.value = b0xTPortal_value;
				}

				b0xTPortal_select_wrapper.appendChild(b0xTPortal_select);
			}

			if(b0xTPortal_disabled) { 
				b0xTPortal_select.disabled = true;
				b0xTPortal_select.style.background = "#f5f5f5";
			}

			b0xTPortal_div_row.appendChild(b0xTPortal_select_wrapper);

			//store the input.
			b0xTPortal_data.fields[b0xTPortal_key] = b0xTPortal_select;
		}

		//return the row.
		return b0xTPortal_div_row;
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