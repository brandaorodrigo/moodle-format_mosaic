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
        const Back = document.createElement('button');
        Back.className = 'button_back_course';
        Back.onclick = () => history.back();
        Back.innerHTML = `<span class="material-symbols-outlined">home</span> Voltar para página inicial`;
        insideCourse.append(Back);
    }
}
