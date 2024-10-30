function b0xTPortal_reports_page_template(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b0xTPortal_init = function(b0xTPortal_extra_config) {
		var b0xTPortal_host_div = document.getElementById(b0xTPortal_data.config.hostDiv);
		var b0xTPortal_parent_div = document.getElementById(b0xTPortal_data.config.parentDiv);

		if(b0xTPortal_parent_div) {
			b0xTPortal_parent_div.style.maxWidth = "641px";
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
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_reports_page_template");
			b0xTPortal_wrapper_div.setAttribute("class", "b0xTPortal_backend_template");

			{
				//limiter div
				var b0xTPortal_limiter_div = document.createElement("div");
				b0xTPortal_data.fields = {}; //place holder for the fields
				b0xTPortal_data.reports = {}; //place holder for reports

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
							b0xTPortal_config.selected = "REPORTS";
							b0xTPortal_config.customerName = '<strong style="font-size: x-large;"">REPORTS</strong>';
							b0xTPortal_data.config.header.b0xTPortal_build_header(b0xTPortal_config);
						} 
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_header_div);
				}

				//lets group reports in to category
				b0xTPortal_data.reports["CategoryList"] = [];
				b0xTPortal_extra_config.b0xTPortal_reports_object_list.forEach(function(value, index){
					var b0xTPortal_category = value.Category;

					if(b0xTPortal_data.reports[b0xTPortal_category]) {} else {
						b0xTPortal_data.reports[b0xTPortal_category] = [];
						b0xTPortal_data.reports["CategoryList"].push(b0xTPortal_category);
					}

					b0xTPortal_data.reports[b0xTPortal_category].push(value);
				});

				{
					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.gap = "10px";
					b0xTPortal_div_table.style.height = "500px";
					b0xTPortal_div_table.style.overflowY = "auto";

					b0xTPortal_data.reports["CategoryList"].forEach(function(value, index) {
						var b0xTPortal_title_div = document.createElement("div");

						b0xTPortal_title_div.style.fontSize = "larger";
						b0xTPortal_title_div.style.fontWeight = "bold";
						b0xTPortal_title_div.style.color = "#ffffff";
						b0xTPortal_title_div.style.backgroundColor = "#1782b5";
						b0xTPortal_title_div.style.padding = "5px";

						b0xTPortal_title_div.innerHTML = value;
						b0xTPortal_div_table.appendChild(b0xTPortal_title_div);

						//content
						var b0xTPortal_category_ol = document.createElement("ol");

						b0xTPortal_category_ol.style.listStyle = "none";
						b0xTPortal_category_ol.style.margin = "0px";
						b0xTPortal_category_ol.style.columnCount = "2";
						b0xTPortal_category_ol.style.color = "#1782b5";

						b0xTPortal_data.reports[value].forEach(function(sub_value, sub_index) {
							b0xTPortal_category_li = document.createElement("li");

							b0xTPortal_category_li.setAttribute("id", "b0xTPortal_reports_id_"+sub_value.ID);

							b0xTPortal_category_li.style.margin = "0px";
							b0xTPortal_category_li.style.cursor = "pointer";

							b0xTPortal_category_li.innerHTML = sub_value.Name;

							b0xTPortal_category_li.onmouseover = function() {
								this.style.color = "#115d81";
							}

							b0xTPortal_category_li.onmouseout = function() {
								this.style.color = "#1782b5";
							}

							b0xTPortal_category_li.onclick = function() {
								var b0xTPortal_report_id = this.id.split("_")[3];
								if(typeof(b0xTPortal_data.config.reportsNextF) === "function") {
									b0xTPortal_data.config.reportsNextF(b0xTPortal_report_id);
								}
							}

							b0xTPortal_category_ol.appendChild(b0xTPortal_category_li);
						});

						b0xTPortal_div_table.appendChild(b0xTPortal_category_ol);
						
					});

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);
				}

				//finalize structure
				b0xTPortal_wrapper_div.appendChild(b0xTPortal_limiter_div);
			}

			b0xTPortal_host_div.appendChild(b0xTPortal_wrapper_div);
		}
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