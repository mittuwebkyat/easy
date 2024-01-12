import docCookies from './docCookies.js';
import cookies from './cookies.js';

barba.init({
    views: [{
            namespace: 'home',
            beforeEnter(data) {
                basic();


                $.fn.jQuerySimpleCounter = function (options) {
                    var settings = $.extend({
                        start: 0,
                        end: 100,
                        easing: 'swing',
                        duration: 400,
                        complete: '',
                        pre: false,
                    }, options);

                    var thisElement = $(this);

                    $({
                        count: settings.start
                    }).animate({
                        count: settings.end
                    }, {
                        duration: settings.duration,
                        easing: settings.easing,
                        step: function () {
                            var mathCount = Math.ceil(this.count);
                            if (!settings.pre) {
                                thisElement.text(mathCount + '+');
                            } else {
                                thisElement.text(mathCount)
                            }
                        },
                        complete: settings.complete
                    });
                };

                $('#number1').jQuerySimpleCounter({
                    end: 10,
                    duration: 1500,
                    pre: true
                });
                $('#number2').jQuerySimpleCounter({
                    end: 500,
                    duration: 1500
                });
                $('#number3').jQuerySimpleCounter({
                    end: 1000,
                    duration: 1500
                });
                $('#number4').jQuerySimpleCounter({
                    end: 50,
                    duration: 1500
                });

                /* ------------------------- fetch all banner images ------------------------ */
                fetch('./action/fetchaBanners.php')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.length) {
                            data.map(x => {
                                const {
                                    image,
                                    url
                                } = x;
                                let template = `
                            <a href="${url}" class="image">
                                <img src="./admin/upload_image/banner/${image}" alt="">
                            </a>`;
                                $('.banner-slide').append(template);
                            })
                            $('.banner-slide').owlCarousel({
                                loop: false,
                                nav: false,
                                dots: true,

                                autoplay: 100,
                                responsive: {
                                    0: {
                                        items: 1
                                    }
                                }
                            })
                        }
                    })



                $('.cust-carousal').owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: false,
                    stagePadding: 20,
                    dots: false,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 2
                        },
                        1000: {
                            items: 3
                        }
                    }
                })




                $('#plants').attr('href', './products.html?id=1');
                $('#pots').attr('href', './products.html?id=2');



                // fetch all collections
                fetch('./action/fetchAllCollection.php')
                    .then(response => response.json())
                    .then(data => {
                        // const parsedData = JSON.parse(data);
                        // console.log(data);
                        if (data.length) {

                            data.map((x, i) => {

                                const {
                                    collection_id,
                                    discription,
                                    collection_name,
                                    products
                                } = x;
                                console.log(products);
                                let template = `
                        <section id="" class="trending">
                            <div class="section-title">
                                <h2>${collection_name}</h2>
                                <a href="./products.html" class="view-all">* View All Products &nbsp; <svg width="33" height="13" viewBox="0 0 33 13" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.5083 7.28L0.491206 7.25429C0.36093 7.25429 0.23599 7.18821 0.143871 7.0706C0.0517519 6.95299 0 6.79347 0 6.62714C0 6.46081 0.0517519 6.3013 0.143871 6.18369C0.23599 6.06607 0.36093 6 0.491206 6L25.5088 6.02571C25.6391 6.02571 25.764 6.09179 25.8561 6.2094C25.9482 6.32701 26 6.48653 26 6.65286C26 6.81919 25.9482 6.9787 25.8561 7.09631C25.764 7.21393 25.6386 7.28 25.5083 7.28Z"></path>
                                <path d="M33.0001 6.50854C29.2204 7.9435 24.5298 10.398 21.623 13L23.9157 6.50034L21.6317 0C24.5358 2.60547 29.2224 5.06539 33.0001 6.50854Z"></path>
                            </svg></a>
                            </div>
                            <div class="scroll-wrapper">
                                <div class="scroll-left">
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                </div>
                                <div class="scroll-right">
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </div>
                                <div class="card-wrapper trending-carousal owl-carousel owl-theme">`;

                                products && products.map(n => {

                                    const {
                                        productId,
                                        productName,
                                        productPrice,
                                        discountPrice,
                                        productImage,
                                        discription
                                    } = n;


                                    template +=
                                        ` <a href="./product-details.html?id=${productId}" class="card">
                                        <div class="image">
                                            <img src="./admin/upload_image/products/${productImage}" alt="${productName}">
                                        </div>
                                        <div class="content">
                                        <h6>${productName}</h6>
                                            <div class="price-wrap">
                                                <div class="price">
                                                    <div class="icon">
                                                        <img src="./assets/images/icons/Rupee.png" alt="">
                                                    </div>
                                                    <span class="amount">${discountPrice}</span>

                                                </div>
                                                <div class="price">
                                                    
                                                    <span class="actual-price">${productPrice}</span>
                                                </div>
                                            </div>
                                            <div class="description">${discription}</div>
                                        </div>
                                    </a>`;
                                })

                                template +=
                                    `</div>
                                </div>
                        </section>
                        
                        
                        `;

                                $('#collections').after(template);

                                const next = $(".trending-carousal").parent().find(".scroll-right");
                                const prev = $(".trending-carousal").parent().find(".scroll-left");
                                next.click(function () {
                                    $(".trending-carousal").trigger("next.owl.carousel");
                                });
                                prev.click(function () {
                                    $(".trending-carousal").trigger("prev.owl.carousel");
                                });

                                // $('.banner-slide').owlCarousel({
                                //     loop: true,
                                //     nav: false,
                                //     dots: false,
                                //     autoplay: 100,
                                //     responsive: {
                                //         0: {
                                //             items: 1
                                //         }
                                //     }
                                // })
                                $('.wrap').fadeOut(500);
                                $('.trending-carousal').owlCarousel({
                                    loop: true,
                                    margin: 10,
                                    nav: false,
                                    // stagePadding: 20,
                                    dots: false,
                                    autoplay: true,
                                    responsive: {
                                        0: {
                                            items: 2, 
                                        },
                                        600: {
                                            items: 3
                                        },
                                        1000: {
                                            items: 4
                                        }
                                    }
                                })
                            })
                        } else {
                            $('.wrap').fadeOut(500);
                        }
                    }).then(() => {



                    })

                // fetch new products home 
                fetch('./action/fetchNewProducts.php')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.length) {
                            data.map(x => {
                                const {
                                    productId,
                                    name,
                                    price,
                                    discount_price,
                                    discription,
                                    image
                                } = x;

                                let template = `
                        <div class="card">
                            <div class="image">
                                <img src="./admin/upload_image/products/${image}" alt="">
                            </div>
                            <h6>Single Stem Vase</h6>
                            <div class="price-wrap">
                                <div class="price">
                                    <div class="icon">
                                        <img src="./assets/images/icons/Rupee.png" alt="">
                                    </div>
                                    <span class="amount">${price}</span>
                                </div>
                                <a href="./cart" class="outline-btn">ADD TO CART</a>
                            </div>
                        </div>`;

                                $('#product-card-wrap').append(template);
                            })
                        } else {
                            alert('No products found');
                        }
                    })


                // fetch stamp type
                fetch('./action/fetchStampType.php')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.length) {
                            data.map(x => {
                                const {
                                    productId,
                                    name,
                                    price,
                                    discount_price,
                                    discription,
                                    image
                                } = x;

                                let template = `
                        <div class="card">
                            <div class="image">
                                <img src="./admin/upload_image/products/${image}" alt="">
                            </div>
                            <h6>Single Stem Vase</h6>
                            <div class="price-wrap">
                                <div class="price">
                                    <div class="icon">
                                        <img src="./assets/images/icons/Rupee.png" alt="">
                                    </div>
                                    <span class="amount">${price}</span>
                                </div>
                                <a href="./cart" class="outline-btn">ADD TO CART</a>
                            </div>
                        </div>`;

                                $('#product-card-wrap').append(template);
                            })
                        } else {
                            alert('No products found');
                        }
                    })


                $(".accordion-button").on("change", function () {
                    $(".accordion-button").not(this).prop("checked", false);
                    const isChecked = $(this).prop("checked");
                    const content = $(this).closest(".accordion-item").find(".content");

                    $(".content").removeClass("show");
                    if (isChecked) {
                        content.addClass("show");
                    } else {
                        content.removeClass("show");
                    }
                });

                // $('#choose-stamp-type .card-wrapper .card').click(function () {
                //     $('.card').removeClass('selected-card');
                //     $(this).addClass('selected-card');
                // })
            }
        }, {
            namespace: 'about',
            beforeEnter(data) {

                basic();
            }
        },
        {
            namespace: 'products',
            beforeEnter(data) {

                basic();

                const categoryId = location.href.split('=')[1];

                $('#category_filter').empty().append(`
                 <li>
                    <input type="radio" id="all" checked name="categories" value="0">
                    <label for="all">All</label><br>
                 </li>
            `);

                if (categoryId != undefined) {

                    // fetch all sub category
                    fetch('./action/fetchSubcategorys.php?id=' + categoryId)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.length) {
                                data.map(i => {
                                    const {
                                        id,
                                        name
                                    } = i;
                                    let template = `
                                <li>
                                    <input type="radio" id="${id}" name="categories" value="${id}">
                                    <label for="${id}">${name}</label><br>
                                </li>`;
                                    $('#category_filter').append(template);
                                })

                                let selectedCategory = $('#category_filter input:checked').val();
                                let priceRange = $('#price-filter').val();

                                // price filter
                                $('#price-filter').change(function () {
                                    priceRange = $(this).val();

                                    fetchProducts(selectedCategory, priceRange, categoryId);
                                })

                                // category filter
                                $('#category_filter input').change(function () {

                                    selectedCategory = $(this).val();
                                    fetchProducts(selectedCategory, priceRange, categoryId);
                                })
                            }
                        })

                    $('#clear-filter').click(function () {
                        location.reload();
                    })

                    fetchProducts(0, 0, categoryId);

                    /* ------------------------ fetching product details ------------------------ */
                    function fetchProducts(cat, price, categoryId) {
                        $('.card-wrapper').empty();
                        fetch('./action/fetchProduct.php?cat=' + cat + '&amount=' + price + '&category=' + categoryId)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                $('.wrap').fadeOut(500);
                                if (data.length) {
                                    $('#category-name').text(data[0]['categoryName']);
                                    data.map(x => {
                                        const {
                                            id,
                                            name,
                                            price,
                                            discount_price,
                                            discription,
                                            image
                                        } = x;
                                        let template = `
                                            <a href="./product-details.html?id=${id}" class="card">
                                                    <div class="image">
                                                        <img src="./admin/upload_image/products/${image}" alt="">
                                                    </div>
                                                    <div class="content">
                                                    <h6>${name}</h6>
                                                   
                                                        <div class="price-wrap">
                                                            <div class="price">
                                                                <div class="icon">
                                                                    <img src="./assets/images/icons/Rupee.png" alt="">
                                                                </div>
                                                                <span class="amount">${discount_price}</span>
                                                            </div>
                                                            <div class="price">
                                                            
                                                                <span class="actual-price">${price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>`;
                                        $('.card-wrapper').append(template);
                                    });
                                } else {
                                    $('.card-wrapper').append(`<h1>No Data Found !</h1>`);
                                }
                            })
                    }
                } else {

                    // fetch all sub category
                    fetch('./action/fetchSubcategorys.php?id=0')
                        .then(response => response.json())
                        .then(data => {
                            // console.log(data);
                            if (data.length) {
                                data.map(i => {
                                    const {
                                        id,
                                        name
                                    } = i;
                                    let template = `
                        <li>
                            <input type="radio" id="${id}" name="categories" value="${id}">
                            <label for="${id}">${name}</label><br>
                         </li>`;
                                    $('#category_filter').append(template);
                                })

                                let selectedCategory = $('#category_filter input:checked').val();
                                let priceRange = $('#price-filter').val();

                                // price filter
                                $('#price-filter').change(function () {
                                    priceRange = $(this).val();
                                    fetchProducts(selectedCategory, priceRange);
                                })

                                // category filter
                                $('#category_filter input').change(function () {
                                    selectedCategory = $(this).val();
                                    fetchProducts(selectedCategory, priceRange);
                                })
                            }
                        })

                    fetchProducts(0, 0);

                    function fetchProducts(cat, price) {
                        $('#product-card-wrap').empty();
                        fetch('./action/fetchProduct.php?cat=' + cat + '&amount=' + price)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.length) {
                                    data.map(x => {
                                        const {
                                            id,
                                            name,
                                            price,
                                            discount_price,
                                            discription,
                                            image
                                        } = x;

                                        let template = `
                            <div class="card">
                                <div class="image">
                                    <img src="./admin/upload_image/products/${image}" alt="">
                                    <ion-icon name="heart-outline"></ion-icon>
                                </div>
                                <h6>Single Stem Vase</h6>
                                <div class="price-wrap">
                                    <div class="price">
                                        <div class="icon">
                                            <img src="./assets/images/icons/Rupee.png" alt="">
                                        </div>
                                        <span class="amount">${price}</span>
                                    </div>
                                    <button class="outline-btn">ADD TO CART</button>
                                </div>
                            </div>`;

                                        $('#product-card-wrap').append(template);
                                    })
                                }
                            })
                    }
                }


            }
        },
        {
            namespace: 'product-details',
            beforeEnter() {

                basic();

                $('.wrap').fadeOut(500);
                const productId = location.href.split('=')[1];


                function buttonState(prop) {
                    if (prop == "disable") {
                        $('.add-to-cart').css({
                            opacity: 0.5,
                            pointerEvents: 'none'
                        })
                    } else if (prop == "default") {
                        $('.add-to-cart').css({
                            opacity: 1,
                            pointerEvents: 'inherit'
                        })
                    }
                }

                // increment setup
                const minus = $('.minus');
                const plus = $('.plus');
                let inputCount = $('#itemCount');
                const cartCTA = $('.add-to-cart');
                // increment
                plus.click(function () {

                    let currentValue = Number(inputCount.val());

                    if (currentValue < 15) {


                        // cartCTA.css({opacity : 1, =})
                        updateCount(currentValue + 1);


                    }

                    // check if it is already inited

                    if (cartCTA.attr('data-init') == 'true') {
                        cartButtonState(3);
                    }

                })
                // decrement
                minus.click(function () {
                    let currentValue = Number(inputCount.val());

                    if (currentValue > 0) {

                        updateCount(currentValue - 1);


                    }
                    if (currentValue == 0) {
                        buttonState('disable');
                    }
                    // check if it is already inited
                    if (cartCTA.attr('data-init') == 'true') {
                        cartButtonState(3);
                    }
                })
                // update count
                function updateCount(prop) {

                    inputCount.val(prop)
                }




                //add cart trigger
                cartCTA.click(function () {
                    const getValue = inputCount.val();
                    const itemName = $('#product_name').text();
                    const amount = $('.dis-price').text();
                    const image = $('.image-box-left .image img').attr('src');
                    const id = $('.image-box-left').attr('data-id');
                    // const id = $('.')
                    // insert into cookies
                    if (inputCount.val() > 0) {
                        cookies.add({
                            cookieName: 'products',
                            key: id,
                            data: {
                                id: id,
                                name: itemName,
                                amount: amount,
                                thumbnail: image,
                                count: inputCount.val()
                            },

                        })
                        cartButtonState(true);
                        cartCTA.attr('data-init', true);

                    } else {
                        alert('Add atleast on item')
                    }

                });

                // cart button state
                function cartButtonState(prop) {
                    const button = cartCTA;
                    // udpate cart button state
                    updateCartBtnCount();


                    if (prop == 1) {
                        console.log('hi')
                        button.text('Added to Cart');
                        button.css({
                            background: '#407940',
                        });

                        calculateCart()
                    } else if (prop == 2) {

                        button.text('Add to Cart')
                        button.css({
                            background: 'black'
                        });
                        calculateCart()
                    } else {
                        button.text('Update Cart')
                        button.css({
                            background: '#c33e67'
                        });
                        calculateCart();
                    }
                }

                // update count state
                function updateCount(prop) {
                    if (prop) {
                        inputCount.val(prop);
                    }
                }

                // select product size
                $('.size-selectBtns .sizeBtn').click(function () {
                    if ($(this).hasClass('picked-size')) {
                        $(this).removeClass('picked-size');
                    } else {
                        $('.sizeBtn').removeClass('picked-size');
                        $(this).addClass('picked-size');
                    }
                })

                $('.color-wrapper .color').click(function () {
                    if ($(this).hasClass('picked-color')) {
                        $(this).removeClass('picked-size');
                    } else {
                        $('.color').removeClass('picked-color');
                        $(this).addClass('picked-color');
                    }
                })



                // fetch product details
                fetch('./action/fetchProductDetails.php?id=' + productId)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.length) {
                            data.map(x => {
                                const {
                                    name,
                                    price,
                                    discount_price,
                                    discription,
                                    images,
                                    id
                                } = x;

                                $('#product_name').text(name);
                                $('.dis-price').text(discount_price);
                                $('.real-price').text(price);
                                $('.desc-content').append(`${discription}`);

                                let template = `
                            <div class="image-box-left" data-id="${id}">
                                <div class="image">
                                    <img id="main-img" src="./admin/upload_image/products/${images[0]}" alt="">
                                </div>
                            </div>
                            <div class="image-box-right">`;
                                for (let i = 0; i < images.length; i++) {
                                    template += `
                                <div class="image">
                                    <img src="./admin/upload_image/products/${images[i]}" alt="">
                                </div>`;
                                }
                                template += `</div>`;


                                $('#product_image_box').append(template);
                            })


                            // image preview
                            $('.image-box-right img').each(function () {
                                $(this).click(function () {
                                    const url = $(this).attr('src');
                                    const preview = $('#main-img');

                                    preview.attr('src', url);
                                })
                            })

                            // on load check if this already in cart
                            let getCookie = cookies.getData('products');
                            if (getCookie) {
                                getCookie.map(x => {

                                    if (x) {

                                        const productName = $('#product_name').text();

                                        const {
                                            id,
                                            count,
                                            name
                                        } = x;

                                        if (name == productName) {
                                            // button state to add to cart
                                            cartButtonState(1);
                                            // update count
                                            updateCount(count);
                                            cartCTA.attr('data-init', true);

                                        } else {

                                            // cartButtonState(2);
                                            // cartCTA.attr('data-init', false);
                                        }
                                    }
                                })


                            }
                        }
                    }).then(x => {
                        $('.wrap').fadeOut(500);
                    })




                // fetch related products
                fetch('./action/fetchRelatedProducts.php?id=' + productId)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.length) {
                            data.map(x => {

                                const {
                                    name,
                                    price,
                                    discount_price,
                                    image,
                                    id
                                } = x;

                                let template = `
                       <a data-barba-prevent href="./product-details.html?id=${id}" class="card" data-id="${id}">
                            <div class="image">
                                <img src="./admin/upload_image/products/${image}" alt="">
                            </div>
                            <div class="content">
                            <h6>${name}</h6>
                             <div class="price-wrap">
                                <div class="price">
                                    <div class="icon">
                                        <img src="./assets/images/icons/Rupee.png" alt="">
                                    </div>
                                    <span class="amount">${discount_price}</span>
                                </div>
                                <div class="price">
                                   
                                    <span class="actual-price">${price}</span>
                                </div>
                            
                            </div>
                            </div>
                        </a>`;

                                $('#related .owl-carousel').append(template);


                            })
                            $('.wrap').fadeOut(500);

                            $('.card-wrapper').owlCarousel({
                                // loop: true,
                                margin: 5,
                                nav: false,
                                stagePadding: 20,
                                dots: false,
                                responsive: {
                                    0: {
                                        items: 2
                                    },
                                    600: {
                                        items: 2
                                    },
                                    1000: {
                                        items: 5
                                    }
                                }
                            })
                        }
                    })


                // Buy Now Button
                $('.buyNow-btn').click(function(e){
                    e.preventDefault();
                    $('.productCheckout-popup').show();
                    $('.shimmer').show();
                })
                $('.productCheckout-popup .close').click(function(){
                    $('.productCheckout-popup').hide();
                    $('.shimmer').hide();
                })

                 // product checkout
                 $("#productCheckout-form").submit(function (e) {
                    e.preventDefault();
                  

                    // product details
                    const size = $('.sizeBtn.picked-size').text();
                   const color = $('.color.picked-color').data('name');
                   const qty = $('#itemCount').val();
                   const price = $('.dis-price').text();
                   const file = $('#doc')[0].files[0];
                   const productName = $('#product_name').text();
                    // form details
                    const name = $("#name").val();
                    const building_office = $("#building_office").val();
                    const street_locality = $("#street_locality").val();
                    const district = $("#district").val();
                    const state = $("#state").val();
                    const pincode = $("#pincode").val();
                    const contactName = $("#contactName").val();
                    const WhatsAppNumber = $("#WhatsAppNumber").val();




                    const link = `https://api.whatsapp.com/send?phone=+919746197164&text=Hello, 👋, I am ${name}. I've an order for *${$.trim(productName)}*. %0a%0a *Here is my shipping details* %0a%0a Name: ${name}%0a Building Name / Office Number: ${building_office}%0a Street / Locality: ${street_locality}%0a District: ${district}%0a State: ${state}%0a Pincode: ${pincode}%0a Contact Person's Name: ${contactName}%0a WhatsApp Number: ${WhatsAppNumber}%0a  
                    `;
                    window.location = link;

                      let fd = new FormData();
                      
                    fd.append("size",size);
                    fd.append("color",color);
                    fd.append("qty",qty);
                    fd.append("price",price);
                    fd.append("file",file);
                    fd.append("productName",productName);
                    fd.append("name",name);
                    fd.append("building_office",building_office);
                    fd.append("street_locality", street_locality);
                    fd.append("district", district);
                    fd.append("state", state);
                    fd.append("pincode", pincode);
                    fd.append("contactName", contactName);
                    fd.append("WhatsAppNumber", WhatsAppNumber);
                    

                    fetch('action/test.php',{
                        method:'POST',
                        body: fd
                    })
                    .then(response => response.text())
                    .then(res => {
                        
                    })
                });

            }
        },
        {
            namespace: 'contact',
            beforeEnter(data) {
                basic();

                $("#contact-form .btn-filled").click(function (e) {
                    e.preventDefault();
                    alert();
                    let fd = new FormData();
                    fd.append("name", $("#name").val());
                    fd.append("phone", $("#phone").val());
                    fd.append("email", $("#email").val());
                    fd.append("address", $("#address").val());
                    fd.append("message", $("#message").val());

                    $(".filled-btn").text("Sending...");

                    fetch("action/contactMailer.php", {
                            method: "POST",
                            body: fd,
                        })
                        .then((response) => response.text())
                        .then((response) => {
                            console.log(response);

                            if (response == "success") {
                                $(".filled-btn").text("Success").css({
                                    background: "green",
                                    opacity: "1",
                                });
                                setTimeout(function () {
                                    $(".filled-btn").text("Submit").css({
                                        background: "green",
                                    });
                                }, 1000);
                                $("#contact-form").trigger("reset");
                            } else {
                                $(".filled-btn").text("Failed").css({
                                    background: "red",
                                    opacity: "1",
                                });
                            }
                        });
                });
            }
        }
    ]
})

