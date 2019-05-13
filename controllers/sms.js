const Device = require('../models/Device');

module.exports = () => {

    return async (ctx, next) => {

        const { device_id: deviceId } = ctx.params;

        try {

            const device = await Device.findOne({ deviceId });
            const { body } = ctx.request;

            if (!validateReqBody(body)) {

                ctx.status = 400;

            } else if (device && typeof device === 'object') {

                const { socketId, connected } = device;

                if (socketId && connected) {

                    ctx.io
                    .to(socketId)
                    .binary(false)
                    .volatile
                    .emit('message', body);

                    ctx.status = 200;

                }else {

                    ctx.status = 403;

                }

            }

        } catch (err) {
            ctx.status = 500;
        }

        await next();

    };

};

function validateReqBody({ n, m } = {}) {
    return (n && typeof n === 'string')
        &&
        (typeof m === 'string' && m.length <= process.env.MESSAGE_SIZE);
}