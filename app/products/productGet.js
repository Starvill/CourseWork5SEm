// HTML список товаров
function readProductsTemplate(data, keywords) {

    let read_products_html = `

        <!-- Форма для поиска товаров -->
        <form id="search-product-form" action="#" method="post">
            <div class="input-group pull-left w-30-pct">

                <input type="text" value="` + keywords + `" name="keywords" class="form-control product-search-keywords" placeholder="Поиск товаров..." />

                <span class="input-group-btn">
                    <button type="submit" class="btn btn-default" type="button">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>
                </span>

            </div>
        </form>


        <!-- Начало таблицы -->
        <table class="table table-bordered table-hover">

            <!-- Создание заголовков колонок -->
            <tr>
                <th class="w-25-pct">Название</th>
                <th class="w-10-pct">Цена</th>
                <th class="w-10-pct">Категория</th>
                <th class="w-25-pct text-align-center">Действие</th>
            </tr>`;

    // Перебор возвращаемого списка данных
    $.each(data.records, (key, val) => {
        
        // Создание новой строки таблицы для каждой записи
        read_products_html += `<tr>

            <td>` + val.name + `</td>
            <td>$` + val.price + `</td>
            <td>` + val.category_name + `</td>

            <!-- Кнопки "действий" -->
            <td style="display:flex; align-items:center; justify-content:center;">

                <!-- Кнопка для просмотра товара -->
                <button class="btn btn-primary m-r-10px read-one-product-button" data-id="` + val.id + `">
                    <span class="glyphicon glyphicon-eye-open"></span> Просмотр
                </button>
            </td>
        </tr>`;
    });

    // Конец таблицы
    read_products_html += `</table>`;
    // Если есть пагинация
    if (data.paging) {
        read_products_html += `<ul class="pagination pull-left margin-zero padding-bottom-2em">`;

        // Первая страница
        if (data.paging.first != "") {
            read_products_html += `<li><a data-page="${data.paging.first}">Первая страница</a></li>`;
        }

        // Перебор страниц
        $.each(data.paging.pages, (key, val) => {
            const active_page = val.current_page == "yes" ? "class='active'" : "";

            read_products_html += `<li ${active_page}><a data-page="${val.url}">${val.page}</a></li>`;
        });

        // Последняя страница
        if (data.paging.last != "") {
            read_products_html += `<li><a data-page="${data.paging.last}">Последняя страница</a></li>`;
        }

        read_products_html += "</ul>";
    }

    // Добавим в «page-content» нашего приложения
    $("#page-content").html(read_products_html);
}