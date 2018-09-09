$(document).ready(() => {
    $("#btn-add-to-block").on("click", addToBlock);
});

function addToBlock() {
    const data = $("#data").val();
    axios.post('/add-to-block', {
        data
    }).then((res) => {
        addToBlockSuccess();
    }).catch((error) => {
        addToBlockError(error);
    })
}


function addToBlockError(error) {
    $("#add-to-block-error").css('display', 'block');
    $("#add-to-block-error").text(error.message);
    console.log(error);
}

function addToBlockSuccess() {
    $("#add-to-block-success").css('display', 'block');
    $("#add-to-block-success").text('Block added successfully');
    console.log('success');
}