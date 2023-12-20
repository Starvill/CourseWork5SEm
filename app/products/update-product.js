jQuery($ => {

    // Показывать HTML форму при нажатии кнопки «Обновить товар»
    $(document).on("click", ".update-product-button", function () {

        // Получаем ID товара
        const id = $(this).attr("data-id");
        // Читаем одну запись на основе данного идентификатора товара
        $.getJSON("http://courseWork/api/product/read_one.php?id=" + id, data => {

            // Значения будут использоваться для заполнения нашей формы
            const name = data.name;
            const price = data.price;
            const description = data.description;
            const category_id = data.category_id;
            const category_name = data.category_name;

            // Загрузка списка категорий
            $.getJSON("http://courseWork/api/category/read.php", data => {

                // Строим список выбора
                // Перебор полученного списка данных
                let categories_options_html = `<select name="category_id" class="form-control">`;

                $.each(data.records, (key, val) => {

                    // Опция предварительного выбора - это идентификатор категории
                    if (val.id == category_id) {
                        categories_options_html += `<option value="` + val.id + `" selected>` + val.name + `</option>`;
                    } else {
                        categories_options_html += `<option value="` + val.id + `">` + val.name + `</option>`; 
                    }
                });

                categories_options_html += `</select>`;

                // Сохраним html в переменной «update product»
                let update_product_html = `
                    <div id="read-products" class="btn btn-primary pull-right m-b-15px read-products-button">
                        <span class="glyphicon glyphicon-list"></span> Все товары
                    </div>

                    <!-- Построение формы для изменения товара -->
                    <!-- Мы используем свойство "required" html5 для предотвращения пустых полей -->
                    <form id="update-product-form" action="#" method="post" border="0">
                        <table class="table table-hover table-responsive table-bordered">

                            <tr>
                                <td>Название</td>
                                <td><input value=\"` + name + `\" type="text" name="name" class="form-control" required /></td>
                            </tr>

                            <tr>
                                <td>Цена</td>
                                <td><input value=\"` + price + `\" type="number" min="1" name="price" class="form-control" required /></td>
                            </tr>

                            <tr>
                                <td>Описание</td>
                                <td><textarea name="description" class="form-control" required>` + description + `</textarea></td>
                            </tr>

                            <tr>
                                <td>Категория</td>
                                <td>` + categories_options_html + `</td>
                            </tr>

                            <tr>
                                <!-- Скрытый «идентификатор товара, чтобы определить, какую запись удалить -->
                                <td><input value=\"` + id + `\" name="id" type="hidden" /></td>

                                <!-- Кнопка отправки формы -->
                                <td>
                                    <button type="submit" class="btn btn-info">
                                        <span class="glyphicon glyphicon-edit"></span> Обновить товар
                                    </button>
                                </td>
                            </tr>

                        </table>
                    </form>
                    `;

                // Добавим в «page-content» нашего приложения
                $("#page-content").html(update_product_html);

                // Изменим title страницы
                changePageTitle("Обновление товара");
            });
        });
    });

    // Будет запущен при отправке формы обновления товара
    $(document).on("submit", "#update-product-form", function() {

        // Получаем данные формы
        const form_data = JSON.stringify($(this).serializeObject());

        // Отправка данных формы в API
        $.ajax({
            url: "http://courseWork/api/product/update.php",
            type : "POST",
            contentType : "application/json",
            data : form_data,
            success : result => {
                
                // Товар был успешно обновлён, возврат к списку товаров
                showProducts();
            },
            error: (xhr, resp, text) => {

                // Вывод ошибки в консоль
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});