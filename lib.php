<?php

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/format/topics/lib.php');

class format_mosaic extends format_topics
{
    public function get_default_section_name($section)
    {
        if ($section->section == 0) {
            return get_string('section0name', 'format_mosaic');
        } else {
            return parent::get_default_section_name($section);
        }
    }

    public function course_format_options($foreditform = false)
    {
        $mosaic = [
            'color',

            'name_module',

            'name_start',
            'href_start',

            'name_q1',
            'href_q1',
            'base64_q1',

            'name_q2',
            'href_q2',
            'base64_q2',

            'name_q3',
            'href_q3',
            'base64_q3',

            'name_q4',
            'href_q4',
            'base64_q4',

            'base64_s0',

            'base64_s1',
            'base64_s1_hover',
            'base64_s1_full',

            'base64_s2',
            'base64_s2_hover',
            'base64_s2_full',

            'base64_s3',
            'base64_s3_hover',
            'base64_s3_full',

            'base64_s4',
            'base64_s4_hover',
            'base64_s4_full',

            'base64_i_assign',
            'base64_i_chat',
            'base64_i_choice',
            'base64_i_data',
            'base64_i_feedback',
            'base64_i_forum',
            'base64_i_glossary',
            'base64_i_lesson',
            'base64_i_lti',
            'base64_i_quiz',
            'base64_i_survey',
            'base64_i_wiki',
            'base64_i_workshop',

            'css_extra'
        ];

        $parent = parent::course_format_options($foreditform);
        $courseconfig = get_config('moodlecourse');
        foreach ($mosaic as $m) {
            $help = null;
            if (stristr($m, 'base64_q')) $help = 'size_s';
            if (stristr($m, 'base64_s') && !stristr($m, '_full')) $help = 'size_m';
            if (stristr($m, 'base64_s') && stristr($m, '_full')) $help = 'size_l';
            if (stristr($m, 'base64_i')) $help = 'size_i';
            $parent[$m] = [
                'default' => @$courseconfig->{$m} ?: null,
                'type' => PARAM_TEXT,
                'label' => get_string($m, 'format_mosaic'),
                'help' => $help,
                'help_component' => 'format_mosaic',
                'element_type' => stristr($m, 'css') ? 'textarea' : 'text',
            ];
        }
        global $PAGE;
        $PAGE->requires->js('/course/format/mosaic/lib.js');
        return $parent;
    }
}

function format_mosaic_inplace_editable($itemtype, $itemid, $newvalue)
{
    global $DB, $CFG;
    require_once($CFG->dirroot . '/course/lib.php');
    if ($itemtype === 'sectionname' || $itemtype === 'sectionnamenl') {
        $section = $DB->get_record_sql(
            'SELECT s.* FROM {course_sections} s JOIN {course} c ON s.course = c.id WHERE s.id = ? AND c.format = ?',
            [$itemid, 'mosaic'],
            MUST_EXIST
        );
        return course_get_format($section->course)->inplace_editable_update_section_name($section, $itemtype, $newvalue);
    }
}
