function b0xTPortal_jobsite_page_template(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b0xTPortal_init = function(b0xTPortal_extra_config) {
		var b0xTPortal_host_div = document.getElementById(b0xTPortal_data.config.hostDiv);
		var b0xTPortal_parent_div = document.getElementById(b0xTPortal_data.config.parentDiv);

		if(b0xTPortal_parent_div) {
			b0xTPortal_parent_div.style.maxWidth = "975px";
		}

		//make sure host exists
		if(b0xTPortal_host_div) {
			{
				//factory reset
				b0xTPortal_host_div.innerHTML = "";
			}

			//wrapper div
			var b0xTPortal_wrapper_div = document.createElement("div");
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_jobsites_page_template");

			{
				//limiter div
				var b0xTPortal_limiter_div = document.createElement("div");
				b0xTPortal_data.fields = {};                   //place holder for the fields
				b0xTPortal_data.jobsite_list_offset = 0;       //offset place holder
				b0xTPortal_data.jobsite_list_record_count = 0; //record count place holder
				b0xTPortal_data.tbJobList = undefined;         //table control place holder

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
							b0xTPortal_config.customerName = '<strong style="font-size: x-large;"">JOB SITES</strong>';
							b0xTPortal_data.config.header.b0xTPortal_build_header(b0xTPortal_config);
						} 
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_header_div);
				}

				{ 
					var b0xTPortal_add_edit_div = document.createElement("div");

					b0xTPortal_add_edit_div.style.width = "100%";
					b0xTPortal_add_edit_div.style.paddingBottom = "10px";
					b0xTPortal_add_edit_div.style.display = "inline-block";

					{
						var b0xTPortal_button = document.createElement("input");
						b0xTPortal_button.setAttribute("type", "button");

						b0xTPortal_button.style.width = "75px";
						b0xTPortal_button.style.marginRight = "20px";

						b0xTPortal_button.value = "Add";

						b0xTPortal_button.onclick = function() {
							if(typeof(b0xTPortal_data.config.loadAddEditNextF) === "function") {
								b0xTPortal_data.config.loadAddEditNextF(0);
							}
						}

						b0xTPortal_add_edit_div.appendChild(b0xTPortal_button);
					}

					{
						var b0xTPortal_button = document.createElement("input");
						b0xTPortal_button.setAttribute("type", "button");

						b0xTPortal_button.style.width = "75px";
						b0xTPortal_button.style.marginRight = "20px";

						b0xTPortal_button.value = "Edit";

						b0xTPortal_button.onclick = function() {
							if(b0xTPortal_data.tbJobList && b0xTPortal_data.tbJobList.b0xTPortal_validate()) {
								if(typeof(b0xTPortal_data.config.loadAddEditNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									b0xTPortal_data.config.loadAddEditNextF(b0xTPortal_data.tbJobList.value);
								}
							}
						}

						b0xTPortal_add_edit_div.appendChild(b0xTPortal_button);
					}

					{
						var b0xTPortal_button = document.createElement("input");
						b0xTPortal_button.setAttribute("type", "button");

						b0xTPortal_button.style.width = "75px";
						b0xTPortal_button.style.marginRight = "20px";

						b0xTPortal_button.value = "Order";

						b0xTPortal_button.onclick = function() {
							if(b0xTPortal_data.tbJobList && b0xTPortal_data.tbJobList.b0xTPortal_validate()) {
								if(typeof(b0xTPortal_data.config.loadAddEditWONextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									b0xTPortal_data.config.loadAddEditWONextF(0, b0xTPortal_data.tbJobList.value);
								}
							}
						}

						b0xTPortal_add_edit_div.appendChild(b0xTPortal_button);
					}

					{
						var b0xTPortal_button = document.createElement("input");
						b0xTPortal_button.setAttribute("type", "textbox");
						b0xTPortal_button.setAttribute("placeholder", "Search");

						b0xTPortal_button.style.width  = "150px";
						b0xTPortal_button.style.borderRadius = "10px";
						b0xTPortal_button.style.textAlign = "center";

						b0xTPortal_button.onkeyup = function() {
							_b0xTPortal_clear_js_search_timeout();

							b0xTPortal_data.searchTimer = setTimeout(function() {
								//blur the button
								b0xTPortal_data.jsSearch.blur();

								var b0xTPortal_data_object       = new Object();
								b0xTPortal_data_object.offset    = 0;
								b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
								b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
								b0xTPortal_data_object.call_back = function() { b0xTPortal_data.jsSearch.focus(); };
								b0xTPortal_data_object.control   = "refresh";

								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}	
							}, 1000);
						}

						b0xTPortal_data.jsSearch = b0xTPortal_button;

						b0xTPortal_add_edit_div.appendChild(b0xTPortal_button);
					}

					{
						var b0xTPortal_button = document.createElement("input");
						b0xTPortal_button.setAttribute("type", "button");

						b0xTPortal_button.style.width = "75px";
						b0xTPortal_button.style.cssFloat = "right";
						b0xTPortal_button.style.background = "#179101";

						b0xTPortal_button.value = "Refresh";

						b0xTPortal_button.onclick = function() {
							if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
								_b0xTPortal_clear_js_search_timeout();
								b0xTPortal_data.jsSearch.value = "";

								var b0xTPortal_data_object       = new Object();
								b0xTPortal_data_object.offset    = 0;
								b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
								b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
								b0xTPortal_data_object.control   = "refresh";

								b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
							}
						}

						b0xTPortal_add_edit_div.appendChild(b0xTPortal_button);
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_add_edit_div);
				}

				{
					var b0xTPortal_content_div_scroll = document.createElement("div");

					b0xTPortal_content_div_scroll.style.overflowX = "auto";

					var b0xTPortal_content_div = document.createElement("div");

					b0xTPortal_content_div.setAttribute("id", "b0xTPortal_jobsite_page_jobsite_list");

					b0xTPortal_content_div.style.width = "100%";
					b0xTPortal_content_div.style.minWidth = "537px";

					{
						var b0xTPortal_table_div = document.createElement("div");

						b0xTPortal_table_div.style.borderBottom = "1px solid #c3c3c3";
						b0xTPortal_table_div.style.borderTop = "1px solid #c3c3c3";

						var b0xTPortal_table  = document.createElement("table");

						b0xTPortal_table.style.margin = "0px";
						b0xTPortal_table.style.border = "0px";
						b0xTPortal_table.style.width  = "100%";

						var b0xTPortal_table_tr = document.createElement("tr");

						{
							var b0xTPortal_table_tr_th = document.createElement("th");

							b0xTPortal_table_tr_th.style.userSelect = "none";
							b0xTPortal_table_tr_th.style.width = "80px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "left";
							b0xTPortal_table_tr_th.style.cursor = "pointer";

							var b0xTPortal_span_one = document.createElement("span");

							b0xTPortal_span_one.style.marginRight = "1px";

							b0xTPortal_span_one.innerHTML = "ID";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_one);

							var b0xTPortal_span_two = document.createElement("span");

							b0xTPortal_span_two.style.color = "#0073aa";
							b0xTPortal_span_two.style.fontSize = "0.85em";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_two);

							b0xTPortal_table_tr_th.onclick = function() {
								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									_b0xTPortal_sort_update("ID", b0xTPortal_data.jsHeaders);

									var b0xTPortal_data_object       = new Object();
									b0xTPortal_data_object.offset    = 0;
									b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
									b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
									b0xTPortal_data_object.control   = "refresh";

									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}
							}

							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						{
							var b0xTPortal_table_tr_th = document.createElement("th");

							b0xTPortal_table_tr_th.style.userSelect = "none";
							b0xTPortal_table_tr_th.style.width = "125px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "left";
							b0xTPortal_table_tr_th.style.cursor = "pointer";

							var b0xTPortal_span_one = document.createElement("span");

							b0xTPortal_span_one.style.marginRight = "1px";

							b0xTPortal_span_one.innerHTML = "Job Name";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_one);

							var b0xTPortal_span_two = document.createElement("span");

							b0xTPortal_span_two.style.color = "#0073aa";
							b0xTPortal_span_two.style.fontSize = "0.85em";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_two);

							b0xTPortal_table_tr_th.onclick = function() {
								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									_b0xTPortal_sort_update("Job Name", b0xTPortal_data.jsHeaders);

									var b0xTPortal_data_object       = new Object();
									b0xTPortal_data_object.offset    = 0;
									b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
									b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
									b0xTPortal_data_object.control   = "refresh";

									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}
							}

							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						{
							var b0xTPortal_table_tr_th = document.createElement("th");

							b0xTPortal_table_tr_th.style.userSelect = "none";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.width = "200px";
							b0xTPortal_table_tr_th.style.textAlign = "left";
							b0xTPortal_table_tr_th.style.cursor = "pointer";

							var b0xTPortal_span_one = document.createElement("span");

							b0xTPortal_span_one.style.marginRight = "1px";

							b0xTPortal_span_one.innerHTML = "Address";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_one);

							var b0xTPortal_span_two = document.createElement("span");

							b0xTPortal_span_two.style.color = "#0073aa";
							b0xTPortal_span_two.style.fontSize = "0.85em";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_two);

							b0xTPortal_table_tr_th.onclick = function() {
								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									_b0xTPortal_sort_update("Address", b0xTPortal_data.jsHeaders);

									var b0xTPortal_data_object       = new Object();
									b0xTPortal_data_object.offset    = 0;
									b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
									b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
									b0xTPortal_data_object.control   = "refresh";

									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}
							}

							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						{
							var b0xTPortal_table_tr_th = document.createElement("th");

							b0xTPortal_table_tr_th.style.userSelect = "none";
							b0xTPortal_table_tr_th.style.width = "120px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "left";
							b0xTPortal_table_tr_th.style.cursor = "pointer";

							var b0xTPortal_span_one = document.createElement("span");

							b0xTPortal_span_one.style.marginRight = "1px";

							b0xTPortal_span_one.innerHTML = "City";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_one);

							var b0xTPortal_span_two = document.createElement("span");

							b0xTPortal_span_two.style.color = "#0073aa";
							b0xTPortal_span_two.style.fontSize = "0.85em";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_two);

							b0xTPortal_table_tr_th.onclick = function() {
								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									_b0xTPortal_sort_update("City", b0xTPortal_data.jsHeaders);

									var b0xTPortal_data_object       = new Object();
									b0xTPortal_data_object.offset    = 0;
									b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
									b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
									b0xTPortal_data_object.control   = "refresh";

									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}
							}

							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						{
							var b0xTPortal_table_tr_th = document.createElement("th");

							b0xTPortal_table_tr_th.style.userSelect = "none";
							b0xTPortal_table_tr_th.style.width = "95px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "left";
							b0xTPortal_table_tr_th.style.cursor = "pointer";

							var b0xTPortal_span_one = document.createElement("span");

							b0xTPortal_span_one.style.marginRight = "1px";

							b0xTPortal_span_one.innerHTML = "State";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_one);

							var b0xTPortal_span_two = document.createElement("span");

							b0xTPortal_span_two.style.color = "#0073aa";
							b0xTPortal_span_two.style.fontSize = "0.85em";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_two);							

							b0xTPortal_table_tr_th.onclick = function() {
								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									_b0xTPortal_sort_update("State", b0xTPortal_data.jsHeaders);

									var b0xTPortal_data_object       = new Object();
									b0xTPortal_data_object.offset    = 0;
									b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
									b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
									b0xTPortal_data_object.control   = "refresh";

									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}
							}

							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						{
							var b0xTPortal_table_tr_th = document.createElement("th");

							b0xTPortal_table_tr_th.style.userSelect = "none";
							b0xTPortal_table_tr_th.style.width = "90px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "left";
							b0xTPortal_table_tr_th.style.cursor = "pointer";

							var b0xTPortal_span_one = document.createElement("span");

							b0xTPortal_span_one.style.marginRight = "1px";

							b0xTPortal_span_one.innerHTML = "Zip";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_one);

							var b0xTPortal_span_two = document.createElement("span");

							b0xTPortal_span_two.style.color = "#0073aa";
							b0xTPortal_span_two.style.fontSize = "0.85em";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_two);							

							b0xTPortal_table_tr_th.onclick = function() {
								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									_b0xTPortal_sort_update("Zip", b0xTPortal_data.jsHeaders);

									var b0xTPortal_data_object       = new Object();
									b0xTPortal_data_object.offset    = 0;
									b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
									b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
									b0xTPortal_data_object.control   = "refresh";

									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}
							}

							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						{
							var b0xTPortal_table_tr_th = document.createElement("th");

							b0xTPortal_table_tr_th.style.userSelect = "none";
							b0xTPortal_table_tr_th.style.width = "100px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "left";
							b0xTPortal_table_tr_th.style.cursor = "pointer";

							var b0xTPortal_span_one = document.createElement("span");

							b0xTPortal_span_one.style.marginRight = "1px";

							b0xTPortal_span_one.innerHTML = "Boxes";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_one);

							var b0xTPortal_span_two = document.createElement("span");

							b0xTPortal_span_two.style.color = "#0073aa";
							b0xTPortal_span_two.style.fontSize = "0.85em";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_two);							

							b0xTPortal_table_tr_th.onclick = function() {
								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									_b0xTPortal_clear_js_search_timeout();
									_b0xTPortal_sort_update("Boxes", b0xTPortal_data.jsHeaders);

									var b0xTPortal_data_object       = new Object();
									b0xTPortal_data_object.offset    = 0;
									b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
									b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
									b0xTPortal_data_object.control   = "refresh";

									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}
							}

							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}						

						{
							var b0xTPortal_table_tr_th = document.createElement("th");

							b0xTPortal_table_tr_th.style.userSelect = "none";
							b0xTPortal_table_tr_th.style.width = "100px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "left";

							var b0xTPortal_span_one = document.createElement("span");

							b0xTPortal_span_one.innerHTML = "Msgs";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_one);

							var b0xTPortal_span_two = document.createElement("span");

							b0xTPortal_span_two.style.color = "#0073aa";
							b0xTPortal_span_two.style.fontSize = "0.85em";

							b0xTPortal_table_tr_th.appendChild(b0xTPortal_span_two);

							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						b0xTPortal_table.appendChild(b0xTPortal_table_tr);
						b0xTPortal_table_div.appendChild(b0xTPortal_table);
						b0xTPortal_content_div.appendChild(b0xTPortal_table_div);

						b0xTPortal_data.jsHeaders = b0xTPortal_table_tr;

						_b0xTPortal_sort_update("Address", b0xTPortal_data.jsHeaders);
					}

					{
						var b0xTPortal_table_div = document.createElement("div");

						b0xTPortal_table_div.style.height = "500px";
						b0xTPortal_table_div.style.overflowY = "auto";

						//we need to store table wrapper div to use later
						b0xTPortal_data.fields["b0xTPortal_table_list_content_wrapper"] = b0xTPortal_table_div;

						b0xTPortal_table_div.onscroll = function() {
							if(!b0xTPortal_data.jobsite_list_offset) { return; }
							if(b0xTPortal_data.jobsite_list_offset == b0xTPortal_data.jobsite_list_record_count) { return; }
						
							if(!b0xTPortal_data.fields) { return; }

							b0xTPortal_target_div = b0xTPortal_data.fields["b0xTPortal_table_list_content_wrapper"];

							if(!b0xTPortal_target_div) { return; }

							//make sure we only proceed when scrolling reaches the bottom
							if(Math.ceil(b0xTPortal_target_div.scrollTop) >= Math.floor(b0xTPortal_target_div.scrollHeight - b0xTPortal_target_div.offsetHeight)) {
								if(typeof(b0xTPortal_data.config.loadListNextF) === "function") {
									var b0xTPortal_offset = b0xTPortal_data.jobsite_list_offset;

									if(b0xTPortal_data.searchTimer) {
										_b0xTPortal_clear_js_search_timeout();
										b0xTPortal_offset = 0;
									}

									var b0xTPortal_data_object       = new Object();
									b0xTPortal_data_object.offset    = b0xTPortal_offset;
									b0xTPortal_data_object.search    = b0xTPortal_data.jsSearch.value;
									b0xTPortal_data_object.sort      = _b0xTPortal_get_sort_by(b0xTPortal_data.jsHeaders);
									b0xTPortal_data_object.control   = "scroll_load";

									b0xTPortal_data.config.loadListNextF(b0xTPortal_data_object);
								}
							}
						}

						//we need to store table wrapper div to use later
						b0xTPortal_data.fields["b0xTPortal_table_list_content_wrapper"] = b0xTPortal_table_div;

						var b0xTPortal_table  = document.createElement("table");

						b0xTPortal_table.style.margin = "0px";
						b0xTPortal_table.style.border = "0px";
						b0xTPortal_table.style.width  = "100%";

						var b0xTPortal_table_body = document.createElement("tbody");

						b0xTPortal_table.appendChild(b0xTPortal_table_body);
						b0xTPortal_table_div.appendChild(b0xTPortal_table);
						b0xTPortal_content_div.appendChild(b0xTPortal_table_div);

						//save the body to use later
						b0xTPortal_data.fields["b0xTPortal_table_list_content"] = b0xTPortal_table_body;
					}

					b0xTPortal_content_div_scroll.appendChild(b0xTPortal_content_div);
					b0xTPortal_limiter_div.appendChild(b0xTPortal_content_div_scroll);

					{
						var b0xTPortal_count_div_wrapper = document.createElement("div");

						b0xTPortal_count_div_wrapper.style.display = "flex";
						b0xTPortal_count_div_wrapper.style.justifyContent = "center";
						b0xTPortal_count_div_wrapper.style.borderTop = "1px solid #c3c3c3";
						b0xTPortal_count_div_wrapper.fontSize = "medium";

						var b0xTPortal_count_div = document.createElement("div");

						b0xTPortal_count_div.style.display = "inline-block";
						b0xTPortal_count_div.style.padding = "4px";
						b0xTPortal_count_div.style.marginTop = "5px";
						b0xTPortal_count_div.style.borderRadius = "10px";
						b0xTPortal_count_div.style.backgroundColor = "#d3d3d3";


						{
							var b0xTPortal_span = document.createElement("span");
							b0xTPortal_count_div.appendChild(b0xTPortal_span);

							//store span for later use
							b0xTPortal_data.fields["b0xTPortal_table_list_content_offset"] = b0xTPortal_span;
						}

						{
							var b0xTPortal_span = document.createElement("span");
							b0xTPortal_span.innerHTML = "<strong>/</strong>";
							b0xTPortal_count_div.appendChild(b0xTPortal_span);
						}					

						{
							var b0xTPortal_span = document.createElement("span");
							b0xTPortal_count_div.appendChild(b0xTPortal_span);	

							//store span for later use
							b0xTPortal_data.fields["b0xTPortal_table_list_content_record_count"] = b0xTPortal_span;
						}

						b0xTPortal_count_div_wrapper.appendChild(b0xTPortal_count_div);
						b0xTPortal_content_div.appendChild(b0xTPortal_count_div_wrapper);
					}

					if(typeof(b0xTPortal_extra_config) === "object") {
						var b0xTPortal_list = b0xTPortal_extra_config.b0xTPortal_jobsite_object_list;
						var b0xTPortal_record_count = b0xTPortal_extra_config.b0xTPortal_jobsite_object_list_record_count;
						var b0xTPortal_offset = b0xTPortal_extra_config.b0xTPortal_jobsite_object_list_offset;
						_b0xTPortal_load_jobsite_list(b0xTPortal_list, b0xTPortal_record_count, b0xTPortal_offset);
					}
				}

				//finalize structure
				b0xTPortal_wrapper_div.appendChild(b0xTPortal_limiter_div);
			}

			b0xTPortal_host_div.appendChild(b0xTPortal_wrapper_div);

			_b0xTPortal_observer();
		}
	}

	function _b0xTPortal_clear_js_search_timeout() {
		clearTimeout(b0xTPortal_data.searchTimer);
		b0xTPortal_data.searchTimer = null;	
	}

	//sort update
	function _b0xTPortal_sort_update(b0xTPortal_key, b0xTPortal_tr) {
		var b0xTPortal_th = Array.from(b0xTPortal_tr.children);
		b0xTPortal_th.forEach(function(value, index) {
			b0xTPortal_span = Array.from(value.children);
			if(b0xTPortal_span[0].innerHTML == b0xTPortal_key) {
				if(value.getAttribute("thSort") && value.getAttribute("thSort") == "ASC") {
					value.setAttribute("thSort", "DESC");
					b0xTPortal_span[1].innerHTML = "&darr;";
				} else {
					value.setAttribute("thSort", "ASC");
					b0xTPortal_span[1].innerHTML = "&uarr;";
				}
			} else {
				value.removeAttribute("thSort");
				b0xTPortal_span[1].innerHTML = "";
			}
		});
	}

	function _b0xTPortal_get_sort_by(b0xTPortal_tr) {
		var b0xTPortal_th = Array.from(b0xTPortal_tr.children);
		
		var b0xTPortal_return;
		b0xTPortal_th.forEach(function(value, index) {
			if(b0xTPortal_return) { return; }			
			b0xTPortal_span = Array.from(value.children);

			if(value.getAttribute("thSort")) {
				b0xTPortal_return = b0xTPortal_span[0].innerHTML+"|"+value.getAttribute("thSort");
			}
		});

		if(!b0xTPortal_return) {
			b0xTPortal_return = "Address|ASC";
		}

		return b0xTPortal_return;
	}

	//dynamic blend
	function _b0xTPortal_observer() {
		var b0xTPortal_resize_observer = new ResizeObserver(function() {
			var b0xTPortal_div = document.getElementById("b0xTPortal_jobsites_page_template");

			if(b0xTPortal_div) {} else {
				b0xTPortal_resize_observer.disconnect();
				return; //skip evaluations
			}

			//get offset
			var b0xTPortal_div_width = b0xTPortal_div.offsetWidth;

			var b0xTPortal_class_array = new Array();

			if(b0xTPortal_div_width <= 420) {
				b0xTPortal_class_array.push("b0xTPortal_jobsites_page_template_mw420");
			}

			if(b0xTPortal_div_width <= 550) {
				b0xTPortal_class_array.push("b0xTPortal_jobsites_page_template_mw550");
			}

			if(b0xTPortal_div_width <= 760) {
				b0xTPortal_class_array.push("b0xTPortal_jobsites_page_template_mw600");
			}

			if(b0xTPortal_div_width <= 900) {
				b0xTPortal_class_array.push("b0xTPortal_jobsites_page_template_mw900");
			}

			var b0xTPortal_class_array_string = b0xTPortal_class_array.join(" ");
			b0xTPortal_div.className = b0xTPortal_class_array_string;			
		});

		var b0xTPortal_div = document.getElementById("b0xTPortal_jobsites_page_template");
		b0xTPortal_resize_observer.observe(b0xTPortal_div);
	}

	//load jobsite list
	function _b0xTPortal_load_jobsite_list(b0xTPortal_list, b0xTPortal_record_count, b0xTPortal_offset) {	
		if(b0xTPortal_data.fields) {
			var b0xTPortal_table_wrapper = b0xTPortal_data.fields["b0xTPortal_table_list_content_wrapper"];
			var b0xTPortal_table_tbody = b0xTPortal_data.fields["b0xTPortal_table_list_content"];
			var b0xTPortal_record_count_span = b0xTPortal_data.fields["b0xTPortal_table_list_content_record_count"];
			var b0xTPortal_offset_span = b0xTPortal_data.fields["b0xTPortal_table_list_content_offset"];

			//make a table control
			if(!b0xTPortal_data.tbJobList) {
				var b0xTPortal_tbJobListObj = new Object();
				b0xTPortal_tbJobListObj.table_wrapper = b0xTPortal_table_wrapper;
				b0xTPortal_data.tbJobList = new b0xTPortal_table_control(b0xTPortal_tbJobListObj);
			} 

			if(b0xTPortal_table_tbody && b0xTPortal_record_count_span && b0xTPortal_offset_span) {
				//build table trs
				b0xTPortal_list.forEach(function(b0xTPortal_value, b0xTPortal_index) {
					var b0xTPortal_table_tr = document.createElement("tr");

					b0xTPortal_table_tr.setAttribute("id", "jobList_"+b0xTPortal_value.ID);

					{
						var b0xTPortal_table_tr_td = document.createElement("td");

						b0xTPortal_table_tr_td.style.width = "80px";
						b0xTPortal_table_tr_td.style.border = "0px";

						b0xTPortal_table_tr_td.innerHTML = b0xTPortal_value.ID;
						b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
					}

					{
						var b0xTPortal_table_tr_td = document.createElement("td");

						b0xTPortal_table_tr_td.style.width = "125px";
						b0xTPortal_table_tr_td.style.border = "0px";

						b0xTPortal_table_tr_td.innerHTML = b0xTPortal_value.JobName;
						b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
					}

					{
						var b0xTPortal_table_tr_td = document.createElement("td");

						b0xTPortal_table_tr_td.style.width = "200px";
						b0xTPortal_table_tr_td.style.border = "0px";

						b0xTPortal_table_tr_td.innerHTML = b0xTPortal_value.Address;
						b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
					}

					{
						var b0xTPortal_table_tr_td = document.createElement("td");

						b0xTPortal_table_tr_td.style.width = "120px";
						b0xTPortal_table_tr_td.style.border = "0px";

						b0xTPortal_table_tr_td.innerHTML = b0xTPortal_value.City;
						b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
					}

					{
						var b0xTPortal_table_tr_td = document.createElement("td");

						b0xTPortal_table_tr_td.style.width = "95px";
						b0xTPortal_table_tr_td.style.border = "0px";

						b0xTPortal_table_tr_td.innerHTML = b0xTPortal_value.State;
						b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
					}

					{
						var b0xTPortal_table_tr_td = document.createElement("td");

						b0xTPortal_table_tr_td.style.width = "90px";
						b0xTPortal_table_tr_td.style.border = "0px";

						b0xTPortal_table_tr_td.innerHTML = b0xTPortal_value.Zip;
						b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
					}

					let b0xTPortal_message_create_img = function(b0xTPortal_img_name) {
						var msgImg = document.createElement("img");
						msgImg.style.height = "15px";
						msgImg.style.display = "inline-block";
						msgImg.setAttribute("src", b0xTPortal_data.config.image_url+b0xTPortal_img_name);
						return msgImg;
					}					

					{
						var b0xTPortal_table_tr_td = document.createElement("td");

						b0xTPortal_table_tr_td.style.width = "100px";
						b0xTPortal_table_tr_td.style.border = "0px";

						if(Array.isArray(b0xTPortal_value.ContainersOnSite) && b0xTPortal_value.ContainersOnSite.length > 0) {
							b0xTPortal_table_tr_td.innerHTML = b0xTPortal_value.ContainersOnSite.length+"  ";
							b0xTPortal_table_tr_td.appendChild(b0xTPortal_message_create_img("bin.png"));
						}

						b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
					}


					{
						var b0xTPortal_table_tr_td = document.createElement("td");

						b0xTPortal_table_tr_td.style.width = "100px";
						b0xTPortal_table_tr_td.style.border = "0px";

						if(b0xTPortal_value.Validated*1 == 0) {
							b0xTPortal_table_tr_td.appendChild(b0xTPortal_message_create_img("cross.png"));
						} else if(b0xTPortal_value.Validated*1 == 1) {
							b0xTPortal_table_tr_td.appendChild(b0xTPortal_message_create_img("tick.png"));
						} else if(b0xTPortal_value.Validated*1 == 2) {
							b0xTPortal_table_tr_td.appendChild(b0xTPortal_message_create_img("user.png"));
						} else if(b0xTPortal_value.Validated*1 == 3) {
							b0xTPortal_table_tr_td.appendChild(b0xTPortal_message_create_img("icon.png"));
						}
						
						b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
					}

					b0xTPortal_data.tbJobList.b0xTPortal_attach_handlers(b0xTPortal_table_tr);

					b0xTPortal_table_tbody.appendChild(b0xTPortal_table_tr);
				});

				b0xTPortal_offset_span.innerHTML = "<strong>"+b0xTPortal_offset+"</strong>";
				b0xTPortal_record_count_span.innerHTML = "<strong>"+b0xTPortal_record_count+"</strong>";

				//store the offset/record count for later use
				b0xTPortal_data.jobsite_list_offset = b0xTPortal_offset;
				b0xTPortal_data.jobsite_list_record_count = b0xTPortal_record_count;
			}
		}
	}

	//reload jobsite list
	this.b0xTPortal_reload_jobsite_list = function(b0xTPortal_extra_config, b0xTPortal_control) {
		if(!b0xTPortal_data.fields) { return; }

		var b0xTPortal_table_wrapper = b0xTPortal_data.fields["b0xTPortal_table_list_content_wrapper"];
		var b0xTPortal_table_tbody = b0xTPortal_data.fields["b0xTPortal_table_list_content"];
		var b0xTPortal_record_count_span = b0xTPortal_data.fields["b0xTPortal_table_list_content_record_count"];
		var b0xTPortal_offset_span = b0xTPortal_data.fields["b0xTPortal_table_list_content_offset"];

		if(!b0xTPortal_table_tbody || !b0xTPortal_record_count_span || !b0xTPortal_offset_span || !b0xTPortal_table_wrapper) { return; }

		//clear divs if refreshing
		if(b0xTPortal_control == "refresh") {
			b0xTPortal_table_tbody.innerHTML = "";
			b0xTPortal_record_count_span.innerHTML = "0";
			b0xTPortal_offset_span.innerHTML = "0";
			b0xTPortal_data.tbJobList = undefined;

			//scroll to top if its a refresh
			b0xTPortal_table_wrapper.scrollTop = 0;
		}

		//re populate
		if(typeof(b0xTPortal_extra_config) === "object") {
			var b0xTPortal_list = b0xTPortal_extra_config.b0xTPortal_jobsite_object_list;
			var b0xTPortal_record_count = b0xTPortal_extra_config.b0xTPortal_jobsite_object_list_record_count;
			var b0xTPortal_offset = b0xTPortal_extra_config.b0xTPortal_jobsite_object_list_offset;
			_b0xTPortal_load_jobsite_list(b0xTPortal_list, b0xTPortal_record_count, b0xTPortal_offset);
		}
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