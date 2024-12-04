$(document).ready(function () {
    // 템플릿 모달 열기 버튼 클릭 시 모달과 배경 보이기
    $('.btn-open-modal-tem').on('click', function (event) {
        event.preventDefault(); // 기본 동작 방지
        $('.layer_bg').fadeIn(); // 배경 보이기
        $('.template-box').fadeIn(); // 모달 보이기
        updateButtonState('.template-box', 'select_template', '.btn_ok'); // 버튼 상태 업데이트
    });

    // 배경 클릭 시 모달과 배경 숨기기
    $(document).on('click', function (event) {
        if ($(event.target).is('.layer_bg')) {
            $('.layer_bg').fadeOut(); // 배경 숨기기
            $('.category-box, .template-box').fadeOut(); // 모든 모달 숨기기
        }
    });

    // 라디오 버튼 선택 시 버튼 색상 변경 및 템플릿 이미지 반영
    $('input[type="radio"]').on('change', function () {
        let boxClass = $(this).closest('.category-box, .template-box').attr('class').split(' ')[0];
        let nameAttr = $(this).attr('name');
        let okButton = $(this).closest('.category-modal, .template-modal').find('.btn_ok');
        updateButtonState(`.${boxClass}`, nameAttr, okButton);

        // 템플릿 선택 시, 이미지로 버튼 변경
        if (boxClass.includes('template')) {
            const selectedImage = $(this).closest('.depth-tem').find('img').attr('src');

            if (selectedImage) {
                $('.btn-open-modal-tem').css({
                    'background-image': `url(${selectedImage})`,
                    'background-size': 'cover',
                    'background-position': 'center',
                    'width': '120px',
                    'height': '120px',
                    'border': 'none'
                }).text(''); // 텍스트 제거
            }
        }
    });

    // depth 클릭 시 해당 라디오 버튼 체크되도록 설정
    $('.depth, .depth label, .depth img, .depth-tem, .depth-tem label, .depth-tem img').on('click', function (event) {
        event.stopPropagation(); // 클릭 이벤트 전파 방지
        const radioButton = $(this).closest('.depth, .depth-tem').find('input[type="radio"]');
        if (radioButton.length) {
            radioButton.prop('checked', true).trigger('change'); // 라디오 버튼 체크 및 change 이벤트 트리거
        }
    });

    // 확인 버튼 클릭 시 선택된 값으로 버튼 텍스트 변경
    $('.btn_ok').on('click', function () {
        let boxClass = $(this).closest('.category-box, .template-box').attr('class').split(' ')[0];
        const selectedOption = $(`input[name="${boxClass.includes('category') ? 'select_bd' : 'select_template'}"]:checked`).next('label').text();
        if (selectedOption) {
            const openButton = boxClass.includes('category') ? '.btn-open-modal' : '.btn-open-modal-tem';
            if (boxClass.includes('category')) {
                $(openButton).text(selectedOption); // 카테고리 버튼 텍스트 업데이트
            }
            $('.layer_bg').fadeOut(); // 배경 숨기기
            $(`.${boxClass}`).fadeOut(); // 모달 숨기기
        }
    });

    // 버튼 상태 업데이트 함수
    function updateButtonState(modalClass, inputName, okButton) {
        if ($(`input[name="${inputName}"]:checked`).length > 0) {
            $(okButton).css('background-color', '#F25C78');
            $(okButton).addClass('active');
        } else {
            $(okButton).css('background-color', '#e0e0e0');
            $(okButton).removeClass('active');
        }
    }

    var input = document.querySelector('input[name=tags]')
    new Tagify(input)
});