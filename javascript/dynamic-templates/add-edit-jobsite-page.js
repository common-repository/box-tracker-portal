function b0xTPortal_add_edit_jobsite_page_template(b0xTPortal_arg_config) {
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

				if(b0xTPortal_extra_config) {
					b0xTPortal_data.jobsite_id = b0xTPortal_extra_config.b0xTPortal_jobsite_id;
				} else {
					b0xTPortal_data.jobsite_id = "0";
				}

				//make sure the element passed in is an array
				if(Array.isArray(b0xTPortal_extra_config.b0xTPortal_required_fields)) {
					b0xTPortal_data.required_fields = b0xTPortal_extra_config.b0xTPortal_required_fields;
				}
			}

			//wrapper div
			var b0xTPortal_wrapper_div = document.createElement("div");
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_add_edit_jobsite_page_template");
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
							b0xTPortal_config.selected = "JOB SITES";
							var b0xTPortal_title = b0xTPortal_extra_config.b0xTPortal_jobsite_id == 0 ? "ADD JOB SITE" : "EDIT JOB SITE";
							b0xTPortal_config.customerName = '<strong style="font-size: x-large;">'+b0xTPortal_title+'</strong>';
							b0xTPortal_data.config.header.b0xTPortal_build_header(b0xTPortal_config);
						} 
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_header_div);
				}

				{
					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.gap = "2px";

					{
						//job site name
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_name : "";
						var b0xTPortal_div_row = _b0xTPortal_create_rows("Job Name", b0xTPortal_value, "b0xTPortal_jobsite_name", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site address
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_address : "";
						var b0xTPortal_div_row = _b0xTPortal_create_rows("Address", b0xTPortal_value, "b0xTPortal_jobsite_address", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						var b0xTPortal_div_row = document.createElement("div");
						b0xTPortal_div_row.style.display = "flex";

						{
							var b0xTPortal_google_div_wrapper = document.createElement("div");
							
							b0xTPortal_google_div_wrapper.style.width = "100px";
							b0xTPortal_google_div_wrapper.style.marginTop = "10px";
							b0xTPortal_google_div_wrapper.style.marginBottom = "10px";
							b0xTPortal_google_div_wrapper.style.marginRight = "10px";
							b0xTPortal_google_div_wrapper.style.flexShrink = "0";

							b0xTPortal_div_row.appendChild(b0xTPortal_google_div_wrapper);
						}

						{
							var b0xTPortal_google_div_wrapper = document.createElement("div");

							b0xTPortal_google_div_wrapper.style.display = "flex";
							b0xTPortal_google_div_wrapper.style.width = "100%";

							{
								var b0xTPortal_div_row_div = document.createElement("div");

								b0xTPortal_div_row_div.style.fontWeight = "600";
								b0xTPortal_div_row_div.style.fontStyle = "italic";
								b0xTPortal_div_row_div.style.fontSize = "small";

								b0xTPortal_div_row_div.innerHTML = "GOOGLE STATUS:&nbsp;";
								b0xTPortal_google_div_wrapper.appendChild(b0xTPortal_div_row_div);	
							}

							{
								var b0xTPortal_div_row_div = document.createElement("div");	

								b0xTPortal_div_row_div.style.fontWeight = "600";
								b0xTPortal_div_row_div.style.fontStyle = "italic";
								b0xTPortal_div_row_div.style.fontSize = "small";

								b0xTPortal_google_div_wrapper.appendChild(b0xTPortal_div_row_div);
								b0xTPortal_data.fields["b0xTPortal_google_validator"] = b0xTPortal_div_row_div;
							}

							b0xTPortal_div_row.appendChild(b0xTPortal_google_div_wrapper);
						}

						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site city
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_city : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("City", b0xTPortal_value, "b0xTPortal_jobsite_city", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//jobsite state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_state : "";
						var b0xTPortal_list  = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_list_of_state : new Array();
						b0xTPortal_div_row = _b0xTPortal_create_state_rows("State", b0xTPortal_value, "b0xTPortal_jobsite_state", b0xTPortal_list);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site zip
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_zip : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Zip", b0xTPortal_value, "b0xTPortal_jobsite_zip", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site county
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_county : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("County", b0xTPortal_value, "b0xTPortal_jobsite_county", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site muni
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_muni : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Muni", b0xTPortal_value, "b0xTPortal_jobsite_muni", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site cross street
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_cross_street : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Cross Street", b0xTPortal_value, "b0xTPortal_jobsite_cross_street", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site po
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_po : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("PO #", b0xTPortal_value, "b0xTPortal_jobsite_po", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site contact
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_contact : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Contact", b0xTPortal_value, "b0xTPortal_jobsite_contact", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site contact cell
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_contact_cell : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Contact Cell", b0xTPortal_value, "b0xTPortal_jobsite_contact_cell", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site hazzards
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_hazzards : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Hazards", b0xTPortal_value, "b0xTPortal_jobsite_hazzards", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site billing note
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_billing_note : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("Billing Note", b0xTPortal_value, "b0xTPortal_jobsite_billing_note", "textbox");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site leed
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_leed : "";
						b0xTPortal_div_row = _b0xTPortal_create_rows("LEED", b0xTPortal_value, "b0xTPortal_jobsite_leed", "checkbox");

						var b0xTPortal_leed_wrapper = document.createElement("div");
						b0xTPortal_leed_wrapper.style.display = "flex";

						var b0xTPortal_leed_wl = document.createElement("div");
						b0xTPortal_leed_wl.style.width = "100px";
						b0xTPortal_leed_wl.style.marginRight = "10px";

						b0xTPortal_leed_wrapper.appendChild(b0xTPortal_leed_wl);
						b0xTPortal_leed_wrapper.appendChild(b0xTPortal_div_row);

						b0xTPortal_div_table.appendChild(b0xTPortal_leed_wrapper);
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
							var b0xTPortal_failure_flag = document.getElementById(b0xTPortal_data.config.failFlag);
							if(b0xTPortal_failure_flag) { b0xTPortal_failure_flag.innerHTML = ""; }

							if(b0xTPortal_data.b0xTPortal_validate_fields(b0xTPortal_data.required_fields)) {
								var b0xTPortal_message = document.createElement("p");
								b0xTPortal_message.setAttribute("class", "b0xTPortal-error-msg");
								b0xTPortal_message.innerHTML = "Please fill the highlighted fields.";
								b0xTPortal_failure_flag.appendChild(b0xTPortal_message);
								return; 
							}

							//save job site
							if(typeof(b0xTPortal_data.config.saveJobSiteNextF) === "function") {
								var object = new Object();
								object.jobsite_id = b0xTPortal_data.jobsite_id;
								object.jobsite_name = b0xTPortal_data.fields["b0xTPortal_jobsite_name"].value;
								object.jobsite_address = b0xTPortal_data.fields["b0xTPortal_jobsite_address"].value;
								object.jobsite_city = b0xTPortal_data.fields["b0xTPortal_jobsite_city"].value;
								object.jobsite_state = b0xTPortal_data.fields["b0xTPortal_jobsite_state"].value;
								object.jobsite_zip = b0xTPortal_data.fields["b0xTPortal_jobsite_zip"].value;
								object.jobsite_county = b0xTPortal_data.fields["b0xTPortal_jobsite_county"].value;
								object.jobsite_muni = b0xTPortal_data.fields["b0xTPortal_jobsite_muni"].value;
								object.jobsite_cross_street = b0xTPortal_data.fields["b0xTPortal_jobsite_cross_street"].value;
								object.jobsite_po = b0xTPortal_data.fields["b0xTPortal_jobsite_po"].value;
								object.jobsite_contact = b0xTPortal_data.fields["b0xTPortal_jobsite_contact"].value;
								object.jobsite_contact_cell = b0xTPortal_data.fields["b0xTPortal_jobsite_contact_cell"].value;
								object.jobsite_hazzards = b0xTPortal_data.fields["b0xTPortal_jobsite_hazzards"].value;
								object.jobsite_billing_note = b0xTPortal_data.fields["b0xTPortal_jobsite_billing_note"].value;
								object.jobsite_leed = b0xTPortal_data.fields["b0xTPortal_jobsite_leed"].checked ? 1 : 0;
								object.jobsite_validated = b0xTPortal_data.b0xTPortal_job_address_vldtr.validated;
								object.required_fields = b0xTPortal_data.required_fields;
								b0xTPortal_data.config.saveJobSiteNextF(object);
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


			if(typeof(b0xTPortal_cls_address_vldtr) == 'function') {
				var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_jobsite_validated : "0";

	            b0xTPortal_data.b0xTPortal_job_address_vldtr = new b0xTPortal_cls_address_vldtr({
	            	"status": b0xTPortal_value,
	                "searchCtrl" : b0xTPortal_data.fields["b0xTPortal_jobsite_address"],
	                "addressCtrl" : b0xTPortal_data.fields["b0xTPortal_jobsite_address"],
	                "cityCtrl" : b0xTPortal_data.fields["b0xTPortal_jobsite_city"],
	                "stateCtrl" : b0xTPortal_data.fields["b0xTPortal_jobsite_state"],
	                "postalCtrl" : b0xTPortal_data.fields["b0xTPortal_jobsite_zip"],
	                "validateCtrl" : b0xTPortal_data.fields["b0xTPortal_google_validator"]
	            });
      		} 
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
	function _b0xTPortal_create_state_rows(b0xTPortal_label, b0xTPortal_value, b0xTPortal_key, b0xTPortal_list) {
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