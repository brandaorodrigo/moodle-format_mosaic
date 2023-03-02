<?php

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/format/topics/format.php');

global $PAGE;
$PAGE->requires->js('/course/format/mosaic/format.js');

function url($name, $id)
{
    global $CFG;
    return $CFG->wwwroot . '/course/format/mosaic/base64.php?name=' . $name . '&id=' . $id;
}

echo '<style>

body:not(.editing) .available_percent .completed,
body:not(.editing) .course-content #section-0,
body:not(.editing) .button_enter_section {
    background-color: ' . $course->color_main . ' !important;
}

body:not(.editing) .course-content #section-0 {
    background-color: ' . $course->color_main . ' !important;
    background-image: url(' . url('base64_section0', $course->id) . ');
}

body:not(.editing) .course-content #section-1 {
    background-image: url(' . url('base64_section1', $course->id) . ');
}

body:not(.editing) .course-content #section-1:hover {
    background-image: url(' . url('base64_section1_hover', $course->id) . ');
}

body:not(.editing) .course-content #section-1.section-open {
    background-image: url(' . url('base64_section1_full', $course->id) . ') !important;
}

body:not(.editing) .course-content #section-2 {
    background-image: url(' . url('base64_section2', $course->id) . ');
}

body:not(.editing) .course-content #section-2:hover {
    background-image: url(' . url('base64_section2_hover', $course->id) . ');
}

body:not(.editing) .course-content #section-2.section-open {
    background-image: url(' . url('base64_section2_full', $course->id) . ') !important;
}

body:not(.editing) .course-content #section-3 {
    background-image: url(' . url('base64_section3', $course->id) . ');
}

body:not(.editing) .course-content #section-3:hover {
    background-image: url(' . url('base64_section3_hover', $course->id) . ');
}

body:not(.editing) .course-content #section-3.section-open {
    background-image: url(' . url('base64_section3_full', $course->id) . ') !important;
}

body:not(.editing) .course-content #section-4 {
    background-image: url(' . url('base64_section4', $course->id) . ');
}

body:not(.editing) .course-content #section-4:hover {
    background-image: url(' . url('base64_section4_hover', $course->id) . ');
}

body:not(.editing) .course-content #section-4.section-open {
    background-image: url(' . url('base64_section4_full', $course->id) . ') !important;
}

</style>';
