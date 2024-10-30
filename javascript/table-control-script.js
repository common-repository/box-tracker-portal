function b0xTPortal_table_control(b0xTPortal_arg_config) {
	var b0xTPortal_data = this;
	b0xTPortal_data.config = b0xTPortal_arg_config;
	b0xTPortal_data.value = 0;
	b0xTPortal_data.record_count = 0;
	b0xTPortal_data.selected = undefined;

	this.b0xTPortal_attach_handlers = function(b0xTPortal_tr) {
		if(b0xTPortal_tr) {
			var b0xTPortal_class = b0xTPortal_data.record_count++ % 2 ? "b0xTPortal_odd" : "b0xTPortal_even";
			b0xTPortal_tr.setAttribute("class", b0xTPortal_class);

			b0xTPortal_tr.onclick = function() {
				if(b0xTPortal_data.selected) {
					b0xTPortal_data.selected.style.removeProperty("background-color");
				}

				//update some values
				b0xTPortal_data.selected = b0xTPortal_tr;
				b0xTPortal_data.value = this.id.split("_")[1];
				this.style.backgroundColor = "#feff95";
			}
		}
	}

	this.b0xTPortal_validate = function() {
		if(b0xTPortal_data.selected && b0xTPortal_data.config.table_wrapper) {
			b0xTPortal_data.config.table_wrapper.style.border = "none";
			return 1;
		}

		if(b0xTPortal_data.config.table_wrapper) {
			b0xTPortal_data.config.table_wrapper.style.border = "1px solid #ff0000";
		}
		
		return 0;
	}

	return this;
}