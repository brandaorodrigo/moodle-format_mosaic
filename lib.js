// =============================================================================
// exibe input como upload de arquivo
// =============================================================================

const base64input = (html, button, input) => {
    button.style.display = 'none';
    html.style.display = 'none';
    html.innerHTML = '';
    input.style.display = 'block';
    input.value = '';
    input.type = 'file';
    input.addEventListener('change', () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const base64Image = reader.result;
            input.type = 'text';
            input.value = base64Image;
            base64image(html, button, input);
        });
        reader.readAsDataURL(file);
    });
};

// =============================================================================
// exibe base64 como imagem
// =============================================================================

const base64image = (html, button, input) => {
    html.style.display = 'block';
    button.style.display = 'block';
    input.style.display = 'none';
    html.innerHTML = `<img src="${input.value}" style="width:120px;float:left;"/>`;
};

const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach((input) => {
    // =========================================================================
    // indentifica inputs de cores
    // =========================================================================

    if (input.id.indexOf('color') !== -1) {
        input.type = 'color';
        input.style.width = '120px';
    }

    // =========================================================================
    // indentifica inputs de base64
    // =========================================================================

    if (input.id.indexOf('base64') !== -1) {
        const html = document.createElement('div');
        html.id = input.id + '_render';
        html.innerHTML = 'Imagem';
        input.parentNode.append(html);
        const button = document.createElement('div');
        button.style.fontSize = '20px';
        button.style.cursor = 'pointer';
        button.style.margin = '6px 12px';
        button.innerHTML = `<i class="icon fa fa-trash fa-fw" title="Remover"></i>`;
        button.addEventListener('click', () =>
            base64input(html, button, input)
        );
        input.parentNode.append(button);
        if (input.value) base64image(html, button, input);
        else base64input(html, button, input);
    }
});
