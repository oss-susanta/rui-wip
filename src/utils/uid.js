let prevId = -1;

export default function nextId() {
  return `${++prevId}`;
}

export function resetId() {
  prevId = -1;
}
