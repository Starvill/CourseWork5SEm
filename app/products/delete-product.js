jQuery($ => {

    // Будет работать, если была нажата кнопка удаления
    $(document).on("click", ".delete-product-button", function () {
        
        // Получение ID товара
        const product_id = $(this).attr("data-id");
        // Bootbox для подтверждения во всплывающем окне
        bootbox.confirm({
            message: "<h4>Вы уверены?</h4>",
            buttons: {
                confirm: {
                    label: "<span class='glyphicon glyphicon-ok'></span> Да",
                    className: "btn-danger"
                },
                cancel: {
                    label: "<span class='glyphicon glyphicon-remove'></span> Нет",
                    className: "btn-primary"
                }
            },
            callback: result => {

                if (result == true) {

                    // Отправим запрос на удаление в API / удаленный сервер
                    $.ajax({
                        url: "http://courseWork/api/product/delete.php",
                        type : "POST",
                        dataType : "json",
                        data : JSON.stringify({ id: product_id }),
                        success : result => {
                
                            // Покажем список всех товаров
                            showProducts();
                        },
                        error: (xhr, resp, text) => {
                            console.log(xhr, resp, text);
                        }
                    });
                
                }
            }
        });
    });
});