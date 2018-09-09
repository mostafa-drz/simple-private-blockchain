$(document).ready(function() {
    $("#btn-validate-the-chain").on('click', validateTheChain);
});

function validateTheChain() {
    axios.get(`/validate-the-chain`).then((res) => {
        if (res.status === 200) {
            validateTheChainSuccess(res.data);
        } else {
            validateTheChainError(res.data.error);
        }
    }).catch((err) => {
        validateTheChainError({
            error: {
                message: err
            }
        })
    })
}

function validateTheChainSuccess(data) {
    if (!data.invalids || data.invalids.length === 0) {
        $("#chain-validation-result").addClass('alert alert-success');
        $("#chain-validation-result").text("The chain is valid");
    } else {
        $("#chain-validation-result").addClass('alert alert-danger');
        $("#chain-validation-result").text("The chain is not valid");
    }
    $("#chain-validation-result").css('display', 'block');
}

function validateTheChainError({
    error
}) {
    const {
        message
    } = error;
    $("#chain-validation-eror").css('display', 'block');
    $("#chain-validation-eror").text(message);
}