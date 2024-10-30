function b0xTPortal_payment_page_template(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b0xTPortal_init = function(b0xTPortal_extra_config) {
		var b0xTPortal_host_div = document.getElementById(b0xTPortal_data.config.hostDiv);
		var b0xTPortal_parent_div = document.getElementById(b0xTPortal_data.config.parentDiv);

		if(b0xTPortal_parent_div) {
			b0xTPortal_parent_div.style.maxWidth = "550px";
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
			b0xTPortal_wrapper_div.setAttribute("id", "b0xTPortal_payment_page_template");
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
							b0xTPortal_config.selected = "FINANCIALS";
							b0xTPortal_config.customerName = '<strong style="font-size: x-large;"">MAKE PAYMENT</strong>';
							b0xTPortal_data.config.header.b0xTPortal_build_header(b0xTPortal_config);
						} 
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_header_div);
				}

				{
					var b0xTPortal_radio_update_visuals = function(b0xTPortal_radio_choice) {
						var b0xTPortal_radio_choice_one = b0xTPortal_data.fields["b0xTPortal_div_radio_wrapper_invoice_balance"];
						var b0xTPortal_radio_choice_two = b0xTPortal_data.fields["b0xTPortal_div_radio_wrapper_customer_balance"];

						switch(b0xTPortal_radio_choice) {
							case 1:
								b0xTPortal_radio_choice_one.style.backgroundColor = "#f5f5f5";
								b0xTPortal_radio_choice_two.style.backgroundColor = "transparent";
								break;
							case 2:
								b0xTPortal_radio_choice_one.style.backgroundColor = "transparent";
								b0xTPortal_radio_choice_two.style.backgroundColor = "#f5f5f5";
								break;
						}
					}

					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.gap = "2px";
					b0xTPortal_div_table.style.marginBottom = "10px";
					b0xTPortal_div_table.style.border = "1px solid #d5d5d5";
					b0xTPortal_div_table.style.boxShadow = "rgb(207 207 207) 3px 3px 9px";

					{
						var b0xTPortal_div_radio_wrapper = document.createElement("div");

						b0xTPortal_div_radio_wrapper.style.display = "flex";
						b0xTPortal_div_radio_wrapper.style.borderBottom = "1px dotted #b8b8b8";

						{
							var b0xTPortal_div_radio_one = document.createElement("div");

							b0xTPortal_div_radio_one.style.margin = "auto";
							b0xTPortal_div_radio_one.style.paddingRight = "5px";

							var b0xTPortal_pay_option_radio_one = document.createElement("input");
							b0xTPortal_pay_option_radio_one.setAttribute("type", "radio");
							b0xTPortal_pay_option_radio_one.setAttribute("name", "b0xTPortal_payment_options");

							b0xTPortal_pay_option_radio_one.checked = true;

							b0xTPortal_pay_option_radio_one.onclick = function() {
								b0xTPortal_radio_update_visuals(1);
							}

							//put it together
							b0xTPortal_div_radio_one.appendChild(b0xTPortal_pay_option_radio_one);
							b0xTPortal_div_radio_wrapper.appendChild(b0xTPortal_div_radio_one);

							//store the radio for later use
							b0xTPortal_data.fields["b0xTPortal_pay_option_radio_one"] = b0xTPortal_pay_option_radio_one;
						}

						{
							var b0xTPortal_div_radio_content = document.createElement("div");

							b0xTPortal_div_radio_content.style.flexGrow = "1";
							b0xTPortal_div_radio_content.style.display = "flex";
							b0xTPortal_div_radio_content.style.gap = "10px";

							{
								//invoice
								b0xTPortal_div_row = _b0xTPortal_create_rows("INVOICE(S)", "", "b0xTPortal_transaction_list", "textbox", 1);

								b0xTPortal_div_row.firstChild.style.width = "auto";

								b0xTPortal_data.fields["b0xTPortal_transaction_list"].style.backgroundColor = "transparent";
								b0xTPortal_data.fields["b0xTPortal_transaction_list"].style.border = "0px";

								b0xTPortal_div_radio_content.appendChild(b0xTPortal_div_row);
							}

							{
								//total
								b0xTPortal_div_row = _b0xTPortal_create_rows("TOTAL", _b0xTPortal_format_for_currency((0).toFixed(2), 0), "b0xTPortal_transaction_total", "textbox", 2);

								b0xTPortal_div_row.firstChild.style.width = "auto";

								b0xTPortal_data.fields["b0xTPortal_transaction_total"].style.backgroundColor = "transparent";
								b0xTPortal_data.fields["b0xTPortal_transaction_total"].style.border = "0px";

								b0xTPortal_div_radio_content.appendChild(b0xTPortal_div_row);
							}

							b0xTPortal_div_radio_wrapper.appendChild(b0xTPortal_div_radio_content);
						}

						b0xTPortal_div_table.appendChild(b0xTPortal_div_radio_wrapper);

						//store for later use
						b0xTPortal_data.fields["b0xTPortal_div_radio_wrapper_invoice_balance"] = b0xTPortal_div_radio_wrapper;
					}

					{
						var b0xTPortal_div_radio_wrapper = document.createElement("div");

						b0xTPortal_div_radio_wrapper.style.display = "flex";

						{
							var b0xTPortal_div_radio_two = document.createElement("div");

							b0xTPortal_div_radio_two.style.margin = "auto";
							b0xTPortal_div_radio_two.style.paddingRight = "5px";

							var b0xTPortal_pay_option_radio_two = document.createElement("input");
							b0xTPortal_pay_option_radio_two.setAttribute("type", "radio");
							b0xTPortal_pay_option_radio_two.setAttribute("name", "b0xTPortal_payment_options");

							b0xTPortal_pay_option_radio_two.onclick = function() {
								b0xTPortal_radio_update_visuals(2);
							}

							//put it together
							b0xTPortal_div_radio_two.appendChild(b0xTPortal_pay_option_radio_two);
							b0xTPortal_div_radio_wrapper.appendChild(b0xTPortal_div_radio_two);

							//store the radio for later use
							b0xTPortal_data.fields["b0xTPortal_pay_option_radio_two"] = b0xTPortal_pay_option_radio_two;
						}

						{
							var b0xTPortal_div_radio_content = document.createElement("div");

							b0xTPortal_div_radio_content.style.flexGrow = "1";
							b0xTPortal_div_radio_content.style.display = "flex";
							b0xTPortal_div_radio_content.style.gap = "10px";

							//customer balance
							var b0xTPortal_value = typeof(b0xTPortal_extra_config) === "object" ? b0xTPortal_extra_config.b0xTPortal_customer_balance : 0;
							b0xTPortal_div_row = _b0xTPortal_create_rows("CUST. BALANCE", _b0xTPortal_format_for_currency((b0xTPortal_value*1).toFixed(2), 0), "b0xTPortal_customer_balance", "textbox", 1);

							b0xTPortal_div_row.style.width = "100%";

							b0xTPortal_div_row.firstChild.style.width = "auto";

							b0xTPortal_data.fields["b0xTPortal_customer_balance"].style.backgroundColor = "transparent";
							b0xTPortal_data.fields["b0xTPortal_customer_balance"].style.border = "0px";

							b0xTPortal_div_radio_content.appendChild(b0xTPortal_div_row);

							b0xTPortal_div_radio_wrapper.appendChild(b0xTPortal_div_radio_content);
						}

						b0xTPortal_div_table.appendChild(b0xTPortal_div_radio_wrapper);

						//store for later use
						b0xTPortal_data.fields["b0xTPortal_div_radio_wrapper_customer_balance"] = b0xTPortal_div_radio_wrapper;
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);

					//set a radio by default
					b0xTPortal_radio_update_visuals(1);
				}

				{

					var b0xTPortal_content_div = document.createElement("div");

					{
						var b0xTPortal_table_div = document.createElement("div");

						b0xTPortal_table_div.style.borderBottom = "1px solid #c3c3c3";
						b0xTPortal_table_div.style.borderTop = "1px solid #c3c3c3";

						var b0xTPortal_table = document.createElement("table");

						b0xTPortal_table.style.margin = "0px";
						b0xTPortal_table.style.border = "0px";
						b0xTPortal_table.style.width  = "100%";

						var b0xTPortal_table_tr = document.createElement("tr");

						{
							var b0xTPortal_table_tr_th = document.createElement("th");
							b0xTPortal_table_tr_th.innerHTML = "ID";

							b0xTPortal_table_tr_th.style.width = "50px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "left";
							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						{
							var b0xTPortal_table_tr_th = document.createElement("th");
							b0xTPortal_table_tr_th.innerHTML = "Balance";

							b0xTPortal_table_tr_th.style.width = "100px";
							b0xTPortal_table_tr_th.style.border = "0px";
							b0xTPortal_table_tr_th.style.textAlign = "right";
							b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_th);
						}

						b0xTPortal_table.appendChild(b0xTPortal_table_tr);
						b0xTPortal_table_div.appendChild(b0xTPortal_table);
						b0xTPortal_content_div.appendChild(b0xTPortal_table_div);
					}

					{
						var b0xTPortal_table_div = document.createElement("div");

						b0xTPortal_table_div.style.borderBottom = "1px solid #c3c3c3";
						b0xTPortal_table_div.style.height = "200px";
						b0xTPortal_table_div.style.overflowY = "auto";

						var b0xTPortal_table = document.createElement("table");

						b0xTPortal_table.style.margin = "0px";
						b0xTPortal_table.style.border = "0px";
						b0xTPortal_table.style.width  = "100%";

						var b0xTPortal_table_body = document.createElement("tbody");

						//save the body to use later
						b0xTPortal_data.fields["b0xTPortal_txn_list_content"] = b0xTPortal_table_body;

						b0xTPortal_table.appendChild(b0xTPortal_table_body);
						b0xTPortal_table_div.appendChild(b0xTPortal_table);
						b0xTPortal_content_div.appendChild(b0xTPortal_table_div);
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_content_div);

					if(typeof(b0xTPortal_extra_config) === "object") {
						var b0xTPortal_list = b0xTPortal_extra_config.b0xTPortal_transaction_list;
						_b0xTPortal_load_transactions_list(b0xTPortal_list);
					}
				}

				{
					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.gap = "2px";
					b0xTPortal_div_table.style.marginBottom = "20px";

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
						b0xTPortal_ccard_mask_option.innerHTML = "One Time Payment";
						b0xTPortal_ccard_mask.appendChild(b0xTPortal_ccard_mask_option);

						//store the mask for later use
						b0xTPortal_data.fields["b0xTPortal_ccard_mask"] = b0xTPortal_ccard_mask;

						var b0xTPortal_clear_ccard_fields = function() {
							//clear the failure if posible.
							var b0xTPortal_failure_flag = document.getElementById(b0xTPortal_data.config.failFlag);
							if(b0xTPortal_failure_flag) { b0xTPortal_failure_flag.innerHTML = ""; }	

							b0xTPortal_data.fields["b0xTPortal_ccard_first_name"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_last_name"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_address"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_address2"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_city"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_state"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_zip"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_country"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_phone"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_email"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_number"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_exp_month"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_exp_year"].value = "";
							b0xTPortal_data.fields["b0xTPortal_ccard_cvv"].value = "";	

							//revert back to default states
							b0xTPortal_data.fields["b0xTPortal_ccard_store"].checked = false;
							b0xTPortal_data.fields["b0xTPortal_ccard_make_primary_wrapper"].style.display = "none";
							b0xTPortal_data.fields["b0xTPortal_ccard_make_primary"].checked = false;
						}

						var b0xTPortal_update_mask_visuals = function(b0xTPortal_value) {
							var b0xTPortal_ccard_object = b0xTPortal_data.ccard_mask_objects[b0xTPortal_value];

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

						var b0xTPortal_update_mask_value = function(b0xTPortal_value) {
							b0xTPortal_ccard_mask.value = b0xTPortal_value;
							b0xTPortal_update_mask_visuals(b0xTPortal_value);
						}

						if(typeof(b0xTPortal_extra_config) === "object" && Array.isArray(b0xTPortal_extra_config.b0xTPortal_transaction_ccard_mask)) {
							var b0xTPortal_primary_ccard;
							b0xTPortal_extra_config.b0xTPortal_transaction_ccard_mask.forEach(function(value, index) {
								var b0xTPortal_ccard_mask_string = value.TypeAbrv+": "+value.Mask;
								if(value.PrimaryCard * 1) { b0xTPortal_ccard_mask_string += " (P)"; }

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
								b0xTPortal_update_mask_value(b0xTPortal_primary_ccard.ID);
							} 
						} 

						b0xTPortal_ccard_field_set.appendChild(b0xTPortal_ccard_mask);

						b0xTPortal_ccard_mask.onchange = function() {
							//updates that should happen on change
							b0xTPortal_update_mask_visuals(this.value);

							//get the ccard information div and lets do some work
							var b0xTPortal_ccard_information_div = b0xTPortal_data.fields["b0xTPortal_ccard_information_div"];

							if(this.value * 1 == -1) {
								b0xTPortal_ccard_information_div.style.display = "flex";
							} else {
								b0xTPortal_ccard_information_div.style.display = "none";
							}

							b0xTPortal_clear_ccard_fields();
						}
					}

					b0xTPortal_value_ccard_wrapper.appendChild(b0xTPortal_ccard_field_set);
					b0xTPortal_div_table.appendChild(b0xTPortal_value_ccard_wrapper);
					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);
				}

				{
					var b0xTPortal_div_table = document.createElement("div");

					//on load display
					if(b0xTPortal_data.fields["b0xTPortal_ccard_mask"].value >= 0) {
						b0xTPortal_div_table.style.display = "none";
					} else {
						b0xTPortal_div_table.style.display = "flex";
					}

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
						//store cc if checked
						b0xTPortal_div_row = _b0xTPortal_create_rows("Store Credit Card", 0, "b0xTPortal_ccard_store", "checkbox");

						b0xTPortal_div_row.firstChild.style.width = "120px";
						b0xTPortal_div_row.firstChild.style.flexGrow = "0";
						b0xTPortal_div_row.firstChild.style.marginRight = "2px";

						//control when to show the primary bit
						b0xTPortal_data.fields["b0xTPortal_ccard_store"].onclick = function() {
							//make them choose everytime
							b0xTPortal_data.fields["b0xTPortal_ccard_make_primary"].checked = false;
							b0xTPortal_ccard_make_primary_wrapper = b0xTPortal_data.fields["b0xTPortal_ccard_make_primary_wrapper"];

							//do some work
							if(this.checked == true) {
								b0xTPortal_ccard_make_primary_wrapper.style.display = "flex";
							} else {
								b0xTPortal_ccard_make_primary_wrapper.style.display = "none";
							}
						}

						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					{
						//make primary
						b0xTPortal_div_row = _b0xTPortal_create_rows("Make Primary", 0, "b0xTPortal_ccard_make_primary", "checkbox");

						b0xTPortal_div_row.style.display = "none";

						//store for later use
						b0xTPortal_data.fields["b0xTPortal_ccard_make_primary_wrapper"] = b0xTPortal_div_row;

						b0xTPortal_div_row.firstChild.style.width = "120px";
						b0xTPortal_div_row.firstChild.style.flexGrow = "0";
						b0xTPortal_div_row.firstChild.style.marginRight = "2px";

						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					//will use later
					b0xTPortal_data.fields["b0xTPortal_ccard_information_div"] = b0xTPortal_div_table;

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);	
				}

				{
					var b0xTPortal_div_table = document.createElement("div");
					b0xTPortal_div_table.style.display = "flex";
					b0xTPortal_div_table.style.flexDirection = "column";
					b0xTPortal_div_table.style.gap = "2px";

					{
						//process
						b0xTPortal_div_row = document.createElement("div");
						b0xTPortal_div_row.style.justifyContent = "end";
						b0xTPortal_div_row.style.marginTop = "45px";
						b0xTPortal_div_row.style.display = "flex";

						b0xTPortal_button = document.createElement("input");
						b0xTPortal_button.setAttribute("type", "button");

						b0xTPortal_button.style.width = "125px";

						b0xTPortal_button.value = "Proccess";

						b0xTPortal_button.onclick = function() {
							//clear the failure if posible.
							var b0xTPortal_failure_flag = document.getElementById(b0xTPortal_data.config.failFlag);
							if(b0xTPortal_failure_flag) { b0xTPortal_failure_flag.innerHTML = ""; }						

							//get the credit card information div
							var b0xTPortal_ccard_id = b0xTPortal_data.fields["b0xTPortal_ccard_mask"].value;

							if(b0xTPortal_ccard_id * 1 == -1) {
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
							}

							if(typeof(b0xTPortal_data.config.processPaymentNextF) === "function") {
								var object = new Object();
								object.ccard_id = ( b0xTPortal_ccard_id * 1 ) == -1 ? "0" : b0xTPortal_ccard_id;

								//the radio input must exist
								if(b0xTPortal_data.fields["b0xTPortal_pay_option_radio_one"] && 
									b0xTPortal_data.fields["b0xTPortal_pay_option_radio_two"]) {
									//DO NOTHING.. this is what should happen
								} else {
									if(b0xTPortal_failure_flag) {
										var b0xTPortal_message = document.createElement("p");
										b0xTPortal_message.setAttribute("class", "b0xTPortal-error-msg");
										b0xTPortal_message.innerHTML = "Error choosing a payment option.";
										b0xTPortal_failure_flag.appendChild(b0xTPortal_message);
									}
									return;
								}

								//one or the other both cant be checked, if both we have an error
								if(b0xTPortal_data.fields["b0xTPortal_pay_option_radio_one"].checked && 
									b0xTPortal_data.fields["b0xTPortal_pay_option_radio_two"].checked) {
									if(b0xTPortal_failure_flag) {
										var b0xTPortal_message = document.createElement("p");
										b0xTPortal_message.setAttribute("class", "b0xTPortal-error-msg");
										b0xTPortal_message.innerHTML = "Error choosing a payment option.";
										b0xTPortal_failure_flag.appendChild(b0xTPortal_message);
									}
									return;
								}

								//atleast one has to be checked
								if(b0xTPortal_data.fields["b0xTPortal_pay_option_radio_one"].checked || 
									b0xTPortal_data.fields["b0xTPortal_pay_option_radio_two"].checked) {
									//DO NOTHING.. this is what should happen
								} else {
									if(b0xTPortal_failure_flag) {
										var b0xTPortal_message = document.createElement("p");
										b0xTPortal_message.setAttribute("class", "b0xTPortal-error-msg");
										b0xTPortal_message.innerHTML = "Error choosing a payment option.";
										b0xTPortal_failure_flag.appendChild(b0xTPortal_message);
									}
									return;
								}

								var b0xTPortal_payment_mode   = 2;
								var b0xTPortal_transaction_id = "0";
								var b0xTPortal_grand_total    = "0";
								var b0xTPortal_txn_data       = _b0xTPortal_get_selected_txns();
								if(b0xTPortal_data.fields["b0xTPortal_pay_option_radio_one"].checked) {
									if(b0xTPortal_txn_data && Array.isArray(b0xTPortal_txn_data.selected_txns) && b0xTPortal_txn_data.selected_txns.length*1) {
										b0xTPortal_transaction_id = b0xTPortal_txn_data.selected_txns.join("|");
										b0xTPortal_grand_total    = b0xTPortal_txn_data.total;
										b0xTPortal_payment_mode   = 1;
									} else {
										if(b0xTPortal_failure_flag) {
											var b0xTPortal_message = document.createElement("p");
											b0xTPortal_message.setAttribute("class", "b0xTPortal-error-msg");
											b0xTPortal_message.innerHTML = "Please select an invoice(s).";
											b0xTPortal_failure_flag.appendChild(b0xTPortal_message);
										}
										return;
									}
								}

								object.transaction_id  = b0xTPortal_transaction_id;
								object.required_fields = b0xTPortal_data.required_fields;
								object.total_charges   = b0xTPortal_grand_total;
								object.payment_mode    = b0xTPortal_payment_mode;

								//new card information
								if(object.ccard_id == "0") {
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

									//check if they choose to store it and make it primary card
									object.ccard_store = b0xTPortal_data.fields["b0xTPortal_ccard_store"].checked ? "1" : "0";
									object.ccard_primary = object.ccard_store == "1" ? ( b0xTPortal_data.fields["b0xTPortal_ccard_make_primary"].checked ? "1" : "0" ) : "0";
								} 

								_b0xTPortal_validate_process_payment(object, b0xTPortal_data.config.processPaymentNextF);
							}
						}

						b0xTPortal_div_row.appendChild(b0xTPortal_button);
						b0xTPortal_div_table.appendChild(b0xTPortal_div_row);
					}

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_table);
				}
				
				{
					var b0xTPortal_div_pop_up_shield = document.createElement("div");

					b0xTPortal_div_pop_up_shield.style.display = "none";
					b0xTPortal_div_pop_up_shield.style.position = "absolute";
					b0xTPortal_div_pop_up_shield.style.bottom = "0px";
					b0xTPortal_div_pop_up_shield.style.left = "0px";
					b0xTPortal_div_pop_up_shield.style.width = "100%";
					b0xTPortal_div_pop_up_shield.style.height = "100%";
					b0xTPortal_div_pop_up_shield.style.opacity = "0.5";
					b0xTPortal_div_pop_up_shield.style.zIndex = "997";
					b0xTPortal_div_pop_up_shield.style.backgroundColor = "#efeeee";

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_pop_up_shield);

					//store for later use
					b0xTPortal_data.fields["b0xTPortal_div_pop_up_shield"] = b0xTPortal_div_pop_up_shield;
				}

				{
					b0xTPortal_div_pop_up_dialog = document.createElement("div");

					b0xTPortal_div_pop_up_dialog.style.display = "none";
					b0xTPortal_div_pop_up_dialog.style.position = "absolute";
					b0xTPortal_div_pop_up_dialog.style.bottom = "0px";
					b0xTPortal_div_pop_up_dialog.style.left = "0px";
					b0xTPortal_div_pop_up_dialog.style.width = "100%";
					b0xTPortal_div_pop_up_dialog.style.zIndex = "998";
					b0xTPortal_div_pop_up_dialog.style.backgroundColor = "#f3f3f3";

					b0xTPortal_limiter_div.appendChild(b0xTPortal_div_pop_up_dialog);

					//store for later use
					b0xTPortal_data.fields["b0xTPortal_div_pop_up_dialog"] = b0xTPortal_div_pop_up_dialog;
				}	
				
				//finalize structure
				b0xTPortal_wrapper_div.appendChild(b0xTPortal_limiter_div);
			}

			b0xTPortal_host_div.appendChild(b0xTPortal_wrapper_div);
		}
	}

	function _b0xTPortal_close_pop_up_dialog() {
		var b0xTPortal_div_pop_up_dialog = b0xTPortal_data.fields["b0xTPortal_div_pop_up_dialog"];
		var b0xTPortal_div_pop_up_shield = b0xTPortal_data.fields["b0xTPortal_div_pop_up_shield"];

		if(b0xTPortal_div_pop_up_dialog && b0xTPortal_div_pop_up_shield) {} else { return; }

		//hide dialog and then clean it out
		b0xTPortal_div_pop_up_dialog.style.display = "none";
		b0xTPortal_div_pop_up_dialog.innerHTML = "";

		//hide shield
		b0xTPortal_div_pop_up_shield.style.display = "none";
	}

	//validate process payment, they must agree
	function _b0xTPortal_validate_process_payment(b0xTPortal_object, nextF) {
		var b0xTPortal_div_pop_up_dialog = b0xTPortal_data.fields["b0xTPortal_div_pop_up_dialog"];
		var b0xTPortal_div_pop_up_shield = b0xTPortal_data.fields["b0xTPortal_div_pop_up_shield"];

		if(b0xTPortal_div_pop_up_dialog && b0xTPortal_div_pop_up_shield) {} else { return; }

		//first thing we want to do is display the shield
		b0xTPortal_div_pop_up_shield.style.display = "block";

		{ //build some content
			{
				b0xTPortal_div_pop_up_header = document.createElement("div");

				b0xTPortal_div_pop_up_header.style.backgroundColor = "#1782b5";
				b0xTPortal_div_pop_up_header.style.display = "inline-block";
				b0xTPortal_div_pop_up_header.style.width = "100%";

				{
					b0xTPortal_div_pop_up_header_title = document.createElement("div");

					b0xTPortal_div_pop_up_header_title.style.display = "inline-block";
					b0xTPortal_div_pop_up_header_title.style.fontWeight = "900";
					b0xTPortal_div_pop_up_header_title.style.fontSize = "larger";
					b0xTPortal_div_pop_up_header_title.style.padding = "5px";
					b0xTPortal_div_pop_up_header_title.style.color = "#ffffff";

					b0xTPortal_div_pop_up_header_title.innerHTML = "Please Review";

					b0xTPortal_div_pop_up_header.appendChild(b0xTPortal_div_pop_up_header_title);
				}

				{
					b0xTPortal_div_pop_up_header_exit = document.createElement("div");

					b0xTPortal_div_pop_up_header_exit.style.display = "inline-block";
					b0xTPortal_div_pop_up_header_exit.style.fontWeight = "900";
					b0xTPortal_div_pop_up_header_exit.style.fontSize = "larger";
					b0xTPortal_div_pop_up_header_exit.style.padding = "5px";
					b0xTPortal_div_pop_up_header_exit.style.marginRight = "5px";
					b0xTPortal_div_pop_up_header_exit.style.color = "#ffffff";
					b0xTPortal_div_pop_up_header_exit.style.cursor = "pointer";
					b0xTPortal_div_pop_up_header_exit.style.cssFloat = "right";

					b0xTPortal_div_pop_up_header_exit.innerHTML = "X";

					b0xTPortal_div_pop_up_header_exit.onclick = function() {
						_b0xTPortal_close_pop_up_dialog();
					}

					b0xTPortal_div_pop_up_header.appendChild(b0xTPortal_div_pop_up_header_exit);
				}

				b0xTPortal_div_pop_up_dialog.appendChild(b0xTPortal_div_pop_up_header);
			}

			{
				b0xTPortal_div_pop_up_content = document.createElement("div");

				b0xTPortal_div_pop_up_content.style.padding = "10px";
				b0xTPortal_div_pop_up_content.style.fontSize = "larger";

				{
					b0xTPortal_div_pop_up_content_row = document.createElement("div");

					if(b0xTPortal_object.payment_mode*1 == 2) {
						b0xTPortal_div_pop_up_content_row.innerHTML = "You have chosen to fully pay your <strong>Customer Balance</strong>.";
					} else {
						b0xTPortal_div_pop_up_content_row.innerHTML = "You have chosen to fully pay the selected invoices for total of "+b0xTPortal_object.total_charges;
					}

					b0xTPortal_div_pop_up_content.appendChild(b0xTPortal_div_pop_up_content_row);
				}

				{
					b0xTPortal_div_pop_up_content_row = document.createElement("div");
					b0xTPortal_div_pop_up_content_row.innerHTML = "Click <strong>OK</strong> to continue, or <strong>CANCEL</strong> to go back and make changes.";
					b0xTPortal_div_pop_up_content.appendChild(b0xTPortal_div_pop_up_content_row);
				}

				b0xTPortal_div_pop_up_dialog.appendChild(b0xTPortal_div_pop_up_content);	
			}

			{
				b0xTPortal_div_pop_up_buttons = document.createElement("div");

				b0xTPortal_div_pop_up_buttons.style.display = "flex";
				b0xTPortal_div_pop_up_buttons.style.gap = "5px";
				b0xTPortal_div_pop_up_buttons.style.padding = "10px";
				b0xTPortal_div_pop_up_buttons.style.justifyContent = "flex-end";

				{
					b0xTPortal_div_pop_up_button_wrapper = document.createElement("div");
					b0xTPortal_div_pop_up_ok_button = document.createElement("input");

					b0xTPortal_div_pop_up_ok_button.setAttribute("type", "button");

					b0xTPortal_div_pop_up_ok_button.style.width = "100px";

					b0xTPortal_div_pop_up_ok_button.value = "OK";

					b0xTPortal_div_pop_up_ok_button.onclick = function() {
						_b0xTPortal_close_pop_up_dialog();
						nextF(b0xTPortal_object);
					}

					b0xTPortal_div_pop_up_button_wrapper.appendChild(b0xTPortal_div_pop_up_ok_button);
					b0xTPortal_div_pop_up_buttons.appendChild(b0xTPortal_div_pop_up_button_wrapper);
				}

				{
					b0xTPortal_div_pop_up_button_wrapper = document.createElement("div");
					b0xTPortal_div_pop_up_cancel_button = document.createElement("input");

					b0xTPortal_div_pop_up_cancel_button.setAttribute("type", "button");

					b0xTPortal_div_pop_up_cancel_button.style.width = "100px";

					b0xTPortal_div_pop_up_cancel_button.value = "CANCEL";

					b0xTPortal_div_pop_up_cancel_button.onclick = function() {
						_b0xTPortal_close_pop_up_dialog();
					}

					b0xTPortal_div_pop_up_button_wrapper.appendChild(b0xTPortal_div_pop_up_cancel_button);
					b0xTPortal_div_pop_up_buttons.appendChild(b0xTPortal_div_pop_up_button_wrapper);
				}

				b0xTPortal_div_pop_up_dialog.appendChild(b0xTPortal_div_pop_up_buttons);
			}
		}

		//display dialog box
		b0xTPortal_div_pop_up_dialog.style.display = "block";
	}

	//load transaction list
	function _b0xTPortal_load_transactions_list(b0xTPortal_list) {
		if(!Array.isArray(b0xTPortal_list)) { return; } 
		var b0xTPortal_table_tbody = b0xTPortal_data.fields["b0xTPortal_txn_list_content"];

		b0xTPortal_list.forEach(function(b0xTPortal_object, b0xTPortal_index){
			var b0xTPortal_class    = b0xTPortal_index % 2 ? "b0xTPortal_odd" : "b0xTPortal_even";
			var b0xTPortal_table_tr = document.createElement("tr");
			b0xTPortal_table_tr.setAttribute("class", b0xTPortal_class);

			{
				var b0xTPortal_table_tr_td = document.createElement("td");

				b0xTPortal_table_tr_td.style.width = "100px";
				b0xTPortal_table_tr_td.style.border = "0px";

				b0xTPortal_table_tr_td_check_box = document.createElement("input");
				b0xTPortal_table_tr_td_check_box.setAttribute("type", "checkbox");
				b0xTPortal_table_tr_td_check_box.setAttribute("class", "b0xTPortal_txn_row_checkbox");
				b0xTPortal_table_tr_td_check_box.rowObject = b0xTPortal_object;
				b0xTPortal_table_tr_td.appendChild(b0xTPortal_table_tr_td_check_box);

				b0xTPortal_table_tr_td_check_box.onclick = function() {
					var b0xTPortal_total_input   = b0xTPortal_data.fields["b0xTPortal_transaction_total"];
					var b0xTPortal_value         = b0xTPortal_total_input.value.replace("$", '').trim();
					b0xTPortal_value             = b0xTPortal_value.replace(",", '')*1;
					var b0xTPortal_open_bal      = this.rowObject.OpenBal*1;
					var b0xTPortal_new_total     = this.checked ? (b0xTPortal_value+b0xTPortal_open_bal) : (b0xTPortal_value-b0xTPortal_open_bal);
					b0xTPortal_total_input.value = _b0xTPortal_format_for_currency(b0xTPortal_new_total.toFixed(2), 0);
				}

				b0xTPortal_table_tr_td_span = document.createElement("span");
				b0xTPortal_table_tr_td_span.innerHTML = b0xTPortal_object.ID;
				b0xTPortal_table_tr_td.appendChild(b0xTPortal_table_tr_td_span);
				b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
			}

			{
				var b0xTPortal_table_tr_td = document.createElement("td");

				b0xTPortal_table_tr_td.style.width = "100px";
				b0xTPortal_table_tr_td.style.border = "0px";
				b0xTPortal_table_tr_td.style.textAlign = "right";

				b0xTPortal_table_tr_td.innerHTML = _b0xTPortal_format_for_currency((b0xTPortal_object.OpenBal*1).toFixed(2), 1);
				b0xTPortal_table_tr.appendChild(b0xTPortal_table_tr_td);
			}

			b0xTPortal_table_tbody.appendChild(b0xTPortal_table_tr);
		});
	}

	//get selected transactions and total
	function _b0xTPortal_get_selected_txns() {
		var b0xTPortal_total_input = b0xTPortal_data.fields["b0xTPortal_transaction_total"];
		var b0xTPortal_table_tbody = b0xTPortal_data.fields["b0xTPortal_txn_list_content"];
		var b0xTPortal_list_of_checkbox = Array.from(b0xTPortal_table_tbody.getElementsByClassName("b0xTPortal_txn_row_checkbox"));
		var b0xTPortal_list_of_selected_txns = new Array();

		b0xTPortal_list_of_checkbox.forEach(function(b0xTPortal_element) {
			if(b0xTPortal_element.checked == false) { return; }
			b0xTPortal_list_of_selected_txns.push(b0xTPortal_element.rowObject.ID);
		});

		var b0xTPortal_return_obj = new Object();
		b0xTPortal_return_obj.total = b0xTPortal_total_input.value;
		b0xTPortal_return_obj.selected_txns = b0xTPortal_list_of_selected_txns;

		return b0xTPortal_return_obj;
	}

	function _b0xTPortal_format_for_currency(b0xTPortal_number, b0xTPortal_rms) {
		var b0xTPortal_value = (b0xTPortal_number*1).toLocaleString("en-US", {style:"currency", currency:"USD"});
		var b0xTPortal_value_formatted = b0xTPortal_rms ? String(b0xTPortal_value).replace("$", '') : String(b0xTPortal_value).replace("$", '$ ');
		return b0xTPortal_value_formatted;
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
				if(b0xTPortal_disabled == 2) {
					b0xTPortal_input.readOnly = true;
				} else {
					b0xTPortal_input.disabled = true;
				}

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