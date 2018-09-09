$(document).ready(function() {
    $("#btn-validate-a-block").on('click', validateABlock);
    $("#validation-block-number").on("keydown", clearBlockValidationAlerts);
});

function validateABlock() {
    const blockNumber = $("#validation-block-number").val();
    if (blockNumber < 0) {
        return validateABlockError({
            error: {
                message: 'invalid index'
            }
        });
    }
    axios.get(`/validate-a-block/${blockNumber}`).then((res) => {
        if (res.status === 200) {
            validateABloCkSuccess(res.data);
        } else {
            validateABlockError(res.data.error);
        }
    }).catch((err) => {
        validateABlockError({
            error: {
                message: err
            }
        })
    })
}

function validateABloCkSuccess(data) {
    if (data.valid === true) {
        $("#validation-result").addClass('alert alert-success');
        $("#validation-result").text("This blokc is valid");
    } else {
        $("#validation-result").addClass('alert alert-danger');
        $("#validation-result").text("This blokc is not valid");
    }
    $("#validation-result").css('display', 'block');
}

function validateABlockError({
    error
}) {
    const {
        message
    } = error;
    $("#validation-a-block-eror").css('display', 'block');
    $("#validation-a-block-eror").text(message);
}

function clearBlockValidationAlerts() {
    $("#validation-a-block-eror").css('display', 'none');
    $("#validation-a-block-eror").text('');
    $("#validation-result").css('display', 'none');
    $("#validation-result").text('');
}