jQuery($ => {

    // Показать список товаров при первой загрузке
    showProducts();

    // Когда была нажата кнопка «Все товары»
    $(document).on("click", ".read-products-button", function () {
        showProducts();
    });

});

// Функция для отображения списка товаров
function showProducts(json_url = "http://courseWork/api/product/read.php") {

    // Получаем список товаров из API
    $.getJSON(json_url, function (data) {

        // HTML для перечисления товаров
        readProductsTemplate(data, "");

        // Изменим заголовок страницы
        changePageTitle("Все товары");
    });
}

