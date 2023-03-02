<?php

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/format/topics/format.php');

global $PAGE;
$PAGE->requires->js('/course/format/mosaic/format.js');

function url($name)
{
    global $CFG, $course;
    return $CFG->wwwroot . '/course/format/mosaic/base64.php?name=base64_' . $name . '&id=' . $course->id;
}

?>
<style>
    body:not(.editing) .available_percent .completed,
    body:not(.editing) .course-content #section-0,
    body:not(.editing) .button_enter_section {
        background-color: <?php echo $course->color ?> !important;
    }

    .squares .square:nth-child(1) {
        background-image: url(<?php echo url('q1') ?>);
    }

    .squares .square:nth-child(2) {
        background-image: url(<?php echo url('q2') ?>);
    }

    .squares .square:nth-child(3) {
        background-image: url(<?php echo url('q3') ?>);
    }

    .squares .square:nth-child(4) {
        background-image: url(<?php echo url('q4') ?>);
    }

    @media (min-width: 960px) {

        body:not(.editing) .course-content #section-0 {
            background-image: url(<?php echo url('s0') ?>);
        }

        body:not(.editing) .course-content #section-1 {
            background-image: url(<?php echo url('s1') ?>);
        }

        body:not(.editing) .course-content #section-1:hover {
            background-image: url(<?php echo url('s1_hover') ?>);
        }

        body:not(.editing) .course-content #section-1.section-open {
            background-image: url(<?php echo url('s1_full') ?>);
        }

        body:not(.editing) .course-content #section-2 {
            background-image: url(<?php echo url('s2') ?>);
        }

        body:not(.editing) .course-content #section-2:hover {
            background-image: url(<?php echo url('s2_hover') ?>);
        }

        body:not(.editing) .course-content #section-2.section-open {
            background-image: url(<?php echo url('s2_full') ?>);
        }

        body:not(.editing) .course-content #section-3 {
            background-image: url(<?php echo url('s3') ?>);
        }

        body:not(.editing) .course-content #section-3:hover {
            background-image: url(<?php echo url('s3_hover') ?>);
        }

        body:not(.editing) .course-content #section-3.section-open {
            background-image: url(<?php echo url('s3_full') ?>);
        }

        body:not(.editing) .course-content #section-4 {
            background-image: url(<?php echo url('s4') ?>);
        }

        body:not(.editing) .course-content #section-4:hover {
            background-image: url(<?php echo url('s4_hover') ?>);
        }

        body:not(.editing) .course-content #section-4.section-open {
            background-image: url(<?php echo url('s4_full') ?>);
        }
    }
</style>
<div class="squares" id="mosaic_squares">
    <div class="square">
        <?php if ($course->name_q1) : ?>
            <a href="<?php echo $course->href_q1 ?>"><?php echo $course->name_q1 ?></a>
        <?php endif ?>
    </div>
    <div class="square">
        <?php if ($course->name_q2) : ?>
            <a href="<?php echo $course->href_q2 ?>"><?php echo $course->name_q2 ?></a>
        <?php endif ?>
    </div>
    <div class="square">
        <?php if ($course->name_q3) : ?>
            <a href="<?php echo $course->href_q3 ?>"><?php echo $course->name_q3 ?></a>
        <?php endif ?>
    </div>
    <div class="square">
        <?php if ($course->name_q4) : ?>
            <a href="<?php echo $course->href_q4 ?>"><?php echo $course->name_q4 ?></a>
        <?php endif ?>
    </div>
</div>
<?php
