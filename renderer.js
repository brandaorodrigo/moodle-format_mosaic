const notEditingRenderer = document.querySelector('body:not(.editing)');

if (notEditingRenderer) {
    const addStyle = (styles) => {
        var css = document.createElement('style');
        css.type = 'text/css';
        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName('head')[0].appendChild(css);
    };

    // =========================================================================
    // inclui css
    // =========================================================================

    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.type = 'text/css';
    theme.href = '/course/format/mosaic/renderer.css';
    theme.media = 'all';
    document.head.appendChild(theme);

    // =========================================================================
    // define a cor do curso para os botoes e links
    // =========================================================================

    const url = new URL(document.currentScript.getAttribute('src'));
    const params = Object.fromEntries(url.searchParams);
    const color = params.color;
    const styles = `
    .btn-primary { background: #${color} !important; border: 0 !important; color: #fff !important; }
    a, a:hover { color: #${color}; }
    .custom-control-input:checked~.custom-control-label::before { background: #${color} !important; border: 0 !important; }
    `;
    addStyle(styles);

    // =========================================================================
    // botao voltar para pagina iniciall css
    // =========================================================================

    const insideCourse = document.querySelector(
        'body.format-mosaic:not(#page-course-view-mosaic)'
    );
    if (insideCourse) {
        const href = document.querySelector(
            '.breadcrumb .breadcrumb-item:first-child a'
        )?.href;
        const Back = document.createElement('button');
        Back.className = 'button_back_course';
        Back.onclick = () => (location.href = href);
        Back.innerHTML = `<i class="icon fa fa-home"></i> Voltar para página inicial`;
        insideCourse.append(Back);
    }
}
