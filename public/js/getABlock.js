$(document).ready(function() {
    $("#btn-get-block").on('click', getABlock);
});

function getABlock() {
    const number = $("#block-number").val();
    console.log(number);
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