$(document).ready(() => {
    $("#btn-add-to-block").on("click", addToBlock);
    $("#data").on("keydown", clearAddABlockAlerts);

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
    $("#data").val('');
    console.log('success');

}

function clearAddABlockAlerts() {

    $("#add-to-block-error").css('display', 'none');
    $("#add-to-block-error").text('');


    $("#add-to-block-success").css('display', 'none');
    $("#add-to-block-success").text('');

}