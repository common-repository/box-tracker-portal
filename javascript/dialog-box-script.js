function b0xTPortal_pop_up_dialog(b0xTPortal_arg_config) {
	var b0xTPortal_dialog_box = this;
	b0xTPortal_dialog_box.config = b0xTPortal_arg_config;

	this._b0xTPortal_init = function(b0xTPortal_header, b0xTPortal_content, b0xTPortal_callBack) {
		//should always exist.
		var b0xTPortal_dialog_container = document.getElementById("b0xTPortal_dialog_box");

		if(b0xTPortal_dialog_box) {
			var b0xTPortal_hostDiv_shield = document.createElement("div");

			b0xTPortal_hostDiv_shield.style.position = "absolute";
			b0xTPortal_hostDiv_shield.style.top = "0px";
			b0xTPortal_hostDiv_shield.style.left = "0px";
			b0xTPortal_hostDiv_shield.style.height = "100%";
			b0xTPortal_hostDiv_shield.style.width = "100%";
			b0xTPortal_hostDiv_shield.style.zIndex = "9998";

			var b0xTPortal_hostDiv = document.createElement("div");

			b0xTPortal_hostDiv.style.position = "absolute";
			b0xTPortal_hostDiv.style.left = "50%";
			b0xTPortal_hostDiv.style.transform = "translate(-50%, 0px)";
			b0xTPortal_hostDiv.style.minHeight = "50px";
			b0xTPortal_hostDiv.style.maxWidth = "275px";
			b0xTPortal_hostDiv.style.background = "#fff";
			b0xTPortal_hostDiv.style.transition = "box-shadow 2s";
			b0xTPortal_hostDiv.style.boxShadow = "0 0 0 1900px hsla(220,7%,18%,0.6), 0 10px 30px -5px hsla(220,7%,18%,0.6)";
			b0xTPortal_hostDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
			b0xTPortal_hostDiv.style.zIndex = "9999";

			//bind the dialogs position
			if(b0xTPortal_dialog_box.config.binder) {
				var b0xTPortal_binder_position = b0xTPortal_dialog_box.config.binder.offsetTop;
				b0xTPortal_hostDiv.style.top = String(b0xTPortal_binder_position)+"px";
			}

			{//header
				var b0xTPortal_header_div = document.createElement("div");

				b0xTPortal_header_div.style.display = "flex";
				b0xTPortal_header_div.style.backgroundColor = "#f5f5f5";
				b0xTPortal_header_div.style.borderBottom = "2px solid #efeeee";
				b0xTPortal_header_div.style.lineHeight = "normal";
				b0xTPortal_header_div.style.marginBottom = "10px";
				b0xTPortal_header_div.style.fontSize = "90%";
				b0xTPortal_header_div.style.fontWeight = "bold";

				{
					var b0xTPortal_first_child = document.createElement("div");

					b0xTPortal_first_child.style.flexGrow = "1";
					b0xTPortal_first_child.style.marginLeft = "10px";

					b0xTPortal_first_child.innerHTML = b0xTPortal_header;
					b0xTPortal_header_div.appendChild(b0xTPortal_first_child);
				}

				{
					var b0xTPortal_second_child = document.createElement("div");

					b0xTPortal_second_child.style.width = "30px";
					b0xTPortal_second_child.style.marginRight = "10px";
					b0xTPortal_second_child.style.textAlign = "right";
					b0xTPortal_second_child.style.cursor = "pointer";

					var b0xTPortal_span = document.createElement("span");

					b0xTPortal_span.innerHTML = "X";

					b0xTPortal_second_child.appendChild(b0xTPortal_span);

					b0xTPortal_second_child.onclick = function() {
						if(typeof(b0xTPortal_callBack) === "function") {
							b0xTPortal_callBack();
						}
						b0xTPortal_dialog_box.b0xTPortal_close_dialog();
					}

					b0xTPortal_header_div.appendChild(b0xTPortal_second_child);
				}

				b0xTPortal_hostDiv.appendChild(b0xTPortal_header_div);
			}	

			{//content
				var b0xTPortal_content_div = document.createElement("div");

				b0xTPortal_content_div.style.marginLeft = "10px";
				b0xTPortal_content_div.style.marginRight = "10px";
				b0xTPortal_content_div.style.marginBottom = "10px";
				b0xTPortal_content_div.style.lineHeight = "normal";
				b0xTPortal_content_div.style.fontSize = "80%";
				b0xTPortal_content_div.style.color = "#ff0000";
				b0xTPortal_content_div.style.fontWeight = "500";

				if(b0xTPortal_content && b0xTPortal_content.tagName) {
					b0xTPortal_content_div.appendChild(b0xTPortal_content);
				} else {
					b0xTPortal_content_div.innerHTML = b0xTPortal_content;
				}


				b0xTPortal_hostDiv.appendChild(b0xTPortal_content_div);
			}

			b0xTPortal_hostDiv_shield.onclick = function() {
				if(typeof(b0xTPortal_callBack) === "function") {
					b0xTPortal_callBack();
				}
				b0xTPortal_dialog_box.b0xTPortal_close_dialog();
			}

			b0xTPortal_hostDiv_shield.appendChild(b0xTPortal_hostDiv);
			b0xTPortal_dialog_container.appendChild(b0xTPortal_hostDiv_shield);

			//store the whole shielded div
			b0xTPortal_dialog_box.shieldDiv = b0xTPortal_hostDiv_shield;
		}
	}

	this.b0xTPortal_open_dialog = function(b0xTPortal_header, b0xTPortal_content) {
		if(b0xTPortal_dialog_box.shieldDiv) {
			b0xTPortal_dialog_box.shieldDiv.remove();
		}

		b0xTPortal_dialog_box._b0xTPortal_init(b0xTPortal_header, b0xTPortal_content);
	}

	this.b0xTPortal_close_dialog = function() {
		if(b0xTPortal_dialog_box.shieldDiv) {
			b0xTPortal_dialog_box.shieldDiv.remove();
		}
	}

	return this;
}