module.exports = {

    service_callback: function (err, result, response) {
        if (err) {
            console.log(err)
            return response.json({
                success: 0,
                data: {},
                error: err
            })
        }

        else {
            return response.status(200).json({
                success: 1,
                data: result
            })
        }
    }
    ,

    response_format: function (response, success, message, data) {
        return response.json({
            success,
            message,
            data
        })
    }
    ,

}