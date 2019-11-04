import _ from 'lodash';
import globalStyles from "./globalStyles";
if (!global.location) {
    // global.location = {};
}
const Particle = require("particle-api-js/dist/particle.min.js");
const p = new Particle();

const PARTICLE_USERNAME = 'jerezb31@hotmail.com';
const PARTICLE_PASSWORD = 'DdZP8K4ZZt8Mski';

class ParticleAPI {
    public api: any;
    private token: null;
    constructor() {
        this.api = p;
        this.token = null;

        let self = this;
        this.api.login({ username: PARTICLE_USERNAME, password: PARTICLE_PASSWORD })
            .then(function(result) {
                console.log('Your access token', result.body.access_token);
                self.token = result.body.access_token;

            }, function(err) {
                console.error('Particle Error: ', err);
            });
    }

    sendData(name, data) {
        this.api.publishEvent({ name, data, auth: this.token })
            .then(
                function(data) {
                    if (data.body.ok) { console.log("Event published succesfully") }
                },
                function(err) {
                    console.log("Failed to publish event: " + err)
                }
            )
    }
};

ParticleAPI.prototype = _.extend(ParticleAPI.prototype, {

});

// return {
//     sendData: publishEventPr,
//     token: () => { console.log(token) },
// }


export default ParticleAPI