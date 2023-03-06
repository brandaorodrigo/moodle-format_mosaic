// =============================================================================
// funcao - exibe ou oculta sessao
// =============================================================================

const onChangeSection = (number, action) => {
    const section = document.querySelector(number);
    if (section) {
        const ul = section.querySelector('ul.section');
        if (action) {
            section.style.zIndex = 999;
            self.location.hash = number;
            section.classList.add('section-open');
            ul.classList.add('force-display');
            document.cookie = `section=${number}; max-age=3600; path=/;`;
        } else {
            self.location.hash = '';
            section.classList.remove('section-open');
            ul.classList.remove('force-display');
            setTimeout(() => {
                section.style.zIndex = 99;
                document.cookie = `section=undefined; max-age=3600; path=/;`;
            }, 400);
        }
    }
};

// =============================================================================
// funcao - exibe ou oculta subsessao
// =============================================================================

const onChangeSubSection = (number) => {
    const current = document.querySelector('#activities_sub_' + number);
    const opened = current?.style?.display === 'block' ? true : false;
    const list = document.querySelectorAll('.activities_refactor h4');
    list.forEach((l) => l.classList.remove('open'));
    const all = document.querySelectorAll('.activities_sub');
    all.forEach((a) => (a.style.display = 'none'));
    if (opened) return;
    if (current) {
        document
            .querySelector('#subsection_h4_' + number)
            .classList.add('open');
        current.style.display = 'block';
        document.cookie = `subsection=${number}; max-age=3600; path=/;`;
    }
};

// =============================================================================
// funcao - exibe barra de porcentagem
// =============================================================================

const appendAvailablePercent = (value, element) => {
    const html = document.createElement('div');
    html.className = 'available_percent';
    html.innerHTML = `
        ${value}%
        <div class="total">
            <div class="completed" style="width:${
                value != 0 ? value : 3
            }%"></div>
        </div>
        `;
    element.prepend(html);
};

// =============================================================================
// funcao - calcula barra de porcentagem
// =============================================================================

const appendActivityPercent = (pill, element) => {
    if (pill && pill.length) {
        let total = 0;
        let completed = 0;
        pill.forEach((e) => {
            total = total + 1;
            const inner = e.innerHTML;
            if (inner.indexOf('Feito:') !== -1) {
                completed = completed + 1;
            }
        });
        const value = Math.ceil((100 / total) * completed);
        appendAvailablePercent(value, element);
    } else {
        appendAvailablePercent(0, element);
    }
};

// =============================================================================
// módulos
// =============================================================================

