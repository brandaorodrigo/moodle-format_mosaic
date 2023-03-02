// =============================================================================
// importa format css
// =============================================================================

const theme = document.createElement('link');
theme.rel = 'stylesheet';
theme.type = 'text/css';
theme.href = '/course/format/mosaic/format.css';
theme.media = 'all';
document.head.appendChild(theme);

// =============================================================================
// importa material icons
// =============================================================================

const material = document.createElement('link');
material.rel = 'stylesheet';
material.type = 'text/css';
material.href =
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,0,0';
material.media = 'all';
document.head.appendChild(material);

// =============================================================================
// funcao para exibir ou ocultar sessao
// =============================================================================

const onChangeSection = (number, action) => {
    const section = document.querySelector(number);
    if (section) {
        const ul = section.querySelector('ul.section');
        if (action) {
            self.location.hash = number;
            section.classList.add('section-open');
            ul.classList.add('force-display');
        } else {
            self.location.hash = '';
            section.classList.remove('section-open');
            ul.classList.remove('force-display');
        }
    }
};

// =============================================================================
// funcao criadora de barra de porcentagem
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
// funcao calcular valores de barra de porcentagem
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
// adiciona funcionalidades nas sessoes
// =============================================================================

const courseSection = document.querySelectorAll('.course-section');
if (courseSection && courseSection.length) {
    courseSection.forEach((each) => {
        const modules = each.getAttribute('data-number');
        if (modules == 0) return;

        // =====================================================================
        // cria div do numero do modulo
        // =====================================================================

        const Div = document.createElement('div');
        Div.className = 'module_badge';
        Div.innerHTML = 'Modulo ' + modules;
        each.prepend(Div);

        // =====================================================================
        // cria div de cabecalho do mosaico
        // =====================================================================

        const Header = document.createElement('div');
        Header.className = 'mosaic_header';
        each.prepend(Header);

        // =====================================================================
        // calcula porcentagem concluida dentro e fora da sessao
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
        // data de abertura da sessao
        // =====================================================================

        const date = each.querySelector(
            '.section_availability .availabilityinfo .description-inner strong'
        );
        if (date && date.innerHTML) {
            const Div = document.createElement('div');
            Div.className = 'available_date';
            Div.innerHTML =
                date.innerHTML + `<i class="icon fa fa-lock fa-fw"></i>`;
            Header.append(Div);
        }

        // =====================================================================
        // adiciona icone de completo ou incompleto em cada atividade
        // =====================================================================

        const activities = each.querySelectorAll(
            'li.activity:not(.modtype_label)'
        );
        if (activities && activities.length) {
            activities.forEach((e) => {
                const pill = e.querySelector('.badge-pill:last-child strong');
                if (pill) {
                    const Div = document.createElement('div');
                    Div.className = 'progress_activity';
                    Div.innerHTML = progress = `<span class="${
                        pill.innerHTML.indexOf('Feito:') !== -1
                            ? 'completed'
                            : 'incomplete'
                    } material-symbols-outlined">done</span>`;
                    e.querySelector('.activityname a').appendChild(Div);
                }
            });

            // =================================================================
            // botao entrar/sair da sessao
            // =================================================================

            const number = each.getAttribute('data-number');
            if (number > 0) {
                const Enter = document.createElement('button');
                Enter.className = 'button_enter_section';
                Enter.innerHTML = 'Entrar';
                each.append(Enter);

                const Back = document.createElement('button');
                Back.className = 'button_back_section';
                Back.innerHTML = `<span class="material-symbols-outlined">cancel</span>`;
                each.append(Back);

                const href = each.querySelector('.sectionname a');
                if (href) {
                    const single = document.querySelector('.single-section');
                    if (single) {
                        const back = document.querySelector(
                            '[data-key="coursehome"] .nav-link'
                        ).href;
                        Back.onclick = () => {
                            self.location.href = back;
                        };
                    } else {
                        Enter.onclick = () => {
                            self.location.href = href;
                        };
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
        // retrátil para atividades dividindo por rótulo com h3 dentro
        // =====================================================================

        /*
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
                    element.onclick = () => {
                        const all =
                            document.querySelectorAll('.activities_sub');
                        all.forEach((a) => {
                            a.style.display = 'none';
                        });
                        document.querySelector(
                            '#activities_sub_' + index
                        ).style.display = 'block';
                    };

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
            */
    });
}

// =============================================================================
// coloca squares dentro do topic geral
// =============================================================================

const squares = document.querySelector('#mosaic_squares');
document.querySelector('#section-0').append(squares);

// =============================================================================
// quando carrega a tela verifica se existe hash de sessao aberta
// =============================================================================

if (self.location.hash.indexOf('#section') !== -1) {
    const hash = self.location.hash.split('#');
    onChangeSection('#' + hash[1], true);
}

// =============================================================================
// exibe conteudo depois de tudo carregado
// =============================================================================

setTimeout(() => {
    document.querySelector('#page-content').style.display = 'block';
}, 400);
