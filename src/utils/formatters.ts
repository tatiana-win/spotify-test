const addLeadingZeroForTime = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

const addLeadingZeroForThousand = (value: number) => {
  if (value < 10) {
    return `00${value}`;
  } else if (value < 100) {
    return `0${value}`;
  }
  return value;
};
export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / (3600 * 1000));
  duration = hours > 0 ? duration - hours * 3600 * 1000 : duration;
  const minutes = Math.floor(duration / (60 * 1000));
  duration = minutes > 0 ? duration - minutes * 60 * 1000 : duration;
  const seconds = Math.floor(duration / 1000);

  return `${hours ? hours + ':' : ''}${
    minutes ? (hours ? addLeadingZeroForTime(minutes) : minutes) : '00'
  }:${seconds ? addLeadingZeroForTime(seconds) : '00'}`;
};

export const formatNumberWithSpaces = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  }

  const mod = value % 1000;
  return `${formatNumberWithSpaces(
    Math.floor(value / 1000),
  )} ${addLeadingZeroForThousand(mod)}`;
};
