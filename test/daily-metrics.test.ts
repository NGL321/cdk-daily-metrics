import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import DailyMetrics = require('../lib/daily-metrics-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DailyMetrics.DailyMetricsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});