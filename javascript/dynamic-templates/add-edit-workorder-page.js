function b0xTPortal_add_edit_workorder_page_template(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b0xTPortal_init = function(b0xTPortal_extra_config) {
		var b0xTPortal_host_div = document.getElementById(b0xTPortal_data.config.hostDiv);
		var b0xTPortal_parent_div = document.getElementById(b0xTPortal_data.config.parentDiv);

		if(b0xTPortal_parent_div) {
			b0xTPortal_parent_div.style.maxWidth = "700px";
		}

		//make sure host exists
		if(b0xTPortal_host_div) {
			{
				//factory reset
				b0xTPortal_host_div.innerHTML = "";
				if(b0xTPortal_data.fields) { b0xTPortal_data.fields = undefined; };
				if(b0xTPortal_data.required_fields) { b0xTPortal_data.required_fields = undefined; };

				if(b0xTPortal_extra_config) {
					b0xTPortal_data.workorder_id = b0xTPortal_extra_config.b0xTPortal_workorder_id;
					b0xTPortal_data.workorder_jsid = b0xTPortal_extra_config.b0xTPortal_workorder_jsid;
				} else {
					b0xTPortal_data.workorder_id = "0";
					b0xTPortal_data.workorder_jsid = "0";
				}

				//make sure the element passed in is an array
				if(Array.isArray(b0xTPortal_extra_config.b0xTPortal_required_fields)) {
					b0xTPortal_data.required_fields = b0xTPortal_extra_config.b0xTPortal_required_fields;
				}
			}

			//wrapper div
			var b0xTPortal_wrapper_div = document.createElement("div");
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_add_edit_workorder_page_template");
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
							b0xTPortal_config.selected = "WORK ORDERS";
							var b0xTPortal_title = b0xTPortal_extra_config.b0xTPortal_workorder_id == "0" ? "ADD WORK ORDER" : "EDIT WORK ORDER";
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
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_jsname : "";
						var b0xTPortal_div_row = _b0xTPortal_create_rows("Job Name", b0xTPortal_value, "b0xTPortal_jobsite_name", "textbox", 1);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site address
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_jsaddress : "";
						var b0xTPortal_div_row = _b0xTPortal_create_rows("Address", b0xTPortal_value, "b0xTPortal_jobsite_address", "textbox", 1);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site city
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_jscity : "";
						var b0xTPortal_div_row = _b0xTPortal_create_rows("City", b0xTPortal_value, "b0xTPortal_jobsite_city", "textbox", 1);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//jobsite state
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_jsstate : "";
						var b0xTPortal_list  = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_list_of_state : new Array();
						b0xTPortal_div_row = _b0xTPortal_create_select_rows("State", b0xTPortal_value, "b0xTPortal_jobsite_state", b0xTPortal_list, 1, "state");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site zip
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_jszip : "";
						var b0xTPortal_div_row = _b0xTPortal_create_rows("Zip", b0xTPortal_value, "b0xTPortal_jobsite_city", "textbox", 1);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//job site containers on site
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_targetcont : "";
						var b0xTPortal_list  = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_jsonsite : new Array();
						var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Boxes on Site", b0xTPortal_value, "b0xTPortal_workorder_targetcont", b0xTPortal_list, 0, "onsite");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}				

					{
						//work order types
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_wotype : "";
						var b0xTPortal_list  = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_wotypes : new Object();
						var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Type", b0xTPortal_value, "b0xTPortal_workorder_wotype", b0xTPortal_list, 0, "wotype");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);

						//we want to keep a copy of the original wo type
						//we will use it to determine if we are going to
						//perform an availability check when saving work.
						b0xTPortal_data.original_wo_type = b0xTPortal_value;
					}

					{
						//work order container qty
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_contqty : "";
						var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Asset Qty", b0xTPortal_value, "b0xTPortal_workorder_contqty", new Array(), 0, "contqty");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);

						//we want to keep a copy of the original asset qty
						//we will use it to determine if we are going to per-
						//form an availability when saving saving work orders.
						b0xTPortal_data.original_asset_qty = b0xTPortal_value;
					}

					{
						//work order assets
						var b0xTPortal_value1 = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_contsize : "";
						var b0xTPortal_value2 = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_conttype : "";
						var b0xTPortal_value3 = b0xTPortal_value1+"-"+b0xTPortal_value2;

						var b0xTPortal_list  = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_assets : new Array();
						b0xTPortal_div_row = _b0xTPortal_create_select_rows("Asset Class", b0xTPortal_value3, "b0xTPortal_workorder_asset", b0xTPortal_list, 0, "asset");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);

						//we want to keep a copy of the original asset class
						//we will use it to determine if we are going to per-
						//form an availability when saving saving work orders.
						b0xTPortal_data.original_asset_class = b0xTPortal_value3;
					}

					{
						//work order date template
						var b0xTPortal_div_row = _b0xTPortal_create_rows("Date", "", "b0xTPortal_workorder_wodate", "date", 0);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);

						//going to make the date read only.
						b0xTPortal_data.fields["b0xTPortal_workorder_wodate"].readOnly = true;
					}

					{
						//work order material
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_material : "";
						var b0xTPortal_list  = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_materials : new Array();
						var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Material", b0xTPortal_value, "b0xTPortal_workorder_material", b0xTPortal_list, 0, "material");
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}	

					{
						//work order remarks
						var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_remarks : "";
						var b0xTPortal_div_row = _b0xTPortal_create_rows("Remarks", b0xTPortal_value, "b0xTPortal_workorder_remarks", "textarea", 0);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
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
							var b0xTPortal_user_bypass = (b0xTPortal_data.workorder_id * 1) ? 1 : 0;
							_b0xTPortal_save_wo(b0xTPortal_user_bypass, b0xTPortal_extra_config);
						}

						if(b0xTPortal_data.workorder_id == "0" && b0xTPortal_data.workorder_jsid == "0") {
							b0xTPortal_button.disabled = true;
							b0xTPortal_button.style.width = "auto";
							b0xTPortal_button.style.backgroundColor = "#fd3d00";
							b0xTPortal_button.value = "Error: can't save.. Please try again."
						}

						b0xTPortal_div_row.appendChild(b0xTPortal_button);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);

						b0xTPortal_data.fields["b0xTPortal_workorder_save_button"] = b0xTPortal_button;
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);	
				}

				{
					//build availability
					var b0xTPortal_buffer = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_availability_buffer : 0;
					var b0xTPortal_list   = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_availability : new Array();
					var b0xTPortal_div_availability = _b0xTPortal_build_availability(b0xTPortal_buffer, b0xTPortal_list);
					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_availability);
				}

				//finalize structure
				b0xTPortal_wrapper_div.appendChild(b0xTPortal_limiter_div);
			}

			b0xTPortal_host_div.appendChild(b0xTPortal_wrapper_div);

			//set up the date picker
			if(typeof(b0xTPortal_data.config.datePicker) === "function") {
				var b0xTPortal_date = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_wodate : "";
				var b0xTPortal_min_date = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_early_book_date : "";
				var b0xTPortal_max_date = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_workorder_late_book_date : "";
				b0xTPortal_data.config.datePicker("b0xTPortal_workorder_wodate", b0xTPortal_date, b0xTPortal_min_date, b0xTPortal_max_date);
				_b0xTPortal_observer("b0xTPortal_workorder_wodate");
			}

			//set up the user confirm dialog
			var config = new Object();
			config.container = document.getElementById("b0xTPortal_dialog_box");
			config.overlay   = document.getElementById("b0xTPortal_ajax_shield2");

			config.behaviors = function(b0xTPortal_content, b0xTPortal_nextF) {
				var b0xTPortal_user_confirm_div = document.createElement("div");

				b0xTPortal_data.b0xTPortal_wo_flags = document.createElement("div");

				b0xTPortal_user_confirm_div.appendChild(b0xTPortal_data.b0xTPortal_wo_flags);

				var b0xTPortal_div = document.createElement("div");
				b0xTPortal_div.style.display = "inline-block";
				b0xTPortal_div.style.width = "100%";
				b0xTPortal_div.style.marginTop = "5px";
				b0xTPortal_div.style.marginBottom = "5px";

				var b0xTPortal_div_button = document.createElement("input");
				b0xTPortal_div_button.setAttribute("type", "button");
				b0xTPortal_div_button.style.cssFloat = "right";
				b0xTPortal_div_button.style.width = "100px";

				b0xTPortal_div_button.value = "Ok";

				b0xTPortal_div_button.onclick = function() {
					var b0xTPortal_user_bypass = 1;
					_b0xTPortal_save_wo(b0xTPortal_user_bypass, b0xTPortal_extra_config);
					b0xTPortal_data.b0xTPortal_user_confirm.b0xTPortal_close();
				}

				b0xTPortal_div.appendChild(b0xTPortal_div_button);
				b0xTPortal_user_confirm_div.appendChild(b0xTPortal_div);
				b0xTPortal_content.appendChild(b0xTPortal_user_confirm_div);

				b0xTPortal_nextF();
			}

			b0xTPortal_data.b0xTPortal_user_confirm = new b0xTPortal_slide_up_dialog(config);
		}
	}

	function _b0xTPortal_save_wo(b0xTPortal_user_bypass, b0xTPortal_extra_config) {
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

		//check availability
		if(typeof(b0xTPortal_extra_config) === "object" && _b0xTPortal_availability_check(
				b0xTPortal_extra_config.b0xTPortal_availability_buffer,
				b0xTPortal_extra_config.b0xTPortal_availability,
				b0xTPortal_data.fields["b0xTPortal_workorder_contqty"].value,
				b0xTPortal_data.fields["b0xTPortal_workorder_asset"].value, 
				b0xTPortal_data.fields["b0xTPortal_workorder_wodate"].value,
				b0xTPortal_data.fields["b0xTPortal_workorder_wotype"].value
		)) {
			if(b0xTPortal_failure_flag) {
				var b0xTPortal_message = document.createElement("p");
				b0xTPortal_message.setAttribute("class", "b0xTPortal-error-msg");
				b0xTPortal_message.innerHTML = "Not enough assets available, please check availability table for reference.";
				b0xTPortal_failure_flag.appendChild(b0xTPortal_message);
			}
			return;
		}

		if(typeof(b0xTPortal_data.config.saveWorkOrderNextF) === "function") {
			var object = new Object();
			object.workorder_id = b0xTPortal_data.workorder_id;
			object.workorder_jsid = b0xTPortal_data.workorder_jsid;
			object.workorder_targetcont = b0xTPortal_data.fields["b0xTPortal_workorder_targetcont"].value;
			object.workorder_wotype = b0xTPortal_data.fields["b0xTPortal_workorder_wotype"].value;
			object.workorder_contqty = b0xTPortal_data.fields["b0xTPortal_workorder_contqty"].value;
			object.workorder_asset = b0xTPortal_data.fields["b0xTPortal_workorder_asset"].value;
			object.workorder_wodate = b0xTPortal_data.fields["b0xTPortal_workorder_wodate"].value;
			object.workorder_remarks = b0xTPortal_data.fields["b0xTPortal_workorder_remarks"].value;
			object.workorder_material = b0xTPortal_data.fields["b0xTPortal_workorder_material"].value;
			object.workorder_user_bypass = b0xTPortal_user_bypass;
			object.required_fields = b0xTPortal_data.required_fields;
			b0xTPortal_data.config.saveWorkOrderNextF(object);
		}
	}

	function _b0xTPortal_observer(b0xTPortal_element) {
		var b0xTPortal_resize_observer = new ResizeObserver(() => {
			var b0xTPortal_dom_element = document.getElementById(b0xTPortal_element);
			var b0xTPortal_date_picker = document.getElementById("ui-datepicker-div");
	
			if(b0xTPortal_dom_element && b0xTPortal_date_picker) {} else { 
				b0xTPortal_resize_observer.disconnect();
				return; //skip evaluations 
			}

			if(b0xTPortal_date_picker.getAttribute("b0xTPortal_clicked_element") == b0xTPortal_element) {
				b0xTPortal_date_picker.style.minWidth = b0xTPortal_dom_element.offsetWidth+"px";

				if(typeof(b0xTPortal_data.config.setPosition) === "function") {
					b0xTPortal_data.config.setPosition(b0xTPortal_element, "ui-datepicker-div");
				}
			}
		});

		var b0xTPortal_dom_element = document.getElementById(b0xTPortal_element);
		b0xTPortal_resize_observer.observe(b0xTPortal_dom_element);
	}

	function _b0xTPortal_availability_check(b0xTPortal_availability_buffer, b0xTPortal_availability, b0xTPortal_asset_qty, b0xTPortal_asset, b0xTPortal_date, b0xTPortal_wotype) {
		var b0xTPortal_array_headers = b0xTPortal_availability.b0xTPortal_availability_headers;
		var b0xTPortal_array_content = b0xTPortal_availability.b0xTPortal_availability_rows;		

		var skipWoTypeCheck = function() {
			if(b0xTPortal_wotype == "Delivery") {
				if(b0xTPortal_data.original_wo_type == b0xTPortal_wotype) {
					//we are going to ignore the cases when comparing assets, this will all-
					//ow us to keep the comparing consistant with the way we do box tracker.
					if(b0xTPortal_data.original_asset_class.toUpperCase() != b0xTPortal_asset.toUpperCase()) {
						return 0;
					}				
					if(b0xTPortal_data.original_asset_qty != b0xTPortal_asset_qty) {
						return 0;
					}
					return 1;
				}
				return 0; //do wo type check
			}
			return 1; //skip wo type check
		}

		if(skipWoTypeCheck()) { return 0; }

		var b0xTPortal_asset_index = undefined;
		b0xTPortal_array_headers.forEach(function(value, index) {
			if(value.toUpperCase() == b0xTPortal_asset.toUpperCase()) { 
				b0xTPortal_asset_index = index; 
			}
		});

		if(b0xTPortal_asset_index == undefined) { return 1; }

		var b0xTPortal_available_assets = 0;
		b0xTPortal_array_content.forEach(function(value, index) {
			if((b0xTPortal_date == value[0])) {
				b0xTPortal_available_assets = value[b0xTPortal_asset_index];
			}		
		});

		//make some calculations
		var b0xTPortal_temp_orginal_asset_qty = b0xTPortal_data.original_asset_qty ? b0xTPortal_data.original_asset_qty : 0;
		var b0xTPortal_temp_available_assets  = (b0xTPortal_available_assets * 1) + (b0xTPortal_temp_orginal_asset_qty * 1); 		
		var b0xTPortal_assets_after_delivery  = b0xTPortal_temp_available_assets - (b0xTPortal_asset_qty * 1);

		if(b0xTPortal_assets_after_delivery <= b0xTPortal_availability_buffer * 1) { return 1; }
		return 0;
	}

	//availability
	function _b0xTPortal_build_availability(b0xTPortal_buffer, b0xTPortal_list) {
		var b0xTPortal_div_row = document.createElement("div");

		b0xTPortal_div_row.style.marginTop = "35px";
		b0xTPortal_div_row.style.overflowX = "auto";
		b0xTPortal_div_row.style.width = "100%";

		var b0xTPortal_tb = document.createElement("table");

		b0xTPortal_tb.style.margin = "0px";
		b0xTPortal_tb.style.width = "100%";

		{
			var b0xTPortal_tr = document.createElement("tr");

			b0xTPortal_tr.style.border = "0px";
			b0xTPortal_tr.style.borderBottom = "1px solid #c2c2c2";

			var b0xTPortal_header_list = b0xTPortal_list.b0xTPortal_availability_headers;
			b0xTPortal_header_list.forEach(function(value, index) {
				var b0xTPortal_th = document.createElement("th");

				b0xTPortal_th.style.border = "0px";
				b0xTPortal_th.style.backgroundColor = "#767676";
				b0xTPortal_th.style.color = "#ffffff";
				b0xTPortal_th.style.whiteSpace = "nowrap";

				if(index == 0) {
					b0xTPortal_th.style.textAlign = "left";
				} else {
					b0xTPortal_th.style.textAlign = "center";
				}

				b0xTPortal_th.innerHTML = value;

				b0xTPortal_tr.appendChild(b0xTPortal_th);
			});

			b0xTPortal_tb.appendChild(b0xTPortal_tr);
			
		}

		{
			var b0xTPortal_content_list = b0xTPortal_list.b0xTPortal_availability_rows;
			b0xTPortal_content_list.forEach(function(value, index) {
				var b0xTPortal_tr = document.createElement("tr");

				b0xTPortal_tr.style.border = "0px";
				b0xTPortal_tr.style.borderBottom = "1px solid #c2c2c2";

				value.forEach(function(inner_value, inner_index) {
					var b0xTPortal_td = document.createElement("td");

					b0xTPortal_td.style.border = "0px";
					b0xTPortal_td.style.whiteSpace = "nowrap";

					if(inner_index == 0) {
						b0xTPortal_td.innerHTML = inner_value;
						b0xTPortal_td.style.textAlign = "left";
					} else {
						b0xTPortal_td.style.textAlign = "center";

						if(inner_value * 1 > b0xTPortal_buffer * 1) {
							var b0xTPortal_tick_image = document.createElement("img");
							b0xTPortal_tick_image.setAttribute("src", b0xTPortal_data.config.image_url+"tick.png");

							b0xTPortal_tick_image.style.display = "unset";

							b0xTPortal_td.appendChild(b0xTPortal_tick_image);
						} else {
							b0xTPortal_td.style.color = "#ff0000";
							b0xTPortal_td.style.fontWeight = "bolder";
							b0xTPortal_td.innerHTML = "X";
						}
					}

					b0xTPortal_tr.appendChild(b0xTPortal_td);
				});

				b0xTPortal_tb.appendChild(b0xTPortal_tr);
			});
		}

		b0xTPortal_div_row.appendChild(b0xTPortal_tb);

		return b0xTPortal_div_row;
	}


	//create rows
	function _b0xTPortal_create_rows(b0xTPortal_label, b0xTPortal_value, b0xTPortal_key, b0xTPortal_type, b0xTPortal_disabled) {
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

			if(b0xTPortal_type == "textarea") {
				b0xTPortal_input = document.createElement("textarea");
			} else {
				b0xTPortal_input.setAttribute("type", b0xTPortal_type);
			}

			if(b0xTPortal_disabled) { 
				b0xTPortal_input.disabled = true;
				b0xTPortal_input.style.background = "#f5f5f5";
			}

			if(b0xTPortal_type == "date") {
				b0xTPortal_input.setAttribute("type", "text");
				b0xTPortal_input.setAttribute("id", b0xTPortal_key);
			} else if(b0xTPortal_type == "checkbox") {
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
					case "onsite":
						b0xTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.ID;
							option.innerHTML = value.ContainerID;
							b0xTPortal_select.appendChild(option);

							if(value.ID == b0xTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "wotype":
						var b0xTPortal_append_types = function(key) {
							var option = document.createElement("option");

							option.value = key;
							option.innerHTML = b0xTPortal_list[key];
							b0xTPortal_select.appendChild(option);

							if(key == b0xTPortal_value) {
								foundValue++;
							}
						}

						//append in a specific order
						b0xTPortal_append_types("Delivery");
						b0xTPortal_append_types("Switch");
						b0xTPortal_append_types("SOS");
						b0xTPortal_append_types("Out");
						b0xTPortal_append_types("Live");
						b0xTPortal_append_types("Service");
						b0xTPortal_append_types("Move");
						break;
					case "asset":
						b0xTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value;
							option.innerHTML = value;
							b0xTPortal_select.appendChild(option);

							//because of the way box tracker does the assets we have
							//make sure that when we make the check we normalize the 
							//value in this case making them uppercase. this will all-
							//ow us to match assets regardless of the case. For this 
							//reason, we are going to change the way we select values 
							//when doing asset classes.
							if(value.toUpperCase() == b0xTPortal_value.toUpperCase()) {
								b0xTPortal_select.value = value;
							}
						});
						break;
					case "contqty":
						//just a number range 1..30
						for (var b0xTPortal_index = 1; b0xTPortal_index < 31; b0xTPortal_index++) {
							var option = document.createElement("option");
							option.value = b0xTPortal_index;
							option.innerHTML = b0xTPortal_index;
							b0xTPortal_select.appendChild(option);

							if(b0xTPortal_index == b0xTPortal_value) {
								foundValue++;
							}
						}
						break;
					case "material":
						b0xTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.ID;
							option.innerHTML = value.Material;
							b0xTPortal_select.appendChild(option);

							if(value.ID == b0xTPortal_value) {
								foundValue++;
							}
						});
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

	//user confirmation
	this.b0xTPortal_user_confirmation = function(b0xTPortal_response_data) {
		var b0xTPortal_nextF = function() {
			//the is no async calls in the b0xTPortal_open
			b0xTPortal_response_data.similarWOs.forEach(function(b0xTPortal_value, b0xTPortal_index) {
				var b0xTPortal_div = document.createElement("div");
				b0xTPortal_div.style.paddingLeft = "5px";
				b0xTPortal_div.style.color = "#ff0000";
				b0xTPortal_div.innerHTML = b0xTPortal_value;
				b0xTPortal_data.b0xTPortal_wo_flags.appendChild(b0xTPortal_div);
			});			
		}

		b0xTPortal_data.b0xTPortal_user_confirm.b0xTPortal_open("Warning!!", b0xTPortal_nextF);
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