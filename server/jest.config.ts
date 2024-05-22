import dotenv from "dotenv";
import type { Config } from 'jest';

dotenv.config();

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    preset: "ts-jest",
    testEnvironment: "node",
};

export default config;
