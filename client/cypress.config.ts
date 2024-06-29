import task from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

/* eslint-disable */
export default defineConfig({
    // setupNodeEvents can be defined in either
    // the e2e or component configuration
    e2e: {
        setupNodeEvents(on, config) {
            task(on, config);
            // include any other plugin code...

            // It's IMPORTANT to return the config object
            // with any changed environment variables
            return config
        },
    },
})