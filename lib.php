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
 * @copyright 2023 Swarthmore College
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

function local_smartclippy_extend_navigation(global_navigation $nav) {
    global $PAGE;
    if ($PAGE->pagelayout == "course") {
        global $COURSE;
        global $USER;
        global $CFG;
        echo "<link rel='stylesheet' href='$CFG->wwwroot/local/smartclippy/app/dist/index.css' />";
        echo "<link rel='stylesheet' href='$CFG->wwwroot/local/smartclippy/css/plugin.css' />";
        echo '<div id="root" class="stick-to-bottom-right"></div>';
        echo "<script src='$CFG->wwwroot/local/smartclippy/app/dist/index.js'></script>";
    }
}