const courseSection = document.querySelectorAll('.course-section');
if (courseSection && courseSection.length) {
    courseSection.forEach((each) => {
        const modules = each.getAttribute('data-number');
        if (modules == 0) return;

        // =====================================================================
        // módulo - numero
        // =====================================================================

        const Div = document.createElement('div');
        Div.className = 'module_badge';
        Div.innerHTML = 'Modulo ' + modules;
        each.prepend(Div);

        // =====================================================================
        // módulo - cabecalho
        // =====================================================================

        const Header = document.createElement('div');
        Header.className = 'mosaic_header';
        each.prepend(Header);

        // =====================================================================
        // módulo - calcula porcentagem concluida
        // =====================================================================

        const activity_count = each.querySelectorAll('span.activity-count');
        const pill = each.querySelectorAll('.badge-pill:last-child strong');

        if (activity_count && activity_count.length) {
            activity_count.forEach((e) => {
                const inner = e.innerHTML;
                if (inner.indexOf('Progresso:') !== -1) {
                    const numbers = inner
                        .replace('Progresso: ', '')
                        .split(' / ')
                        .map((e) => Number(e));
                    const value = Math.ceil((100 / numbers[1]) * numbers[0]);
                    appendAvailablePercent(value, Header);
                }
            });
        } else if (pill && pill.length) {
            appendActivityPercent(pill, Header);
        } else {
            appendActivityPercent(pill, Header);
        }

        // =====================================================================
        // módulo - data de abertura
        // =====================================================================

        const date = each.querySelector(
            '.section_availability .availabilityinfo .description-inner strong'
        );
        if (date && date.innerHTML) {
            const Div = document.createElement('div');
            Div.className = 'available_date';
            Div.innerHTML = `${date.innerHTML}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M32.3,16.8h-2.1v-5.6c0-2.7-1.1-5.3-3-7.3s-4.5-3-7.3-3s-5.3,1.1-7.3,3s-3,4.5-3,7.3v5.6H7.7c-2.8,0-5,2.2-5,5v12.3c0,2.8,2.2,5,5,5h24.7c2.7,0,5-2.2,5-5V21.8C37.3,19,35.1,16.8,32.3,16.8z M12.6,11.2c0-2,0.8-3.8,2.1-5.2S18,3.8,20,3.8s3.8,0.8,5.2,2.1s2.1,3.2,2.1,5.2v5.6H12.6V11.2z M34.4,34.1c0,1.1-0.9,2.1-2.1,2.1H7.7c-1.1,0-2.1-0.9-2.1-2.1V21.8c0-1.1,0.9-2.1,2.1-2.1h24.7c1.1,0,2.1,0.9,2.1,2.1C34.4,21.8,34.4,34.1,34.4,34.1z"/></svg>`;
            Header.append(Div);
        }

        // =====================================================================
        // atividades
        // =====================================================================

        const activities = each.querySelectorAll(
            'li.activity:not(.modtype_label)'
        );
        if (activities && activities.length) {
            activities.forEach((e) => {
                // =============================================================
                // atividade - icone entrar
                // =============================================================

                const a = e.querySelector('.activityname a');
                const Enter = document.createElement('div');
                Enter.className = 'moisaic_activity_enter';
                Enter.onclick = () => (location.href = a.href);
                Enter.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M45.3,15c-1.2-2.8-2.8-5.2-4.9-7.3c-2.1-2.1-4.5-3.7-7.3-4.9c-2.8-1.2-5.8-1.8-9.1-1.8c-3.3,0-6.3,0.6-9.1,1.8c-2.8,1.2-5.3,2.8-7.3,4.9C5.5,9.7,3.9,12.1,2.7,15c-1.2,2.8-1.8,5.8-1.8,9.1c0,3.3,0.6,6.3,1.8,9.1c1.2,2.8,2.8,5.3,4.9,7.3c2.1,2.1,4.5,3.7,7.3,4.9c2.8,1.2,5.8,1.8,9.1,1.8h0c3.2,0,6.3-0.6,9.1-1.8c2.8-1.2,5.2-2.8,7.3-4.9c2.1-2.1,3.7-4.5,4.9-7.3c1.2-2.8,1.8-5.8,1.8-9.1C47.1,20.8,46.5,17.8,45.3,15z M38.7,24.7c-0.1,0.2-0.2,0.4-0.4,0.6L26.6,37c-0.4,0.4-0.9,0.6-1.4,0.6c-0.5,0-1-0.2-1.4-0.6c-0.4-0.4-0.6-0.8-0.6-1.4c0-0.5,0.2-1,0.6-1.4l8.3-8.4H11.1c-0.6,0-1-0.2-1.4-0.6C9.4,25,9.2,24.6,9.2,24s0.2-1,0.6-1.4c0.4-0.4,0.8-0.6,1.4-0.6h21.1l-8.3-8.4c-0.4-0.4-0.6-0.8-0.6-1.3c0-0.5,0.2-1,0.6-1.4c0.4-0.4,0.8-0.6,1.3-0.6c0.5,0,1,0.2,1.4,0.6l11.6,11.6c0.2,0.2,0.4,0.4,0.5,0.7s0.1,0.5,0.1,0.7S38.8,24.5,38.7,24.7z"/></svg>`;
                e.appendChild(Enter);

                // =============================================================
                // atividade - icone de completo e incompleto
                // =============================================================

                const pill = e.querySelector('.badge-pill:last-child strong');
                if (pill) {
                    const Div = document.createElement('div');
                    const s = pill.innerHTML.indexOf('Feito:') !== -1;
                    Div.className = 'progress_activity ' + (!s && 'wait');
                    Div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M14,33.8c-0.3,0-0.6-0.1-0.9-0.2c-0.3-0.1-0.5-0.3-0.8-0.5L1.6,22.4c-0.5-0.5-0.7-1-0.7-1.7c0-0.7,0.2-1.2,0.7-1.7c0.5-0.5,1-0.7,1.7-0.7c0.6,0,1.2,0.2,1.7,0.7l9,9L35,7c0.5-0.5,1-0.7,1.7-0.7c0.6,0,1.2,0.2,1.7,0.7c0.5,0.5,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7L15.6,33.1c-0.2,0.2-0.5,0.4-0.8,0.5C14.6,33.7,14.3,33.8,14,33.8z" /></svg>`;
                    a.insertBefore(Div, a.firstChild);
                }

                // =============================================================
                // atividade - icone nos recursos (menos page e resource)
                // =============================================================

                const type = Object.keys(e.classList).find((i) => {
                    return e.classList[i].indexOf('modtype_') != -1;
                });
                const modtype = e.classList[type].replace('modtype_', '');
                if (modtype !== 'resource' && modtype !== 'page') {
                    const Icon = document.createElement('div');
                    Icon.className = 'mosaic_icon ' + modtype;
                    e.querySelector('.activityname a').appendChild(Icon);
                }
            });

            // =================================================================
            // atividade - botao entrar/sair
            // =================================================================

            const number = each.getAttribute('data-number');
            if (number > 0) {
                const Enter = document.createElement('button');
                Enter.className = 'button_enter_section';
                Enter.innerHTML = 'Entrar';
                each.append(Enter);

                const Back = document.createElement('button');
                Back.className = 'button_back_section';
                Back.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                <path d="M20.1,0.6C9.3,0.6,0.6,9.3,0.6,20.1s8.7,19.5,19.5,19.5s19.5-8.7,19.5-19.5S30.8,0.6,20.1,0.6z M20.1,36.6
                c-9.1,0-16.5-7.4-16.5-16.5S11,3.6,20.1,3.6S36.6,11,36.6,20.1S29.2,36.6,20.1,36.6z" />
                <path d="M26.5,13.6c-0.6-0.6-1.5-0.6-2.1,0l-4.3,4.3l-4.3-4.3c-0.6-0.6-1.5-0.6-2.1,0c-0.6,0.6-0.6,1.5,0,2.1L18,20l-4.3,4.3
                c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l4.3-4.3l4.3,4.3c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4
                c0.6-0.6,0.6-1.5,0-2.1L22.2,20l4.3-4.3C27.1,15.1,27.1,14.2,26.5,13.6L26.5,13.6z" />
                </svg>`;
                each.append(Back);

                const href = each.querySelector('.sectionname a');
                if (href) {
                    const single = document.querySelector('.single-section');
                    if (single) {
                        const back = document.querySelector(
                            '[data-key="coursehome"] .nav-link'
                        ).href;
                        Back.onclick = () => (self.location.href = back);
                    } else {
                        Enter.onclick = () => (self.location.href = href);
                    }
                } else {
                    const sectioname = each.querySelector('.sectionname');
                    sectioname.onclick = () => {
                        onChangeSection(`#section-${number}`, true);
                    };
                    Enter.onclick = () => {
                        onChangeSection(`#section-${number}`, true);
                    };
                    Back.onclick = () => {
                        onChangeSection(`#section-${number}`, false);
                    };
                }
            }
        }

        // =====================================================================
        // atividade - retrátil dividindo por rótulo com h4 dentro
        // =====================================================================

        const li = each.querySelectorAll('[data-for="cmlist"] li');
        if (li && li.length) {
            const content = [];
            let i = -1;
            li.forEach((e) => {
                if (
                    e.className.indexOf('modtype_label') != -1 &&
                    e.querySelector('h4')
                ) {
                    content.push({ element: e, child: [] });
                    i = i + 1;
                } else {
                    content[i]?.child?.push(e);
                }
            });
            const List = document.createElement('ul');
            List.className = 'activities_refactor';
            each.append(List);
            content.forEach(({ element, child }, index) => {
                const h4 = element.querySelector('h4');
                h4.id = 'subsection_h4_' + index;

                const Open = document.createElement('div');
                Open.className = 'moisaic_subsection_open';
                Open.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M23.8,35.6c-0.5,0-0.8,0-1.2-0.2s-0.8-0.3-1.2-0.7L4.9,18.1C4.2,17.5,4,16.8,4,15.8s0.3-1.7,1-2.3c0.7-0.7,1.5-1,2.3-1c0.8,0.2,1.7,0.5,2.3,1L24,27.7l14.2-14.2c0.7-0.7,1.3-1,2.3-1c1,0,1.7,0.3,2.3,1c0.7,0.7,1,1.3,1,2.3s-0.5,1.7-1,2.3L26.2,34.6c-0.3,0.3-0.7,0.7-1.2,0.7C24.7,35.6,24.3,35.6,23.8,35.6z"/></svg>`;
                h4.prepend(Open);

                h4.onclick = () => onChangeSubSection(index);
                List.append(element);
                const Sub = document.createElement('ul');
                Sub.className = 'activities_sub';
                Sub.id = 'activities_sub_' + index;
                element.append(Sub);
                const pill = [];
                child.forEach((c) => {
                    const found = c.querySelector(
                        '.badge-pill:last-child strong'
                    );
                    if (found) pill.push(found);
                    Sub.appendChild(c);
                });
                if (pill && pill.length) {
                    appendActivityPercent(pill, element);
                }
            });
        }
    });
}

// =============================================================================
// quadrados
// =============================================================================

const start = document.querySelector('#mosaic_start');
if (start) document.querySelector('#section-0').append(start);

const squares = document.querySelector('#mosaic_squares');
if (squares) document.querySelector('#section-0').append(squares);

// =============================================================================
// quando carrega a tela verifica se existe cookie de sessao aberta
// =============================================================================

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const section = getCookie('section');
if (section) onChangeSection(section, true);

const subsection = getCookie('subsection');
if (subsection) onChangeSubSection(subsection);
