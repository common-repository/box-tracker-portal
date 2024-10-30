function b0xTPortal_slide_up_dialog(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;

	function _b0xTPortal_build_dialog(b0xTPortal_title, b0xTPortal_nextF) {
		//dialog box
		b0xTPortal_data.dBox = document.createElement("div");

		b0xTPortal_data.dBox.style.display = "none";
		b0xTPortal_data.dBox.style.position = "absolute";
		b0xTPortal_data.dBox.style.bottom = "0px";
		b0xTPortal_data.dBox.style.left = "0px";
		b0xTPortal_data.dBox.style.width = "100%";
		b0xTPortal_data.dBox.style.minHeight = "100px";
		b0xTPortal_data.dBox.style.zIndex = "998";
		b0xTPortal_data.dBox.style.backgroundColor = "#f3f3f3";	

		//header
		var b0xTPortal_div_header = document.createElement("div");

		b0xTPortal_div_header.style.backgroundColor = "#1782b5";
		b0xTPortal_div_header.style.display = "inline-block";
		b0xTPortal_div_header.style.width = "100%";

		{
			var b0xTPortal_div_header_title = document.createElement("div");

			b0xTPortal_div_header_title.innerHTML = b0xTPortal_title

			b0xTPortal_div_header_title.style.display = "inline-block";
			b0xTPortal_div_header_title.style.fontWeight = "900";
			b0xTPortal_div_header_title.style.fontSize = "larger";
			b0xTPortal_div_header_title.style.padding = "5px";
			b0xTPortal_div_header_title.style.color = "#ffffff";

			b0xTPortal_div_header.appendChild(b0xTPortal_div_header_title);
		}

		{
			var b0xTPortal_div_header_exit = document.createElement("div");

			b0xTPortal_div_header_exit.style.display = "inline-block";
			b0xTPortal_div_header_exit.style.fontWeight = "900";
			b0xTPortal_div_header_exit.style.fontSize = "larger";
			b0xTPortal_div_header_exit.style.padding = "5px";
			b0xTPortal_div_header_exit.style.marginRight = "5px";
			b0xTPortal_div_header_exit.style.color = "#ffffff";
			b0xTPortal_div_header_exit.style.cursor = "pointer";
			b0xTPortal_div_header_exit.style.cssFloat = "right";

			b0xTPortal_div_header_exit.innerHTML = "X";

			b0xTPortal_div_header_exit.onclick = function() {
				b0xTPortal_data.b0xTPortal_close();
			}

			b0xTPortal_div_header.appendChild(b0xTPortal_div_header_exit);
		}

		b0xTPortal_data.dBox.appendChild(b0xTPortal_div_header);

		//content
		var b0xTPortal_div_content = document.createElement("div");

		b0xTPortal_div_content.style.padding = "10px";
		b0xTPortal_div_content.style.fontSize = "larger";

		b0xTPortal_data.dBox.appendChild(b0xTPortal_div_content);

		if(typeof(b0xTPortal_data.config.behaviors) === "function") {
			b0xTPortal_data.config.behaviors(b0xTPortal_div_content, b0xTPortal_nextF);
		}
	}

	function _b0xTPortal_set_defaults() {
		if(b0xTPortal_data.config.container == undefined) { //temp container
			b0xTPortal_data.config.container = document.createElement("div"); 
		}
	}

	function _b0xTPortal_open_overlay() {
		if(b0xTPortal_data.config.overlay == undefined) { return false; }

		b0xTPortal_data.config.overlay.style.display = "block";
		b0xTPortal_data.config.overlay.style.position = "absolute";
		b0xTPortal_data.config.overlay.style.bottom = "0px";
		b0xTPortal_data.config.overlay.style.left = "0px";
		b0xTPortal_data.config.overlay.style.width = "100%";
		b0xTPortal_data.config.overlay.style.height = "100%";
		b0xTPortal_data.config.overlay.style.opacity = "0.5";
		b0xTPortal_data.config.overlay.style.zIndex = "997";
		b0xTPortal_data.config.overlay.style.backgroundColor = "#efeeee";

		return true;
	}

	this.b0xTPortal_open = function(b0xTPortal_title, b0xTPortal_nextF) {
		if(_b0xTPortal_open_overlay()) {
			_b0xTPortal_build_dialog(b0xTPortal_title, b0xTPortal_nextF);
			b0xTPortal_data.config.container.appendChild(b0xTPortal_data.dBox);
			b0xTPortal_data.dBox.style.display = "block";
			return;
		}
	}

	this.b0xTPortal_close = function() {
		b0xTPortal_data.config.container.removeChild(b0xTPortal_data.dBox);
		b0xTPortal_data.config.overlay.style.display = "none";
	}

	_b0xTPortal_set_defaults();
	return this;
}