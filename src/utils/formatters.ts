const addZeroIfNeeded = (value: number) => {
  return value < 10 ? `0${value}` : value;
};
export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / (3600 * 1000));
  duration = hours > 0 ? duration - hours * 3600 * 1000 : duration;
  const minutes = Math.floor(duration / (60 * 1000));
  duration = minutes > 0 ? duration - minutes * 60 * 1000 : duration;
  const seconds = Math.floor(duration / 1000);

  return `${hours ? hours + ':' : ''}${
    minutes ? (hours ? addZeroIfNeeded(minutes) : minutes) : '00'
  }:${seconds ? addZeroIfNeeded(seconds) : '00'}`;
};
