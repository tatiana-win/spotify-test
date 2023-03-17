import { formatDuration, formatNumberWithSpaces } from '../formatters';

it('test duration formatter', () => {
  expect(formatDuration(221520)).toEqual('3:41');
  expect(formatDuration(188483)).toEqual('3:08');
  expect(formatDuration(4000)).toEqual('00:04');
  expect(formatDuration(200)).toEqual('00:00');
  expect(formatDuration(43504400)).toEqual('12:05:04');
});

it('test number formatter', () => {
  expect(formatNumberWithSpaces(123456)).toEqual('123 456');
  expect(formatNumberWithSpaces(1000)).toEqual('1 000');
  expect(formatNumberWithSpaces(123005)).toEqual('123 005');
  expect(formatNumberWithSpaces(12345678)).toEqual('12 345 678');
  expect(formatNumberWithSpaces(12)).toEqual('12');
  expect(formatNumberWithSpaces(0)).toEqual('0');
});
