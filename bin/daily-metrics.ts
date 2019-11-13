#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { DailyMetricsStack } from '../lib/daily-metrics-stack';

const app = new cdk.App();
new DailyMetricsStack(app, 'DailyMetricsStack');
