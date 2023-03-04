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

            'base64_icon_database',
            'base64_icon_chat',
            'base64_icon_choice',
            'base64_icon_external',
            'base64_icon_forum',
            'base64_icon_glossario',
            'base64_icon_h5p',
            'base64_icon_laboratorio',
            'base64_icon_licao',
            'base64_icon_scorm',
            'base64_icon_pesquisa',
            'base64_icon_pesquisaavaliacao',
            'base64_icon_questionario',
            'base64_icon_tarefa',
            'base64_icon_wiki',

            'css_extra'
        ];

        $parent = parent::course_format_options($foreditform);
        $courseconfig = get_config('moodlecourse');
        foreach ($mosaic as $m) {
            $parent[$m] = [
                'default' => $courseconfig->{$m},
                'type' => PARAM_TEXT,
                'label' => get_string($m, 'format_mosaic'),
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
