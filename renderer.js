const notEditingRenderer = document.querySelector('body:not(.editing)');

if (notEditingRenderer) {
    // =========================================================================
    // botao voltar para pagina iniciall css
    // =========================================================================

    const insideCourse = document.querySelector(
        'body.format-mosaic:not(#page-course-view-mosaic) #page-content'
    );
    if (insideCourse) {
        const search = new URL(document.currentScript.src).searchParams;
        const courseid = search.get('courseid');
        const wwwroot = search.get('wwwroot');
        const a = document.createElement('a');
        a.className = 'button_back_course';
        a.href = wwwroot + '/course/view.php?id=' + courseid;
        a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <path d="M37.1,13.5L20.8,0.9c-0.5-0.4-1.2-0.4-1.7,0L2.9,13.5c-0.3,0.3-0.5,0.7-0.5,1.1v19.8c0,1.3,0.5,2.6,1.5,3.5s2.2,1.5,3.5,1.5
        h25.3c1.3,0,2.6-0.5,3.5-1.5c0.9-0.9,1.5-2.2,1.5-3.5V14.6C37.7,14.2,37.5,13.8,37.1,13.5L37.1,13.5z M23.8,36.6h-7.5V21.4h7.5V36.6
        z M34.9,34.4c0,0.6-0.2,1.1-0.7,1.6c-0.4,0.4-1,0.7-1.6,0.7h-6.1V20c0-0.8-0.6-1.4-1.4-1.4H14.9c-0.8,0-1.4,0.6-1.4,1.4v16.6H7.3
        c-0.6,0-1.2-0.2-1.6-0.7c-0.4-0.4-0.7-1-0.7-1.6V15.3L20,3.8l14.9,11.5L34.9,34.4L34.9,34.4z" />
        </svg> Voltar para página inicial`;
        insideCourse.append(a);
    }
}
