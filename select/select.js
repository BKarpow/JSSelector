const getTemplate = (placeholder, searchField) => {
    let place = placeholder ?? 'Please select item'
    const sF = searchField ? ' <duv class="select__search">' +
        ' <input type="text" name="search" data-type="search" placeholder="Поиск..."> </duv> ' : '';


    return ' <div class="select__backdrop" data-type="backdrop"></div> ' +
        '<div  class="select__input" data-type="input">\n' +
        `                <span data-type="value">${place}</span>\n` +
        '                <i data-type="arrow" class="fa fa-angle-down"></i>\n' +
        '\n' +
        '            </div>\n' +
        '            <!-- /.select__input -->\n' +
        '            <div class="select__dropdown">\n' +
                        sF+
        '                <ul class="select__list" data-type="data">\n' +

        '                </ul>\n' +
        '                <!-- /.select__list -->\n' +
        '            </div>\n' +
        '            <!-- /.select__dropdown -->'
}

const getTemplateDate = ($root, data = [], selectedId) => {
    const $place = $root.querySelector('[data-type="value"]')
    const items = data.map(item => {
        let cls = ''
        if (item.id === selectedId){
            $place.textContent = item.value
            cls = 'selected'
        }
        return `
            <li class="select__item ${cls}" data-type="item" data-id="${item.id}" >${item.value}</li>\n
        `
    })
    return items.join('')
}

export class Select{
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.$el.classList.add('select')
        this.options = options
        this.selectedId = options.selectedId
        this.dumpData = this.options.data
        this.#render()
        this.#setup()
        this.#renderData()
    }

    clickHandler(event){
        const {type} = event.target.dataset;
        if (type === 'input'){
            this.toggle()
        } else if (type === 'item'){
            const id = event.target.dataset.id;
            this.select(id)
            this.#cleanerSelectedCssClass()
            this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
            this.close()
        }else if (type === 'backdrop'){
            this.close()
        }
    }



    #render(){
        console.log("Render")
        const {placeholder, searchField} = this.options
        this.$el.innerHTML = getTemplate(placeholder, searchField)

    }
    #renderData(){
        console.log("Render Data")
        const {data} = this.options
        this.$data.innerHTML = getTemplateDate(this.$el, data, this.selectedId)
    }
    #setup(){
        console.log("Setup")
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('[data-type="value"]')
        this.$search = this.options.searchField ? this.$el.querySelector('[data-type="search"]') : null;
        this.$data = this.$el.querySelector('[data-type="data"]')
        this.searchHandler = this.searchHandler.bind(this)
        this.$search.addEventListener('keyup', this.searchHandler)
    }
    #cleanerSelectedCssClass(){
        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected')
        })
    }
    #allSelectedItems(){
        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.add('selected')
        })
    }

    searchHandler(event){
        const {type} = event.target.dataset
        const querySearch = event.target.value
        if (type === 'search' && querySearch.length > 2){
            const reg = new RegExp(querySearch, 'i')
            this.options.data = this.options.data.filter(item => {
                return reg.test(item.value)
            })
            const search = true
        }else{
            const search = false
            this.options.data = this.dumpData
        }
        this.#renderData(this.options.data)
        if (search)  {
            this.#allSelectedItems()
        }else{
            this.#cleanerSelectedCssClass()
        }

    }

    get current(){
        return this.options.data.find(item => item.id === this.selectedId)
    }

    get isOpen(){
        return this.$el.classList.contains('open');
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }

    select(id){
        this.selectedId = id
        this.$value.textContent = this.current.value
        this.options.onSelect ? this.options.onSelect(this.current) : null
    }



    open(){
        this.$el.classList.add('open')
        this.$arrow.classList.remove('fa-angle-down')
        this.$arrow.classList.add('fa-angle-up')
    }

    close(){
        this.$el.classList.remove('open')
        this.$arrow.classList.remove('fa-angle-up')
        this.$arrow.classList.add('fa-angle-down')
    }

    destroy(){
        this.$el.removeEventListener('click', this.clickHandler())
        this.$el.innerHTML = ''
    }
}