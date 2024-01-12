import barba from './barba.js'
import Button from './component/button/button.js'
import Header from './component/header/Header.js'
import Loader from './component/loader/Loader.js'
import Shimmer from './component/shimmer/shimmer.js'
import Sidemenu from './component/sidemenu/Sidemenu.js'
import Table from './component/table/Table.js'
import Toaster from './component/toaster/toaster.js'
import './component/multicheck/multicheck.js'
import Alert from './component/alert/alert.js'

// sidemenu
const sidemenu = new Sidemenu()
sidemenu.render()
sidemenu.hint({
    target: 'admission', content: `new`
})

// header
const header = new Header()
header.render()
// shimmer
const shimmer = new Shimmer()
shimmer.render()
// Toster
const toaster = new Toaster()
// Loader
const loader = new Loader()

barba.init({
    debug: true, views: [{
        namespace: 'dashboard', beforeEnter(data) {
            sidemenu.active('category')
            header.update('Dashboard', sidemenu.current().find('i')[0].outerHTML)
            loader.load()
            loader.stop()
        }
    }, {
        namespace: 'category_list', beforeEnter() {
            loader.load()
            sidemenu.active('category')
            header.update('List Category', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const crued = import('../server/CRUED.js')
            let table = new Table($('#category_table')[0])

            //! fetch all category
            fetch('action/fetch_all_category.php')
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    if (data.length) {
                        loader.stop()
                        let slno = 0
                        data.map(row => {
                            slno++
                            const {
                                id, name, date, time
                            } = row
                            const rowContent = [slno, name, date, time]
                            table.addRow(rowContent, id)
                            table.actions({
                                edit: 'edit_category.html?id=' + id, delete: async id => {
                                    const data = {
                                        id: id
                                    }
                                    crued.then(option => {
                                        option
                                            ._del_block('action/deleteCategory.php', data)
                                            .then(response => {
                                                if (table.rowCount() == 0) {
                                                    table.empty()
                                                }
                                                toaster.trigger({
                                                    content: 'You have delete the Category',
                                                    timeout: 2000,
                                                    type: 'success'
                                                })
                                            })
                                    })
                                }
                            })
                        })
                    } else {
                        table.empty()
                        loader.stop()
                    }
                })
        }
    }, {
        namespace: 'add_category', beforeEnter() {
            loader.load()
            sidemenu.active('category')
            header.update('Add Category', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const button = new Button($('#save_btn')[0])

            //! add gallery
            $('#add_category_form').submit(x => {
                x.preventDefault()
                button.load('Creating')

                const name = $('#name').val()

                fetch('action/add_category.php', {
                    method: 'post', headers: {
                        contentType: 'application/json'
                    }, body: JSON.stringify({
                        name: name
                    })
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log(data)
                        if (data == 1) {
                            button.stop()
                            toaster.trigger({
                                content: `New Category Created`, timeout: 2000, type: 'success'
                            })
                            barba.go('category_list.html')
                        } else {
                            button.stop()
                            toaster.trigger({
                                content: `Something went wrong!`, timeout: 2000, type: 'error'
                            })
                        }
                    })
            })
        }
    }, {
        namespace: 'edit_category', beforeEnter() {
            loader.load()
            sidemenu.active('category')
            header.update('Edit Category', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const id = location.href.split('=')[1]

            //! fetch data edit
            fetch('./action/fetch_category_data_edit.php?id=' + id)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    if (data.length) {
                        $('#name').val(data[0]['name'])
                    }
                })

            const button = new Button($('#save_btn')[0])

            //! edit gallery
            $('#edit_category_form').submit(x => {
                x.preventDefault()
                button.load('Updating')

                const name = $('#name').val()

                fetch('action/update_category.php', {
                    method: 'post', headers: {
                        contentType: 'application/json'
                    }, body: JSON.stringify({
                        name: name, id: id
                    })
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log(data)
                        if (data == 1) {
                            button.stop()
                            toaster.trigger({
                                content: `New Category Created`, timeout: 2000, type: 'success'
                            })
                            barba.go('category_list.html')
                        } else {
                            button.stop()
                            toaster.trigger({
                                content: `Something went wrong!`, timeout: 2000, type: 'error'
                            })
                        }
                    })
            })
        }
    }, {
        namespace: 'sub_category_list', beforeEnter() {
            loader.load()
            sidemenu.active('subcategory')
            header.update('List Sub Category', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const crued = import('../server/CRUED.js')
            let table = new Table($('#sub_category_table')[0])

            //! fetch all category
            fetch('action/fetch_all_sub_category.php')
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    if (data.length) {
                        loader.stop()
                        let slno = 0
                        data.map(row => {
                            slno++
                            const {
                                id, name, file_name, date, time
                            } = row
                            const rowContent = [slno, name, date, time]
                            table.addRow(rowContent, id)
                            table.actions({
                                edit: 'edit_sub_category.html?id=' + id, delete: async id => {
                                    const data = {
                                        id: id
                                    }
                                    crued.then(option => {
                                        option
                                            ._del_block('action/deleteSubCategory.php', data)
                                            .then(response => {
                                                if (table.rowCount() == 0) {
                                                    table.empty()
                                                }
                                                toaster.trigger({
                                                    content: 'You have delete the Sub Category',
                                                    timeout: 2000,
                                                    type: 'success'
                                                })
                                            })
                                    })
                                }
                            })
                        })
                    } else {
                        table.empty()
                        loader.stop()
                    }
                })
        }
    }, {
        namespace: 'add_sub_category', beforeEnter() {
            loader.load()
            sidemenu.active('subcategory')
            header.update('Add Sub Category', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            //! fetch all category
            fetch('./action/fetch_all_category.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        data.map(x => {
                            const {
                                name, id
                            } = x

                            $('#category').append(`<option value="${id}">${name}</option>`)
                        })
                    }
                })

            const button = new Button($('#save_btn')[0])

            //! add gallery
            $('#add_category_form').submit(x => {
                x.preventDefault()
                button.load('Creating')

                const name = $('#name').val()
                const category_id = $('#category').val()
                const image = $('#image')[0].files[0]
                let fd = new FormData()

                fd.append('name', name)
                fd.append('category_id', category_id)
                fd.append('image', image)

                fetch('action/add_sub_category.php', {
                    method: 'post', body: fd
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log(data)
                        if (data == 1) {
                            button.stop()
                            toaster.trigger({
                                content: `New Sub Category Created`, timeout: 2000, type: 'success'
                            })
                            barba.go('subcategory_list.html')
                        } else {
                            button.stop()
                            toaster.trigger({
                                content: `Something went wrong!`, timeout: 2000, type: 'error'
                            })
                        }
                    })
            })
        }
    }, {
        namespace: 'edit_sub_category', beforeEnter() {
            loader.load()
            sidemenu.active('subcategory')
            header.update('Edit Sub Category', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const id = location.href.split('=')[1]

            fetch('./action/fetch_sub_category_edit.php?id=' + id)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    if (data.length) {
                        const {
                            id, category_id, name, file_name
                        } = data[0]
                        $('#name').val(name)
                        return category_id
                    }
                })
                .then(cat_id => {
                    //! fetch all category
                    fetch('./action/fetch_all_category.php')
                        .then(response => response.json())
                        .then(data => {
                            // console.log(data);
                            if (data.length) {
                                data.map(x => {
                                    const {
                                        name, id
                                    } = x
                                    $('#category').append(`<option ${cat_id == id ? 'selected' : ''} value="${id}">${name}</option>`)
                                })
                            }
                        })
                })

            const button = new Button($('#save_btn')[0])

            //! update
            $('#update_category_form').submit(x => {
                x.preventDefault()
                button.load('Creating')

                const name = $('#name').val()
                const category_id = $('#category').val()
                const image = $('#image')[0].files[0]
                let fd = new FormData()

                fd.append('name', name)
                fd.append('category_id', category_id)
                fd.append('image', image)
                fd.append('id', id)

                fetch('action/update_sub_category.php', {
                    method: 'post', body: fd
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log(data)
                        if (data == 1) {
                            button.stop()
                            toaster.trigger({
                                content: `New Sub Category Created`, timeout: 2000, type: 'success'
                            })
                            barba.go('subcategory_list.html')
                        } else {
                            button.stop()
                            toaster.trigger({
                                content: `Something went wrong!`, timeout: 2000, type: 'error'
                            })
                        }
                    })
            })
        }
    }, {
        namespace: 'product_list', beforeEnter() {
            loader.load()
            sidemenu.active('products')
            header.update('List Product', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()


            const crued = import('../server/CRUED.js')
            let table = new Table($('#product_table')[0])

            //! fetch all product
            fetch('action/fetch_all_product.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        loader.stop()
                        let slno = 0
                        data.map(row => {
                            slno++
                            const {
                                id, name, price, discription, date, time
                            } = row
                            const rowContent = [slno, name, date, time]
                            table.addRow(rowContent, id)
                            table.actions({
                                edit: 'edit_product.html?id=' + id, delete: async id => {
                                    const data = {
                                        id: id
                                    }
                                    crued.then(option => {
                                        option
                                            ._del_block('action/deleteProducts.php', data)
                                            .then(response => {
                                                if (table.rowCount() == 0) {
                                                    table.empty()
                                                }
                                                toaster.trigger({
                                                    content: 'You have delete the Product',
                                                    timeout: 2000,
                                                    type: 'success'
                                                })
                                            })
                                    })
                                }
                            })
                        })
                    } else {
                        table.empty()
                        loader.stop()
                    }
                }).then(x => {

                $('#search').on('keyup', function () {
                    var value = $(this).val().toLowerCase();
                    console.log($('table tr .accept-block'));

                    $('table tr .accept-block').parent().filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                    });
                });


            })
        }
    }, {
        namespace: 'add_product', beforeEnter() {
            loader.load()
            sidemenu.active('products')
            header.update('Add Product', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            $('#discription').richText({
                imageUpload: false,
                fileUpload: false,
                urls: false,
                table: false,
                table: false,
                removeStyles: false,
                code: false,
                fontColor: false,
                Embed: false
            })


            //! fetch all category
            fetch('./action/fetch_all_sub_category.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        data.map(x => {
                            const {
                                name, id
                            } = x
                            $('#sub_category').append(`<option value="${id}">${name}</option>`)
                        })
                    }
                }).then(() => {
                //! add product
                $('#add_product_form').submit(x => {
                    x.preventDefault()
                    const button = new Button($('#save_btn')[0])
                    button.load('Creating')

                    const name = $('#name').val()
                    const sub_category_id = $('#sub_category').val()
                    const price = $('#price').val()
                    const discount_price = $('#discount_price').val()
                    const product_weight = $('#weight').val()
                    const discription = $('#discription').val()
                    const size = $('#size').val()
                    const image = $('#image')[0].files
                    let fd = new FormData()

                    fd.append('name', name)
                    fd.append('sub_category_id', sub_category_id)
                    fd.append('price', price)
                    fd.append('discount_price', discount_price)
                    fd.append('product_weight', product_weight)
                    fd.append('size', size)
                    fd.append('discription', discription)

                    if (image.length < 7) {
                        for (x = 0; x < image.length; x++) {
                            fd.append('image[]', image[x])
                        }
                        fetch('action/add_product.php', {
                            method: 'post', body: fd
                        })
                            .then(response => response.text())
                            .then(data => {
                                console.log(data)
                                if (data == 1) {
                                    button.stop()
                                    toaster.trigger({
                                        content: `A new subcategory has been created. `, timeout: 2000, type: 'success'
                                    })
                                    barba.go('product_list.html')
                                } else {
                                    button.stop()
                                    toaster.trigger({
                                        content: `Something went wrong, try again !`, timeout: 2000, type: 'error'
                                    })
                                }
                            })
                    } else {
                        alert("You can select a maximum of 4 images per product.");
                    }
                })
            })
        }
    }, {
        namespace: 'edit_product', beforeEnter() {
            loader.load()
            sidemenu.active('products')
            header.update('Edit Product', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const id = location.href.split('=')[1]

            fetch('./action/fetch_product_edit.php?id=' + id)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        const {
                            id, name, price, discription, images, sub_cat_id, discount_price, weight, size
                        } = data[0]
                        $('#name').val(name);
                        $('#price').val(price);
                        $('#discount_price').val(discount_price);
                        $('#weight').val(weight);
                        $('#discription').val(discription);
                        $('#size').val(size);

                        images.map(x => {
                            const {
                                id, name
                            } = x;
                            let template = `
                                 <div class="image">
                                 <span class="close-img" data-id="${id}">close</span>
                                        <img src="./upload_image/products/${name}" width="150"></img>
                                 </div>`;
                            $('.image-holder').append(template);
                        });

                        $('.close-img').click(function () {
                            const imageId = $(this).attr('data-id');
                            // alert(imageId);
                            /* ------------------------------ delete image ------------------------------ */
                            fetch('./action/deleteProductImage.php?id=' + imageId)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    if (data == 1) {
                                        /* --------------------------- removing image card -------------------------- */
                                        $(this).parent().remove();
                                        toaster.trigger({
                                            content: `Deleted Successfully`, timeout: 2000, type: 'success'
                                        })
                                    }
                                })
                        })
                        return sub_cat_id
                    }
                })
                .then(sub_cat_id => {
                    $('#discription').richText({
                        imageUpload: false,
                        fileUpload: false,
                        urls: false,
                        table: false,
                        table: false,
                        removeStyles: false,
                        code: false,
                        fontColor: false,
                        Embed: false
                    })
                    //! fetch all category
                    fetch('./action/fetch_all_sub_category.php')
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.length) {
                                data.map(x => {
                                    const {
                                        name, id
                                    } = x
                                    $('#sub_category').append(`<option ${sub_cat_id == id ? 'selected' : ''} value="${id}">${name}</option>`)
                                })
                            }
                        })
                })

            const button = new Button($('#save_btn')[0])

            //! update
            $('#add_product_form').submit(x => {
                x.preventDefault()
                button.load('Creating')

                const name = $('#name').val()
                const sub_category_id = $('#sub_category').val()
                const price = $('#price').val()
                const discount_price = $('#discount_price').val()
                const discription = $('#discription').val()
                const weight = $('#weight').val()
                const size = $('#size').val()
                const image = $('#image')[0].files
                let fd = new FormData()

                fd.append('name', name)
                fd.append('discription', discription)
                fd.append('price', price)
                fd.append('discount_price', discount_price)
                fd.append('sub_category_id', sub_category_id)
                fd.append('weight', weight)
                fd.append('size', size)
                fd.append('id', id)

                if (image.length < 5) {
                    for (x = 0; x < image.length; x++) {
                        fd.append('image[]', image[x])
                    }

                    fetch('action/update_product.php', {
                        method: 'post', body: fd
                    })
                        .then(response => response.text())
                        .then(data => {
                            // console.log(data)
                            if (data == 1) {
                                button.stop()
                                toaster.trigger({
                                    content: `product updated successfully`, timeout: 2000, type: 'success'
                                })
                                barba.go('product_list.html')
                            } else {
                                button.stop()
                                toaster.trigger({
                                    content: `Something went wrong!`, timeout: 2000, type: 'error'
                                })
                            }
                        })
                }
            })
        }
    }, {
        namespace: 'collection', beforeEnter() {
            loader.load()
            sidemenu.active('collection')
            header.update('List Product', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const crued = import('../server/CRUED.js')
            let table = new Table($('#collection_table')[0])

            /* -------------------------- geing all collections ------------------------- */
            fetch('action/fetch_all_collections.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        loader.stop()
                        let slno = 0
                        data.map(row => {
                            slno++
                            const {
                                collection_id, collection_name, date, product_count
                            } = row
                            const rowContent = [slno, collection_name, product_count, date]
                            table.addRow(rowContent, collection_id)
                            table.actions({
                                edit: 'edit_collection.html?id=' + collection_id, delete: async id => {
                                    const data = {
                                        id: id
                                    }
                                    crued.then(option => {
                                        option
                                            ._del_block('action/deleteCollection.php', data)
                                            .then(response => {
                                                if (table.rowCount() == 0) {
                                                    table.empty()
                                                }
                                                toaster.trigger({
                                                    content: 'You have delete the Collection',
                                                    timeout: 2000,
                                                    type: 'success'
                                                })
                                            })
                                    })
                                }
                            })
                        })
                    } else {
                        table.empty()
                        loader.stop()
                    }
                })
        }
    }, {
        namespace: 'add_collection', beforeEnter() {
            loader.load()
            sidemenu.active('collection')
            header.update('Add Product', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            /* --------------------------- fetch all products --------------------------- */
            fetch('./action/fetch_all_product.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        data.map(x => {
                            const {
                                id, name
                            } = x

                            let template = `<option value="${id}">${name}</option>`
                            $('#products').append(template)
                        })

                        $(document).ready(function () {
                            $('#products').CreateMultiCheckBox({
                                width: '100%', defaultText: 'Select Below', height: '250px'
                            })
                        })
                    }
                })
                .then(() => {
                    $('#add_collection_form').submit(x => {
                        x.preventDefault()
                        let productIdArray = []
                        $('.cont input:checked').each(function () {
                            productIdArray.push($(this).val())
                        })

                        const collectionName = $('#collection_name').val()

                        fetch('./action/add_collection.php', {
                            method: 'post', headers: {
                                contentType: 'application/json'
                            }, body: JSON.stringify({
                                collectionName: collectionName, productIdArray: productIdArray
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                if (data == 1) {
                                    toaster.trigger({
                                        content: `New collection Created`, timeout: 2000, type: 'success'
                                    })
                                    barba.go('collection.html')
                                } else {
                                    toaster.trigger({
                                        content: `Something went wrong !`, timeout: 2000, type: 'error'
                                    })
                                }
                            })
                    })
                })
        }
    }, {
        namespace: 'edit_collection', beforeEnter() {
            loader.load()
            sidemenu.active('collection')
            header.update('Add Product', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const collectionId = location.href.split('=')[1]

            /* --------------------------- fetch all products --------------------------- */
            fetch('./action/fetch_all_product.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        data.map(x => {
                            const {
                                id, name
                            } = x

                            let template = `<option value="${id}">${name}</option>`
                            $('#products').append(template)
                        })

                        $(document).ready(function () {
                            $('#products').CreateMultiCheckBox({
                                width: '100%', defaultText: 'Select Below', height: '250px'
                            })
                        })
                    }
                })

            // fetch collection data for edit
            fetch('./action/fetch_collection_edit.php?id=' + collectionId)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        const {
                            name, products
                        } = data[0]

                        $('#collection_name').val(name)

                        for (let i = 0; i < products.length; i++) {
                            const productId = products[i]['product_id']

                            $('.cont input').each(function () {
                                const $that = $(this)
                                if ($that.val() == productId) {
                                    $that.attr('checked', true)
                                }
                            })
                        }

                        $('#add_collection_form').submit(x => {
                            x.preventDefault()
                            let productIdArray = []
                            $('.cont input:checked').each(function () {
                                productIdArray.push($(this).val())
                            })

                            const collectionName = $('#collection_name').val()

                            fetch('./action/update_collection.php', {
                                method: 'post', headers: {
                                    contentType: 'application/json'
                                }, body: JSON.stringify({
                                    collectionName: collectionName, productIdArray: productIdArray, id: collectionId
                                })
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data)
                                    if (data == 1) {
                                        toaster.trigger({
                                            content: `collection Updated`, timeout: 2000, type: 'success'
                                        })
                                        barba.go('collection.html')
                                    } else {
                                        toaster.trigger({
                                            content: `Something went wrong !`, timeout: 2000, type: 'error'
                                        })
                                    }
                                })
                        })
                    }
                })
        }
    }, {
        namespace: 'banner', beforeEnter() {
            loader.load()
            sidemenu.active('banner')
            header.update('List Banner', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const crued = import('../server/CRUED.js')
            let table = new Table($('#banner_table')[0])

            /* ------------------------- fetch all banner images ------------------------ */
            fetch('./action/fetchBanners.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.length) {
                        loader.stop()
                        let slno = 0
                        data.map(row => {
                            slno++
                            const {
                                id, image, url
                            } = row

                            const bannerImage = `<span><img src="./upload_image/banner/${image}" width="100px"></img></span>`;
                            const rowContent = [slno, bannerImage]
                            table.addRow(rowContent, id)
                            table.actions({
                                delete: async id => {
                                    const data = {
                                        id: id
                                    }
                                    crued.then(option => {
                                        option
                                            ._del_block('action/deleteBanner.php', data)
                                            .then(response => {
                                                if (table.rowCount() == 0) {
                                                    table.empty()
                                                }
                                                toaster.trigger({
                                                    content: 'You have deleted the banner.',
                                                    timeout: 2000,
                                                    type: 'success'
                                                })
                                            })
                                    })
                                }
                            })
                        })
                    } else {
                        table.empty()
                        loader.stop()
                    }
                })
        }
    }, {
        namespace: 'add_banner', beforeEnter() {
            loader.load()
            sidemenu.active('banner')
            header.update('Add Banner', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const button = new Button($('#save_btn')[0]);

            $('#banner_form').submit(x => {
                x.preventDefault();
                button.load();
                const banner = $('#banner')[0].files[0];
                const url = $('#url').val();
                let fd = new FormData();

                fd.append('banner', banner);
                fd.append('url', url);

                fetch('./action/add_banner.php', {
                    method: 'post', body: fd
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data == 1) {
                            button.stop();
                            toaster.trigger({
                                content: 'Banner added successfully', timeout: 2000, type: 'success'
                            })
                            barba.go('./banner.html');
                        } else {
                            button.stop();
                            toaster.trigger({
                                content: 'Something went wrong !', timeout: 2000, type: 'error'
                            })
                        }
                    })
            })
        }
    }, {
        namespace: 'orders', beforeEnter() {
            loader.load()
            sidemenu.active('orders')
            header.update('List Order', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const crued = import('../server/CRUED.js')
            let table = new Table($('#order_table')[0])

            /* ------------------------- fetch all banner images ------------------------ */
            fetch('./action/fetchOrders.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.length) {
                        loader.stop()
                        let slno = 0
                        data.map(row => {
                            slno++
                            const {
                                id, name, whatsapp_number, product_name, qty, price, color, size, status
                            } = row

                            // if status 2 = rejected
                            // and status 1 = confirmed

                            const rowContent = [slno, name, whatsapp_number, price, product_name, qty, color, size]
                            table.addRow(rowContent, id)
                            table.actions({
                                view: 'order_details.html?id=' + id
                            })
                        })
                    } else {
                        table.empty()
                        loader.stop()
                    }
                })
        }
    }, {
        namespace: 'order_details', beforeEnter() {
            loader.load()
            sidemenu.active('orders')
            header.update('Order Details', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            // get id from url here then pass that id in fetch

            fetch('./action/fetchOrderDetails.php', {
                method: 'GET',
            })
                .then(response => response.text())
                .then(res => {
                    // append all values in inputs from response here

                })
        }
    }, {
        namespace: 'collection', beforeEnter() {
            loader.load()
            sidemenu.active('collection')
            header.update('List Product', sidemenu.current().find('i')[0].outerHTML)
            loader.stop()

            const crued = import('../server/CRUED.js')
            let table = new Table($('#collection_table')[0])

            /* -------------------------- geing all collections ------------------------- */
            fetch('action/fetch_all_collections.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length) {
                        loader.stop()
                        let slno = 0
                        data.map(row => {
                            slno++
                            const {
                                collection_id, collection_name, date, product_count
                            } = row
                            const rowContent = [slno, collection_name, product_count, date]
                            table.addRow(rowContent, collection_id)
                            table.actions({
                                edit: 'edit_collection.html?id=' + collection_id, delete: async id => {
                                    const data = {
                                        id: id
                                    }
                                    crued.then(option => {
                                        option
                                            ._del_block('action/deleteCollection.php', data)
                                            .then(response => {
                                                if (table.rowCount() == 0) {
                                                    table.empty()
                                                }
                                                toaster.trigger({
                                                    content: 'You have delete the Collection',
                                                    timeout: 2000,
                                                    type: 'success'
                                                })
                                            })
                                    })
                                }
                            })
                        })
                    } else {
                        table.empty()
                        loader.stop()
                    }
                })
        }
    }, {
        namespace: 'login', beforeEnter() {
            $('#login_form').submit(x => {
                x.preventDefault()
                //...
                const username = $('#userName').val()
                const password = $('#password').val()

                fetch('./action/loginAction.php', {
                    method: 'post', headers: {
                        contentType: 'application/json'
                    }, body: JSON.stringify({
                        username: username, password: password
                    })
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log(data)
                        if (data == 1) {
                            location.href = 'category_list.html'
                        } else {
                            alert('invalid username or password')
                        }
                    })
            })
        }
    }]
})

function logCheck() {
    fetch('action/checkLoginAdmin.php')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data[0]['info'] != 'true') {
                location.replace('./index.html')
            }
        })
}

function logout() {
    $('.logout').click(x => {
        x.preventDefault()
        fetch('action/logout.php')
            .then(response => response.json())
            .then(data => {
                if (data == 1) {
                    location.href = './index.html'
                }
            })
    })
}