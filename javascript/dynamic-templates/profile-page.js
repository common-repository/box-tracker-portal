function b0xTPortal_profile_page_template(b0xTPortal_arg_config) {
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
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_profile_page_template");
			b0xTPortal_wrapper_div.setAttribute("class", "b0xTPortal_backend_template");

			{
				//limiter div
				var b0xTPortal_limiter_div = document.createElement("div");
				b0xTPortal_data.fields = {}; //place holder for the fields
				b0xTPortal_data.ccard_mask_objects = {}; //place holder for ccards masks

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
							b0xTPortal_config.customerName = '<strong style="font-size: x-large;"">PROFILE</strong>';
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
						//customer name
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_name : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Name", b0xTPortal_value, "b0xTPortal_customer_name", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//customer adress
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_address : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Address", b0xTPortal_value, "b0xTPortal_customer_address", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//customer adress2
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_address2 : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Address2", b0xTPortal_value, "b0xTPortal_customer_address2", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//customer city
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_city : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("City", b0xTPortal_value, "b0xTPortal_customer_city", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//customer state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_state : "";
						var b0xTPortal_list  = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_list_of_state : new Array();
						b0xTPortal_div_row = _b0xTPortal_create_state_rows("State", b0xTPortal_value, "b0xTPortal_customer_state", b0xTPortal_list);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//customer state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_zip : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Zip", b0xTPortal_value, "b0xTPortal_customer_zip", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//customer state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_contact : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Contact", b0xTPortal_value, "b0xTPortal_customer_contact", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}
					
					{
						//customer state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_phone : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Phone", b0xTPortal_value, "b0xTPortal_customer_phone", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}
					
					{
						//customer state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_cell : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Cell", b0xTPortal_value, "b0xTPortal_customer_cell", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}
					
					{
						//customer state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_fax : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Fax", b0xTPortal_value, "b0xTPortal_customer_fax", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}
					
					{
						//customer state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_email : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Email", b0xTPortal_value, "b0xTPortal_customer_email", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//credit card
						var b0xTPortal_value_ccard_wrapper = document.createElement("div");
						b0xTPortal_value_ccard_wrapper.style.display = "flex";
						b0xTPortal_value_ccard_wrapper.style.marginTop = "10px";

						var b0xTPortal_ccard_field_set = document.createElement("fieldset");

						b0xTPortal_ccard_field_set.style.padding = "15px";
						b0xTPortal_ccard_field_set.style.borderRadius = "5px";
						b0xTPortal_ccard_field_set.style.width = "100%";

						var b0xTPortal_ccard_field_set_legend = document.createElement("legend");
						b0xTPortal_ccard_field_set_legend.innerHTML = "<strong>Credit Card</strong>";
						b0xTPortal_ccard_field_set.appendChild(b0xTPortal_ccard_field_set_legend);

						{
							var b0xTPortal_ccard_mask = document.createElement("select");

							b0xTPortal_ccard_mask.style.border = "2px solid";
							b0xTPortal_ccard_mask.style.borderRadius = "20px";
							b0xTPortal_ccard_mask.style.padding = "1px 10px";
							b0xTPortal_ccard_mask.style.cursor = "pointer";
							b0xTPortal_ccard_mask.style.fontWeight = "bold";
							b0xTPortal_ccard_mask.style.textAlign = "center";
							b0xTPortal_ccard_mask.style.boxShadow = "3px 3px 10px #808080";
							b0xTPortal_ccard_mask.style.lineHeight = "25px";

							b0xTPortal_ccard_mask.setAttribute("class", "b0xTPortal_no_appearance_all_browsers");

							//add new card option
							var b0xTPortal_ccard_mask_option = document.createElement("option");
							b0xTPortal_ccard_mask_option.value = "-1";
							b0xTPortal_ccard_mask_option.innerHTML = "Add New Card";
							b0xTPortal_ccard_mask.appendChild(b0xTPortal_ccard_mask_option);

							//store the mask for later use
							b0xTPortal_data.fields["b0xTPortal_ccard_mask"] = b0xTPortal_ccard_mask;

							var b0xTPortal_no_card = function() {
								b0xTPortal_ccard_mask_option = document.createElement("option");
								b0xTPortal_ccard_mask_option.value = "0";
								b0xTPortal_ccard_mask_option.innerHTML = "No Card Information";
								b0xTPortal_ccard_mask.appendChild(b0xTPortal_ccard_mask_option);

								//update mask
								b0xTPortal_data.b0xTPortal_update_mask_value(0);
							}

							if(typeof(b0xTPortal_extra_config) === "object" && Array.isArray(b0xTPortal_extra_config.b0xTPortal_customer_ccard_mask)) {
								var b0xTPortal_primary_ccard;
								b0xTPortal_extra_config.b0xTPortal_customer_ccard_mask.forEach(function(value, index) {
									var b0xTPortal_ccard_mask_string = value.TypeAbrv+": "+value.Mask;
									b0xTPortal_ccard_mask_option = document.createElement("option");
									b0xTPortal_ccard_mask_option.value = value.ID;
									b0xTPortal_ccard_mask_option.innerHTML = b0xTPortal_ccard_mask_string;
									b0xTPortal_ccard_mask.appendChild(b0xTPortal_ccard_mask_option);

									//map the ccards for later use
									b0xTPortal_data.ccard_mask_objects[value.ID] = value;

									if(value.PrimaryCard * 1) {
										b0xTPortal_primary_ccard = value; 	
									} else if(index == 0) {
										b0xTPortal_primary_ccard = value;
									}
								});

								//update
								if(b0xTPortal_primary_ccard) {
									b0xTPortal_data.b0xTPortal_update_mask_value(b0xTPortal_primary_ccard.ID);
								} else {
									b0xTPortal_no_card();
								}
							} else {
								b0xTPortal_no_card();
							}

							b0xTPortal_ccard_field_set.appendChild(b0xTPortal_ccard_mask);

							b0xTPortal_ccard_mask.onchange = function() {
								//extract the manually updated value
								var b0xTPortal_old_value = this.getAttribute("manuallyUpdatedValue");

								//updates that should happen on change
								_b0xTPortal_update_old_value(this.value);
								_b0xTPortal_update_mask_visuals(this.value);

								//do some work
								if(this.value * 1 == -1) {
									if(typeof(b0xTPortal_data.config.loadCcardNextF) === "function") {
										b0xTPortal_data.config.loadCcardNextF();
									}
								} else {
									if(typeof(b0xTPortal_data.config.ccardMakePrimaryNextF) === "function") {
										b0xTPortal_data.config.ccardMakePrimaryNextF(this.value, b0xTPortal_old_value);
									}
								}
							}
						}

						b0xTPortal_value_ccard_wrapper.appendChild(b0xTPortal_ccard_field_set);
						b0xTPortal_div_table.appendChild(b0xTPortal_value_ccard_wrapper);
					}

					{
						//communications
						var b0xTPortal_value_field_set_wrapper = document.createElement("div");
						b0xTPortal_value_field_set_wrapper.style.display = "flex";
						b0xTPortal_value_field_set_wrapper.style.marginTop = "10px";

						var b0xTPortal_field_set = document.createElement("fieldset");

						b0xTPortal_field_set.style.padding = "15px";
						b0xTPortal_field_set.style.borderRadius = "5px";
						b0xTPortal_field_set.style.width = "100%";

						var b0xTPortal_field_set_legend = document.createElement("legend");
						b0xTPortal_field_set_legend.innerHTML = "<strong>Communication subscriptions</strong>";
						b0xTPortal_field_set.appendChild(b0xTPortal_field_set_legend);

						{
							//customer state
							var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_email_confirm : "";
							b0xTPortal_div_row = _b0xTPortal_create_rows("Work Order Confirmation", b0xTPortal_value, "b0xTPortal_customer_email_confirm", "checkbox");
							b0xTPortal_field_set.appendChild(b0xTPortal_div_row);
						}

						{
							//customer state
							var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_email_thankyou : "";
							b0xTPortal_div_row = _b0xTPortal_create_rows("Thank You Notes", b0xTPortal_value, "b0xTPortal_customer_email_thankyou", "checkbox");
							b0xTPortal_field_set.appendChild(b0xTPortal_div_row);
						}

						{
							//customer state
							var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_email_reminders : "";
							b0xTPortal_div_row = _b0xTPortal_create_rows("Reminder", b0xTPortal_value, "b0xTPortal_customer_email_reminders", "checkbox");
							b0xTPortal_field_set.appendChild(b0xTPortal_div_row);
						}

						{
							//customer state
							var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_sms : "";
							b0xTPortal_div_row = _b0xTPortal_create_rows("SMS Notifications", b0xTPortal_value, "b0xTPortal_customer_sms", "checkbox");
							b0xTPortal_field_set.appendChild(b0xTPortal_div_row);
						}

						b0xTPortal_value_field_set_wrapper.appendChild(b0xTPortal_field_set);
						b0xTPortal_div_table.appendChild(b0xTPortal_value_field_set_wrapper);
					}

					{
						//save button
						var b0xTPortal_div_row = document.createElement("div");
						b0xTPortal_div_row.style.justifyContent = "end";
						b0xTPortal_div_row.style.marginTop = "20px";
						b0xTPortal_div_row.style.display = "flex";

						var b0xTPortal_button = document.createElement("input");
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

							if(typeof(b0xTPortal_data.config.saveCustomerNextF) === "function") {
								var object = new Object();
								object.customer_name = b0xTPortal_data.fields["b0xTPortal_customer_name"].value;	
								object.customer_address = b0xTPortal_data.fields["b0xTPortal_customer_address"].value;
								object.customer_address2 = b0xTPortal_data.fields["b0xTPortal_customer_address2"].value;
								object.customer_city = b0xTPortal_data.fields["b0xTPortal_customer_city"].value;
								object.customer_state = b0xTPortal_data.fields["b0xTPortal_customer_state"].value;
								object.customer_zip = b0xTPortal_data.fields["b0xTPortal_customer_zip"].value;
								object.customer_contact = b0xTPortal_data.fields["b0xTPortal_customer_contact"].value;
								object.customer_phone = b0xTPortal_data.fields["b0xTPortal_customer_phone"].value;
								object.customer_cell = b0xTPortal_data.fields["b0xTPortal_customer_cell"].value;
								object.customer_fax = b0xTPortal_data.fields["b0xTPortal_customer_fax"].value;
								object.customer_email = b0xTPortal_data.fields["b0xTPortal_customer_email"].value;
								object.customer_email_confirm = b0xTPortal_data.fields["b0xTPortal_customer_email_confirm"].checked ? 1 : 0;
								object.customer_email_reminders = b0xTPortal_data.fields["b0xTPortal_customer_email_reminders"].checked ? 1 : 0;
								object.customer_email_thankyou = b0xTPortal_data.fields["b0xTPortal_customer_email_thankyou"].checked ? 1 : 0;
								object.customer_sms = b0xTPortal_data.fields["b0xTPortal_customer_sms"].checked ? 1 : 0;
								object.required_fields = b0xTPortal_data.required_fields;
								b0xTPortal_data.config.saveCustomerNextF(object);
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

	//select using id
	this.b0xTPortal_update_mask_value = function(b0xTPortal_value) {
		var b0xTPortal_ccard_mask = b0xTPortal_data.fields["b0xTPortal_ccard_mask"];
		if(b0xTPortal_ccard_mask) {} else { return; }

		b0xTPortal_ccard_mask.value = b0xTPortal_value;
		_b0xTPortal_update_old_value(b0xTPortal_value);
		_b0xTPortal_update_mask_visuals(b0xTPortal_value);
	}

	//update old value
	function _b0xTPortal_update_old_value(b0xTPortal_value) {
		var b0xTPortal_ccard_mask = b0xTPortal_data.fields["b0xTPortal_ccard_mask"];
		b0xTPortal_ccard_mask.setAttribute("manuallyUpdatedValue", b0xTPortal_value);
	}

	//update visuals only
	function _b0xTPortal_update_mask_visuals(b0xTPortal_value) {
		var b0xTPortal_ccard_mask = b0xTPortal_data.fields["b0xTPortal_ccard_mask"];
		var b0xTPortal_ccard_object = b0xTPortal_data.ccard_mask_objects[b0xTPortal_value];
		if(b0xTPortal_ccard_mask) {} else { return; }

		var b0xTPortal_ccard_valid = 0;
		if(b0xTPortal_ccard_object) {
			b0xTPortal_ccard_valid = b0xTPortal_ccard_object.Valid;
		} 

		if(b0xTPortal_ccard_valid * 1) {
			b0xTPortal_ccard_mask.style.borderColor = "#64A233";
			b0xTPortal_ccard_mask.style.backgroundColor = "#E1FFC8";
		} else {
			b0xTPortal_ccard_mask.style.borderColor = "#FF0000";
			b0xTPortal_ccard_mask.style.backgroundColor = "#FFE1E1";
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
			b0xTPortal_label_wrapper.style.width = "70px";
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
	function _b0xTPortal_create_state_rows(b0xTPortal_label, b0xTPortal_value, b0xTPortal_key, b0xTPortal_list) {
		var b0xTPortal_div_row = document.createElement("div");
		b0xTPortal_div_row.style.display = "flex";

		{
			var b0xTPortal_label_wrapper = document.createElement("div");
			b0xTPortal_label_wrapper.style.width = "70px";
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

			if(Array.isArray(b0xTPortal_list)) {
				var foundValue = 0; //make sure the value exist
				b0xTPortal_list.forEach(function(value, index) {
					var option = document.createElement("option");
					option.value = value.state_short;
					option.innerHTML = value.state_name;
					b0xTPortal_select.appendChild(option);

					if(value.state_short == b0xTPortal_value) {
						foundValue++;
					}
				});

				if(foundValue) {
					b0xTPortal_select.value = b0xTPortal_value;
				}

				b0xTPortal_select_wrapper.appendChild(b0xTPortal_select);
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