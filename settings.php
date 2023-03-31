<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
/**
 * @package   local_smartclippy
 * @copyright 2023 Swarthmore College ITS
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

global $CFG;
global $ADMIN;

$settings = new admin_settingpage('local_a11y_check', get_string('pluginname', 'local_smartclippy'));

$ADMIN->add('localplugins', $settings);

$settings->add(new admin_setting_configtext(
    'local_smartclippy/apiurl',
    get_string('settings:server_url', 'local_smartclippy'),
    get_string('settings:server_url_desc', 'local_smartclippy'),
    '',
    PARAM_TEXT,
    128));
