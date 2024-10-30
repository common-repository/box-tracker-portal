<div class="wrap">
	<div id="b0xTPortal_setting_logo_div">
		<img src="<?php echo esc_url($this->b0xTPortal_plugin_url.'images/logo.png') ?>">
	</div>

	<?php settings_errors(); ?>

	<form id="b0xTPortal_setting_form" method="post" action="options.php">
		<?php
			settings_fields('b0xTPortal_setting_group');
			do_settings_sections('box-tracker-portal');
		?>

		<table class="form-table">
			<tbody>
				<tr valign="top">
					<th scope="row">Page Title</th>
					<td><input type="text" name="b0xTPortal_page_title" value="<?php echo esc_attr(sanitize_text_field(get_option('b0xTPortal_page_title'))); ?>"></td>
				</tr>
				<tr valign="top">
					<th scope="row">Username</th>
					<td><input type="text" name="b0xTPortal_username" value="<?php echo esc_attr(sanitize_text_field(get_option('b0xTPortal_username'))); ?>"></td>
				</tr>
				<tr valign="top">
					<th scope="row">Password</th>
					<td><input type="password" name="b0xTPortal_password" value="<?php echo esc_attr(sanitize_text_field(get_option('b0xTPortal_password'))); ?>"></td>
				</tr>
				<tr valign="top">
					<th scope="row">Postalcode/Zipcode Label </th>
					<td><input type="text" name="b0xTPortal_zipcode_label" value="<?php echo esc_attr(sanitize_text_field(get_option('b0xTPortal_zipcode_label'))); ?>"></td>
				</tr>
				<tr valign="top">
					<th scope="row">Country</th>
					<td>
						<select name="b0xTPortal_admin_country">
							<option value="United States" <?php selected(esc_attr(sanitize_text_field(get_option('b0xTPortal_admin_country'))), 'United States'); ?>>United States</option>
							<option value="Canada" <?php selected(esc_attr(sanitize_text_field(get_option('b0xTPortal_admin_country'))), 'Canada'); ?>>Canada</option>
						</select>
					</td>
				</tr>
				<tr valign="top">
					<th scope="row">Google API Key</th>
					<td>
						<input type="text" name="b0xTPortal_google_api_key" value="<?php echo esc_attr(sanitize_text_field(get_option('b0xTPortal_google_api_key'))); ?>">
						<a href="https://developers.google.com/places/web-service/get-api-key" target="_blank">How to get api key?</a>
					</td>
				</tr>
				<tr valign="top">
					<th scope="row">Mode</th>
					<td>
						<select name="b0xTPortal_mode">
							<option value="TEST" <?php selected(esc_attr(sanitize_text_field(get_option('b0xTPortal_mode'))), 'TEST'); ?>>Test</option>
							<option value="LIVE" <?php selected(esc_attr(sanitize_text_field(get_option('b0xTPortal_mode'))), 'LIVE'); ?>>Live</option>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
		
		<?php submit_button(); ?>
	</form>
</div>