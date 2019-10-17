import * as faker from 'faker';
import { MetricsContext } from '../MetricsContext';

test('can set property', () => {
  // arrange
  const context = MetricsContext.empty();
  const expectedKey = faker.random.word();
  const expectedValue = faker.random.word();

  // act
  context.setProperty(expectedKey, expectedValue);

  // assert
  const actualValue = context.properties[expectedKey];
  expect(actualValue).toBeTruthy();
  expect(actualValue).toBe(expectedValue);
});

test('putDimension adds key to dimension and sets the dimension as a property', () => {
  // arrange
  const context = MetricsContext.empty();
  const dimension = faker.random.word();
  const expectedDimension = { dimension };

  // act
  context.putDimensions(expectedDimension);

  // assert
  expect(context.getDimensions()[0]).toStrictEqual(expectedDimension);
});

test('getDimensions returns default dimensions if custom dimensions not set', () => {
  // arrange
  const context = MetricsContext.empty();
  const defaultDimension = faker.random.word();
  const expectedDimension = { defaultDimension };
  context.setDefaultDimensions(expectedDimension);

  // act
  const dimensions = context.getDimensions();

  // assert
  expect(dimensions[0]).toStrictEqual(expectedDimension);
});

test('getDimensions custom dimensions plus default dimensions', () => {
  // arrange
  const context = MetricsContext.empty();
  const defaultDimension = faker.random.word();
  const customDimension = faker.random.word();
  const expectedDimensions = { defaultDimension, customDimension };

  // act
  context.setDefaultDimensions({ defaultDimension });
  context.putDimensions({ customDimension });
  const dimensions = context.getDimensions();

  // assert
  expect(dimensions[0]).toStrictEqual(expectedDimensions);
});

test('getDimensions returns only custom dimensions if no default dimensions', () => {
  // arrange
  const context = MetricsContext.empty();
  const customDimension = faker.random.word();
  const expectedDimensions = { customDimension };

  // act
  context.putDimensions({ customDimension });
  const dimensions = context.getDimensions();

  // assert
  expect(dimensions[0]).toStrictEqual(expectedDimensions);
});

test('putMetric adds metric to metrics key', () => {
  // arrange
  const context = MetricsContext.empty();
  const expectedKey = faker.random.word();
  const expectedValue = faker.random.number();
  const expectedUnit = faker.random.word();

  // act
  context.putMetric(expectedKey, expectedValue, expectedUnit);

  // assert
  const metricDatum: any = context.metrics.get(expectedKey);
  expect(metricDatum).toBeTruthy();
  expect(metricDatum.value).toBe(expectedValue);
  expect(metricDatum.unit).toBe(expectedUnit);
});

test('multiple putMetric() calls to the same key append values to an array', () => {
  // arrange
  const context = MetricsContext.empty();
  const expectedKey = faker.random.word();
  const expectedUnit = faker.random.word();
  const expectedValue1 = faker.random.number();
  const expectedValue2 = faker.random.number();

  // act
  context.putMetric(expectedKey, expectedValue1, expectedUnit);
  context.putMetric(expectedKey, expectedValue2, expectedUnit);

  // assert
  const metricDatum: any = context.metrics.get(expectedKey);
  expect(metricDatum).toBeTruthy();
  expect(metricDatum.value).toStrictEqual([expectedValue1, expectedValue2]);
  expect(metricDatum.unit).toBe(expectedUnit);
});

test('putMetric uses None unit if not provided', () => {
  // arrange
  const context = MetricsContext.empty();
  const expectedKey = faker.random.word();
  const expectedValue = faker.random.number();
  const expectedUnit = 'None';

  // act
  context.putMetric(expectedKey, expectedValue);

  // assert
  const metricDatum: any = context.metrics.get(expectedKey);
  expect(metricDatum).toBeTruthy();
  expect(metricDatum.value).toBe(expectedValue);
  expect(metricDatum.unit).toBe(expectedUnit);
});

test('putMetric does not accept non numeric values', () => {
  // arrange
  const context = MetricsContext.empty();
  const key = faker.random.word();
  const unit = 'None';

  // act
  // @ts-ignore
  context.putMetric(key, '1');
  // @ts-ignore
  context.putMetric(key, {});
  // @ts-ignore
  context.putMetric(key, null);

  // assert
  const metricDatum: any = context.metrics.get(key);
  expect(metricDatum).toBeFalsy();
});

test('createCopyWithContext creates new instance', () => {
  // arrange
  const context = MetricsContext.empty();

  // act
  const newContext = context.createCopyWithContext();

  // assert
  expect(newContext).not.toBe(context);
});

test('createCopyWithContext creates new instance', () => {
  // arrange
  const context = MetricsContext.empty();

  // act
  const newContext = context.createCopyWithContext();

  // assert
  expect(newContext).not.toBe(context);
});

test('createCopyWithContext copies properties and dimensions', () => {
  // arrange
  const context = MetricsContext.empty();
  context.putDimensions({ Key: 'Value' });
  context.setProperty('Prop', 'Value');

  // act
  const newContext = context.createCopyWithContext();

  // assert
  expect(newContext).not.toBe(context);
  expect(newContext).toStrictEqual(context);
});
