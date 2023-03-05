const notEditingRenderer = document.querySelector('body:not(.editing)');

if (notEditingRenderer) {
    // =========================================================================
    // botao voltar para pagina iniciall css
    // =========================================================================

    const insideCourse = document.querySelector(
        'body.format-mosaic:not(#page-course-view-mosaic) #page-content'
    );
    if (insideCourse) {
        const id = String(document.currentScript.src).split('courseid=')[1];
        const a = document.createElement('a');
        a.className = 'button_back_course';
        a.href = '/course/view.php?id=' + id;
        a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12,12-5.37,12-12S18.63,0,12,0Zm7.92,12.38c-.05,.12-.12,.23-.22,.33l-7,7c-.2,.2-.45,.29-.71,.29s-.51-.1-.71-.29c-.39-.39-.39-1.02,0-1.41l5.29-5.29H5c-.55,0-1-.45-1-1s.45-1,1-1h11.59l-5.29-5.29c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l7,7c.09,.09,.17,.2,.22,.33,.1,.24,.1,.52,0,.76Z" /></svg> Voltar para página inicial`;
        insideCourse.append(a);
    }
}
