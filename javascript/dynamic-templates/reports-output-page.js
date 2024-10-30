function b0xTPortal_reports_output_page_template(b0xTPortal_arg_config) {
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

				if(b0xTPortal_extra_config) {
					b0xTPortal_data.report_id = b0xTPortal_extra_config.b0xTPortal_report_params.ID;
				} else {
					b0xTPortal_data.report_id = "0";
				}

				//make sure the element passed in is an array
				if(Array.isArray(b0xTPortal_extra_config.b0xTPortal_required_fields)) {
					b0xTPortal_data.required_fields = b0xTPortal_extra_config.b0xTPortal_required_fields;
				}
			}

			//wrapper div
			var b0xTPortal_wrapper_div = document.createElement("div");
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_reports_output_page_template");
			b0xTPortal_wrapper_div.setAttribute("class", "b0xTPortal_backend_template");

			{
				//limiter div
				var b0xTPortal_limiter_div = document.createElement("div");
				b0xTPortal_data.fields = {}; //place holder for the fields
				b0xTPortal_data.check_boxes = [];

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
							b0xTPortal_config.customerName = '<strong style="font-size: x-large;">REPORTS</strong>';
							b0xTPortal_data.config.header.b0xTPortal_build_header(b0xTPortal_config);
						} 
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_header_div);
				}

				{
					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.marginBottom = "15px";

					{
						var b0xTPortal_div_row = document.createElement("div");
						var b0xTPortal_report_name = b0xTPortal_extra_config.b0xTPortal_report_params.Name;
						var b0xTPortal_report_description = b0xTPortal_extra_config.b0xTPortal_report_params.RptDesc;
						b0xTPortal_div_row.innerHTML = '<strong>'+b0xTPortal_report_name+' - </strong>'+b0xTPortal_report_description;
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);
				}

				{
					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.gap = "2px";
					
					b0xTPortal_extra_config.b0xTPortal_report_params.Params.forEach(function(value, index) {
						var b0xTPortal_div_row = _b0xTPortal_get_params(value);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					});

					{
						var b0xTPortal_div_row = document.createElement("div");
						b0xTPortal_div_row.style.justifyContent = "end";
						b0xTPortal_div_row.style.marginTop = "20px";
						b0xTPortal_div_row.style.display = "flex";
						b0xTPortal_div_row.style.gap = "10px";

						{
							var b0xTPortal_button = document.createElement("input");
							b0xTPortal_button.setAttribute("type", "button");

							b0xTPortal_button.style.width = "125px";

							b0xTPortal_button.value = "Get Report";

							b0xTPortal_button.onclick = function() {
								var b0xTPortal_a = b0xTPortal_data.fields["b0xTPortal_report_download_a"];

								if(b0xTPortal_a) {
									b0xTPortal_a.removeAttribute("href");
									b0xTPortal_a.removeAttribute("download");
									b0xTPortal_a.firstChild.style.backgroundColor = "#c5c5c5";
									b0xTPortal_a.firstChild.style.cursor = "default";
								}

								if(typeof(b0xTPortal_data.config.getReportNextF) === "function") {
									var object = new Object();
									object.report_id = b0xTPortal_data.report_id;

									if(b0xTPortal_data.fields["b0xTPortal_report_start_date"]) {
										object.report_start_date = "b0xTPortal_report_start_date";
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_end_date"]) {
										object.report_end_date = "b0xTPortal_report_end_date";
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_delivery_date"]) {
										object.report_delivery_date = "b0xTPortal_report_delivery_date";
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_month"]) {
										b0xTPortal_value = b0xTPortal_data.fields["b0xTPortal_report_month"].value;
										object.report_month = b0xTPortal_value ? b0xTPortal_value : undefined;
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_year"]) {
										b0xTPortal_value = b0xTPortal_data.fields["b0xTPortal_report_year"].value;
										object.report_year = b0xTPortal_value ? b0xTPortal_value : undefined;
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_job_site"]) {
										b0xTPortal_value = b0xTPortal_data.fields["b0xTPortal_report_job_site"].value;
										object.report_jobsite_id = b0xTPortal_value ? b0xTPortal_value : undefined;
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_wo_type"]) {
										b0xTPortal_value = b0xTPortal_data.fields["b0xTPortal_report_wo_type"].value;
										object.report_wo_type = b0xTPortal_value ? b0xTPortal_value : undefined;
									}

									if(b0xTPortal_data.check_boxes.length > 0) {
										object.check_boxes = [];
										b0xTPortal_data.check_boxes.forEach(function(value, index) {
											var b0xTPortal_checked = value.checked ? 1 : 0;
											var b0xTPortal_string = value.id+"|"+b0xTPortal_checked;
											object.check_boxes.push(b0xTPortal_string);
										});	
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_sort_by"]) {
										b0xTPortal_value = b0xTPortal_data.fields["b0xTPortal_report_sort_by"].value;
										object.report_sort_by = b0xTPortal_value ? b0xTPortal_value : undefined;
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_filter_by"]) {
										b0xTPortal_value = b0xTPortal_data.fields["b0xTPortal_report_filter_by"].value;
										object.report_filter_by = b0xTPortal_value ? b0xTPortal_value : undefined;
									}

									if(b0xTPortal_data.fields["b0xTPortal_report_list_by"]) {
										b0xTPortal_value = b0xTPortal_data.fields["b0xTPortal_report_list_by"].value;
										object.report_list_by = b0xTPortal_value ? b0xTPortal_value : undefined;
									}

									b0xTPortal_data.config.getReportNextF(object);
								}
							}

							b0xTPortal_div_row.appendChild(b0xTPortal_button);
						}

						{
							var b0xTPortal_a = document.createElement("a");
							var b0xTPortal_button = document.createElement("input");
							b0xTPortal_button.setAttribute("type", "button");

							b0xTPortal_button.style.width = "125px";
							b0xTPortal_button.style.backgroundColor = "#c5c5c5";
							b0xTPortal_button.style.cursor = "default";

							b0xTPortal_button.value = "Download";

							b0xTPortal_a.appendChild(b0xTPortal_button);
							b0xTPortal_div_row.appendChild(b0xTPortal_a);

							//store the download button to be used later
							b0xTPortal_data.fields["b0xTPortal_report_download_a"] = b0xTPortal_a;
						}

						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);
				}

				{
					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.fontSize = "x-large";
					b0xTPortal_div_table.style.marginTop = "20px";

					b0xTPortal_div_table.innerHTML = '<strong>Report Details</strong>';

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);
				}

				{
					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.gap = "2px";
					b0xTPortal_div_table.style.height = "500px";
					b0xTPortal_div_table.style.overflowY = "auto";
					b0xTPortal_div_table.style.overflowX = "auto";

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);

					//store for later use
					b0xTPortal_data.fields["b0xTPortal_report_details_div"] = b0xTPortal_div_table;

				}

				//finalize structure
				b0xTPortal_wrapper_div.appendChild(b0xTPortal_limiter_div);
			}

			b0xTPortal_host_div.appendChild(b0xTPortal_wrapper_div);

			//set up the date picker
			if(typeof(b0xTPortal_data.config.datePicker) === "function") {
				var b0xTPortal_get_today = function() {
					var b0xTPortal_date  = new Date();
					var b0xTPortal_month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					var b0xTPortal_day = (b0xTPortal_date.getDate().length == 1) ? "0"+b0xTPortal_date.getDate() : b0xTPortal_date.getDate();
					return b0xTPortal_month[b0xTPortal_date.getMonth()]+" "+b0xTPortal_day+", "+b0xTPortal_date.getFullYear();
				}

				if(b0xTPortal_data.fields["b0xTPortal_report_start_date"]) {
					b0xTPortal_data.config.datePicker("b0xTPortal_report_start_date", b0xTPortal_get_today(), "", "");
					_b0xTPortal_observer("b0xTPortal_report_start_date");
				}

				if(b0xTPortal_data.fields["b0xTPortal_report_end_date"]) {
					b0xTPortal_data.config.datePicker("b0xTPortal_report_end_date", b0xTPortal_get_today(), "", "");
					_b0xTPortal_observer("b0xTPortal_report_end_date");
				}

				if(b0xTPortal_data.fields["b0xTPortal_report_delivery_date"]) {
					b0xTPortal_data.config.datePicker("b0xTPortal_report_delivery_date", b0xTPortal_get_today(), "", "");
					_b0xTPortal_observer("b0xTPortal_report_delivery_date");
				}
			}
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

	function _b0xTPortal_get_params(b0xTPortal_param) {
		if((b0xTPortal_param.Param == "startDate")) {
			var b0xTPortal_div_row = _b0xTPortal_create_rows("Start Date", "", "b0xTPortal_report_start_date", "date", 0);
			b0xTPortal_data.fields["b0xTPortal_report_start_date"].readOnly = true;
			return b0xTPortal_div_row;
		}

		if((b0xTPortal_param.Param == "endDate")) {
			var b0xTPortal_div_row = _b0xTPortal_create_rows("End Date", "", "b0xTPortal_report_end_date", "date", 0);
			b0xTPortal_data.fields["b0xTPortal_report_end_date"].readOnly = true;
			return b0xTPortal_div_row;
		}

		if((b0xTPortal_param.Param == "deliveryDate")) {
			var b0xTPortal_div_row = _b0xTPortal_create_rows("Delivery Date", "", "b0xTPortal_report_delivery_date", "date", 0);
			b0xTPortal_data.fields["b0xTPortal_report_delivery_date"].readOnly = true;
			return b0xTPortal_div_row;
		}

		if((b0xTPortal_param.Param == "month")) {
			var b0xTPortal_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Month", "", "b0xTPortal_report_month", b0xTPortal_list, 0, "month");
			return b0xTPortal_div_row;
		}

		if((b0xTPortal_param.Param == "year")) {
			var b0xTPortal_list = new Array();
			var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Year", "", "b0xTPortal_report_year", b0xTPortal_list, 0, "year");
			return b0xTPortal_div_row;
		}

		if((b0xTPortal_param.Param == "jobSite")) {
			var b0xTPortal_list = b0xTPortal_param.ParamExtra;
			var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Job Sites", "", "b0xTPortal_report_job_site", b0xTPortal_list, 0, "jobsite");
			return b0xTPortal_div_row;
		}

		if((b0xTPortal_param.Param == "woType")) {
			var b0xTPortal_list = b0xTPortal_param.ParamExtra;
			var b0xTPortal_div_row = _b0xTPortal_create_select_rows("WO. Type", "", "b0xTPortal_report_wo_type", b0xTPortal_list, 0, "wotype");
			return b0xTPortal_div_row;
		}

		var b0xTPortal_pattern = /^chk_/;
		if(b0xTPortal_pattern.test(b0xTPortal_param.Param)) {
			var b0xTPortal_match = b0xTPortal_param.Param.match(/^chk_(.*)/);
			var b0xTPortal_temp_value = b0xTPortal_match ? b0xTPortal_match[1] : "";
			var b0xTPortal_label_list = b0xTPortal_temp_value.split("_");
			var b0xTPortal_label = b0xTPortal_label_list.join(" ");
			var b0xTPortal_id    = "chk"+b0xTPortal_label_list.join("");

			//put it together
			var b0xTPortal_div_row = _b0xTPortal_create_rows("", 0, "b0xTPortal_"+b0xTPortal_id, "checkbox");
			b0xTPortal_div_row.style.flexGrow = 1;

			var b0xTPortal_row_wrapper = document.createElement("div");
			b0xTPortal_row_wrapper.style.display = "flex";

			{
				var b0xTPortal_div_label_row = document.createElement("div");
				b0xTPortal_div_label_row.style.width = "100px";
				b0xTPortal_div_label_row.style.flexShrink = 0;
				b0xTPortal_div_label_row.style.marginRight = "10px";
				b0xTPortal_div_label_row.innerHTML = "<strong>"+b0xTPortal_label+"</strong>";
				b0xTPortal_row_wrapper.appendChild(b0xTPortal_div_label_row);
			}

			{
				b0xTPortal_row_wrapper.appendChild(b0xTPortal_div_row);
			}

			var b0xTPortal_checkbox = b0xTPortal_data.fields["b0xTPortal_"+b0xTPortal_id];
			b0xTPortal_checkbox.setAttribute("id", b0xTPortal_id);
			b0xTPortal_data.check_boxes.push(b0xTPortal_checkbox);
			return b0xTPortal_row_wrapper;
		}

		b0xTPortal_pattern = /^sortBy_/;
		if(b0xTPortal_pattern.test(b0xTPortal_param.Param)) {
			var b0xTPortal_match = b0xTPortal_param.Param.match(/^sortBy_(.*)/);
			var b0xTPortal_temp_value = b0xTPortal_match ? b0xTPortal_match[1] : "";
			var b0xTPortal_list = b0xTPortal_temp_value.split("|");
			var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Sort By", "", "b0xTPortal_report_sort_by", b0xTPortal_list, 0, "sortby");
			return b0xTPortal_div_row;
		}

		b0xTPortal_pattern = /^filterBy_/;
		if(b0xTPortal_pattern.test(b0xTPortal_param.Param)) {
			var b0xTPortal_match = b0xTPortal_param.Param.match(/^filterBy_(.*)/);
			var b0xTPortal_temp_value = b0xTPortal_match ? b0xTPortal_match[1] : "";
			var b0xTPortal_list = b0xTPortal_temp_value.split("|");
			var b0xTPortal_div_row = _b0xTPortal_create_select_rows("Filter By", "", "b0xTPortal_report_filter_by", b0xTPortal_list, 0, "filterby");
			return b0xTPortal_div_row;
		}

		b0xTPortal_pattern = /^listBy_/;
		if(b0xTPortal_pattern.test(b0xTPortal_param.Param)) {
			var b0xTPortal_match = b0xTPortal_param.Param.match(/^listBy_(.*)/);
			var b0xTPortal_temp_value = b0xTPortal_match ? b0xTPortal_match[1] : "";
			var b0xTPortal_list = b0xTPortal_temp_value.split("|");
			var b0xTPortal_div_row = _b0xTPortal_create_select_rows("List By", "", "b0xTPortal_report_list_by", b0xTPortal_list, 0, "listby");
			return b0xTPortal_div_row;
		}

		return document.createElement("div");
	}

	this.b0xTPortal_build_report_details = function(b0xTPortal_extra_config) {
		var b0xTPortal_report_details_div = b0xTPortal_data.fields["b0xTPortal_report_details_div"];

		if(typeof(b0xTPortal_extra_config === "object")) {} else { return; }
		if(b0xTPortal_report_details_div) {} else { return; }

		var b0xTPortal_report_lines = b0xTPortal_extra_config.b0xTPortal_report_lines;

		if(Array.isArray(b0xTPortal_report_lines)) {} else { return; }

		b0xTPortal_report_details_div.innerHTML = "";

		//we are going to listen for a few values.
		//the headers, content, legend and axis
		var b0xTPortal_report_chart_headers = new Object();
		var b0xTPortal_report_chart_content = new Object();
		var b0xTPortal_report_chart_type    = undefined;
		var b0xTPortal_report_chart_legend  = new Array();
		var b0xTPortal_report_chart_axis    = new Array();
		var b0xTPortal_report_tables = document.createElement("div");
		var b0xTPortal_report_csv = "";

		//TODO: remaster
		var b0xTPortal_report_chart_headers2 = new Object;
		var b0xTPortal_report_chart_content2 = new Object();

		//a function to build columns 
		var b0xTPortal_col  = function(tag, value) {
			var b0xTPortal_table_col = document.createElement(tag);
			b0xTPortal_table_col.style.border = "0px";
			b0xTPortal_table_col.innerHTML = value;
			return b0xTPortal_table_col;
		}

		//we are going to iterate through
		//the csv that we get from the server
		var b0xTPortal_class_count = 0;
		var b0xTPortal_section_count = -1;
		var b0xTPortal_valid_format = 1;
		var b0xTPortal_current_header_keys;

		b0xTPortal_report_lines.forEach(function(value, index) {
			//make sure that no problems was found on the 
			//the previous iteration. throw an error later
			if(b0xTPortal_valid_format) {} else { return; }

			//first we are going to look for the  section rows if its
			//there we are going to build a div to wrap the content.
			if(value.indexOf("[SectionRow]") > -1) {
				var b0xTPortal_parsed_value = value.replace(/\[SectionRow\]/g, "");
				var b0xTPortal_section_row = document.createElement("div");

				b0xTPortal_section_row.style.marginBottom = "10px";

				{ 
					var b0xTPortal_section_row_header = document.createElement("div");

					b0xTPortal_section_row_header.style.fontSize = "large";
					b0xTPortal_section_row_header.style.fontWeight = "bold";

					b0xTPortal_section_row_header.innerHTML = b0xTPortal_parsed_value;
					b0xTPortal_section_row.appendChild(b0xTPortal_section_row_header);
				}

				//store in dom and csv.
				b0xTPortal_report_tables.appendChild(b0xTPortal_section_row);
				b0xTPortal_report_csv += b0xTPortal_parsed_value+"\n";

				b0xTPortal_class_count = 0;
				b0xTPortal_section_count++;

				//at this point current header key 
				//should always be set to undefined.
				b0xTPortal_current_header_keys = [];

				return;
			}

			//lets make sure that there is a section for use to otherwise
			//dont go anything further, otherwise an error will occur
			var b0xTPortal_section_list = b0xTPortal_report_tables.children;
			var b0xTPortal_section = b0xTPortal_section_list[b0xTPortal_section_count];

			//next we are going to look for the headers
			//create a table to go with it and append to
			//the section.
			if(value.indexOf("[HeaderRow]") > -1 && b0xTPortal_section) {
				var b0xTPortal_split_value  = value.split("|");
				var b0xTPortal_match = value.match(/\[HeaderRow\]\[([0-9]+)\]/);
				var b0xTPortal_expected_length = b0xTPortal_match ? b0xTPortal_match[1] : 1;

				//we need to know if the headers are properly stored
				if(Array.isArray(b0xTPortal_current_header_keys) && 
					b0xTPortal_current_header_keys.length == 0) {} else {
					b0xTPortal_valid_format = 0;
					return;
				}

				//lets create a table now
				var b0xTPortal_table = document.createElement("table");

				b0xTPortal_table.style.margin = "0px";

				var b0xTPortal_table_tr = document.createElement("tr");

				b0xTPortal_table_tr.setAttribute("class", "b0xTPortal_odd");

				var b0xTPortal_temp_array = new Array();
				b0xTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; }           //skip the row markers
					if(!b0xTPortal_valid_format) { return; } //skip if any previous format was bad

					var b0xTPortal_split_sub_value = sub_value.split("/");

					//these values must match else we cant continue any further
					if(b0xTPortal_expected_length == b0xTPortal_split_sub_value.length) {} else {
						b0xTPortal_valid_format = 0;
						return;
					}

					//should always be undefined at this very moment
					if(b0xTPortal_current_header_keys[sub_index]) {
						b0xTPortal_valid_format = 0;
						return;
					}

					b0xTPortal_table_tr.appendChild(b0xTPortal_col("th", _b0xTPortal_clean_value(sub_value)));

					//i need to be able to keep track of the current header iteration.
					b0xTPortal_current_header_keys[sub_index] = sub_value;

					//lets keep a unique copy of each header
					if(!b0xTPortal_report_chart_headers[sub_value]) {
						b0xTPortal_report_chart_headers[sub_value] = sub_value;

						var b0xTPortal_default_temp_array = Array();
						for(var i = 0; i < b0xTPortal_expected_length*1; i++) {
							b0xTPortal_default_temp_array.push(0);
						}

						b0xTPortal_report_chart_content[sub_value] = b0xTPortal_default_temp_array.join("/");
					}

					//keep track of the value so that we
					//can create a csv for customers to
					//download.
					b0xTPortal_temp_array.push(_b0xTPortal_clean_value(sub_value));
				});

				//make sure we did not find any errors
				if(b0xTPortal_valid_format) {} else { return; }

				//put csv together
				b0xTPortal_report_csv += b0xTPortal_temp_array.join("|")+"\n";

				b0xTPortal_table.appendChild(b0xTPortal_table_tr);
				b0xTPortal_section.appendChild(b0xTPortal_table);
				return;
			}

			//lets make sure there is a valid table appended to the section. without
			//the table we cant continue any further without experiencing an error.
			var b0xTPortal_section_table_list = b0xTPortal_section.getElementsByTagName("table");
			var b0xTPortal_section_table = b0xTPortal_section_table_list[0];

			//now lets look for some content and append it
			//to the table we created when parsing headers.
			if(value.indexOf("[ContentRow]") > -1 && b0xTPortal_section && b0xTPortal_section_table) {
				var b0xTPortal_split_value  = value.split("|");
				var b0xTPortal_match = value.match(/\[ContentRow\]\[([0-9]+)\]/);
				var b0xTPortal_expected_length = b0xTPortal_match ? b0xTPortal_match[1] : 1;;

				var b0xTPortal_class = b0xTPortal_class_count++ % 2 ? "b0xTPortal_odd" : "b0xTPortal_even";
				var b0xTPortal_table_tr = document.createElement("tr");

				b0xTPortal_table_tr.setAttribute("class", b0xTPortal_class);

				var b0xTPortal_temp_array = new Array();
				b0xTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; }           //skip the row markers
					if(!b0xTPortal_valid_format) { return; } //skip if any previous format was bad

					var b0xTPortal_parsed_value = sub_value.replace(/\,/g, "");
					var b0xTPortal_split_sub_value = b0xTPortal_parsed_value.split("/");

					//these values must match else we cant continue any further
					if(b0xTPortal_expected_length == b0xTPortal_split_sub_value.length) {} else {
						b0xTPortal_valid_format = 0;
						return;
					}

					b0xTPortal_table_tr.appendChild(b0xTPortal_col("td", _b0xTPortal_clean_value(b0xTPortal_parsed_value)));

					//keep track of the value so that we
					//can create a csv for customers to
					//download.
					b0xTPortal_temp_array.push(_b0xTPortal_clean_value(b0xTPortal_parsed_value));
				});

				//make sure we did not find any errors
				if(b0xTPortal_valid_format) {} else { return; }

				//put csv together
				b0xTPortal_report_csv += b0xTPortal_temp_array.join("|")+"\n";

				b0xTPortal_section_table.appendChild(b0xTPortal_table_tr);
				return;
			}

			//the last part of the section will be
			//the total row. if its present append it
			//to the table.
			if(value.indexOf("[TotalRow]") > -1 && b0xTPortal_section && b0xTPortal_section_table) {
				var b0xTPortal_split_value  = value.split("|");
				var b0xTPortal_match = value.match(/\[TotalRow\]\[([0-9]+)\]/);
				var b0xTPortal_expected_length = b0xTPortal_match ? b0xTPortal_match[1] : 1;

				//we need to know if the headers are properly stored
				if(Array.isArray(b0xTPortal_current_header_keys)) {} else {
					b0xTPortal_valid_format = 0;
					return;
				}

				var b0xTPortal_table_tr = document.createElement("tr");

				b0xTPortal_table_tr.style.borderTop = "4px double";

				var b0xTPortal_temp_array = new Array();
				b0xTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; }           //skip the row markers
					if(!b0xTPortal_valid_format) { return; } //skip if any previous format was bad

					var b0xTPortal_parsed_value = sub_value.replace(/\,/g, "");
					var b0xTPortal_split_sub_value = b0xTPortal_parsed_value.split("/");

					//these values must match else we cant continue any further
					if(b0xTPortal_expected_length == b0xTPortal_split_sub_value.length) {} else {
						b0xTPortal_valid_format = 0;
						return;
					}

					//we need the key for the content and headers
					var b0xTPortal_key = b0xTPortal_current_header_keys[sub_index];

					b0xTPortal_table_tr.appendChild(b0xTPortal_col("th", _b0xTPortal_clean_value(b0xTPortal_parsed_value)));

					var b0xTPortal_sub_sub_temp_array = new Array();
					b0xTPortal_split_sub_value.forEach(function(sub_sub_value, sub_sub_index) {
						if(!b0xTPortal_valid_format) { return; } //skip if any previous format was bad

						var b0xTPortal_trimed_sub_sub_value = sub_sub_value.trim();
						b0xTPortal_trimed_sub_sub_value = b0xTPortal_trimed_sub_sub_value ? b0xTPortal_trimed_sub_sub_value : "0";
						b0xTPortal_trimed_sub_sub_value = isNaN(b0xTPortal_trimed_sub_sub_value) ? "0" : b0xTPortal_trimed_sub_sub_value;

						//now that we have a trimed value that we can use lets break apart the
						//value we stored when creating the headers. and add the new value to it.
						var b0xTPortal_split_chart_content = b0xTPortal_report_chart_content[b0xTPortal_key];
						b0xTPortal_split_chart_content = b0xTPortal_split_chart_content.toString().split("/");

						if(b0xTPortal_expected_length == b0xTPortal_split_chart_content.length) {} else {
							b0xTPortal_valid_format = 0;
							return;
						}

						var b0xTPortal_target_value = b0xTPortal_split_chart_content[sub_sub_index];

						//lets put together some numbers			
						b0xTPortal_target_value = b0xTPortal_target_value.trim();
						b0xTPortal_target_value = b0xTPortal_target_value ? b0xTPortal_target_value : "0";
						b0xTPortal_target_value = isNaN(b0xTPortal_target_value) ? "0" : b0xTPortal_target_value;
						b0xTPortal_target_value = b0xTPortal_target_value*1 + b0xTPortal_trimed_sub_sub_value*1;
						b0xTPortal_sub_sub_temp_array.push(b0xTPortal_target_value);
					});

					//make sure we did not find any errors
					if(b0xTPortal_valid_format) {} else { return; }

					//rebuild the total row
					b0xTPortal_report_chart_content[b0xTPortal_key] = b0xTPortal_sub_sub_temp_array.join("/");

					//keep track of the value so that we
					//can create a csv for customers to
					//download.
					b0xTPortal_temp_array.push(_b0xTPortal_clean_value(b0xTPortal_parsed_value));
				});

				//make sure we did not find any errors
				if(b0xTPortal_valid_format) {} else { return; }

				//put csv together
				b0xTPortal_report_csv += b0xTPortal_temp_array.join("|")+"\n";

				b0xTPortal_section_table.appendChild(b0xTPortal_table_tr);
				return;
			}

			//parse the content.
			if(value.indexOf("[LegendRow]") > -1) {
				var b0xTPortal_split_value  = value.split("|");
				var b0xTPortal_match = value.match(/\[LegendRow\]\[([A-Za-z]+)\]/);
				b0xTPortal_report_chart_type = b0xTPortal_match ? b0xTPortal_match[1] : undefined;

				b0xTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; } //skip the row markers
					b0xTPortal_parsed_value = sub_value.trim();
					b0xTPortal_report_chart_legend.push(sub_value);
				});

				return;
			}

			//parse the content.
			if(value.indexOf("[AxisRow]") > -1) {
				var b0xTPortal_split_value  = value.split("|");
				b0xTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; } //skip the row markers
					b0xTPortal_parsed_value = sub_value.trim();
					b0xTPortal_report_chart_axis.push(sub_value);
				});

				return;
			}
		});


		if(b0xTPortal_valid_format) {} else {
			_b0xTPortal_force_error("Error: Invalid format. Please contact administration.");
			return;
		}

		//if at this point we cant verify that this
		//report will be displayed as any type of
		//chart then we are going display the table
		if(b0xTPortal_report_chart_type) {} else {
			b0xTPortal_report_details_div.appendChild(b0xTPortal_report_tables);
			_b0xTPortal_activate_download(b0xTPortal_report_csv);
			return;
		}

		switch(b0xTPortal_report_chart_type) {
			case "bar":
				break;
			case "corechart":
				if(b0xTPortal_report_chart_legend.length == 2) {} else {
					b0xTPortal_valid_format = 0;
				}
				break;
			default:
				//if should never get here
				b0xTPortal_valid_format = 0;
		}

		if(b0xTPortal_valid_format) {} else {
			_b0xTPortal_force_error("Error: Invalid format. Please contact administration.");
			return;
		}

		var b0xTPortal_data_array = [b0xTPortal_report_chart_legend];
		for(b0xTPortal_key in b0xTPortal_report_chart_headers) {
			//skip if any previous format was bad
			if(!b0xTPortal_valid_format) { continue; }

			//we are not going to evaluate any
			//headers, and their content, that
			//are flagged as [ChartHide].
			if(b0xTPortal_report_chart_headers[b0xTPortal_key].indexOf("[ChartHide]") > -1) {
				continue;
			}

			switch(b0xTPortal_report_chart_type) {
				case "bar":
					var b0xTPortal_sub_data_array = new Array();

					//for the bar graphs we only want first header option in the string. to do this
					//we are going to split the headers and only push index 0 on to the sub data array
					var b0xTPortal_split_header_value = b0xTPortal_report_chart_headers[b0xTPortal_key].split("/");

					//we need atleast one item
					if(b0xTPortal_split_header_value.length >= 1) {} else {
						b0xTPortal_valid_format = 0;
						break;
					}

					b0xTPortal_sub_data_array.push(_b0xTPortal_extract_key(b0xTPortal_split_header_value[0]));

					//lets take the content and covert it to a number then push on to sub data array
					var b0xTPortal_split_content_value = b0xTPortal_report_chart_content[b0xTPortal_key].split("/");

					//but first lets make sure the content is in a valid format.
					if(b0xTPortal_split_content_value.length+1 == b0xTPortal_report_chart_legend.length) {} else {
						b0xTPortal_valid_format = 0;
						break;
					}

					//next lets make sure that both headers and content are the same length
					if(b0xTPortal_split_header_value.length == b0xTPortal_split_content_value.length) {} else {
						b0xTPortal_valid_format = 0;
						break;
					}

					b0xTPortal_split_content_value.forEach(function(value, index) {
						b0xTPortal_sub_data_array.push(value*1);
					});

					b0xTPortal_data_array.push(b0xTPortal_sub_data_array);
					break;
				case "corechart":
					//the pie chart will be done a little diffrent, this time we will make
					//use of all headers and pair them with their corresponding content...
					var b0xTPortal_split_header_value = b0xTPortal_report_chart_headers[b0xTPortal_key].split("/");
					var b0xTPortal_split_content_value = b0xTPortal_report_chart_content[b0xTPortal_key].split("/");

					//make sure the content and headers match in length
					if(b0xTPortal_split_header_value.length == b0xTPortal_split_content_value.length) {} else {
						b0xTPortal_valid_format = 0;
						break;
					}

					b0xTPortal_split_header_value.forEach(function(value, index) {
						b0xTPortal_data_array.push([_b0xTPortal_extract_key(value), b0xTPortal_split_content_value[index]*1]);
					});
					break;
			}
		}

		if(b0xTPortal_valid_format) {} else {
			_b0xTPortal_force_error("Error: Invalid format. Please contact administration.");
			return;
		}

		var b0xTPortal_args_config = new Object();
		b0xTPortal_args_config.chart_type = b0xTPortal_report_chart_type;
		b0xTPortal_args_config.host_div   = b0xTPortal_report_details_div;
		b0xTPortal_args_config.data_array = b0xTPortal_data_array;
		b0xTPortal_args_config.axis_array = b0xTPortal_report_chart_axis;
		_b0xTPortal_chart_data(b0xTPortal_args_config);
		_b0xTPortal_activate_download(b0xTPortal_report_csv);
	}

	function _b0xTPortal_clean_value(b0xTPortal_value) {
		//verify that value passed in
		if(b0xTPortal_value == undefined || b0xTPortal_value == null) {
			b0xTPortal_value = "";
		}

		b0xTPortal_value = b0xTPortal_value.toString();
		b0xTPortal_value = b0xTPortal_value.replace(/\[ChartHide\]/g, "");
		b0xTPortal_value = b0xTPortal_value.replace(/\[ChartAS-.*?\]/g, "");
		b0xTPortal_value = b0xTPortal_value.replace(/\,/g, "");
		return b0xTPortal_value;
	}

	function _b0xTPortal_extract_key(b0xTPortal_value) {
		//verify that value passed in
		if(b0xTPortal_value == undefined || b0xTPortal_value == null) {
			b0xTPortal_value = "";
		}

		b0xTPortal_value = b0xTPortal_value.toString();
		var b0xTPortal_match = b0xTPortal_value.match(/(\[ChartAS-(.*?)\])?(.*)$/);

		if(b0xTPortal_match && b0xTPortal_match[2]) {
			b0xTPortal_value =  b0xTPortal_match[2];	
		} else if(b0xTPortal_match && b0xTPortal_match[3]) {
			b0xTPortal_value =  b0xTPortal_match[3];
		}

		return b0xTPortal_value;
	}

	function _b0xTPortal_activate_download(b0xTPortal_csv) {
		var b0xTPortal_a = b0xTPortal_data.fields["b0xTPortal_report_download_a"];
		if(b0xTPortal_a) {} else { return; }

		b0xTPortal_a.firstChild.style.backgroundColor = "#0073aa";
		b0xTPortal_a.firstChild.style.cursor = "pointer";

		b0xTPortal_a.setAttribute("href", "data:text/plain;charset=utf-8,"+encodeURIComponent(b0xTPortal_csv));
		b0xTPortal_a.setAttribute("download", "report.csv");
	}

	function _b0xTPortal_force_error(b0xTPortal_error) {
		var b0xTPortal_failure_flag = document.getElementById(b0xTPortal_data.config.failFlag);
		if(b0xTPortal_failure_flag) { b0xTPortal_failure_flag.innerHTML = ""; }

		if(b0xTPortal_failure_flag) {
			var b0xTPortal_message = document.createElement("p");
			b0xTPortal_message.setAttribute("class", "b0xTPortal-error-msg");
			b0xTPortal_message.innerHTML = b0xTPortal_error;
			b0xTPortal_failure_flag.appendChild(b0xTPortal_message);
		}
	}

	function _b0xTPortal_chart_data(b0xTPortal_args_config) {
		//validate object values
		if(typeof(b0xTPortal_args_config === "object")) {} else { return; }
		if(b0xTPortal_args_config.chart_type){} else { return; }
		if(b0xTPortal_args_config.host_div) {} else { return; }
		if(Array.isArray(b0xTPortal_args_config.data_array)) {} else { return; }
		if(Array.isArray(b0xTPortal_args_config.axis_array)) {} else { return; }

		google.charts.load('current', {'packages':[b0xTPortal_args_config.chart_type]});

		//we need a place to put the chart
		b0xTPortal_chart_div = document.createElement("div");

		b0xTPortal_chart_div.style.marginTop = "20px";

		b0xTPortal_args_config.host_div.appendChild(b0xTPortal_chart_div);

		var b0xTPortal_draw_chart = function() {
			var b0xTPortal_chart_data = new google.visualization.arrayToDataTable(b0xTPortal_args_config.data_array);

			var b0xTPortal_options;
			var b0xTPortal_chart;
			switch(b0xTPortal_args_config.chart_type) {
				case "bar":
					b0xTPortal_options = {
						bars: 'vertical',
						axes: {
							x: {0: { side: 'bottom', label: b0xTPortal_args_config.axis_array[0]}},
							y: {0: { side: 'left', label: b0xTPortal_args_config.axis_array[2]}}
						}
					};

					b0xTPortal_chart = new google.charts.Bar(b0xTPortal_chart_div);
					break;
				case "corechart":
					b0xTPortal_options = {
						is3D: true
					};

					b0xTPortal_chart = new google.visualization.PieChart(b0xTPortal_chart_div);
					break;	
			}

			b0xTPortal_chart.draw(b0xTPortal_chart_data, b0xTPortal_options);
		}

		google.charts.setOnLoadCallback(b0xTPortal_draw_chart);
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
			b0xTPortal_input.setAttribute("type", b0xTPortal_type);

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
				var b0xTPortal_options_value;
				switch(b0xTPortal_control) {
					case "month":
					case "year":
					case "wotype":
					case "sortby":
					case "filterby":
					case "listby":
						b0xTPortal_options_value = undefined;
						break;
					default:
						b0xTPortal_options_value = "Show All";
				}

				if(b0xTPortal_options_value) {
					var option = document.createElement("option");
					option.value = "";
					option.innerHTML = b0xTPortal_options_value;
					b0xTPortal_select.appendChild(option);
				}
			}

			if(Array.isArray(b0xTPortal_list) || typeof(b0xTPortal_list) === "object") {
				var foundValue = 0; //make sure the value exist
				switch(b0xTPortal_control) {
					case "jobsite":
						b0xTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.ID;
							option.innerHTML = value.JobName ? "("+value.JobName+")"+" "+value.Address : value.Address;
							b0xTPortal_select.appendChild(option);

							if(value.ID == b0xTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "month":
						b0xTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							var b0xTPortal_options_value = index+1;
			
							if(b0xTPortal_options_value <= 9) {
								b0xTPortal_options_value = "0"+b0xTPortal_options_value;
							}

							option.value = b0xTPortal_options_value;
							option.innerHTML = value;
							b0xTPortal_select.appendChild(option);

							if(value == b0xTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "year":
						var b0xTPortal_date       = new Date();
						var b0xTPortal_end_year   = b0xTPortal_date.getFullYear();
						var b0xTPortal_start_year = 2016;
						while(b0xTPortal_end_year >= b0xTPortal_start_year) {
							var option = document.createElement("option");
							option.value = b0xTPortal_start_year;
							option.innerHTML = b0xTPortal_start_year;
							b0xTPortal_select.appendChild(option);

							if(b0xTPortal_start_year == b0xTPortal_value) {
								foundValue++;
							}

							b0xTPortal_start_year++;
						}
						break;
					case "wotype":
						for(var key in b0xTPortal_list) {
							if(key == "ID")              { continue; }
							if(key == "excludeFromJSON") { continue; }
							if(key == "dbh")             { continue; }

							var option = document.createElement("option");

							option.value = key;
							option.innerHTML = b0xTPortal_list[key];
							b0xTPortal_select.appendChild(option);

							if(key == b0xTPortal_value) {
								foundValue++;
							}
						}
						break;
					case "sortby":
					case "filterby":
					case "listby":
						b0xTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value;
							option.innerHTML = value;
							b0xTPortal_select.appendChild(option);

							if(value == b0xTPortal_value) {
								foundValue++;
							}
						});
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