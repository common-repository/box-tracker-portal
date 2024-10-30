function b0xTPortal_header_builder(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;

	this.b0xTPortal_build_header = function(b0xTPortal_extra_config) {
		var b0xTPortal_host_div =  b0xTPortal_extra_config.hostDiv;

		if(b0xTPortal_host_div) {	
			//factory reset
			b0xTPortal_host_div.innerHTML = "";
			b0xTPortal_data.header_row_count = 0;

			{
				//header div
				var b0xTPortal_header_div = document.createElement("div");
				b0xTPortal_data.fields = {}; //place holder for the fields

				b0xTPortal_header_div.style.display = "flex";
				b0xTPortal_header_div.style.marginBottom = "2px";

				{
					//welcome label
					var b0xTPortal_welcome_wrapper = document.createElement("div");

					b0xTPortal_welcome_wrapper.style.flexGrow = "1";
					b0xTPortal_welcome_wrapper.style.margin = "auto";

					b0xTPortal_welcome_wrapper.innerHTML = b0xTPortal_extra_config.customerName;

					b0xTPortal_header_div.appendChild(b0xTPortal_welcome_wrapper);
				}

				{
					//hamburder icon
					var b0xTPortal_hamburger_icon_wrapper = document.createElement("div");

					b0xTPortal_hamburger_icon_wrapper.setAttribute("class", "b0xTPortal_nav_collapsed");

					b0xTPortal_hamburger_icon_wrapper.style.cursor = "pointer";

					{
						//content
						var b0xTPortal_hamburger_icon_div = document.createElement("div");

						b0xTPortal_hamburger_icon_div.style.width = "40px";
						b0xTPortal_hamburger_icon_div.style.height = "7px";
						b0xTPortal_hamburger_icon_div.style.backgroundColor = "#1782b5";
						b0xTPortal_hamburger_icon_div.style.margin = "0px";

						b0xTPortal_hamburger_icon_wrapper.appendChild(b0xTPortal_hamburger_icon_div);
					}

					{
						//content
						var b0xTPortal_hamburger_icon_div = document.createElement("div");

						b0xTPortal_hamburger_icon_div.style.width = "40px";
						b0xTPortal_hamburger_icon_div.style.height = "7px";
						b0xTPortal_hamburger_icon_div.style.backgroundColor = "#1782b5";
						b0xTPortal_hamburger_icon_div.style.margin = "6px 0px";

						b0xTPortal_hamburger_icon_wrapper.appendChild(b0xTPortal_hamburger_icon_div);
					}

					{
						//content
						var b0xTPortal_hamburger_icon_div = document.createElement("div");

						b0xTPortal_hamburger_icon_div.style.width = "40px";
						b0xTPortal_hamburger_icon_div.style.height = "7px";
						b0xTPortal_hamburger_icon_div.style.backgroundColor = "#1782b5";
						b0xTPortal_hamburger_icon_div.style.margin = "0px";

						b0xTPortal_hamburger_icon_wrapper.appendChild(b0xTPortal_hamburger_icon_div);
					}

					b0xTPortal_hamburger_icon_wrapper.onclick = function() {
						var b0xTPortal_nav_options = b0xTPortal_data.fields["b0xTPortal_nav_options"];

						if(this.className === "b0xTPortal_nav_collapsed") {
							this.className = "b0xTPortal_nav_extended";
							if(b0xTPortal_nav_options) {
								//dynamiclly calculate height.
								b0xTPortal_nav_options.style.height = ((b0xTPortal_nav_options.firstChild.offsetHeight*b0xTPortal_data.header_row_count) - 3)+"px";
							}
						} else {
							this.className = "b0xTPortal_nav_collapsed";
							if(b0xTPortal_nav_options) {
								b0xTPortal_nav_options.style.height = "0px";
							}
						}
					}

					b0xTPortal_header_div.appendChild(b0xTPortal_hamburger_icon_wrapper);
				}

				b0xTPortal_host_div.appendChild(b0xTPortal_header_div);

				//navigation options
				var b0xTPortal_nav_options= document.createElement("div");

				b0xTPortal_nav_options.style.display = "flex";
				b0xTPortal_nav_options.style.backgroundColor = "#efefef";
				b0xTPortal_nav_options.style.overflow = "hidden";
				b0xTPortal_nav_options.style.height = "0px";
				b0xTPortal_nav_options.style.transition = "height 0.5s ease-in-out";
				b0xTPortal_nav_options.style.boxShadow = "0 0 5px 0 rgb(208 210 215 / 50%)";
				b0xTPortal_nav_options.style.border = "border: 1px solid #eee";
				b0xTPortal_nav_options.style.borderRadius = "4px";
				b0xTPortal_nav_options.style.flexWrap = "wrap";

				{
					if(typeof(b0xTPortal_data.config.homeNextF) === "function") {
						var b0xTPortal_selected = (b0xTPortal_extra_config.selected == "HOME") ? 1 : 0;
						var b0xTPortal_nav_option = _b0xTPortal_create_nav_option("HOME", "home.png", b0xTPortal_selected);

						b0xTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b0xTPortal_nav_option.onclick = b0xTPortal_data.config.homeNextF;

						b0xTPortal_nav_options.appendChild(b0xTPortal_nav_option);
					}

					if(typeof(b0xTPortal_data.config.profileNextF) === "function") {
						var b0xTPortal_selected = (b0xTPortal_extra_config.selected == "PROFILE") ? 1 : 0;
						var b0xTPortal_nav_option = _b0xTPortal_create_nav_option("PROFILE", "profile.png", b0xTPortal_selected);

						b0xTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b0xTPortal_nav_option.onclick = b0xTPortal_data.config.profileNextF;

						b0xTPortal_nav_options.appendChild(b0xTPortal_nav_option);
					}

					if(typeof(b0xTPortal_data.config.jobsiteNextF) === "function") {
						var b0xTPortal_selected = (b0xTPortal_extra_config.selected == "JOB SITES") ? 1 : 0;
						var b0xTPortal_nav_option = _b0xTPortal_create_nav_option("JOB SITES", "jobsite.png", b0xTPortal_selected);

						b0xTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b0xTPortal_nav_option.onclick = b0xTPortal_data.config.jobsiteNextF;

						b0xTPortal_nav_options.appendChild(b0xTPortal_nav_option);
					}

					if(typeof(b0xTPortal_data.config.workOrderNextF) === "function") {
						var b0xTPortal_selected = (b0xTPortal_extra_config.selected == "WORK ORDERS") ? 1 : 0;
						var b0xTPortal_nav_option = _b0xTPortal_create_nav_option("WORK ORDERS", "workOrders.png", b0xTPortal_selected);

						b0xTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b0xTPortal_nav_option.onclick = b0xTPortal_data.config.workOrderNextF;

						b0xTPortal_nav_options.appendChild(b0xTPortal_nav_option);
					}

					if(typeof(b0xTPortal_data.config.transactionsNextF) === "function") {
						var b0xTPortal_selected = (b0xTPortal_extra_config.selected == "FINANCIALS") ? 1 : 0;
						var b0xTPortal_nav_option = _b0xTPortal_create_nav_option("FINANCIALS", "transactions.jpg", b0xTPortal_selected);

						b0xTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b0xTPortal_nav_option.onclick = b0xTPortal_data.config.transactionsNextF;

						b0xTPortal_nav_options.appendChild(b0xTPortal_nav_option);
					}

					if(typeof(b0xTPortal_data.config.reportsNextF) === "function") {
						var b0xTPortal_selected = (b0xTPortal_extra_config.selected == "REPORTS") ? 1 : 0;
						var b0xTPortal_nav_option = _b0xTPortal_create_nav_option("REPORTS", "reports.png", b0xTPortal_selected);

						b0xTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b0xTPortal_nav_option.onclick = b0xTPortal_data.config.reportsNextF;

						b0xTPortal_nav_options.appendChild(b0xTPortal_nav_option);
					}

					if(typeof(b0xTPortal_data.config.logOutNextF) === "function") {
						var b0xTPortal_selected = (b0xTPortal_extra_config.selected == "LOG OUT") ? 1 : 0;
						var b0xTPortal_nav_option = _b0xTPortal_create_nav_option("LOG OUT", "logout.png", b0xTPortal_selected);

						b0xTPortal_nav_option.style.cursor = "pointer";

						//handler
						b0xTPortal_nav_option.onclick = b0xTPortal_data.config.logOutNextF;

						b0xTPortal_nav_options.appendChild(b0xTPortal_nav_option);
					}

					//place holder
					if(typeof(b0xTPortal_data.config.logOutNextF) === "function") {
						var b0xTPortal_nav_option = _b0xTPortal_create_nav_option("", "", 0);
						b0xTPortal_nav_options.appendChild(b0xTPortal_nav_option);
					}

					//we need to know the rows to dynamiclly calculate height
					b0xTPortal_data.header_row_count = 4;
				}

				b0xTPortal_data.fields["b0xTPortal_nav_options"] = b0xTPortal_nav_options;
				b0xTPortal_host_div.appendChild(b0xTPortal_nav_options);
			}

		}
	}

	function _b0xTPortal_create_nav_option(b0xTPortal_name, b0xTPortal_icon, b0xTPortal_selected) {
		var b0xTPortal_nav = document.createElement("div");

		b0xTPortal_nav.style.width = "100%";
		b0xTPortal_nav.style.height = "40px";
		b0xTPortal_nav.style.padding = "8px";
		b0xTPortal_nav.style.border = "1px solid #e9e8e8";
		b0xTPortal_nav.style.flex = "50%";
		b0xTPortal_nav.style.overflow = "hidden";
		b0xTPortal_nav.style.textOverflow = "ellipsis";
		b0xTPortal_nav.style.whiteSpace = "nowrap";

		if(b0xTPortal_selected) {
			b0xTPortal_nav.style.backgroundColor = "#feff95";	
		}

		if(b0xTPortal_name) {
			b0xTPortal_nav.onmouseover = function() {
				if(b0xTPortal_selected) {} else {
					b0xTPortal_nav.style.backgroundColor = "#e3e3e3";
				}
			}

			b0xTPortal_nav.onmouseout = function() {
				if(b0xTPortal_selected) {} else {
					b0xTPortal_nav.style.backgroundColor = "#efefef";
				}
			}
		}

		if(b0xTPortal_icon) {
			var b0xTPortal_nav_icon = document.createElement("img");
			b0xTPortal_nav_icon.setAttribute("src", b0xTPortal_data.config.image_url+b0xTPortal_icon);

			b0xTPortal_nav_icon.style.height = "20px";
			b0xTPortal_nav_icon.style.marginRight = "10px";
			b0xTPortal_nav_icon.style.verticalAlign = "middle";
			b0xTPortal_nav_icon.style.display = "unset";

			b0xTPortal_nav.appendChild(b0xTPortal_nav_icon);
		}

		var b0xTPortal_nav_span = document.createElement("span");

		b0xTPortal_nav_span.setAttribute("class", "b0xTPortal_no_user_select");

		b0xTPortal_nav_span.style.textDecoration = "none";
		b0xTPortal_nav_span.style.color = b0xTPortal_selected ? "#115d81" : "#404040";
		b0xTPortal_nav_span.style.textShadow = "2px 2px 5px rgb(0 0 0 / 40%)";
		b0xTPortal_nav_span.style.verticalAlign = "middle";

		b0xTPortal_nav_span.innerHTML = "<strong>"+b0xTPortal_name+"</strong>";
		b0xTPortal_nav.appendChild(b0xTPortal_nav_span);

		return b0xTPortal_nav;
	} 

	return this;
}


















	