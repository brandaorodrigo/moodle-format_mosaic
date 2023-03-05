<?php

defined('MOODLE_INTERNAL') || die();

global $PAGE, $DB, $CFG;

$color = $DB->get_field_select('course_format_options', 'value', 'courseid = :courseid AND name = :name', ['courseid' => $PAGE->course->id,   'name' => 'color']);

?>
<style>
    :root {
        --course-color: <?php echo $color ?>;
    }

    <?php echo file_get_contents($CFG->dirroot . '/course/format/mosaic/renderer.css') ?>
</style>
<?php
