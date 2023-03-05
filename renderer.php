<?php

defined('MOODLE_INTERNAL') || die();

global $PAGE, $DB, $CFG;

if (!$PAGE->user_is_editing()) {

    $color = $DB->get_field_select('course_format_options', 'value', 'courseid = :courseid AND name = :name', ['courseid' => $PAGE->course->id,   'name' => 'color']);

    $PAGE->requires->js('/course/format/mosaic/renderer.js');

    echo '<style> :root { --course-color: ' . $color . '; } </style>';
    //echo `<link rel="stylesheet" type="text/css" href="{$CFG->dirroot}/course/format/mosaic/renderer.css"></link>`;
    //echo `<link rel="stylesheet" type="text/css" href="{$CFG->dirroot}/course/format/mosaic/format.css"></link>`;
    echo '<style>' .  file_get_contents($CFG->dirroot . '/course/format/mosaic/renderer.css') . '</style>';
    echo '<style>' . file_get_contents($CFG->dirroot . '/course/format/mosaic/format.css') . '</style>';
}
