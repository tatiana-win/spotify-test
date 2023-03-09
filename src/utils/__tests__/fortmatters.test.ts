import { formatDuration } from '../formatters';

it('test duration formatter', () => {
  expect(formatDuration(221520)).toEqual('3:41');
  expect(formatDuration(188483)).toEqual('3:08');
  expect(formatDuration(4000)).toEqual('00:04');
  expect(formatDuration(200)).toEqual('00:00');
  expect(formatDuration(43504400)).toEqual('12:05:04');
});
