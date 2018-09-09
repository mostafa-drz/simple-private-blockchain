$(document).ready(function() {
    $("#btn-get-block").on('click', getABlock);
    $("#block-number").on("keydown", clearGetABlockAlerts);
});

function getABlock() {
    const number = $("#block-number").val();
    axios.get(`/get-a-block/${number}`).then((resp) => {
        if (resp.status === 200) {
            getBlockSuccess(resp.data);
        } else {
            getBlockError(resp.data.error);
        }

    }).catch((err) => {
        getBlockError({
            error: {
                message: err
            }
        });
    })
}

function getBlockSuccess(value) {
    $("#block-data").text(JSON.stringify(value));
    $("#block-data").css('display', 'block');

}

function getBlockError({
    error
}) {
    const {
        message: {
            response: {
                data: {
                    error: {
                        message
                    }
                }
            }
        }
    } = error;

    $("#get-block-error").css('display', 'block');
    $("#get-block-error").text(message);

}

function clearGetABlockAlerts() {

    $("#get-block-error").css('display', 'none');
    $("#get-block-error").text('');



    $("#block-data").css('display', 'none');
    $("#block-data").text('');


}