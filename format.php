<?php

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/format/topics/format.php');

global $PAGE;

if (!$PAGE->user_is_editing()) {

    function b64($name)
    {
        global $CFG, $course;
        return $CFG->wwwroot . '/course/format/mosaic/call_img.php?name=base64_' . $name . '&id=' . $course->id;
    }

    $PAGE->requires->js('/course/format/mosaic/format.js');


    session_start();

    var_dump($_SESSION);

    echo 'rodrigo' . $_SESSION['subsection'];

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
            <a href="<?php echo $course->href_start ?>"><?php echo $course->name_start ?>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12,12-5.37,12-12S18.63,0,12,0Zm7.92,12.38c-.05,.12-.12,.23-.22,.33l-7,7c-.2,.2-.45,.29-.71,.29s-.51-.1-.71-.29c-.39-.39-.39-1.02,0-1.41l5.29-5.29H5c-.55,0-1-.45-1-1s.45-1,1-1h11.59l-5.29-5.29c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l7,7c.09,.09,.17,.2,.22,.33,.1,.24,.1,.52,0,.76Z" />
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
