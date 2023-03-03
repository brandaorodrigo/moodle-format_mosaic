<?php

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/format/topics/format.php');

global $PAGE;

if (!$PAGE->user_is_editing()) {

    function b64($name)
    {
        global $CFG, $course;
        return $CFG->wwwroot . '/course/format/mosaic/base64.php?name=base64_' . $name . '&id=' . $course->id;
    }

    $PAGE->requires->js('/course/format/mosaic/format.js');

?>
    <style>
        #page-course-view-mosaic #page-content {
            display: none;
        }

        #section-0,
        .button_enter_section,
        .available_percent .completed {

            background-color: <?php echo $course->color ?> !important;
        }

        .squares .square:nth-child(1) {
            background-image: url(<?php echo b64('q1') ?>);
        }

        .squares .square:nth-child(2) {
            background-image: url(<?php echo b64('q2') ?>);
        }

        .squares .square:nth-child(3) {
            background-image: url(<?php echo b64('q3') ?>);
        }

        .squares .square:nth-child(4) {
            background-image: url(<?php echo b64('q4') ?>);
        }

        @media (min-width: 960px) {
            #section-0 {
                background-image: url(<?php echo b64('s0') ?>);
            }

            #section-1 {
                background-image: url(<?php echo b64('s1') ?>);
            }

            #section-1:hover {
                background-image: url(<?php echo b64('s1_hover') ?>);
            }

            #section-1.section-open {
                background-image: url(<?php echo b64('s1_full') ?>);
            }

            #section-2 {
                background-image: url(<?php echo b64('s2') ?>);
            }

            #section-2:hover {
                background-image: url(<?php echo b64('s2_hover') ?>);
            }

            #section-2.section-open {
                background-image: url(<?php echo b64('s2_full') ?>);
            }

            #section-3 {
                background-image: url(<?php echo b64('s3') ?>);
            }

            #section-3:hover {
                background-image: url(<?php echo b64('s3_hover') ?>);
            }

            #section-3.section-open {
                background-image: url(<?php echo b64('s3_full') ?>);
            }

            #section-4 {
                background-image: url(<?php echo b64('s4') ?>);
            }

            #section-4:hover {
                background-image: url(<?php echo b64('s4_hover') ?>);
            }

            #section-4.section-open {
                background-image: url(<?php echo b64('s4_full') ?>);
            }
        }

        <?php echo $course->css_extra ?>
    </style>
    <?php if ($course->name_start) : ?>
        <div class="mosaic_start" id="mosaic_start">
            <a href="<?php echo $course->href_start ?>"><?php echo $course->name_start ?></a>
        </div>
    <?php endif ?>
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
}
