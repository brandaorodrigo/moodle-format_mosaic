<?php

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/format/topics/format.php');

global $PAGE;

if (!$PAGE->user_is_editing()) {

    $PAGE->requires->js('/course/format/mosaic/format.js');

    function b64($name)
    {
        global $CFG, $course;
        return $CFG->wwwroot . '/course/format/mosaic/img.php?name=base64_' . $name . '&id=' . $course->id;
    }

    // echo '<style>' . file_get_contents($CFG->dirroot . '/course/format/mosaic/format.css') . '</style>';

?>
    <style>
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

        .mosaic_icon.assign {
            background-image: url(<?php echo b64('i_assign') ?>);
        }

        .mosaic_icon.chat {
            background-image: url(<?php echo b64('i_chat') ?>);
        }

        .mosaic_icon.choice {
            background-image: url(<?php echo b64('i_choice') ?>);
        }

        .mosaic_icon.data {
            background-image: url(<?php echo b64('i_data') ?>);
        }

        .mosaic_icon.feedback {
            background-image: url(<?php echo b64('i_feedback') ?>);
        }

        .mosaic_icon.forum {
            background-image: url(<?php echo b64('i_forum') ?>);
        }

        .mosaic_icon.glossary {
            background-image: url(<?php echo b64('i_glossary') ?>);
        }

        .mosaic_icon.lesson {
            background-image: url(<?php echo b64('i_lesson') ?>);
        }

        .mosaic_icon.lti {
            background-image: url(<?php echo b64('i_lti') ?>);
        }

        .mosaic_icon.quiz {
            background-image: url(<?php echo b64('i_quiz') ?>);
        }

        .mosaic_icon.survey {
            background-image: url(<?php echo b64('i_survey') ?>);
        }

        .mosaic_icon.wiki {
            background-image: url(<?php echo b64('i_wiki') ?>);
        }

        .mosaic_icon.workshop {
            background-image: url(<?php echo b64('i_workshop') ?>);
        }

        #section-0 {
            background-image: url(<?php echo b64('s0') ?>);
        }

        @media (min-width: 960px) {

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
            <a href="<?php echo $course->href_start ?>"><?php echo $course->name_start ?>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path d="M45.3,15c-1.2-2.8-2.8-5.2-4.9-7.3c-2.1-2.1-4.5-3.7-7.3-4.9c-2.8-1.2-5.8-1.8-9.1-1.8c-3.3,0-6.3,0.6-9.1,1.8c-2.8,1.2-5.3,2.8-7.3,4.9C5.5,9.7,3.9,12.1,2.7,15c-1.2,2.8-1.8,5.8-1.8,9.1c0,3.3,0.6,6.3,1.8,9.1c1.2,2.8,2.8,5.3,4.9,7.3c2.1,2.1,4.5,3.7,7.3,4.9c2.8,1.2,5.8,1.8,9.1,1.8h0c3.2,0,6.3-0.6,9.1-1.8c2.8-1.2,5.2-2.8,7.3-4.9c2.1-2.1,3.7-4.5,4.9-7.3c1.2-2.8,1.8-5.8,1.8-9.1C47.1,20.8,46.5,17.8,45.3,15z M38.7,24.7c-0.1,0.2-0.2,0.4-0.4,0.6L26.6,37c-0.4,0.4-0.9,0.6-1.4,0.6c-0.5,0-1-0.2-1.4-0.6c-0.4-0.4-0.6-0.8-0.6-1.4c0-0.5,0.2-1,0.6-1.4l8.3-8.4H11.1c-0.6,0-1-0.2-1.4-0.6C9.4,25,9.2,24.6,9.2,24s0.2-1,0.6-1.4c0.4-0.4,0.8-0.6,1.4-0.6h21.1l-8.3-8.4c-0.4-0.4-0.6-0.8-0.6-1.3c0-0.5,0.2-1,0.6-1.4c0.4-0.4,0.8-0.6,1.3-0.6c0.5,0,1,0.2,1.4,0.6l11.6,11.6c0.2,0.2,0.4,0.4,0.5,0.7s0.1,0.5,0.1,0.7S38.8,24.5,38.7,24.7z" />
                </svg>
            </a>
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
