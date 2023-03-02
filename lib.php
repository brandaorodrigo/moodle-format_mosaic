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
            'color_main',

            'text_square1',
            'link_square1',

            'text_square2',
            'link_square2',

            'text_square3',
            'link_square3',

            'text_square4',
            'link_square4',

            'base64_section0',

            'base64_section1',
            'base64_section1_hover',
            'base64_section1_full',

            'base64_section2',
            'base64_section2_hover',
            'base64_section2_full',

            'base64_section3',
            'base64_section3_hover',
            'base64_section3_full',

            'base64_section4',
            'base64_section4_hover',
            'base64_section4_full',
        ];

        $parent = parent::course_format_options($foreditform);
        $courseconfig = get_config('moodlecourse');
        foreach ($mosaic as $m) {
            $parent[$m] = [
                'default' => $courseconfig->{$m},
                'type' => PARAM_TEXT,
                'label' => get_string($m, 'format_mosaic'),
                'element_type' => 'text',
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
