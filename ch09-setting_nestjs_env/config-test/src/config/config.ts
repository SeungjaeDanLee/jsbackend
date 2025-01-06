import { readFileSync } from "fs";
import * as yaml from 'js-yaml';
import common from "./common";
import dev from "./dev";
import local from "./local";
import prod from "./prod";

const phase = process.env.NODE_ENV;

// Save env value to conf form phase
let conf = {};
if (phase === 'local') {
    conf = local;
} else if (phase === 'dev') {
    conf = dev;
} else if (phase === 'prod') {
    conf = prod;
}

const yamlConfig: Record<string, any> = yaml.load(
    readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'),
);

export default () => ({
    ...common,
    ...conf,
    ...yamlConfig,
});