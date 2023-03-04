<?php

defined('MOODLE_INTERNAL') || die();

global $PAGE, $DB;

$color = $DB->get_field_select(
    'course_format_options',
    'value',
    'courseid = :courseid AND name = :name',
    [
        'courseid' => $PAGE->course->id,
        'name' => 'color'
    ]
);

$PAGE->requires->js('/course/format/mosaic/renderer.js?color=' . str_replace('#', '', $color));
