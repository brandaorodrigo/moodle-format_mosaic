<?php

defined('MOODLE_INTERNAL') || die();

global $PAGE, $DB, $CFG;

if (!$PAGE->user_is_editing()) {
    $color = $DB->get_field_select('course_format_options', 'value', 'courseid = :courseid AND name = :name', ['courseid' => $PAGE->course->id, 'name' => 'color']);
    $css = ':root { --course-color: ' . $color . '; }';
    $PAGE->requires->css('/course/format/mosaic/css.php?css=' . base64_encode($css));

    $PAGE->requires->css('/course/format/mosaic/renderer.css');
    $PAGE->requires->js('/course/format/mosaic/renderer.js?courseid=' . $PAGE->course->id);

    $PAGE->requires->css('/course/format/mosaic/format.css');
}
