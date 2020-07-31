# JSSelector
JavaScript - selector plagin . Vanilla JS

# Usage

from BODY
<div id="select"></div>
<script src='dist/app.js'></script>

<script> 
const sel = new Select('#select', {
    placeholder: 'Выбор едемента',
    searchField: true,
    data: [
        {id: '1', value: '1Select1'},
        {id: '2', value: '2Select2'},
        {id: '3', value: '123Select3'},
        {id: '4', value: '456Select4'},
        {id: '5', value: '456Select5'},
        {id: '6', value: '123Select6'},
        {id: '7', value: '789Select7'},
        {id: '8', value: '789Select8'},
        {id: '9', value: '456Select9'},
        {id: '10', value: '000Select10'},
        {id: '11', value: '111Select11'}
    ],
    selectedId: '3',
    onSelect: (item) => {
        console.log('Selected: ', item)
    }
});

window.s = sel;
</script>
