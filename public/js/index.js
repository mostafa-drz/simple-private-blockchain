$(document).ready(() => {
    $("#btn-add-to-block").on("click", addToBlock);
});

function addToBlock() {
    const data = $("#data").val();
    axios.post('/add-to-block', {
        data
    }).then(() => {
        addToBlockSuccess();
    }).catch(() => {
        addToBlockError();
    })
}

function addToBlockSuccess() {
    console.log('add to block');
}

function addToBlockError() {
    console.log('add to block error');
}