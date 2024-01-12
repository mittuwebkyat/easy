class Sidemenu {

    constructor() {
        this.isRendered = false;
    }

    render() {
        if (!this.isRendered) {
            let template = `
            <nav class="sidemenu">
                <div class="header">
                    <p>EasyStamp</p>
                </div>
                <div class="navigation">
                    <ul>
                        <li><a link-ref="category" href="category_list.html"><i class="fas fa-boxes"></i> &nbsp; Category</a></li>
                        <li><a link-ref="subcategory" href="subcategory_list.html"><i class="fas fa-table"></i> &nbsp; Sub Category</a></li>
                        <li><a link-ref="products" href="product_list.html"><i class="fas fa-weight-hanging"></i> &nbsp; Inventory</a></li>
                        <li><a link-ref="collection" href="collection.html"><i class="fas fa-layer-group"></i> &nbsp; Collections</a></li>
                        <li><a link-ref="banner" href="banner.html"><i class="fas fa-layer-group"></i> &nbsp; Banners</a></li>
                        <li><a link-ref="orders" href="list_orders.html"><i class="fas fa-layer-group"></i> &nbsp; Orders</a></li>
                    </ul>
                </div>
            </nav>`;
            $('body').prepend(template);
            this.#setup();
        }
    }

    #setup() {
        // active class
        const links = $('.navigation ul li a');
        links.click(e => {
            e.preventDefault();
            links.removeClass('active');
            $(e.target).addClass('active');
        });
    }

    active(para) {
        if (!this.isRendered) {
            const links = $('.navigation ul li a');
            links.each(function () {
                const link = $(this).attr('link-ref');
                if (para == link) {
                    links.removeClass('active');
                    $(this).addClass('active');
                }
            })
            this.isRendered = true;
        }
    }

    hint(para) {
        const {target, content} = para;
        let template = `<div class="hint">${content}</div>`;
        const links = $('.navigation ul li a');
        links.each(function () {
            const link = $(this).attr('link-ref');
            if (target == link) {
                $(this).append(template);
            }
        })
    }

    current() {
        const links = $('.navigation ul li .active');
        return links;
    }
}

export default Sidemenu;