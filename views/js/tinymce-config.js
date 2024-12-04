const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

tinymce.init({
    selector: 'textarea#tinymce-editor',
    height: 1000,
    plugins: [
        'preview', 'importcss', 'searchreplace', 'autolink', 'autosave',
        'save', 'directionality', 'code', 'visualblocks', 'visualchars',
        'fullscreen', 'image', 'link', 'media', 'codesample', 'table',
        'charmap', 'pagebreak', 'nonbreaking', 'anchor', 'insertdatetime',
        'advlist', 'lists', 'wordcount', 'help', 'charmap', 'quickbars',
        'emoticons', 'accordion'
    ],
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | pagebreak anchor codesample | ltr rtl | restoredraft",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: 'editor-autosave-{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    importcss_append: true,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    autosave_ask_before_unload: true,
    powerpaste_allow_local_images: true,
    spellchecker_dialog: true
})