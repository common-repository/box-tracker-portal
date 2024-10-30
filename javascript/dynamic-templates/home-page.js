function b0xTPortal_home_page_template(b0xTPortal_arg_config) {
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
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_home_page_template");
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
							b0xTPortal_config.selected = "HOME";

							var b0xTPortal_name = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_name : "";
							b0xTPortal_config.customerName = "<strong>WELCOME:</strong> <br> "+b0xTPortal_name;
							b0xTPortal_data.config.header.b0xTPortal_build_header(b0xTPortal_config);
						} 
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_header_div);
				}

				{
					//balance display
					var b0xTPortal_balance_wrapper = document.createElement("div");

					b0xTPortal_balance_wrapper.style.display = "flex";
					b0xTPortal_balance_wrapper.style.marginTop = "5px";
					b0xTPortal_balance_wrapper.style.marginBottom = "40px";

					var b0xTPortal_balance = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_balance : "0";
					b0xTPortal_balance_wrapper.innerHTML = "<strong>BALANCE:</strong>&nbsp;&nbsp;"+_b0xTPortal_format_for_currency((b0xTPortal_balance*1).toFixed(2), 0);

					b0xTPortal_limiter_div.appendChild(b0xTPortal_balance_wrapper);
				}

				{
					//home page tiles
					var b0xTPortal_tile_wrapper = document.createElement("div");

					b0xTPortal_tile_wrapper.style.display = "flex";
					b0xTPortal_tile_wrapper.style.gap = "10px";
					b0xTPortal_tile_wrapper.style.flexWrap = "wrap";

					{
						//tile
						var b0xTPortal_tile = document.createElement("div");

						b0xTPortal_tile.style.cursor = "pointer";

						var b0xTPortal_tile_div = _b0xTPortal_create_tile("PROFILE", "profile.png");

						if(typeof(b0xTPortal_data.config.profileNextF) === "function") {
							b0xTPortal_tile.onclick = function() {
								b0xTPortal_data.config.profileNextF();
							}
						}

						b0xTPortal_tile.appendChild(b0xTPortal_tile_div);
						b0xTPortal_tile_wrapper.appendChild(b0xTPortal_tile);
					}


					{
						//tile
						var b0xTPortal_tile = document.createElement("div");

						b0xTPortal_tile.style.cursor = "pointer";

						var b0xTPortal_tile_div = _b0xTPortal_create_tile("JOB SITES", "jobsite.png");

						if(typeof(b0xTPortal_data.config.jobsiteNextF) === "function") {
							b0xTPortal_tile.onclick = function() {
								b0xTPortal_data.config.jobsiteNextF();
							}
						}

						b0xTPortal_tile.appendChild(b0xTPortal_tile_div);
						b0xTPortal_tile_wrapper.appendChild(b0xTPortal_tile);
					}

					{
						//tile
						var b0xTPortal_tile = document.createElement("div");

						b0xTPortal_tile.style.cursor = "pointer";

						var b0xTPortal_tile_div = _b0xTPortal_create_tile("WORK ORDERS", "workOrders.png");

						if(typeof(b0xTPortal_data.config.workOrderNextF) === "function") {
							b0xTPortal_tile.onclick = function() {
								b0xTPortal_data.config.workOrderNextF();
							}
						}

						b0xTPortal_tile.appendChild(b0xTPortal_tile_div);
						b0xTPortal_tile_wrapper.appendChild(b0xTPortal_tile);
					}

					{
						//tile
						var b0xTPortal_tile = document.createElement("div");

						b0xTPortal_tile.style.cursor = "pointer";

						var b0xTPortal_tile_div = _b0xTPortal_create_tile("FINANCIALS", "transactions.jpg");

						if(typeof(b0xTPortal_data.config.transactionsNextF) === "function") {
							b0xTPortal_tile.onclick = function() {
								b0xTPortal_data.config.transactionsNextF();
							}
						}

						b0xTPortal_tile.appendChild(b0xTPortal_tile_div);
						b0xTPortal_tile_wrapper.appendChild(b0xTPortal_tile);
					}

					{
						//tile
						var b0xTPortal_tile = document.createElement("div");

						b0xTPortal_tile.style.cursor = "pointer";

						var b0xTPortal_tile_div = _b0xTPortal_create_tile("REPORTS", "reports.png");

						if(typeof(b0xTPortal_data.config.reportsNextF) === "function") {
							b0xTPortal_tile.onclick = function() {
								b0xTPortal_data.config.reportsNextF();
							}
						}

						b0xTPortal_tile.appendChild(b0xTPortal_tile_div);
						b0xTPortal_tile_wrapper.appendChild(b0xTPortal_tile);
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_tile_wrapper);
				}

				//finalize structure
				b0xTPortal_wrapper_div.appendChild(b0xTPortal_limiter_div);
			}

			b0xTPortal_host_div.appendChild(b0xTPortal_wrapper_div);
		}
	}

	function _b0xTPortal_format_for_currency(b0xTPortal_number, b0xTPortal_rms) {
		var b0xTPortal_value = (b0xTPortal_number*1).toLocaleString("en-US", {style:"currency", currency:"USD"});
		var b0xTPortal_value_formatted = b0xTPortal_rms ? String(b0xTPortal_value).replace("$", '') : String(b0xTPortal_value).replace("$", '$ ');
		return b0xTPortal_value_formatted;
	}

	//create tiles
	function _b0xTPortal_create_tile(b0xTPortal_name, b0xTPortal_icon) {
		var b0xTPortal_tile_parent = document.createElement("div");

		b0xTPortal_tile_parent.style.width = "140px";
		b0xTPortal_tile_parent.style.padding = "5px";
		b0xTPortal_tile_parent.style.boxShadow = "0 0 5px 0 rgb(8 8 8 / 50%)";
		b0xTPortal_tile_parent.style.borderRadius = "5px";

		{
			//image
			var b0xTPortal_tile_Image = document.createElement("img");

			b0xTPortal_tile_Image.style.display = "block";
			b0xTPortal_tile_Image.style.margin = "auto";
			b0xTPortal_tile_Image.style.width = "auto";
			b0xTPortal_tile_Image.style.height = "80px";

			b0xTPortal_tile_Image.setAttribute("src", b0xTPortal_data.config.image_url+b0xTPortal_icon);
			b0xTPortal_tile_parent.appendChild(b0xTPortal_tile_Image);
		}
		
		{
			//text
			var b0xTPortal_tile_div = document.createElement("div");

			b0xTPortal_tile_div.setAttribute("class", "b0xTPortal_no_user_select");

			b0xTPortal_tile_div.style.paddingTop = "5px";
			b0xTPortal_tile_div.style.borderTop = "1px solid #000000";
			b0xTPortal_tile_div.style.textAlign = "center";

			b0xTPortal_tile_div.innerHTML = "<strong>"+b0xTPortal_name+"</strong>";
			b0xTPortal_tile_parent.appendChild(b0xTPortal_tile_div);
		}

		return b0xTPortal_tile_parent;
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