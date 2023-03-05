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
        } else {
            self.location.hash = '';
            section.classList.remove('section-open');
            ul.classList.remove('force-display');
            setTimeout(() => {
                section.style.zIndex = 99;
            }, 400);
        }
    }
};

// =============================================================================
// funcao - exibe ou oculta subsessao
// =============================================================================

const onChangeSubSection = (number) => {
    const all = document.querySelectorAll('.activities_sub');
    all.forEach((a) => (a.style.display = 'none'));
    const current = document.querySelector('#activities_sub_' + number);
    if (current) {
        current.style.display = 'block';
        document.cookie = `subsection=${number}; max-age=3600; path=/;`;
    }
};

// =============================================================================
// funcao - recurar cookie
// =============================================================================

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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

console.log(document.cookie);

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
            Div.innerHTML =
                date.innerHTML +
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                <path d="M32.3,16.8h-2.1v-5.6c0-2.7-1.1-5.3-3-7.3s-4.5-3-7.3-3s-5.3,1.1-7.3,3s-3,4.5-3,7.3v5.6H7.7c-2.8,0-5,2.2-5,5
                v12.3c0,2.8,2.2,5,5,5h24.7c2.7,0,5-2.2,5-5V21.8C37.3,19,35.1,16.8,32.3,16.8z M12.6,11.2c0-2,0.8-3.8,2.1-5.2S18,3.8,20,3.8
                s3.8,0.8,5.2,2.1s2.1,3.2,2.1,5.2v5.6H12.6V11.2z M34.4,34.1c0,1.1-0.9,2.1-2.1,2.1H7.7c-1.1,0-2.1-0.9-2.1-2.1V21.8
                c0-1.1,0.9-2.1,2.1-2.1h24.7c1.1,0,2.1,0.9,2.1,2.1C34.4,21.8,34.4,34.1,34.4,34.1z"/>
                </svg>`;
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
                // atividade - icone de completo e incompleto
                // =============================================================

                const pill = e.querySelector('.badge-pill:last-child strong');
                if (pill) {
                    const Div = document.createElement('div');
                    const s = pill.innerHTML.indexOf('Feito:') !== -1;
                    Div.className = 'progress_activity ' + (!s && 'wait');
                    Div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M13.2,33.9c-0.4,0-0.8-0.2-1.1-0.4L0.9,22.2c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l10.2,10.2L36.9,6.6C37.5,6,38.5,6,39,6.6c0.6,0.6,0.6,1.5,0,2.1L14.3,33.4C14,33.7,13.6,33.9,13.2,33.9z" /></svg>`;
                    const a = e.querySelector('.activityname a');
                    a.insertBefore(Div, a.firstChild);
                }

                // =============================================================
                // atividade - icone entrar
                // =============================================================

                const Enter = document.createElement('div');
                Enter.className = 'moisaic_activity_enter';
                Enter.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12,12-5.37,12-12S18.63,0,12,0Zm7.92,12.38c-.05,.12-.12,.23-.22,.33l-7,7c-.2,.2-.45,.29-.71,.29s-.51-.1-.71-.29c-.39-.39-.39-1.02,0-1.41l5.29-5.29H5c-.55,0-1-.45-1-1s.45-1,1-1h11.59l-5.29-5.29c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l7,7c.09,.09,.17,.2,.22,.33,.1,.24,.1,.52,0,.76Z" /></svg>`;
                e.appendChild(Enter);

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
                element.querySelector('h4').onclick = () =>
                    onChangeSubSection(index);
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
if (start) {
    document.querySelector('#section-0').append(start);
}
const squares = document.querySelector('#mosaic_squares');
if (squares) {
    document.querySelector('#section-0').append(squares);
}

// =============================================================================
// quando carrega a tela verifica se existe hash de sessao aberta
// =============================================================================

if (self.location.hash.indexOf('#section') !== -1) {
    const hash = self.location.hash.split('#');
    onChangeSection('#' + hash[1], true);
    const subsection = getCookie('subsection');
    if (subsection) onChangeSubSection(subsection);
}
