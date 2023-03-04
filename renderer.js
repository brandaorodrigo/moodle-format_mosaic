const notEditingRenderer = document.querySelector('body:not(.editing)');

if (notEditingRenderer) {
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