function basic() {

    $(window).scroll(function () {

        if ($(window).scrollTop() > 200 && $(window).scrollTop() < $(document).height() - 1000) {
            // alert()
            $('.contact-button-sticky-desktop button').css({
                display: 'block'
            })
        } else {
            $('.contact-button-sticky-desktop button').css({
                display: 'none'
            })

        }
    })

    $('.show-contact').click(function () {

        $('.contact-button-sticky-desktop').addClass('contact-button-sticky-desktop-active');
        $('.shimmer').show();
    })
    $('.contact-button-sticky-desktop .close').click(function () {

        $('.contact-button-sticky-desktop').removeClass('contact-button-sticky-desktop-active');
        $('.shimmer').hide();
    });

    $('.contact-button-sticky-desktop .button a').click(function (e) {
        // e.preventDefault();

        const url = $(this).attr('href');
        location.href = url;
        //   alert(url)
        // gtag_report_conversion(url);

    });




    // side-menu
    $('.hamburger').click(function (x) {
        x.preventDefault()
        $('.sidemenu').addClass('sidemenu-active');
        $('.shimmer').show();
    })

    $('.sidemenu .close').click(function (x) {
        x.preventDefault()
        $('.sidemenu').removeClass('sidemenu-active')
    })
    // filter
    $('.filter-mobile').click(function () {
        alert();
        $('.filter').addClass('filter-active');
    })

    $('.filter .close').click(function () {
        $('.filter').removeClass('filter-active');
    })
    // cart-menu
    $('header .cart').click(function (x) {
        x.preventDefault()
        $('.cart-menu').addClass('cart-menu-active')
    })

    $('.cart-menu .close').click(function (x) {
        x.preventDefault()
        $('.cart-menu').removeClass('cart-menu-active')
    })


    updateCartBtnCount();

    // view cart when click button
    const cartButton = $('.cart');
    const cartClosebutton = $('.cart-menu .head ion-icon');
    // open
    cartButton.click(function (e) {
        e.preventDefault();
        $('.items-on-cart').empty()
        $('.cart-menu').show();

        // update cart

        // on load check if this already in cart
        let getCookie = cookies.getData('products');
        if (getCookie) {


            getCookie.map(x => {
                if (x) {
                    const productName = $('#product_name').text();
                    const {
                        id,
                        count,
                        name,
                        amount,
                        thumbnail
                    } = x;

                    let template = ` <div class="item-details" data-id="${id}">
                     <div class="left">
                         <a data-barba-prevent href="product-details.html?id=${id}" class="image"><img src="${thumbnail}" alt="${name}"></a>
                     </div>
                     <div class="right">
                         <div class="row">
                             <h5>${name}</h5>
                             <button class="removetrigger"><ion-icon name="trash-outline"></ion-icon></button>
                         </div>
                         <div class="quantity">
                             <p>Qty</p>
                             <button class="minus">-</button>
                             <input type="number" readonly class="count" value="${count}"/>
                             <button class="add plus">+</button>
                         </div>
                         <div class="price-wrap">
                            <div class="icon">₹</div>
                             <span class="price">${Number(amount)}</span>
                         </div>
                     </div>
                 </div>`;
                    $('.items-on-cart').append(template);

                }
            })

            // remove Item (looping through each items)
            $('.item-details').each(function () {

                // to remove
                const removeButton = $(this).find('.removetrigger');
                removeButton.click(function () {
                    const parentId = $(this).closest('.item-details');
                    parentId.css({
                        marginLeft: -100,
                        transition: '0.3s',
                        opacity: 0,
                    });
                    setTimeout(function () {
                        parentId.remove();
                        calculateCart()
                        cookies.remove({
                            cookieName: 'products',
                            key: parentId.attr('data-id')
                        });
                        // update button state
                        updateCartBtnCount();
                    }, 300)




                });

                // calculate cart
                calculateCart();

                // setup buttons
                const plus = $(this).find('.plus');

                const minus = $(this).find('.minus');

                const input = $(this).find('.count');

                const id = $(this).attr('data-id');

                const amount = $(this).find('.price').text();

                const image = $(this).find('.image img').attr('src');

                const name = $(this).find('h5').text();

                // increment
                plus.click(function () {

                    const currentValue = Number($(this).closest('.item-details').find('.count').val());
                    console.log(currentValue)
                    if (currentValue < 15) {
                        input.val(Number(input.val()) + 1)
                        // insert
                        cookies.add({
                            cookieName: 'products',
                            key: id,
                            data: {
                                id: id,
                                name: name,
                                amount: amount,
                                thumbnail: image,
                                count: input.val()
                            },

                        })
                        // calcaulate cart
                        calculateCart();
                    }



                })
                // decrement
                minus.click(function () {
                    const currentValue = Number($(this).closest('.item-details').find('.count').val());
                    if (currentValue > 1) {
                        input.val(Number(input.val()) - 1)
                        // insert
                        // insert
                        cookies.add({
                            cookieName: 'products',
                            key: id,
                            data: {
                                id: id,
                                name: name,
                                amount: amount,
                                thumbnail: image,
                                count: input.val()
                            },

                        })

                        // calculate cart
                        calculateCart();

                    }

                })



            })






        }


        // 
    })
    // close 
    cartClosebutton.click(function () {
        $('.cart-menu').hide();
    })



    // send enquiry
    const placeorderBtn = $('.cart-menu .btn-filled');
    placeorderBtn.click(function () {
        let data = cookies.getData('products');

        let template = "https://api.whatsapp.com/send?phone=+910000000000&text=Hello, 👋, I have an *order*, %0a";

        data.map(x => {
            const {
                name,
                amount,
                count
            } = x;

            template += "*" + name + "*" + " x " + count + "%0a";
        })

        location.href = template;
    })

    // set scroll position 0 
    $(window).scrollTop(0);
    // header
    $(window).on('scroll', function () {

        if ($(window).scrollTop() > 200) {

            $('header').addClass('active-header')
        } else {
            $('header').removeClass('active-header')
        }
    })
}

function updateCartBtnCount() {

    const getCookie = cookies.getData('products');
    const btn = $('.cart-count span');

    if (getCookie != '') {
        btn.text(getCookie.length);
    } else {
        btn.text(0);
    }
}


function calculateCart() {

    const item = $('.item-details');


    let itemCost = 0;

    item.each(function () {

        const amount = Number($(this).find('.price').text());
        const count = $(this).find('.count').val();
        // calc
        const total = amount * count;
        itemCost += total;
    });


    // apply cost

    // order total
    const orderTotal = $('.shipping-details .order-amount');
    orderTotal.text(`₹​ ` + numberWithCommas(itemCost))

    // shipping charge
    const shippingCharge = $('.shipping-details .shipping-amount');

    // subtotal
    const subTotal = $('.sub-total');

    subTotal.text(numberWithCommas(orderTotal.text()));

    // order total

}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}