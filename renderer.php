<?php

defined('MOODLE_INTERNAL') || die();

global $PAGE, $DB, $CFG;

$color = $DB->get_field_select(
    'course_format_options',
    'value',
    'courseid = :courseid AND name = :name',
    [
        'courseid' => $PAGE->course->id,
        'name' => 'color'
    ]
);

?>
<style>
    <?php echo file_get_contents($CFG->dirroot . '/course/format/mosaic/renderer.css') ?>
</style>
<style>
    .btn-primary {
        background: <?php echo $color ?> !important;
        border: 0 !important;
        color: #fff !important;
    }

    #page a.nav-link:not(.active),
    #page .breadcrumb-item a {
        color: <?php echo $color ?> !important;
    }

    .custom-control-input:checked~.custom-control-label::before {
        background: <?php echo $color ?> !important;
        border: 0 !important;
    }

    .moremenu .nav-link.active {
        border-bottom-color: <?php echo $color ?> !important;
    }

    .btn-link {
        color: <?php echo $color ?> !important;
    }
</style>
<?php
