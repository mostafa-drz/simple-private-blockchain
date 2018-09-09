$(document).ready(function() {
    $("#btn-get-block-height").on('click', getBlockHeight);
})

function getBlockHeight() {
    axios.get('/block-height').then((resp) => {
        if (resp.status === 200) {
            getBlockHeightSuccess(resp.data);
        } else {
            getBlockHeightError(resp.data);
        }
    }).catch((error) => {
        getBlockHeightError({
            error: {
                message: error
            }
        });
    })
}

function getBlockHeightSuccess({
    height
}) {
    $("#block-height").text(`The chain height is ${height}`);
    $("#block-height").css('display', 'block');
}

function getBlockHeightError({
    error
}) {
    const {
        message
    } = error;
    $("#block-height-error").text(`The chain height is ${message}`);
    $("#block-height-error").css('display', 'block');
}